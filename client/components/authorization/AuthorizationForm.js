// @ts-nocheck
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ApplictationContext } from "../../App";
import { useHistory } from "react-router-dom";
import { checkUserFetchData } from "../../store/authorization/action";
import endpoints from "../constants/Endpoints";
import Alert from "@mui/material/Alert";

const styles = {
  formAuthorization: {
    width: "400px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    background: "#F1F3F4",
    borderRadius: "10px",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 30%)",
  },
  fields: {
    width: "360px",
    height: "50px",
  },
};
const AuthorizationForm = () => {
  const history = useHistory();
  const { values, setValues } = useContext(ApplictationContext);
  const handleChangeLogin = (event) => {
    setValues({ ...values, login: event.target.value });
  };
  const handleChangePassword = (event) => {
    setValues({ ...values, password: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch();
  const authorizationCheck = (data) => dispatch(checkUserFetchData(data));
  const authorization = () => {
    const data = {
      url: endpoints.signIn,
      values,
      setValues,
    };
    authorizationCheck(data);
  };
  const onPressKey = (event) => {
    if (event.key === "Enter") {
      authorization();
    }
  };
  useEffect(() => {
    switch (values.typeUser) {
      case "ADMIN":
        history.push("/teacher");
        break;
      case "USER":
        history.push("/student");
        break;
      default:
        history.push("/");
    }
  }, [values.typeUser]);
  return (
    <Box sx={styles.formAuthorization}>
      <TextField
        id="outlined-search"
        disabled={values.errorForm}
        label="Login"
        variant="outlined"
        style={styles.fields}
        onChange={handleChangeLogin}
      />
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          disabled={values.errorForm}
          type={values.showPassword ? "text" : "password"}
          onChange={handleChangePassword}
          style={styles.fields}
          onKeyPress={onPressKey}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        style={styles.fields}
        onClick={authorization}
        disabled={values.errorForm ? true : false}
      >
        Authorization
      </Button>
      {values.errorForm && (
        <Alert
          onClose={() => {
            setValues({
              ...values,
              errorForm: false,
              errorMessage: "",
            });
          }}
        >
          {values.errorMessage}
        </Alert>
      )}
    </Box>
  );
};
export default AuthorizationForm;
