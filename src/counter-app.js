import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import '@haxtheweb/multiple-choice/lib/confetti-container.js';


export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.max = 21;
    this.min = 0;
  }

  static get properties() {
    return {
      count: { type: Number, reflect: true },
      min: {type: Number},
      max: {type: Number}
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        text-align: center;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-s);
      }

      .count {
        font-size: var(--ddd-font-size-l);
        color: var(--ddd-theme-default-limestoneGray);

      }
      
      .Button:disabled {
        opacity: 0.5
      }

      .Button:hover {
        background-color: var(--ddd-theme-default-slateGray);
      }


      :host([count="21"]) .count {
        color: var(--ddd-theme-default-keystoneYellow);
      } 

      :host([count="18"]) .count {
        color: var(--ddd-theme-default-forestGreen);
      } 

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      
      .Button {
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-nittanyNavy);
        border-radius: var(--ddd-radius-sm);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
        margin: var(--ddd-spacing-2)
      }
    `];
  }
  
  updated(changedProperties) {
    if (changedProperties.has('count')) {
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  increment(e)
  {
    if(this.count < this.max)
    {
      this.count++;
    }
  }

  decrement(e)
  {
    if(this.count > this.min)
    {
      this.count--;
    }
  }

  render() {
    return html`
      <div class="wrapper">
      <confetti-container id="confetti">
        <div class="count">
          <slot name="count">${this.count}</slot>
        </div>
        <button class="Button" @click="${this.increment}" ?disabled="${this.count >= this.max}">+</button>
        <button class="Button" @click="${this.decrement}" ?disabled="${this.count <= this.min}">-</button>
        </confetti-container>
      </div>
    `;
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);