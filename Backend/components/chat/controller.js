const store = require('./store');


function addData(p_data){
     return new Promise((resolve,reject)=>{ 
        
     if (!p_data|| !Array.isArray(p_data)){
         console.error('[Chat controller] no hay usuario o mensaje');
          reject('Datos Incorrectos');
          return false;
     }   
     const fullData={
         "users":p_data
    };
    
    console.log(fullData)
    store.add(fullData);
    resolve(fullData);
})
}

function getData(filterData){
    return new Promise((resolve,reject)=>{
       resolve(store.list(filterData));
    })
}

 

module.exports ={
    addData,
     getData
}