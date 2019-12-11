var mongoose = require('mongoose');

//We will only read from applications so we don't need a schema

var appSchema = new mongoose.Schema({
}, { collection: 'Applications' });


var App = mongoose.model('Application', appSchema);

module.exports = App;
