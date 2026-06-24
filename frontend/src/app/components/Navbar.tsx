
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://helios-backend-5jy0.onrender.com";

export default function Navbar() {

  const [loggedIn, setLoggedIn] =
    useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("token");

      setLoggedIn(!!token);
    };

    checkAuth();

    window.addEventListener(
      "storage",
      checkAuth
    );

    return () =>
      window.removeEventListener(
        "storage",
        checkAuth
      );
  }, []);

  function logout() {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  }
  return (
    <div
      className="navbar"
    >
      <div>
        <div
          className="logo"
          style={{
            fontWeight: 900,
            fontSize: "24px"
          }}
        >
          ☀ HELIOS
        </div>

        <div
          style={{
            fontSize: "11px",
            color: "#94a3b8"
          }}
        >
          GTM Intelligence Platform
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >
        <Link href="/">
          Dashboard
        </Link>

        <Link href="/leads">
          Leads
        </Link>

        <Link href="/projects">
          Projects
        </Link>

        <Link href="/signals">
          Signals
        </Link>

        <Link href="/upload">
            Upload CSV
        </Link>

        <a
          href={`${API_BASE}/docs`}
          target="_blank"
          rel="noreferrer"
        >
          API Docs
        </a>
        {!loggedIn && (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>
          </>
        )}
        {loggedIn && (
          <button
            className="btn-primary"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}