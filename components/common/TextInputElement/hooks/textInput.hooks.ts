import { useState } from "react";

export const usePasswordVisible = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    onTogglePassword,
    showPassword,
  };
};
