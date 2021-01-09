let Grid = document.getElementsByClassName('colors-container')[0],
	lockedColors = {}

function copyColor(Box) {
	let color = Box.style.backgroundColor
	color = color.replace('rgb(', '')
	color = color.replace(')', '')

	let partes = color.split(','),
		parte1 = partes[0].replace(/^\s*|\s*$/g, ''),
		parte2 = partes[1].replace(/^\s*|\s*$/g, ''),
		parte3 = partes[2].replace(/^\s*|\s*$/g, ''),
		a = '0123456789ABCDEF'.charAt(parseInt(parte1 / 16)) + '0123456789ABCDEF'.charAt(parseInt(parte1 % 16)),
		b = '0123456789ABCDEF'.charAt(parseInt(parte2 / 16)) + '0123456789ABCDEF'.charAt(parseInt(parte2 % 16)),
		c = '0123456789ABCDEF'.charAt(parseInt(parte3 / 16)) + '0123456789ABCDEF'.charAt(parseInt(parte3 % 16))
	color = '#' + a + b + c

	let Aux = document.createElement('input')
	Aux.setAttribute('value', color)
	document.body.appendChild(Aux)
	Aux.select()
	document.execCommand('copy')
	document.body.removeChild(Aux)

	let X = document.getElementById('snackbar'),
		Y = document.getElementById('mini')
	X.innerHTML = color + ' Copied!'
	Y.style.backgroundColor = color
	X.className = 'show'
	Y.className = 'show'

	setTimeout(function () {
		X.className = X.className.replace('show', '')
		Y.className = Y.className.replace('show', '')
	}, 2000)
}

function lockColor(Blocker) {
	let Box = Blocker.parentNode,
		Icon = document.createElement('i'),
		keys = Object.keys(lockedColors),
		isLocked = false.innerText,
		num = Box.innerText
	// Cheking if color is already locked
	for (let i = 0; i < keys.length; i++) 
		if (Box.innerText == keys[i]) isLocked = true

	// If it's already locked then unlock it
	if (isLocked) {
		delete lockedColors[num]
		Icon.classList.add('fas', 'fa-unlock')
		Blocker.style.color = 'white'
	}
	// Else it gets locked
	else {
		lockedColors = {
			...lockedColors,
			[num]: Box.style.backgroundColor
		}
		Icon.classList.add('fas', 'fa-lock')
		Blocker.style.color = 'black'
	}
	cleanSpace(Blocker)
	Blocker.appendChild(Icon)
}

function addBoxes() {
    let width = window.innerWidth,
		height = window.innerHeight,
		keys = Object.keys(lockedColors),
		Box

    // Adjusting width & height...
    if (width.toString().length == 3)
        width = Number(width.toString()[0]) * 100
    else if (width.toString().length == 4)
        width = Number(width.toString()[0] + width.toString()[1]) * 100

    if (height.toString().length == 3) 
        height = Number(height.toString()[0]) * 100
    else if (height.toString().length == 4) 
        height = Number(height.toString()[0] + height.toString()[1]) * 100

	// Adding boxes...
	for (let i = 0; i < (width * height / (100 * 100)); i++) {
		Box = newBox(i)
		paintBox(Box, getRandomColor())
		for (let j = 0; j < keys.length; j++) {
			if (i == keys[j]) 
				Box = newBox(i, true)
				paintBox(Box, lockedColors[i])
		}
		Grid.appendChild(Box)
	}
}

function newBox(number /* Each box has its number tattoed */, isLocked = false) {
    let Box = document.createElement('div'),
        Blocker = document.createElement('div'),
		Icon = document.createElement('i')

	// Adding classes, styles & functions
	Box.innerHTML = number
	Box.classList.add('box')
	Box.onclick = function() {
		copyColor(this)
	}
	Blocker.classList.add('blocker')
	Blocker.onclick = function() {
		lockColor(this)
	}
	if (isLocked) {
		Icon.classList.add('fas', 'fa-lock')
		Blocker.style.color = 'black'
	} 
	else Icon.classList.add('fas', 'fa-unlock')

	// Adding children
    Blocker.appendChild(Icon)
	Box.appendChild(Blocker)

    return Box
}

function paintBox(Box, color) {
	Box.style.backgroundColor = color
	Box.style.color = color
}

function getRandomColor() {
	let letters = '0123456789ABCDEF'.split(''),
		color = '#'
	for (let i = 0; i < 6; i++)
		color += letters[Math.round(Math.random() * 15)]
	return color
}

// Remove any child of the HTML element
function cleanSpace(Space) {
	while(Space.firstChild) {
		Space.removeChild(Space.lastChild)
	}
}

window.onload = function() {
    document.getElementsByClassName('random-button')[0].onclick = function() {
		cleanSpace(Grid)
    	addBoxes()
    }
}