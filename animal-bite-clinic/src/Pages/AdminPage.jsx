import { useEffect, useState } from "react";
import AdminAppointmentTable from "../Components/admin/AdminAppointmentTable";
import AdminBillTable from "../Components/admin/AdminBillTable";
import AdminEditForm, { getFields } from "../Components/admin/AdminEditForm";
import AdminPatientTable from "../Components/admin/AdminPatientTable";
import AdminUserTable from "../Components/admin/AdminUserTable";
import SectionTitle from "../Components/ui/SectionTitle";
import { api } from "../services/api";

const editTitles = {
  patients: "Edit patient record",
  appointments: "Edit appointment",
  bills: "Edit billing record",
};

export default function AdminPage({
  patients,
  appointments,
  bills,
  adminMode,
  currentUserId,
  onUpdatePatient,
  onUpdateAppointment,
  onUpdateBill,
  onDeletePatient,
  onDeleteAppointment,
  onDeleteBill,
}) {
  const [tab, setTab] = useState("patients");
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api.getUsers().then(setUsers).catch(() => {});
  }, []);

  const updaters = {
    patients: onUpdatePatient,
    appointments: onUpdateAppointment,
    bills: onUpdateBill,
  };

  const tabs = [
    { id: "patients", label: `Patients (${patients.length})` },
    { id: "appointments", label: `Appointments (${appointments.length})` },
    { id: "bills", label: `Bills (${bills.length})` },
    { id: "users", label: `Users (${users.length})` },
  ];

  const startEdit = (kind) => (record) => setEditing({ kind, record });

  return (
    <>
      <SectionTitle
        eyebrow="Restricted management"
        title="Records management"
        description="Review, edit and remove records and manage accounts. Admin only."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => {
              setTab(id);
              setEditing(null);
            }}
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

      {editing && editing.kind === tab && (
        <AdminEditForm
          key={editing.record.id}
          title={editTitles[tab]}
          fields={getFields(tab, patients, editing.record)}
          record={editing.record}
          onCancel={() => setEditing(null)}
          onSave={async (data) => {
            const ok = await updaters[tab](editing.record.id, data);
            if (ok) setEditing(null);
            return ok;
          }}
        />
      )}

      {tab === "patients" && (
        <AdminPatientTable
          patients={patients}
          adminMode={adminMode}
          onEdit={startEdit("patients")}
          onDelete={onDeletePatient}
        />
      )}
      {tab === "appointments" && (
        <AdminAppointmentTable
          appointments={appointments}
          adminMode={adminMode}
          onEdit={startEdit("appointments")}
          onDelete={onDeleteAppointment}
        />
      )}
      {tab === "bills" && (
        <AdminBillTable
          bills={bills}
          adminMode={adminMode}
          onEdit={startEdit("bills")}
          onDelete={onDeleteBill}
        />
      )}
      {tab === "users" && (
        <AdminUserTable users={users} setUsers={setUsers} currentUserId={currentUserId} />
      )}
    </>
  );
}