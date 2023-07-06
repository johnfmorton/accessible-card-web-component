# WIP: Accessible Card Web Component

I'm building this web component for a project. It is a work in progress. I plan on working on the documentation when I get the project completed.

The issue I'm trying to solve is to make a card component that incorporates the needs I repeatedly come across in making card components and baking in the accessible features by default.

You can see the demo page for this repo at:

https://johnfmorton.github.io/accessible-card-web-component/


## Style Guide

The component has several `::part` selectors that can be used to style the component. The following is a list of the selectors.

1. `::part(card)` - The overall card element. This is the container for the component.
2. `::part(card-content-wrapper)` - A wrapper around all the text content of the card.
3. `::part(card-copy-wrapper)` - A wrapper around the headline and sub-head of the card.
4. `::part(headline)` - The headline on the card.
5. `::part(support-text)` - The support text (i.e. the subhead) on the card.
6. `::part(cta)` - The cta line on the card.
7. `::part(image)` - The image of the card.
8. `::part(image-wrapper)` - The div that wraps around the image of the card.

Check out the [/demo-page-assets/custom.pcss](/demo-page-assets/custom.pcss) document for my suggested starting point for these styles.

