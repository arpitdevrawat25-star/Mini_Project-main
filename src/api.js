async function request(path, options) {
	const res = await fetch(`/api${path}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(data.error || "Request failed");
	return data;
}

const post = (path, body) =>
	request(path, { method: "POST", body: JSON.stringify(body) });

export const api = {
	health: () => request("/health"),
	options: () => request("/options"),
	history: () => request("/history"),
	session: (id) => request(`/history/${id}`),
	recommend: (profile) => post("/recommend", { profile }),
	roadmap: (profile, career) => post("/roadmap", { profile, career }),
	chat: (profile, messages) => post("/chat", { profile, messages }),
};
