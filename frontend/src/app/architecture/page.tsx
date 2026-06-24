import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ArchitecturePage() {

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
          ⚙ HELIOS Architecture
        </h1>

        <br />

        <div className="card">

          <h2>
            System Overview
          </h2>

          <br />

          <pre
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "2"
            }}
          >
{`
User
 ↓
Next.js Frontend
 ↓
FastAPI Backend
 ↓
PostgreSQL Database

AI Layer
 ↓
Gemini

Market Intelligence
 ↓
GNews API
 ↓
Article Extraction
 ↓
Signal Analysis

Communication
 ↓
SMTP Email Service
`}
          </pre>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "30px"
          }}
        >

          <div className="card">
            <h2>Frontend</h2>

            <br />

            <p>Next.js 16</p>
            <p>TypeScript</p>
            <p>Protected Routes</p>
            <p>JWT Authentication</p>
          </div>

          <div className="card">
            <h2>Backend</h2>

            <br />

            <p>FastAPI</p>
            <p>REST APIs</p>
            <p>Service Layer</p>
            <p>Repository Pattern</p>
          </div>

          <div className="card">
            <h2>Database</h2>

            <br />

            <p>PostgreSQL</p>
            <p>Docker Container</p>
            <p>SQLAlchemy ORM</p>
          </div>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >

          <div className="card">

            <h2>AI Layer</h2>

            <br />

            <p>Gemini 2.5 Flash</p>
            <p>Lead Scoring</p>
            <p>Persona Classification</p>
            <p>Outreach Generation</p>

          </div>

          <div className="card">

            <h2>Signal Engine</h2>

            <br />

            <p>GNews API</p>
            <p>BS4 Extraction</p>
            <p>Opportunity Detection</p>
            <p>Lead Matching</p>

          </div>

          <div className="card">

            <h2>Communication</h2>

            <br />

            <p>SMTP</p>
            <p>Email Outreach</p>
            <p>Campaign Support</p>

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}