var express = require('express');
var swig = require('swig');
var index = require('./routes/index');
var route = require('./routes/contenido');

var app = express();
// RECORTA LA INFORMACION SOBRE EL SERVIDOR QUE SE ENVIA 
app.disable('x-powered-by');

app.use(express.static(__dirname + '/views'));

app.use('/', index);
app.use('/contenido', route);
// EN CASO QUE EL REQUEST NO SATISFAGA NINGUN PATH ANTERIOR
app.use(function(req, res)
{
	res.status(404).send('El recurso que busca no se ha encontrado. Revise la dirección');
}); 
// SI NO HAY UN PUERTO ASIGNADO POR EL ENTORNO ESCUCHA EN 3000
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function()
{
	console.log('Server listen on ' + app.get('port') + '...');
});