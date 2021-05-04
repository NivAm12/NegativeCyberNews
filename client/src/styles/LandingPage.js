import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
      minHeight:"1000px",
      padding: "0 0",
      minWidth:"1300px",
    }, 
    header: {
      borderBottom: "3px solid rgba(0,0,0,1)",
      padding: "5px 30px 30px 30px"
    },
    title:{
      fontSize: "7rem",
      color: "#c91818",
      fontWeight: "bold",
      fontFamily: "Yanone Kaffeesatz, sans-serif",
      letterSpacing: "4px",
      textShadow: "5px 0 black"
    },
    subtext: {
      marginBottom: "15px",
      maxWidth: "60px",
      textAlign: "center",
      verticalAlign: "middle",
      fontSize: "17px",
    },
    getStarted: {
      fontWeight: "bold",
      fontSize: "27px",
      marginBottom: "10px"
  
    },
    body: {
      padding: "30px 30px"
    },
    input: {
      background: "white"
    },
    inputBar: {
      alignItems: "center"
    },
    searchButton: {
      color: "white", 
      background: "#c91818"
    },
    logoutButton: {
      float: "right",
      textTransform: "none"
    },
    searchResultText: {
      color: "black",
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",
      opacity: "70%",
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