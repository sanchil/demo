/**
 * This page layout is guided by HomeGrid.
 * Home Grid will accept and style 8 boxes
 * 
 * 
 * 
 * BannerBox 
 * CenterPanelBox, 
 * Box Box
 * Box Box Box
 * CenterPanelBox
 * 
 * 
 */

 import React, { useEffect } from 'react';
 import { useLocation, useHistory } from 'react-router-dom';
 import { makeStyles } from '@material-ui/core/styles';
 import { Box, Paper, Typography, Button } from '@material-ui/core';
 import { useMediaProp, useAppContext } from '../../lib/userhooks';
 
 /**
  * App level imports
  */
 import * as astyles from '../../components/styles';
 import { TypoHdMerriweather } from '../../components/styles/styledcomponents';
 import HomeGrid from '../../components/styles/grids/homegrid';
 import { Banner } from '../../components/banner';
 import { CenterPanel } from '../../components/centerpanel';
 import { authenticatePage } from '../../lib/utils';
 import InfoBox1 from '../../components/infobox/panelbox1';
 import InfoBox2 from '../../components/infobox/panelbox2';
 
 
 
 
 
 
 const useStyles = makeStyles(theme => ({
   root: {
 
   },
   bannerpanel: {
     boxSizing: 'border-box',
     flexGrow: 1,
 
   },
   centerpanel: {
     boxSizing: 'border-box',
     display: 'flex',
     flex: 'auto',
   },
 
   bannerimg: {
     width: '100%',
     height: 'auto',
 
   }
 
 }));
 
 const Page2 = (props) => {
 
   const classes = useStyles();
   const history = useHistory();
   const { appstate, dispatch } = useAppContext();
   const location = useLocation();
 
 
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [location.pathname]);
 
 
   useEffect(() => {
     const params = {}
 
     params['location'] = location;
 
     //agtSessData is a global variable
 
     params['agtSessData'] = agtSessData;
 
     authenticatePage(params);
 
   }, [location.pathname]);
 
 
   return (
     <HomeGrid>
       <Box className={classes.bannerpanel}>
         <Banner link1="page4" link2="page5" button1="Buy" button2="Sell">
           <span>Page 02</span>
         </Banner>
       </Box>
 
       <Box className={classes.centerpanel}>
         <CenterPanel >
           {useMediaProp('md')
             ?
             <>
               <InfoBox1 link="page6" button="Page 6">
                 <span> Sub Header</span>
                 <span>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                   sed do eiusmod tempor incididunt ut labore et dolore magna
                   aliqua.
                 </span>
               </InfoBox1>
 
               <InfoBox1 link="page7" button="Page 7">
                 <span> Sub Header</span>
                 <span>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                   sed do eiusmod tempor incididunt ut labore et dolore magna
                   aliqua.
                 </span>
               </InfoBox1>
 
               <InfoBox1 link="page8" button="Page 8">
                 <span> Sub Header</span>
                 <span>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                   sed do eiusmod tempor incididunt ut labore et dolore magna
                   aliqua.
                 </span>
               </InfoBox1>
             </>
             :
 
             <></>
 
           }
 
 
         </CenterPanel>
 
       </Box>
 
 
 
       <InfoBox2>
         One Info box
       </InfoBox2>
       <InfoBox2>
         Two
       </InfoBox2>
       <InfoBox2>
         Three
       </InfoBox2>
       <InfoBox2>
         Four
       </InfoBox2>
       <InfoBox2>
         Five
       </InfoBox2>
 
       <Box className={classes.centerpanel} overflow="hidden">
         <CenterPanel>
           <img className={classes.bannerimg} src='./img/stock/pexels-pixabay-247431.jpg' />
 
         </CenterPanel>
       </Box>
 
     </HomeGrid>
   );
 
 }
 
 export default Page2;
 
 