import {
  UtensilsCrossed,
  Leaf,
  Star,
  Layers3,
} from "lucide-react"

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf8] p-6">

      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f1e7]">
          <Icon
            size={19}
            strokeWidth={1.7}
          />
        </div>

        <span className="text-2xl font-medium">
          {value}
        </span>
      </div>

      <p className="mt-5 text-sm text-[#756f64]">
        {label}
      </p>

    </div>
  )
}

export default function Dashboard({ menuItems }) {
  const totalDishes = menuItems.length

  const vegetarianDishes = menuItems.filter(
    (item) => item.vegetarian
  ).length

  const featuredDishes = menuItems.filter(
    (item) => item.featured
  ).length

  const categories = new Set(
    menuItems.map((item) => item.category)
  ).size

  return (
    <div>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8a6a4a]">
          Overview
        </p>

        <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em]">
          Good evening, Admin.
        </h2>

        <p className="mt-3 text-sm text-[#756f64]">
          Here's what's happening with Sōma today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={UtensilsCrossed}
          label="Total dishes"
          value={totalDishes}
        />

        <StatCard
          icon={Leaf}
          label="Vegetarian dishes"
          value={vegetarianDishes}
        />

        <StatCard
          icon={Star}
          label="Featured dishes"
          value={featuredDishes}
        />

        <StatCard
          icon={Layers3}
          label="Categories"
          value={categories}
        />

      </div>

      {/* Recent menu */}
      <div className="mt-10 rounded-2xl border border-[#ded5c8] bg-[#fffdf8]">

        <div className="flex items-center justify-between border-b border-[#ded5c8] px-6 py-5">

          <div>
            <h3 className="font-medium">
              Menu overview
            </h3>

            <p className="mt-1 text-xs text-[#756f64]">
              Your current dishes
            </p>
          </div>

        </div>

        <div className="divide-y divide-[#ded5c8]">

          {menuItems.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 px-6 py-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-xl object-cover"
              />

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-[#756f64]">
                  {item.category}
                </p>

              </div>

              <span className="text-sm font-medium">
                ₹{item.price}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}