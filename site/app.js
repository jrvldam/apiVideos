var express = require('express');
var swig = require('swig');
var route = require('./routes/index')

var app = express();
// RECORTA LA INFORMACION SOBRE EL SERVIDOR QUE SE ENVIA 
app.disable('x-powered-by');
// ASIGNA LA EXTENCION QUE TENDRAN LOS TEMPLATES POR DEFECTO PARA LA FUNCION RENDER()
app.engine('html', swig.renderFile);
// ASIGNA EL VALOR A LA PROPIEDAD DEL MOTOR DE TEMPLATES (NAME, VALUE)
app.set('view engine', 'html');
// ASIGNA EL PATH DONDE SE EXPRESS BUSCARA LOS RECURSOS PARA LA FUNCION RENDER()
app.set('views', __dirname + '/views');

app.use('/', route);
app.use('/index', route);
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