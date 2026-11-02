export default function EmptyRow({ columns, message = "No records found." }) {
  return (
    <tr>
      <td colSpan={columns} className="px-5 py-12 text-center text-slate-400">
        {message}
      </td>
    </tr>
  );
}