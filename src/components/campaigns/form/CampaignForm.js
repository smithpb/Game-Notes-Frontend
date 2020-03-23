import React, { useState, useContext } from "react";
import { AppContext } from "../../../contexts/context";

function CampaignForm() {
  const [inputs, setInputs] = useState({});
  const { dispatch } = useContext(AppContext);

  const handleChange = event => {
    setInputs({ [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: "" });
  };

  return (
    <div data-testid="camp-form-component">
      <form data-testid="camp-form" onSubmit={e => handleSubmit(e)}>
        <input
          onChange={e => handleChange(e)}
          type="text"
          name="name"
          value={inputs.name || ""}
          data-testid="camp-form-input"
        />
        <input
          onChange={e => handleChange(e)}
          type="text"
          name="DM"
          value={inputs.DM || ""}
          data-testid="camp-form-input"
        />
        <textarea
          onChange={e => handleChange(e)}
          name="description"
          value={inputs.description || ""}
          data-testid="camp-form-input"
        />
        <button type="submit" data-testid="camp-form-submit"></button>
      </form>
    </div>
  );
}

export default CampaignForm;
