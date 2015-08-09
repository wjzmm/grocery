var request = require('request'),
	cheerio = require('cheerio'),
	iconv = require('iconv-lite'),
	debug   = require('debug')('node-spider:update');

	debug('尝试读取招聘信息');
	request({
		url: 'http://job.xidian.edu.cn/index.html',
		encoding: null},
		function(err, res, body){
		if (err) return console.log(err);
		console.log("xdtu");
		body = iconv.decode(body, 'gbk');
		var $ = cheerio.load(body);

		var jobFairList = [];
		console.log($('#info-list2').find('a'));
		$('body').find('.hui21').each(function(){
			var $me = $(this);
			//console.log('1');
			//console.log($me.text());
			// var item = {
			// 	title: $me.find('label').attr('title'),
			// 	adress: $me.find('.jobaddress').text().trim(),
			// 	time: '2015-' + $me.find('.in_2_1').text().trim() + ':00',
			// 	deadline: '2015-' + $me.find('.in_2_4_t').text().trim() + ':00',
			// 	status: $me.find('font').text().trim(),
			// 	url: '#',//由于url不存在暂同#代替
			// 	scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
			// 	school: '西安交通大学'
			// }
			//jobFairList.push(item);
		});
		//callback(null, jobFairList);
	});


	
