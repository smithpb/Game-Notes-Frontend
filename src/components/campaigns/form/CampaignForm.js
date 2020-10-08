import React, { useState, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { axiosReq } from "../../../util/axios/requests";
import {
  CAMPAIGN_ADD_SUCCESS,
  CAMPAIGN_EDIT_SUCCESS,
  FAILURE,
  LOADING,
} from "../../../reducer/dispatch-types";

function CampaignForm({ editing, campaign, working }) {
  const [inputs, setInputs] = useState(editing ? campaign : {});
  const { dispatch } = useContext(AppContext);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });
    try {
      const method = editing ? "put" : "post";
      const disType = editing ? CAMPAIGN_EDIT_SUCCESS : CAMPAIGN_ADD_SUCCESS;
      delete inputs.journey;

      const response = await axiosReq(method, "/campaigns", inputs);
      dispatch({ type: disType, payload: response.data });
      working(false);
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e.response.data.message,
      });
    }
  };

  return (
    <div data-testid="camp-form-component">
      <form data-testid="camp-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          name="name"
          value={inputs.name || ""}
          placeholder="Enter campaign title"
          data-testid="camp-form-input"
        />
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          name="DM"
          value={inputs.DM || ""}
          placeholder="Enter DM's namem"
          data-testid="camp-form-input"
        />
        <textarea
          onChange={(e) => handleChange(e)}
          name="description"
          value={inputs.description || ""}
          placeholder="Enter campaign description"
          data-testid="camp-form-input"
        />
        <button type="submit" data-testid="camp-form-submit">
          Submit
        </button>
        <button onClick={() => working(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default CampaignForm;
