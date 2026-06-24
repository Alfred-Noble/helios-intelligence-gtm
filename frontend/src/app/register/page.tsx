"use client";

import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function RegisterPage() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function register() {

    const response = await fetch(
      `${API_BASE}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );

    const data =
      await response.json();

    if (data.id) {

      alert(
        "Registration Successful"
      );

      window.location.href =
        "/login";

    } else {

      alert(
        data.error ||
        "Registration Failed"
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

        <h1
          className="hero-title"
        >
          Register
        </h1>

        <br />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          className="btn-primary"
          onClick={register}
        >
          Create Account
        </button>

      </div>

    </main>
  );
}