# Accessible Card Web Component

A customizable, accessible card web component built with Web Components standards. This component provides a fully encapsulated card UI with built-in accessibility features.

## Demo

View the live demo at: https://johnfmorton.github.io/accessible-card-web-component/

## Installation

### NPM

```bash
npm install accessible-card-web-component
```

### CDN

```html
<script type="module" src="https://unpkg.com/accessible-card-web-component"></script>
```

## Usage

### Basic Usage

```html
<accessible-card
  img-src="https://example.com/image.jpg"
  img-alt="Description of image"
  cta-text="Learn more"
  cta-url="https://example.com"
  support-text="Additional context text"
>
  Card Headline
</accessible-card>
```

### ES Module Import

```javascript
import 'accessible-card-web-component'
```

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `img-src` | string | URL for the card image. Also accepts legacy `img-scr` for backwards compatibility. |
| `img-alt` | string | Alt text for the image. If not provided, defaults to "Support image" and adds `aria-hidden="true"`. |
| `title-tag-type` | string | HTML heading tag to use for the title. Valid values: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`. Defaults to `h2`. |
| `cta-text` | string | Text displayed for the call-to-action element. |
| `cta-url` | string | URL for the card link. Applied to the headline. |
| `support-text` | string | Additional descriptive text displayed below the headline. |

## Accessibility Features

- **Semantic HTML**: Uses proper heading hierarchy with configurable heading levels (h1-h6)
- **Screen reader support**: CTA text is linked via `aria-describedby` for context
- **External link handling**: Links to external domains automatically:
  - Open in new tabs (`target="_blank"`)
  - Include security attributes (`rel="noopener noreferrer"`)
- **Image accessibility**: Decorative images without alt text are marked with `aria-hidden="true"`
- **Slot content**: Headline content is placed in a semantic slot, allowing rich HTML content

## Style Guide

The component uses Shadow DOM for encapsulation but exposes several `::part` selectors for styling:

| Part Selector | Description |
|---------------|-------------|
| `::part(card)` | The overall card container element |
| `::part(card-content-wrapper)` | Wrapper around all text content |
| `::part(card-copy-wrapper)` | Wrapper around headline and sub-head |
| `::part(headline)` | The card headline element |
| `::part(support-text)` | The support/subhead text element |
| `::part(cta)` | The call-to-action text element |
| `::part(card-cta-wrapper)` | Wrapper around the CTA element |
| `::part(image)` | The card image |
| `::part(image-wrapper)` | Wrapper div around the image |

### Example Styling

```css
accessible-card::part(card) {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

accessible-card::part(headline) {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

accessible-card::part(image) {
  border-radius: 8px 8px 0 0;
}
```

Check out the [/demo-page-assets/custom.pcss](/demo-page-assets/custom.pcss) file for a complete styling example.

## Browser Support

This component uses standard Web Components APIs and works in all modern browsers:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari

## Development

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The dev server runs at `http://localhost:8888`.

### Build

```bash
npm run build
```

This generates:
- `dist/accessible-card-web-component.es.js` - ES module build
- `dist/accessible-card-web-component.umd.js` - UMD build
- `dist/accessible-card-web-component.d.ts` - TypeScript declarations

## License

MIT
