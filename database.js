const mongoose = require('mongoose');

const URI = "mongodb+srv://acamica:acamica1@clusteracamica-pj7io.mongodb.net/delilahResto?retryWrites=true&w=majority";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Conectado exitosamente a la Base de datos');
});