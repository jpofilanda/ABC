import { useEffect, useMemo, useState } from "react";

import Footer from "./Components/layout/Footer";
import Header from "./Components/layout/Header";
import NoticeBanner from "./Components/layout/NoticeBanner";
import Sidebar from "./Components/layout/Sidebar";

import AdminPage from "./pages/AdminPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BillingPage from "./pages/BillingPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";

import { navItems } from "./constants/navItems";
import {
  emptyAppointment,
  emptyBill,
  emptyPatient,
} from "./constants/initialData";
import { api } from "./services/api";
import { today } from "./utils/date";

const makeFieldUpdater = (setter) => (field, value) =>
  setter((old) => ({ ...old, [field]: value }));

function App() {
  const [page, setPage] = useState("dashboard");
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    Promise.all([api.getPatients(), api.getAppointments(), api.getBills()])
      .then(([p, a, b]) => {
        setPatients(p);
        setAppointments(a);
        setBills(b);
      })
      .catch(() => notify("Cannot reach the server. Is the API running?"), []);
  });

  const [patientForm, setPatientForm] = useState(emptyPatient);
  const [appointmentForm, setAppointmentForm] = useState(emptyAppointment);
  const [billForm, setBillForm] = useState(emptyBill);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showBillForm, setShowBillForm] = useState(false);
  const [followUpDays, setFollowUpDays] = useState("7");
  const [patientFilter, setPatientFilter] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [notice, setNotice] = useState("");

  const notify = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const dueAppointments = useMemo(() => {
    const start = new Date(`${today()}T00:00:00`);
    const end = new Date(start);
    end.setDate(end.getDate() + Number(followUpDays));

    return appointments
      .filter((a) => {
        const date = new Date(`${a.date}T00:00:00`);
        return a.date && date >= start && date <= end && a.status === "Pending";
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [appointments, followUpDays]);

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.contact}`
      .toLowerCase()
      .includes(patientFilter.toLowerCase()),
  );

  const updatePatientForm = makeFieldUpdater(setPatientForm);
  const updateAppointmentForm = makeFieldUpdater(setAppointmentForm);
  const updateBillForm = makeFieldUpdater(setBillForm);

  const savePatient = async (e) => {
    e.preventDefault();
    try {
      const saved = await api.addPatient(patientForm);
      setPatients((old) => [...old, saved]);
      setPatientForm(emptyPatient);
      setShowPatientForm(false);
      notify("Patient record saved");
    } catch (err) {
      notify(err.message);
    }
  };

  const saveAppointment = async (e) => {
    e.preventDefault();

    try {
      const saved = await api.addAppointment(appointmentForm);
      setAppointments((old) => [...old, saved]);
      setAppointmentForm(emptyAppointment);
      setShowAppointmentForm(false);
      notify("Appointment saved.");
    } catch (err) {
      notify(err.message);
    }
  };

  const saveBill = async (e) => {
    e.preventDefault();
    try {
      const saved = await api.addBill(billForm);
      setBills((old) => [...old, saved]);
      setBillForm(emptyBill);
      setShowBillForm(false);
      notify("Billing record saved.");
    } catch (err) {
      notify(err.message);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const updated = await api.updateAppointment(id, { status });
      setAppointments((old) => old.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      notify(err.message);
    }
  };

  const deleteAppointment = async (id) => {
    if (!adminMode) {
      notify("Admin access is required.");
      return;
    }
    if (
      window.confirm("Delete this appointment permanently from this browser?")
    ) {
      try {
        await api.deleteAppointment(id);
        setAppointments((old) => old.filter((a) => a.id !== id));
        notify("Appointment removed.");
      } catch (err) {
        notify(err.message);
      }
    }
  };

  const toggleAdminMode = () => {
    setAdminMode(!adminMode);
    notify(
      adminMode ? "Admin demo mode disabled." : "Admin demo mode enabled.",
    );
  };

  const navigate = (id) => {
    setPage(id);
    setMobileMenu(false);
  };

  const pageTitle = navItems.find((n) => n.id === page)?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar
        activePage={page}
        isOpen={mobileMenu}
        onNavigate={navigate}
        onClose={() => setMobileMenu(false)}
      />

      <main className="min-h-screen lg:ml-64">
        <Header
          title={pageTitle}
          adminMode={adminMode}
          onOpenMenu={() => setMobileMenu(true)}
        />

        <div className="mx-auto max-w-[1500px] p-4 sm:p-8">
          <NoticeBanner message={notice} />

          {page === "dashboard" && (
            <DashboardPage
              patients={patients}
              appointments={appointments}
              bills={bills}
              onViewAppointments={() => setPage("appointments")}
              onAddPatient={() => {
                setPage("patients");
                setShowPatientForm(true);
              }}
              onAddAppointment={() => {
                setPage("appointments");
                setShowAppointmentForm(true);
              }}
              onAddBill={() => {
                setPage("billing");
                setShowBillForm(true);
              }}
              onOpenAdmin={() => setPage("admin")}
            />
          )}

          {page === "patients" && (
            <PatientsPage
              patients={patients}
              filteredPatients={filteredPatients}
              filter={patientFilter}
              onFilterChange={setPatientFilter}
              showForm={showPatientForm}
              onToggleForm={() => setShowPatientForm(!showPatientForm)}
              form={patientForm}
              onFormChange={updatePatientForm}
              onSubmit={savePatient}
            />
          )}

          {page === "appointments" && (
            <AppointmentsPage
              patients={patients}
              dueAppointments={dueAppointments}
              followUpDays={followUpDays}
              onFollowUpDaysChange={setFollowUpDays}
              onStatusChange={updateAppointmentStatus}
              showForm={showAppointmentForm}
              onToggleForm={() => setShowAppointmentForm(!showAppointmentForm)}
              form={appointmentForm}
              onFormChange={updateAppointmentForm}
              onSubmit={saveAppointment}
            />
          )}

          {page === "billing" && (
            <BillingPage
              patients={patients}
              bills={bills}
              showForm={showBillForm}
              onToggleForm={() => setShowBillForm(!showBillForm)}
              form={billForm}
              onFormChange={updateBillForm}
              onSubmit={saveBill}
            />
          )}

          {page === "admin" && (
            <AdminPage
              appointments={appointments}
              adminMode={adminMode}
              onToggleAdminMode={toggleAdminMode}
              onDeleteAppointment={deleteAppointment}
            />
          )}

          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
