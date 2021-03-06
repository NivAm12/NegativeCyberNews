import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ClearIcon from "@material-ui/icons/Clear";
import ArticleCard from "./ArticleCard";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/LandingPage";
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function LandingPage(props) {

  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [staticSearchTerm, setStaticSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(true);

  useEffect(() => {}, [data]);

  const onSubmit = async (event) => {
    //prevent refresh
    event.preventDefault();

    try {
      //display loading circle
      setLoading(true);

      // reset result status
      setResult(true);

      //reset data
      setData([]);

      //API Post request
      const response = await Axios.post("http://localhost:5000/search", {
        searchTerm,
      });

      //set head title
      setStaticSearchTerm(searchTerm);

      //hide loading circle
      setLoading(false);

      //set data
      setData(response.data.data);

    } catch (err) {
      setResult(false);

    } finally {
      setLoading(false);
    }
  };

  const onLogout = async (event) => {
    //prevent refresh
    event.preventDefault();
    props.logoutUser();
  };

  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <Button
          onClick={onLogout}
          className={classes.logoutButton}
          color="default"
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
        <Typography variant="h2" className={classes.title}>
          Negative Cyber News
        </Typography>
        <Typography variant="h6" className={classes.subtext}>
          Negative Cyber News is an API tool that will get you the latest cyber
          news of a company of your interest by scraping relevant websites
        </Typography>
        <Typography variant="h6" className={classes.getStarted}>
          Get started by typing in a company name:
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3} className={classes.inputBar}>
            {searchTerm ? (
              <Grid>
                <IconButton
                  className={classes.clear}
                  onClick={() => setSearchTerm("")}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            ) : null}
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                size="small"
                autoFocus={true}
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

        {/* initial search result text */}
        {!loading & !data.length & result ? (
          <Typography className={classes.searchResultText}>
            Search results will appear here
          </Typography>
        ) : null}

        {/* search results text */}
        {!loading & (data.length !== 0) ? (
          <Typography className={classes.searchResults}>Search results for '{staticSearchTerm}'</Typography>
        ) : null}

        {/* no results text */}
        {!loading & !data.length & !result ? (
          <Typography className={classes.searchResultText}>
            There are no results
          </Typography>
        ) : null}
        
        {/* loading circle */}
        {loading ? (
          <div className={classes.loadingCircle}>
            <CircularProgress size="5rem" />
          </div>
        ) : (
          data.map((article) => {
            return (
              <div>
                <ArticleCard article={article}></ArticleCard>
              </div>
            );
          })
        )}
      </div>
    </Container>
  );
}
LandingPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(LandingPage);