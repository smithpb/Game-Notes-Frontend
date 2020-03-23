import React from "react";
import { AppContext } from "../../../contexts/context";
import { CAMPAIGN_SORT } from "../../../reducer/dispatch-types";

function CampaignList() {
  const { state, dispatch } = React.useContext(AppContext);
  const { rawList } = state.campaigns;

  const selectCampaign = id => {
    dispatch({ type: CAMPAIGN_SORT, payload: id });
  };

  const list = rawList.map(item => (
    <div
      key={item.id}
      data-testid="campaign-list-item"
      onClick={() => selectCampaign(item.id)}
    >
      {item.name}
    </div>
  ));

  if (state.user.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid="campaign-list-component">
      {list}
      <button className="camp-add-btn" data-testid="campaign-add-button">
        Start a new Campaign
      </button>
    </div>
  );
}

export default CampaignList;
