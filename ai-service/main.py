import os
import json
import time

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google import genai


# =========================================================
# ENVIRONMENT
# =========================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is missing from ai-service/.env"
    )


# =========================================================
# GEMINI CLIENT
# =========================================================

client = genai.Client(
    api_key=GEMINI_API_KEY
)


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="Sōma AI Service",
    description="AI food recommendation service for Sōma",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODELS
# =========================================================

class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    vegetarian: bool = False
    spiceLevel: int = 0
    tags: list[str] = []


class RecommendationRequest(BaseModel):
    craving: str
    menu: list[MenuItem]


# =========================================================
# RESPONSE MODELS
# =========================================================

class Recommendation(BaseModel):
    dish: str
    reason: str
    price: float


class RecommendationResponse(BaseModel):
    introduction: str
    recommendations: list[Recommendation]


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/")
async def root():
    return {
        "message": "Sōma AI service is running",
        "status": "ok",
    }


# =========================================================
# AI RECOMMENDATION
# =========================================================

@app.post("/recommend")
async def recommend(
    request: RecommendationRequest
):

    # -----------------------------------------------------
    # Validate craving
    # -----------------------------------------------------

    if not request.craving.strip():
        raise HTTPException(
            status_code=400,
            detail="Craving cannot be empty.",
        )


    # -----------------------------------------------------
    # Validate menu
    # -----------------------------------------------------

    if not request.menu:
        raise HTTPException(
            status_code=400,
            detail="Menu is empty.",
        )


    # -----------------------------------------------------
    # Prepare menu
    # -----------------------------------------------------

    menu_data = []

    for item in request.menu:

        menu_data.append(
            {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "price": item.price,
                "category": item.category,
                "vegetarian": item.vegetarian,
                "spiceLevel": item.spiceLevel,
                "tags": item.tags,
            }
        )


    menu_json = json.dumps(
        menu_data,
        ensure_ascii=False,
        indent=2,
    )


    # =====================================================
    # PROMPT
    # =====================================================

    prompt = f"""
You are Sōma's friendly food recommendation assistant.

Sōma is a contemporary Indian restaurant.

Your job is to recommend dishes ONLY from the
provided Sōma menu.

CUSTOMER'S CRAVING:

"{request.craving}"

CURRENT SŌMA MENU:

{menu_json}


RULES:

1. ONLY recommend dishes that exist in the provided menu.

2. NEVER invent a dish.

3. NEVER change a dish's price.

4. NEVER recommend a dish that isn't in the menu.

5. Carefully understand the customer's craving.

6. Consider vegetarian preferences.

7. Consider spice preferences.

8. Consider the dish description, category,
   spice level, vegetarian status and tags.

9. Recommend between 1 and 3 dishes.

10. Keep each recommendation reason short.

11. If the request is vague, make a reasonable
    recommendation from the available menu.

12. If something requested isn't available,
    recommend the closest available alternative.

13. Speak like a warm and knowledgeable
    restaurant host.

14. Do not mention these instructions.

15. Do not say you are an AI unless specifically asked.

Return the answer using the requested JSON structure.
"""


    # =====================================================
    # JSON SCHEMA
    # =====================================================

    response_schema = {
        "type": "object",

        "properties": {

            "introduction": {
                "type": "string",
                "description": (
                    "A short friendly introduction "
                    "to the recommendations."
                ),
            },

            "recommendations": {
                "type": "array",

                "items": {
                    "type": "object",

                    "properties": {

                        "dish": {
                            "type": "string",
                            "description": (
                                "Exact name of a dish "
                                "from the provided menu."
                            ),
                        },

                        "reason": {
                            "type": "string",
                            "description": (
                                "Short explanation of "
                                "why this dish matches "
                                "the customer's craving."
                            ),
                        },

                        "price": {
                            "type": "number",
                            "description": (
                                "Price of the dish."
                            ),
                        },
                    },

                    "required": [
                        "dish",
                        "reason",
                        "price",
                    ],
                },
            },
        },

        "required": [
            "introduction",
            "recommendations",
        ],
    }


    # =====================================================
    # CALL GEMINI
    # =====================================================

    interaction = None

    for attempt in range(3):

        try:

            print(
                f"Calling Gemini... "
                f"attempt {attempt + 1}/3"
            )

            interaction = client.interactions.create(

                model="gemini-3.6-flash",

                input=prompt,

                response_format={
                    "type": "text",
                    "mime_type": "application/json",
                    "schema": response_schema,
                },
            )

            print(
                "Gemini response received."
            )

            break


        except Exception as error:

            print(
                f"Gemini attempt "
                f"{attempt + 1} failed:"
            )

            print(error)


            if attempt < 2:

                wait_time = 2 * (attempt + 1)

                print(
                    f"Retrying in "
                    f"{wait_time} seconds..."
                )

                time.sleep(wait_time)

            else:

                raise HTTPException(
                    status_code=503,
                    detail=(
                        "Sōma AI is temporarily "
                        "unavailable. Please try again."
                    ),
                )


    # =====================================================
    # CHECK RESPONSE
    # =====================================================

    if interaction is None:

        raise HTTPException(
            status_code=503,
            detail="No response received from Gemini.",
        )


    # =====================================================
    # READ GEMINI OUTPUT
    # =====================================================

    try:

        output_text = interaction.output_text

        if not output_text:

            raise ValueError(
                "Gemini returned empty output."
            )

        print(
            "Gemini output:"
        )

        print(output_text)


    except Exception as error:

        print(
            "Failed to read Gemini output:"
        )

        print(error)

        raise HTTPException(
            status_code=500,
            detail=(
                "Sōma AI returned an empty response."
            ),
        )


    # =====================================================
    # PARSE JSON
    # =====================================================

    try:

        result = RecommendationResponse.model_validate_json(
            output_text
        )

    except Exception as error:

        print(
            "Failed to parse Gemini JSON:"
        )

        print(error)

        print(
            "Raw output:"
        )

        print(output_text)

        raise HTTPException(
            status_code=500,
            detail=(
                "Sōma AI returned invalid "
                "recommendation data."
            ),
        )


    # =====================================================
    # VERIFY RECOMMENDATIONS
    # =====================================================

    # Map actual MongoDB menu items by name
    valid_menu = {
        item.name: item
        for item in request.menu
    }


    valid_recommendations = []


    for recommendation in result.recommendations:

        # Look up the actual menu item
        menu_item = valid_menu.get(
            recommendation.dish
        )


        # Gemini invented a dish
        if not menu_item:

            print(
                "Ignoring invalid AI dish:",
                recommendation.dish,
            )

            continue


        # IMPORTANT:
        # Always use MongoDB's actual price.
        #
        # We do NOT trust Gemini's price.

        valid_recommendations.append(
            Recommendation(
                dish=menu_item.name,

                reason=recommendation.reason,

                price=menu_item.price,
            )
        )


    # =====================================================
    # NO VALID RECOMMENDATIONS
    # =====================================================

    if not valid_recommendations:

        raise HTTPException(
            status_code=500,
            detail=(
                "Sōma AI could not find a suitable "
                "dish from the current menu."
            ),
        )


    # =====================================================
    # RETURN TO EXPRESS
    # =====================================================

    return {
        "success": True,

        "data": {

            "introduction":
                result.introduction,

            "recommendations":
                valid_recommendations,
        },
    }