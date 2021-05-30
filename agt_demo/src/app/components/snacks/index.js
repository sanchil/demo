import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';



function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const Alert = (props) => {

  const transition = GrowTransition;

  return (


    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={transition}
      message={props.children}
    >

    </Snackbar>




  );
}





export default Alert;
