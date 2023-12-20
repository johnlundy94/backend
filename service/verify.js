const util = require("../utils/util");

function verify(requestBody) {
  if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
    return util.buildResponse(401, {
      verified: false,
      message: "Incorrect request body",
    });
  }

  const user = requestBody.user;
  const token = requestBody.token;
}
