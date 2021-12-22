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

export const distributeAnimation = (initPosition, firstPosition, cardElement) => {
    cardElement.style.top = `${initPosition.y}px`;
    cardElement.style.left = `${initPosition.x}px`;
    requestAnimationFrame(() => {
        cardElement.style.transform = `translate(${firstPosition.x - initPosition.x}px, ${firstPosition.y - initPosition.y}px)`;
        cardElement.style.transition = 'transform 0.3s ease-in-out';
    });
}