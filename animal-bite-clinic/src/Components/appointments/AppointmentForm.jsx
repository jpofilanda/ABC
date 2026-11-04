import { today } from "../../utils/date";
import Button from "../ui/Button";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";

export default function AppointmentForm({
  form,
  patients,
  onChange,
  onSubmit,
  onCancel,
}) {
  const handlePatientChange = (name) => {
    const selected = patients.find((p) => p.name === name);
    onChange("patient", name);
    onChange("contact", selected?.contact || "");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
    >
      <h3 className="mb-5 font-bold">New appointment / follow-up</h3>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Field label="Patient">
          <Select
            required
            value={form.patient}
            onChange={(e) => handlePatientChange(e.target.value)}
          >
            <option value="">Select a patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Contact number">
          <Input
            required
            type="tel"
            value={form.contact}
            onChange={(e) => onChange("contact", e.target.value)}
            placeholder="09XXXXXXXXX"
          />
        </Field>
        <Field label="Follow-up date">
          <Input
            required
            type="date"
            min={today()}
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </Field>
        <Field label="Appointment time">
          <Input
            required
            type="time"
            value={form.time}
            onChange={(e) => onChange("time", e.target.value)}
          />
        </Field>
        <Field label="Purpose / service">
          <Select
            value={form.purpose}
            onChange={(e) => onChange("purpose", e.target.value)}
          >
            <option>Vaccination follow-up</option>
            <option>Initial consultation</option>
            <option>Wound assessment</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Status">
          <Select
            value={form.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </Select>
        </Field>
        <div className="sm:col-span-2 xl:col-span-3">
          <Field label="Notes">
            <TextArea
              value={form.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              placeholder="Add follow-up notes..."
            />
          </Field>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit">Save appointment</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
