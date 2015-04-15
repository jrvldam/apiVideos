var express = require('express');
var swig = require('swig');
var videos = require('./lib/getVideoApi.js');
var app = express();
// RECORTA LA INFORMACION SOBRE EL SERVIDOR QUE SE ENVIA 
app.disable('x-powered-by');
// ASIGNA LA EXTENCION QUE TENDRAN LOS TEMPLATES POR DEFECTO PARA LA FUNCION RENDER()
app.engine('html', swig.renderFile);
// ASIGNA EL VALOR A LA PROPIEDAD DEL MOTOR DE TEMPLATES (NAME, VALUE)
app.set('view engine', 'html');
// ASIGNA EL PATH DONDE SE EXPRESS BUSCARA LOS RECURSOS PARA LA FUNCION RENDER()
app.set('views', __dirname + '/views');

app.get('/', function(req ,res)
{
	res.redirect('/index');
});

app.get('/index', function(req ,res)
{
	var pag = Number(req.query.page) || 1; // SI EL PARAMETRO ES UNDEFINED, ASIGNA 1 A LA PAGINA DE LA PETICION

	videos.getVideos(function(err, obj)
	{
		obj = videos.jsonFormat(obj, pag);
		res.render('index', { obj:obj });
	}
	, pag); 
});
// EN CASO QUE EL REQUEST NO SATISFAGA NINGUN PATH ANTERIOR
app.use(function(req, res)
{
	res.status(404).send('El recurso que busca no se ha encontrado. Revise la direccion');
}); 
// SI NO HAY UN PUERTO ASIGNADO POR CONTEXTO, ASIGNA 3000
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function()
{
	console.log('Server listen on ' + app.get('port') + '...');
});