import { Menu } from "lucide-react";

export default function Header({ title, adminMode, onOpenMenu }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          onClick={onOpenMenu}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="text-xs text-slate-400">Animal Bite Clinic / {title}</p>
          <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">Clinic Staff</p>
          <p className="text-xs text-slate-500">
            {adminMode ? "Admin demo mode" : "Staff demo mode"}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
          {adminMode ? "A" : "S"}
        </div>
      </div>
    </header>
  );
}
