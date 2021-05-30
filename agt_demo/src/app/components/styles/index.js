import { red, cyan, blue, lightBlue } from '@material-ui/core/colors';

export const rowstyle = theme => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    flex: '1 1 auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    margin: 'auto',
    //  border:'2px solid blue'

});
export const colstyle = theme => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'column wrap',
    flex: '1 1 auto',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    margin: 'auto',
    //    border:'2px solid blue'

});

export const headerpanel = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: '10px 5px 5px',

    },
    [theme.breakpoints.up('sm')]: {
        margin: '15px 10px 10px',
    },
    [theme.breakpoints.up('md')]: {
        margin: '70px 30px 10px',
    },
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 'auto',

    //border:'3px solid red',
});



export const header = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: 3,
        padding: '20px 20px 20px 30px'
    },
    [theme.breakpoints.up('sm')]: {
        margin: 5,
        padding: '10px 10px 10px 25px'
    },
    [theme.breakpoints.up('md')]: {
        margin: 10,
        padding: '20px 20px 20px 50px'
    },
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 'auto',
    width: '100%',
    maxWidth: '100%',
    height: 300,
    borderRadius: 15,

});

export const panel = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: '10px 5px 10px',
    },
    [theme.breakpoints.up('sm')]: {
        margin: '15px 10px 15px',
    },
    [theme.breakpoints.up('md')]: {
        margin: '20px 30px 10px',
    },
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 'auto',
    justifyContent: 'space-around',
    alignItems: 'center',
});

export const panel1 = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: 3,
        padding: '20px 20px 20px 30px'
    },
    [theme.breakpoints.up('sm')]: {
        margin: 5,
        padding: '10px 10px 10px 25px'
    },
    [theme.breakpoints.up('md')]: {
        margin: 10,
        padding: '20px 20px 20px 50px'
    },
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 'auto',
    width: '100%',
    maxWidth: '100%',
    height: 300,
    borderRadius: 15,

});

export const bannerpanel = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: '10px 5px 5px',

    },
    [theme.breakpoints.up('sm')]: {
        margin: '15px 10px 10px',
    },
    [theme.breakpoints.up('md')]: {
        margin: '70px 30px 10px',
    },
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 'auto',
});

export const banner = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: 3,
        padding: '5px 5px 5px 10px',
        height: 400,
    },
    [theme.breakpoints.up('sm')]: {
        margin: 5,
        padding: '10px 10px 10px 25px',
        height: 450,
    },
    [theme.breakpoints.up('md')]: {
        margin: 10,
        padding: '20px 20px 20px 50px',
        height: 800,
    },
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 'auto',
    width: '100%',
    maxWidth: '100%',
    borderRadius: 15,
});

export const centerpanel = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: '10px 5px 5px',
    },
    [theme.breakpoints.up('sm')]: {
        margin: '15px 10px 10px',
    },
    [theme.breakpoints.up('md')]: {
        margin: '50px 30px 10px',
    },
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 'auto'
});

export const center = theme => ({
    [theme.breakpoints.up('xs')]: {
        margin: 3,
        padding: '5px 5px 5px 10px',
        height: 300,
    },
    [theme.breakpoints.up('sm')]: {
        margin: 5,
        padding: '10px 10px 10px 20px',
        height: 350,
    },
    [theme.breakpoints.up('md')]: {
        margin: 10,
        padding: '20px 20px 20px 50px',
        height: 400,
    },
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    flex: 'auto',
    width: '100%',
    maxWidth: '100%',
    borderRadius: 15,
});

export const polaroid = theme => ({
    maxWidth: '30%',
    height: '40%',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
});



export const headerFontYellowtail = {
    fontFamily: 'Yellowtail',
    fontWeight: 600,
    color: red[800],
    margin: 0,
}

export const headerFontBaskerville = {
    fontFamily: 'Baskervville',
    fontWeight: 600,
    color: cyan[50],
    margin: 0,
}

