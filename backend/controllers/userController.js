import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";

export const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;

  findUserByEmail(email, (err, result) => {
    if (result?.length) return res.status(400).json({ msg: "User exists" });

    const hashed = bcrypt.hashSync(password, 10);

    createUser(name, email, hashed, role, (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "User registered successfully" });
    });
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, rows) => {
    if (!rows?.length) return res.status(400).json({ msg: "User not found" });

    const user = rows[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  });
};
