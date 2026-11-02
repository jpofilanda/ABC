import Button from "../ui/Button";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function PatientForm({ form, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
      <h3 className="mb-5 font-bold">New patient record</h3>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Field label="Patient full name">
          <Input required value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Enter full name" />
        </Field>
        <Field label="Age">
          <Input required min="0" max="120" type="number" value={form.age} onChange={(e) => onChange("age", e.target.value)} />
        </Field>
        <Field label="Sex">
          <Select value={form.sex} onChange={(e) => onChange("sex", e.target.value)}>
            <option>Male</option><option>Female</option><option>Other / not specified</option>
          </Select>
        </Field>
        <Field label="Contact number">
          <Input required type="tel" value={form.contact} onChange={(e) => onChange("contact", e.target.value)} placeholder="09XXXXXXXXX" />
        </Field>
        <Field label="Exposure history">
          <Select value={form.exposure} onChange={(e) => onChange("exposure", e.target.value)}>
            <option>Bite</option><option>Scratch</option><option>Lick</option>
          </Select>
        </Field>
        <Field label="Animal type">
          <Select value={form.animal} onChange={(e) => onChange("animal", e.target.value)}>
            <option>Dog</option><option>Cat</option><option>Other</option>
          </Select>
        </Field>
        <Field label="Animal ownership">
          <Select value={form.ownership} onChange={(e) => onChange("ownership", e.target.value)}>
            <option>Owned</option><option>Stray</option><option>Unknown</option><option>Not applicable</option>
          </Select>
        </Field>
        <Field label="Bleeding?">
          <Select value={form.bleeding} onChange={(e) => onChange("bleeding", e.target.value)}>
            <option>No</option><option>Yes</option><option>Unknown</option>
          </Select>
        </Field>
        <Field label="History of hypertension?">
          <Select value={form.hypertension} onChange={(e) => onChange("hypertension", e.target.value)}>
            <option>No</option><option>Yes</option><option>Unknown</option>
          </Select>
        </Field>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit">Save patient</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}