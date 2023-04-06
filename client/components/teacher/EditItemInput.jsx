// @ts-nocheck
import React, { useState, useContext } from "react";
import TableCell from "@mui/material/TableCell";
import { ApplictationContext } from "../../App";

const EditItemInput = ({ row, id, editItem, surName }) => {
  const { values, setValues } = useContext(ApplictationContext);
  const styles = {
    cellInput: {
      width: id !== "surName" ? "40px" : "80px",
      cursor: "pointer",
      textAlign: id !== "surName" ? "center" : "right",
      border: "none",
    },
  };
  const [item, setItem] = useState("");
  const changeItem = (event) => {
    setItem(event.target.value);
  };
  const clearInput = (event) => {
    event.target.value = "";
  };
  return (
    <TableCell align="right">
      {(id === "surName" && !surName && values.typeUser === "ADMIN") ||
      (id === "report" && values.typeUser === "ADMIN") ||
      (id === "teacher" && values.typeUser === "ADMIN") ||
      (id === "conspectus" && values.typeUser === "ADMIN") ||
      (id === "exercise" && values.typeUser === "ADMIN") ? (
        <input
          style={styles.cellInput}
          value={item ? item : row[id]}
          onChange={changeItem}
          onKeyPress={(event) => editItem(event, row.id, id, item)}
          onClick={clearInput}
        />
      ) : (
        row[id]
      )}
    </TableCell>
  );
};
export default EditItemInput;
