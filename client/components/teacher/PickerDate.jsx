// @ts-nocheck
import React, { useState, useContext } from "react";
import ruLocale from "date-fns/locale/ru";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateContext } from "../teacher/FormItem";

export default function PickerDate(props) {
  const { item, dateNew = "" } = props;
  const { datesList } = useContext(DateContext);
  const [date, setDate] = useState("");
  const changeDate = (newDate) => {
    datesList.current.set(item, newDate.toLocaleDateString("uk-UK"));
    setDate(newDate);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <div>
        <DatePicker
          mask="__.__.____"
          value={date ? date : dateNew.split(".").reverse().join(".")}
          onChange={(newDate) => changeDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}
