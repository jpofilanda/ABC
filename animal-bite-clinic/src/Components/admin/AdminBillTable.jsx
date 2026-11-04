import { X } from "lucide-react";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import Table from "../ui/Table";

export default function AdminBillTable({ bills, adminMode, onDelete }) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h3 className="font-bold">Manage billing records</h3>
        <p className="mt-1 text-xs text-slate-500">{bills.length} billing records</p>
      </div>
      <Table columns={["Bill ID", "Patient", "Service", "Payment", "Date", "Amount", "Admin action"]}>
        {bills.length === 0 ? (
          <EmptyRow columns={7} />
        ) : (
          bills.map((b) => (
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
                  <Button variant="danger" onClick={() => onDelete(b.id)}>
                    <X size={16} /> Delete
                  </Button>
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