import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react"

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Menu",
    icon: UtensilsCrossed,
  },
  {
    label: "Reservations",
    icon: CalendarDays,
  },
]

export default function Sidebar({
  activePage,
  setActivePage,
  onLogout,
})  {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#ded5c8] bg-[#fffdf8] p-6">

      {/* Logo */}
      <div className="mb-12">
        <h1 className="text-xl font-semibold tracking-[0.2em]">
          SŌMA
        </h1>

        <p className="mt-1 text-xs text-[#756f64]">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = activePage === item.label

          return (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[#29251f] text-[#fffdf8]"
                  : "text-[#756f64] hover:bg-[#f7f1e7] hover:text-[#29251f]"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />

              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#ded5c8] pt-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#756f64] transition hover:bg-[#f7f1e7] hover:text-[#29251f]">
          <Settings size={18} strokeWidth={1.8} />
          Settings
        </button>

       <button
  onClick={onLogout}
  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#756f64] transition hover:bg-[#f7f1e7] hover:text-[#29251f]"
>
  <LogOut
    size={18}
    strokeWidth={1.8}
  />
  Logout
</button>

      </div>

    </aside>
  )
}