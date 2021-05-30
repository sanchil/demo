export const userObj = {
    type:'',    
    fname:'',
    lname:'',
    phone:'',
    email:'', 
    socialid:'',   
    social:{ 
        id:'',           
        source:'',
        name:'',
        socialemail:'',
        idtoken:'',
        accesstoken:'',
        refreshtoken:'',
        tokenexpirydate:'',
        token:'',
        user:''
    },
    addr:{
        unitno:'',
        stno:'',
        stname:'',
        city:'',
        zip:'',
        province:'',
        country:'',
    },
    pwd:'',
    pwd1:'',
    dataorigin:'',
    dataflow:'',
    subtype:'',    
    status:'active', // newregister, active, inactive
    current:false, //true or false
    date:'',  //lib/utils/getFormattedDate(dt, '/'),
    time:'',  //lib/utils/getFormattedTime(dt, ':'),
    createDate:'',
    createTime:''
}




export default {
userObj,
}