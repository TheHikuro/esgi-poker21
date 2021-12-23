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

export const distributeAnimation = (moveElement, oldRect, newRect, time) => {
    let finalLeft = oldRect.left - newRect.left;
    let finalTop = oldRect.top - newRect.top;

    moveElement.style.left = `${finalLeft}px`;
    moveElement.style.top = `${finalTop}px`;

    moveElement.style.animationTimingFunction = 'ease-in-out';
    moveElement.style.animationFillMode = 'forwards';
    moveElement.style.transform = `translate(${-finalLeft}px, ${-finalTop}px) rotateY(180deg)`;
    moveElement.style.transition =  `all ${time} ease-in-out`;
}