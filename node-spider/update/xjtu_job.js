var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	debug   = require('debug')('node-spider:update');

	debug('尝试读取招聘信息');
/*
*读取西交招聘会信息
*url：web连接， callback： 回调 
*/
exports.jobFairList = function(url, callback){
	request(url, function(err, res){
		if (err) return console.log(err);

		var $ = cheerio.load(res.body.toString());

		var jobFairList = [];
		$('.xcjob1 #rgbcn_c0 ul li').each(function(){
			var $me = $(this);
			var item = {
				title: $me.find('label').attr('title'),
				adress: $me.find('.jobaddress').text().trim(),
				//time: '2015-' + $me.find('.in_2_1').text().trim() + ':00',
				deadline: '2015-' + $me.find('.in_2_4_t').text().trim() + ':00',
				status: $me.find('font').text().trim(),
				url: '#',//由于url不存在暂同#代替
				scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
				school: '西安交通大学',
				arcContent:''
			}
			//console.log($me.find('.in_2_4_t').text().trim());
			var currentMonth = new Date().getMonth() + 1;
			if($me.find('.in_2_4_t').text().trim().slice(0,2) < currentMonth ){
				item.time = '2015-' + $me.find('.in_2_1').text().trim() + ':00';
				jobFairList.push(item);
			}
			//jobFairList.push(item);
		});
		callback(null, jobFairList);
	});
};

/*
*读取西交实习生招聘信息
*url：web连接， callback： 回调 
*/
exports.internFairList = function(url, callback){
	request(url, function(err, res){
		if (err) return console.log(err);

		var $ = cheerio.load(res.body.toString());

		var internFairList = [];
		$('.xcjob1 #rgbcn_c2 ul li').each(function(){
			var $me = $(this);
			var item = {
				title: $me.find('a').attr('title'),
				adress: $me.find('.jobaddress').text().trim(),
				time: '2015-' + $me.find('.in_2_1').text().trim() + ':00',
				deadline: '2015-' + $me.find('.in_2_4_t').text().trim() + ':00',
				status: $me.find('font').text().trim(),
				scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
				school: '西安交通大学',
				arcContent:''
			}
			var url = $me.find('a').attr('href').trim();
			if(url.indexOf('http://job.xjtu.edu.cn') >= 0){
				item.url = url;
			}else{
				item.url = 'http://job.xjtu.edu.cn' + url;
			}
			internFairList.push(item);
		});
		callback(null, internFairList);
	});
};

/*
*读取西交招聘信息
*url：web连接， callback： 回调 
*/
exports.jobList = function(url, callback){
	async.waterfall([
		function(callback){
			request(url, function(err, res){
				if (err) return console.log(err);

				var $ = cheerio.load(res.body.toString());

				var jobList = [];
				$('.r_listjob1 ul li').each(function(){
					var $me = $(this);
					var item = {
						title: $me.find('a').attr('title'),
						time: '20' + $me.find('font').text().substr(10).replace('\r\n','').trim(),
						scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
						school: '西安交通大学',
						arcContent:''
					}
					var url = $me.find('a').attr('href').trim();
					if(url.indexOf('http://job.xjtu.edu.cn') >= 0){
						item.url = url;
					}else{
						item.url = 'http://job.xjtu.edu.cn' + url;
					}
					jobList.push(item);
					//console.log(item);
				});
				callback(null, jobList);
			});
	},
	function(items, callback){
		async.mapSeries(items, function(item, callback) {
		   	setTimeout(function() {
			request(item.url,
			function(err, res, body){
				if (err) return console.log(err);
				var $ = cheerio.load(res.body.toString());
				item.arcContent = $('.artibody').html();
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

/*
*读取西交招聘信息
*url：web连接， callback： 回调 
*/
exports.fair = function(url, callback){
	request(url, function(err, res){
			if (err) return console.log(err);
			console.log("xjtu");
			var $ = cheerio.load(res.body.toString());

			callback($('.arcContent').html())
		}
	)
}

	
