import Button from "../ui/Button";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function BillingForm({
  form,
  patients,
  onChange,
  onSubmit,
  onCancel,
}) {
  const handleMethodChange = (method) => {
    onChange("method", method);
    if (method === "Cash") onChange("reference", "");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
    >
      <h3 className="mb-5 font-bold">New billing record</h3>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Field label="Patient">
          <Select
            required
            value={form.patient}
            onChange={(e) => onChange("patient", e.target.value)}
          >
            <option value="">Select a patient</option>
            {patients.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Service">
          <Select
            value={form.service}
            onChange={(e) => onChange("service", e.target.value)}
          >
            <option>Consultation</option>
            <option>Vaccination</option>
            <option>Wound assessment</option>
            <option>Other</option>
          </Select>
        </Field>
        <Field label="Payment method">
          <Select
            value={form.method}
            onChange={(e) => handleMethodChange(e.target.value)}
          >
            <option>Cash</option>
            <option>Online payment</option>
          </Select>
        </Field>
        {form.method === "Online payment" && (
          <Field label="Payment reference number">
            <Input
              required
              value={form.reference}
              onChange={(e) => onChange("reference", e.target.value)}
              placeholder="Enter transaction reference"
            />
          </Field>
        )}
        <Field label="Payment date">
          <Input
            required
            type="date"
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </Field>
        <Field label="Amount (PHP)">
          <Input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => onChange("amount", e.target.value)}
            placeholder="0.00"
          />
        </Field>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit">Save billing record</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
