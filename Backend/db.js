const db= require('mongoose');

//mongodb+srv://dsanchez:Dsanchez56@diegokenwood-vmax7.mongodb.net/test?retryWrites=true&w=majority
db.Promise = global.Promise;

async function connect (url){
    await db.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        dbName:'chiperlive'
      })

    console.log('[db] Conectada con exito');
      
}

module.exports={
    connect
}
