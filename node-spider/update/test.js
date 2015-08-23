// function timeFormatter(value) {

//     var da = new Date(parseInt(value.replace("/Date(", "").replace(")/" , "").split( "+")[0]));

//     return da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();

// }
// console.log(new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '));

var read = require('../web/read.js');

read.readCount(function(result){
	console.log(result);
})