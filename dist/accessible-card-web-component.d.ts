declare module "card-html-template" {
    export const template = "<style>:host{display: block; border: 1px solid black; height: 100%;}div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, a, em, img, strong, b, u, i, center, dl, dt, dd, ol, ul, li, figure, figcaption, footer, header, hgroup, menu, nav, section, summary, time{margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;}#card-image{width: 100%;}.card{position: relative; display: flex; flex-direction: column; /* reverse the order of the children */ flex-direction: column-reverse; height: 100%; border-radius: 16px; border-width: 0; background: #fff; box-sizing: border-box; border: 1px solid rgba(24, 24, 24, 0.04); top: 0;}.card a{text-decoration: none; color: inherit;}#card-title{margin:0;}; .card a:focus{text-decoration: underline;}.card:focus-within{outline: 4px solid #155daa; box-shadow: 0 2px 8px -2px rgba(24, 24, 24, 0.08), 0 12px 12px -4px rgba(24, 24, 24, 0.16);}.card:focus-within a:focus{text-decoration: none;}.card a::after{content: ''; position: absolute; left: 0; top: 0; right: 0; bottom: 0;}.card-image-wrapper{width: 100%;}.card-content-wrapper{display: flex; flex-grow: 1; flex-direction: column; justify-content: space-between;}#card-copy-wrapper{margin: 30px;}#card-cta-wrapper{margin: 30px;}</style><div class=\"card\" part='card'><div class='card-content-wrapper' part='card-content-wrapper'><div id='card-copy-wrapper' part='card-copy-wrapper'><slot></slot></div></div><div class='card-image-wrapper' part='image-wrapper'><img id='card-image'/></div></div>";
}
declare module "accessible-card-web-component" {
    export class AccessibleCard extends HTMLElement {
        static counter: number;
        uniqueId: string;
        constructor();
        connectedCallback(): void;
        disconnectedCallback(): void;
    }
}
