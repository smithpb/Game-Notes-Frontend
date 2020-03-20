import React from "react";
import { AppContext } from "../../contexts/context";

function CampaignList() {
  const { state } = React.useContext(AppContext);
  const { rawList } = state.campaigns;

  return (
    <div className="campaign-list-container">
      {rawList.map(campaign => (
        <div key={campaign.id} className="camp-container">
          {campaign.name}
        </div>
      ))}
      <button className="camp-add-btn">Start a new Campaign</button>
    </div>
  );
}

export default CampaignList;
