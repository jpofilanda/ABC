import { ChevronRight, ShieldCheck, Stethoscope, X } from "lucide-react";
import { navItems } from "../../constants/navItems";

export default function Sidebar({
  activePage,
  isOpen,
  role,
  onNavigate,
  onClose,
}) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Stethoscope size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900">BiteCare</p>
            <p className="text-xs text-slate-500">Clinic Management</p>
          </div>
          <button
            className="ml-auto lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </p>
          <nav className="space-y-1">
            {navItems
              .filter((item) => !item.adminOnly || role === "admin")
              .map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${activePage === id ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <Icon size={19} />
                  <span>{label}</span>
                  {activePage === id && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </button>
              ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-800">
              <ShieldCheck size={18} />
              <span className="text-sm font-bold">Patient-first care</span>
            </div>
            <p className="text-xs leading-5 text-blue-700">
              Keep clinic records accurate and follow-up schedules up to date.
            </p>
          </div>
        </div>
      </aside>

      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation overlay"
        />
      )}
    </>
  );
}
