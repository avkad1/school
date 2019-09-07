import React from "react";
import {
  Paper,
  TextField,
  Grid,
  CssBaseline,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  field: {
    marginLeft: theme.spacing(2),
    width: "90%"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  }
});

const INITIAL_STATE = {
  name: "",
  emailId: "",
  password: "",
  semester: "5"
};

class Admin extends React.Component {
  state = INITIAL_STATE;

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreate = () => {
    let newStudent = this.state;
    newStudent.semester = this.state.semester === "5" ? 5 : 6;
    this.props.handleCreate(newStudent);
    this.setState(INITIAL_STATE);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography
            variant="h5"
            component="h6"
            style={{ padding: "10px" }}
            gutterBottom
            align="center"
          >
            ADD STUDENT
          </Typography>
          <form className={classes.form} autoComplete="off">
            <Grid container spacing={3} component="main">
              <CssBaseline />
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Student Name"
                  fullWidth
                  className={classes.field}
                  required
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  required
                  name="emailId"
                  id="emailId"
                  label="Email ID"
                  type="email"
                  fullWidth
                  className={classes.field}
                  value={this.state.emailId}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  className={classes.field}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Semester</FormLabel>
                  <RadioGroup
                    aria-label="semester"
                    name="semester"
                    className={classes.group}
                    value={this.state.semester}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="Fifth"
                    />
                    <FormControlLabel
                      value="6"
                      control={<Radio />}
                      label="Sixth"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={this.handleCreate}
            >
              ADD
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
