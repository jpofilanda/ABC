export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    >
      {children}
    </select>
  );
}