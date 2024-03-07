export const API_KEY = "AIzaSyB7r4r7AdRUdt82X_wkorIG28bP - vEDQAA";

 export const value_converter = (value) => {
  if (value > 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value > 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
