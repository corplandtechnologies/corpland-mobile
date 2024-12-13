import { useState } from "react";

const useCheckBox = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return {
    checked,
    toggleCheckbox,
  };
};

export default useCheckBox;
