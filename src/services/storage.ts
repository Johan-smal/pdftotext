import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { IS_OFFLINE, STATEMENTS_BUCKET } from '../config';

const s3Config = {
  ...(IS_OFFLINE
  ? { 
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
      endpoint: new AWS.Endpoint("http://localhost:4569") 
  }
  : {
      region: "eu-west-1",
  }),
};

const s3 = new S3(s3Config);

async function putObject(key: string, body: Buffer) : Promise<void> {
  await s3.putObject({
      Bucket: STATEMENTS_BUCKET || '',
      Key: key,
      Body: body
  }).promise()
}

async function getObjectBuffer(key: string) : Promise<Buffer> {
  return (await s3.getObject({
    Bucket: STATEMENTS_BUCKET || '',
    Key: key
  }).promise()).Body as Buffer;
}

export async function getStatement(key: string) : Promise<Buffer> {
  return await getObjectBuffer(key);
}



