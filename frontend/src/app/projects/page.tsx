"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "../components/ProtectedRoute";


const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

type Project = {
  id: number;
  name: string;
  industry: string;
  goal: string;
};

type RankedLead = {
  lead_id: number;
  full_name: string;
  company: string;
  match_score: number;
  recommendation: string;
  persona: string;
  llm_analysis: string;
};

type ProjectDashboard = {
  project: string;
  industry: string;
  total_leads_evaluated: number;
  strong_matches: number;
  potential_matches: number;
  low_priority: number;
  average_match_score: number;
  average_ai_score: number;
  top_match: string;
};

function parseAIAnalysis(text: string) {

  try {

    const cleaned = text
      .replace("```json", "")
      .replace("```", "")
      .trim();

    return JSON.parse(cleaned);

  } catch {

    return null;
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [rankResults, setRankResults] = useState("");
  const [rankedLeads, setRankedLeads] = useState<RankedLead[]>([]);
  const [dashboard, setDashboard] = useState<ProjectDashboard | null>(null);
  const [goal, setGoal] = useState("");


  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    goal:""
  });

  async function loadProjects() {
    const response = await fetch(
      `${API_BASE}/projects/`
    );

    const data = await response.json();

    setProjects(data || []);
  }

  useEffect(() => {

    async function fetchData() {
        await loadProjects();
    }

    fetchData();

    }, []);

  async function createProject() {
    await fetch(
      `${API_BASE}/projects/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    setForm({
      name: "",
      industry: "",
      description: "",
      goal: ""
    });

    await loadProjects();
  }

  async function rankLeads(projectId: number) {
    const response = await fetch(
      `${API_BASE}/projects/${projectId}/rank-leads`,
      {
        method: "POST"
      }
    );

    const data = await response.json();

    setRankedLeads(
      data.ranked_leads || []
    );
  }

  async function loadDashboard(projectId: number) {

    const response = await fetch(
      `${API_BASE}/projects/${projectId}/dashboard`
    );

    const data =
      await response.json();

    setDashboard(data);
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

        <h1 className="hero-title">
          Projects
        </h1>

        <div className="card">

          <h2>Create Project</h2>

          <br />

          <input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
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

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
          />
          <br /><br />

          <textarea
            placeholder="Project Goal"
            value={form.goal}
            onChange={(e) =>
              setForm({
                ...form,
                goal: e.target.value
              })
            }
          />

          <br /><br />

          <button className="btn-primary"
            onClick={createProject}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Create Project
          </button>

        </div>

        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >
          <h2>All Projects</h2>

          <br />

          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom:
                  "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <strong>
                {project.name}
              </strong>

              <br />

              {project.industry}

              <br />
              <br />

              <button className="btn-primary"
                onClick={() =>
                  rankLeads(project.id)
                }
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Rank Leads
              </button>

              <button
                className="btn-primary"
                onClick={() =>
                  loadDashboard(
                    project.id
                  )
                }
                style={{
                  marginLeft: "10px"
                }}
              >
                Dashboard
              </button>

            </div>
          ))}

        </div>
        {
          rankedLeads.length > 0 && (

            <div
              className="card"
              style={{
                marginTop: "30px"
              }}
            >

              <h2>
                🧠 AI Match Analysis
              </h2>

              <br />

              {rankedLeads.map(
                (lead) => (

                  <div
                    key={lead.lead_id}
                    style={{
                      padding: "20px",
                      marginBottom: "20px",
                      border:
                        "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px"
                    }}
                  >

                    <h3>
                      {lead.full_name}
                    </h3>

                    <p>
                      <strong>Company:</strong>
                      {" "}
                      {lead.company}
                    </p>

                    <p>
                      <strong>Persona:</strong>
                      {" "}
                      {lead.persona}
                    </p>

                    <p>
                      <strong>Match Score:</strong>
                      {" "}
                      {lead.match_score}
                    </p>

                    <p>
                      <strong>Recommendation:</strong>
                      {" "}
                      {lead.recommendation}
                    </p>

                    <hr />

                    {
                      (() => {

                        const ai =
                          parseAIAnalysis(
                            lead.llm_analysis
                          );

                        if (!ai) {

                          return (
                            <p>
                              {lead.llm_analysis}
                            </p>
                          );
                        }

                        return (
                          <div>

                            <p>
                              <strong>
                                AI Score:
                              </strong>
                              {" "}
                              {ai.score}
                            </p>

                            <p>
                              <strong>
                                Reason:
                              </strong>
                            </p>

                            <p>
                              {ai.reason}
                            </p>

                            <p>
                              <strong>
                                Outreach:
                              </strong>
                            </p>

                            <p>
                              {ai.outreach}
                            </p>

                          </div>
                        );

                      })()
                    }
                    {
                      dashboard && (

                        <div
                          className="card"
                          style={{
                            marginTop: "30px"
                          }}
                        >

                          <h2>
                            📊 Project Dashboard
                          </h2>

                          <br />

                          <p>
                            <strong>
                              Project:
                            </strong>
                            {" "}
                            {dashboard.project}
                          </p>

                          <p>
                            <strong>
                              Industry:
                            </strong>
                            {" "}
                            {dashboard.industry}
                          </p>

                          <p>
                            <strong>
                              Total Leads:
                            </strong>
                            {" "}
                            {
                              dashboard.total_leads_evaluated
                            }
                          </p>

                          <p>
                            <strong>
                              Strong Matches:
                            </strong>
                            {" "}
                            {
                              dashboard.strong_matches
                            }
                          </p>

                          <p>
                            <strong>
                              Potential Matches:
                            </strong>
                            {" "}
                            {
                              dashboard.potential_matches
                            }
                          </p>

                          <p>
                            <strong>
                              Average Match Score:
                            </strong>
                            {" "}
                            {
                              dashboard.average_match_score
                            }
                          </p>

                          <p>
                            <strong>
                              Average AI Score:
                            </strong>
                            {" "}
                            {
                              dashboard.average_ai_score
                            }
                          </p>

                          <p>
                            <strong>
                              Top Match:
                            </strong>
                            {" "}
                            {
                              dashboard.top_match
                            }
                          </p>

                        </div>
                      )
                    }

                  </div>
                )
              )}

            </div>
          )
        }

      </main>
    </ProtectedRoute>
  );
}