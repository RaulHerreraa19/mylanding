import mockRequests from "../data/mockRequests.js";

const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";
const TENANT_ID = import.meta.env.VITE_TENANT_ID ?? "default";
const USE_MOCK_ONLY = import.meta.env.VITE_USE_MOCK === "true";

const jsonHeaders = { "Content-Type": "application/json" };

const randomId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `req-${Date.now()}`;

const buildUrl = (path = "", params = new URLSearchParams()) => {
  if (!params.has("tenantId")) {
    params.set("tenantId", TENANT_ID);
  }
  const query = params.toString();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}${query ? `?${query}` : ""}`;
};

const fallbackNotice = (error) => {
  console.warn("[requests-api] Usando datos de mock por:", error.message);
};

export const getRequests = async () => {
  if (USE_MOCK_ONLY) {
    return mockRequests;
  }

  try {
    const response = await fetch(buildUrl("/requests"));
    if (!response.ok) {
      throw new Error("No se pudo cargar la lista de solicitudes.");
    }
    return await response.json();
  } catch (error) {
    fallbackNotice(error);
    return mockRequests;
  }
};

export const updateRequestStatus = async (id, status, tenantId = TENANT_ID) => {
  if (USE_MOCK_ONLY) {
    return { id, tenantId, status };
  }

  try {
    const response = await fetch(buildUrl("/requests"), {
      method: "PATCH",
      headers: jsonHeaders,
      body: JSON.stringify({ id, tenantId, status }),
    });

    if (!response.ok) {
      throw new Error("No se pudo actualizar la solicitud.");
    }

    return await response.json();
  } catch (error) {
    fallbackNotice(error);
    return { id, tenantId, status };
  }
};

export const createRequest = async (payload) => {
  if (USE_MOCK_ONLY) {
    return {
      ...payload,
      id: payload.id ?? randomId(),
      tenantId: payload.tenantId ?? TENANT_ID,
      createdAt: new Date().toISOString(),
    };
  }

  try {
    const response = await fetch(buildUrl("/requests"), {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({
        ...payload,
        tenantId: payload.tenantId ?? TENANT_ID,
      }),
    });

    if (!response.ok) {
      throw new Error("No se pudo registrar la solicitud.");
    }

    return await response.json();
  } catch (error) {
    fallbackNotice(error);
    return {
      ...payload,
      id: payload.id ?? randomId(),
      tenantId: payload.tenantId ?? TENANT_ID,
      createdAt: new Date().toISOString(),
    };
  }
};
