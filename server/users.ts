"use server"
import { auth } from "@/lib/auth"

export const signInUser = async (email: string, password: string) => {
  try {
    // Capture the result of signInEmail call
    const result = await auth.api.signInEmail({
      body: { email, password },
    });

    // Assuming 'result' contains user info in 'user' property
    return {
      success: true,
      message: "Signed in successfully",
      user: result.user,  // <-- Add user here
    };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to sign in" };
  }
};


export const signUpUser = async (email: string, name: string, password: string) => {
  try {
    // Capture the result of signUpEmail call
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    });

    // Assuming 'result' contains user info in 'user' property
    return {
      success: true,
      message: "Signed up successfully",
      user: result.user,  // <-- Add user here
    };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to sign up" };
  }
};