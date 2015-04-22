var express = require('express');
var videos = require('../lib/getVideoApi.js');
var router = express.Router();

router.get('/', function(req ,res)
{
	var pag = Number(req.query.page) || 1; // SI ES UNDEFINED, ASIGNA 1 A LA PAGINA DE LA PETICION
	var check = (req.query.check)? true : false;
	(check)? console.log('petición de CHECK\n') : console.log('petición de PAGINA\n');
	videos.getVideos(function(err, obj)
	{
		res.json(obj);
	}
	, pag, check); 
});

module.exports = router;