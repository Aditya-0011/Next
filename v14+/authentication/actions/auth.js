"use server";
import { redirect } from "next/navigation";

import { UserCreate, UserByEmail } from "@/lib/user";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { CreateAuthSession, DestroySession } from "@/lib/auth";

async function Signup(prevState, data) {
  const email = data.get("email");
  const password = data.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  try {
    const id = UserCreate(email, hashUserPassword(password));
    await CreateAuthSession(id);
    return redirect("/training");
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: { email: "Email already exists" } };
    }
    throw err;
  }
}

async function Login(prevData, data) {
  const email = data.get("email");
  const password = data.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Invalid email";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const user = UserByEmail(email);

  if (!user) {
    return { errors: { email: "Email not found" } };
  }

  const isValid = verifyPassword(user.password, password);

  if (!isValid) {
    return {
      errors: {
        password: "Couldn't authenticate user, please check your credentials",
      },
    };
  }

  await CreateAuthSession(user.id);
  redirect("/training");
}

export async function Logout() {
  await DestroySession();
  redirect("/");
}

export async function Auth(mode, prevState, data) {
  if (mode === "login") {
    return Login(prevState, data);
  }
  return Signup(prevState, data);
}
