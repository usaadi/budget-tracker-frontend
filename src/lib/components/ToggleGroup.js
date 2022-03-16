import { useState } from "react";

const ToggleGroup = ({
  children,
  defaultSelectedIndex,
  onSelectedIndexChanged,
}) => {
  const [selectedIndex, doSetSelectedIndex] = useState(defaultSelectedIndex);

  const isSelected = (index) => {
    return index === selectedIndex;
  };

  const setSelectedIndex = (value) => {
    doSetSelectedIndex(value);
    onSelectedIndexChanged(value);
  };

  if (typeof children !== "function") {
    throw new Error("ToggleGroup needs children as a function");
  }

  return children({
    setSelectedIndex,
    isSelected,
  });
};

export default ToggleGroup;
