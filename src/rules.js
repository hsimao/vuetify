const isNumebr = (value) => typeof value === "number" && !isNaN(value);
const isString = (value) => typeof value === "string";

export const required = (message = "Field is required.") => {
  return (value) => !!value || message;
};

export const email = (message = "Email invalid.") => {
  // eslint-disable-next-line
  const emailRule = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return (value) => emailRule.test(value) || message;
};

// 字串的長度限制
export const minMaxLength = (min, max, message = "") => {
  const check = (value) => {
    if (isString(value)) {
      return value.length >= min && value.length <= max;
    }

    return false;
  };
  const errorMessage = message || `Not less than ${min} or more than ${max}`;
  return (value) => check(value) || errorMessage;
};

const length = (limitValue, message = "", type = "min") => {
  const check = (value) => {
    if (isString(value)) {
      if (type === "min") {
        return value.length >= limitValue;
      } else {
        return value.length <= limitValue;
      }
    }
    return false;
  };
  const lessOrMore = type === "min" ? "less" : "more";
  const errorMessage = message || `Not ${lessOrMore} than ${limitValue}`;
  return (value) => check(value) || errorMessage;
};

export const minLength = (min, message) => length(min, message, "min");
export const maxLength = (max, message) => length(max, message, "max");

// 數字的限制
export const minMaxLimit = (min, max, message = "") => {
  const check = (value) => {
    const formatNumber = parseFloat(value);
    if (isNumebr(formatNumber)) {
      return value >= min && value <= max;
    }
    return false;
  };
  const errorMessage = message || `Not less than ${min} or more than ${max}`;
  return (value) => check(value) || errorMessage;
};

const limit = (limitValue, message = "", type = "min") => {
  const check = (value) => {
    const formatNumber = parseFloat(value);
    if (isNumebr(formatNumber)) {
      if (type === "min") {
        return formatNumber >= limitValue;
      } else {
        return formatNumber <= limitValue;
      }
    }
    return false;
  };
  const lessOrMore = type === "min" ? "less" : "more";
  const errorMessage = message || `Not ${lessOrMore} than ${limitValue}`;
  return (value) => check(value) || errorMessage;
};

export const minLimit = (min, message) => limit(min, message, "min");
export const maxLimit = (max, message) => limit(max, message, "max");
