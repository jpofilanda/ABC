import { Plus, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";

export default function QuickActions({ onAddPatient, onAddAppointment, onAddBill, onOpenAdmin }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="font-bold">Quick actions</h3>
      <p className="mt-1 text-sm text-slate-500">Create a new clinic record.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button onClick={onAddPatient}><Plus size={17} /> Add patient</Button>
        <Button onClick={onAddAppointment}><Plus size={17} /> New appointment</Button>
        <Button variant="secondary" onClick={onAddBill}><Plus size={17} /> Add billing record</Button>
        <Button variant="secondary" onClick={onOpenAdmin}><ShieldCheck size={17} /> Admin dashboard</Button>
      </div>
    </section>
  );
}