var express = require("express");
var router = express.Router();
var AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// // off
const accessKeyId = "AKIA5I66LT7RZHG7L257";
const secretAccessKey = "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";

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region: "us-east-1",
});

AWS.config.credentials = new AWS.Credentials(
  accessKeyId,
  secretAccessKey,
  null
);
const chime = new AWS.Chime({ region: "us-east-1" });
chime.endpoint = new AWS.Endpoint(
  "https://service.chime.aws.amazon.com/console"
);

// console.log("chime: ", chime);
// console.log("AWS: ", AWS.ChimeSDKMeetings);

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

// router.post("/bot", async (req, res) => {
//   console.log("this is bot", req.body);
//   const lexRunTime = new AWS.LexRuntime({ apiVersion: "2016-11-28" });

//   var params = {
//     botAlias: "flowerAliasName" /* required */,
//     botName: "OrderFlower" /* required */,
//     inputText: req.body.message.message /* required */,
//     userId: "912610009059" /* required */,
//     // activeContexts: [
//     //   {
//     //     name: "alok" /* required */,
//     //     parameters: {
//     //       /* required */
//     //       "<ParameterName>": "this is the test parameters Name",
//     //       /* '<Parameter Name>': ... */
//     //     },
//     //     timeToLive: {
//     //       /* required */ timeToLiveInSeconds: 5,
//     //       turnsToLive: 5,
//     //     },
//     //   },
//     //   /* more items */
//     // ],
//   };

//   lexRunTime.postText(params, (err, data) => {
//     if (err) res.send(err);
//     res.send(data);
//   });
// });

async function createMetting() {
  // const meeting = await chime
  //   .createMeeting({
  //     ClientRequestToken: uuidv4(),
  //   })
  //   .promise()
  //   .then((meeting) => {
  //     console.log("Meeting Created Successfully!!", meeting);
  //   })
  //   .catch((err) => {
  //     console.log("error in creating meeting: ", err);
  //   });

  var chimesdkmessaging = new AWS.ChimeSDKMessaging();
  console.log("chimesdkmessaging", chimesdkmessaging);
  // chimesdkmessaging.associateChannelFlow(params, function (err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else console.log(data); // successful response
  // });

  // console.log("meeting created: ", meeting);
}

createMetting();

module.exports = router;
