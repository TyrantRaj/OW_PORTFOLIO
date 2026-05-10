exports.handler = async (event, context) => {
  const mod = await import("../../dist/server/server.js");

  const handler = typeof mod.default === "function" ? mod.default :
                  typeof mod.r === "function" ? mod.r :
                  null;

  if (!handler) {
    throw new Error(`No handler found. Exports: ${Object.keys(mod).join(", ")}`);
  }

  const result = await handler(event, context);

  // If it's already a proper Netlify response, pass it through
  if (result && typeof result === "object" && "statusCode" in result) {
    return result;
  }

  // If it returned a string (raw HTML), wrap it
  if (typeof result === "string") {
    return {
      statusCode: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
      body: result,
    };
  }

  // If it's a Web API Response object, convert it
  if (result && typeof result.text === "function") {
    const body = await result.text();
    const headers = {};
    result.headers?.forEach((value, key) => { headers[key] = value; });
    return {
      statusCode: result.status || 200,
      headers,
      body,
    };
  }

  throw new Error(`Unexpected handler return type: ${typeof result} — ${JSON.stringify(result)?.slice(0, 200)}`);
};