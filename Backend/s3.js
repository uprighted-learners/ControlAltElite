const aws = require("aws-sdk");
const crypto = require("crypto");
const { log } = require("util");

const region = "us-east-2";
const bucketName = "benn-rising-mentorship";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// establish connection
const s3 = new aws.S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  signatureVersion: "v4",
});

// function to upload file
// generates random name for the files

async function uploadURL() {
  const rawBytes = await crypto.randomBytes(16);
  const imgName = rawBytes.toString("hex");
  //    console.log(imgName);

  const params = {
    Bucket: bucketName,
    Key: imgName,
    Expires: 45, //45 second expiration time of URL
  };

  return await s3.getSignedUrlPromise("putObject", params);
}

module.exports = uploadURL;
