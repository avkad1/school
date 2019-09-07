import React from "react";
import {
  Container,
  Tabs,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import store from "store";

import AppBar from "./AppBar";
import TabDetails from "./TabDetails";
import Admin from "./Admin";
import Student from "./Student";
import school from "../api/school";
import { toast } from "react-toastify";

const style = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column"
  },
  tableRoot: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
});

class Landing extends React.Component {
  state = {
    tabValue: 0,
    students: [],
    page: 0,
    rowsPerPage: 5
  };

  async componentDidMount() {
    try {
      const response = await school.get("/students/all");
      this.setState({ students: response.data });
    } catch (error) {
      toast.error(
        "Failed to retrieve the students list due to error: " + error.message
      );
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      tabValue: newValue
    });
  };

  handleCreate = async newStudent => {
    try {
      const response = await school.post("/students/new", newStudent);
      toast.success(response.data.message);
      let { students } = this.state;
      students.push(response.data.student);
      this.setState({ ...this.state, students });
    } catch (error) {
      toast.error("Failed to add student due to : " + error.message);
    }
  };

  render() {
    const { classes } = this.props;
    let user = store.get("user");
    return (
      <Container maxWidth="md">
        <AppBar />
        <Paper className={classes.root}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            {user && user.isAdmin && <Tab label="ADMIN" />}
            {user && !user.isAdmin && <Tab label="STUDENT" />}
          </Tabs>
          {user && user.isAdmin && (
            <TabDetails value={this.state.tabValue} index={0}>
              <Admin handleCreate={this.handleCreate} />
              <div className={classes.tableRoot}>
                <Paper className={classes.paper}>
                  <Typography
                    variant="h5"
                    component="h6"
                    style={{ padding: "10px" }}
                    gutterBottom
                    align="center"
                  >
                    STUDENTS LIST
                  </Typography>
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Email ID</TableCell>
                        <TableCell align="center">Semester</TableCell>
                        <TableCell align="center">Subject&nbsp;(s)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.students.map(student => (
                        <TableRow key={student.emailId}>
                          <TableCell component="th" scope="row">
                            {student.name}
                          </TableCell>
                          <TableCell align="center">
                            {student.emailId}
                          </TableCell>
                          <TableCell align="center">
                            {student.semester}
                          </TableCell>
                          <TableCell align="center">
                            {student.subjects.join(", ")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </TabDetails>
          )}
          {user && !user.isAdmin && (
            <TabDetails value={this.state.tabValue} index={0}>
              <Student />
            </TabDetails>
          )}
        </Paper>
      </Container>
    );
  }
}

export default withStyles(style)(Landing);
