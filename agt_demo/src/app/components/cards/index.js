import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as astyles from '../../components/styles';
import { amber } from '@material-ui/core/colors';
import {Cnv} from '../cnvimg';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: 20,
    },
    media: {
        width: 280,
        height: 120,
    },
});

export const SimpleCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/savemax/buy_list.1.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Homes
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        homes are good
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
    );
}

const usePolaroidStyles = makeStyles(theme => ({
    polaroid: {
        ...astyles.polaroid(theme),
        margin: 0,
        width:'100%',
        height:'100%',
    },
    text: {
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        margin: 15,
    }
}));

export const PolaroidCard = (props) => {
    const classes = usePolaroidStyles();
    return (
        <div className={classes.polaroid}>
            <img src={props.src} style={{ maxWidth: '100%', height: 'auto' }} /> 
           {/*  <Cnv src={props.src} w={props.w} h={props.h} overlay={false}/> */}
            <div className={classes.text}>
                {props.children}
            </div>
        </div>
    );
}


const useInfoCardStyle = makeStyles(theme => ({
    infocontainer: {
        ...astyles.colstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '90%',
            maxWidth: '90%',
            height: '90%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
            maxWidth: '50%',
            height: '90%',
        },

        borderRadius: 3,
        backgroundColor: amber[300],
        margin: 0,
        padding: 10,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    infobox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 1 auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '50%',
        maxWidth: '50%',
        height: '100%',
        border: '1px solid pink',
        borderRadius: 5,
        padding: 10,
    },
    infoboxmaincontent: {
        boxSizing: 'border-box',
        width: '100%',
        height: '45%',
        padding: 10,
        margin: 2,

    },
    infoboxcontent: {
        boxSizing: 'border-box',
        width: '100%',
        height: '10%',
        padding: 5,
        margin: 2,
    },
}));

export const InfoCard = (props) => {
    const classes = useInfoCardStyle();
    const objArray = React.Children.toArray(props.children);
    return (
        <div className={classes.infocontainer}>
            <div className={classes.infoboxmaincontent}>
                {objArray ? objArray[0] : ""}
            </div>
            <div className={classes.infoboxcontent}>
                {objArray ? objArray[1] : ""}
            </div>
            <div className={classes.infoboxcontent}>
                {objArray ? objArray[2] : ""}
            </div>
            <div className={classes.infoboxcontent}>
                {objArray ? objArray[3] : ""}
            </div>
            <div className={classes.infoboxcontent}>
                {objArray ? objArray[4] : ""}
            </div>
        </div>
    );
}


