import classes from "./InputFun.module.css";

export const InputFun = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.state.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.state.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
