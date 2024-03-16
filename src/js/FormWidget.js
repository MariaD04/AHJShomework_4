export default class FormWidget {
  constructor(parentEl, cardIdentifier) {
    this.parentEl = parentEl;
    this.cardIdentifier = cardIdentifier;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <h3>Check your credit card number</h3>
        <ul class="cards">
            <li><span class="card visa" title="Visa">Visa</span></li>
            <li><span class="card master" title="Mastercard">Mastercard</span></li>
            <li><span class="card amex" title="American Express">American Express</span></li>
            <li><span class="card discover" title="Discover">Discover</span></li>
            <li><span class="card jcb" title="JCB International">JCB International</span></li>
            <li><span class="card mir" title="Mir">Mir</span></li>
        </ul>
        <form id="form" class="cardnumber-form-widget">
            <div class="control">
              <input class="form-control" id="card_number" name="card_number" type="text" placeholder="Credit card number" data-original-title="" title="">
            </div>
            <button class="submit" id="submit_btn">Click to Validate</button>
        </form>
        `;
  }

  static get submitSelector() {
    return ".submit";
  }

  static get inputSelector() {
    return ".form-control";
  }

  static get cardSelector() {
    return ".card";
  }

  static get selector() {
    return ".cardnumber-form-widget";
  }

  bindToDOM() {
    this.parentEl.innerHTML = FormWidget.markup;

    this.element = this.parentEl.querySelector(FormWidget.selector);
    this.submit = this.element.querySelector(FormWidget.submitSelector);
    this.input = this.element.querySelector(FormWidget.inputSelector);

    this.element.addEventListener("submit", this.onSubmit);
    this.element.addEventListener("keydown", (event) => {
      if (event.code == "Backspace" || event.code == "46") {
        this.onDelete();
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.input.classList.remove("valid", "invalid");
    const cards = this.parentEl.querySelectorAll(FormWidget.cardSelector);
    cards.forEach((card) => {
      card.classList.remove("disabled");
    });

    let result = this.cardIdentifier.identifyCard(this.input.value);
    if (!result) {
      this.input.classList.add("invalid");
    } else {
      this.input.classList.add("valid");
      cards.forEach((card) => {
        if (!card.classList.contains(result.toLowerCase())) {
          card.classList.add("disabled");
        }
      });
    }
  }

  onDelete() {
    this.input.classList.remove("valid", "invalid");
    const cards = this.parentEl.querySelectorAll(FormWidget.cardSelector);
    cards.forEach((card) => {
      card.classList.remove("disabled");
    });
  }
}
