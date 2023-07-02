// this is the template for the card component which will, by default, be a list item, but can be changed to a div or any other element
export const template = `
    <style>
        :host {
            display: block;
            border: 1px solid black;
            padding: 1rem;
            margin: 1rem;
        }
        #card-image {
            width: 100%;
        }
        #cta-text {
            color: blue;
            text-decoration: underline;
        }
    </style>
    <div style='background:green;'>
        <slot></slot>
    </div>
    <div>
        <img id='card-image' />
    </div>
`
