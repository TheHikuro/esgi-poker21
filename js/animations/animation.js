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
    deckElement.childNodes.forEach(card => {
        //do something
    });
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

export { createDeck, shuffleDeck, distributeCard, flipCard}