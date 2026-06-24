"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function login() {

    const response = await fetch(
      `${API_BASE}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (data.access_token) {

      localStorage.setItem(
        "token",
        data.access_token
      );

      alert("Login Successful");
      router.push("/");
    }
    else {

      alert(
        data.error || "Login Failed"
      );
    }
  }

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "60px"
      }}
    >

      <div className="card">

        <h1 className="hero-title">
          Login
        </h1>

        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button
          className="btn-primary"
          onClick={login}
        >
          Login
        </button>

      </div>

    </main>
  );
}