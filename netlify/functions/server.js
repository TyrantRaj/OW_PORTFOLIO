const handler = require("../../dist/server/server.js");

exports.handler = async (event, context) => {
  return handler.default(event, context);
};