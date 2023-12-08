import { TransactionType } from "../../../@types/enum";
import { Transaction } from "../../../@types";
import { XpathDocument } from "../../../utilities/xpathdocument";
import { StatementProcessor } from "./processor";

export function identifier(pages: XpathDocument[]) : boolean {
  return true;
}

export class Processor extends StatementProcessor {
  public getPages(): XpathDocument[] {
    return this.pages
  }

  public getTransactions(): Transaction[] {
    return [{
      date: new Date(),
      type: TransactionType.CREDIT,
      description: 'NO TEXT',
      amount: 13000,
      balance: 20000,
    }]
  }
}