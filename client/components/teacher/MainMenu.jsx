// @ts-nocheck
import React, { useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import { ApplictationContext } from '../../App';
import IconHome from './IconHome';
import Avatar from '@mui/material/Avatar';
import OpenMenu from './OpenMenu';
import endpoints from '../constants/Endpoints';
import { searchStudentsFetchData } from '../../store/students/action_search_students';
import { searchGroupsFetchData } from '../../store/students/action_search_groups';
import { useSelector, useDispatch } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '235px',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default function MainMenu() {
  const { values, setValues } = useContext(ApplictationContext);
  const useStyles = makeStyles({
    globalStyle: {
      width: '100%',
      position: 'absolute',
    },
    searchStudents: {
      width: '235px',
      position: 'absolute',
      top: '55px',
      left: values.typeUser === 'ADMIN' ? '226px' : '114px',
    },
    avatar: { marginLeft: '50px', marginRight: '20px' },
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const listStudents =
    values.isShowSearchStudent && values.typeUser === 'ADMIN'
      ? useSelector((state) => state.studentReducer.search).filter((_, index) => index === 5)
      : useSelector((state) => state.studentReducer.students);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const searchStudents = useSelector((state) => state.studentReducer.searchStudents);
  const searchGroups = useSelector((state) => state.studentReducer.searchGroups);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const changeNameStudent = (event) => {
    setValues({
      ...values,
      nameStudent: values.typeUser === 'USER' ? event.target.value.toUpperCase() : event.target.value,
    });
    if (values.typeUser === 'ADMIN') {
      const data = {
        url: `${endpoints.searchStudents}?pattern=${String(event.target.value).substring(0, 1).toUpperCase()}${String(event.target.value).substring(
          1,
        )}`,
        values,
        setValues,
      };
      event.target.value && dispatch(searchStudentsFetchData(data));
    }
    if (values.typeUser === 'USER') {
      const data = {
        url: `${endpoints.getSearchGroups}?pattern=${String(event.target.value).substring(0, 1).toUpperCase()}${String(event.target.value).substring(
          1,
        )}`,
        values,
        setValues,
      };
      event.target.value && dispatch(searchGroupsFetchData(data));
    }
  };
  const itemSearch = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      if (values.typeUser === 'ADMIN') {
        setValues({
          ...values,
          errorForm: false,
          showListStudents: true,
          showListItems: false,
          isActiveSearchStudent: !values.isActiveSearchStudent,
          isShowSearchStudent: true,
          showNavigationItemDiscipline: true,
          showNavigationItemGroup: true,
          showNavigationItemStudent: true,
          isActiveListItems: false,
        });
      } else if (values.typeUser === 'USER') {
        setValues({
          ...values,
          errorForm: false,
          isShowSearchStudent: true,
          showListStudents: true,
          showListItems: false,
          isActiveSearchStudent: !values.isActiveSearchStudent,
          isActiveListItems: false,
          showNavigationItemDiscipline: false,
          showNavigationItemGroup: false,
          showNavigationItemStudent: false,
          titleNameGroup: event.target.value,
        });
      }
    }
  };
  const showColumns = () => {
    setValues({
      ...values,
      isShowColumns: !values.isShowColumns,
    });
  };
  const getSurNameStudent = (surName, nameGroup) => {
    setValues({
      ...values,
      nameStudent: surName,
      nameGroup,
      errorForm: false,
      showListStudents: true,
      showListItems: false,
      isActiveSearchStudent: !values.isActiveSearchStudent,
      isShowSearchStudent: true,
      showNavigationItemDiscipline: true,
      showNavigationItemGroup: true,
      showNavigationItemStudent: true,
      isActiveListItems: false,
    });
    searchStudents.length = 0;
  };
  const getNameGroup = (name) => {
    setValues({
      ...values,
      nameStudent: name,
      errorForm: false,
      isShowSearchStudent: true,
      showListStudents: true,
      showListItems: false,
      isActiveSearchStudent: !values.isActiveSearchStudent,
      isActiveListItems: false,
      showNavigationItemDiscipline: false,
      showNavigationItemGroup: false,
      showNavigationItemStudent: false,
      titleNameGroup: name,
    });
    searchGroups.length = 0;
  };
  return (
    <Box>
      <AppBar className={classes.globalStyle}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {values.login}
          </Typography>
          {values.typeUser === 'ADMIN' && (
            <Box ml={-4}>
              <Avatar src="photo.jpg" className={classes.avatar} />
            </Box>
          )}
          {values.typeUser === 'ADMIN' && <OpenMenu />}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={values.nameStudent}
              onChange={changeNameStudent}
              onKeyDown={itemSearch}
              onClick={() => {
                setValues({
                  ...values,
                  nameStudent: '',
                  nameGroup: '',
                });
              }}
            />
          </Search>
          {values.nameStudent.length !== 0 && searchStudents.length > 0 ? (
            <Paper className={classes.searchStudents}>
              <MenuList>
                {searchStudents.map((student) => {
                  const { surName, nameGroup } = student;
                  return (
                    <MenuItem key={student.id} onClick={() => getSurNameStudent(surName, nameGroup)}>
                      <ListItemText>{`${student.surName} ${student.nameGroup}`}</ListItemText>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Paper>
          ) : null}
          {values.nameStudent.length !== 0 && searchGroups.length > 0 ? (
            <Paper className={classes.searchStudents}>
              <MenuList>
                {searchGroups.map((group) => (
                  <MenuItem key={group.id} onClick={() => getNameGroup(group.name)}>
                    <ListItemText>{group.name}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Button
              disabled={values.showListStudents && listStudents[0]?.options ? false : true}
              onClick={showColumns}
              sx={{
                width: 'auto',
                height: '30px',
                color: '#fff',
                background: '#5689D3',
                '&:hover': {
                  background: 'grey',
                },
              }}
            >
              {values.isShowColumns ? <Visibility /> : <VisibilityOff />}
            </Button>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge
                color="error"
                sx={{
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <IconHome />
              </Badge>
            </IconButton>
            {values.typeUser === 'ADMIN' && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
          {values.typeUser === 'ADMIN' && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
