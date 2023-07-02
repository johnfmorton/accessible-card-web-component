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
    <div class='card-content-wrapper'>
    <div class='card-copy-wrapper'>
        <slot></slot>
        </div>
    </div>
    <div class='card-image-wrapper'>
        <img id='card-image' />
    </div>
`
