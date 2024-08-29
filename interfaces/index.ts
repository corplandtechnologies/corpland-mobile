export interface authOptionProps {
  option: string;
  screen: string;
  isRegistered: boolean;
}

export interface walletModalProps {
  isDeposit: boolean;
  balance: number | string;
  onPress: () => void;
  actionButtonText: string;
  isWallet?: boolean;
  placeholder: string;
  icon: string;
  keyboardType?: string;
  onChangeText?: (text: any) => void;
  loading?: boolean;
}

export interface BadgeProps {
  bgColor: string;
  text: string;
  isOrder?: boolean;
}

export interface ViewProps {
  children: React.ReactNode;
  style?: any;
  padding?: number;
}

export interface TextProps {
  children: React.ReactNode;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  textAlign?: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
  description: string;
  type: "credit" | "debit";
  updatedAt: string;
  userId: string;
}

export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}
