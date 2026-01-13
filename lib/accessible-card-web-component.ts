// do not combine a default export AND named exports in the same file
// because consumers of your bundle will have to use `my-bundle.default`
// to access the default export, which may not be what you want.
// Use `output.exports: "named"` to disable this warning.

import { template } from './card-html-template'

// Valid heading tag types for title-tag-type attribute
const VALID_HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export class AccessibleCard extends HTMLElement {
    static counter = 0
    uniqueId: string
    private slotChangeHandler: (() => void) | null = null

    constructor() {
      super()
      AccessibleCard.counter += 1;
      this.uniqueId = `card-${AccessibleCard.counter}`;
      this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        const shadowRoot = this.shadowRoot as ShadowRoot
        shadowRoot.innerHTML = template

        // check for default slot content using the slotchange event
        this.slotChangeHandler = () => {
            const slot = shadowRoot.querySelector('slot') as HTMLSlotElement
            // check to see if there is content in the default slot

            const assignedNodes = slot.assignedNodes()
            if (assignedNodes.length > 0) {
                // we have content in the default slot

                // check for title-tag-type attribute, otherwise use h2
                let titleTagType: string = 'h2'
                // now check to see if the title-tag attribute is set
                if (
                    this.hasAttribute('title-tag-type') &&
                    this.getAttribute('title-tag-type') !== null
                ) {
                    const requestedTag = this.getAttribute('title-tag-type') as string
                    // validate against allowed heading tags
                    if (VALID_HEADING_TAGS.includes(requestedTag.toLowerCase())) {
                        titleTagType = requestedTag.toLowerCase()
                    }
                }

                const title = document.createElement(titleTagType as string)
                title.setAttribute('id', 'card-title')
                // add part = headline to the title element
                title.setAttribute('part', 'headline')

                let titleLink
                // check if the cta-url attribute is set
                if (
                    this.hasAttribute('cta-url') &&
                  this.getAttribute('cta-url') !== null &&
                  this.getAttribute('cta-url') !== ''
                ) {
                    // create the link element
                    titleLink = document.createElement('a')
                    titleLink.setAttribute(
                        'href',
                        this.getAttribute('cta-url') as string
                    )

                  // check if the titleLink is the same domain as the current domain
                  // if it is a new domain, add the target="_blank" attribute with security attributes
                  const currentDomain = window.location.hostname
                  const ctaUrl = this.getAttribute('cta-url') as string
                  try {
                    const ctaUrlDomain = new URL(ctaUrl).hostname
                    if (ctaUrlDomain !== currentDomain) {
                      titleLink.setAttribute('target', '_blank')
                      titleLink.setAttribute('rel', 'noopener noreferrer')
                    }
                  } catch {
                    // If URL parsing fails (e.g., relative URL), keep link as same-window
                  }

                      // if the cta is set, add the 'aria-describedby' attribute
                    // to the cta-text element using its uniqueId
                  if (
                    this.hasAttribute('cta-text') &&
                    this.getAttribute('cta-text') !== null
                  ) {
                    titleLink.setAttribute(
                      'aria-describedby',
                      'cta-text-' + this.uniqueId
                    )
                  }

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

                // remove the default slot content
                slot.innerHTML = ''
                // add the title to the shadowRoot
                slot.appendChild(title)
            }

        }
        shadowRoot.querySelector('slot')?.addEventListener('slotchange', this.slotChangeHandler)

        createRestOfDOM.call(this, shadowRoot)
    }

    disconnectedCallback() {
        // Remove event listener to prevent memory leaks
        if (this.slotChangeHandler) {
            const shadowRoot = this.shadowRoot as ShadowRoot
            shadowRoot.querySelector('slot')?.removeEventListener('slotchange', this.slotChangeHandler)
            this.slotChangeHandler = null
        }
    }
}

// function to create rest of DOM
// element are created in a specific order

function createRestOfDOM(shadowRoot: ShadowRoot) {
    // check for img-src attribute and create the image
    // Note: supports both 'img-src' (correct) and 'img-scr' (legacy typo) for backwards compatibility
    const imgSrc = this.getAttribute('img-src') || this.getAttribute('img-scr')
    if (imgSrc) {
        const img = shadowRoot.querySelector('#card-image') as HTMLImageElement
        img.setAttribute('src', imgSrc)
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
    const ctaTextAttr = this.getAttribute('cta-text')
    const ctaUrlAttr = this.getAttribute('cta-url')
    if (ctaTextAttr && ctaTextAttr !== '' && ctaUrlAttr && ctaUrlAttr !== '') {
        const ctaWrapper = document.createElement('div')
        ctaWrapper.setAttribute('id', 'card-cta-wrapper')
        // add part = card-cta-wrapper
        ctaWrapper.setAttribute('part', 'card-cta-wrapper')
        const ctaTextEl = document.createElement('p')

        // add part = cta
        ctaTextEl.setAttribute('part', 'cta')
        // add id to ctaTextEl using uniqueId
        ctaTextEl.setAttribute('id', 'cta-text-' + this.uniqueId)
        ctaTextEl.innerText = ctaTextAttr
        // aria-hidden="true"
        ctaTextEl.setAttribute('aria-hidden', 'true')
        // find the slot and add the supportText after the slot
        const slot = shadowRoot.querySelector(
            '#card-copy-wrapper'
        ) as HTMLElement

        ctaWrapper.appendChild(ctaTextEl)
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
