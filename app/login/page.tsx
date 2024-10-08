"use client";
import { useState } from "react";
import { login } from "./actions";

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
            handleSubmit(login, new FormData(e.currentTarget));
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
          {error && <p className="text-red-500">{error}</p>}{" "}
          <button type="submit">Log in</button>
        </form>
      </div>
    </main>
  );
}
