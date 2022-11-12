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
    const btn = document.querySelector('#btn');




    // create L element 
    let roteteStateElement = 0;
    let positionElement = 0;
    let lElement = [];
    // let timerId = setInterval(moveDown, 1000);

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
            moveDown();
        }  
    });
    
    btn.addEventListener('click', () => {
        // clearInterval(timerId);
        splice();

    });

    function moveLeft() {
        
        if (tetrisElement[roteteStateElement].some(item => item % cell == 0)) {
            return;
        }
        positionElement--;
        drawElement();
    }

    function moveRight() {

        if (tetrisElement[roteteStateElement].some(item => (item - 9) % cell == 0)) {
            return;
        }
        positionElement++;
        drawElement();

    }


    function rotate() {
        roteteStateElement++;
        if (roteteStateElement == tetrisElement.length) {
            roteteStateElement = 0;
        }
        drawElement();
        

    }

    function moveDown() {
        positionElement += 10;
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
        //left right collizion
        // if (tetrisElement[roteteStateElement].some(item => item % 10 == 0)) {
        //     positionElement++;
        // } else if (tetrisElement[roteteStateElement].some(item => (item - 9) % 10 == 0)) {
        //     positionElement--;
        // }
        // bottom collizion
        let collizionBottom = tetrisElement[roteteStateElement].some(item => item >= 190 && item < 200  ||
            fildElemts[item + cell].matches('.bottom')
             );


        if (collizionBottom ) {

            tetrisElement[roteteStateElement].forEach(item => {

                fildElemts[item].classList.add('bottom');
                fildElemts[item].classList.remove('show');
                positionElement = 0;
                createElement();
                return;
            });

        }
        tetrisElement[roteteStateElement].forEach(item => {
            fildElemts[item].classList.add('show');
        });



    }

    
   

    function splice() {
        fildElemts.splice(10, 180);
        console.log(fildElemts.length);


    }



});