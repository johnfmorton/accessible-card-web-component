// Path: demo-page-assets/demo.ts
// This is the entry point for the demo page. It's a TypeScript file that
//  loads in the module that we're buidling with this repo
import { AccessibleCard } from '../lib/accessible-card-web-component'

customElements.define('accessible-card', AccessibleCard)
// customElements.define('accessible-card', AccessibleCard, { extends: 'li' })

import './style.pcss';

// From here, you can add any additional JavaScript you want to run on the demo page.
// For example, you could add a button that calls a function in the module.
