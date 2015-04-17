var express = require('express');
var videos = require('../lib/getVideoApi.js');
var router = express.Router();

router.get('/', function(req ,res)
{
	var pag = Number(req.query.page) || 1; // SI EL PARAMETRO ES UNDEFINED, ASIGNA 1 A LA PAGINA DE LA PETICION

	videos.getVideos(function(err, obj)
	{
		res.json(obj);
	}
	, pag); 
});

module.exports = router;