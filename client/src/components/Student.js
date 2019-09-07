import React from "react";
import {
  withStyles,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Checkbox
} from "@material-ui/core";

import school from "../api/school";
import { toast } from "react-toastify";
import store from "store";
import _ from "lodash";

const style = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  typography: {
    padding: "10px"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
});

class Student extends React.Component {
  state = { _5chosen: "", _6chosen: [] };
  _5Subjects = [];
  _6Subjects = [];

  async componentDidMount() {
    try {
      const response = await school.get("/subjects/all");
      const subjects = response.data;
      this._5Subjects = subjects.filter(subject => subject.semester === 5);
      this._6Subjects = subjects.filter(subject => subject.semester === 6);
      let user = store.get("user");
      if (user && user.semester === 5) {
        let chosenSubject =
          user.subjects.length === 1
            ? user.subjects[0]
            : this._5Subjects[0].name;
        this.setState({ _5chosen: chosenSubject });
      } else if (user) {
        let chosenSubjects = user.subjects.length === 2 ? user.subjects : [];
        this.setState({ _6chosen: chosenSubjects });
      }
    } catch (error) {
      toast.error("Failed to retrieve subjects due to : " + error.message);
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeCheckBox = event => {
    let { _6chosen } = this.state;
    if (event.target.checked) {
      _6chosen.push(event.target.value);
    } else {
      _6chosen = _.remove(_6chosen, el => {
        return el !== event.target.value;
      });
    }
    this.setState({ _6chosen });
  };

  handleSubSelection = async semester => {
    try {
      let response = {};
      if (semester === 5) {
        let subjects = [];
        subjects.push(this.state._5chosen);
        response = await school.put(`/students/edit/${store.get("user")._id}`, {
          subjects
        });
      } else {
        response = await school.put(`/students/edit/${store.get("user")._id}`, {
          subjects: this.state._6chosen
        });
      }
      store.set("user", _.omit(response.data, "password"));
      toast.success("Saved subject selection successfully.");
    } catch (error) {
      toast.warn("Failed to save subject selection due to: " + error.message);
    }
  };

  renderSelection(semester) {
    const { classes } = this.props;
    if (semester === 5) {
      return (
        <>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Subjects</FormLabel>
            <RadioGroup
              aria-label="_5chosen"
              name="_5chosen"
              className={classes.group}
              value={this.state._5chosen}
              onChange={this.handleChange}
            >
              {this._5Subjects.map(sub => {
                return (
                  <FormControlLabel
                    key={sub._id}
                    value={sub.name}
                    control={<Radio />}
                    label={sub.name}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>

          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => this.handleSubSelection(5)}
          >
            SAVE SELECTION
          </Button>
        </>
      );
    } else {
      return (
        <>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Subjects</FormLabel>
            {this._6Subjects.map(sub => {
              return (
                <FormControlLabel
                  key={sub._id}
                  control={
                    <Checkbox
                      name={sub.name}
                      checked={this.state._6chosen.includes(sub.name)}
                      onChange={this.handleChangeCheckBox}
                      value={sub.name}
                    />
                  }
                  label={sub.name}
                />
              );
            })}
          </FormControl>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => this.handleSubSelection(6)}
            disabled={this.state._6chosen.length !== 2}
          >
            SAVE SELECTION
          </Button>
        </>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const user = store.get("user");
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography
            variant="h5"
            component="h6"
            className={classes.typography}
            gutterBottom
            align="center"
          >
            CHOOSE SUBJECT(S)
          </Typography>
          <Typography
            variant="subtitle2"
            className={classes.typography}
            gutterBottom
            align="center"
          >
            You are in {user.semester}th semester. Choose{" "}
            {user.semester === 5 ? 1 : 2} subject(s)
          </Typography>
          {this.renderSelection(user.semester)}
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(Student);
