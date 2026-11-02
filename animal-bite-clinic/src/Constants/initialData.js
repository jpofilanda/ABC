import { today } from "../Utils/date";

export const initialPatients = [
  {
    id: 1, name: "Juan Dela Cruz", age: 24, sex: "Male",
    contact: "09123456789", exposure: "Bite",
    animal: "Dog", ownership: "Stray",
    bleeding: "Yes", hypertension: "No", date: today(),
  },
];

export const initialAppointments = [
  {
    id: 1, patient: "Juan Dela Cruz", contact: "09123456789",
    date: today(), time: "09:00", purpose: "Vaccination follow-up",
    notes: "Monitor the wound", status: "Pending",
  },
];

export const initialBills = [
  {
    id: 1, patient: "Juan Dela Cruz", service: "Consultation",
    method: "Cash", reference: "", date: today(), amount: "150",
  },
];

export const emptyPatient = {
  name: "", age: "", sex: "Male", contact: "",
  exposure: "Bite", animal: "Dog", ownership: "Owned",
  bleeding: "No", hypertension: "No",
};

export const emptyAppointment = {
  patient: "", contact: "", date: "", time: "",
  purpose: "", notes: "", status: "Pending",
};

export const emptyBill = {
  patient: "", service: "Consultation", method: "Cash",
  reference: "", date: today(), amount: "",
};