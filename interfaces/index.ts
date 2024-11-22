export interface authOptionProps {
  option: string;
  screen: string;
  isRegistered?: boolean;
}

export interface walletModalProps {
  isDeposit: boolean;
  balance: number;
  onPress: () => void;
  actionButtonText: string;
  isWallet?: boolean;
  placeholder: string;
  icon: string;
  keyboardType?: string;
  onChangeText?: (text: any) => void;
  loading?: boolean;
  isBonus?: boolean;
  disabled?: boolean;
  secondaryActionButtonText?: string;
  onSecondaryPress?: () => void;
  secondaryLoading?: boolean;
  secondarydisabled?: boolean;
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
export interface Notification {
  _id: string;
  userId: string;
  type: "transaction" | "order" | "user" | "product" | "request" | "ad";
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GroupedNotifications {
  date: string;
  notifications: Notification[];
}

export interface Withdrawal {
  userId: string | undefined;
  amount: number;
  accountNumber: string | undefined;
  channel: string;
}
