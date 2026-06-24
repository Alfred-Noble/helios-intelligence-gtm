"use client";

import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://helios-backend-5jy0.onrender.com";

type MatchedLead = {
  name: string;
  company: string;
  headline: string;
};

type SignalAnalysis = {
  signal: string;
  opportunity: string;
  industry: string;
  target_companies: string[];
  buying_trigger: string;
  recommended_action: string;
};

type SignalResult = {
  articles: {
    title: string;
    url: string;
    source: string;
    published_at: string;
  }[];

  signal_analysis: SignalAnalysis;

  matched_leads: MatchedLead[];
};

export default function SignalsPage() {

  const [industry, setIndustry] = useState("Renewable Energy");

  const [region, setRegion] = useState("United Kingdom");

  const [result, setResult] = useState<SignalResult | null>(null);

  const [loading, setLoading] = useState(false);

  async function analyzeSignals() {

    setLoading(true);

    try {

        console.log(
        `${API_BASE}/signals/?industry=${industry}&region=${region}`
        );

        const response = await fetch(
        `${API_BASE}/signals/?industry=${industry}&region=${region}`
        );

        console.log("Status:", response.status);

        const data = await response.json();

        console.log("Signals Response:", data);

        setResult(data);

    } finally {

        setLoading(false);

    }
    }

  return (
    <ProtectedRoute>
      <main
        style={{
          maxWidth: "1300px",
          margin: "auto",
          padding: "40px"
        }}
      >

        <h1 className="hero-title">
          🌍 Market Signals
        </h1>

        <div className="card">

          <h2>
            Signal Intelligence Engine
          </h2>

          <br />

          <input
            value={industry}
            onChange={(e) =>
              setIndustry(
                e.target.value
              )
            }
            placeholder="Industry"
          />

          <br />
          <br />

          <input
            value={region}
            onChange={(e) =>
              setRegion(
                e.target.value
              )
            }
            placeholder="Region"
          />

          <br />
          <br />

          <button
            className="btn-primary"
            onClick={analyzeSignals}
            >
            Analyze Signals
            </button>

            {
            loading && (
                <div
                    style={{
                        marginTop: "20px",
                        color: "#60a5fa",
                        fontWeight: 700
                    }}
                >
                    ⚡ Scanning news sources...
                    <br />
                    🧠 Extracting market signals...
                    <br />
                    🎯 Matching opportunities...
                </div>
            )
            }

        </div>

        {result && (

          <>

            <div
              className="card"
              style={{
                marginTop: "30px"
              }}
            >
              <h2>
                🌍 Market Signal
              </h2>

              <br />

              <p>
                {
                  result.signal_analysis
                    ?.signal
                }
              </p>

            </div>

            <div
              className="card"
              style={{
                marginTop: "20px"
              }}
            >
              <h2>
                📈 Opportunity
              </h2>

              <br />

              <p>
                {
                  result.signal_analysis
                    ?.opportunity
                }
              </p>

            </div>

            <div
              className="card"
              style={{
                marginTop: "20px"
              }}
            >
              <h2>
                🏢 Target Companies
              </h2>

              <br />

                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px"
                    }}
                >
                    {result.signal_analysis
                        ?.target_companies
                        ?.map(
                        (
                            company: string
                        ) => (
                            <span
                            key={company}
                            className="persona-badge"
                            >
                            {company}
                            </span>
                        )
                        )}
                </div>

            </div>

            <div
              className="card"
              style={{
                marginTop: "20px"
              }}
            >
              <h2>
                ⚡ Buying Trigger
              </h2>

              <br />

              <p>
                {
                  result.signal_analysis
                    ?.buying_trigger
                }
              </p>

            </div>

            <div
              className="card"
              style={{
                marginTop: "20px"
              }}
            >
              <h2>
                🎯 GTM Action
              </h2>

              <br />

              <p>
                {
                  result.signal_analysis
                    ?.recommended_action
                }
              </p>

            </div>

            <div
              className="card"
              style={{
                marginTop: "20px"
              }}
            >
              <h2>
                👥 Matched Leads
              </h2>

              <br />

              {result.matched_leads
                ?.length === 0 ? (
                <p>
                  No matching leads
                  found.
                </p>
              ) : (
                result.matched_leads.map(
                    (
                        lead: MatchedLead,
                        index: number
                    ) => (

                        <Link
                        key={index}
                        href="/leads"
                        style={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                        >
                        <div
                            className="card"
                            style={{
                            marginTop: "10px",
                            cursor: "pointer"
                            }}
                        >
                            <strong>
                            {lead.name}
                            </strong>

                            <br />

                            {lead.company}

                            <br />

                            <span
                            style={{
                                color: "#94a3b8"
                            }}
                            >
                            {lead.headline}
                            </span>
                        </div>
                        </Link>
                    )
                )
              )}

            </div>
            <div
                className="card"
                style={{
                    marginTop: "20px"
                }}
            >
                <h2>
                    📰 Source Articles
                </h2>

                <br />

                {result.articles?.map(
                    (
                    article: {
                        title: string;
                        url: string;
                        source: string;
                        published_at: string;
                    },
                    index: number
                    ) => (
                    <div
                        key={index}
                        style={{
                        marginBottom: "20px",
                        padding: "15px",
                        borderRadius: "12px",
                        background:
                            "rgba(255,255,255,0.04)"
                        }}
                    >
                        <strong>
                        {article.title}
                        </strong>

                        <br />
                        <br />

                        <span>
                        {article.source}
                        </span>

                        <br />

                        <span>
                        {article.published_at}
                        </span>

                        <br />
                        <br />

                        <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        >
                        Read Article →
                        </a>
                    </div>
                    )
                )}
            </div>
          </>

        )}

      </main>
    </ProtectedRoute>
  );
}