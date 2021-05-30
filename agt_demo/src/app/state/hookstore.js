import React, { useReducer } from 'react';

export const initstate = {
    bodyload: false,
    modal: false,
    auth0:{

    },
    user: {
        login: false,   
        sessid:null,
        sessdata:{},
        source:'',   
        uid: {},
    },
    calc: {
        caltype: "i",
        costofhouse: 0,
        emi: 0,
        annualincome: 0,
        mortgagerate: 0,
        loanterm: 0,
        landtransfertax: 0,
        affordability: 0,
        cmhcpremium: 0,
        results: 0,
        othercosts: 0,
        totalcosts: 0,
    },
    alert: {
        open: false,
        mesg: "",
    },
    overlay: {
        open: false,
    },
    overlaycontent: {
        home: {
            title: "",
            name: "",
            descr: "",
            addr: "",
            bath: "",
            garage: "",
            bedroom: "",
            amenities: ""
        },

    },
    viewprofile:{
        view:''
    }

}


export const useContextStore = (inp) => {



    const [appstate, dispatch] = useReducer((appstate, action) => {
        const newstate = Object.assign({}, appstate);
        //    console.log('old app state is ' + JSON.stringify(newstate))
        switch (action.type) {
            case 'BODYLOAD':
                {
                    return { ...newstate, bodyload: action.data };
                }
            case 'OPEN':
                {
                    const ok = { ...newstate, modal: action.data };
                    console.log('new app state is ' + JSON.stringify(ok))

                    return ok;
                }

            case "LTR": {
                return { ...newstate, calc: Object.assign({}, appstate.calc, { caltype: "ltr" }) };
            }

            case "MAC": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { caltype: "mac" }) });
                //return Object.assign({}, appstate, { calc: "mac" });
            }

            case "ML": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { caltype: "ml" }) });
                //return Object.assign({}, appstate, { calc: "ml" });
            }

            case "CMHC": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { caltype: "cmhc" }) });
                // return Object.assign({}, appstate, { calc: "cmhc" });
            }

            case "CALLTR": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { landtransfertax: action.data }) });
                // return Object.assign({}, appstate, { calc: "cmhc" });
            }

            case "CALEMI": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { emi: action.data }) });
                // return Object.assign({}, appstate, { calc: "cmhc" });
            }

            case "CALAFF": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { affordability: action.data }) });
                // return Object.assign({}, appstate, { calc: "cmhc" });
            }

            case "CALCMHC": {
                return Object.assign({}, appstate, { calc: Object.assign({}, appstate.calc, { cmhcpremium: action.data }) });
                // return Object.assign({}, appstate, { calc: "cmhc" });
            }

            case 'ALERT': {
                // console.log("Contact Dispatch received. Old state is: "+ JSON.stringify(appstate));

                return { ...newstate, alert: Object.assign({}, { open: action.open, mesg: action.data }) };
            }

            case 'OVERLAY': {
                // console.log("Contact Dispatch received. Old state is: "+ JSON.stringify(appstate));

                return { ...newstate, overlay: Object.assign({}, { open: action.data }) };
            }
            case 'OVERLAYCONTENTHOME': {
                // console.log("Contact Dispatch received.: "+ JSON.stringify(action.data));
                return { ...newstate, overlaycontent: Object.assign({}, { home:{...action.data}}) };
            }

            case 'LOGIN': {
                // console.log("Contact Dispatch received. Old state is: "+ JSON.stringify(appstate));

                return { ...newstate, user: Object.assign({}, { login: action.login, sessid:action.sessid, source:action.source ,sessdata:{...action.sessdata},uid: Object.assign({}, { ...action.data }) }) };
            }

            case 'AUTH0': {
                // console.log("Contact Dispatch received. Old state is: "+ JSON.stringify(appstate));

                return { ...newstate, auth0: action.data};
            }

            case 'VIEWPROFILE': {
                // console.log("Contact Dispatch received. Old state is: "+ JSON.stringify(appstate));

                return { ...newstate, viewprofile: Object.assign({},{view:action.data})};
            }



            default:
                return appstate;
        }
    }, inp);

    return { appstate, dispatch }

}
