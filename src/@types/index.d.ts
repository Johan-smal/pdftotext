import { TransactionType } from "./enum";

export interface PdfConfig {
  filename: string
  data: Buffer
}

export interface Transaction {
  date: Date
  description: string
  type: TransactionType
  amount: number
  balance: number
}