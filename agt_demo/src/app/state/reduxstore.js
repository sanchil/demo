const initstate = {
    carview:false
};
export const reduxstore = (state=initstate,action)=>{
    const newstate = Object.assign({},state); 
   // console.log("Old state is: "+ JSON.stringify(newstate));
    switch(action.type){
        case 'CARVIEW':{
            const n = {...newstate,carview:action.data}
            //console.log("New state is: "+ JSON.stringify(n));
            return n;
        }
        default: return state;
    }
    

}

