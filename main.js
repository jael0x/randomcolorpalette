function getRandomColor(){
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i=0;i<6;i++)
		color+=letters[Math.round(Math.random()*15)];
	return color;
}

function makeBox() {
	for (var i = 17; i >= 0; i--)
		document.getElementById("box"+i).style.backgroundColor=getRandomColor();
}

window.onload = function(){
    // var contador = 0;
    document.getElementById("aleboton").onclick = function(){
    	makeBox();
        // contador++;
        // console.log(contador);
    }
}

function copyColor(objeto){
	var	color=objeto.style.backgroundColor;
	color=color.replace("rgb(","");
	color=color.replace(")","");
	var partes=color.split(",")
	var parte1=partes[0].replace(/^\s*|\s*$/g,"");
	var parte2=partes[1].replace(/^\s*|\s*$/g,"");
	var parte3=partes[2].replace(/^\s*|\s*$/g,"");
	a= "0123456789ABCDEF".charAt(parseInt(parte1 / 16))	+ "0123456789ABCDEF".charAt(parseInt(parte1% 16));
	b= "0123456789ABCDEF".charAt(parseInt(parte2 / 16))	+ "0123456789ABCDEF".charAt(parseInt(parte2% 16));	
	c= "0123456789ABCDEF".charAt(parseInt(parte3 / 16))	+ "0123456789ABCDEF".charAt(parseInt(parte3% 16));
	color="#"+a+b+c;
	var aux = document.createElement("input");
	aux.setAttribute("value", color);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	var x = document.getElementById("snackbar");
    var y = document.getElementById("mini");
	x.innerHTML = color+" Copiado!";
	y.style.backgroundColor = color;
    x.className = "show";
    y.className = "show";
    setTimeout(function(){ 
    	x.className = x.className.replace("show", "");
    	y.className = y.className.replace("show", "");
    }, 2000);
}