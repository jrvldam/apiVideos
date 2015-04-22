$(document).ready(function()
{
  var idFlag = 0;

  $(selector).load(URL,data,callback);
});

var idFlag = 0;

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

function getHTTP()
{
  var http = null;
  if(window.XMLHttpRequest)
  {
    http = new XMLHttpRequest();
  }
  else if(window.ActiveXObject)
  {
    http = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return http;
}

function printCont(http) 
{
  if(http.readyState == 4 && http.status == 200) 
  {
    var obj = JSON.parse(http.responseText);
    if(hasNews(Number(obj.items[0].id), obj.check))
    {
      var divCont = document.getElementById("contenido");
      // PRIMERO VACIA EL ELEMENTO
      while (divCont.firstChild) 
      {
          divCont.removeChild(divCont.firstChild);
      }
      // GENERA LOS NODOS A PARTIR DEL JSON RECIBIDO
      for(var i = 0; i < obj.items.length; i++)
      {
        var img = document.createElement('img');
        img.setAttribute('src', obj.items[i].thumbnail);
        img.setAttribute('alt', obj.items[i].alt);
        img.setAttribute('height', 100);
        var h4 = document.createElement('h4');
        var textH4 = document.createTextNode(obj.items[i].longTitle);
        h4.appendChild(textH4);
        var div = document.createElement('div');
        div.setAttribute('id', obj.items[i].id);
        if(isVisited(obj.items[i].id)) // PINTA EL ITEM SEGUN SI HA SIDO VISITADO YA O NO
        {
          div.setAttribute('class', 'visited');
        }
        else
        {
          div.setAttribute('class', 'item');
        }
        div.setAttribute('onclick', 'setLink(this);');
        div.appendChild(img);
        div.appendChild(h4);
        var a = document.createElement('a');
        a.setAttribute('href', obj.items[i].htmlUrl);
        a.setAttribute('target', '_blank');
        a.appendChild(div);
        divCont.appendChild(a);
      }
      // MODIFICA LOS BOTONES PARA LA PAGiNACION
      var btnFw = document.getElementById('btnFw');
      btnFw.setAttribute('href','javascript: void getCont(' + (obj.pag + 1) + ')');
      btnFw.textContent = 'siguiente página ' + (obj.pag + 1);

      var btnBack = document.getElementById('btnBack');
      btnBack.setAttribute('href', 'javascript: void getCont(' + (obj.pag - 1) + ')');
      btnBack.textContent =  (obj.pag - 1) + ' página anterior';
      if(obj.pag > 1)
      {
        document.getElementById('btnBack').style.display = 'initial';
      }
      else
      {
        document.getElementById('btnBack').style.display = 'none';
      }
    }
  }
  return false;
}

function getCont(page, check)
{
  var http = getHTTP();
  if(http)
  {
    var pag = page || 1;
    var check = (check)? '&check=1' : '';
    var url = '/contenido?page=' + pag + check;
    http.onreadystatechange = function()
    {
      return printCont(http);
    }
    http.open('get', url, true);
    http.send(null);
  }
  return false;
}

function hasNews(idProspect, check)
{
  if(check)
  {
    console.log('nuevo: ' + idProspect + ', actual: ' + idFlag);
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

function init()
{
  getCont(1, false);
  setInterval(function(){getCont(null, true);}, 30000);
}

window.onload = init;