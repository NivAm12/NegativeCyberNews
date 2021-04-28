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
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  container: {
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
    minHeight:"1000px",
    background: "#f7f7f7",
    padding: "0 0 0 0"
  }, 
  header: {
    background:'rgba(0,0,0,0.03)', 
    paddingBottom: "30px", 
    borderBottom: "3px solid rgba(0,0,0,1)",
    paddingRight: "20px",
    paddingLeft: "20px"
  },
  title:{
    fontSize: "5rem",
    color: "#3f51b5",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    textShadow: "5px 0 black"
  },
  subtext: {
    display: "flex",
    marginBottom: "15px",
    width: "60em",
    margin: "auto auto",
    textAlign: "center",
    verticalAlign: "middle"
  },
  getstarted: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px"

  },
  body: {
    padding: "30px 30px"
  },
  input: {
    background: "white"
  },
  inputBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    color: "white", 
    background: "#3f51b5"
  },
  logoutButton: {
    float: "right",
    textTransform: "none"
  },
  searchResultText: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    opacity: "20%",
    fontSize: "2rem",
    fontWeight: "normal"
  },
  loadingCircle: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px"
  },
});

export default function LandingPage(props) {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [staticSearchTerm, setStaticSearchTerm] = useState("")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [data]);

  const onSubmit = async (event) => {

    //prevent refresh
    event.preventDefault();

    //display loading circle
    setLoading(true);

    //reset data
    setData([]);

    //API Post request
    const response = await Axios.post("http://localhost:5000/search", { searchTerm });

    //set head title
    setStaticSearchTerm(searchTerm)

    //hide loading circle
    setLoading(false);

    //set data
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
      
      //error handling
      console.log(err);

    }
  };

  return (
    <Container fixed className={classes.container}>
      <div className={classes.header}>
        <Button
          onClick={onLogout}
          className={classes.logoutButton}
          color="default"
          startIcon={<ExitToAppIcon />}
          >
          Logout
        </Button>
        <Typography variant="h2" className={classes.title}>NCN</Typography>
        <Typography variant="h8" className={classes.subtext}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book
        </Typography>
        <Typography variant="h6" className={classes.getstarted}>Get started by typing in a company name:</Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3} className={classes.inputBar}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                autoFocus="true"
                placeholder="Search for a company name"
                className={classes.input}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                ></TextField>
            </Grid>
            <Grid>
              <IconButton className={classes.searchButton} type="submit">
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className={classes.body}>
        {!loading & data.length != 0 ? <h1>Search results for '{staticSearchTerm}'</h1> : null}
        {!loading & !data.length ? <Typography className={classes.searchResultText}>Search results will appear here</Typography> : null}
        {loading ? (
          <div className={classes.loadingCircle}>
            <CircularProgress size="5rem"/>
          </div>
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
