import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";

const styles = () => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: 1,
    flex: 1,
    padding: 10,
  },
  searchWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  searchButton: {
    marginLeft: "20px",
    background: "#2E8B57",
    width: "100px",
  },
  clearButton: {
    marginLeft: "20px",
    background: "#DC143C",
    width: "90px",
  },
});

export class Search extends Component {
  render() {
    const { classes, search, userName, onChange, handleClear } = this.props;
    return (
      <div className={classes.searchWrapper}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            value={userName}
            onChange={onChange("userName")}
            placeholder="Search Username"
          />
        </Paper>
        <Button className={classes.searchButton} onClick={() => search()}>
          Search
        </Button>
        <Button className={classes.clearButton} onClick={() => handleClear()}>
          Clear
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
