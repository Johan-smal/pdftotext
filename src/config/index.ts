import { Credentials } from "aws-sdk";

// General
export const IS_OFFLINE = process.env.IS_OFFLINE;
export const CI = process.env.CI;
export const STAGE = process.env.STAGE || "local";
export const STATEMENTS_BUCKET = process.env.STATEMENTS_BUCKET

export const AWS_CREDENTIALS = new Credentials({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
});
  