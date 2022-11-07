import classes from "./TooltipTop.module.css";

const TooltipTop = (props) => {
  return (
    <div className={classes.tooltip}>
      <div className={classes.textBox}>
        <p>{props.errorMessage}</p>
      </div>

      <div className={classes.corner}></div>
    </div>
  );
};

export default TooltipTop;
