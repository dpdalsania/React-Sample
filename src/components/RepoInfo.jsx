import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  Link,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = () => ({
  tableHead: {
    fontWeight: "bold",
  },
  tableHeadRow: {
    backgroundColor: "#D3D3D3",
  },
  empty: {
    padding: "10px",
  },
  modelPaper: {
    position: "absolute",
    width: "400px",
    height: "400px",
    backgroundColor: "white",
  },
  heading: {
    fontWeight: "bold",
  },
});

export class RepoInfo extends Component {
  state = {
    open: false,
    selectedInfo: null,
  };

  handleOpen = (info) => {
    this.setState({
      open: true,
      selectedInfo: info,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  renderDetails = (info) => {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.tableHead}>
          <Link onClick={() => this.handleOpen(info)}>{info.name}</Link>
        </TableCell>
        <TableCell>{info.language}</TableCell>
        <TableCell>{moment(info.updated_at, "YYYY-MM-DD").fromNow()}</TableCell>
      </TableRow>
    );
  };

  renderModelDetails = () => {
    const { selectedInfo } = this.state;
    return (
      <>
        <DialogTitle>{selectedInfo.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>ID: {selectedInfo.id}</Typography>
            <Typography>Name: {selectedInfo.name}</Typography>
            <Typography>Languages used: {selectedInfo.language}</Typography>
            <Typography>
              Created At: {moment(selectedInfo.created_at).format("LLL")}
            </Typography>
            <Typography>Clone URL: {selectedInfo.clone_url}</Typography>
            <Typography>SSH URL: {selectedInfo.ssh_url}</Typography>
          </DialogContentText>
        </DialogContent>
      </>
    );
  };

  render() {
    const { classes, userInfo } = this.props;
    const { open, selectedInfo } = this.state;
    return (
      <>
        <Table>
          <TableBody>
            <TableRow className={classes.tableHeadRow}>
              <TableCell className={classes.tableHead}>Repo Name</TableCell>
              <TableCell className={classes.tableHead}>Language</TableCell>
              <TableCell className={classes.tableHead}>
                Last Updated at
              </TableCell>
            </TableRow>
            {userInfo.length > 0 ? (
              userInfo.map((info) => this.renderDetails(info))
            ) : (
              <div className={classes.empty}>No Results Found.</div>
            )}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={() => this.handleClose()}>
          {selectedInfo !== null ? this.renderModelDetails() : null}
        </Dialog>
      </>
    );
  }
}
export default withStyles(styles)(RepoInfo);
