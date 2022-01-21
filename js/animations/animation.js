import { func } from '../generic/index.js';

// Deck creation animation
const createDeck = (element, nameKeyFrame, time) => {
    requestAnimationFrame(() => {
        element.style.animationName = nameKeyFrame;
        element.style.animationDuration = time;
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
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
            leftPile[i].style.animationName = 'shuffle-left';
            leftPile[i].style.animationDuration = `${i * 0.02}s`;
            leftPile[i].style.animationTimingFunction = 'ease-in-out';
            leftPile[i].style.animationFillMode = 'forwards';
            leftPile[i].style.transition =  `all ${i * 0.02}s ease-in-out`;
        }
        for(let i = 0; i < rightPile.length; i++){
            rightPile[i].style.animationName = 'shuffle-right';
            rightPile[i].style.animationDuration = `${i * 0.02}s`;
            rightPile[i].style.animationTimingFunction = 'ease-in-out';
            rightPile[i].style.animationFillMode = 'forwards';
            rightPile[i].style.transition =  `all ${i * 0.02}s ease-in-out`;
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
    card.style.animationTimingFunction = 'ease-in-out';
    card.style.animationFillMode = 'forwards';
    card.style.transform = `translate(${-parseFloat(card.style.left)}px, ${-parseFloat(card.style.top)}px) rotateY(180deg)`;
    card.style.transition =  `all ${time}`;
}

const winAnimation = (winOrLose) => {
    const backContainer = func.createHtmlElement('div', 'backContainer', ['backContainer']);
    const textContainer = func.createHtmlElement('div', 'textContainer', ['textContainer']);
    const arrOfText = ['You win', 'You lose'];
    const text = func.createHtmlElement('h1', 'winOrLose', ['winOrLose']);
    const win = func.splitArrayInLetters(arrOfText)

    textContainer.style.animationName = 'gameStatus'
    textContainer.style.animationDuration = '1s'
    textContainer.style.animationTimingFunction = 'ease-in-out'
    textContainer.style.animationFillMode = 'forwards'
    textContainer.style.transition =  'all 0.5s ease-in-out'

    text.style.animationName = 'textGameStatus'
    text.style.animationDuration = '4s'
    text.style.animationTimingFunction = 'ease-in-out'
    text.style.animationFillMode = 'forwards'
    text.style.transition =  'all 1s ease-in-out'

    winOrLose ? text.innerHTML = `${win[0].join('')} 🥳` : text.innerHTML = `${win[1].join('')} 😢`;

    textContainer.appendChild(text);
    backContainer.appendChild(textContainer);
    document.body.appendChild(backContainer);

    text.addEventListener('animationend', () => {
        backContainer.remove();
    })
}

export { createDeck, shuffleDeck, distributeCard, flipCard, winAnimation };