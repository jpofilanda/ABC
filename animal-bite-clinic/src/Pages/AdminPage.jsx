import { useEffect, useState } from "react";
import AdminAppointmentTable from "../Components/admin/AdminAppointmentTable";
import AdminBillTable from "../Components/admin/AdminBillTable";
import AdminPatientTable from "../Components/admin/AdminPatientTable";
import AdminUserTable from "../Components/admin/AdminUserTable";
import SectionTitle from "../Components/ui/SectionTitle";
import { api } from "../services/api";

export default function AdminPage({
  patients,
  appointments,
  bills,
  adminMode,
  currentUserId,
  onDeleteAppointment,
  onDeletePatient,
  onDeleteBill,
}) {
  const [tab, setTab] = useState("patients");
  const [patientFilter, setPatientFilter] = useState("");
  const [users, setUsers] = useState([]);

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.contact}`
      .toLowerCase()
      .includes(patientFilter.trim().toLowerCase()),
  );

  useEffect(() => {
    api
      .getUsers()
      .then(setUsers)
      .catch(() => {});
  }, []);

  const tabs = [
    { id: "patients", label: `Patients (${patients.length})` },
    { id: "appointments", label: `Appointments (${appointments.length})` },
    { id: "bills", label: `Bills (${bills.length})` },
    { id: "users", label: `Users (${users.length})` },
  ];

  return (
    <>
      <SectionTitle
        eyebrow="Restricted management"
        title="Records management"
        description="Review and remove records and manage accounts. Admin only."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`min-h-10 rounded-xl px-4 text-sm font-semibold transition ${
              tab === id
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "patients" && (
        <AdminPatientTable
          patients={filteredPatients}
          totalCount={patients.length}
          filter={patientFilter}
          onFilterChange={setPatientFilter}
          adminMode={adminMode}
          onDelete={onDeletePatient}
        />
      )}
      {tab === "appointments" && (
        <AdminAppointmentTable
          appointments={appointments}
          adminMode={adminMode}
          onDelete={onDeleteAppointment}
        />
      )}
      {tab === "bills" && (
        <AdminBillTable
          bills={bills}
          adminMode={adminMode}
          onDelete={onDeleteBill}
        />
      )}
      {tab === "users" && (
        <AdminUserTable
          users={users}
          setUsers={setUsers}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
}
