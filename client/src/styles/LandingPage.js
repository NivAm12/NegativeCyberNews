import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    padding: '0 0',
    minHeight: '100%',
    background: 'rgba(255, 255, 255, 0.9)',
    //padding: "0 0",
    //position: "sticky",
    // marginLeft: '130px',
    // marginTop: "20px",
    // marginBottom: "100px",
    // //height: "auto",
    // // width: "1200px",
    //  //height: "1200px",
    // // left: "50%",
    // // top: "0%",
    // // marginLeft: "-600px"
  },
  header: {
    borderBottom: "3px solid rgba(0,0,0,1)",
    padding: "30px 30px 30px 30px",
    background : "linear-gradient(360deg, #e3e3e3 30%, white 98%)"
  },
  title: {
    fontSize: "5rem",
    height: "120px",
    fontFamily: "Lato, sans-serif",
  },
  subtext: {
    marginBottom: "15px",
    fontSize: "20px"
  },
  getStarted: {
    fontWeight: "bold",
    fontSize: "17px",
    marginBottom: "10px",
  },
  body: {
    padding: "30px 30px",
    // background: "rgba(255,255,255,0.9)",
    // minHeight: "300px"

  },
  input: {
    background: "white",
    borderRadius: "4px",
  },
  inputBar: {
    alignItems: "center",
  },
  clear: {
    padding: "1px",
  },
  searchButton: {
    color: "white",
    background: "#c91818",
    '&:hover':{
      background: "#a80c0c"
    }
  },
  logoutButton: {
    float: "right",
    textTransform: "none",
  },
  searchResultText: {
    color: "black",
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    opacity: "70%",
    fontSize: "2rem",
    fontWeight: "500",
  },
  searchResults: {
    fontSize: "1.5rem",
    fontWeight: "500",
    marginBottom: "7px"
  },
  loadingCircle: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  }
});

export { useStyles };
