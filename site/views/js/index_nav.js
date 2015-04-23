var idFlag = 0;

$(document).ready(function()
{
  init();
});

function init()
{
  getCont(1, false); // PRIMERA PETICION
  setInterval(function(){getCont(1, true);}, 30000);
}

function getCont(page, check)
{
  var pag = page || 1;
  var check = (check)? '&check=1' : '';
  var url = '/contenido?page=' + pag + check;
  $.getJSON(url, function(json)
  {
    return printCont(json);
  });
}

function printCont(obj) 
{
  var id = Number(obj.items[0].id);
  var check = obj.check;
  if(hasNews(id, check))
  {
    // PRIMERO VACIA EL ELEMENTO
    $('#contenido').empty();
    // GENERA LOS NODOS A PARTIR DEL JSON RECIBIDO
    for(var i = 0; i < obj.items.length; i++)
    {
      var img = $('<img>').attr(
                  {
                    'src': obj.items[i].thumbnail, 
                    'alt': obj.items[i].alt, 
                    'height': 100
                  });
      var h4 = $('<h4></h4>').text(obj.items[i].longTitle);
      // PINTA EL ITEM SEGUN SI HA SIDO VISITADO YA O NO
      var visited = isVisited(obj.items[i].id)? 'visited' : 'item';

      var div = $('<div></div>').attr(
                  {
                    'id': obj.items[i].idFlag, 
                    'class': visited, 
                    'onclick': 'setLink(this)'
                  });
      $(div).append(img, h4);
      var a = $('<a></a>').attr(
                {
                  'href': obj.items[i].htmlUrl, 
                  'target': '_blank'
                });
      $(a).append(div);
      $('#contenido').append(a);
    }
    // MODIFICA LOS BOTONES PARA LA PAGiNACION
    $('#btnFw').attr('href', 'javascript: void getCont(' + (obj.pag + 1) + ')').text('siguiente página ' + (obj.pag + 1));
    $('#btnBack').attr('href', 'javascript: void getCont(' + (obj.pag - 1) + ')').text((obj.pag - 1) + ' página anterior');
    if(obj.pag > 1)
    {
      $('#btnBack').css('display', 'initial');
    }
    else
    {
      $('#btnBack').css('display', 'none');
    }
  }
  return false;
}
// ALMACENA EL ID DEL ELEMENTO VISITADO.
function setLink(elem)
{
  var id = Number(elem.id); // DEVUELVE EL ID DEL ELEMENTO
  if(typeof(Storage) !== 'undefined')// SI EL CLIENTE PERMITE ALMACENAR
  {
    if(localStorage.visited)// SI YA EXISTE LA VARIABLE
    {
      var vstd = JSON.parse(localStorage.visited);
      if(!isVisited(id))
      {
        vstd.push(id);
        localStorage.visited = JSON.stringify(vstd);
        elem.setAttribute('class', 'visited');
      }
    }
    else // SINO CREA LA VARIABLE COMO ARRAY Y ALMACENA EL ID
    {
      localStorage.visited = '[]';
      var vstd = JSON.parse(localStorage.visited);
      vstd.push(id);
      localStorage.visited = JSON.stringify(vstd);
    }
  }
  return false;
}

function isVisited(id)
{
  if(localStorage.visited) // SI EXISTE YA LA VARIABLE
  {
    var vstd = JSON.parse(localStorage.visited);
    var flag = false;
    var i = 0;
    // BUSCA EL ID EN EL ARRAY
    while(!flag && i < vstd.length)
    {
      if(vstd[i] === Number(id))
      {
        flag = true;
      }
      i++;
    }
    return flag;
  }
  return false;
}

function hasNews(idProspect, check)
{
  if(check)
  {
    console.log('id candidato: ' + idProspect + ', id actual: ' + idFlag);
    if(idProspect === idFlag)
    {
      return false;
    }
    else
    {
      idFlag = idProspect;
      console.log(new Date() + 'CONTENIDO NUEVO!!!');
    }
  }
  return true;
}