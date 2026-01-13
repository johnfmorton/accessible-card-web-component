/**
 * name: accessible-card-web-component
 * version: v1.1.0
 * description: This is a template repo that will create a Vite workflow to ease creation of Javascript modules with a dev server, GitHub Pages support and automated publishing to NPM.
 * author: John F. Morton <john@johnfmorton.com> (https://supergeekery.com)
 * repository: https://github.com/johnfmorton/accessible-card-web-component
 * build date: 2026-01-13T19:25:34.548Z 
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["accessible-card-web-component"] = {}));
})(this, function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

  const template = `<style>:host{display: block; border: 1px solid black; height: 100%;}div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, a, em, img, strong, b, u, i, center, dl, dt, dd, ol, ul, li, figure, figcaption, footer, header, hgroup, menu, nav, section, summary, time{margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;}#card-image{width: 100%;}.card{position: relative; display: flex; flex-direction: column; /* reverse the order of the children */ flex-direction: column-reverse; height: 100%; border-radius: 16px; border-width: 0; background: #fff; box-sizing: border-box; border: 1px solid rgba(24, 24, 24, 0.04); top: 0;}.card a{text-decoration: none; color: inherit;}#card-title{margin:0;}; .card a:focus{text-decoration: underline;}.card:focus-within{outline: 4px solid #155daa; box-shadow: 0 2px 8px -2px rgba(24, 24, 24, 0.08), 0 12px 12px -4px rgba(24, 24, 24, 0.16);}.card:focus-within a:focus{text-decoration: none;}.card a::after{content: ''; position: absolute; left: 0; top: 0; right: 0; bottom: 0;}.card-image-wrapper{width: 100%;}.card-content-wrapper{display: flex; flex-grow: 1; flex-direction: column; justify-content: space-between;}#card-copy-wrapper{margin: 30px;}#card-cta-wrapper{margin: 30px;}</style><div class="card" part='card'><div class='card-content-wrapper' part='card-content-wrapper'><div id='card-copy-wrapper' part='card-copy-wrapper'><slot></slot></div></div><div class='card-image-wrapper' part='image-wrapper'><img id='card-image'/></div></div>`;
  const VALID_HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const _AccessibleCard = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "uniqueId");
      __publicField(this, "slotChangeHandler", null);
      _AccessibleCard.counter += 1;
      this.uniqueId = `card-${_AccessibleCard.counter}`;
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      var _a;
      const shadowRoot = this.shadowRoot;
      shadowRoot.innerHTML = template;
      this.slotChangeHandler = () => {
        const slot = shadowRoot.querySelector("slot");
        const assignedNodes = slot.assignedNodes();
        if (assignedNodes.length > 0) {
          let titleTagType = "h2";
          if (this.hasAttribute("title-tag-type") && this.getAttribute("title-tag-type") !== null) {
            const requestedTag = this.getAttribute("title-tag-type");
            if (VALID_HEADING_TAGS.includes(requestedTag.toLowerCase())) {
              titleTagType = requestedTag.toLowerCase();
            }
          }
          const title = document.createElement(titleTagType);
          title.setAttribute("id", "card-title");
          title.setAttribute("part", "headline");
          let titleLink;
          if (this.hasAttribute("cta-url") && this.getAttribute("cta-url") !== null && this.getAttribute("cta-url") !== "") {
            titleLink = document.createElement("a");
            titleLink.setAttribute(
              "href",
              this.getAttribute("cta-url")
            );
            const currentDomain = window.location.hostname;
            const ctaUrl = this.getAttribute("cta-url");
            try {
              const ctaUrlDomain = new URL(ctaUrl).hostname;
              if (ctaUrlDomain !== currentDomain) {
                titleLink.setAttribute("target", "_blank");
                titleLink.setAttribute("rel", "noopener noreferrer");
              }
            } catch {
            }
            if (this.hasAttribute("cta-text") && this.getAttribute("cta-text") !== null) {
              titleLink.setAttribute(
                "aria-describedby",
                "cta-text-" + this.uniqueId
              );
            }
            assignedNodes.forEach((node) => {
              titleLink.appendChild(node);
            });
            title.appendChild(titleLink);
          } else {
            assignedNodes.forEach((node) => {
              title.appendChild(node);
            });
          }
          slot.innerHTML = "";
          slot.appendChild(title);
        }
      };
      (_a = shadowRoot.querySelector("slot")) == null ? void 0 : _a.addEventListener("slotchange", this.slotChangeHandler);
      createRestOfDOM.call(this, shadowRoot);
    }
    disconnectedCallback() {
      var _a;
      if (this.slotChangeHandler) {
        const shadowRoot = this.shadowRoot;
        (_a = shadowRoot.querySelector("slot")) == null ? void 0 : _a.removeEventListener("slotchange", this.slotChangeHandler);
        this.slotChangeHandler = null;
      }
    }
  };
  let AccessibleCard = _AccessibleCard;
  __publicField(AccessibleCard, "counter", 0);
  function createRestOfDOM(shadowRoot) {
    const imgSrc = this.getAttribute("img-src") || this.getAttribute("img-scr");
    if (imgSrc) {
      const img = shadowRoot.querySelector("#card-image");
      img.setAttribute("src", imgSrc);
      img.setAttribute("part", "image");
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
    const ctaTextAttr = this.getAttribute("cta-text");
    const ctaUrlAttr = this.getAttribute("cta-url");
    if (ctaTextAttr && ctaTextAttr !== "" && ctaUrlAttr && ctaUrlAttr !== "") {
      const ctaWrapper = document.createElement("div");
      ctaWrapper.setAttribute("id", "card-cta-wrapper");
      ctaWrapper.setAttribute("part", "card-cta-wrapper");
      const ctaTextEl = document.createElement("p");
      ctaTextEl.setAttribute("part", "cta");
      ctaTextEl.setAttribute("id", "cta-text-" + this.uniqueId);
      ctaTextEl.innerText = ctaTextAttr;
      ctaTextEl.setAttribute("aria-hidden", "true");
      const slot = shadowRoot.querySelector(
        "#card-copy-wrapper"
      );
      ctaWrapper.appendChild(ctaTextEl);
      slot.after(ctaWrapper);
    }
    if (this.hasAttribute("support-text") && this.getAttribute("support-text") !== null) {
      const supportText = document.createElement("div");
      supportText.setAttribute("id", "support-text");
      supportText.setAttribute("part", "support-text");
      supportText.innerText = this.getAttribute("support-text");
      const slot = shadowRoot.querySelector("slot");
      slot.after(supportText);
    }
  }
  exports2.AccessibleCard = AccessibleCard;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
