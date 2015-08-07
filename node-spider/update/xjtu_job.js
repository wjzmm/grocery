var request = require('request'),
	cheerio = require('cheerio'),
	debug   = require('debug')('node-spider:update');

	debug('尝试读取招聘信息');

request('http://job.xjtu.edu.cn/', function(err, res){
	if (err) return console.log(err);

	var $ = cheerio.load(res.body.toString());

	var jobFairList = [];
	$('.xcjob1 #rgbcn_c0 ul li').each(function(){
		var $me = $(this);
		var item = {
			title: $me.find('label').attr('title'),
			adress: $me.find('.jobaddress').text().trim(),
			time: $me.find('.in_2_1').text().trim(),
			deadline: $me.find('.in_2_4_t').text().trim(),
			status: $me.find('font').text().trim(),
			url: ''
		}
		jobFairList.push(item);
	})
	//console.log(jobFairList);

	var internFairList = [];
	$('.xcjob1 #rgbcn_c2 ul li').each(function(){
		var $me = $(this);
		var item = {
			title: $me.find('a').attr('title'),
			adress: $me.find('.jobaddress').text().trim(),
			time: $me.find('.in_2_1').text().trim(),
			deadline: $me.find('.in_2_4_t').text().trim(),
			status: $me.find('font').text().trim()
			//url: $me.find('a').attr('href').trim()
		}
		var url = $me.find('a').attr('href').trim();
		if(url.indexOf('http://job.xjtu.edu.cn') >= 0){
			item.url = url;
		}else{
			item.url = 'http://job.xjtu.edu.cn' + url;
		}
		internFairList.push(item);
	})
	//console.log(internFairList);

	var jobList = [];
	$('.r_listjob1 ul li').each(function(){
		var $me = $(this);
		var item = {
			title: $me.find('a').attr('title'),
			time: $me.find('font').text().substr(4).replace('\r\n','').trim()
			//url: $me.find('a').attr('href').trim()
		}
		var url = $me.find('a').attr('href').trim();
		if(url.indexOf('http://job.xjtu.edu.cn') >= 0){
			item.url = url;
		}else{
			item.url = 'http://job.xjtu.edu.cn' + url;
		}
		jobList.push(item);
	})
	console.log(jobList);
})