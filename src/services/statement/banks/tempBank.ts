import { TransactionType } from "../../../@types/enum";
import { Transaction } from "../../../@types";
import { XpathDocument } from "../../../utilities/xpathdocument";
import { StatementProcessor } from "./processor";

export function identifier(pages: XpathDocument[]) : boolean {
  return true;
}

export class Processor extends StatementProcessor {
  public getTransactions(): Transaction[] {
    const [page] = this.pages;
    const [node] = page.select('//word[contains(., "SIMON")]')
    return [{
      date: new Date(),
      type: TransactionType.CREDIT,
      description: node.textContent || 'NO TEXT',
      amount: 13000,
      balance: 20000,
    }]
  }
}