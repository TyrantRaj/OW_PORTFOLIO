exports.handler = async (event, context) => {
  const mod = await import("../../dist/server/server.js");

  // TanStack Start's Netlify adapter already speaks Netlify's format
  const handler = typeof mod.default === "function" ? mod.default :
                  typeof mod.r === "function" ? mod.r :
                  null;

  if (!handler) {
    throw new Error(`No handler found. Exports: ${Object.keys(mod).join(", ")}`);
  }

  // Pass Netlify event directly — no Request/Response conversion needed
  return handler(event, context);
};