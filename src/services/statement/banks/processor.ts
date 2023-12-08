import { Transaction } from "../../../@types";
import { XpathDocument } from "../../../utilities/xpathdocument";

export abstract class StatementProcessor {
  constructor(protected pages: XpathDocument[]) {}

  abstract getPages() : XpathDocument[]

  abstract getTransactions() : Transaction[]
}