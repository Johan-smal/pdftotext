import fs from "fs";
import path from 'path';
import os from 'os';
import childProcess from "child_process";
import { PdfConfig } from "../@types";
import { IS_OFFLINE } from "../config";
import { PdfLayout } from "../@types/enum";
const exec = childProcess.exec

/**
 * Transform a PDF to Text
 */
export class PDFToText
{
  public fileName: string;
  public fileData: Buffer;
  public filePath: string;
  public execPath: string;
  /**
   * @param {fileName} - name of the file
   * @param {fileData} - a buffer representing file contents
   */
  constructor(config: PdfConfig) {
    this.fileName = config.filename;
    this.fileData = config.data;
    this.filePath = (IS_OFFLINE)
      ? path.join(path.basename(this.fileName))
      : path.join(os.tmpdir(), path.basename(this.fileName))
    // this.filePath = path.join(path.basename(this.fileName));
    this.execPath = (IS_OFFLINE)
      ? 'pdftotext'
      : '/opt/bin/pdftotext';
  }

  /**
  * Write a buffer to disk
  * @param {filePath} - path to the file
  * @param {fileData} - the buffer to be written to disk
  */
  async writeFile(filePath: string, fileData: Buffer){
    return new Promise((resolve: any, reject: any) => {
      fs.writeFile(filePath, fileData, 'binary', function (err) {
        if (err) { reject('Writing file failed: ' + err); }
        resolve();
      });
    });
  }

  /**
   * Runs `pdftotext` command on a filePath of a PDF
   * @param {filePath}
   * @param {layout} 
   * @return {Promise<string>} - represents the text of the PDF file
   */
  async getText(filePath: string, layout: PdfLayout = PdfLayout.DEFAULT) : Promise<string> {
    const { execPath } = this;
    return new Promise(function(resolve, reject) {
      const cmd = `${execPath} -${layout}`
      const allCmd = `${cmd} ${filePath} -`;
      let result = '';
      
      const child = exec(allCmd);
      // Log process stdout and stderr

      if (!child.stderr || !child.stdout) throw new Error('Child str not defined')
      
      child.stderr.on('data', function (error){ 
        throw new Error(`Failed to run command: ${allCmd} with error: ${error}`) 
      });

      child.stdout.on('data', function(data) {
        result += data.toString();
      });
      
      child.on('close', function(code) {
        resolve(result);
      });
    });
  }

  /**
   * Runs the action
   * @return {pdfText} - A string representing text of a PDF
   */
  async run(layout: PdfLayout = PdfLayout.DEFAULT) : Promise<string>{
    try {
      await this.writeFile(this.filePath, this.fileData);
    } catch (e) {
      console.log(e)
    }
    const text = await this.getText(this.filePath, layout);
    return text;
  }
}
