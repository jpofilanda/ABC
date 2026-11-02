import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import Select from "../ui/Select";
import Table from "../ui/Table";

const RANGE_OPTIONS = ["3", "7", "14", "30"];

export default function AppointmentTable({ appointments, followUpDays, onFollowUpDaysChange, onStatusChange }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="font-bold">Follow-up appointments</h3>
          <p className="mt-1 text-xs text-slate-500">Filter pending appointments by the next number of days.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {RANGE_OPTIONS.map((days) => (
            <button
              key={days}
              onClick={() => onFollowUpDaysChange(days)}
              className={`min-h-10 rounded-xl px-4 text-sm font-semibold ${followUpDays === days ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {days} days
            </button>
          ))}
          <Button variant="secondary" onClick={() => onFollowUpDaysChange("36500")}>All pending</Button>
        </div>
      </div>
      <Table columns={["Patient / Contact", "Date", "Time", "Purpose / Notes", "Status"]}>
        {appointments.length === 0 ? (
          <EmptyRow columns={5} message="No pending follow-ups in this date range." />
        ) : (
          appointments.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="font-semibold">{a.patient}</p>
                <p className="mt-1 text-xs text-slate-500">{a.contact}</p>
              </td>
              <td className="whitespace-nowrap px-5 py-4">{a.date}</td>
              <td className="whitespace-nowrap px-5 py-4">{a.time}</td>
              <td className="px-5 py-4">
                <p>{a.purpose}</p>
                <p className="mt-1 text-xs text-slate-500">{a.notes || "No notes"}</p>
              </td>
              <td className="px-5 py-4">
                <Select aria-label={`Status for ${a.patient}`} value={a.status} onChange={(e) => onStatusChange(a.id, e.target.value)}>
                  <option>Pending</option><option>Completed</option><option>Cancelled</option>
                </Select>
              </td>
            </tr>
          ))
        )}
      </Table>
      <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Appointment deletion is available only in the Admin Dashboard.</p>
    </section>
  );
}