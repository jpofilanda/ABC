import { useState } from "react";
import { Pencil, X } from "lucide-react";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import SearchInput from "../ui/SearchInput";
import Table from "../ui/Table";

export default function AdminBillTable({ bills, adminMode, onEdit, onDelete }) {
  const [filter, setFilter] = useState("");

  const shown = bills.filter((b) =>
    `${b.patient} ${b.service} ${b.method} ${b.reference} ${b.date}`
      .toLowerCase()
      .includes(filter.trim().toLowerCase()),
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">Manage billing records</h3>
          <p className="mt-1 text-xs text-slate-500">
            {filter ? `${shown.length} of ${bills.length}` : bills.length} billing records
          </p>
        </div>
        <SearchInput value={filter} onChange={setFilter} placeholder="Search by patient, service or payment" />
      </div>
      <Table columns={["Bill ID", "Patient", "Service", "Payment", "Date", "Amount", "Admin action"]}>
        {shown.length === 0 ? (
          <EmptyRow columns={7} message={filter ? "No billing records match your search." : "No records found."} />
        ) : (
          shown.map((b) => (
            <tr key={b.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-5 py-4 font-semibold">BILL-{String(b.id).slice(-6)}</td>
              <td className="px-5 py-4">{b.patient}</td>
              <td className="px-5 py-4">{b.service}</td>
              <td className="px-5 py-4">
                {b.method}
                {b.reference && <p className="mt-1 text-xs text-slate-500">Ref: {b.reference}</p>}
              </td>
              <td className="whitespace-nowrap px-5 py-4">{b.date}</td>
              <td className="whitespace-nowrap px-5 py-4 font-semibold">
                ₱{Number(b.amount || 0).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </td>
              <td className="px-5 py-4">
                {adminMode ? (
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => onEdit(b)}>
                      <Pencil size={16} /> Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(b.id)}>
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