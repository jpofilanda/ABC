import { Plus } from "lucide-react";
import AppointmentForm from "../Components/appointments/AppointmentForm";
import AppointmentTable from "../Components/appointments/AppointmentTable";
import Button from "../Components/ui/Button";
import SectionTitle from "../Components/ui/SectionTitle";

export default function AppointmentsPage({
  patients, dueAppointments, followUpDays, onFollowUpDaysChange, onStatusChange,
  showForm, onToggleForm, form, onFormChange, onSubmit,
}) {
  return (
    <>
      <SectionTitle
        eyebrow="Vaccination schedule"
        title="Appointment Management"
        description="Track follow-up dates, times, notes, and patient contact numbers."
        action={<Button onClick={onToggleForm}><Plus size={18} /> Add appointment</Button>}
      />
      {showForm && (
        <AppointmentForm form={form} patients={patients} onChange={onFormChange} onSubmit={onSubmit} onCancel={onToggleForm} />
      )}
      <AppointmentTable
        appointments={dueAppointments}
        followUpDays={followUpDays}
        onFollowUpDaysChange={onFollowUpDaysChange}
        onStatusChange={onStatusChange}
      />
    </>
  );
}