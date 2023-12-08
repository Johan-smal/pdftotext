import { XpathDocument } from '../../utilities/xpathdocument';
import { PdfLayout } from '../../@types/enum';
import { PdfConfig } from "../../@types";
import { PDFToText } from "../../utilities/pdftotext";
import { banks } from './banks';
import { StatementProcessor } from './banks/processor';

export class Statement {
  private pdfToText: PDFToText;

  private bbox: string | undefined;
  private body: string | undefined;
  private head: string | undefined;
  private pages: XpathDocument[] = [];
  
  private processor: StatementProcessor | undefined;

  constructor(config: PdfConfig) {
    this.pdfToText = new PDFToText(config)
  }

  async initialize() : Promise<void> {
    this.bbox = await this.pdfToText.run(PdfLayout.BBOX);
    this.head = this.bbox.substring(
      this.bbox.indexOf("<head>") + 1,
      this.bbox.lastIndexOf("</head>")
    );
    this.body = this.bbox.substring(
      this.bbox.indexOf("<doc>") + 1, 
      this.bbox.lastIndexOf("</doc>")
    );

    const pages = this.body.match(/<page.*?>(.*?)<\/[\s]*page>/s) || []
    this.pages = pages.map(page => new XpathDocument(page))

    if (this.pages.length < 1) throw new Error("NO PAGES");

    const bank = banks.find(bank => bank.identifier(this.pages))
    // @ts-ignore
    this.processor = new bank.Processor(this.pages)
  }

  public getPages() : XpathDocument[] {
    if (!this.processor) throw new Error('Initialize')

    return this.processor.getPages()
  }

  public getTransactions() : any {
    if (!this.processor) throw new Error('Initialize')

    return this.processor.getTransactions()
  }
}