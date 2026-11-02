import { Plus } from "lucide-react";
import PatientForm from "../Components/patients/PatientForm";
import PatientTable from "../Components/patients/PatientTable";
import Button from "../Components/ui/Button";
import SectionTitle from "../Components/ui/SectionTitle";

export default function PatientsPage({
  patients,
  filteredPatients,
  filter,
  onFilterChange,
  showForm,
  onToggleForm,
  form,
  onFormChange,
  onSubmit,
}) {
  return (
    <>
      <SectionTitle
        eyebrow="Patient records"
        title="Patient Management"
        description="Record the patient's exposure and relevant medical history."
        action={
          <Button onClick={onToggleForm}>
            <Plus size={18} /> Add patient
          </Button>
        }
      />
      {showForm && (
        <PatientForm
          form={form}
          onChange={onFormChange}
          onSubmit={onSubmit}
          onCancel={onToggleForm}
        />
      )}
      <PatientTable
        patients={filteredPatients}
        totalCount={patients.length}
        filter={filter}
        onFilterChange={onFilterChange}
      />
    </>
  );
}
