import Button from "@mui/material/Button";
import classes from "./EasyApplyButton.module.css";
const EasyApplyButton = () => {
  return (
    <Button className={classes.applyButton} variant="contained">
      ⚡ Easy Apply
    </Button>
  );
};

export default EasyApplyButton;
