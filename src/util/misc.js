export const filterByCampaign = (arr, id) => {
  return arr.filter((e) => e.campaign_id === id);
};

export const filterByLocation = (arr, loc) => {
  return arr.filter((e) => e.location === loc);
};

export const filterByCharacter = (arr, char) => {
  return arr.filter((e) => e.tags.includes(char));
};

export const validatePasswordStructure = (password) => {
  const result = {};
  result.upperCase = /.*[A-Z]/.test(password);
  result.lowerCase = /.*[a-z]/.test(password);
  result.number = /.*[0-9]/.test(password);
  result.special = /.*[^A-Za-z0-9]/.test(password);
  result.length = password.length >= 8;
  result.all =
    result.upperCase &&
    result.lowerCase &&
    result.number &&
    result.special &&
    result.length;
  return result;
};
