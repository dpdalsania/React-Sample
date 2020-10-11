import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as GitService from "../services/Git";
import Search from "./Search";
import UserInfo from "./UserInfo";

const styles = () => ({
  container: {
    backgroundColor: "#D3D3D3",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    overflow: "auto",
    zIndex: "-1",
  },
  containerWrapper: {
    padding: "20px",
  },
  backdrop: {
    zIndex: "1",
    color: "#fff",
  },
});

export class Home extends Component {
  state = {
    userName: "",
    userRepoInfo: null,
    repoError: "",
    open: false,
  };

  search = async () => {
    const { userName } = this.state;
    this.handleToggle();
    let repoInfo = null;
    let repoError = null;
    if (userName.trim() !== "") {
      const repoResponse = await GitService.fetchUserRepo(userName);
      if (repoResponse.message === undefined) {
        repoInfo = repoResponse;
        repoError = "";
      } else {
        repoInfo = null;
        repoError = repoResponse.message;
      }

      this.setState({
        userRepoInfo: repoInfo,
        repoError: repoError,
        open: false,
      });
    } else {
      this.setState({
        userInfo: null,
        error: "Please enter Username.",
      });
    }
    this.handleToggle();
  };

  onChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      userInfo: null,
    });
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleClear = () => {
    this.setState({
      userName: "",
      userRepoInfo: null,
      repoError: "",
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { userName, userRepoInfo, repoError, open, filterText } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.containerWrapper}>
          <Search
            userName={userName}
            search={this.search}
            onChange={this.onChange}
            handleClear={this.handleClear}
          />
          {repoError}

          {userRepoInfo !== null ? (
            <UserInfo userRepoInfo={userRepoInfo} />
          ) : (
            <Backdrop className={classes.backdrop} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
