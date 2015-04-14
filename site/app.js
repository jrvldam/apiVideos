var express = require('express');
var swig = require('swig');
var videos = require('./lib/getVideoApi.js');
var app = express();

app.disable('x-powered-by');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req ,res)
{
	videos.getVideos(function(err, obj, pag)
	{
		obj = videos.jsonFormat(obj);
		res.render('index', { obj:obj });
	});
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function()
{
	console.log('Server listen on ' + app.get('port') + '...');
});