
import { useEffect, useMemo, useState } from "react";
import {
  Activity, CalendarDays, ChevronRight, ClipboardList,
  CreditCard, LayoutDashboard, LogOut, Menu, Plus,
  Search, ShieldCheck, Stethoscope, Users, X,
} from "lucide-react";

const today = () => new Date().toISOString().slice(0, 10);

const initialPatients = [
  {
    id: 1, name: "Juan Dela Cruz", age: 24, sex: "Male",
    contact: "09123456789", exposure: "Bite",
    animal: "Dog", ownership: "Stray",
    bleeding: "Yes", hypertension: "No", date: today(),
  },
];

const initialAppointments = [
  {
    id: 1, patient: "Juan Dela Cruz", contact: "09123456789",
    date: today(), time: "09:00", purpose: "Vaccination follow-up",
    notes: "Monitor the wound", status: "Pending",
  },
];

const initialBills = [
  {
    id: 1, patient: "Juan Dela Cruz", service: "Consultation",
    method: "Cash", reference: "", date: today(), amount: "150",
  },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Patients", icon: Users },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "admin", label: "Admin Dashboard", icon: ShieldCheck },
];

const emptyPatient = {
  name: "", age: "", sex: "Male", contact: "",
  exposure: "Bite", animal: "Dog", ownership: "Owned",
  bleeding: "No", hypertension: "No",
};

const emptyAppointment = {
  patient: "", contact: "", date: "", time: "",
  purpose: "", notes: "", status: "Pending",
};

const emptyBill = {
  patient: "", service: "Consultation", method: "Cash",
  reference: "", date: today(), amount: "",
};

function Field({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    >
      {children}
    </select>
  );
}

function TextArea(props) {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />
  );
}

