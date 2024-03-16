import CardIdentifier from "./CardIdentifier";
import FormWidget from "./FormWidget";

const cardIdentifier = new CardIdentifier();
const container = document.querySelector(".container");

const widget = new FormWidget(container, cardIdentifier);
widget.bindToDOM();
