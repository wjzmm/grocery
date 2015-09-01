var request = require('request'),
	cheerio = require('cheerio'),
	iconv = require('iconv-lite'),
	async = require('async'),
	debug   = require('debug')('node-spider:update');

	debug('尝试读取招聘信息');

var url = "http://job.xidian.edu.cn/html/zpxx/jobs/";
exports.jobList = function(url, callback){
	//console.log("2");
	async.waterfall([
		function(callback){
			request({
			url: url,
			encoding: null},
			function(err, res, body){
			if (err) return console.log(err);
			console.log("xdtu");
			body = iconv.decode(body, 'gbk');
			var $ = cheerio.load(body);
				
			var jobList = [];
			$('.arcList ul li').each(function(){
				var $me = $(this);
				var $me = $(this);
				var item = {
					title: $me.find('a').text(),
					time:$me.find('.time').text().trim(),
					scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
					school: '西安电子科技大学'
				}
				var url = $me.find('a').attr('href').trim();
				if(url.indexOf('http://job.xidian.edu.cn') >= 0){
					item.url = url;
				}else{
					item.url = 'http://job.xidian.edu.cn' + url;
				}
				jobList.push(item);
			});
			callback(null, jobList);
		});
	},
	function(items, callback){
		async.mapSeries(items, function(item, callback) {
		   	setTimeout(function() {
			request({
			url: item.url,
			encoding: null},
			function(err, res, body){
				if (err) return console.log(err);
				body = iconv.decode(body, 'gbk');
				var $ = cheerio.load(body);
				item.arcContent = $('.arcContent').text();
			});
			callback(null, item);
			}, 500);
		}, function(err, result) {
		    callback(null, result);
		});
	}], function(err, result){
		//console.log(result);
		callback(null, result);
	})
	
};


	
