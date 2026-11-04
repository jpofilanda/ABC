import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Patients", icon: Users },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "admin", label: "Admin Dashboard", icon: ShieldCheck, adminOnly: true },
];
