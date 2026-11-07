import { useState } from "react";
import Button from "../ui/Button";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";

const yesNoUnknown = ["No", "Yes", "Unknown"];
const statuses = ["Pending", "Completed", "Cancelled"];

export function getFields(kind, patients = [], record = {}) {
  if (kind === "patients") {
    return [
      {
        name: "name",
        label: "Patient full name",
        type: "text",
        required: true,
      },
      { name: "age", label: "Age", type: "number", required: true },
      {
        name: "sex",
        label: "Sex",
        type: "select",
        options: ["Male", "Female", "Other / not specified"],
      },
      { name: "contact", label: "Contact number", type: "tel", required: true },
      {
        name: "exposure",
        label: "Exposure history",
        type: "select",
        options: ["Bite", "Scratch", "Lick"],
      },
      {
        name: "animal",
        label: "Animal type",
        type: "select",
        options: ["Dog", "Cat", "Other"],
      },
      {
        name: "ownership",
        label: "Animal ownership",
        type: "select",
        options: ["Owned", "Stray", "Unknown", "Not applicable"],
      },
      {
        name: "bleeding",
        label: "Bleeding?",
        type: "select",
        options: yesNoUnknown,
      },
      {
        name: "hypertension",
        label: "History of hypertension?",
        type: "select",
        options: yesNoUnknown,
      },
    ];
  }

  if (kind === "appointments") {
    const names = [
      ...new Set(
        [record.patient, ...patients.map((p) => p.name)].filter(Boolean),
      ),
    ];
    return [
      {
        name: "patient",
        label: "Patient",
        type: "select",
        options: names,
        required: true,
      },
      { name: "contact", label: "Contact number", type: "tel" },
      { name: "date", label: "Follow-up date", type: "date", required: true },
      { name: "time", label: "Appointment time", type: "time", required: true },
      {
        name: "purpose",
        label: "Purpose / service",
        type: "select",
        options: [
          "Vaccination follow-up",
          "Initial consultation",
          "Wound assessment",
          "Other",
        ],
      },
      { name: "status", label: "Status", type: "select", options: statuses },
      { name: "notes", label: "Notes", type: "textarea", wide: true },
    ];
  }


  const names = [
    ...new Set(
      [record.patient, ...patients.map((p) => p.name)].filter(Boolean),
    ),
  ];
  return [
    {
      name: "patient",
      label: "Patient",
      type: "select",
      options: names,
      required: true,
    },
    {
      name: "service",
      label: "Service",
      type: "select",
      options: ["Consultation", "Vaccination", "Wound assessment", "Other"],
    },
    {
      name: "method",
      label: "Payment method",
      type: "select",
      options: ["Cash", "Online payment"],
    },
    {
      name: "reference",
      label: "Payment reference number",
      type: "text",
      required: true,
      showIf: (f) => f.method === "Online payment",
    },
    { name: "date", label: "Payment date", type: "date", required: true },
    {
      name: "amount",
      label: "Amount (PHP)",
      type: "number",
      required: true,
      step: "0.01",
    },
  ];
}

export default function AdminEditForm({
  title,
  fields,
  record,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(record);
  const [saving, setSaving] = useState(false);

  const change = (name, value) => setForm((old) => ({ ...old, [name]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const control = (f) => {
    const common = {
      required: f.required,
      value: form[f.name] ?? "",
      onChange: (e) => change(f.name, e.target.value),
    };
    if (f.type === "select") {
      return (
        <Select {...common}>
          {f.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      );
    }
    if (f.type === "textarea") return <TextArea {...common} />;
    return (
      <Input
        type={f.type}
        {...common}
        {...(f.type === "number" && { min: "0", step: f.step })}
      />
    );
  };

  return (
    <form
      onSubmit={submit}
      className="mb-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7"
    >
      <h3 className="mb-5 font-bold">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {fields
          .filter((f) => !f.showIf || f.showIf(form))
          .map((f) => (
            <div
              key={f.name}
              className={f.wide ? "sm:col-span-2 xl:col-span-3" : ""}
            >
              <Field label={f.label}>{control(f)}</Field>
            </div>
          ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
