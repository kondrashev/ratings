// @ts-nocheck
import React, { useContext, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApplictationContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { loadItemsFetchData } from "../../store/items/action_get";
import { deleteItemsFetchData } from "../../store/items/action_delete";
import endpoints from "../constants/Endpoints";
import Item from "./Item";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "20px",
  },
  deleteIcon: {
    alignSelf: "flex-start",
    zIndex: 10000,
  },
  listItem: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  iconEdit: { marginLeft: "20px", cursor: "pointer", zIndex: 1000 },
  listItemText: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "50px",
  },
};
const ListItems = (props) => {
  const dispatch = useDispatch();
  const { suffixDisciplineURL, suffixGroupURL } = props;
  const { values, setValues } = useContext(ApplictationContext);
  const itemsList = useSelector((state) =>
    !values.getGroups ? state.itemReducer.disciplines : state.itemReducer.groups
  );
  const listOptionsSearchStudent = useSelector(
    (state) => state.studentReducer.search
  );
  const disciplineId = listOptionsSearchStudent[0];
  const updateItems = useSelector(
    !values.getGroups
      ? (state) => state.itemReducer.updateDiscipline
      : (state) => state.itemReducer.updateGroup
  );
  useEffect(() => {
    const data = {
      url: !values.getGroups
        ? endpoints.getDisciplines
        : `${endpoints.getGroups}?disciplineId=${
            suffixDisciplineURL.current || disciplineId
          }`,
      values,
      setValues,
    };
    dispatch(loadItemsFetchData(data));
  }, [updateItems]);
  const listIdItems = useRef([]);
  const getListIdItems = (event) => {
    if (event.target.checked) {
      listIdItems.current = [
        ...listIdItems.current,
        parseInt(event.target.value),
      ];
    } else {
      listIdItems.current = listIdItems.current.filter(
        (item) => item !== parseInt(event.target.value)
      );
    }
    setValues({
      ...values,
      showIconDeleteItems: Boolean(listIdItems.current.length),
    });
  };
  const deleteItems = () => {
    const { current } = listIdItems;
    listIdItems.current = [];
    const data = {
      url: !values.getGroups
        ? endpoints.deleteDisciplines
        : endpoints.deleteGroups,
      values,
      setValues,
      listId: current,
    };
    dispatch(deleteItemsFetchData(data));
  };
  return (
    <Box mt={2} sx={styles.container}>
      <Typography style={styles.title}>
        {!values.getGroups ? "Дисципліни" : "Групи"}
      </Typography>
      <IconButton
        edge="end"
        aria-label="delete"
        style={styles.deleteIcon}
        onClick={deleteItems}
      >
        {values.showIconDeleteItems && <DeleteIcon />}
      </IconButton>
      <List>
        {itemsList.map((item) => (
          <Item
            item={item}
            getListIdItems={getListIdItems}
            key={item.id}
            suffixDisciplineURL={suffixDisciplineURL}
            suffixGroupURL={suffixGroupURL}
          />
        ))}
      </List>
    </Box>
  );
};
export default ListItems;
