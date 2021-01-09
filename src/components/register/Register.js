import React, { useState, useContext, useEffect } from "react";
import { RegisterContainer } from "./styled";
import { axiosReq as axios } from "../../util/axios/requests";
import { AppContext } from "../../contexts/context";
import { validatePasswordStructure } from "../../util/misc";
import { FAILURE, LOGIN_SUCCESS } from "../../reducer/dispatch-types";

function Register({ history }) {
  const {
    state: { appState },
    dispatch,
  } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState({});
  const { password, confirmPassword } = inputs;

  const inputObjects = [
    {
      label: "First Name",
      inputKey: "firstName",
      inputRef: React.createRef(),
    },
    {
      label: "Last Name",
      inputKey: "lastName",
      inputRef: React.createRef(),
    },
    {
      label: "Email",
      inputKey: "email",
      type: "email",
      inputRef: React.createRef(),
    },
    {
      label: "Username",
      inputKey: "username",
      inputRef: React.createRef(),
    },
    {
      label: "Password",
      inputKey: "password",
      type: "password",
      inputRef: React.createRef(),
    },
    {
      label: "Confirm Password",
      inputKey: "confirmPassword",
      type: "password",
      inputRef: React.createRef(),
    },
  ];

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = validatePasswordStructure(password);
    setIsValidPassword(result);
  }, [password]);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (event.target.value.length > 0) {
      const { [event.target.name]: deleted, ...tempErrors } = errors;
      setErrors(tempErrors);
    }
  };

  const PasswordDisplay = () => {
    return (
      <div>
        <p className={assignClass(isValidPassword.all)}>
          Password must be 8 characters long and contain one of the following:
        </p>
        <ul>
          <li className={assignClass(isValidPassword.upperCase)}>Uppercase </li>
          <li className={assignClass(isValidPassword.lowerCase)}>Lowercase </li>
          <li className={assignClass(isValidPassword.number)}>Number </li>
          <li className={assignClass(isValidPassword.special)}>Special</li>
        </ul>
      </div>
    );
  };

  const assignClass = (valid) => {
    return valid ? "valid" : "invalid";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setErrors({});
    const blankInputMsg = "Required field.";
    for (const [key, value] of Object.entries(inputs)) {
      if (value === "") {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [key]: prevErrors[key]
              ? [...prevErrors[key], blankInputMsg]
              : [blankInputMsg],
          };
        });
      }
    }
    if (
      Object.keys(errors).length === 0 &&
      isValidPassword.all &&
      passwordMatch
    ) {
      try {
        const { confirmPassword, ...user } = inputs;
        const response = await axios("post", "/auth/register", user);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        localStorage.setItem("jwt", response.data.token);
        history.push("/app");
      } catch (error) {
        console.log(error.response);
        const errorMsg =
          error.response?.data.message ||
          "No internet connection or something went very wrong.";
        dispatch({ type: FAILURE, payload: errorMsg });
      }
    }
  };

  return (
    <RegisterContainer>
      <p>Register</p>
      {appState.error && <p className="invalid">{appState.error}</p>}
      <form onSubmit={(e) => handleSubmit(e)} data-testid="register-form">
        {inputObjects.map((input) => (
          <>
            <ValidatedInput
              label={input.label}
              inputKey={input.inputKey}
              inputRef={(el) => (input.inputRef = el)}
              type={input.type}
              error={errors[input.inputKey]}
              handleChange={handleChange}
              assignedClass={
                input.inputKey === "confirmPassword"
                  ? passwordMatch && confirmPassword !== ""
                    ? "match"
                    : "differ"
                  : ""
              }
            />
            {input.inputKey === "password" && <PasswordDisplay />}
          </>
        ))}
        <button type="submit">Submit</button>
      </form>
    </RegisterContainer>
  );
}

function ValidatedInput({
  label,
  inputKey,
  inputRef,
  type = "text",
  error,
  handleChange,
  assignedClass = "",
}) {
  return (
    <>
      <label htmlFor={inputKey}>{label}</label>
      <span>{error && error.join(" ")}</span>
      <input
        className={assignedClass}
        name={inputKey}
        ref={inputRef}
        type={type}
        onChange={(e) => handleChange(e)}
        data-testid="register-form-input"
      />
    </>
  );
}

export default Register;
