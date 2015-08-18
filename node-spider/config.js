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

exports.xg_opt = {
	url: "http://job.nwpu.edu.cn/jobInfoList.do"
};


exports.port = 3000;
exports.autoUpdate = '* */30 * * *';