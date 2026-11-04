import { X } from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import Table from "../ui/Table";

export default function AdminAppointmentTable({ appointments, adminMode, onDelete }) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h3 className="font-bold">Manage appointments</h3>
        <p className="mt-1 text-xs text-slate-500">{appointments.length} appointment records</p>
      </div>
      <Table columns={["Patient / Contact", "Date & Time", "Purpose", "Status", "Admin action"]}>
        {appointments.length === 0 ? (
          <EmptyRow columns={5} />
        ) : (
          appointments.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="font-semibold">{a.patient}</p>
                <p className="mt-1 text-xs text-slate-500">{a.contact}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                {a.date}
                <p className="mt-1 text-xs text-slate-500">{a.time}</p>
              </td>
              <td className="px-5 py-4">{a.purpose}</td>
              <td className="px-5 py-4"><Badge>{a.status}</Badge></td>
              <td className="px-5 py-4">
                {adminMode ? (
                  <Button variant="danger" onClick={() => onDelete(a.id)}><X size={16} /> Delete</Button>
                ) : (
                  <span className="text-xs text-slate-400">Admin access required</span>
                )}
              </td>
            </tr>
          ))
        )}
      </Table>
    </section>
  );
}