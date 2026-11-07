const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const DB_FILE = "./db.json";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "ha72f23defb63406c9d362f978b0f66d51bb796a3ed6adaccdbe6fe63c2fc88b5d157cde80fca43c85bc2ad0fb5d5712f5dog";

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

const seedUser = () => {
  const db = load();
  if (!db.users || db.users.length === 0) {
    db.users = [
      {
        id: 1,
        username: "admin",
        name: "Clinic Admin",
        role: "admin",
        passwordHash: bcrypt.hashSync("admin123", 10),
      },
      {
        id: 2,
        username: "staff",
        name: "Clinic Staff",
        role: "staff",
        passwordHash: bcrypt.hashSync("staff123", 10),
      },
    ];
    save(db);
  }
};

seedUser();

// Authentication
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token)
    return res.status(401).json({
      message: "Login required",
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const current = load().users.find((u) => u.id === decoded.id);

    if (!current) {
      return res.status(401).json({
        message: "Your account no longer exists",
      });
    }

    req.user = {
      id: current.id,
      username: current.username,
      name: current.name,
      role: current.role,
    };
    next();
  } catch {
    res.status(401).json({
      message: "Session expired. Please log in again",
    });
  }
};

const requireRole =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.user.role)
      ? next()
      : res.status(403).json({
          message: "You do not have permission to do this",
        });

app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
  }),
);

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = load().users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password || "", user.passwordHash)) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
  res.json({
    token,
    user: payload,
  });
});

app.use("/api", requireAuth);

// Patients
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
  console.log("POST /api/patients ->", patient);
  res.status(201).json(patient);
});

app.patch("/api/patients/:id", requireRole("admin"), (req, res) => {
  const db = load();
  const patient = db.patients.find((p) => p.id === Number(req.params.id));

  if (!patient)
    return res.status(404).json({
      message: "Patient not found",
    });

  const {
    name,
    age,
    sex,
    contact,
    exposure,
    animal,
    ownership,
    bleeding,
    hypertension,
  } = req.body;

  if (!name || !age || !contact) {
    return res.status(400).json({
      message: "Name, age and contact are required",
    });
  }

  Object.assign(patient, {
    name,
    age,
    sex,
    contact,
    exposure,
    animal,
    ownership,
    bleeding,
    hypertension,
  });
  save(db);
  res.json(patient);
});

app.delete("/api/patients/:id", requireRole("admin"), (req, res) => {
  const db = load();
  const id = Number(req.params.id);

  if (!db.patients.some((p) => p.id === id)) {
    return res.status(404).json({
      message: "Patient not found",
    });
  }
  db.patients = db.patients.filter((p) => p.id !== id);
  save(db);
  res.status(204).end();
});

// Appointment
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
  const appointment = {
    ...req.body,
    purpose: req.body.purpose || "Vaccination follow-up",
    id: Date.now(),
  };
  db.appointments.push(appointment);
  save(db);
  res.status(201).json(appointment);
});

app.patch("/api/appointments/:id", (req, res) => {
  const db = load();
  const item = db.appointments.find((a) => a.id === Number(req.params.id));
  if (!item)
    return res.status(404).json({
      message: "Appoinment not found",
    });

  Object.assign(item, req.body);
  save(db);
  res.json(item);
});

app.patch("/api/appointments/:id", (req, res) => {
  const db = load();

  const appointment = db.appointments.find(
    (a) => a.id === Number(req.params.id),
  );

  if (!appointment)
    return res.status(404).json({
      message: "Appointment not found",
    });

  const { patient, contact, date, time, purpose, notes, status } = req.body;

  if (!patient || !date || !time) {
    return res.status(400).json({
      message: "Patient, date and time are required",
    });
  }

  Object.assign(appointment, {
    patient,
    contact,
    date,
    time,
    purpose,
    notes,
    status,
  });
  save(db);
  res.json(appointment);
});

app.delete("/api/appointments/:id", requireRole("admin"), (req, res) => {
  const db = load();
  db.appointments = db.appointments.filter(
    (a) => a.id !== Number(req.params.id),
  );
  save(db);
  res.status(204).end();
});

// Bills
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

app.patch("/api/bills/:id", requireRole("admin"), (req, res) => {
  const db = load();
  const bill = db.bills.find((b) => b.id === Number(req.params.id));
  if (!bill)
    return res.status(404).json({
      message: "Bill not found",
    });

  const { patient, service, method, reference, date, amount } = req.body;

  if (!patient || !amount) {
    return res.status(400).json({
      message: "Patient and amount are required",
    });
  }

  Object.assign(bill, { patient, service, method, reference, date, amount });
  save(db);
  res.json(bill);
});

app.delete("/api/bills/:id", requireRole("admin"), (req, res) => {
  const db = load();
  const id = Number(req.params.id);

  if (!db.bills.some((b) => b.id === id)) {
    return res.status(404).json({
      message: "Bill not found",
    });
  }

  db.bills = db.bills.filter((b) => b.id !== id);
  save(db);
  res.status(204).end();
});

// Users
app.get("/api/users", requireRole("admin"), (req, res) => {
  res.json(load().users.map(({ passwordHash, ...safe }) => safe));
});

app.post("/api/users", requireRole("admin"), (req, res) => {
  const { username, name, password, role } = req.body;
  if (!username || !name || !password) {
    return res.status(404).json({
      message: "Name, username and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  if (!["admin", "staff"].includes(role)) {
    return res.status(400).json({
      message: "Role must be admin or sfaff",
    });
  }

  const db = load();
  if (
    db.users.some((u) => u.username.toLowerCase() === username.toLowerCase())
  ) {
    return res.status(400).json({
      message: "Username already taken",
    });
  }

  const user = {
    id: Date.now(),
    username,
    name,
    role,
    passwordHash: bcrypt.hashSync(password, 10),
  };

  db.users.push(user);
  save(db);

  const { passwordHash, ...safe } = user;
  res.status(201).json(safe);
});

app.delete("/api/users/:id", requireRole("admin"), (req, res) => {
  const id = Number(req.params.id);

  if (id === req.user.id) {
    return res.status(400).json({
      message: "You cannot delete your own account",
    });
  }

  const db = load();
  if (!db.users.some((u) => u.id === id)) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  db.users = db.users.filter((u) => u.id !== id);
  save(db);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
