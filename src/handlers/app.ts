import { Context, S3CreateEvent } from "aws-lambda";
import { PdfConfig } from "../@types";
import { getStatement } from "../services/storage";
import { Statement } from "../services/statement";

export const handler = async (event: S3CreateEvent, context: Context) => {
  const [record] = event.Records;
  const { key } = record.s3.object 
  console.log('RECORD', { key })
  
  const config: PdfConfig = {
    filename : key,
    data: await getStatement(key)
  };
  try {
    const statement = new Statement(config)
    await statement.initialize()

    const [firstPage] = statement.getPages();
    const nodes = firstPage.select("//word")
    console.log('NODES', { nodes })
    return true
  } catch (e) {
    console.log({
      statusCode: 500,
      body: `Application Error: ${e}`,
    });
  }
};