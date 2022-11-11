document.addEventListener('DOMContentLoaded', () => {

    // createGameField
    const cell = 10;
    const game = document.querySelector('#game');
    for (let i = 0; i < 200; i++) {
        const fildElem = document.createElement('div');
        fildElem.classList.add('fildElem');
        game.append(fildElem);
    }

    const fildElemts = Array.from(game.querySelectorAll('.fildElem'));




    // create L element 
    let roteteStateElement = 0;
    let positionElement = 0;
    let lElement = [];

    function createElement() {
        lElement = [
            [positionElement, positionElement + cell, positionElement + cell * 2, positionElement + 1 + cell * 2],
            [positionElement + cell, positionElement, positionElement + 1, positionElement + 2],
            [positionElement, positionElement + 1, positionElement + cell + 1, cell * 2 + 1 + positionElement],
            [positionElement + cell, positionElement + cell + 1, positionElement + cell + 2, positionElement + 2]
        ];

        tetrisElement = lElement;

    }



    let tetrisElement;

    document.addEventListener('keydown', (e) => {
        if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
            moveLeft();
        } else if (e.code == 'ArrowRight' || e.code == 'KeyD') {
            moveRight();
        } else if (e.code == 'ArrowUp' || e.code == 'KeyW') {
            rotate();

        } else if (e.code == 'ArrowDown' || e.code == 'KeyS') {

        }
    });

    function moveLeft() {
        positionElement--;
        if (lElement[roteteStateElement].some(item => (item ) % 10 == 0)) {
            positionElement++; 
        }
        drawElement();

    }

    function moveRight() {
        positionElement++;
        if (lElement[roteteStateElement].some(item => (item - 9) % 10 == 0)) {
            positionElement--; 
        }
        drawElement();

    }


    function rotate() {
        roteteStateElement++;
        if (roteteStateElement == tetrisElement.length - 1) {
            roteteStateElement = 0;
        }
        drawElement();

    }

    function clearElement() {
        fildElemts.forEach(item => {
            item.classList.remove('show');
        });
    }

    function drawElement() {
        clearElement();
        createElement();

        tetrisElement[roteteStateElement].forEach(item => {
            fildElemts[item].classList.add('show');
        });

        
        console.log(tetrisElement[roteteStateElement]);
    }


 drawElement();





});