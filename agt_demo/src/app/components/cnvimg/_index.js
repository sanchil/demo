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
    overlayinfo: {
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgb(0, 0, 0)',
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#f1f1f1',
        transition: '.5s ease',
        opacity: 0,
        color: 'white',
        fontSize: 15,
        padding: 15,

        '&:hover': {
            opacity: 1.0,
        }
    },
    infobox: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: '1 1 auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '90%',
        maxWidth: '90%',
        height: '50%',
        borderRadius: 5,
        padding: 10,
        backgroundColor: amber[300],
        opacity: 0.8,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },

    infoboxheader: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '10%',
    },
    infoboxcontent: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '90%',
        maxWidth: '90%',
        height: '60%',

    },
    infoboxcontrol: {
        boxSizing: 'border-box',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        maxWidth: '90%',
        height: '25%',
        paddingLeft: '50%',

    },



}));

export const Cnv = (props) => {
    const classes = useCnvStyles(props);
    const { appstate, dispatch } = useContext(AppContext);


    const [dataUrl, setDataUrl] = useState(null);

    useEffect(() => {
        let abortController = new AbortController();

        clipImage(props.w, props.h, props.src,{signal:abortController.signal})
            .then(dataurl => setDataUrl(dataurl))
            .catch(err => console.log("Image load error: " + err.message));
    
        return ()=>{
            abortController.abort();
        }

    });


    //  const CNVSTDWIDTH = 400;
    //  const CNVSTDHEIGHT = 300;
    //  const CNVWIDEWIDTH = 800;
    //  const CNVWIDEHEIGHT = 300;


    /*   const cnv = document.createElement('canvas');  
  
       if (cnv !== null) {
  
          cnv.width = props.w;
          cnv.height = props.h;
  
          const CNVASPECT = cnv.width / cnv.height;
  
          const ctx = cnv.getContext('2d');
          const img = new Image();
          img.onload = () => {
  
  
              let sx = 0;
              let sy = 0;
              let dx = 0;
              let dy = 0;
              let iw = img.width;
              let ih = img.height;
              let cw = 0;
              let ch = 0;
              
            //  let cw = cnv.width;
           //   let ch = cnv.height;
  
              const IMGASPECT = iw / ih;
  
  
              if (IMGASPECT >= CNVASPECT) {
              //    console.log('Clipping sides : ' + IMGASPECT);
                  ch = cnv.height;
                  cw = IMGASPECT * ch;
                  dx = (cw-cnv.width)*0.5;
  
  
              } else {
                 // console.log('Clipping height : ' + IMGASPECT);
                  cw = cnv.width;
                  ch = cw / IMGASPECT;             
                  dy = (ch-cnv.height)*0.5;
  
              }
              //  ctx.scale(2.0,2.0);
              ctx.drawImage(img, sx, sy, iw, ih, -dx, -dy, cw, ch);
  
              setDataUrl(cnv.toDataURL('image/jpeg', 1.0));
          }
          img.src = props.src;
  
      }
   */


    /* if (cnv !== null) {
       // if (props.aspect === "43") {
       //     cnv.width = CNVSTDWIDTH;
       //     cnv.height = CNVSTDHEIGHT;
       // }
       // if (props.aspect === "52") {
       //     cnv.width = CNVWIDEWIDTH;
       //     cnv.height = CNVWIDEHEIGHT;
       // }

       cnv.width = props.w;
       cnv.height = props.h;

       const CNVASPECT = cnv.width / cnv.height;

       const ctx = cnv.getContext('2d');
       const img = new Image();
       img.onload = () => {
           const IMGASPECT = img.width / img.height;
           //    console.log('CNV WIDTH is : ' + cnv.width);
           //   console.log('CNV HEIGHT is : ' + cnv.height);
           //  console.log('CNV ASPECT is : ' + CNVASPECT);
           //     console.log('Img WIDTH is : ' + img.width);
           //     console.log('Img HEIGHT is : ' + img.height);
           //     console.log('IMG ASPECT is : ' + IMGASPECT);
           let sx = 0;
           let sy = 0;
           let dx = 0;
           let dy = 0;
           let iw = 0;
           let ih = 0;
           let cw = cnv.width;
           let ch = cnv.height;


           if (IMGASPECT >= CNVASPECT) {
               //    console.log('Clipping sides : ' + IMGASPECT);
               iw = CNVASPECT * img.height;
               ih = img.height;
               //  sx = -(img.width-iw)*0.5;


           } else {
               //      console.log('Clipping height : ' + IMGASPECT);

               ih = img.width / CNVASPECT;
               iw = img.width;
               //sy = -(img.height-ih)*0.5;

           }
           //  ctx.scale(2.0,2.0);
           ctx.drawImage(img, sx, sy, iw, ih, dx, dy, cw, ch);

           setDataUrl(cnv.toDataURL('image/jpeg', 1.0));
       }
       img.src = props.src;

   } */

    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true })
    }

    return (
        <div className={classes.rootcontainer} >
            <img src={dataUrl} className={classes.img} />
            {
                props.overlay ? (<div className={classes.overlayinfo}>
                    <Box className={classes.infobox}>

                        <div className={classes.infoboxheader}>
                            {props.desc}
                        </div>
                        <div className={classes.infoboxcontent}>
                            <p>   {props.desc} </p>
                            <p>  {props.addr} </p>
                        </div>


                        <div className={classes.infoboxheader}>
                            <span>3&nbsp;<HotelOutlinedIcon /></span>
                            <span>2&nbsp;<BathtubOutlinedIcon /></span>
                            <span>1&nbsp;<DriveEtaIcon/></span>

                        </div>
                        <div className={classes.infoboxcontrol}>
                            <Button size="small" onClick={handleOverLay}>View</Button>
                        </div>
                    </Box>
                </div>)
                    :
                    ""
            }
        </div>
    )

}
