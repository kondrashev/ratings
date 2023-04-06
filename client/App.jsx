// @ts-nocheck
import React, { useState, createContext } from "react";
import ReactDOM from "react-dom";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import AuthorizationForm from "./components/authorization/AuthorizationForm";
import { makeStyles } from "@mui/styles";
import { context } from "./components/constants/Context";
import Teacher from "./components/teacher/Teacher";
import Student from "./components/student/Student";

const useStyles = makeStyles({
  globalStyle: {
    margin: "0px",
    padding: "0px",
    width: "100%",
  },
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const ApplictationContext = createContext();

const App = () => {
  const classes = useStyles();
  const [values, setValues] = useState(context);
  return (
    <Provider store={store}>
      <ApplictationContext.Provider
        value={{
          values,
          setValues,
        }}
      >
        <div className={classes.globalStyle}>
          <Switch>
            <Route exact path="/" component={AuthorizationForm} />
            <Route path="/teacher" component={Teacher} />
            <Route path="/student" component={Student} />
          </Switch>
        </div>
      </ApplictationContext.Provider>
    </Provider>
  );
};
ReactDOM.render(<App />, document.querySelector("#app"));
