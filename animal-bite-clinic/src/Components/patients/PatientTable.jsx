import { Search } from "lucide-react";
import EmptyRow from "../ui/EmptyRow";
import Input from "../ui/Input";
import Table from "../ui/Table";

export default function PatientTable({ patients, totalCount, filter, onFilterChange }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">Patient history</h3>
          <p className="mt-1 text-xs text-slate-500">{totalCount} patient records</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search size={17} className="absolute left-3 top-3.5 text-slate-400" />
          <Input value={filter} onChange={(e) => onFilterChange(e.target.value)} placeholder="Filter patients by name/contact" className="pl-9" />
        </div>
      </div>
      <Table columns={["Patient", "Exposure", "Animal", "Bleeding", "Hypertension", "Date"]}>
        {patients.length === 0 ? (
          <EmptyRow columns={6} />
        ) : (
          patients.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-xs text-slate-500">Age {p.age} · {p.sex}</p>
                <p className="mt-1 text-xs text-slate-500">{p.contact}</p>
              </td>
              <td className="px-5 py-4">{p.exposure}</td>
              <td className="px-5 py-4">
                {p.animal}
                <p className="mt-1 text-xs text-slate-500">{p.ownership}</p>
              </td>
              <td className="px-5 py-4">{p.bleeding}</td>
              <td className="px-5 py-4">{p.hypertension}</td>
              <td className="px-5 py-4 whitespace-nowrap">{p.date}</td>
            </tr>
          ))
        )}
      </Table>
    </section>
  );
}