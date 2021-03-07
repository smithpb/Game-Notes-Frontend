import React, { useContext, useState } from "react";
import { AppContext } from "../../../contexts/context";
import { withRouter } from "react-router-dom";
import {
  CAMPAIGN_SELECT,
  FAILURE,
  CAMPAIGN_DELETE,
} from "../../../reducer/dispatch-types";
import CampaignForm from "../form/CampaignForm";
import { Campaign } from "./style";
import { axiosReq, fetchCampaignData } from "../../../util/axios/requests";

function CampaignItem({ campaign, history }) {
  const { dispatch } = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const { id, name, DM, description } = campaign;

  const selectCampaign = async (id) => {
    console.log("Campaign selected");
    dispatch({ type: CAMPAIGN_SELECT, payload: id });
    await fetchCampaignData(dispatch, id);
    history.push("/app/notes");
  };

  const deleteItem = async (event) => {
    event.stopPropagation();
    try {
      await axiosReq("delete", `/campaigns/${id}`);
      dispatch({ type: CAMPAIGN_DELETE, payload: id });
    } catch (e) {
      dispatch({ type: FAILURE, payload: e.response.data.message });
    }
  };

  if (edit) {
    return <CampaignForm editing campaign={campaign} working={setEdit} />;
  }

  return (
    <Campaign onClick={(e) => selectCampaign(id, e)}>
      <h2>{name}</h2>
      <p>Run by: {DM}</p>
      <p>{description}</p>
      <div className="camp-controls">
        <p
          onClick={(e) => {
            e.stopPropagation();
            setEdit(true);
          }}
        >
          Edit
        </p>
        <span onClick={(e) => deleteItem(e)}>X</span>
      </div>
    </Campaign>
  );
}

export default withRouter(CampaignItem);
