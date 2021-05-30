import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {blue,cyan} from '@material-ui/core/colors';
import styled from 'styled-components';
import theme from '../../../theme';
import {
    TextField,
    InputLabel,
    FormControl,
    Select,
    NativeSelect,
    FormHelperText,
    Button,
    Input,
} from '@material-ui/core';


const useInpStyles = makeStyles(theme => ({
 
    txt: {

        [theme.breakpoints.up('xs')]: {
            margin: '1px  10px 1px',
            width: '80%',

        },
        [theme.breakpoints.up('sm')]: {
            margin: '1px  20px 1px',
            width: '40%',
        }

    },
  
    underline: {

        borderBottomColor: 'blue',

        /* '&:hover:not($disabled):before':{
            borderBottomColor: 'blue',
        },
        '&:hover:not($disabled):after':{
            borderBottomColor: 'blue',
        }, */

        '&:before': {
            borderBottomColor: 'blue',
        },
        '&:hover': {
            borderBottomColor: 'blue',

        },
        '&:after': {
            borderBottomColor: 'blue',

        },

    }

}));

export const Inp = React.forwardRef((props, ref) => {
    const classes = useInpStyles();

    const InputPropsObj = {
        disableUnderline: false,
        classes: { underline: classes.underline },       
    }

    const inputPropsObj = {
        id: `${props.id}`,
        type: `${props.type}`
    }

    return (
        <TextField
            inputRef={ref}
            //   id={props.id}
            //  type={props.type}

            className={classes.txt}
            margin="normal"
            InputProps={InputPropsObj}
            inputProps={inputPropsObj}
            label={props.label}
            placeholder={props.placeholder} fullWidth={props.fullWidth}
            style={{ width: `${props.width}` }}
            multiline={props.multiline}
            multiple={[props.multiple]}
            onChange={props.onChange}
        />
    );
});

const useSelStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    label: {
        width: '100%'
    }
}));

export const Sel = React.forwardRef((props, ref) => {
    const classes = useSelStyles();
    const [state, setState] = React.useState("");

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        //  setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState(event.target.value);
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel classes={{ root: classes.label }} htmlFor="age-native-simple">{props.label}</InputLabel>

                <NativeSelect

                    ref={ref}
                    //  value={state}
                    onChange={props.onChange}
                    //    inputProps={{
                    //        name: 'age',
                    //        id: 'age-native-helper',
                    //    }}
                    //autoWidth={true}
                    style={{ width: `${props.width}` }}                >
                    {props.children}


                </NativeSelect>
            </FormControl>

        </React.Fragment>
    );

});




const useSearchStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '90%',

        '& .MuiOutlinedInput-root': {
            //      '& fieldset': {
            //          borderColor: 'red',
            //      },
            '&:hover fieldset': {
                borderColor: 'orange',
            },
            //      '&.Mui-focused fieldset': {
            //          borderColor: 'green',
            //      },
        }

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '90%',


    },
    textColor: {
        color: 'blue'
    },

    outline: {
        borderRadius: '10px',
        border: '2px solid red',
        //  backgroundColor: 'rgb(255,255,255)',
        //  color:'green',
        '&:hover': {
            border: '5px solid red ',
        },
    },

}));

export const SearchField = (props) => {
    const classes = useSearchStyles();
    return (
        <React.Fragment>
            <TextField


                InputProps={{
                    className: classes.textColor,
                    classes: {
                        notchedOutline: classes.outline,
                    }
                }}

                className={classes.root}
                type="text"
                label="Search "
                variant="outlined"
                fullWidth />
        </React.Fragment>
    );
}


const useFileInpStyle = makeStyles(theme => ({

}));

export const FileInput = (props) => {
    const classes = useFileInpStyle();
    return (
        <FormControl>
            <InputLabel htmlFor="my-input"><Button>Upload</Button></InputLabel>
            <Input aria-describedby="my-helper-text" />
            <FormHelperText >We'll never share your email.</FormHelperText>
        </FormControl>
    );
}

export const Findfield = styled(TextField)`
label.focused {
    color: green;
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red;
        }
    &:hover fieldset {
      border-color: yellow;     
    }
    &.Mui-focused fieldset {
      border-color: green;
        }
  }

`









const useTextStyles = makeStyles(theme=>({
  root: {
    [theme.breakpoints.up('xs')]:{
      width:'95%',
      margin:5,
    },
    [theme.breakpoints.up('md')]:{
      width:props=>(props.width)||'65%',
      margin:10,
    },
    backgroundColor:'rgba(255,255,255,0.7)',
    backgroundclip: 'padding-box',

    '& label.Mui-focused': {
      color: 'purple',
    },

    //'& .MuiInput-underline:after': {
    //  borderBottomColor: 'black',
    //},
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: blue[100],
        borderWidth: 2,
        
     
      },
      '&:hover fieldset': {
        borderColor: blue[200],
        borderWidth: 2,        
        boxShadow:`0px 0px 5px ${blue[500]}`

      },
      '&.Mui-focused fieldset': {
        borderColor: blue[400],
        borderWidth:2,
       
      },
    },

  

  },
}));

export const TextF = React.forwardRef((props,ref) => {
  const classes = useTextStyles(props);
  return ( <TextField 
    inputRef={ref}
    type={props.type}
    className={classes.root} 
    label={props.label} 
    variant="outlined" 
    margin="dense"
    inputProps={{
        pattern:props.pattern
    }}
    InputProps={props.InputProps}
    onChange={props.onChange}
    required={props.required}/>);
});


export const StyledTextField = styled(TextField)`
  label.focused {
    color: green; 💚
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: red; 💔
    }
    &:hover fieldset {
      border-color: yellow; 💛
    }
    &.Mui-focused fieldset {
      border-color: green; 💚
    }
  }
`;





