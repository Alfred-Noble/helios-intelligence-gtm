"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function LeadsPage() {

  type Lead = {
    id: number;
    full_name: string;
    company: string;
    industry: string;
    ai_score?: number;
    persona?: string;
    };

    const [leads, setLeads] = useState<Lead[]>([]);
    const [search, setSearch] = useState("");
    const [aiResult, setAiResult] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      (lead.full_name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (lead.company || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (lead.industry || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const [form, setForm] = useState({
    full_name: "",
    headline: "",
    company: "",
    industry: "",
    location: "",
    email: ""
  });

  async function loadLeads() {

    const response = await fetch(
      `${API_BASE}/leads/`
    );

    const data = await response.json();

    setLeads(data.items || []);
  }

  useEffect(() => {

    const fetchLeads = async () => {
        const response = await fetch(
        `${API_BASE}/leads/`
        );

        const data = await response.json();

        setLeads(data.items || []);
    };

    fetchLeads();

    }, []);

  async function createLead() {

    await fetch(
      `${API_BASE}/leads/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    setForm({
      full_name: "",
      headline: "",
      company: "",
      industry: "",
      location: "",
      email: ""
    });

    await loadLeads();
  }

  return (
    <ProtectedRoute>
      <main
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "40px"
        }}
      >

        <div
          style={{
            marginBottom: "30px"
          }}
        >
          <h1 className="hero-title">
            Lead Intelligence Hub
          </h1>

          <p
            style={{
              color: "#94a3b8"
            }}
          >
            Discover, score and engage
            high-value prospects.
          </p>
        </div>

        <div
          className="card"
          style={{
            marginBottom: "30px"
          }}
        >
          <h2>Create New Lead</h2>

          <p
            style={{
              color:"#94a3b8",
              marginBottom:"20px"
            }}
          >
            Add prospects to the GTM engine.
          </p>

          <br />

          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value
              })
            }
          />

          <br /><br />

          <input
            placeholder="Headline"
            value={form.headline}
            onChange={(e) =>
              setForm({
                ...form,
                headline: e.target.value
              })
            }
          />

          <br /><br />

          <input
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value
              })
            }
          />

          <br /><br />

          <input
            placeholder="Industry"
            value={form.industry}
            onChange={(e) =>
              setForm({
                ...form,
                industry: e.target.value
              })
            }
          />

          <br /><br />

          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({
                ...form,
                location: e.target.value
              })
            }
          />

          <br /><br />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <br /><br />

          <button className="btn-primary"
            onClick={createLead}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Create Lead
          </button>

        </div>

        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >

          <h2>All Leads</h2>

          <br />

          <input
            placeholder="🔍 Search by Name, Company or Industry"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              marginBottom: "20px"
            }}
          />

          <br />

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "15px"
            }}
          >
            Showing
            {" "}
            {filteredLeads.length}
            {" "}
            leads
          </p>

          <table className="crm-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Industry</th>
                <th>AI Score</th>
                <th>Persona</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredLeads.map(
                (lead) => (
                  <tr key={lead.id}>
                      <td>{lead.full_name}</td>
                      <td>{lead.company}</td>
                      <td>{lead.industry}</td>
                      <td>
                        <span className="score-pill">
                          {lead.ai_score ?? "-"}
                        </span>
                      </td>
                      <td>
                        <span className="persona-badge">
                          {lead.persona ?? "Unknown"}
                        </span>
                      </td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                          }}
                        >
                          <button
                            className="btn-primary"
                            onClick={async () => {
                              const response = await fetch(
                                `${API_BASE}/leads/${lead.id}/score`,
                                {
                                  method: "POST"
                                }
                              );

                              const data = await response.json();

                              setAiResult(`
                              🧠 AI Lead Analysis

                              Lead: ${lead.full_name}

                              Score: ${data.score}

                              Tier: ${data.tier}

                              Reason:
                              ${data.reason}
                              `);

                              await loadLeads();
                            }}
                          >
                            Score
                          </button>

                          <button
                            className="btn-primary"
                            onClick={async () => {
                              const response = await fetch(
                                `${API_BASE}/leads/${lead.id}/generate-message`,
                                {
                                  method: "POST"
                                }
                              );

                              const data = await response.json();

                              setAiResult(`
                              📨 AI Outreach Message

                              ${data.message}
                              `);
                            }}
                          >
                            Message
                          </button>

                          <button
                            className="btn-primary"
                            onClick={async () => {
                              const response = await fetch(
                                `${API_BASE}/leads/${lead.id}/classify`,
                                {
                                  method: "POST"
                                }
                              );

                              const data = await response.json();

                              setAiResult(`
                              👤 Persona Classification

                              ${data.persona}
                              `);

                              await loadLeads();
                            }}
                          >
                            Classify
                          </button>
                          <button
                            className="btn-primary"
                            onClick={async () => {

                              const response = await fetch(
                                `${API_BASE}/leads/${lead.id}/send-email`,
                                {
                                  method: "POST"
                                }
                              );

                              const data = await response.json();

                              alert(
                                data.message ||
                                "Email sent successfully"
                              );

                            }}
                          >
                            Send Email
                          </button>
                        </div>
                      </td>
                      
                  </tr>
                )
              )}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    No leads found
                  </td>
                </tr>
              )}

            </tbody>

          </table>
          <div
            className="card"
            style={{
              marginTop: "30px"
            }}
          >
            <h2>AI Intelligence Panel</h2>

            <br />

            <pre
              style={{
                whiteSpace: "pre-wrap",
                color: "#e2e8f0"
              }}
            >
              {aiResult || "Run an AI action to see results."}
            </pre>
          </div>

        </div>


      </main>
    </ProtectedRoute>
  );
}