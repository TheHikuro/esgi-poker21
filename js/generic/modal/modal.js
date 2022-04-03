import { func } from "../index.js";
import { leaderboard } from "../../leaderboard/index.js";

const Modal = (m_title, modal_body) => {
    const modal = func.createHtmlElement('div', 'modal', ['modal']);
    const modal_background = func.createHtmlElement('div', 'modal-background', ['modal-background']);
    // const modal_content = func.createHtmlElement('div', 'modal-content', ['modal-content']);
    const modal_header = func.createHtmlElement('div', 'modal-header', ['modal-header']);
    const modal_title = func.createHtmlElement('h5', 'modal-title', ['modal-title']);
    //const modal_body = func.createHtmlElement('div', 'modal-body', ['modal-body']);
    const modal_close = func.createHtmlElement('button', 'modal-close', ['modal-close']);

    modal_title.innerHTML = m_title;
    //modal_body.innerHTML = content;
    modal_close.innerHTML = 'X';

    modal_header.appendChild(modal_title);
    modal_header.appendChild(modal_close);
    modal.appendChild(modal_header);
    modal.appendChild(modal_body);
    modal.appendChild(modal_background);
    // modal.appendChild(modal_content);

    modal_close.addEventListener('click', () => {
        modal.style.display = "none";
    });

    document.body.appendChild(modal);

}


const modalWin = () => {
  const array = ["Vous avez gagné", "2-10 contre dealer"];
  Modal("Victory 🥳", array.join("<br>"));
};


const modalLead = () => {
  
  const modal_body = func.createHtmlElement("div", "modal-body", [
    "modal-body",
  ]);

  //leaderboard
  const info_score = func.createHtmlElement("div", "info-score", [
    "info-score",
  ]);

  //Titre score
  const score_title = func.createHtmlElement("h2", "score-title", [
    "score-title",
  ]);
  score_title.innerHTML = "Score player";

  //nombre de win black jack
  const title_blackjack = func.createHtmlElement("div", "title-blackjack", [
    "title-blackjack",
  ]);
  const score_blackjack = func.createHtmlElement("span", "score-blackjack", [
    "score-blackjack",
  ]);
  title_blackjack.innerHTML = "Black Jack : ";
  score_blackjack.innerHTML = "Aucun";
  title_blackjack.appendChild(score_blackjack);

  //nombre de win contre le dealer
  const title_win = func.createHtmlElement("div", "title-win", ["title-win"]);
  const score_win = func.createHtmlElement("span", "score-win", ["score-win"]);
  title_win.innerHTML = "Win : ";
  score_win.innerHTML = "Aucune";
  title_win.appendChild(score_win);

  //nombre de défaites
  const title_lose = func.createHtmlElement("div", "title-lose", [
    "title-lose",
  ]);
  const score_lose = func.createHtmlElement("span", "score-lose", [
    "score-lose",
  ]);
  title_lose.innerHTML = "Loose : ";
  score_lose.innerHTML = "Aucune";
  title_lose.appendChild(score_lose);

  info_score.appendChild(score_title);
  info_score.appendChild(title_blackjack);
  info_score.appendChild(title_win);
  info_score.appendChild(title_lose);

  //history games
  const info_history = func.createHtmlElement("div", "info-history", [
    "info-history",
  ]);
  //Titre historique
  const history_title = func.createHtmlElement("h2", "score-history", [
    "score-title",
  ]);
  history_title.innerHTML = "History games";


  modal_body.appendChild(info_score);
  modal_body.appendChild(history_title);
  modal_body.appendChild(info_history);

  Modal("Leaderboard", modal_body);
}


export { modalWin, modalLead };