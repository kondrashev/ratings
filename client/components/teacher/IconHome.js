import React, { useContext } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { ApplictationContext } from "../../App";
import { useHistory } from "react-router-dom";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function IconHome() {
  const history = useHistory();
  const { values, setValues } = useContext(ApplictationContext);
  const logOut = () => {
    setValues({
      ...values,
      typeUser: false,
      showListStudents: false,
      isShowSearchStudent: false,
      showListItems: true,
      showNavigationItemDiscipline: false,
      showNavigationItemGroup: false,
      showNavigationItemStudent: false,
    });
    history.push("/");
  };
  return (
    <>
      <div onClick={logOut}>
        <HomeIcon />
      </div>
    </>
  );
}
