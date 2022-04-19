const AWS = require("aws-sdk");

const ENDPOINT =
  "032f3wu9oj.execute-api.us-east-1.amazonaws.com/production/testConnection";
const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });
const names = {};

const sendToOne = async (id, body) => {
  try {
    await client
      .postToConnection({
        ConnectionId: id,
        Data: Buffer.from(JSON.stringify(body)),
      })
      .promise();
  } catch (e) {
    console.log("error", e);
  }
};

const sendToAll = async (ids, body) => {
  const all = await ids.map((id) => sendToOne(id, body));
  return Promise.all(all);
};

exports.handler = async (event) => {
  if (event.requestContext) {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    let body = {};

    try {
      if (event.body) {
        body = JSON.parse(event.body);
      }
    } catch (e) {}

    switch (routeKey) {
      case "$connect":
        // await sendToAll(Object.keys())
        break;
      case "$disconnect":
        await sendToAll(Object.keys(names), {
          systemMessage: `${names[connectionId]} has left the chat.`,
        });
        delete names[connectionId];
        await sendToAll(Object.keys(names), { members: Object.values(names) });
        break;
      case "$default":
        break;
      case "setName":
        names[connectionId] = body.name;
        await sendToAll(Object.keys(names), { members: Object.values(names) });
        await sendToAll(Object.keys(names), {
          systemMessage: `${names[connectionId]}  has joined the chat.`,
        });
        break;
      case "sendPublic":
        await sendToAll(Object.keys(names), {
          publicMessage: `${names[connectionId]}: ${body.message}`,
        });
        break;
      case "sendPrivate":
        const to = Object.keys(names).find((f) => names[f] === body.to);
        await sendToOne(to, {
          privateMessage: `${names[connectionId]}: ${body.message}`,
        });
        break;
      default:
      // code
    }
  }
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
