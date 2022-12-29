// @ts-nocheck
import React, { useContext, useRef } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { ApplictationContext } from "../../App";
import MainMenu from "../teacher/MainMenu";
import ListStudents from "../teacher/ListStudents";

const styles = {
  container: {
    margin: "0px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const Student = () => {
  const { values, setValues } = useContext(ApplictationContext);
  const suffixDisciplineURL = useRef("");
  const suffixGroupURL = useRef("");
  return (
    <Box sx={styles.container}>
      <MainMenu />
      {values.showListStudents && !values.errorForm && (
        <ListStudents
          suffixDisciplineURL={suffixDisciplineURL}
          suffixGroupURL={suffixGroupURL}
        />
      )}
      {values.errorForm && (
        <Alert
          onClose={() => {
            setValues({ ...values, errorForm: false, errorMessage: "" });
          }}
        >
          {values.errorMessage}
        </Alert>
      )}
    </Box>
  );
};
export default Student;
