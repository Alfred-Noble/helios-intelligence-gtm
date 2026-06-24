"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [loggedIn, setLoggedIn] =
    useState<boolean>(false);

  useEffect(() => {

    setLoggedIn(
      localStorage.getItem("token") !== null
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
          href="http://127.0.0.1:8000/docs"
          target="_blank"
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