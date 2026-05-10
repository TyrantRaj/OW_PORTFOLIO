exports.handler = async (event, context) => {
  const mod = await import("../../dist/server/server.js");

  // TanStack Start exports a fetch-based handler, find it
  const fetchHandler = mod.default || mod.handler || mod.fetch;

  if (typeof fetchHandler !== "function") {
    throw new Error(
      `No valid handler found. Exports: ${Object.keys(mod).join(", ")}`
    );
  }

  // Convert Netlify event → Web API Request
  const protocol = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers["host"] || "localhost";
  const url = `${protocol}://${host}${event.rawUrl || event.path}`;

  const request = new Request(url, {
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: ["GET", "HEAD"].includes(event.httpMethod)
      ? undefined
      : event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : event.body || undefined,
  });

  // Call TanStack's fetch handler
  const response = await fetchHandler(request);

  // Convert Web API Response → Netlify response
  const responseBuffer = await response.arrayBuffer();
  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: Buffer.from(responseBuffer).toString("base64"),
    isBase64Encoded: true,
  };
};