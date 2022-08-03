import { DOMParserImpl as dom } from 'xmldom-ts';
import * as xpath from 'xpath-ts';

export class XpathDocument {
  private doc: Document;
  constructor(private text: string) {
    this.doc = new dom().parseFromString(this.text)
  }

  public select(query: string) : Node[] {
    return xpath.select(query, this.doc) as Node[];
  }
}