var http = require('http');

function getVideos(callback)
{
	var url = 'http://www.rtve.es/api/videos.json';
	http.get(url, function(res)
	{
		var videos = '';
		res.on('data', function(chunk)
		{
			videos += chunk;
		});
		res.on('end', function()
		{
			videos = JSON.parse(videos);
			return callback(null, videos.page);
		});
	});
}

function jsonFormat(obj)
{
	var listaDest = [];
	var listaOrig = obj.items;
	for(var i = 0; i < listaOrig.length; i++)
	{
		var aux = {
			htmlUrl: listaOrig[i].htmlUrl
			, longTitle: listaOrig[i].longTitle
			, thumbnail: listaOrig[i].thumbnail
			, contentType: listaOrig[i].contentType
			, alt: listaOrig[i].alt
			, description: listaOrig[i].description
		};
		listaDest.push(aux);
	}

	var objFin = {
		items: listaDest
		,numItems: obj.size
	};
	return objFin;
};

exports.getVideos = getVideos;
exports.jsonFormat = jsonFormat;