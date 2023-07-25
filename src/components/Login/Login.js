import React, { useContext, useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../state/auth-context";
import { InputFun } from "../UI/Input/InputFun";

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
        <InputFun
          id="email"
          name="Email"
          type="email"
          state={emailState}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <InputFun
          id="password"
          name="PassWord"
          type="password"
          state={passState}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <InputFun
          id="college"
          name="College Name"
          type="text"
          state={clgState}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />

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
