var read = require('../web/read'),
	config = require('../config');

read.test(function(err, list){
	list.forEach(function(item){
		console.log(item.time);
	});
	
})