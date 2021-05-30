import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },
}));

export const AmazonIcon = (props) => {
    return (
        <SvgIcon {...props}>

            {/*  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="32.000000pt" height="32.000000pt" viewBox="0 0 32.000000 32.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.14, written by Peter Selinger 2001-2017
</metadata> */}
            <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path fill="#000000" stroke="none" d="M133 249 c-13 -5 -23 -15 -23 -24 0
-17 25 -21 35 -5 7 12 25 4 25 -11 0 -5 -8 -9 -18 -9 -24 0 -55 -34 -50 -56 4
-24 32 -39 54 -29 11 4 28 8 39 9 18 1 20 7 17 56 -5 72 -25 90 -79 69z"/>
                <path fill="#fde094" stroke="none" d="M170 160 c0 -11 -4 -20 -9 -20 -14 0
-23 18 -16 30 10 17 25 11 25 -10z"/>
                <path fill="#000000" stroke="none" d="M230 110 c0 -6 -5 -8 -12 -4 -7 4 -8 3
-4 -4 4 -8 -1 -12 -13 -13 -12 -1 -31 -2 -43 -3 -13 -1 -35 4 -50 11 -16 7
-28 9 -28 4 0 -19 73 -39 105 -29 16 5 35 10 42 11 16 1 25 25 13 32 -6 4 -10
1 -10 -5z"/>
            </g>
            {/* </svg> */}
        </SvgIcon>
    );
}

export const GoogleIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <title>btn_google_light_normal_ios</title>
            <desc>Created with Sketch.</desc>
            <defs>
                <filter x="-100%" y="-100%" width="100%" height="100%" filterUnits="objectBoundingBox" id="filter-1">
                    <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="0.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix>
                    <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter2"></feOffset>
                    <feGaussianBlur stdDeviation="0.5" in="shadowOffsetOuter2" result="shadowBlurOuter2"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0" in="shadowBlurOuter2" type="matrix" result="shadowMatrixOuter2"></feColorMatrix>
                    <feMerge>
                        <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                        <feMergeNode in="shadowMatrixOuter2"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
                <rect id="path-2" x="0" y="0" width="24" height="24" rx="1"></rect>
            </defs>
            <g id="Google-Button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketchType="MSPage">
            <g id="9-PATCH" sketchType="MSArtboardGroup" transform="translate(-608.000000, -160.000000)"></g>
        <g id="btn_google_light_normal" sketchType="MSArtboardGroup" transform="translate(-1.000000, -1.000000)">
            <g id="button" sketchType="MSLayerGroup" transform="translate(4.000000, 4.000000)" filter="url(#filter-1)">
                    <g id="button-bg">
                <use fill="#FFFFFF" fill-rule="evenodd" sketchType="MSShapeGroup" xlinkHref="#path-2"></use>
            <use fill="none" xlinkHref="#path-2"></use>
        <use fill="none" xlinkHref="#path-2"></use>
        <use fill="none" xlinkHref="#path-2"></use>
                    </g >
                </g >
    <g id="logo_googleg_48dp" sketchType="MSLayerGroup" transform="translate(15.000000, 15.000000)">
        <path d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z" id="Shape" fill="#4285F4" sketchType="MSShapeGroup"></path>
    <path d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z" id="Shape" fill="#34A853" sketchType="MSShapeGroup"></path>
    <path d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z" id="Shape" fill="#FBBC05" sketchType="MSShapeGroup"></path>
    <path d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z" id="Shape" fill="#EA4335" sketchType="MSShapeGroup"></path>
    <path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape" sketchType="MSShapeGroup"></path>
                </g >
    <g id="handles_square" sketchType="MSLayerGroup"></g>
            </g >
        </g >
        </SvgIcon >
    )
}