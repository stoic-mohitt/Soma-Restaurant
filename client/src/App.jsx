import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Menu from "./components/Menu"
import SomaAI from "./components/SomaAI"
import Reservation from "./components/Reservation"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Menu />

        <SomaAI />

        <Reservation />
      </main>

      <Footer />
    </>
  )
}

export default App