import { func } from "../generic/index.js";

const infoScorePlayer = () => {
  const boardAreaElement = func.getDynamicElementById('board-container');

  const info_score = func.createHtmlElement("div", "info-score", [
    "info-score",
  ]);

  //TODO nb de manché gagné/perdu

  const score_title = func.createHtmlElement("h5", "score-title", [
    "score-title",
  ]);
  const info_card = func.createHtmlElement("div", "info-card", ["info-card"]);

  score_title.innerHTML = "Score player : le";

  info_card.innerHTML = "";

  info_score.appendChild(score_title);
  info_score.appendChild(info_card);

  boardAreaElement().appendChild(info_score);
};


export { infoScorePlayer };