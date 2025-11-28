const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
export const withCors = (headers = {}) => ({
    ...corsHeaders,
    ...headers
});
export const jsonResponse = (payload, status = 200, headers = {}) => new Response(JSON.stringify(payload), {
    status,
    headers: {
        'Content-Type': 'application/json',
        ...withCors(headers)
    }
});
export const errorResponse = (message, status = 400, details) => jsonResponse({ message, details }, status);
export const emptyResponse = (status = 204) => new Response(null, { status, headers: withCors() });
export const corsPreflight = () => emptyResponse(204);
//# sourceMappingURL=response.js.map