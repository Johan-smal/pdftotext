import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3" 
import { IS_OFFLINE, STATEMENT_BUCKET } from '../config';

const s3Config = {
  ...(IS_OFFLINE
  ? { 
      s3ForcePathStyle: true,
      accessKeyId: 'DEFAULT', // This specific key is required when working offline
      secretAccessKey: 'DEFAULT',
      endpoint: new AWS.Endpoint("http://localstack:4566"),
      region: "us-east-1"
  }
  : {
      region: "eu-west-1",
  }),
};

const s3Client = new S3Client({
  credentials: {
    secretAccessKey: "DEFAULT",
    accessKeyId: "DEFAULT"
  },
  endpoint: "http://localstack:4566",
  region: "us-east-1"
});

const s3 = new S3(s3Config);

async function putObject(key: string, body: Buffer) : Promise<void> {
  await s3.putObject({
      Bucket: STATEMENT_BUCKET || '',
      Key: key,
      Body: body
  }).promise()
}

async function getObjectBuffer(key: string) : Promise<Buffer> {
  console.log('getObjectBuffer', key)
  return (await s3.getObject({
    Bucket: STATEMENT_BUCKET || '',
    Key: key
  }).promise()).Body as Buffer;
}

export async function getStatement(key: string) : Promise<Buffer> {
  console.log('getStatement', key, IS_OFFLINE, STATEMENT_BUCKET)
  return await getObjectBuffer(key);
}



