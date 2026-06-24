import {
  getAnalytics,
  getLeads,
  getProjects
} from "../lib/api";

import ProtectedRoute from "./components/ProtectedRoute";

type Analytics = {
  total_leads: number;
  high_potential: number;
  medium_potential: number;
  low_potential: number;
  top_location: string;
  top_industry: string;
};

export default async function Home() {
  const analytics =
  await getAnalytics() || {};

  const leads =
    await getLeads() || {
      items: []
    };

  const projects =
    await getProjects() || [];

  // console.log("Analytics", analytics);
  // console.log("Leads", leads);
  // console.log("Projects", projects);


  return (
    <ProtectedRoute>
      <main
        style={{
          padding: "40px",
          maxWidth: "1400px",
          margin: "auto",
          position: "relative",
          zIndex: 1
        }}
      >

        {/* HERO SECTION */}

        <section
          style={{
            textAlign: "center",
            marginBottom: "50px"
          }}
        >
          <h1 className="hero-title">
            ◎ HELIOS
          </h1>

          <h2
            style={{
              fontSize: "32px",
              marginBottom: "15px",
              color: "#e2e8f0"
            }}
          >
            AI-Powered Revenue Intelligence
          </h2>

          <p
            style={{
              color: "#94a3b8",
              maxWidth: "900px",
              margin: "0 auto",
              lineHeight: "1.8",
              fontSize: "18px"
            }}
          >
            AI-Powered GTM Intelligence Platform
            for Lead Discovery, Qualification,
            Outreach & Revenue Growth
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              color: "#cbd5e1",
              fontWeight: 600
            }}
          >
            <span>Discover</span>
            <span>•</span>
            <span>Prioritize</span>
            <span>•</span>
            <span>Engage</span>
            <span>•</span>
            <span>Convert</span>
          </div>
        </section>

        {/* STATS */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}
        >
          <div className="card">
            <div className="stat-number">
              {analytics?.total_leads ?? 0}
            </div>
            <h3>Total Leads</h3>
            <p style={{ color: "#94a3b8" }}>
              Imported and analyzed
            </p>
          </div>

          <div className="card">
            <div className="stat-number">
              {Array.isArray(projects) ? projects.length : 0}
            </div>
            <h3>Projects</h3>
            <p style={{ color: "#94a3b8" }}>
              Active GTM campaigns
            </p>
          </div>

          <div className="card">
            <div className="stat-number">{analytics?.high_potential ?? 0}</div>
            <h3>High Potential</h3>
            <p style={{ color: "#94a3b8" }}>
              AI-qualified prospects
            </p>
          </div>

          <div className="card">
            <div className="stat-number">
              {analytics?.top_industry ?? "N/A"}
            </div>

            <h3>Top Industry</h3>

            <p style={{ color: "#94a3b8" }}>
              Highest lead concentration
            </p>
            <p style={{ color: "#94a3b8" }}>
              SMTP integration active
            </p>
          </div>
        </section>

        {/* FEATURES */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px"
          }}
        >
          <div className="card">
            <h2>🧠 AI Intelligence</h2>

            <br />

            <ul
              style={{
                lineHeight: "2"
              }}
            >
              <li>Lead Scoring Engine</li>
              <li>Persona Classification</li>
              <li>Project Matching</li>
              <li>GTM Intelligence</li>
            </ul>
          </div>

          <div className="card">
            <h2>⚡ Automation</h2>

            <br />

            <ul
              style={{
                lineHeight: "2"
              }}
            >
              <li>CSV Import</li>
              <li>Email Outreach</li>
              <li>JWT Authentication</li>
              <li>Analytics Dashboard</li>
            </ul>
          </div>

          <div className="card">
            <h2>🚀 Platform Status</h2>

            <br />

            <p>
              Backend APIs Operational
            </p>

            <br />

            <p>
              Database Connected
            </p>

            <br />

            <p>
              SMTP Active
            </p>

            <br />

            <p>
              AI Layer Integrated
            </p>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginTop: "30px"
          }}
        >

          <div className="card">

            <h2>🧠 AI Intelligence Feed</h2>

            <br />

            <strong>
              Top Opportunity
            </strong>

            <p>
              Ananya Gupta
            </p>

            <br />

            <p>
              AI Founder with
              strong decision-making authority.
            </p>

          </div>

          <div className="card">

            <h2>📈 GTM Insights</h2>

            <br />

            <p>
              Best Industry:
              {" "}
              {analytics?.top_industry}
            </p>

            <br />

            <p>
              Top Location:
              {" "}
              {analytics?.top_location}
            </p>

          </div>

          <div className="card">

            <h2>🚀 Activity Feed</h2>

            <br />

            <p>
              {analytics?.total_leads}
              {" "}
              Leads Imported
            </p>

            <br />

            <p>
              {projects.length}
              {" "}
              Active Projects
            </p>

          </div>

        </section>

        {/* RECENT LEADS */}

        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >
          <h2>📊 Recent Leads</h2>
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "20px"
            }}
          >
            Recently imported and AI-qualified leads
          </p>

          <br />

          <table className="crm-table">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Company</th>
                <th align="left">Industry</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(leads.items) &&
                leads.items.slice(0, 5).map(
                  (lead: {
                    id: number;
                    full_name: string;
                    company: string;
                    industry: string;
                  }) => (
                    <tr key={lead.id}>
                      <td>{lead.full_name}</td>
                      <td>{lead.company}</td>
                      <td>{lead.industry}</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        {/* TECH STACK */}

        <div
          className="card"
          style={{
            marginTop: "30px"
          }}
        >
          <h2>⚙ Technology Stack</h2>

          <br />

          <p>
            FastAPI • PostgreSQL • SQLAlchemy
          </p>

          <br />

          <p>
            Next.js • TypeScript • JWT
          </p>

          <br />

          <p>
            SMTP • AI Intelligence Layer • GTM Engine
          </p>
        </div>    
        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#94a3b8",
            lineHeight: "1.8"
          }}
        >
          <div>
            HELIOS Intelligence Platform
          </div>

          <div>
            AI-Powered GTM Intelligence System
          </div>

          <div>
            Built by Alfred Noble
          </div>

        </div>

      </main>
    </ProtectedRoute>
  );
}