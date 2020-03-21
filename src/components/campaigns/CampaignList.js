import React from "react";
import { AppContext } from "../../contexts/context";
import { CAMPAIGN_SORT } from "../../reducer/dispatch-types";

function CampaignList() {
  const { state, dispatch } = React.useContext(AppContext);
  const { rawList } = state.campaigns;

  if (state.user.isLoading) {
    return <div>Loading...</div>;
  }

  const selectCampaign = id => {
    dispatch({ type: CAMPAIGN_SORT, payload: id });
  };

  return (
    <div
      className="campaign-list-container"
      data-testid="campaign-list-component"
    >
      {rawList.map(campaign => (
        <div
          key={campaign.id}
          data-testid="campaign-list-item"
          onClick={() => selectCampaign(campaign.id)}
        >
          {campaign.name}
        </div>
      ))}
      <button className="camp-add-btn" data-testid="campaign-add-button">
        Start a new Campaign
      </button>
    </div>
  );
}

export default CampaignList;
