import EmptyRow from "../ui/EmptyRow";
import Table from "../ui/Table";

export default function BillingTable({ bills }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h3 className="font-bold">Billing records</h3>
        <p className="mt-1 text-xs text-slate-500">
          Bill IDs are generated automatically for this prototype.
        </p>
      </div>
      <Table
        columns={[
          "Bill ID",
          "Patient",
          "Service",
          "Payment",
          "Reference",
          "Date",
          "Amount",
        ]}
      >
        {bills.length === 0 ? (
          <EmptyRow columns={7} />
        ) : (
          bills.map((b) => (
            <tr key={b.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-5 py-4 font-semibold">
                BILL-{String(b.id).slice(-6)}
              </td>
              <td className="px-5 py-4">{b.patient}</td>
              <td className="px-5 py-4">{b.service}</td>
              <td className="px-5 py-4">{b.method}</td>
              <td className="px-5 py-4">{b.reference || "—"}</td>
              <td className="whitespace-nowrap px-5 py-4">{b.date}</td>
              <td className="whitespace-nowrap px-5 py-4 font-semibold">
                ₱
                {Number(b.amount || 0).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))
        )}
      </Table>
    </section>
  );
}
