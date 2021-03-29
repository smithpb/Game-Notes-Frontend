import React from "react";
import { Container } from "../../styles/body";
import ValidatedForm from "../forms/validated-form/ValidatedForm";
import { NewCampaignContainer } from "./style";

const campaignInputs = [
  {
    inputKey: "name",
    label: "Campaign Title",
    required: true,
  },
  {
    inputKey: "DM",
    label: "Dungeon Master",
    required: true,
  },
  {
    inputKey: "description",
    label: "Description",
    required: true,
  },
];

const initialValues = {
  name: "",
  DM: "",
  description: "",
};

function NewCampaignWizard({ routes }) {
  const handleSubmit = async (inputs) => {
    console.log(inputs);
  };

  return (
    <NewCampaignContainer>
      <ValidatedForm
        inputObjects={campaignInputs}
        initialValues={initialValues}
        title="New Campaign"
        submit={handleSubmit}
      />
    </NewCampaignContainer>
  );
}

export default NewCampaignWizard;
