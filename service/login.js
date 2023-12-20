const AWS = require("aws-sdk");
AWS.configure.update({
  region: "us-east-1",
});
const util = require("../utils/util");
const bcrypt = require("bcryptjs");

const dynamodb = new AWS.DynamoBD.DocumentClient();
const userTable = "fitness-app-users";

async function login(user) {
  const username = user.username;
  const password = user.password;
  if (!user || !username || !password) {
    return util.buildResponse(401, {
      message: "Incorrect username and password",
    });
  }

  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (!dynamoUser || !dynamoUser.username) {
    return util.buildResponse(403, { message: "User does not exist" });
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return util.buildResponse(403, { message: "Password is incorrect" });
  }

  const userInfo = {
    username: dynamoUser.username,
    name: dynamoUser.name,
  };
}
