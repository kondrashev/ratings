// @ts-nocheck
import React, { useContext, useRef, useEffect } from "react";
import Alert from "@mui/material/Alert";
import MainMenu from "./MainMenu";
import MenuNavigation from "./MenuNavigation";
import ListItems from "./ListItems";
import ListStudents from "./ListStudents";
import Box from "@mui/material/Box";
import { ApplictationContext } from "../../App";
import FormItem from "./FormItem";
import { useSpring, animated as a } from "react-spring";

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
const Teacher = () => {
  const { values, setValues } = useContext(ApplictationContext);
  const suffixDisciplineURL = useRef("");
  const suffixGroupURL = useRef("");
  const animationFormDiscipline = useSpring({
    marginLeft: values.showFormItem ? -727 : -1127,
    config: { duration: 1000 },
  });
  useEffect(() => {
    setValues({
      ...values,
      showNavigationItemDiscipline: false,
      showListItems: true,
    });
  }, []);
  return (
    <Box sx={styles.container}>
      <MainMenu />
      <MenuNavigation
        suffixDisciplineURL={suffixDisciplineURL}
        suffixGroupURL={suffixGroupURL}
      />
      {values.showListItems && (
        <ListItems
          suffixDisciplineURL={suffixDisciplineURL}
          suffixGroupURL={suffixGroupURL}
        />
      )}
      {values.showListStudents && !values.errorForm && (
        <ListStudents
          suffixDisciplineURL={suffixDisciplineURL}
          suffixGroupURL={suffixGroupURL}
        />
      )}
      {values.showFormItem && (
        <Box
          sx={{
            position: "fixed",
            top: "150px",
          }}>
          <a.div style={animationFormDiscipline}>
            <FormItem />
          </a.div>
        </Box>
      )}
      {values.errorForm && (
        <Alert
          onClose={() => {
            setValues({
              ...values,
              errorForm: false,
              errorMessage: "",
              isShowSearchStudent: false,
              showListStudents: false,
            });
          }}>
          {values.errorMessage}
        </Alert>
      )}
    </Box>
  );
};
export default Teacher;
