const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "dev-secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "8h";

// Mock users for MVP
const USERS = [
  { id: "1", username: "admin", password: "admin123", role: "admin" },
  { id: "2", username: "supplier", password: "supplier123", role: "supplier" },
  { id: "3", username: "customer", password: "customer123", role: "customer" },
];

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn }
  );
  res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
};
