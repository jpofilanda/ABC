const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DB_FILE = "./db.json";

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const load = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(
        {
          patients: [],
          appointments: [],
          bills: [],
        },
        null,
        2,
      ),
    );
  }

  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
};

const save = (db) => fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
const today = () => new Date().toISOString().slice(0, 10);

app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
  }),
);


app.get("/api/patients", (req, res) => {
  res.json(load().patients);
});

app.post("/api/patients", (req, res) => {
  const { name, age, contact } = req.body;
  if (!name || !age || !contact) {
    return res.status(400).json({
      message: "Name, age and contact are required",
    });
  }

  const db = load();
  const patient = { ...req.body, id: Date.now(), date: today() };

  db.patients.push(patient);
  save(db);
  res.status(201).json(patient);
});


app.get("/api/appointments", (req, res) => {
  res.json(load().appointments);
});

app.post("/api/appointments", (req, res) => {
  const { patient, date, time } = req.body;
  if (!patient || !date || !time) {
    return res.status(400).json({
      message: "Patient, date and time are required",
    });
  }

  const db = load();
  const appointment = { ...req.body, id: Date.now() };
  db.appointments.push(appointment);
  save(db);
  res.status(201).json(appointment);
});

app.patch("/api/appointments/:id", (req, res) => {
  const db = load();
  const item = db.appointments.find((a) => a.id === Number(req.params.id));
  if (!item)
    return res.status(404).json({
      message: "Appointment not found",
    });

  Object.assign(item, req.body);
  save(db);
  res.json(item);
});

app.delete("/api/appointments/:id", (req, res) => {
  const db = load();
  db.appointments = db.appointments.filter(
    (a) => a.id !== Number(req.params.id),
  );
  save(db);
  res.status(204).end();
});


app.get("/api/bills", (req, res) => {
  res.json(load().bills);
});

app.post("/api/bills", (req, res) => {
  const { patient, amount } = req.body;
  if (!patient || !amount) {
    return res.status(400).json({
      message: "Patient and amount are required",
    });
  }
  const db = load();
  const bill = { ...req.body, id: Date.now() };
  db.bills.push(bill);
  save(db);
  res.status(201).json(bill);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});