import React, { useContext, useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../state/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const clgReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    console.log(action);
    return { value: action.value, isValid: action.value.trim().length !== 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length !== 0 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isValid: undefined,
  });

  const [clgState, dispatchClg] = useReducer(clgReducer, {
    value: "",
    isValid: undefined,
  });

  const { isValid: emailValidity } = emailState;
  const { isValid: passValidity } = passState;
  const { isValid: clgValidity } = clgState;

  useEffect(() => {
    const setTime = setTimeout(() => {
      setFormIsValid(emailValidity && passValidity && clgValidity);
    }, 500);

    return () => {
      clearTimeout(setTime);
    };
  }, [emailValidity, passValidity, clgValidity]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", value: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    dispatchClg({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPass({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchClg({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passState.value, clgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            clgState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={clgState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
