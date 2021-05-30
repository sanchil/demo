import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const FileInput = (props)=> {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
     
      <InputBase
        id={props.id}
        
        type={props.type}
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    
      <Divider className={classes.divider} orientation="vertical" />
      <InputLabel htmlFor={props.id} >
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <PublishIcon />
      </IconButton>
      </InputLabel>
    
    </Paper>
  );
}
