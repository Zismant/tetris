document.addEventListener('DOMContentLoaded', () => {

    // createGameField
    const cell = 10;
    const game = document.querySelector('#game');
    for (let i = 0; i < 200; i++) {
        const fildElem = document.createElement('div');
        fildElem.classList.add('fildElem');
        game.append(fildElem);
    }

    const score = document.querySelector('span');
    let scoreItem = 0;
    score.textContent = 0;

    let fildElemts = Array.from(game.querySelectorAll('.fildElem'));
    const btn = document.querySelector('#btn');



    // create L element 
    const lElement = [
        [1, 1 + cell, 1 + cell * 2, 2],
        [cell, 1 + cell, 2 + cell, 2 + cell * 2],
        [cell * 2, 1, cell + 1, cell * 2 + 1],
        [cell, cell * 2, 1 + cell * 2, 2 + cell * 2]
    ];

    // create O element 
    const oElement = [
        [1, 2, 1 + cell, 2 + cell],
        [1, 2, 1 + cell, 2 + cell],
        [1, 2, 1 + cell, 2 + cell],
        [1, 2, 1 + cell, 2 + cell]
    ];

    // create Z element
    const zElement = [
        [1, 2, cell, cell + 1],
        [0, cell, cell + 1, 2 * cell + 1],
        [1, 2, cell, cell + 1],
        [0, cell, cell + 1, 2 * cell + 1]

    ];

    // create I element
    const iElement = [
        [1, 1 + cell, 1 + cell * 2, 1 + cell * 3],
        [cell, cell + 1, cell + 2, cell + 3],
        [1, 1 + cell, 1 + cell * 2, 1 + cell * 3],
        [cell, cell + 1, cell + 2, cell + 3]

    ];

    // create T element
    const tElement = [
        [1, cell, cell + 1, cell + 2],
        [1, cell + 1, 2 * cell + 1, cell + 2],
        [cell, 1 + cell, cell + 2, 1 + cell * 2],
        [cell, 1, cell + 1, 2 * cell + 1]

    ];

    const elements = [lElement, oElement, zElement, iElement, tElement];

    let roteteStateElement = random(0, 3);
    let positionElement = 4;
    let tetrisElementStart = elements[random(0, elements.length - 1)];


    let tetrisElement = tetrisElementStart[roteteStateElement];
    // let tetrisElement = elements[2][1];

    // let timerId = setInterval(moveDown, 1000);





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
        // splice();
    });

    function random(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    function moveLeft() {
        clearElement();

        if (!tetrisElement.some(item => (item + positionElement) % cell == 0)) {
            positionElement--;
        }

        if (tetrisElement.some(item => fildElemts[item + positionElement].matches('.bottom'))) {
            positionElement++;
        }

        drawElement();
    }

    function moveRight() {
        clearElement();

        if (!tetrisElement.some(item => (item + positionElement - 9) % cell == 0)) {
            positionElement++;
        }

        if (tetrisElement.some(item => fildElemts[item + positionElement].matches('.bottom'))) {
            positionElement--;
        }
        drawElement();

    }

    function isLeft() {
        return tetrisElement.some(item => (item + positionElement) % cell == 0);
    }

    function isRight() {
        return tetrisElement.some(item => (item + positionElement + 1) % cell == 0);
    }

    function checkRotateCollision(pos) {
        pos = pos || positionElement;

        if ((pos + 1) % cell < 4) {
            if (isRight()) {
                positionElement++;
                checkRotateCollision(pos);

            }
        } else if (pos % cell > 5) {
            if (isLeft()) {
                positionElement--;
                checkRotateCollision(pos);
            }
        }


    }


    function rotate() {
        clearElement();
        roteteStateElement++;
        if (roteteStateElement == 4) {
            roteteStateElement = 0;
        }
        tetrisElement = tetrisElementStart[roteteStateElement];
        checkRotateCollision();
        drawElement();


    }

    function moveDown() {
        clearElement();

        positionElement += cell;
        drawElement();
    }

    function clearElement() {
        tetrisElement.forEach(item => {
            fildElemts[item + positionElement].classList.remove('show');
        });
    }

    function drawElement() {
        if (gameOver()) {
            collizionBottom();
            addScore();

            tetrisElement.forEach(item => {
                fildElemts[item + positionElement].classList.add('show');
            });
        }
      





    }

    function collizionBottom() {
        let collizionBottomLeft = tetrisElement.some(item => (item + positionElement) > 189);
        let collizionBottomRight = tetrisElement.some(item => (item + positionElement) < 200);
        let collizionElement = collizionBottomLeft && collizionBottomRight ? false : tetrisElement.some(item => (fildElemts[item + positionElement + cell].matches('.bottom')));
        if ((collizionBottomLeft && collizionBottomRight) || collizionElement) {
            tetrisElement.forEach(item => {
                fildElemts[item + positionElement].classList.add('bottom');
            });
            clearElement();
            positionElement = 4;
            roteteStateElement = random(0, 3);
            tetrisElementStart = elements[random(0, elements.length - 1)];
            tetrisElement = tetrisElementStart[roteteStateElement];
            drawElement();
            return;

        }

    }

    function addScore() {
        for (let i = 0; i < 199; i += cell) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (row.every(index => fildElemts[index].matches('.bottom'))) {
                scoreItem += 10;
                score.textContent = scoreItem;
                row.forEach(index => {
                    fildElemts[index].classList.remove('bottom');
                    fildElemts[index].classList.remove('show');
                });
                const fildElemtsRemoved = fildElemts.splice(i, cell);
                fildElemts = fildElemtsRemoved.concat(fildElemts);
                fildElemts.forEach(cell => game.appendChild(cell));

            }
        }
    }

    function gameOver() {
        for (let i = 0; i < 30; i++) {
            if (fildElemts[i].matches('.bottom')) {
                
                alert(`Game Over. Score: ${scoreItem}`);
               fildElemts.forEach(item => {
                item.classList.remove('bottom');
                item.classList.remove('show');
               });
                
                positionElement = 4;
                roteteStateElement = random(0, 3);
                tetrisElementStart = elements[random(0, elements.length - 1)];
                tetrisElement = tetrisElementStart[roteteStateElement];
                
                return false;
            }
        }
        return true;
        


    }







    // function splice() {
    //     fildElemts.splice(10, 180);
    //     console.log(fildElemts.length);
    // }

    drawElement();

});