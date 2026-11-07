import { useState } from "react";
import { Plus, X } from "lucide-react";
import { api } from "../../services/api";
import Button from "../ui/Button";
import EmptyRow from "../ui/EmptyRow";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Table from "../ui/Table";
import SearchInput from "../ui/SearchInput";

const emptyUser = { name: "", username: "", password: "", role: "staff" };

export default function AdminUserTable({ users, setUsers, currentUserId }) {
  const [form, setForm] = useState(emptyUser);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("");

  const shown = users.filter((u) =>
    `${u.name} ${u.username} ${u.role}`
      .toLowerCase()
      .includes(filter.trim().toLowerCase()),
  );

  const change = (field, value) =>
    setForm((old) => ({ ...old, [field]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const saved = await api.addUser(form);
      setUsers((old) => [...old, saved]);
      setForm(emptyUser);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (user) => {
    if (
      !window.confirm(
        `Delete the account "${user.username}"? They will no longer be able to log in.`,
      )
    )
      return;
    setError("");
    try {
      await api.deleteUser(user.id);
      setUsers((old) => old.filter((u) => u.id !== user.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">Manage users</h3>
          <p className="mt-1 text-xs text-slate-500 mb-2">
            {filter ? `${shown.length} of ${users.length}` : users.length} accounts
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <SearchInput value={filter} onChange={setFilter}  placeholder="Search by name or username" />
          {showForm ? "" : <Button  className="w-40" onClick={() => setShowForm(!showForm)}>
            <Plus size={17} /> Add user
          </Button> }
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mx-5 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={submit} className="border-b border-slate-100 p-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Full name">
              <Input
                required
                value={form.name}
                onChange={(e) => change("name", e.target.value)}
              />
            </Field>
            <Field label="Username">
              <Input
                required
                value={form.username}
                onChange={(e) => change("username", e.target.value)}
              />
            </Field>
            <Field label="Password (min 6 characters)">
              <Input
                required
                type="password"
                minLength={6}
                value={form.password}
                onChange={(e) => change("password", e.target.value)}
              />
            </Field>
            <Field label="Role">
              <Select
                value={form.role}
                onChange={(e) => change("role", e.target.value)}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </Select>
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="submit">Save user</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <Table columns={["Name", "Username", "Role", "Admin action"]}>
        {shown.length === 0 ? (
          <EmptyRow columns={4} message={filter ? "No users match your search." : "No records found."} />
        ) : (
          shown.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50">
              <td className="px-5 py-4 font-semibold">{u.name}</td>
              <td className="px-5 py-4">{u.username}</td>
              <td className="px-5 py-4 capitalize">{u.role}</td>
              <td className="px-5 py-4">
                {u.id === currentUserId ? (
                  <span className="text-xs text-slate-400">You</span>
                ) : (
                  <Button variant="danger" onClick={() => remove(u)}>
                    <X size={16} /> Delete
                  </Button>
                )}
              </td>
            </tr>
          ))
        )}
      </Table>
    </section>
  );
}
