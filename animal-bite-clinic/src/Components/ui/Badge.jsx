export default function Badge({ children }) {
  const color =
    children === "Completed" || children === "Paid"
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