import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../contexts/context";
import { validatePasswordStructure } from "../../../util/misc";
import { FormContainer, InputField, PasswordContainer } from "./style";
import { MainButton } from "../../../styles";

function ValidatedForm({ inputObjects, initialValues, title, submit }) {
  const {
    state: { appState },
  } = useContext(AppContext);
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState({});
  const { password, confirmPassword } = inputs;
  const createPassword = "password" in initialValues;
  const errorRef = useRef();

  errorRef.current = errors;

  useEffect(() => {
    if (createPassword) setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword, createPassword]);

  useEffect(() => {
    if (createPassword) {
      const result = validatePasswordStructure(password);
      setIsValidPassword(result);
    }
  }, [password, createPassword]);

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (event.target.value.length > 0) {
      const { [event.target.name]: deletedError, ...remainingErrors } = errors;
      setErrors(remainingErrors);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setErrors({});
    const blankInputMsg = "Required field.";
    for (const { inputKey: key, required } of inputObjects) {
      if (inputs[key] === "" && required) {
        await setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [key]: prevErrors[key]
              ? [...prevErrors[key], blankInputMsg]
              : [blankInputMsg],
          };
        });
      }
    }
    if (createPassword) setPasswordErrors();
    if (Object.keys(errorRef.current).length === 0) {
      submit(inputs);
    }
  };

  const setPasswordErrors = async () => {
    if (createPassword) {
      const passwordErrors = [];
      if (!isValidPassword.all)
        passwordErrors.push("Password must meet all requirements.");
      if (!passwordMatch) passwordErrors.push("Passwords do not match.");
      if (passwordErrors.length > 0) {
        await setErrors((prevErrors) => {
          const password =
            "password" in prevErrors
              ? [...prevErrors.password, ...passwordErrors]
              : [...passwordErrors];
          return {
            ...prevErrors,
            password,
          };
        });
      }
    }
  };

  return (
    <FormContainer>
      <p className="form-title">{title}</p>
      {appState.error && <p className="invalid">{appState.error}</p>}
      <form onSubmit={(e) => handleSubmit(e)} data-testid="form">
        {inputObjects.map((input) => (
          <React.Fragment key={input.inputKey}>
            <ValidatedInput
              input={input}
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
            {input.inputKey === "password" && (
              <PasswordDisplay isValidPassword={isValidPassword} />
            )}
          </React.Fragment>
        ))}
        <MainButton type="submit">Submit</MainButton>
      </form>
    </FormContainer>
  );
}

function ValidatedInput({ input, error, handleChange, assignedClass = "" }) {
  const { label, inputKey, type = "text" } = input;
  return (
    <InputField>
      <input
        id={inputKey}
        className={assignedClass}
        name={inputKey}
        placeholder=" "
        // ref={inputRef}
        type={type}
        onChange={(e) => handleChange(e)}
        data-testid="register-form-input"
      />
      <label htmlFor={inputKey}>{label}</label>
      <p className="error-message">{error && error.join(" ")}</p>
    </InputField>
  );
}

function PasswordDisplay({ isValidPassword }) {
  const { all, upperCase, lowerCase, number, special } = isValidPassword;
  const assignClass = (valid) => {
    return valid ? "valid" : "invalid";
  };

  return (
    <PasswordContainer>
      <p>
        Password must be{" "}
        <span className={assignClass(all)}>8 characters long</span> and contain
        one of each of the following:
      </p>
      <ul>
        <div className={assignClass(upperCase)}>Uppercase </div>
        <div className={assignClass(lowerCase)}>Lowercase </div>
        <div className={assignClass(number)}>Number </div>
        <div className={assignClass(special)}>Special</div>
      </ul>
    </PasswordContainer>
  );
}

export default ValidatedForm;
