const formatWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const kFormatter = (num, showPlusPrefix = false) => {
  try {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    const result = formatter.format(num);
    let result2 = result === "NaN" ? "" : result;
    if (result2) {
      result2 = addSpaceBeforeK(result2);
      if (showPlusPrefix && num > 0) {
        result2 = "+" + result2;
      }
    }
    return result2;
  } catch {
    return "";
  }
};

const formatPercent = (ratio, showPlusPrefix = false, decimalPoints = 0) => {
  try {
    const percent = (ratio * 100).toFixed(decimalPoints);
    let prefix = "";
    if (ratio > 0 && showPlusPrefix) {
      prefix = "+";
    }
    const result = `${prefix}${percent}%`;
    return result;
  } catch (error) {
    return "";
  }
};

const formatDecimal = (input, showPlusPrefix = false, decimalPoints = 0) => {
  try {
    const decimal = input.toFixed(decimalPoints);
    let prefix = "";
    if (input > 0 && showPlusPrefix) {
      prefix = "+";
    }
    const result = `${prefix}${decimal}`;
    return result;
  } catch (error) {
    return "";
  }
};

const formatScoreOutOfTen = (ratio) => {
  try {
    const score = Math.round(ratio * 10);
    return `${score}/10`;
  } catch (error) {
    return "";
  }
};

const addSpaceBeforeK = (numString) => {
  if (numString.length > 1) {
    if (isNaN(numString[numString.length - 1])) {
      numString =
        numString.slice(0, numString.length - 1) +
        "\u00A0" +
        numString[numString.length - 1];
    }
  }
  return numString;
};

export {
  formatWithCommas,
  kFormatter,
  formatPercent,
  formatDecimal,
  formatScoreOutOfTen,
};
