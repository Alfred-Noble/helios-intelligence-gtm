import ProtectedRoute from "../components/ProtectedRoute";

export default function AboutPage() {

  return (
    <ProtectedRoute>

      <main
        style={{
          maxWidth: "1300px",
          margin: "auto",
          padding: "40px"
        }}
      >

        <section
          style={{
            textAlign: "center",
            marginBottom: "50px"
          }}
        >
          <h1 className="hero-title">
            ☀ HELIOS
          </h1>

          <h2
            style={{
              color: "#cbd5e1"
            }}
          >
            AI-Powered GTM Intelligence Platform
          </h2>

          <br />

          <p
            style={{
              maxWidth: "800px",
              margin: "auto",
              color: "#94a3b8",
              lineHeight: "1.8"
            }}
          >
            Helios helps revenue teams discover,
            prioritize and engage high-value
            opportunities using AI-driven lead
            intelligence, market signals and
            automated outreach.
          </p>
        </section>

        <div className="card">

          <h2>🚀 Mission</h2>

          <br />

          <p>
            To empower GTM teams with
            actionable intelligence by combining
            lead management, AI analysis and
            real-time market signals into a
            unified platform.
          </p>

        </div>

        <div
          className="card"
          style={{
            marginTop: "20px"
          }}
        >

          <h2>🌎 Vision</h2>

          <br />

          <p>
            To become an AI-native revenue
            intelligence platform that helps
            organizations identify opportunities,
            understand market movements and
            accelerate business growth.
          </p>

        </div>

        <div
          className="card"
          style={{
            marginTop: "20px"
          }}
        >

          <h2>⚙ System Architecture</h2>

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
Gemini AI

Market Signals
 ↓
GNews API
 ↓
Article Extraction
 ↓
Signal Intelligence

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
            marginTop: "20px"
          }}
        >

          <div className="card">

            <h2>💻 Frontend</h2>

            <br />

            <p>Next.js</p>
            <p>TypeScript</p>
            <p>Responsive UI</p>
            <p>Protected Routes</p>

          </div>

          <div className="card">

            <h2>🛠 Backend</h2>

            <br />

            <p>FastAPI</p>
            <p>REST APIs</p>
            <p>Repository Pattern</p>
            <p>Service Layer</p>

          </div>

          <div className="card">

            <h2>🗄 Database</h2>

            <br />

            <p>PostgreSQL</p>
            <p>Docker</p>
            <p>SQLAlchemy ORM</p>

          </div>

        </div>

        <div
          className="card"
          style={{
            marginTop: "20px"
          }}
        >

          <h2>🧠 Core Features</h2>

          <br />

          <ul
            style={{
              lineHeight: "2"
            }}
          >
            <li>Lead Management</li>
            <li>CSV Import</li>
            <li>AI Lead Scoring</li>
            <li>Persona Classification</li>
            <li>AI Outreach Generation</li>
            <li>Email Automation</li>
            <li>Project-Based Lead Ranking</li>
            <li>Market Signal Intelligence</li>
            <li>Lead Matching Engine</li>
          </ul>

        </div>

        <div
          className="card"
          style={{
            marginTop: "20px"
          }}
        >

          <h2>🔮 Future Scope</h2>

          <br />

          <ul
            style={{
              lineHeight: "2"
            }}
          >
            <li>LinkedIn Intelligence Engine</li>
            <li>Apollo Integration</li>
            <li>NewsAPI Fallback Layer</li>
            <li>Signal Monitoring Dashboard</li>
            <li>Opportunity Alerts</li>
            <li>Multi-Agent GTM Workflows</li>
          </ul>

        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#94a3b8"
          }}
        >
          Built by Alfred Noble
          <br />
          Final Semester Project 2026
        </div>

      </main>

    </ProtectedRoute>
  );
}