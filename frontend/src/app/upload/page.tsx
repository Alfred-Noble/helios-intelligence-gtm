"use client";

import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const API_BASE =
  "http://127.0.0.1:8000";

export default function UploadPage() {

  const [file, setFile] =
    useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function uploadCSV() {

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await fetch(
        `${API_BASE}/leads/upload-csv`,
        {
          method: "POST",
          body: formData
        }
      );

    const data =
      await response.json();

    setMessage(
      JSON.stringify(
        data,
        null,
        2
      )
    );
  }

  return (
    <ProtectedRoute>
      <main
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "40px"
        }}
      >

        <div className="card">

          <h1 className="hero-title">
            CSV Import Center
          </h1>

          <p
            style={{
              color: "#94a3b8"
            }}
          >
            Import prospects directly
            into Helios Intelligence.
          </p>

          <br />

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files?.[0]
                || null
              )
            }
          />

          <br />
          <br />

          <button
            className="btn-primary"
            onClick={uploadCSV}
          >
            Upload CSV
          </button>

        </div>
        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >
          <h2>
            Import Status
          </h2>

          <br />

          <pre
            style={{
              whiteSpace: "pre-wrap"
            }}
          >
            {
              message ||
              "No uploads yet."
            }
          </pre>
        </div>

      </main>
    </ProtectedRoute>
  );
}