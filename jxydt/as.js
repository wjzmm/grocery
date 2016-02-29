var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs'),
	async = require('async');
var basepath = "images/";
var baseurl = "http://ww3.sinaimg.cn/mw600/";
var errurl = "404.58.com";
var i = 1;
var getPic = function(id){
	var url = "http://mnks.jxedt.com/get_question?index=" + id;
	request(url, function(err, res){
		if (err) return console.log(err);
		if(res.headers['x-host'] ==  errurl){
			console.log("总共获取了 " + i + "个图片");
			process.exit(0);
		}else{
			var result = JSON.parse(res.body.toString());
			if(result.sinaimg){
				var imgurl = baseurl + result.sinaimg;
				var oldfilename = basepath + result.id + ".jpg";
				var newfilename = basepath + result.sinaimg ;
				console.log(oldfilename + "被重命名为" + newfilename);
				
				fs.rename(oldfilename,newfilename);  
				++id;
				getPic(id);
			}else{
				++id;
				console.log(id + " 非图片，跳过...");
				getPic(id);
			}
		}	
	});
};
var downImg = function(url, filename, callback){
	request.head(url, function(err, res){
		if(err) console.log(err);

		request(url).pipe(fs.createWriteStream('images/' + filename)).on('close', callback);
	})
}
getPic(2428);