// do not combile a default export AND named exports in the same file
// because consumers of your bundle will have to use `my-bundle.default`
// to access the default export, which may not be what you want.
// Use `output.exports: "named"` to disable this warning.

import { template } from './card-html-template'

export class AccessibleCard extends HTMLElement {
    constructor() {
        console.log('constructor')
        super()
        this.attachShadow({ mode: 'open' })
        // check that shadowRoot is available
        if (!this.shadowRoot) {
            throw new Error('ShadowRoot not available')
        } else {
            this.shadowRoot.innerHTML = template
        }
    }

    connectedCallback() {
        console.log('connectedCallback')
        const shadowRoot = this.shadowRoot as ShadowRoot

        shadowRoot.querySelector('slot')?.addEventListener('slotchange', () => {
            console.log('slotchange')
            const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
            // check to see if there is content in the default slot

            const assignedNodes = slot.assignedNodes()
            if (assignedNodes.length > 0) {
                // we have content in the default slot

                // check for title-tag-type attribute, otherwise use h2
                let titleTagType: String = 'h2'
                // now check to see if the title-tag attribute is set
                if (
                    this.hasAttribute('title-tag-type') &&
                    this.getAttribute('title-tag-type') !== null
                ) {
                    // get the title element
                    titleTagType = this.getAttribute('title-tag-type') as string
                }
                console.log('titleTagType', titleTagType)

                const title = document.createElement(titleTagType as string)
                // insert all the assignedNodes into the title element
              assignedNodes.forEach((node) => {

                title.appendChild(node)
              })
                console.log('title element', title)
                // remove the default slot content
                slot.innerHTML = ''
                // add the title to the shadowRoot
                slot.appendChild(title)
            }
        })

        if (
            this.hasAttribute('img-scr') &&
            this.getAttribute('img-scr') !== null
        ) {
            const img = document.createElement('img')
            img.setAttribute('src', this.getAttribute('img-scr') as string)
            // confirm that img-alt is not null
            if (
                this.hasAttribute('img-alt') &&
                this.getAttribute('img-alt') !== null
            ) {
                img.setAttribute('alt', this.getAttribute('img-alt') as string)
            } else {
                img.setAttribute('alt', 'Support image')
                // add aria-hidden to img
                img.setAttribute('aria-hidden', 'true')
            }
            // add img to shadowRoot
            shadowRoot.appendChild(img)
        }

        // check for title-tag attribute

        if (
            this.hasAttribute('title-tag') &&
            this.getAttribute('title-tag') !== null
        ) {
            const title = document.createElement(
                this.getAttribute('title-tag') as string
            )
            // get the content from the default slot
            const titleContent = this.querySelector('[slot="title"]')
            if (titleContent !== null) {
                title.innerHTML = titleContent.innerHTML
            }
            shadowRoot.appendChild(title)
        }
    }

    disconnectedCallback() {
        console.log('disconnectedCallback')
    }
}
