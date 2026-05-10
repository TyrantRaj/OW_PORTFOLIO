exports.handler = async (event, context) => {
  const mod = await import("../../dist/server/server.js");

  // Log what we're actually working with
  console.log("mod keys:", Object.keys(mod));
  console.log("mod.default type:", typeof mod.default);
  console.log("mod.r type:", typeof mod.r);
  console.log("mod.default:", JSON.stringify(mod.default)?.slice(0, 200));

  // Try every possible export as a fetch handler
  const fetchHandler =
    (typeof mod.default === "function" && mod.default) ||
    (typeof mod.r === "function" && mod.r) ||
    mod.default?.fetch ||
    mod.default?.handle ||
    mod.default?.handler ||
    mod.r?.fetch;

  if (typeof fetchHandler !== "function") {
    throw new Error(
      `No fetch handler found. Types — default: ${typeof mod.default}, r: ${typeof mod.r}, default.fetch: ${typeof mod.default?.fetch}`
    );
  }

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

  const response = await fetchHandler(request);

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