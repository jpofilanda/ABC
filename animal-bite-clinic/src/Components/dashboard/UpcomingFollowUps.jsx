import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function UpcomingFollowUps({ pendingAppointments, onViewAll }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h3 className="font-bold">Upcoming follow-ups</h3>
          <p className="mt-1 text-xs text-slate-500">Pending vaccination appointments</p>
        </div>
        <Button variant="secondary" onClick={onViewAll}>View all</Button>
      </div>
      {pendingAppointments.length === 0 ? (
        <p className="p-8 text-sm text-slate-400">No pending follow-ups.</p>
      ) : (
        <div className="divide-y divide-slate-100">
          {pendingAppointments.slice(0, 5).map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-3 p-5">
              <div>
                <p className="font-semibold">{a.patient}</p>
                <p className="mt-1 text-xs text-slate-500">{a.purpose || "Follow-up"} · {a.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{a.date}</p>
                <Badge>{a.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}