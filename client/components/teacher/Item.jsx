// @ts-nocheck
import React, { useContext, useEffect, useRef, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import CreateIcon from '@mui/icons-material/Create';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ApplictationContext } from '../../App';
import endpoints from '../constants/Endpoints';
import { useDispatch } from 'react-redux';
import { updateItemFetchData } from '../../store/items/action_edit';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { showNavigation } from './MapperStudents';

const styles = {
  listItem: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: '10',
  },
  iconEdit: { marginLeft: '20px', cursor: 'pointer', zIndex: 1000 },
  listItemText: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '50px',
  },
  editBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
const Item = (props) => {
  const refInput = useRef('');
  const dispatch = useDispatch();
  const [showInputEditItem, setShowInputEditItem] = useState(false);
  const { values, setValues } = useContext(ApplictationContext);
  const { item, getListIdItems, suffixDisciplineURL, suffixGroupURL } = props;
  const editNameItem = (event) => {
    !values.getGroups
      ? setValues({
          ...values,
          nameDiscipline: event.target.value,
        })
      : setValues({
          ...values,
          nameGroup: event.target.value,
        });
  };
  const editItem = () => {
    setShowInputEditItem(!showInputEditItem);
  };
  const nameEditItem = (event) => {
    if (event.key === 'Enter') {
      const data = {
        url: !values.getGroups ? endpoints.updateDiscipline : endpoints.updateGroup,
        values,
        setValues,
        id: item.id,
        setShowInputEditItem,
      };
      dispatch(updateItemFetchData(data));
    }
  };
  useEffect(() => {
    showInputEditItem && refInput.current.focus();
  }, [showInputEditItem]);
  const editSwitchMoodle = (event) => {
    const data = {
      url: endpoints.updateGroup,
      values,
      setValues,
      id: item.id,
      moodle: event.target.checked,
      setShowInputEditItem,
    };
    dispatch(updateItemFetchData(data));
  };
  return (
    <Box sx={styles.listItem}>
      <Checkbox value={item.id} onChange={getListIdItems} />
      <IconButton style={styles.iconEdit} onClick={editItem}>
        <CreateIcon />
      </IconButton>
      <ListItem
        style={styles.listItemText}
        onClick={() => {
          showNavigation(values, setValues, suffixDisciplineURL, suffixGroupURL, item.name, item.id, item.disciplineId);
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} />
      </ListItem>
      <ListItem style={styles.listItemText}>
        {showInputEditItem && (
          <Box sx={styles.editBlock}>
            <input
              ref={refInput}
              value={!values.getGroups ? values.nameDiscipline : values.nameGroup}
              onChange={editNameItem}
              onKeyDown={nameEditItem}
            />
            <Box ml={2}>
              <FormControlLabel control={<Switch checked={item.moodle} onChange={editSwitchMoodle} />} label="Moodle" />
            </Box>
          </Box>
        )}
      </ListItem>
    </Box>
  );
};
export default Item;
