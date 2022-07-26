import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
  },
  input: {
    height: "40px",
    color: theme.palette.mode === "light" && "#0000",
    filter: theme.palette.mode === "light" && "invert(1)",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-3px",
      marginBottom: "10px",
    },
  },
}));
