import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone, birth } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists[0]) throw new Error("Este email já está cadastrado.");

      const user = await userService.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        birth,
        role: "user",
      });

      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
