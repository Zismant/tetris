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
    let positionElement = 4;
    const lElement = [
        [1, 1 + cell, 1 + cell * 2, 2],
        [cell, 1 + cell, 2 + cell, 2 + cell * 2],
        [cell * 2,  1, cell + 1, cell * 2 + 1 ],
        [cell,  cell * 2,  1 + cell * 2,  2 + cell * 2]
    ];
    let tetrisElement = lElement[roteteStateElement];
    
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

    function moveLeft() {
        clearElement();
        
        if (!tetrisElement.some(item => (item + positionElement) % cell == 0)) {
        positionElement --;  
        }
        
        drawElement();
    }
    function moveRight() {
        clearElement();
        
        if (!tetrisElement.some(item => (item + positionElement - 9) % cell == 0)) {
            positionElement++;  
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
                positionElement ++;
                checkRotateCollision(pos);

            }
        }

        else if (pos % cell > 5) {
            if (isLeft()) {
                positionElement --;
                checkRotateCollision(pos);
            }
        }
        
    
    }


    function rotate() {
        clearElement();
        roteteStateElement++;
        if (roteteStateElement == tetrisElement.length) {
            roteteStateElement = 0;
        }
        tetrisElement = lElement[roteteStateElement];
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
        
        

        
  
        // bottom collizion
        // let collizionBottom = tetrisElement[roteteStateElement].some(item => item >= 190 && item < 200  ||
        //     fildElemts[item + cell].matches('.bottom')
        //      );


        // if (collizionBottom ) {

        //     tetrisElement[roteteStateElement].forEach(item => {
        //         fildElemts[item].classList.add('bottom');
        //         fildElemts[item].classList.remove('show');
        //         positionElement = 0;
        //         createElement();
        //         return;
        //     });

        // }
       
        tetrisElement.forEach(item => {
            fildElemts[item + positionElement].classList.add('show');
        });


        function collizion() {

        }

       
        

    }


    

    
   

    // function splice() {
    //     fildElemts.splice(10, 180);
    //     console.log(fildElemts.length);
    // }

    drawElement();
    
});