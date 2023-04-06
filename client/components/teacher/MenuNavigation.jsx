// @ts-nocheck
import React, { useContext, useEffect } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { ApplictationContext } from "../../App";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { showNavigation } from "./MapperStudents";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
    cursor: "pointer",
  };
});
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const styles = {
  navigation: {
    width: "auto",
    marginTop: "80px",
  },
  styledBreadcrumbItem: {
    cursor: "pointer",
    fontSize: "18px",
  },
};
export default function MenuNavigation(props) {
  const { suffixDisciplineURL, suffixGroupURL } = props;
  const { values, setValues } = useContext(ApplictationContext);
  const listOptionsSearchStudent = useSelector(
    (state) => state.studentReducer.search
  );
  useEffect(() => {
    showNavigation(
      values,
      setValues,
      suffixDisciplineURL,
      suffixGroupURL,
      "",
      "",
      "",
      listOptionsSearchStudent[0],
      listOptionsSearchStudent[2]
    );
  }, [listOptionsSearchStudent, values.valueNavigationItemGroup]);
  return (
    <Box onClick={handleClick} sx={styles.navigation}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          label="Курси"
          icon={<HomeIcon fontSize="small" />}
          style={styles.styledBreadcrumbItem}
          onClick={() => {
            setValues({
              ...values,
              showNavigationItemDiscipline: false,
              showNavigationItemGroup: false,
              showListItems: true,
              getGroups: false,
              showListStudents: false,
              isShowSearchStudent: false,
              showNavigationItemStudent: false,
              nameStudent: "",
            });
          }}
        />
        {values.showNavigationItemDiscipline && (
          <StyledBreadcrumb
            label={
              values.valueNavigationItemDiscipline ||
              listOptionsSearchStudent[1]
            }
            style={styles.styledBreadcrumbItem}
            onClick={() => {
              setValues({
                ...values,
                showListItems: true,
                getGroups: true,
                showListStudents: false,
                showNavigationItemGroup: false,
                isShowSearchStudent: false,
                showNavigationItemStudent: false,
                isSwitchMenuNavigationItemGroup:
                  !values.isSwitchMenuNavigationItemGroup,
                nameStudent: "",
              });
            }}
          />
        )}
        {values.showNavigationItemGroup && (
          <StyledBreadcrumb
            label={
              values.valueNavigationItemGroup || listOptionsSearchStudent[3]
            }
            style={styles.styledBreadcrumbItem}
            onClick={() => {
              setValues({
                ...values,
                showListItems: false,
                getGroups: false,
                showListStudents: true,
                isShowSearchStudent: false,
                showNavigationItemStudent: false,
                isSwitchMenuNavigationItemGroup:
                  !values.isSwitchMenuNavigationItemGroup,
                nameStudent: "",
              });
            }}
          />
        )}
        {values.showNavigationItemStudent && (
          <StyledBreadcrumb
            label={
              values.isShowSearchStudent
                ? listOptionsSearchStudent[5]?.surName
                : values.valueNavigationItemStudent
            }
            style={styles.styledBreadcrumbItem}
          />
        )}
      </Breadcrumbs>
    </Box>
  );
}
