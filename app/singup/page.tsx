"use client";
import { useState } from "react";
import { signup } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    action: (formData: FormData) => Promise<string | null>,
    formData: FormData
  ) => {
    const errorMessage = await action(formData);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      window.location.href = "/account";
    }
  };

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <form
          className="flex flex-col gap-1 max-w-96"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(signup, new FormData(e.currentTarget));
          }}
        >
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={6}
            required
          />
          <label htmlFor="password">Repeat Password:</label>
          <input
            id="repeat_password"
            name="password"
            type="password"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit">Sign up</button>
        </form>
      </div>
    </main>
  );
}
