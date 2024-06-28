
import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";

type FormData = {
  email: string;
};

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { resetPassword } = AuthActions();

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email).res();
      alert("Password reset email sent. Please check your inbox.");
    } catch (err) {
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-2xl font-semibold">Recuperar Senha</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          {errors.email && (
            <span className="text-xs text-red-600">Email is required</span>
          )}
          <div className="flex items-center justify-between mt-4">
            <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Send Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;