export const filterByCampaign = (arr, id) => {
  return arr.filter(e => e.campaign_id === id);
};
