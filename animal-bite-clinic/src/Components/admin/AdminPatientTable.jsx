import { useState } from "react";
import { Pencil, X } from "lucide-react";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import SearchInput from "../ui/SearchInput";
import Table from "../ui/Table";

export default function AdminPatientTable({ patients, adminMode, onEdit, onDelete }) {
  const [filter, setFilter] = useState("");

  const shown = patients.filter((p) =>
    `${p.name} ${p.contact} ${p.animal} ${p.exposure}`
      .toLowerCase()
      .includes(filter.trim().toLowerCase()),
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">Manage patients</h3>
          <p className="mt-1 text-xs text-slate-500">
            {filter ? `${shown.length} of ${patients.length}` : patients.length} patient records
          </p>
        </div>
        <SearchInput value={filter} onChange={setFilter} placeholder="Search patients by name/contact" />
      </div>
      <Table columns={["Patient / Contact", "Exposure", "Animal", "Date added", "Admin action"]}>
        {shown.length === 0 ? (
          <EmptyRow columns={5} message={filter ? "No patients match your search." : "No records found."} />
        ) : (
          shown.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-xs text-slate-500">{p.contact}</p>
              </td>
              <td className="px-5 py-4">{p.exposure}</td>
              <td className="px-5 py-4">
                {p.animal}
                <p className="mt-1 text-xs text-slate-500">{p.ownership}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-4">{p.date}</td>
              <td className="px-5 py-4">
                {adminMode ? (
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => onEdit(p)}>
                      <Pencil size={16} /> Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(p.id)}>
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