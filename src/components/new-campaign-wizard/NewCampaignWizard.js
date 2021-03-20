import React from "react";
import { RenderRoutes } from "../../routes/routes";

function NewCampaignWizard({ routes }) {
  return (
    <div>
      <RenderRoutes routes={routes} />
    </div>
  );
}

export default NewCampaignWizard;
