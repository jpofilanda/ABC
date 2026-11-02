import { Plus } from "lucide-react";
import BillingForm from "../Components/billing/BillingForm";
import BillingTable from "../Components/billing/BillingTable";
import Button from "../Components/ui/Button";
import SectionTitle from "../Components/ui/SectionTitle";

export default function BillingPage({
  patients,
  bills,
  showForm,
  onToggleForm,
  form,
  onFormChange,
  onSubmit,
}) {
  return (
    <>
      <SectionTitle
        eyebrow="Payments and invoices"
        title="Billing Management"
        description="Record clinic services, payment method, reference numbers, and dates."
        action={
          <Button onClick={onToggleForm}>
            <Plus size={18} /> Add billing record
          </Button>
        }
      />
      {showForm && (
        <BillingForm
          form={form}
          patients={patients}
          onChange={onFormChange}
          onSubmit={onSubmit}
          onCancel={onToggleForm}
        />
      )}
      <BillingTable bills={bills} />
    </>
  );
}
