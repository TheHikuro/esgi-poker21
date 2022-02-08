import { func } from "../index.js";

const Modal = (m_title, content) => {
    const modal = func.createHtmlElement('div', 'modal', ['modal']);
    const modal_background = func.createHtmlElement('div', 'modal-background', ['modal-background']);
    // const modal_content = func.createHtmlElement('div', 'modal-content', ['modal-content']);
    const modal_header = func.createHtmlElement('div', 'modal-header', ['modal-header']);
    const modal_title = func.createHtmlElement('h5', 'modal-title', ['modal-title']);
    const modal_body = func.createHtmlElement('div', 'modal-body', ['modal-body']);
    const modal_close = func.createHtmlElement('button', 'modal-close', ['modal-close']);

    modal_title.innerHTML = m_title;
    modal_body.innerHTML = content;
    modal_close.innerHTML = 'X';

    modal_header.appendChild(modal_title);
    modal_header.appendChild(modal_close);
    modal.appendChild(modal_header);
    modal.appendChild(modal_body);
    modal.appendChild(modal_background);
    // modal.appendChild(modal_content);

    modal_close.addEventListener('click', () => {
        modal.remove();
    });

    document.body.appendChild(modal);

}

const modalWin = () => {
    const array = ['Vous avez gagné', '2-10 contre dealer']
    Modal('Victory 🥳', array.join('<br>'));
}

export { modalWin };