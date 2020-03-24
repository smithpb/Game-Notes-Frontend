import React, { useContext, useState } from "react";
import { AppContext } from "../../../contexts/context";
import {
  CAMPAIGN_SORT,
  FAILURE,
  CAMPAIGN_DELETE
} from "../../../reducer/dispatch-types";
import CampaignForm from "../form/CampaignForm";
import { axiosReq } from "../../../util/axios/requests";

function CampaignItem({ campaign }) {
  const { dispatch } = useContext(AppContext);
  const [edit, setEdit] = useState(false);
  const { id, name, DM, description } = campaign;

  const selectCampaign = id => {
    dispatch({ type: CAMPAIGN_SORT, payload: id });
  };

  const deleteItem = async () => {
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
    <div
      key={id}
      data-testid="campaign-list-item"
      onClick={() => selectCampaign(id)}
    >
      <h2>{name}</h2>
      <span onClick={deleteItem}>X</span>
      <p>{DM}</p>
      <p>{description}</p>
      <p onClick={() => setEdit(true)}>Edit</p>
    </div>
  );
}

export default CampaignItem;
