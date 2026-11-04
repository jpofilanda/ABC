import { X } from "lucide-react";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import Table from "../ui/Table";

export default function AdminPatientTable({ patients, adminMode, onDelete }) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h3 className="font-bold">Manage patients</h3>
        <p className="mt-1 text-xs text-slate-500">
          {patients.length} patient records
        </p>
      </div>
      <Table
        columns={[
          "Patient / Contact",
          "Exposure",
          "Animal",
          "Date added",
          "Admin action",
        ]}
      >
        {patients.length === 0 ? (
          <EmptyRow columns={5} />
        ) : (
          patients.map((p) => (
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
                  <Button variant="danger" onClick={() => onDelete(p.id)}>
                    <X size={16} /> Delete
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400">
                    Admin access required
                  </span>
                )}
              </td>
            </tr>
          ))
        )}
      </Table>
    </section>
  );
}
