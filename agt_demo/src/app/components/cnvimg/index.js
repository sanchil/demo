import React, { useContext, useState, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import theme from '../../theme';
import { AppContext } from '../../state/appcntxt';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import RestaurantMenuOutlinedIcon from '@material-ui/icons/RestaurantMenuOutlined';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { clipImage } from '../../lib/utils';
import { ImgCloud } from './components';



const useCnvStyles = makeStyles(theme => ({

    rootcontainer: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        //  cursor:'pointer',
        //  padding:20,
    },
    img: {
        [theme.breakpoints.up('xs')]: {
            borderTopRightRadius: props => (
                props.position === "topleft"
                || props.position === "all") ? 15 : 0,
            borderTopLeftRadius: props => (
                props.position === "topleft"
                || props.position === "all") ? 15 : 0,
            borderBottomRightRadius: props => (
                props.position === "bottomright"
                || props.position === "all") ? 15 : 0,
            borderBottomLeftRadius: props => (
                props.position === "bottomright"
                || props.position === "all") ? 15 : 0,

        },
        [theme.breakpoints.up('md')]: {
            borderTopRightRadius: props => (
                props.position === "topright"
                || props.position === "top"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderTopLeftRadius: props => (
                props.position === "topleft"
                || props.position === "top"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderBottomRightRadius: props => (
                props.position === "bottomright"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderBottomLeftRadius: props => (
                props.position === "bottomleft"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,

        },
        position: 'relative',
        boxSizing: 'border-box',//
        width: '100%',
        height: '100%',
        objectFit: 'cover',

    },


}));

export const Cnv = (props) => {
    const classes = useCnvStyles(props);
    const { appstate, dispatch } = useContext(AppContext);


    const [dataUrl, setDataUrl] = useState(null);

    useEffect(() => {
        let abortController = new AbortController();

        clipImage(props.w, props.h, props.src, { signal: abortController.signal })
            .then(dataurl => setDataUrl(dataurl))
            .catch(err => console.log("Image load error: " + err.message));

        return () => {
            abortController.abort();
        }

    });


    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true })
    }

    return (
        <div className={classes.rootcontainer} >
            <img src={dataUrl} className={classes.img} />

            {
                props.overlay ? (
                    props.children
                )
                    :
                    ""
            }
        </div>
    )

}


const useCnvCloudStyles = makeStyles(theme => ({

    rootcontainer: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        //  cursor:'pointer',
        //  padding:20,
    },
    img: {
        [theme.breakpoints.up('xs')]: {
            borderTopRightRadius: props => (
                props.position === "topleft"
                || props.position === "all") ? 15 : 0,
            borderTopLeftRadius: props => (
                props.position === "topleft"
                || props.position === "all") ? 15 : 0,
            borderBottomRightRadius: props => (
                props.position === "bottomright"
                || props.position === "all") ? 15 : 0,
            borderBottomLeftRadius: props => (
                props.position === "bottomright"
                || props.position === "all") ? 15 : 0,

        },
        [theme.breakpoints.up('md')]: {
            borderTopRightRadius: props => (
                props.position === "topright"
                || props.position === "top"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderTopLeftRadius: props => (
                props.position === "topleft"
                || props.position === "top"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderBottomRightRadius: props => (
                props.position === "bottomright"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,
            borderBottomLeftRadius: props => (
                props.position === "bottomleft"
                || props.position === "topbottom"
                || props.position === "all") ? 15 : 0,

        },
        position: 'relative',
        boxSizing: 'border-box',//
        width: '100%',
        height: '100%',
        objectFit: 'cover',

    },


}));



export const CnvCloud = (props) => {
    const classes = useCnvCloudStyles(props);
    const { appstate, dispatch } = useContext(AppContext);
    const [cloudUrl, setCloudUrl] = useState('');
    const homeImagesUrl = props.src;
    //   console.log('Home images url: '+  homeImagesUrl);
    //     console.log('Cloud URL ::: '+typeof cloudUrl + '::'+ JSON.stnrigify(cloudUrl));

    useEffect(() => {
        /*
         if (homeImagesUrl.constructor.name === 'Promise') {
            homeImagesUrl
                .then(url => {
                   // console.log('Then url: ' + url);
                    setCloudUrl(url + '');
                }).
                catch(err => {
                    console.log('Error found: ' + err.message);
                    //  setCloudUrl('');
                })
        }else{
         console.log('Then string url: ' + homeImagesUrl);
            setCloudUrl(homeImagesUrl);
        } */

        setCloudUrl(homeImagesUrl);


    }, [homeImagesUrl]);


    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true })
    }

    return (
        <div className={classes.rootcontainer} >
            {/* <img src={dataUrl} className={classes.img} /> */}
            <ImgCloud gravity={props.gravity} src={cloudUrl} w={props.w} h={props.h} className={classes.img} />
            {
                props.overlay ? (
                    props.children
                )
                    :
                    ""
            }
        </div>
    )

}



export const _CnvCloud = (props) => {
    const classes = useCnvCloudStyles(props);
    const { appstate, dispatch } = useContext(AppContext);
    const [cloudUrl, setCloudUrl] = useState('');
    const homeImagesUrl = props.src;
    //  console.log('Home images url: '+  homeImagesUrl);
    //    console.log('Cloud URL ::: '+typeof cloudUrl + '::'+ JSON.stringify(cloudUrl));

    useEffect(() => {
        homeImagesUrl
            .then(url => {
                // console.log('Then url: '+url);
                setCloudUrl(url + '');
            }).
            catch(err => {
                console.log('Error found: ' + err.message);
                //  setCloudUrl('');
            })

    }, [homeImagesUrl]);


    /*    const [dataUrl, setDataUrl] = useState(null);
   
       useEffect(() => {
           let abortController = new AbortController();
   
           clipImage(props.w, props.h, props.src,{signal:abortController.signal})
               .then(dataurl => setDataUrl(dataurl))
               .catch(err => console.log("Image load error: " + err.message));
       
           return ()=>{
               abortController.abort();
           }
   
       });
    */

    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true })
    }

    return (
        <div className={classes.rootcontainer} >
            {/* <img src={dataUrl} className={classes.img} /> */}
            <ImgCloud src={cloudUrl} className={classes.img} />
            {
                props.overlay ? (
                    props.children
                )
                    :
                    ""
            }
        </div>
    )

}
