// @ts-nocheck
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { ApplictationContext } from "../../App";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

export default function OpenMenu() {
  const { values, setValues } = useContext(ApplictationContext);
  const handleClick = (event) => {
    setValues({
      ...values,
      openMenu: !values.openMenu ? event.currentTarget : false,
    });
  };
  const openFormItem = (type) => {
    switch (type) {
      case "add":
        setValues({
          ...values,
          openMenu: false,
          showFormItem: true,
          showRadioButtons: true,
        });
        break;
      case "upload":
        setValues({
          ...values,
          openMenu: false,
          showFormItem: true,
          showRadioButtons: false,
          showNameGroup: true,
          showSurNameStudent: true,
          showNavigationItemDiscipline: false,
          showNavigationItemGroup: false,
          showNavigationItemStudent: false,
          showListItems: false,
          showListStudents: false,
        });
        break;
      case "date":
        setValues({
          ...values,
          openMenu: false,
          showFormItem: true,
          showRadioButtons: false,
          showNameGroup: true,
          showSurNameStudent: true,
          getListDates: true,
        });
        break;
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={values.openMenu}
        open={values.openMenu}
        style={{ zIndex: 10000 }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 5,
              right: 111,
              width: 15,
              height: 15,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => openFormItem("add")}>
          <ListItemIcon>
            <AddBusinessIcon fontSize="small" />
          </ListItemIcon>
          Додати позицію
        </MenuItem>
        <MenuItem onClick={() => openFormItem("upload")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Завантажити інформацію
        </MenuItem>
        <MenuItem onClick={() => openFormItem("date")}>
          <ListItemIcon>
            <CalendarTodayIcon fontSize="small" />
          </ListItemIcon>
          Зформувати дати
        </MenuItem>
        <MenuItem onClick={() => setValues({ ...values, openMenu: false })}>
          <ListItemIcon>
            <AssignmentReturnIcon fontSize="small" />
          </ListItemIcon>
          Вийти
        </MenuItem>
      </Menu>
    </>
  );
}
