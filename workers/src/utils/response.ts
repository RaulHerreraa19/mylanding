const corsHeaders: HeadersInit = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const withCors = (headers: HeadersInit = {}) => ({
  ...corsHeaders,
  ...headers
});

export const jsonResponse = (payload: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...withCors(headers)
    }
  });

export const errorResponse = (message: string, status = 400, details?: unknown) =>
  jsonResponse({ message, details }, status);

export const emptyResponse = (status = 204) => new Response(null, { status, headers: withCors() });

export const corsPreflight = () => emptyResponse(204);
