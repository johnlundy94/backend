const registerService = require("./service/register");
const loginService = require("./service/login");
const verifyService = require("./service/verify");
const healthPath = "/health";
const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verify";

export const handler = async (event) => {
  console.log("Request Event: ", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === registerPath:
      const registerBody = JSON.parse(event.body);
      response = await registerService.register(registerBody);
      break;
    case event.httpMethod === "POST" && event.path === loginPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === verifyPath:
      response = buildResponse(200);
      break;
    default:
      response = buildResponse(400, "404 Not Found");
  }
  return response;
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
