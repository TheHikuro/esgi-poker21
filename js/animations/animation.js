import { func } from '../generic/index.js';

const myCustomAnimation = (element, nameKeyFrame, time, fillMode, smooth, transform) => {
    element.style.animationName = nameKeyFrame || null;
    element.style.animationDuration = time;
    element.style.animationTimingFunction = smooth;
    element.style.animationFillMode = fillMode;
    element.style.transition =  `all ${time} ${smooth}`;
    element.style.transform = transform || null;
}

// Deck creation animation
const createDeck = (element, nameKeyFrame, time) => {
    requestAnimationFrame(() => {
        myCustomAnimation(element, nameKeyFrame, time, 'forwards', 'ease-in-out');
    });
}

// Shuffle animation
const shuffleDeck = () => {
    const leftPile = []
    const rightPile = []
    const deckElement = document.querySelector('.deck');
    
    for(let i = 0; i < deckElement.children.length; i++){
        if(i % 2 === 0){
            leftPile.push(deckElement.children[i]);
        }
        else{
            rightPile.push(deckElement.children[i]);
        }
    }
    requestAnimationFrame(() => {
        for(let i = 0; i < leftPile.length; i++){
            myCustomAnimation(leftPile[i], 'shuffle-left', `${i * 0.02}s`, 'forwards', 'ease-in-out');
        }
        for(let i = 0; i < rightPile.length; i++){
            myCustomAnimation(rightPile[i], 'shuffle-right', `${i * 0.02}s`, 'forwards', 'ease-in-out');
        }
    })
}

// Card distribution animation
const distributeCard = (moveElement, oldRect, newRect, time) => {
    let finalLeft = oldRect.left - newRect.left;
    let finalTop = oldRect.top - newRect.top;

    moveElement.style.left = `${finalLeft}px`;
    moveElement.style.top = `${finalTop}px`;

    moveElement.style.animationTimingFunction = 'ease-in-out';
    moveElement.style.animationFillMode = 'forwards';
    moveElement.style.transform = `translate(${-finalLeft}px, ${-finalTop}px)`;
    moveElement.style.transition =  `all ${time} ease-in-out`;
}

// Flip card animation
const flipCard = (card, time) => {
    myCustomAnimation(card, 'flipCard', `${time}s`, 'forwards', 'ease-in-out', `translate(${-parseFloat(card.style.left)}px, ${-parseFloat(card.style.top)}px) rotateY(180deg)`);
}

const winAnimation = (winOrLose) => {
    const backContainer = func.createHtmlElement('div', 'backContainer', ['backContainer']);
    const textContainer = func.createHtmlElement('div', 'textContainer', ['textContainer']);
    const arrOfText = ['You win', 'You lose'];
    const text = func.createHtmlElement('h1', 'winOrLose', ['winOrLose']);
    const imgBlacJack = func.createHtmlElement('img', 'imgBlacJack', ['imgBlacJack']);
    const win = func.splitArrayInLetters(arrOfText)

    switch (winOrLose) {
        case 'win':
            myCustomAnimation(textContainer, 'gameStatus', '1s', 'forwards', 'ease-in-out');
            myCustomAnimation(text, 'textGameStatus', '4s', 'forwards', 'ease-in-out');
            text.innerHTML = `${win[0].join('')} 🥳`;
            break;
        case 'lose':
            myCustomAnimation(textContainer, 'gameStatus', '1s', 'forwards', 'ease-in-out');
            myCustomAnimation(text, 'textGameStatus', '4s', 'forwards', 'ease-in-out');
            text.innerHTML = `${win[1].join('')} 😢`;
            break;
        case 'blackjack':
            textContainer.appendChild(imgBlacJack);
            textContainer.style.backgroundColor = 'transparent';
            textContainer.style.boxShadow = 'none';
            imgBlacJack.src = '../../assets/img/blackjack.png';
            myCustomAnimation(imgBlacJack, 'blackjack-appaear', '1s', 'forwards', 'ease-in-out');
            break;
    }

    textContainer.appendChild(text);
    backContainer.appendChild(textContainer);
    document.body.appendChild(backContainer);

    text.addEventListener('animationend', () => {
        backContainer.remove();
    })
    imgBlacJack.addEventListener('animationend', () => {
        setTimeout(() => {
            backContainer.remove();
        } , 1000);
    })
}

export { createDeck, shuffleDeck, distributeCard, flipCard, winAnimation };