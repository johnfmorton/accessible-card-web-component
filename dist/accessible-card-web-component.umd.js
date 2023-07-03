/**
 * name: accessible-card-web-component
 * version: v1.0.0
 * description: This is a templare repo that will create a Vite workflow to ease creation of Javascript modules with a dev server, GitHub Pages support and automated publishing to NPM.
 * author: John F. Morton <john@johnfmorton.com> (https://supergeekery.com)
 * repository: https://github.com/johnfmorton/accessible-card-web-component
 * build date: 2023-07-03T11:57:56.130Z 
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["accessible-card-web-component"] = {}));
})(this, function(exports2) {
  "use strict";
  const template = `
    <style>
        :host {
            display: block;
            border: 1px solid black;
        }
        #card-image {
            width: 100%;
        }
        .card {
          position: relative;
            display: flex;
            flex-direction: column;
            /* reverse the order of the children */
            flex-direction: column-reverse;
            height: 100%;
            border-radius: 16px;
            border-width: 0;

            background: #fff;
            box-sizing: border-box;
            border: 1px solid rgba(24, 24, 24, 0.04);
            box-shadow: 0 2px 8px -2px rgba(24, 24, 24, 0.08), 0 8px 12px -2px rgba(24, 24, 24, 0.16);
            top: 0;
            transition: all 0.2s ease-in-out;
            outline: 2px solid transparent;
        }

        .card a {
            text-decoration: none;
        }

        #card-title::part(headline) {
            line-height: 1.25;
        };

        .card:hover {
          outline: 4px solid #155daa;

          box-shadow: 0 2px 8px -2px rgba(24, 24, 24, 0.08), 0 12px 12px -4px rgba(24, 24, 24, 0.16);


        }

        .card a:focus {
            text-decoration: underline;
        }

        .card:focus-within {
            outline: 4px solid #155daa;

          box-shadow: 0 2px 8px -2px rgba(24, 24, 24, 0.08), 0 12px 12px -4px rgba(24, 24, 24, 0.16);
        }

        .card:focus-within a:focus {
            text-decoration: none;
        }

        .card a::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }

        .card-image-wrapper {
            border-radius: 16px 16px 0 0;
            width: 100%;
            aspect-ratio: 16/9;
            overflow: hidden;
        }

        .card-content-wrapper {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: space-between;
        }

        .card-copy-wrapper {
            margin: 40px 40px 32px;
        }

        .card-cta-wrapper {
            margin: 0 40px 48px;
        }

        .card-shadow {
          background: #fff;
            box-sizing: border-box;
            border: 1px solid rgba(24, 24, 24, 0.04);
            box-shadow: 0 2px 8px -2px rgba(24, 24, 24, 0.08), 0 8px 12px -2px rgba(24, 24, 24, 0.16);
        }

    </style>
    <div class="card">
      <div class='card-content-wrapper'>
        <div class='card-copy-wrapper'>
          <slot></slot>
        </div>
      </div>
      <div class='card-image-wrapper'>
          <img id='card-image' />
      </div>
    </div>
`;
  class AccessibleCard extends HTMLElement {
    constructor() {
      console.log("constructor");
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      var _a;
      console.log("connectedCallback");
      const shadowRoot = this.shadowRoot;
      shadowRoot.innerHTML = template;
      (_a = shadowRoot.querySelector("slot")) == null ? void 0 : _a.addEventListener("slotchange", () => {
        console.log("slotchange");
        const slot = shadowRoot.querySelector("slot");
        const assignedNodes = slot.assignedNodes();
        if (assignedNodes.length > 0) {
          let titleTagType = "h2";
          if (this.hasAttribute("title-tag-type") && this.getAttribute("title-tag-type") !== null) {
            titleTagType = this.getAttribute("title-tag-type");
          }
          console.log("titleTagType", titleTagType);
          const title = document.createElement(titleTagType);
          title.setAttribute("id", "card-title");
          let titleLink;
          if (this.hasAttribute("cta-url") && this.getAttribute("cta-url") !== null) {
            titleLink = document.createElement("a");
            titleLink.setAttribute(
              "href",
              this.getAttribute("cta-url")
            );
            assignedNodes.forEach((node) => {
              titleLink.appendChild(node);
            });
            title.appendChild(titleLink);
          } else {
            assignedNodes.forEach((node) => {
              title.appendChild(node);
            });
          }
          console.log("title element", title);
          slot.innerHTML = "";
          slot.appendChild(title);
        }
      });
      createRestOfDOM.call(this, shadowRoot);
    }
    disconnectedCallback() {
      console.log("disconnectedCallback");
    }
  }
  function createRestOfDOM(shadowRoot) {
    if (this.hasAttribute("img-scr") && this.getAttribute("img-scr") !== null) {
      const img = shadowRoot.querySelector("#card-image");
      img.setAttribute("src", this.getAttribute("img-scr"));
      if (this.hasAttribute("img-alt") && this.getAttribute("img-alt") !== null) {
        img.setAttribute("alt", this.getAttribute("img-alt"));
      } else {
        img.setAttribute("alt", "Support image");
        img.setAttribute("aria-hidden", "true");
      }
    } else {
      const img = shadowRoot.querySelector("#card-image");
      const parent = img.parentElement;
      parent.remove();
    }
    if (this.hasAttribute("cta-text") && this.getAttribute("cta-text") !== null && this.hasAttribute("cta-url") && this.getAttribute("cta-url") !== null) {
      const ctaText = document.createElement("p");
      ctaText.setAttribute("id", "cta-text");
      ctaText.innerText = this.getAttribute("cta-text");
      ctaText.setAttribute("aria-hidden", "true");
      const slot = shadowRoot.querySelector("slot");
      slot.after(ctaText);
    }
    if (this.hasAttribute("support-text") && this.getAttribute("support-text") !== null) {
      const supportText = document.createElement("div");
      supportText.setAttribute("id", "support-text");
      supportText.innerText = this.getAttribute("support-text");
      const slot = shadowRoot.querySelector("slot");
      slot.after(supportText);
    }
  }
  exports2.AccessibleCard = AccessibleCard;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
