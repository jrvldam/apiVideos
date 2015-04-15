var http = require('http');
// DEVUELVE EL CALLBACK CON LA PROPIEDAD PAGE DEL OBJETO DE LA RESPUESTA
function getVideos(callback, pag)
{
	var SIZE = 4; // NUMERO DE ELEMENTOS EN LA PETICION
	var _params = '?page=' + pag + '&size=' + SIZE;
	var url = 'http://www.rtve.es/api/videos.json' + _params;
	
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
// FORMATEA EL JSON PARA ENVIAR LO EN LA RESPUESTA
function jsonFormat(obj, pag)
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
		, numItems: obj.size
		, pag: pag
	};
	return objFin;
};
// EXPORTA LAS FUNCIONES PARA USRALAS COMO METODOS DE CLASE
exports.getVideos = getVideos;
exports.jsonFormat = jsonFormat;