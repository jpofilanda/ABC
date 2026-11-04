export default function NoticeBanner({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
    >
      {message}
    </div>
  );
}
