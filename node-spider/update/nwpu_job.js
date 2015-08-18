var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async'),
	iconv = require('iconv-lite'),
	debug   = require('debug')('node-spider:update');

	debug('尝试读取招聘信息');

var url = "http://job.nwpu.edu.cn/jobInfoList.do";
//exports.job = function(url, callback){
//exports.Job = function(){
	var page = 5;
	var urls = [];
 	var jobList = [];
 	var internList = [];
	for(var i = 1; i < page; i++){
		url = url + "?page=" + i + "&order=infoPlus.submitTime&sort=desc&filter=%7bstatus%3a1%2cworkType%3a0%7d&ext=0";
		urls.push(url)
		
	}
	console.log(urls);
	async.mapSeries(urls, function(item, callback) {
	    console.log('1.3 enter: ' + item);
	    setTimeout(function() {
	        console.log('1.3 handle: ' + item);
	        callback(null, item.name+'!!!');
	    }, 10);
	}, function(err,results) {
	    console.log('1.3 err: ', err);
	    console.log('1.3 results: ', results);
	});
		request(url, function(err, res) {
			//console.log('spider');
			var $ = cheerio.load(res.body.toString());
			console.log(i);		
		 	$('.blog-page .row').each(function() {
					var $p = $(this).find('p');
					var $h3 = $(this).find('h3');
					var $ul = $(this).find('ul');
					var jobType = $p.children().first().next().next().next().next().text().trim();
					//console.log(jobType);
					if (jobType == '全职') {
						//console.log($ul.find('li').contents().text().trim().slice(4,19).trim());
						var item_job = {
							title: $h3.find('a').attr('title'),
							time: $ul.find('li').contents().text().trim().slice(4,19).trim(),
							scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
							school: '西北工业大学',
							url: 'http://job.nwpu.edu.cn' + $h3.find('a').attr('href'),
						}
						//console.log($h3.find('a').attr('href'));
						jobList.push(item_job);
					} else if (jobType == '实习') {
						var item_intern = {
							title: $h3.find('a').attr('title'),
							time: $ul.find('li').contents().text().trim().slice(4,19).trim(),
							adress: "西北工业大学",
							deadline: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
							scantime: new Date(+new Date()+8*3600*1000).toISOString().slice(0, 19).replace('T', ' '),
							status: "",
							school: '西北工业大学',
							url: 'http://job.nwpu.edu.cn' + $h3.find('a').attr('href'),
						}
						internList.push(item_intern);

					} else {
						console.log('error');
					}	
				});
				console.log(internList);
			});
		//callback(null, jobList, internList);
		//console.log(internList);
	
//}

	
