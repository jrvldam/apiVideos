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