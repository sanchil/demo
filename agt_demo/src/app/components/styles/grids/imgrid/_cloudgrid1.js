import React, { useCallback, useEffect, createRef, useState, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Fab } from '@material-ui/core';
import theme from '../../../theme';
import * as astyles from '../../styles';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { ApptInfo } from '../../cnvimg/components';
import { getHomeImages } from '../../../data/db/queries';
import { CnvCloud } from '../../cnvimg/index';


const useStyles = makeStyles(theme => ({
    root: {

    },
    imgframe: {
        ...astyles.rowstyle(theme),

        flexFlow: 'row wrap',
        //   maxWidth: '100%',
        //  height: '100%',
        //   border: '3px solid blue',
        borderRadius: 15,
        // zIndex: 1

    },
    imgcontent: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            height: '50%',
            maxWidth: '100%',
            maxHeight: '50%',
        },
        [theme.breakpoints.up('md')]: {
            flex: '50%',
            width: '50%',
            maxWidth: '50%',
            height: '100%',
            maxHeight: '100%',
        },



        //    border: '1px solid black',



    },
    imgbox1: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {

            width: '100%',
            height: '20%',
        },
        [theme.breakpoints.up('md')]: {
            flex: '100%',
            maxWidth: '100%',
            height: '50%',
        },
        padding: 2,
        //  border: '1px solid green',
    },
    imgbox2: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            height: '20%',
        },
        [theme.breakpoints.up('md')]: {
            flex: '50%',
            maxWidth: '50%',
            height: '25%',

        },
        padding: 2,
        //  border: '1px solid pink',



    },
    imgbox3: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            height: '25%',
        },
        [theme.breakpoints.up('md')]: {
            flex: '100%',
            maxWidth: '100%',
            height: '25%',
        },
        padding: 2,
        //   border: '1px solid yellow',

    },
    imgbox4: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            height: '25%',
        },
        [theme.breakpoints.up('md')]: {
            flex: '50%',
            maxWidth: '50%',
            height: '25%',

        },
        padding: 2,
        //    border: '1px solid pink',
    },
    imgbox5: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            height: '25%',
            padding: 20,
        },
        [theme.breakpoints.up('md')]: {
            flex: '50%',
            maxWidth: '50%',
            height: '25%',
            padding: 30,
        },

        //    border: '1px solid pink',
    },
    img: {
        width: 'auto',
        height: '100%',
        objectFit: 'cover',
    },
    buyoverlay: {
        position: 'fixed',
        display: 'none',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1100,
    }









}));



