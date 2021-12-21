export const createElement = (type, id) => {
    const element = window.document.createElement(type);
    if (id) {
        element.id = id;
    }
    return element;
}