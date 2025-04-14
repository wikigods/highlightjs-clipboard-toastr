class Core {
    // Default class strings
    static DEFAULT_BUTTON_CLASS = 'btn btn-sm btn-primary position-absolute top-0 end-0 m-2 clipboard-btn';
    static DEFAULT_WRAPPER_CLASS = 'position-relative';

    // Default valid class lists (used if validation is enabled)
    static defaultValidButtonClasses = [
        'btn', 'btn-sm', 'btn-primary', 'btn-success', 'btn-danger', 'btn-warning',
        'position-absolute', 'top-0', 'end-0', 'm-2', 'clipboard-btn'
    ];

    static defaultValidWrapperClasses = [
        'position-relative', 'custom-wrapper-class'
    ];

    constructor(config = {}) {
        this.config = {
            iconDefault: 'bi bi-clipboard',
            iconSuccess: 'bi bi-check-lg',
            iconResetDelay: 2000,
            messageSuccess: 'Code copied to clipboard',
            messageError: 'Error copying the code',
            messageClipboardUnsupported: 'Clipboard API is not available.',
            buttonClass: Core.DEFAULT_BUTTON_CLASS,
            wrapperClass: Core.DEFAULT_WRAPPER_CLASS,
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
            validateClasses: true,
            validButtonClasses: Core.defaultValidButtonClasses,
            validWrapperClasses: Core.defaultValidWrapperClasses,
            ...config
        };
    }

    // Utility: Validate a string of classes against a whitelist
    validateClassList(classString, validClasses) {
        const classList = classString.trim().split(/\s+/);
        const invalid = classList.filter(cls => !validClasses.includes(cls));
        return {
            isValid: invalid.length === 0,
            invalidClasses: invalid
        };
    }

    // Apply validation if enabled; fallback to default class if invalid
    getValidatedClass(inputClass, fallbackClass, validList, shouldValidate, label) {
        if (!shouldValidate) return inputClass;

        const { isValid, invalidClasses } = this.validateClassList(inputClass, validList);
        if (!isValid) {
            console.warn(`Invalid ${label} classes provided: ${invalidClasses.join(', ')}. Default class has been assigned.`);
            return fallbackClass;
        }
        return inputClass;
    }

    // Create the clipboard button element
    createClipboardButton(codeElement) {
        const shouldValidate = this.config.validateClasses !== false;
        const buttonClass = this.config.buttonClass || Core.DEFAULT_BUTTON_CLASS;

        const finalButtonClass = this.getValidatedClass(
            buttonClass,
            Core.DEFAULT_BUTTON_CLASS,
            this.config.validButtonClasses,
            shouldValidate,
            'button'
        );

        const button = document.createElement('button');
        button.className = finalButtonClass;

        const icon = document.createElement('i');
        icon.className = this.config.iconDefault || 'bi bi-clipboard';
        button.appendChild(icon);

        button.addEventListener('click', () => {
            if (!navigator.clipboard) {
                toastr.warning(this.config.messageClipboardUnsupported || 'Clipboard API is not available.');
                return;
            }

            const code = codeElement.textContent;

            navigator.clipboard.writeText(code).then(() => {
                icon.className = this.config.iconSuccess || 'bi bi-check-lg';

                setTimeout(() => {
                    icon.className = this.config.iconDefault || 'bi bi-clipboard';
                }, this.config.iconResetDelay || 1500);

                toastr.success(this.config.messageSuccess || 'Code copied to clipboard');
            }).catch(() => {
                toastr.error(this.config.messageError || 'Error copying the code');
            });
        });

        return button;
    }

    // Enhance all <pre><code> blocks on the page
    enhanceCodeBlocks() {
        hljs.highlightAll();

        const shouldValidate = this.config.validateClasses !== false;
        const wrapperClass = this.config.wrapperClass || Core.DEFAULT_WRAPPER_CLASS;

        const finalWrapperClass = this.getValidatedClass(
            wrapperClass,
            Core.DEFAULT_WRAPPER_CLASS,
            this.config.validWrapperClasses,
            shouldValidate,
            'wrapper'
        );

        document.querySelectorAll('pre > code').forEach(code => {
            const pre = code.parentElement;

            const wrapper = document.createElement('div');
            wrapper.className = finalWrapperClass;

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);

            const button = this.createClipboardButton(code);
            wrapper.appendChild(button);
        });
    }

    // Public method to fire the enhancement
    fire() {
        toastr.options = {
            closeButton: this.config.closeButton ?? false,
            progressBar: this.config.progressBar ?? false,
            timeOut: this.config.timeOut ?? 1500,
            escapeHtml: true,
        };

        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceCodeBlocks();
        });
    }

    greet() {
        console.log(`Hello from Core! Config:`, this.config);
    }
}

// Exporta la clase Core como HCT
export default Core;
