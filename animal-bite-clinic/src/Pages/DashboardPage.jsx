import { Activity, CalendarDays, CreditCard, Users } from "lucide-react";
import QuickActions from "../Components/dashboard/QuickActions";
import StatCard from "../Components/dashboard/StatCard";
import UpcomingFollowUps from "../Components/dashboard/UpcomingFollowUps";
import SectionTitle from "../Components/ui/SectionTitle";

export default function DashboardPage({
  patients,
  appointments,
  bills,
  onViewAppointments,
  onAddPatient,
  onAddAppointment,
  onAddBill,
  onOpenAdmin,
}) {
  const pendingAppointments = appointments.filter(
    (a) => a.status === "Pending",
  );

  const stats = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Appointments",
      value: appointments.length,
      icon: CalendarDays,
      color: "bg-violet-50 text-violet-600",
    },
    {
      label: "Pending Follow-ups",
      value: pendingAppointments.length,
      icon: Activity,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Billing Records",
      value: bills.length,
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <>
      <SectionTitle
        eyebrow="Clinic overview"
        title="Good day, Clinic Staff"
        description="Here's an overview of your animal bite clinic records."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="mt-7 grid gap-6 xl:grid-cols-2">
        <UpcomingFollowUps
          pendingAppointments={pendingAppointments}
          onViewAll={onViewAppointments}
        />
        <QuickActions
          onAddPatient={onAddPatient}
          onAddAppointment={onAddAppointment}
          onAddBill={onAddBill}
          onOpenAdmin={onOpenAdmin}
        />
      </div>
    </>
  );
}
