import { Transaction } from "../../../@types";
import { XpathDocument } from "../../../utilities/xpathdocument";

export abstract class StatementProcessor {
  constructor(protected pages: XpathDocument[]) {}

  abstract getTransactions() : Transaction[]
}