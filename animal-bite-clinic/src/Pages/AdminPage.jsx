import AdminAccessCard from "../Components/admin/AdminAccessCard";
import AdminAppointmentTable from "../Components/admin/AdminAppointmentTable";
import SectionTitle from "../Components/ui/SectionTitle";

export default function AdminPage({
  appointments,
  adminMode,
  onToggleAdminMode,
  onDeleteAppointment,
}) {
  return (
    <>
      <SectionTitle
        eyebrow="Restricted management"
        title="Admin Dashboard"
        description="Review appointment records and manage deletions."
      />
      <AdminAccessCard adminMode={adminMode} onToggle={onToggleAdminMode} />
      <AdminAppointmentTable
        appointments={appointments}
        adminMode={adminMode}
        onDelete={onDeleteAppointment}
      />
    </>
  );
}
