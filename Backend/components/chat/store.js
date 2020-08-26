
const Model = require('./model');


 
function addData(data){
  const myData = new Model(data);
  myData.save();
}

 async function getData(filterData){
   
    return new Promise((resolve,reject)=>{
      let filter = {}; 
  if (filterData !== null){
      filter = {"users": filterData }
  }
    Model.find(filter)
    .populate('users')
    .exec((error,populated)=>{
      if (error){ 
      reject(error)
      return false;
    }else{
     resolve(populated);
    }
    })
      
     
    })
    
  }

 
module.exports= {
    add: addData,
    list: getData
    
    //get
    //update
    //delete
}