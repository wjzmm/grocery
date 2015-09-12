var request = require('request'),
	cheerio = require('cheerio'),
	iconv = require('iconv-lite'),
	debug   = require('debug')('node-spider:update');

	debug('尝试读取招聘信息');
// exports.jobFairList = function(url, callback){
// 	request({
// 		url: 'http://job.xidian.edu.cn/index.html',
// 		encoding: null},
// 		function(err, res, body){
// 		if (err) return console.log(err);
// 		console.log("xdtu");
// 		body = iconv.decode(body, 'gbk');
// 		var $ = cheerio.load(body);

// 		var jobFairList = [];
// 		$('.imiddleb #con_two_1 ul li').each(function(){
// 			var $me = $(this);
// 			console.log($me.find('.time').text() + '\n' + $me.find('a').text());
// 			var item = {
// 				title: $me.find('label').attr('title'),
// 				adress: $me.find('.jobaddress').text().trim(),
// 				time: '2015-' + $me.find('.in_2_1').text().trim() + ':00',
// 				deadline: '2015-' + $me.find('.in_2_4_t').text().trim() + ':00',
// 				status: $me.find('font').text().trim(),
// 				url: '#',//由于url不存在暂同#代替
// 				scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
// 				school: '西安交通大学'
// 			}
// 			jobFairList.push(item);
// 		});
// 		callback(null, jobFairList);
// 	});
// };

// exports.internFairList = function(url, callback){
// 	request(url, function(err, res){
// 		if (err) return console.log(err);

// 		var $ = cheerio.load(res.body.toString());

// 		var internFairList = [];
// 		$('.xcjob1 #rgbcn_c2 ul li').each(function(){
// 			var $me = $(this);
// 			var item = {
// 				title: $me.find('a').attr('title'),
// 				adress: $me.find('.jobaddress').text().trim(),
// 				time: '2015-' + $me.find('.in_2_1').text().trim() + ':00',
// 				deadline: '2015-' + $me.find('.in_2_4_t').text().trim() + ':00',
// 				status: $me.find('font').text().trim(),
// 				scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
// 				school: '西安交通大学'
// 			}
// 			var url = $me.find('a').attr('href').trim();
// 			if(url.indexOf('http://job.xjtu.edu.cn') >= 0){
// 				item.url = url;
// 			}else{
// 				item.url = 'http://job.xjtu.edu.cn' + url;
// 			}
// 			internFairList.push(item);
// 		});
// 		callback(null, internFairList);
// 	});
// };


/*
*读取西电招聘信息
*url：web连接， callback： 回调 
*/
exports.jobList = function(url, callback){
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
			//console.log($me.find('.time').text() + '\n' + $me.find('a').text());
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
			//console.log(item);
		});
		callback(null, jobList);
	});
};


	
