import { useState } from "react";
import { Pencil, X } from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import SearchInput from "../ui/SearchInput";
import Table from "../ui/Table";

export default function AdminAppointmentTable({ appointments, adminMode, onEdit, onDelete }) {
  const [filter, setFilter] = useState("");

  const shown = appointments.filter((a) =>
    `${a.patient} ${a.contact} ${a.purpose} ${a.status} ${a.date}`
      .toLowerCase()
      .includes(filter.trim().toLowerCase()),
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">Manage appointments</h3>
          <p className="mt-1 text-xs text-slate-500">
            {filter ? `${shown.length} of ${appointments.length}` : appointments.length} appointment records
          </p>
        </div>
        <SearchInput value={filter} onChange={setFilter} placeholder="Search by patient, status or date" />
      </div>
      <Table columns={["Patient / Contact", "Date & Time", "Purpose", "Status", "Admin action"]}>
        {shown.length === 0 ? (
          <EmptyRow columns={5} message={filter ? "No appointments match your search." : "No records found."} />
        ) : (
          shown.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="font-semibold">{a.patient}</p>
                <p className="mt-1 text-xs text-slate-500">{a.contact}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                {a.date}
                <p className="mt-1 text-xs text-slate-500">{a.time}</p>
              </td>
              <td className="px-5 py-4">{a.purpose || "Not specified"}</td>
              <td className="px-5 py-4"><Badge>{a.status}</Badge></td>
              <td className="px-5 py-4">
                {adminMode ? (
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => onEdit(a)}>
                      <Pencil size={16} /> Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(a.id)}>
                      <X size={16} /> Delete
                    </Button>
                  </div>
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