function Button({ children, variant = "primary", ...props }) {
  const styles = variant === "secondary"
    ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    : variant === "danger"
    ? "bg-red-600 text-white hover:bg-red-700"
    : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Table({ columns, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-5 py-4 font-semibold">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}

function EmptyRow({ columns, message = "No records found." }) {
  return (
    <tr>
      <td colSpan={columns} className="px-5 py-12 text-center text-slate-400">
        {message}
      </td>
    </tr>
  );
}

function Badge({ children }) {
  const color = children === "Completed" || children === "Paid"
    ? "bg-emerald-50 text-emerald-700"
    : children === "Cancelled"
    ? "bg-red-50 text-red-700"
    : "bg-amber-50 text-amber-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {children}
    </span>
  );
}

function App() {
  const [page, setPage] = useState("dashboard");
  const [patients, setPatients] = useState(() =>
    JSON.parse(localStorage.getItem("abc_patients") || "null") || initialPatients
  );
  const [appointments, setAppointments] = useState(() =>
    JSON.parse(localStorage.getItem("abc_appointments") || "null") || initialAppointments
  );
  const [bills, setBills] = useState(() =>
    JSON.parse(localStorage.getItem("abc_bills") || "null") || initialBills
  );

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

  useEffect(() => {
    localStorage.setItem("abc_patients", JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem("abc_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("abc_bills", JSON.stringify(bills));
  }, [bills]);

  const notify = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const dueAppointments = useMemo(() => {
    const start = new Date(`${today()}T00:00:00`);
    const end = new Date(start);
    end.setDate(end.getDate() + Number(followUpDays));

    return appointments.filter((a) => {
      const date = new Date(`${a.date}T00:00:00`);
      return a.date && date >= start && date <= end &&
        a.status === "Pending";
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [appointments, followUpDays]);

  const filteredPatients = patients.filter((p) =>
    `${p.name} ${p.contact}`.toLowerCase().includes(patientFilter.toLowerCase())
  );

  const savePatient = (e) => {
    e.preventDefault();
    setPatients((old) => [
      ...old,
      { ...patientForm, id: Date.now(), date: today() },
    ]);
    setPatientForm(emptyPatient);
    setShowPatientForm(false);
    notify("Patient record saved.");
  };

  const saveAppointment = (e) => {
    e.preventDefault();
    setAppointments((old) => [
      ...old,
      { ...appointmentForm, id: Date.now() },
    ]);
    setAppointmentForm(emptyAppointment);
    setShowAppointmentForm(false);
    notify("Appointment saved.");
  };

  const saveBill = (e) => {
    e.preventDefault();
    setBills((old) => [
      ...old,
      { ...billForm, id: Date.now() },
    ]);
    setBillForm(emptyBill);
    setShowBillForm(false);
    notify("Billing record saved.");
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments((old) =>
      old.map((a) => a.id === id ? { ...a, status } : a)
    );
  };

  const deleteAppointment = (id) => {
    if (!adminMode) {
      notify("Admin access is required.");
      return;
    }
    if (window.confirm("Delete this appointment permanently from this browser?")) {
      setAppointments((old) => old.filter((a) => a.id !== id));
      notify("Appointment removed.");
    }
  };

  const stats = [
    { label: "Total Patients", value: patients.length, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Appointments", value: appointments.length, icon: CalendarDays, color: "bg-violet-50 text-violet-600" },
    { label: "Pending Follow-ups", value: appointments.filter((a) => a.status === "Pending").length, icon: Activity, color: "bg-amber-50 text-amber-600" },
    { label: "Billing Records", value: bills.length, icon: CreditCard, color: "bg-emerald-50 text-emerald-600" },
  ];

  const pageTitle = navItems.find((n) => n.id === page)?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Stethoscope size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900">BiteCare</p>
            <p className="text-xs text-slate-500">Clinic Management</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setMobileMenu(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">Workspace</p>
          <nav className="space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setPage(id); setMobileMenu(false); }}
                className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${page === id ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <Icon size={19} />
                <span>{label}</span>
                {page === id && <ChevronRight size={16} className="ml-auto" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-800">
              <ShieldCheck size={18} />
              <span className="text-sm font-bold">Patient-first care</span>
            </div>
            <p className="text-xs leading-5 text-blue-700">
              Keep clinic records accurate and follow-up schedules up to date.
            </p>
          </div>
        </div>
      </aside>

      {mobileMenu && (
        <button className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" onClick={() => setMobileMenu(false)} aria-label="Close navigation overlay" />
      )}

      <main className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setMobileMenu(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <div>
              <p className="text-xs text-slate-400">Animal Bite Clinic / {pageTitle}</p>
              <h1 className="text-lg font-bold text-slate-900">{pageTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">Clinic Staff</p>
              <p className="text-xs text-slate-500">{adminMode ? "Admin demo mode" : "Staff demo mode"}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {adminMode ? "A" : "S"}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] p-4 sm:p-8">
          {notice && (
            <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              {notice}
            </div>
          )}

          {page === "dashboard" && (
            <>
              <SectionTitle eyebrow="Clinic overview" title="Good day, Clinic Staff" description="Here's an overview of your animal bite clinic records." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}><Icon size={21} /></span>
                      <span className="text-xs text-slate-400">Current records</span>
                    </div>
                    <p className="mt-5 text-3xl font-bold text-slate-900">{value}</p>
                    <p className="mt-1 text-sm text-slate-500">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-6 xl:grid-cols-2">
                <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 p-5">
                    <div>
                      <h3 className="font-bold">Upcoming follow-ups</h3>
                      <p className="mt-1 text-xs text-slate-500">Pending vaccination appointments</p>
                    </div>
                    <Button variant="secondary" onClick={() => setPage("appointments")}>View all</Button>
                  </div>
                  {appointments.filter((a) => a.status === "Pending").length === 0 ? (
                    <p className="p-8 text-sm text-slate-400">No pending follow-ups.</p>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {appointments.filter((a) => a.status === "Pending").slice(0, 5).map((a) => (
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
                <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="font-bold">Quick actions</h3>
                  <p className="mt-1 text-sm text-slate-500">Create a new clinic record.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <Button onClick={() => { setPage("patients"); setShowPatientForm(true); }}><Plus size={17} /> Add patient</Button>
                    <Button onClick={() => { setPage("appointments"); setShowAppointmentForm(true); }}><Plus size={17} /> New appointment</Button>
                    <Button variant="secondary" onClick={() => { setPage("billing"); setShowBillForm(true); }}><Plus size={17} /> Add billing record</Button>
                    <Button variant="secondary" onClick={() => setPage("admin")}><ShieldCheck size={17} /> Admin dashboard</Button>
                  </div>
                </section>
              </div>
            </>
          )}

          {page === "patients" && (
            <>
              <SectionTitle
                eyebrow="Patient records"
                title="Patient Management"
                description="Record the patient's exposure and relevant medical history."
                action={<Button onClick={() => setShowPatientForm(!showPatientForm)}><Plus size={18} /> Add patient</Button>}
              />

              {showPatientForm && (
                <form onSubmit={savePatient} className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                  <h3 className="mb-5 font-bold">New patient record</h3>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <Field label="Patient full name"><Input required value={patientForm.name} onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} placeholder="Enter full name" /></Field>
                    <Field label="Age"><Input required min="0" max="120" type="number" value={patientForm.age} onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })} /></Field>
                    <Field label="Sex"><Select value={patientForm.sex} onChange={(e) => setPatientForm({ ...patientForm, sex: e.target.value })}><option>Male</option><option>Female</option><option>Other / not specified</option></Select></Field>
                    <Field label="Contact number"><Input required type="tel" value={patientForm.contact} onChange={(e) => setPatientForm({ ...patientForm, contact: e.target.value })} placeholder="09XXXXXXXXX" /></Field>
                    <Field label="Exposure history"><Select value={patientForm.exposure} onChange={(e) => setPatientForm({ ...patientForm, exposure: e.target.value })}><option>Bite</option><option>Scratch</option><option>Lick</option></Select></Field>
                    <Field label="Animal type"><Select value={patientForm.animal} onChange={(e) => setPatientForm({ ...patientForm, animal: e.target.value })}><option>Dog</option><option>Cat</option><option>Other</option></Select></Field>
                    <Field label="Animal ownership"><Select value={patientForm.ownership} onChange={(e) => setPatientForm({ ...patientForm, ownership: e.target.value })}><option>Owned</option><option>Stray</option><option>Unknown</option><option>Not applicable</option></Select></Field>
                    <Field label="Bleeding?"><Select value={patientForm.bleeding} onChange={(e) => setPatientForm({ ...patientForm, bleeding: e.target.value })}><option>No</option><option>Yes</option><option>Unknown</option></Select></Field>
                    <Field label="History of hypertension?"><Select value={patientForm.hypertension} onChange={(e) => setPatientForm({ ...patientForm, hypertension: e.target.value })}><option>No</option><option>Yes</option><option>Unknown</option></Select></Field>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="submit">Save patient</Button>
                    <Button type="button" variant="secondary" onClick={() => setShowPatientForm(false)}>Cancel</Button>
                  </div>
                </form>
              )}

              <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div><h3 className="font-bold">Patient history</h3><p className="mt-1 text-xs text-slate-500">{patients.length} patient records</p></div>
                  <div className="relative w-full sm:max-w-xs">
                    <Search size={17} className="absolute left-3 top-3.5 text-slate-400" />
                    <Input value={patientFilter} onChange={(e) => setPatientFilter(e.target.value)} placeholder="Filter patients by name/contact" className="pl-9" />
                  </div>
                </div>
                <Table columns={["Patient", "Exposure", "Animal", "Bleeding", "Hypertension", "Date"]}>
                  {filteredPatients.length === 0 ? <EmptyRow columns={6} /> : filteredPatients.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4"><p className="font-semibold">{p.name}</p><p className="mt-1 text-xs text-slate-500">Age {p.age} · {p.sex}</p><p className="mt-1 text-xs text-slate-500">{p.contact}</p></td>
                      <td className="px-5 py-4">{p.exposure}</td>
                      <td className="px-5 py-4">{p.animal}<p className="mt-1 text-xs text-slate-500">{p.ownership}</p></td>
                      <td className="px-5 py-4">{p.bleeding}</td>
                      <td className="px-5 py-4">{p.hypertension}</td>
                      <td className="px-5 py-4 whitespace-nowrap">{p.date}</td>
                    </tr>
                  ))}
                </Table>
              </section>
            </>
          )}

          {page === "appointments" && (
            <>
              <SectionTitle
                eyebrow="Vaccination schedule"
                title="Appointment Management"
                description="Track follow-up dates, times, notes, and patient contact numbers."
                action={<Button onClick={() => setShowAppointmentForm(!showAppointmentForm)}><Plus size={18} /> Add appointment</Button>}
              />

              {showAppointmentForm && (
                <form onSubmit={saveAppointment} className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                  <h3 className="mb-5 font-bold">New appointment / follow-up</h3>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <Field label="Patient"><Select required value={appointmentForm.patient} onChange={(e) => {
                      const selected = patients.find((p) => p.name === e.target.value);
                      setAppointmentForm({ ...appointmentForm, patient: e.target.value, contact: selected?.contact || "" });
                    }}><option value="">Select a patient</option>{patients.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}</Select></Field>
                    <Field label="Contact number"><Input required type="tel" value={appointmentForm.contact} onChange={(e) => setAppointmentForm({ ...appointmentForm, contact: e.target.value })} placeholder="09XXXXXXXXX" /></Field>
                    <Field label="Follow-up date"><Input required type="date" min={today()} value={appointmentForm.date} onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })} /></Field>
                    <Field label="Appointment time"><Input required type="time" value={appointmentForm.time} onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })} /></Field>
                    <Field label="Purpose / service"><Select value={appointmentForm.purpose} onChange={(e) => setAppointmentForm({ ...appointmentForm, purpose: e.target.value })}><option>Vaccination follow-up</option><option>Initial consultation</option><option>Wound assessment</option><option>Other</option></Select></Field>
                    <Field label="Status"><Select value={appointmentForm.status} onChange={(e) => setAppointmentForm({ ...appointmentForm, status: e.target.value })}><option>Pending</option><option>Completed</option><option>Cancelled</option></Select></Field>
                    <div className="sm:col-span-2 xl:col-span-3"><Field label="Notes"><TextArea value={appointmentForm.notes} onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })} placeholder="Add follow-up notes..." /></Field></div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3"><Button type="submit">Save appointment</Button><Button type="button" variant="secondary" onClick={() => setShowAppointmentForm(false)}>Cancel</Button></div>
                </form>
              )}

              <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div><h3 className="font-bold">Follow-up appointments</h3><p className="mt-1 text-xs text-slate-500">Filter pending appointments by the next number of days.</p></div>
                  <div className="flex flex-wrap gap-2">
                    {["3", "7", "14", "30"].map((days) => (
                      <button key={days} onClick={() => setFollowUpDays(days)} className={`min-h-10 rounded-xl px-4 text-sm font-semibold ${followUpDays === days ? "bg-blue-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{days} days</button>
                    ))}
                    <Button variant="secondary" onClick={() => setFollowUpDays("36500")}>All pending</Button>
                  </div>
                </div>
                <Table columns={["Patient / Contact", "Date", "Time", "Purpose / Notes", "Status"]}>
                  {dueAppointments.length === 0 ? <EmptyRow columns={5} message="No pending follow-ups in this date range." /> : dueAppointments.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4"><p className="font-semibold">{a.patient}</p><p className="mt-1 text-xs text-slate-500">{a.contact}</p></td>
                      <td className="whitespace-nowrap px-5 py-4">{a.date}</td>
                      <td className="whitespace-nowrap px-5 py-4">{a.time}</td>
                      <td className="px-5 py-4"><p>{a.purpose}</p><p className="mt-1 text-xs text-slate-500">{a.notes || "No notes"}</p></td>
                      <td className="px-5 py-4"><Select aria-label={`Status for ${a.patient}`} value={a.status} onChange={(e) => updateAppointmentStatus(a.id, e.target.value)}><option>Pending</option><option>Completed</option><option>Cancelled</option></Select></td>
                    </tr>
                  ))}
                </Table>
                <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">Appointment deletion is available only in the Admin Dashboard.</p>
              </section>
            </>
          )}

          {page === "billing" && (
            <>
              <SectionTitle
                eyebrow="Payments and invoices"
                title="Billing Management"
                description="Record clinic services, payment method, reference numbers, and dates."
                action={<Button onClick={() => setShowBillForm(!showBillForm)}><Plus size={18} /> Add billing record</Button>}
              />

              {showBillForm && (
                <form onSubmit={saveBill} className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                  <h3 className="mb-5 font-bold">New billing record</h3>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <Field label="Patient"><Select required value={billForm.patient} onChange={(e) => setBillForm({ ...billForm, patient: e.target.value })}><option value="">Select a patient</option>{patients.map((p) => <option key={p.id}>{p.name}</option>)}</Select></Field>
                    <Field label="Service"><Select value={billForm.service} onChange={(e) => setBillForm({ ...billForm, service: e.target.value })}><option>Consultation</option><option>Vaccination</option><option>Wound assessment</option><option>Other</option></Select></Field>
                    <Field label="Payment method"><Select value={billForm.method} onChange={(e) => setBillForm({ ...billForm, method: e.target.value, reference: e.target.value === "Cash" ? "" : billForm.reference })}><option>Cash</option><option>Online payment</option></Select></Field>
                    {billForm.method === "Online payment" && <Field label="Payment reference number"><Input required value={billForm.reference} onChange={(e) => setBillForm({ ...billForm, reference: e.target.value })} placeholder="Enter transaction reference" /></Field>}
                    <Field label="Payment date"><Input required type="date" value={billForm.date} onChange={(e) => setBillForm({ ...billForm, date: e.target.value })} /></Field>
                    <Field label="Amount (PHP)"><Input required type="number" min="0" step="0.01" value={billForm.amount} onChange={(e) => setBillForm({ ...billForm, amount: e.target.value })} placeholder="0.00" /></Field>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3"><Button type="submit">Save billing record</Button><Button type="button" variant="secondary" onClick={() => setShowBillForm(false)}>Cancel</Button></div>
                </form>
              )}

              <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5"><h3 className="font-bold">Billing records</h3><p className="mt-1 text-xs text-slate-500">Bill IDs are generated automatically for this prototype.</p></div>
                <Table columns={["Bill ID", "Patient", "Service", "Payment", "Reference", "Date", "Amount"]}>
                  {bills.length === 0 ? <EmptyRow columns={7} /> : bills.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-5 py-4 font-semibold">BILL-{String(b.id).slice(-6)}</td>
                      <td className="px-5 py-4">{b.patient}</td>
                      <td className="px-5 py-4">{b.service}</td>
                      <td className="px-5 py-4">{b.method}</td>
                      <td className="px-5 py-4">{b.reference || "—"}</td>
                      <td className="whitespace-nowrap px-5 py-4">{b.date}</td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold">₱{Number(b.amount || 0).toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </Table>
              </section>
            </>
          )}

          {page === "admin" && (
            <>
              <SectionTitle eyebrow="Restricted management" title="Admin Dashboard" description="Review appointment records and manage deletions." />
              <section className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><ShieldCheck size={24} /></span>
                    <div><h3 className="font-bold">Admin access</h3><p className="mt-1 max-w-xl text-sm text-slate-500">Turn on demo admin mode to reveal appointment deletion controls.</p></div>
                  </div>
                  <Button variant={adminMode ? "danger" : "primary"} onClick={() => { setAdminMode(!adminMode); notify(adminMode ? "Admin demo mode disabled." : "Admin demo mode enabled."); }}>
                    {adminMode ? <><LogOut size={17} /> Exit admin mode</> : <><ShieldCheck size={17} /> Enable admin demo mode</>}
                  </Button>
                </div>
                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">Demo only: this switch is not real authentication. A production system must verify admin permissions on a secure backend.</p>
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5"><h3 className="font-bold">Manage appointments</h3><p className="mt-1 text-xs text-slate-500">{appointments.length} appointment records</p></div>
                <Table columns={["Patient / Contact", "Date & Time", "Purpose", "Status", "Admin action"]}>
                  {appointments.length === 0 ? <EmptyRow columns={5} /> : appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4"><p className="font-semibold">{a.patient}</p><p className="mt-1 text-xs text-slate-500">{a.contact}</p></td>
                      <td className="whitespace-nowrap px-5 py-4">{a.date}<p className="mt-1 text-xs text-slate-500">{a.time}</p></td>
                      <td className="px-5 py-4">{a.purpose}</td>
                      <td className="px-5 py-4"><Badge>{a.status}</Badge></td>
                      <td className="px-5 py-4">{adminMode ? <Button variant="danger" onClick={() => deleteAppointment(a.id)}><X size={16} /> Delete</Button> : <span className="text-xs text-slate-400">Admin access required</span>}</td>
                    </tr>
                  ))}
                </Table>
              </section>
            </>
          )}

          <footer className="mt-8 flex flex-col gap-2 border-t border-slate-200 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>BiteCare · Animal Bite Clinic Management</span>
            <span>Student prototype · Not for real patient records</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
