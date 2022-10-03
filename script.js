const numberOfColours = 4; // Numeros de vezes pra repetir os arrays.
const localDb = []; // Guarda as cores no local storage.
let localDraw = []; // Guarda o desenho feito pelo o usuario.
const colours = []; // Guarda as cores aleatorias geradas na 1x.
const selected = 'color selected'; // Insere a classe color selected.
let numberOfSquares = 25;

// Funcao para gerar uma cor aleatoria em RGB.
const createRandomColours = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return colours.push(`rgb(${r}, ${g}, ${b})`);
};

// Funcao para colocar as cores no Array colours.
const throwColoursInArray = () => {
  for (let i = 0; i < 3; i += 1) {
    createRandomColours();
  }
};

// Funcao para gerar os elementos da paleta.
const generatingPallete = () => {
  for (let i = 0; i < numberOfColours; i += 1) {
    const getUlList = document.getElementById('color-palette');
    const createLi = document.createElement('li');
    if (i === 0) {
      createLi.className = selected;
    } else {
      createLi.className = 'color';
    }

    getUlList.appendChild(createLi);
  }
};

// Funcao para verificar qual cor sera colocada em cada elemento.
const verifyColours = (blackColour, getColours, sum) => {
  for (let i = 0; i < numberOfColours; i += 1) {
    const myLi = document.getElementsByClassName('color')[i];
    if (i === 0) {
      myLi.style.backgroundColor = blackColour;
    } else {
      myLi.style.backgroundColor = getColours[i - sum];
    }
  }
};

// Funcao para inserir o background na paleta.
const saveColoursDb = (lista) => {
  for (let i = 0; i < numberOfColours; i += 1) {
    const getColour = lista[i].style.backgroundColor;
    localDb.push(getColour);
  }
};

// Funcao para guardar a cor aleatoria gerada no Local Storage
const creatingLocalStorage = () => {
  localStorage.setItem('colorPalette', JSON.stringify(localDb));
};

const verifyLocalStorage = (localS, myList) => {
  if (localS === null) {
    verifyColours('rgb(0, 0, 0)', colours, 1);
    saveColoursDb(myList);
    creatingLocalStorage();
  } else {
    verifyColours('rgb(0, 0, 0)', JSON.parse(localS), 0);
  }
};

// Funcao para gerar as paletas com as cores corretas!
const generateColour = () => {
  const localStorageVar = localStorage.getItem('colorPalette');
  const myLi = document.getElementsByClassName('color');
  verifyLocalStorage(localStorageVar, myLi);
};

// Botao para resetar as cores
const resetColours = () => {
  const localStorageVar = localStorage.getItem('colorPalette');
  const myLi = document.getElementsByClassName('color');
  const myBtn = document.getElementById('button-random-color');
  myBtn.addEventListener('click', () => {
    localStorage.clear();
    verifyLocalStorage(localStorageVar, myLi);
    document.location.reload(true);
  });
};

// Funcao para guardar o desenho no LocalStore
function saveDraw() {
  localDraw = [];
  const getPixelClass = document.querySelectorAll('.pixel');
  for (let i = 0; i < getPixelClass.length; i += 1) {
    if (JSON.parse(localStorage.getItem('pixelBoard')) === '') {
      getPixelClass[i].style.backgroundColor = 'white';
    }
    localDraw.push(getPixelClass[i].style.backgroundColor);
  }

  localStorage.setItem('pixelBoard', JSON.stringify(localDraw));
}

// Funcao para pintar os quadradinhos
const squaresPainting = () => {
  const getSquares = document.querySelectorAll('.pixel');

  for (let i = 0; i < getSquares.length; i += 1) {
    getSquares[i].addEventListener('click', () => {
      const getSelectedColour = document.querySelector('.selected').style.backgroundColor;
      getSquares[i].style.backgroundColor = getSelectedColour;
      saveDraw();
    });
  }
};

// Cria os quadrados dentro do quadro
const createBoard = (chooseColour) => {
  const getBoard = document.getElementById('pixel-board');
  getBoard.style.width = `${40 * 5}px`;

  for (let i = 0; i < numberOfSquares; i += 1) {
    const createSquare = document.createElement('div');
    createSquare.className = 'pixel';
    createSquare.style.backgroundColor = chooseColour[i];
    getBoard.appendChild(createSquare);
  }
};

// Funcao para inserir a classe na cor desejada
const verifySelectedColour = (selecColour, index) => {
  const clickColour = document.querySelectorAll('.color');
  for (let j = 0; j < selecColour.length; j += 1) {
    if (selecColour[index] !== selecColour[j]) {
      clickColour[j].className = 'color';
    } else {
      clickColour[index].className = selected;
    }
  }
};

// Funcao que verifica as cores para receber a classe
const selectColour = () => {
  const clickColour = document.querySelectorAll('.color');
  clickColour[0].style.className = selected;
  for (let i = 0; i < clickColour.length; i += 1) {
    clickColour[i].addEventListener('click', () => {
      verifySelectedColour(clickColour, i);
    });
  }
};

// Funcao para limpar os quadrinhos
const cleanBoard = () => {
  const getSquares = document.querySelectorAll('.pixel');
  const getButtonClear = document.getElementById('clear-board');

  getButtonClear.addEventListener('click', () => {
    for (let i = 0; i < getSquares.length; i += 1) {
      getSquares[i].style.backgroundColor = 'white';
      localDraw.push(getSquares[i]);
    }
  });
};

const renderBoard = () => {
  if (JSON.parse(localStorage.getItem('pixelBoard')) == null) {
    createBoard('white');
  } else {
    createBoard(JSON.parse(localStorage.getItem('pixelBoard')));
  }
};

// Verifica quantidade de quadradinhos
const verifyQntSquares = (input) => {
  if (input.value < 5) {
    numberOfSquares = 5 * 5;
  } else if (input.value >= 25) {
    numberOfSquares = 2500;
  } else {
    numberOfSquares = input.value * input.value;
  }
};

function vamoooo() {
  if (localStorage.getItem('boardSize') !== null) {
    numberOfSquares = localStorage.getItem('boardSize') * localStorage.getItem('boardSize');
  }
}

// Gera dinamicamente os quadradinhos
const generateBoard = () => {
  vamoooo();
  renderBoard();
  const getBtnBoard = document.getElementById('generate-board');
  const getInput = document.getElementById('board-size');
  getBtnBoard.addEventListener('click', () => {
    localStorage.setItem('boardSize', getInput.value);
    if (getInput.value === '') {
      alert('Board inválido!');
    } else {
      const getBoard = document.getElementById('pixel-board');
      while (getBoard.firstChild) {
        getBoard.removeChild(getBoard.lastChild);
      }
      verifyQntSquares(getInput);
      renderBoard();
      squaresPainting();
    }
  });
};

// Chamada das funcoes.
throwColoursInArray();
generatingPallete();
generateColour();
resetColours();
generateBoard();
selectColour();
squaresPainting();
cleanBoard();
