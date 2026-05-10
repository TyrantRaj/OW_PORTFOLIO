exports.handler = async (event, context) => {
  const mod = await import("../../dist/server/server.js");

  return mod.default(event, context);
};