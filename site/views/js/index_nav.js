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
		var conTxt = '';
		for(var i = 0; i < obj.items.length; i++)
		{
			conTxt += '<div class="item">\n'
						+'<a href="' + obj.items[i].htmlUrl + '">\n'
							+'<img src="' + obj.items[i].thumbnail + '" target="_blank" alt="' + obj.items[i].alt + '" height="100">\n'
						+'</a>\n'
						+'<a href="' + obj.items[i].htmlUrl + '" target="_blank" id="titulo"><h4>' + obj.items[i].longTitle + '</h4></a>\n'
					+'</div>\n';
		}
		var divCont = document.getElementById("contenido");
		divCont.innerHTML = conTxt;

		var btnFw = document.getElementById('btnFw');
		btnFw.setAttribute('href','javascript:getCont(' + (obj.pag + 1) + ')');
		btnFw.textContent = 'siguiente página ' + (obj.pag + 1);

		var btnBack = document.getElementById('btnBack');
		btnBack.setAttribute('href', 'javascript:getCont(' + (obj.pag - 1) + ')');
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
	return false;
}

function getCont(page)
{
	// INSTANCIA DE HTTPREQUEST
	var http = getHTTP();
	var pag = page || 1;
	var url = 'http://localhost:3000/contenido?page=' + pag;

	http.onreadystatechange = function()
	{
		return printCont(http);
	}

	http.open('get', url, true);
	http.send(null);
	return false;
}

window.onload = getCont;