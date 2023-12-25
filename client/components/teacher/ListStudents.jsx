// @ts-nocheck
import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import endpoints from "../constants/Endpoints";
import { useDispatch, useSelector } from "react-redux";
import { loadStudentsFetchData } from "../../store/students/action_get";
import { loadListDatesFetchData } from "../../store/students/action_dates";
import { updateStudentFetchData } from "../../store/students/action_edit";
import { ApplictationContext } from "../../App";
import { headCells, createData } from "./MapperStudents";
import EditItemInput from "./EditItemInput";
import { deleteItemsFetchData } from "../../store/items/action_delete";

const ListStudents = (props) => {
  const { suffixGroupURL } = props;
  const { values, setValues } = useContext(ApplictationContext);
  const dispatch = useDispatch();
  const listDates = useSelector((state) => state.studentReducer.dates) || [];
  const updateDates = useSelector((state) => state.studentReducer.updateDate);
  const listStudents =
    values.isShowSearchStudent && values.typeUser === "ADMIN"
      ? useSelector((state) => state.studentReducer.search).filter(
          (_, index) => index === 5
        )
      : useSelector((state) => state.studentReducer.students);
  const updateStudent = useSelector(
    (state) => state.studentReducer.updateStudent
  );
  useEffect(() => {
    const data = {
      url:
        values.typeUser === "ADMIN"
          ? `${endpoints.getListDates}?groupId=${
              suffixGroupURL.current || listStudents[0]?.groupId
            }`
          : `${endpoints.getListDatesSearch}?nameGroup=${values.nameStudent}`,
      values,
      setValues,
    };
    dispatch(loadListDatesFetchData(data));
  }, [
    updateDates,
    values.nameStudent,
    listStudents[0]?.groupId,
    values.update,
  ]);
  useEffect(() => {
    if (values.showListStudents && !values.isShowSearchStudent) {
      const data = {
        url: `${endpoints.getStudents}?groupId=${suffixGroupURL.current}`,
        values,
        setValues,
      };
      dispatch(loadStudentsFetchData(data));
    }
  }, [updateStudent, values.update, values.isSwitchMenuNavigationItemGroup]);
  useEffect(() => {
    if (values.isShowSearchStudent) {
      const data = {
        url:
          values.typeUser === "ADMIN"
            ? `${endpoints.searchStudent}?surName=${String(values.nameStudent)
                .substring(0, 1)
                .toUpperCase()}${String(values.nameStudent).substring(1)}`
            : `${endpoints.getSearchGroup}?nameGroup=${values.nameStudent}`,
        values,
        setValues,
      };
      dispatch(loadStudentsFetchData(data));
    }
  }, [values.isActiveSearchStudent, updateStudent, values.update]);
  const sumRating = listStudents.reduce((sum, item)=>sum+item.rating, 0);
  const rows = listStudents.map((item) => {
    return createData(item);
  });
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              disabled={
                values.typeUser === "USER" || listStudents[0]?.options
                  ? true
                  : false
              }
            />
          </TableCell>
          {headCells(listDates).map((headCell) => {
            if (!values.isShowColumns) {
              if (!headCell.id.includes("test")) {
                return (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    padding={headCell.disablePadding ? "none" : "normal"}
                    sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={createSortHandler(headCell.id)}>
                      {headCell.label}
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    </TableSortLabel>
                  </TableCell>
                );
              }
            } else {
              return (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}>
                  <TableSortLabel
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}>
                    {headCell.label}
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  </TableSortLabel>
                </TableCell>
              );
            }
          })}
        </TableRow>
      </TableHead>
    );
  }
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  const deleteItems = () => {
    const data = {
      url: endpoints.deleteStudents,
      values,
      setValues,
      listId: selected,
      setSelected,
    };
    dispatch(deleteItemsFetchData(data));
  };
  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}>
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div">
            {values.typeUser === "USER"
              ? String(values.titleNameGroup).toUpperCase()
              : `Студенти_загальний рейтинг-${sumRating}`}
          </Typography>
        )}
        {numSelected > 0 && values.typeUser === "ADMIN" ? (
          <Tooltip title="Delete">
            <IconButton onClick={deleteItems}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : values.typeUser === "ADMIN" ? (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
    );
  };
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("surName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, id) => {
    if (values.typeUser === "ADMIN" && !listStudents[0]?.options) {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const editItem = (event, studentId, id, item) => {
    if (event.key === "Enter") {
      const data = {
        url: endpoints.updateStudent,
        studentId,
        item: id,
        valueItem: item,
        values,
        setValues,
      };
      event.target.blur();
      dispatch(updateStudentFetchData(data));
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        zIndex: !values.showFormItem && 1000,
      }}>
      <Paper
        sx={{ width: "100%", mt: values.typeUser === "USER" ? 6 : 0, mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      key={row.surName}
                      selected={isItemSelected}>
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row.id)}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          disabled={
                            values.typeUser === "USER" ||
                            listStudents[0]?.options
                              ? true
                              : false
                          }
                        />
                      </TableCell>
                      {headCells(listDates).map(({ id }) => {
                        if (!values.isShowColumns) {
                          if (!id.includes("test")) {
                            return (
                              <EditItemInput
                                key={id}
                                row={row}
                                id={id}
                                editItem={editItem}
                                surName={listStudents[0]?.options}
                              />
                            );
                          }
                        } else {
                          return (
                            <EditItemInput
                              key={id}
                              row={row}
                              id={id}
                              editItem={editItem}
                              surName={listStudents[0]?.options}
                            />
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
export default ListStudents;
