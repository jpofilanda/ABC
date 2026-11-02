export default function Button({ children, variant = "primary", ...props }) {
  const styles =
    variant === "secondary"
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