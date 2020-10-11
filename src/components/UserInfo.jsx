import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import RepoInfo from "./RepoInfo";

const styles = () => ({
  root: {
    width: "100%",
    paddingTop: "10px",
  },
  searchBoxWrapper: {
    border: "1px solid gray",
    float: "right",
    width: "20%",
  },
  heading: {
    margin: "15px",
    fontWeight: "bold",
  },
  detailWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  detailInfoWrapper: {
    padding: "5px",
  },
  input: {
    flex: 1,
    padding: "6px",
  },
  searchWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  filterWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  filterSearchWrapper: {
    float: "right",
    width: "87%",
  },
  iconButton: {
    padding: 10,
    float: "right",
  },
});

export class UserInfo extends Component {
  renderAccordion = (heading, info) => {
    const { classes } = this.props;
    return (
      <Accordion expanded="true">
        <AccordionDetails>
          <div className={classes.searchWrapper}>
            <div className={classes.filterWrapper}>
              <Typography className={classes.heading}>{heading}</Typography>
            </div>
            <RepoInfo userInfo={info} />
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };

  render() {
    const { classes, userRepoInfo } = this.props;
    return (
      <div className={classes.root}>
        {this.renderAccordion(" GitHub Repositories", userRepoInfo)}
      </div>
    );
  }
}

export default withStyles(styles)(UserInfo);
