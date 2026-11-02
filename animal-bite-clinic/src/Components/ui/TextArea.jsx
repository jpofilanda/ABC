export default function TextArea(props) {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
    />
  );
}