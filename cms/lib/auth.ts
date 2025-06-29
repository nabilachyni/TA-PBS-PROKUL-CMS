"use server";

import { cookies } from "next/headers";
import api from "@/lib/api";
import { redirect } from "next/navigation";

type LoginState = {
  success: boolean;
  error?: string;
  user?: any;
  token?: string;
};

export async function adminLoginActionWithState(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const { user, token, role } = response.data;

    // Jika bukan admin, langsung tolak
    if (role !== "admin") {
      return {
        success: false,
        error: "Anda bukan admin.",
      };
    }

    // Simpan token di cookie khusus admin
    (
      await // Simpan token di cookie khusus admin
      cookies()
    ).set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 minggu
      path: "/dashboard", // Hanya untuk path dashboard
    });

    console.log("token admin disimpan:", token);

    return {
      success: true,
      user,
      token,
    };
  } catch (error: any) {
    console.error("Admin login error:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Admin Login Gagal",
    };
  }
}

export async function logoutAdminAction() {
  // Hapus cookie admin
  (
    await // Hapus cookie admin
    cookies()
  ).delete({
    name: "admin_token",
    path: "/dashboard",
  });

  redirect("/login");
}
