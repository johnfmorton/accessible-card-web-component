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
    }

    connectedCallback() {
        console.log('connectedCallback')
        const shadowRoot = this.shadowRoot as ShadowRoot
        shadowRoot.innerHTML = template;

        // check for default slot content using the slotchange event
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

              const title = document.createElement(titleTagType as string);
              title.setAttribute('id', 'card-title')
              // add part = headline to the title element
              title.setAttribute('part', 'headline')

              let titleLink;
                // check if the cta-url attribute is set
              if (
                this.hasAttribute('cta-url') &&
                this.getAttribute('cta-url') !== null
              ) {
                  // create the link element
                  titleLink = document.createElement('a')
                  titleLink.setAttribute(
                      'href',
                      this.getAttribute('cta-url') as string
                  )
                  // insert all the assignedNodes into the title element
                  assignedNodes.forEach((node) => {
                      titleLink.appendChild(node)
                  })
                  // insert the titleLink into the title element
                  title.appendChild(titleLink)
              } else {
                  // insert all the assignedNodes into the title element
                  assignedNodes.forEach((node) => {
                      title.appendChild(node)
                  })
              }

                console.log('title element', title)
                // remove the default slot content
                slot.innerHTML = ''
                // add the title to the shadowRoot
                slot.appendChild(title)
            }

            // createRestOfDOM.call(this, shadowRoot)
        })

        createRestOfDOM.call(this, shadowRoot)
    }

    disconnectedCallback() {
        console.log('disconnectedCallback')
    }
}

// function to create rest of DOM
// element are created in a specific order

function createRestOfDOM(shadowRoot: ShadowRoot) {
    // check for img-src attribute and create the image
    if (this.hasAttribute('img-scr') && this.getAttribute('img-scr') !== null) {
        const img = shadowRoot.querySelector('#card-image') as HTMLImageElement
        img.setAttribute('src', this.getAttribute('img-scr') as string)
        // set part = image
        img.setAttribute('part', 'image')
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
    } else {
        // remove the img element parent
        const img = shadowRoot.querySelector('#card-image') as HTMLImageElement
        // get parent of img
        const parent = img.parentElement as HTMLDivElement
        parent.remove()
    }

    // check for cta-text attribute and create the cta button if it exists
    if (
        this.hasAttribute('cta-text') &&
        this.getAttribute('cta-text') !== null &&
        this.hasAttribute('cta-url') &&
        this.getAttribute('cta-url') !== null
    ) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.setAttribute('id', 'card-cta-wrapper');
      // add part = card-cta-wrapper
      ctaWrapper.setAttribute('part', 'card-cta-wrapper');
      const ctaText = document.createElement('p');
        // add part = cta
        ctaText.setAttribute('part', 'cta')
        ctaText.setAttribute('id', 'cta-text')
        ctaText.innerText = this.getAttribute('cta-text') as string
        // aria-hidden="true"
        ctaText.setAttribute('aria-hidden', 'true');
        // find the slot and add the supportText after the slot
      const slot = shadowRoot.querySelector(
          '#card-copy-wrapper'
      ) as HTMLElement

      ctaWrapper.appendChild(ctaText);
        slot.after(ctaWrapper)
    }

    // check for support-text attribute and create the support text div if it exists
    if (
        this.hasAttribute('support-text') &&
        this.getAttribute('support-text') !== null
    ) {
        const supportText = document.createElement('div')
        supportText.setAttribute('id', 'support-text')
        // add part = support-text
        supportText.setAttribute('part', 'support-text')
        supportText.innerText = this.getAttribute('support-text') as string
        // find the slot and add the supportText after the slot
        const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
        slot.after(supportText)
    }
}
