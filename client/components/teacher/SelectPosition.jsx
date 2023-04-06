// @ts-nocheck
import React, { useContext } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { ApplictationContext } from "../../App";

const SelectPosition = ({ type, styles, handleChangePosition }) => {
  const { values } = useContext(ApplictationContext);
  const itemsList = useSelector((state) => {
    if (type === "Discipline") {
      return state.itemReducer.disciplines;
    } else {
      return state.itemReducer.groups.filter((item) =>
        !values.showRadioButtons ? item.moodle : !item.moodle
      );
    }
  });
  return (
    <FormControl style={styles.fields}>
      <InputLabel id="demo-simple-select-label">Поз.</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={(event) => handleChangePosition(event, type)}
        disabled={!values.showNavigationItemDiscipline}
      >
        {itemsList.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectPosition;
