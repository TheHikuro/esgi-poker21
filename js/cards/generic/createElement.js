export const createElement = (type, id, classNames) => {
    const element = window.document.createElement(type);
    if (id) {
        element.id = id;
    }
    if(classNames) {
        element.classList.add(...classNames);
    }
    return element;
}