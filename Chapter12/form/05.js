import React from "react";

const validate = value => {
  if (value.length <= 5) {
    return true;
  } else {
    return false;
  }
};

const clientSideValidation = value => {
  if (validate(value)) {
    return "All good.";
  } else {
    throw new Error("Value's length is over 5.");
  }
};

const useForm = ({ handler }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(undefined);
  const [success, setSuccess] = React.useState(false);

  return {
    value,
    changeHandler: e => setValue(e.target.value),
    error,
    success,
    submitHandler: e => {
      e.preventDefault();

      try {
        handler(value);

        setError(undefined);
        setSuccess(true);
      } catch (e) {
        setSuccess(false);
        setError(e.message);
      }
    }
  };
};

const Form = () => {
  const { changeHandler, submitHandler, value, error, success } = useForm({
    handler: clientSideValidation
  });

  return (
    <form onSubmit={submitHandler}>
      <input
        value={value}
        onChange={changeHandler}
        placeholder="give me string"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && (
        <div style={{ color: "green" }}>Your submission was successful.</div>
      )}
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default Form;
