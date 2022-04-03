import { func } from "../generic/index.js";

const init = () => {
  const boardAreaElement = func.getDynamicElementById("board-container");

  
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
  const title_lose = func.createHtmlElement("div", "title-lose", ["title-lose"]);
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

  info_history.appendChild(history_title);



  boardAreaElement().appendChild(info_score);
  boardAreaElement().appendChild(info_history);

};


//affiche le résultat d'un black jack dans l'historique
const getBlackJackResult = () => {
  const info_history = func.getDynamicElementById("info-history");

  //met à jour le score
  const score_blackjack = func.getDynamicElementById("score-blackjack");
  score_blackjack().innerHTML = localStorage.getItem("nbBlackJackWin");

  //info loose
  const info_blackjack = func.createHtmlElement("p", "info-blackjack", [
    "info-blackjack",
  ]);

  let result = "Black Jack ! ";

  info_blackjack.innerHTML = result;

  const hr = func.createHtmlElement("hr");

  info_history().appendChild(info_blackjack);
  info_history().appendChild(hr);
};



//affiche votre réussite dans l'historique
const getWinResult = (playerScore, dealerScore) => {
  const info_history = func.getDynamicElementById("info-history");

  //met à jour le score
  const score_win = func.getDynamicElementById("score-win");
  score_win().innerHTML = localStorage.getItem("nbWin");

  //info win
  const info_win = func.createHtmlElement("p", "info-win", ["info-win"]);

  let result =
    "Vous avez gagné ! <br />" +
    localStorage.getItem("username") +
    " : " +
    playerScore +
    " | Dealer : " +
    dealerScore;

  info_win.innerHTML = result;

  const hr = func.createHtmlElement("hr");

  info_history().appendChild(info_win);
  info_history().appendChild(hr);
};



//affiche votre échec dans l'historique
const getLooseResult = (playerScore, dealerScore) => {
  const info_history = func.getDynamicElementById("info-history");

  //met à jour le score
  const score_lose = func.getDynamicElementById("score-lose");
  score_lose().innerHTML = localStorage.getItem("nbLoose");

  //info loose
  const info_loose = func.createHtmlElement("p", "info-lose", ["info-lose"]);

  let result =
    "Vous avez perdu ! <br />" +
    localStorage.getItem("username") +
    " : " +
    playerScore +
    " | Dealer : " +
    dealerScore;

  info_loose.innerHTML = result;

  const hr = func.createHtmlElement("hr");

  info_history().appendChild(info_loose);
  info_history().appendChild(hr);
};


export { init, getBlackJackResult, getLooseResult, getWinResult };