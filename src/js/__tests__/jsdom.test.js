import CardIdentifier from "../CardIdentifier";
import FormWidget from "../FormWidget";

const { JSDOM } = require("jsdom");

test("widget should render", () => {
  const dom = new JSDOM('<!DOCTYPE html><div class="container"></div>');
  global.document = dom.window.document;

  const container = document.querySelector(".container");
  const cardIdentifier = new CardIdentifier();
  const widget = new FormWidget(container, cardIdentifier);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(FormWidget.markup);
});

test.each([
  ["371449635398431", "amex"],
  ["346519360365268", "amex"],

  ["6011453881559574", "discover"],
  ["6011678985545521", "discover"],

  ["4485111551193569", "visa"],
  ["4388529697885", "visa"],

  ["3545955630549781", "jcb"],
  ["356175613241302327", "jcb"],

  ["2201382000000013", "mir"],
  ["22033462521784956", "mir"],

  ["5115182727233360", "master"],
  ["5506809153279973", "master"],
])("the number %i belongs to %s payment system", (cardNumber) => {
  const dom = new JSDOM('<!DOCTYPE html><div class="container"></div>');
  global.document = dom.window.document;

  const container = document.querySelector(".container");
  const cardIdentifier = new CardIdentifier();
  const widget = new FormWidget(container, cardIdentifier);

  widget.bindToDOM();

  const submit = document.querySelector(FormWidget.submitSelector);
  const input = document.querySelector(FormWidget.inputSelector);

  input.value = cardNumber;
  submit.click();

  expect(input.classList.contains("valid")).toEqual(true);
});

test("widget should add invalid class", () => {
  const dom = new JSDOM('<!DOCTYPE html><div class="container"></div>');
  global.document = dom.window.document;

  const container = document.querySelector(".container");
  const cardIdentifier = new CardIdentifier();
  const widget = new FormWidget(container, cardIdentifier);

  widget.bindToDOM();

  const submit = document.querySelector(FormWidget.submitSelector);
  const input = document.querySelector(FormWidget.inputSelector);

  input.value = "7715964180";
  submit.click();

  expect(input.classList.contains("invalid")).toEqual(true);
});
