// Simple GET helper using fetch — supports optional JWT token
export async function apiGet(path, token = null) {
  const url = `${API_BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    const message = `API GET ${path} failed with status ${res.status}`;
    throw new Error(message);
  }

  const data = await res.json();
  return data;
}
// Simple POST helper using fetch — supports optional JWT token
export async function apiPost(path, body = {}, token = null) {
  const url = `${API_BASE_URL}${path}`;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const message = `API POST ${path} failed with status ${res.status}`;
    throw new Error(message);
  }

  const data = await res.json();
  return data;
}