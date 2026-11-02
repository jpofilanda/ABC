import { LogOut, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";

export default function AdminAccessCard({ adminMode, onToggle }) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <ShieldCheck size={24} />
          </span>
          <div>
            <h3 className="font-bold">Admin access</h3>
            <p className="mt-1 max-w-xl text-sm text-slate-500">Turn on demo admin mode to reveal appointment deletion controls.</p>
          </div>
        </div>
        <Button variant={adminMode ? "danger" : "primary"} onClick={onToggle}>
          {adminMode ? <><LogOut size={17} /> Exit admin mode</> : <><ShieldCheck size={17} /> Enable admin demo mode</>}
        </Button>
      </div>
      <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
        Demo only: this switch is not real authentication. A production system must verify admin permissions on a secure backend.
      </p>
    </section>
  );
}