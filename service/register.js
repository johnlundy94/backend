const AWS = require("aws-sdk");
AWS.configure.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoBD.DocumentClient();
const userTable = "fitness-app-users";

async function register(userInfo) {
  const name = userInfo.name;
  const email = userInfo.email;
  const username = userInfo.username;
  const password = userInfo.password;
  if (!username || !name || !email || !password) {
    return;
  }
}
