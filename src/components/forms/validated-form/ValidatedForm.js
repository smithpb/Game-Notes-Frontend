import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../contexts/context";
import { validatePasswordStructure } from "../../../util/misc";

function ValidatedForm({ inputObjects, initialValues, title, submit }) {
  const {
    state: { appState },
  } = useContext(AppContext);
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState({});
  const { password, confirmPassword } = inputs;

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
      submit(inputs);
    }
  };

  return (
    <>
      <p>{title}</p>
      {appState.error && <p className="invalid">{appState.error}</p>}
      <form onSubmit={(e) => handleSubmit(e)} data-testid="register-form">
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function ValidatedInput({ input, error, handleChange, assignedClass = "" }) {
  const { label, inputKey, type = "text" } = input;
  return (
    <>
      <label htmlFor={inputKey}>{label}</label>
      <span>{error && error.join(" ")}</span>
      <input
        id={inputKey}
        className={assignedClass}
        name={inputKey}
        // ref={inputRef}
        type={type}
        onChange={(e) => handleChange(e)}
        data-testid="register-form-input"
      />
    </>
  );
}

function PasswordDisplay({ isValidPassword }) {
  const { all, upperCase, lowerCase, number, special } = isValidPassword;
  const assignClass = (valid) => {
    return valid ? "valid" : "invalid";
  };

  return (
    <div>
      <p className={assignClass(all)}>
        Password must be 8 characters long and contain one of the following:
      </p>
      <ul>
        <li className={assignClass(upperCase)}>Uppercase </li>
        <li className={assignClass(lowerCase)}>Lowercase </li>
        <li className={assignClass(number)}>Number </li>
        <li className={assignClass(special)}>Special</li>
      </ul>
    </div>
  );
}

export default ValidatedForm;
