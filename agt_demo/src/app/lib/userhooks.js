import React, { userContext, useContext, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import verge from 'verge';
import { AppContext } from '../state/appcntxt';

export const useMediaProp = (inp) => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up(inp));
}

export const useScreen = () => {
    return {
        width: verge.viewport().width,
        height: verge.viewport().height
    }
}

export const useElemDim = (elem) => {
    return {
        clientWidth: elem.clientWidth,
        clientHeight: elem.clientHeight,
        scrollWidth: elem.scrollWidth,
        scrollHeight: elem.scrollHeight,

    }
}

export const useIntersection = (root, target, threshold, handleIntersect) => {
    let options = {
        root: root,
        rootMargin: '0px',
        threshold: threshold || 1.0,
    }
    //  let prevRatio = 0;

    /* const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let elem = entry.target;
                    console.log("Current intersecting ratio: "+entry.intersectionRatio)
                if (entry.intersectionRatio >= 0.75) {
                    console.log("Current intersecting ratio greater than 0.75");
                }
            }
        });
    } */

    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(target);
}

export const useAppContext = () => useContext(AppContext);

export const useScript = (url, scriptpos, async) => {
    useEffect(() => {
        const placement = document.querySelector(scriptpos);
        const script = document.createElement('script');

        script.src = url;
        script.async = typeof async === 'undefined' ? true : async;

        placement.appendChild(script);

        return () => {
            placement.removeChild(script)
        }

    }, [url]);

}