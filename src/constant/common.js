export const generateHashMap = types => {
  return function(value) {
    if (value !== 0 && !value) return "";
    let item = types.filter(item => item.value == value)[0];
    return item.label !== "全部" ? item.label : item.parentLabel;
  };
};

export const generateValueToLabelHashMap = types => {
  return function(label) {
    if (label !== 0 && !label) return "";
    return types.filter(item => item.label == label)[0]?.["value"];
  };
};
