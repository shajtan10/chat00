var err = false;

function create(x, y){
	var e;

	e = document.createElement('span');
	e.style.left = x+'px';
	e.style.top = y+'px';

	e.className = 'msg';
	e.setAttribute('contenteditable', true);
	e.setAttribute('nowrap', true)

	document.body.append(e);

	e.focus();
	e.onblur = function(){
		if(e.innerText.length === 0 || !e.innerText.trim()){
			return document.body.removeChild(e)
		}

		if(err){
			return e.focus();
		}

		e.setAttribute('contenteditable', false);
	}

	e.oninput = function(){
		err = e.innerText.length > 50 ? true : false;
		e.className = err ? 'msg err' : 'msg';
	}

	e.onpaste = function(event){
		event.preventDefault();
		document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
	}
}

document.body.onclick = function(event){
	if(event.target == this){
		if(!err) create(event.pageX, event.pageY);
	}
}