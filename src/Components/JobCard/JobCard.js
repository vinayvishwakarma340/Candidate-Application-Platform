import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EasyApplyButton from "../EasyApplyButton/EasyApplyButton";
import classes from "./JobCard.module.css";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function JobCard({
  jdLink,
  jobDetailsFromCompany,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  location,
  minExp,
  maxExp,
  jobRole,
  companyName,
  logoUrl,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <img className={classes.cardImage} src={logoUrl} alt="logo" />

        <div className={classes.topcontentWrapper}>
          <h3 className="MuiBox-root css-rulwqv">{companyName}</h3>
          <h2>{jobRole}</h2>
          <p className="cards-sub-text">India | Exp: 5-5 years</p>
        </div>
      </div>

      <p className={classes.cardSalary}>
        Estimated Salary: ₹30 - 60 LPA
        <span aria-label="Offered salary range">✅</span>
      </p>

      <div className={classes.jobDescWrapper}>
        <h3>About Company:</h3>
        <h3>About us</h3>
        <p className={classes.jobDescription}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like. This impressive paella is a perfect party dish
          and a fun meal to cook together with your guests. Add 1 cup of frozen
          peas along with the mussels, if you like. This impressive paella is a
          perfect party dish and a fun meal to cook together with your guests.
          Add 1 cup of frozen peas along with the mussels, if you like.
        </p>
      </div>
      <CardActions disableSpacing>
        <EasyApplyButton />
      </CardActions>
    </Card>
  );
}
