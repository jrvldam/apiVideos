function setLink(id)
{
	if(typeof Sotrage !== 'undefined')// SI EL CLIENTE PERMITE ALMACENAR
	{
		if(localStorage.visited) // SI EXISTE YA LA VARIABLE
		{
			var flag = false;
			var i = 0;
			// BUSCA EL ID EN EL ARRAY
			while(!flag && i < localStorage.visited.length)
			{
				if(localStorage.visited[i] === Number(id))
				{
					flag = true;
				}
				i++;
			}
			if(!flag) // SI NO ENCUENTRA EL ID LO INSERTA EN EL ARRAY
			{
				localStorage.visited.push(Number(id));
			}
			return flag;
		}
		else // SI NO INICIALIZA EL ARRAY E INSERTA EL ID
		{
			localStorage.visited = [Number(id)];
		}
	}
	return null;
}

window.addEventListener("load", function() {
      var button = document.getElementById("connect");
      var status = document.getElementById("status");
      var output = document.getElementById("output");
      var connectTime = document.getElementById("connecttime");
      var source;

      function connect() {
        source = new EventSource("stream");
        source.addEventListener("message", function(event) {
          output.textContent = event.data;
        }, false);

        source.addEventListener("connecttime", function(event) {
          connectTime.textContent = "Connection was last established at: " + event.data;
        }, false);

        source.addEventListener("open", function(event) {
          button.value = "Disconnect";
          button.onclick = function(event) {
            source.close();
            button.value = "Connect";
            button.onclick = connect;
            status.textContent = "Connection closed!";
          };
          status.textContent = "Connection open!";
        }, false);

        source.addEventListener("error", function(event) {
          if (event.target.readyState === EventSource.CLOSED) {
            source.close();
            status.textContent = "Connection closed!";
          } else if (event.target.readyState === EventSource.CONNECTING) {
            status.textContent = "Connection closed. Attempting to reconnect!";
          } else {
            status.textContent = "Connection closed. Unknown error!";
          }
        }, false);
      }

      if (!!window.EventSource) {
        connect();
      } else {
        button.style.display = "none";
        status.textContent = "Sorry, your browser doesn't support server-sent events";
      }
    }, false);