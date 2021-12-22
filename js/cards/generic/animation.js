export const deckAnimation = (element, nameKeyFrame, time) => {
    requestAnimationFrame(() => {
        element.style.animationName = nameKeyFrame;
        element.style.animationDuration = time;
        element.style.animationTimingFunction = 'ease-in-out';
        element.style.animationFillMode = 'forwards';
    });
}

export const shuffleDeckAnimation = () => {
    deckElement.childNodes.forEach(card => {
        //do something
    });
}

export const distributeAnimation = (clonedFirstDeckCard, firstDeckCard) => {
    let cardInitialPosition = {
        x: clonedFirstDeckCard.offsetLeft,
        y: clonedFirstDeckCard.offsetTop
    };

    let cardFinalPosition = {
        x: firstDeckCard.offsetLeft,
        y: firstDeckCard.offsetTop
    };

    requestAnimationFrame(() => {
        clonedFirstDeckCard.style.transform = `translate(${cardFinalPosition.x - cardInitialPosition.x}px, ${cardFinalPosition.y - cardInitialPosition.y}px)`;
        clonedFirstDeckCard.style.transition = 'transform 0.3s ease-in-out';
    });
}