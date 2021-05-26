import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: "15px",
        background : "linear-gradient(360deg, #D2D2D2 10%, white 78%)",
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      readMore: {
          backgroundColor: "#c91818",
          '&:hover':{
            background: "#a80c0c"
          },
          color: "white"
    }
  });


export { useStyles }