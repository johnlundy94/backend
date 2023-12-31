const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const util = require("../utils/util");
const bcrypt = require("bcryptjs");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "fitness-app-users";

async function register(userInfo) {
  const name = userInfo.name;
  const email = userInfo.email;
  const username = userInfo.username;
  const password = userInfo.password;
  if (!username || !name || !email || !password) {
    return util.buildResponse(401, {
      message: "All fields are required",
    });
  }

  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (dynamoUser && dynamoUser.username) {
    return util.buildResponse(401, {
      message: "Username already exists",
    });
  }

  const encryptedPW = bcrypt.hashSync(password.trim(), 10);
  const user = {
    name: name,
    email: email,
    username: username.toLowerCase().trim(),
    password: encryptedPW,
  };

  const saveUserReponse = await saveUser(user);
  if (!saveUserReponse) {
    return util.buildResponse(503, { message: "Server Error" });
  }

  return util.buildResponse(200, { username: username });
}

async function getUser(username) {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    },
  };

  try {
    const response = await dynamodb.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error("Error getting user: ", error);
    return null;
  }
}

async function saveUser(user) {
  const params = {
    TableName: userTable,
    Item: user,
  };
  try {
    await dynamodb.put(params).promise();
    return true;
  } catch (error) {
    console.error("Error saving user: ", error);
    return false;
  }
}

module.exports.register = register;
