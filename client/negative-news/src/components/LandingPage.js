import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import ArticleCard from "./ArticleCard";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
    height: "2500px",
    background: "#f7f7f7",
  },
  input: {
    background: "white",
  },
  inputBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "50px",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
  logoutButton: {
    float: "right",
    textTransform: "none",
  },
});

export default function LandingPage(props) {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("use effect");
  }, [data]);

  const onSubmit = async (event) => {
    //prevent refresh
    event.preventDefault();
    setFlag(true);
    setData([]);
    //API Post request
    const response = await Axios.post("http://localhost:5000/search", {
      searchTerm,
    });

    setData(response.data.data);
  };

  const onLogout = async (event) => {
    //prevent refresh
    event.preventDefault();

    try {
      //API Get request
      await Axios.get(`http://localhost:5000/logout`);

      //logout user
      props.setUser(null);

      //redirect to login page
      props.history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fixed className={classes.container}>
      <Button
        onClick={onLogout}
        className={classes.logoutButton}
        color="default"
        startIcon={<ExitToAppIcon />}
      >
        Logout
      </Button>

      <form onSubmit={onSubmit}>
        <Grid container spacing={3} className={classes.inputBar}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              autoFocus="true"
              className={classes.input}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            ></TextField>
          </Grid>
          <Grid>
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      <br></br>
      <div>
        {data.length == 0 && flag ? (
          <CircularProgress />
        ) : (
          data.map((article) => {
            return (
              <div>
                <ArticleCard article={article}></ArticleCard>
                <br></br>
              </div>
            );
          })
        )}
      </div>
    </Container>
  );
}
