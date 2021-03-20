import React, { useContext } from "react";
import { RegisterContainer } from "./style";
import { axiosReq as axios } from "../../util/axios/requests";
import { AppContext } from "../../contexts/context";
import ValidatedForm from "../forms/validated-form/ValidatedForm";
import { FAILURE, LOGIN_SUCCESS } from "../../reducer/dispatch-types";

function Register({ history }) {
  const {
    // state: { appState },
    dispatch,
  } = useContext(AppContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const inputObjects = [
    {
      label: "First Name",
      inputKey: "firstName",
      required: true,
      // inputRef: React.createRef(),
    },
    {
      label: "Last Name",
      inputKey: "lastName",
      // required: true,
      // inputRef: React.createRef(),
    },
    {
      label: "Email",
      inputKey: "email",
      type: "email",
      required: true,
      // inputRef: React.createRef(),
    },
    {
      label: "Username",
      inputKey: "username",
      required: true,
      // inputRef: React.createRef(),
    },
    {
      label: "Password",
      inputKey: "password",
      type: "password",
      required: true,
      // inputRef: React.createRef(),
    },
    {
      label: "Confirm Password",
      inputKey: "confirmPassword",
      type: "password",
      required: true,
      // inputRef: React.createRef(),
    },
  ];

  const handleSubmit = async (inputs) => {
    try {
      const { confirmPassword, ...user } = inputs;
      const response = await axios("post", "/auth/register", user);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      localStorage.setItem("jwt", response.data.token);
      history.push("/app");
    } catch (error) {
      console.log(error.response);
      const errorMsg = error.response?.data.message;
      dispatch({ type: FAILURE, payload: errorMsg });
    }
  };

  return (
    <RegisterContainer>
      <ValidatedForm
        inputObjects={inputObjects}
        initialValues={initialValues}
        title="Register"
        submit={handleSubmit}
      />
    </RegisterContainer>
  );
}

export default Register;
