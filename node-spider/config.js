var mysql = require('mysql');

/*
*数据库信息 
*/
exports.db = mysql.createConnection({
	host: '127.0.0.1',
	port: 3306,
	database: 'node-spider',
	user: 'root',
	password: '920902',
});
/*
*西交大url配置
*/
exports.xjtu_job_url = {
	url: "http://job.xjtu.edu.cn/",

};
/*
*西交大配置
*/
exports.xj_opt = {
	url: "http://job.xjtu.edu.cn/",
	jobfair: {
		title: 'label'
	}
};
/*
*西电url配置
*/
exports.xd_opt = {
	url: "http://job.xidian.edu.cn/html/zpxx/jobs/",
	fair: "http://job.xidian.edu.cn/html/zpxx/bxqzph/"
};

/*
*西交大url配置
*/
var urls = [];
var page = 2;
for(var i = 1; i < page + 1; i++){
	var url = "http://job.nwpu.edu.cn/jobInfoList.do";
 	url = url + "?page=" + i + "&order=infoPlus.submitTime&sort=desc&filter=%7bstatus%3a1%2cworkType%3a0%7d&ext=0";
	urls.push(url)	
}
//console.log(urls);
exports.urls = urls
/*
*端口号
*/
exports.port = 3000;

/*
*分页大小设置
*/
exports.pageSize = 10;

/*
*定时任务执行周期
*/
exports.autoUpdate = '* */30 * * *';