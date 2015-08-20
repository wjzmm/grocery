var mysql = require('mysql');

exports.db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'node-spider',
	user: 'root',
	password: '920902',
});

exports.xjtu_job_url = {
	url: "http://job.xjtu.edu.cn/"
};

exports.xj_opt = {
	url: "http://job.xjtu.edu.cn/",
	jobfair: {
		title: 'label'
	}
};

exports.xd_opt = {
	url: "http://job.xidian.edu.cn/html/zpxx/jobs/"
};

// exports.xg_opt = {
// 	url: "http://job.nwpu.edu.cn/jobInfoList.do"
// };

var urls = [];
var page = 2;
for(var i = 1; i < page + 1; i++){
	var url = "http://job.nwpu.edu.cn/jobInfoList.do";
 	url = url + "?page=" + i + "&order=infoPlus.submitTime&sort=desc&filter=%7bstatus%3a1%2cworkType%3a0%7d&ext=0";
	urls.push(url)	
}
//console.log(urls);
exports.urls = urls
exports.port = 3000;
exports.autoUpdate = '* */30 * * *';