export const ImgGridCloud = (props) => {


    //    const urlArray = props.srcArr;
    const homes = props.homesArr;
    const page = props.page || 8;
    let start = 0;
    const [urlArrayCloud, setUrlArrayCloud] = useState([]);
    console.log('URL Cloud Array: '+ urlArrayCloud);

    const handleImgGridNav = (val) => e => {
        if (val === 'home') {
            start = 0;
            //    console.log("Current home Page: " + start);
        }
        if (val === 'left') {
            start = (start <= (urlArrayCloud.length - 8)) ? (start + page) : start;
            //  console.log("Current Left Page: " + start);
        }
        if (val === 'right') {

            start = (start >= 8) ? start - page : start;
            //console.log("Current Right Page: " + start);
        }
    }

    /*   const infoArr = [
          {
              title: "home",
              name: "page1",
              briefdescr: "A beautiful home",
              price: "1000000",
              area: "5000",
              bedrooms: 10,
              bathrooms: 9,
              garages: 10,
              address: "3800 Washington St \
                        San Francisco, CA 94118",
              location: " A superb location in BC Vancouver ",
          },
  
      ]
   */


    /*  const getBlobUrlArr = (homes) => {
         //   console.log('AR: homes: '+JSON.stringify(homes));
         if (homes && homes.length !== 0) {
             return homes.map(home => {
                 if (home._attachments) {
                     //  const keys = Object.keys(home._attachments);
                     // console.log('AR: keys: '+JSON.stringify(keys));
                     // if (typeof keys !== 'undefined') {
                      //    const ar = keys.map(key=>blobUtil.createObjectURL(home._attachments[key].data));
                       //   console.log('AR is: '+JSON.stringify(ar));
                       //   return keys.map(key=>blobUtil.createObjectURL(home._attachments[key].data));;
                         
                      //} 
 
                     return blobUtil.createObjectURL(home._attachments['imgliving'].data);
 
                 } else {
                     return "";
                 }
             });
         } else {
             // return [[],[],[],[],[],[],[],[],[]];
             return [];
         }
     }
 
     let urlArray = useMemo(() => getBlobUrlArr(homes), [homes]);
  */



    //########################################################
    const getBlobUrlArrCloud = (homes) => {
        if (homes && homes.length !== 0) {
            Promise.all(homes.map(home => {
                if (home.cloudinary) {
                   //  console.log('Home retrieved is: ' + JSON.stringify(home._id));
                    return getHomeImages(home._id)
                        .then(res => {
                            return res;
                     //       console.log("RES:: " + JSON.stringify(res));
                            
                            if (res.resources) {
                                return res.resources.map(tag => {
                                    console.log('Public id: ' + tag.public_id);
                                    return tag.public_id;
                                })
                            }
                            

                        })
                } else {
                    return []
                }

            }))
                .then(res => {
                    setUrlArrayCloud(res);
                });
        }
    }
    useEffect(() => {
        getBlobUrlArrCloud(homes);
    }, [homes]);


    /*  let urlArrayCloud = useMemo(() => {
         //    getBlobUrlArrCloud(homes);
     }, [homes]);
  */

    // console.log('Home array: '+JSON.stringify(urlArrayCloud));  

    //###############################################################

    const getCloudinaryImgUrl = (arr) => {
        const regexp = /_imgliving/;

        return new Promise((resolve, reject) => {
            if (typeof arr !== 'undefined') {
                const url = arr.filter(url => regexp.test(url));
                if (typeof url !== 'undefined') {
                    resolve(url);
                } else {
                    resolve(arr[0]);
                }

            } else {
                reject(Error('No urls found is null'));
            }


        })
        // .then(url => JSON.stringify(url));

    }



    const classes = useStyles();
    return (
        <React.Fragment>


            <Box className={classes.imgframe}>

                <Box className={classes.imgcontent}>
                    <Box className={classes.imgbox1} style={{ borderTopLeftRadius: 15 }}>
                        <CnvCloud
                            w={800}
                            h={600}
                            overlay={true}
                          //  src={getCloudinaryImgUrl(urlArrayCloud[start])}
                            src={getCloudinaryImgUrl(urlArrayCloud[start])}
                            position={"topleft"}

                        >
                            <ApptInfo info={homes[start]} size="medium" />
                        </CnvCloud>

                    </Box>

                    <Box className={classes.imgbox2}>
                        <CnvCloud
                            w={400}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])} >
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>



                    </Box>
                    <Box className={classes.imgbox2}>
                        <CnvCloud
                            w={400}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])} >
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>


                    </Box>

                    <Box className={classes.imgbox2} style={{ borderBottomLeftRadius: 15 }}>
                        <CnvCloud
                            w={400}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])}
                            position={"bottomleft"} >
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>


                    </Box>
                    <Box className={classes.imgbox2}>
                        <CnvCloud
                            w={400}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])} >
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>



                    </Box>
                </Box>

                <Box className={classes.imgcontent}>

                    <Box className={classes.imgbox3} style={{ borderTopRightRadius: 15 }}>
                        <CnvCloud
                            w={800}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])}
                            position={"topright"}
                            gravity={'south'}>
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>

                    </Box>

                    <Box className={classes.imgbox4}>
                        <CnvCloud
                            w={400}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])} >
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>


                    </Box>
                    <Box className={classes.imgbox4}>
                        <CnvCloud
                            w={400}
                            h={300}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])} >
                            <ApptInfo info={homes[start]} size="large" />
                        </CnvCloud>


                    </Box>
                    <Box className={classes.imgbox1} style={{ borderBottomRightRadius: 15 }}>

                        <CnvCloud
                            w={800}
                            h={600}
                            overlay={true}
                            src={getCloudinaryImgUrl(urlArrayCloud[++start])}
                            position={"bottomright"} >
                            <ApptInfo info={homes[start]} size="medium" />
                        </CnvCloud>
                    </Box>

                </Box>
                <Box className={classes.imgcontent}>
                    <Box className={classes.imgbox5}>
                        <Fab color="primary" aria-label="left" onClick={handleImgGridNav('left')} > <ArrowLeftIcon fontSize="large" /> </Fab>
                        <Fab color="primary" aria-label="homeimg" onClick={handleImgGridNav('home')} > <AutorenewIcon fontSize="large" /> </Fab>
                        <Fab color="primary" aria-label="right" onClick={handleImgGridNav('right')} ><ArrowRightIcon fontSize="large" /></Fab>
                    </Box>
                </Box>

            </Box>

        </React.Fragment>
    );
}

