import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
      boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.2)",
      minHeight:"1000px",
      background: "#f7f7f7",
      padding: "0 0",
      minWidth:"1500px"
    }, 
    header: {
      background:'rgba(0,0,0,0.03)', 
      // paddingBottom: "30px", 
      borderBottom: "3px solid rgba(0,0,0,1)",
      padding: "5px 30px 30px 30px"
      // paddingRight: "20px",
      // paddingLeft: "20px"
    },
    title:{
      fontSize: "5rem",
      color: "#3f51b5",
      fontWeight: "bold",
      // display: "flex",
      // justifyContent: "center",
      letterSpacing: "4px",
      textShadow: "5px 0 black"
    },
    subtext: {
      // display: "flex",
      marginBottom: "15px",
      maxWidth: "60px",
      // margin: "auto auto",
      textAlign: "center",
      verticalAlign: "middle"
    },
    getStarted: {
      fontWeight: "bold",
      // display: "flex",
      // justifyContent: "center",
      marginBottom: "10px"
  
    },
    body: {
      padding: "30px 30px"
    },
    input: {
      background: "white"
    },
    inputBar: {
      // display: "flex",
      // justifyContent: "center",
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
      fontWeight: "500"
    },
    loadingCircle: {
      display: "flex",
      justifyContent: "center",
      marginTop: "50px"
    }
  });


export { useStyles }