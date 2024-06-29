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
  isWallet: boolean;
  placeholder: string;
  icon: string;
  keyboardType: string;
}
