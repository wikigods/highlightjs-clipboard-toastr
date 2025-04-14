class Core {
    // Default class strings
    static DEFAULT_BUTTON_CLASS = 'btn btn-sm btn-primary position-absolute top-0 end-0 m-2 clipboard-btn';
    static DEFAULT_WRAPPER_CLASS = 'position-relative';
    static DEFAULT_ICON = 'bi bi-clipboard';
    static DEFAULT_ICON_SUCCESS = 'bi bi-check-lg';
    static DEFAULT_MESSAGE_SUCCESS = 'Code copied to clipboard';
    static DEFAULT_MESSAGE_ERROR = 'Error copying the code';
    static DEFAULT_MESSAGE_UNSUPPORTED = 'Clipboard API is not available.';
    static DEFAULT_ICON_DELAY = 1500;
    static DEFAULT_ICON_TIMEOUT = 1500;

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
            iconDefault: Core.DEFAULT_ICON ,
            iconSuccess: Core.DEFAULT_ICON_SUCCESS,
            iconResetDelay: Core.DEFAULT_ICON_DELAY,
            messageSuccess: Core.DEFAULT_MESSAGE_SUCCESS,
            messageError: Core.DEFAULT_MESSAGE_ERROR,
            messageClipboardUnsupported: Core.DEFAULT_MESSAGE_UNSUPPORTED,
            buttonClass: Core.DEFAULT_BUTTON_CLASS,
            wrapperClass: Core.DEFAULT_WRAPPER_CLASS,
            closeButton: false,
            progressBar: false,
            timeOut: Core.DEFAULT_ICON_TIMEOUT,
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
        icon.className = this.config.iconDefault || Core.DEFAULT_ICON ;
        button.appendChild(icon);

        button.addEventListener('click', () => {
            if (!navigator.clipboard) {
                toastr.warning(this.config.messageClipboardUnsupported || Core.DEFAULT_MESSAGE_UNSUPPORTED);
                return;
            }

            const code = codeElement.textContent;

            navigator.clipboard.writeText(code).then(() => {
                icon.className = this.config.iconSuccess || Core.DEFAULT_ICON_SUCCESS;

                setTimeout(() => {
                    icon.className = this.config.iconDefault || Core.DEFAULT_ICON ;
                }, this.config.iconResetDelay || Core.DEFAULT_ICON_DELAY);

                toastr.success(this.config.messageSuccess || Core.DEFAULT_MESSAGE_SUCCESS);
            }).catch(() => {
                toastr.error(this.config.messageError || Core.DEFAULT_MESSAGE_ERROR);
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
            timeOut: this.config.timeOut ?? Core.DEFAULT_ICON_TIMEOUT,
            escapeHtml: true,
        };

        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceCodeBlocks();
        });
    }

    info() {
        console.log(`Info Config:`, this.config);
    }
}

// Exporta la clase Core como HCT
export default Core;
