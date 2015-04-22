var http = require('http');
// DEVUELVE EL CALLBACK CON LA PROPIEDAD PAGE DEL OBJETO DE LA RESPUESTA
function getVideos(callback, pag, check)
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
			videos = jsonFormat(JSON.parse(videos), pag, check);
			return callback(null, videos);
		});
	});
}
// FORMATEA EL JSON PARA ENVIARLO EN LA RESPUESTA
function jsonFormat(obj, pag, check)
{
	var listaDest = [];
	var listaOrig = obj.page.items;
	console.log(new Date() + ' ID: ' + listaOrig[0].id + '\n\n');
	for(var i = 0; i < listaOrig.length; i++)
	{
		var aux = {
			'htmlUrl': listaOrig[i].htmlUrl
			, 'id': listaOrig[i].id
			, 'longTitle': listaOrig[i].longTitle
			, 'thumbnail': listaOrig[i].thumbnail
			, 'contentType': listaOrig[i].contentType
			, 'alt': listaOrig[i].alt
			, 'description': listaOrig[i].description
		};
		listaDest.push(aux);
	}

	var objFin = {
		'items': listaDest
		, 'numItems': obj.page.size
		, 'pag': pag
		, 'check': check
	};
	return objFin;
};
// EXPORTA LA FUNCION PARA USRALA COMO METODO DE CLASE
exports.getVideos = getVideos;