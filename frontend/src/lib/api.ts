const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://helios-backend-5jy0.onrender.com";

async function fetchJson(url: string) {
  const response = await fetch(url, {
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();

    console.error(
      "API Error:",
      response.status,
      text
    );

    return null;
  }

  return response.json();
}

export async function getAnalytics() {
  return fetchJson(
    `${API_BASE}/analytics/summary`
  );
}

export async function getLeads() {
  return fetchJson(
    `${API_BASE}/leads/`
  );
}

export async function getProjects() {
  return fetchJson(
    `${API_BASE}/projects/`
  );
}