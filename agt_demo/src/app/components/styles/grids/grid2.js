import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';




const useGrid2Styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  

}));

const Grid2 = (props) => {
  const classes = useGrid2Styles();
  const pageObjArr = React.Children.toArray(props.children);
  return (
    <React.Fragment>
    
      <Grid item xs={12}>

        {pageObjArr ? pageObjArr[0] : ""}

      </Grid>
      <Grid item xs={12}>

        {pageObjArr ? pageObjArr[1] : ""}

      </Grid>
      <Grid item xs={12} sm={6}>

        {pageObjArr ? pageObjArr[2] : ""}


      </Grid>
      <Grid item xs={12} sm={6}>

        {pageObjArr ? pageObjArr[3] : ""}

      </Grid>
      <Grid item xs={12} sm={4}>

        {pageObjArr ? pageObjArr[4] : ""}

      </Grid>
      <Grid item xs={12} sm={4}>

        {pageObjArr ? pageObjArr[5] : ""}

      </Grid>
      <Grid item xs={12} sm={4}>

        {pageObjArr ? pageObjArr[6] : ""}

      </Grid>

    </React.Fragment>

  );
}

export default Grid2;