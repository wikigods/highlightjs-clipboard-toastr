// Default class strings
const DEFAULT_BUTTON_CLASS = 'btn btn-sm btn-primary position-absolute top-0 end-0 m-2 clipboard-btn';
const DEFAULT_WRAPPER_CLASS = 'position-relative';

// Default valid class lists (used if validation is enabled)
const defaultValidButtonClasses = [
    'btn', 'btn-sm', 'btn-primary', 'btn-success', 'btn-danger', 'btn-warning',
    'position-absolute', 'top-0', 'end-0', 'm-2', 'clipboard-btn'
];

const defaultValidWrapperClasses = [
    'position-relative', 'custom-wrapper-class'
];

// Utility: Validate a string of classes against a whitelist
function validateClassList(classString, validClasses) {
    const classList = classString.trim().split(/\s+/);
    const invalid = classList.filter(cls => !validClasses.includes(cls));
    return {
        isValid: invalid.length === 0,
        invalidClasses: invalid
    };
}

// Apply validation if enabled; fallback to default class if invalid
function getValidatedClass(inputClass, fallbackClass, validList, shouldValidate, label) {
    if (!shouldValidate) return inputClass;

    const { isValid, invalidClasses } = validateClassList(inputClass, validList);
    if (!isValid) {
        console.warn(`Invalid ${label} classes provided: ${invalidClasses.join(', ')}. Default class has been assigned.`);
        return fallbackClass;
    }
    return inputClass;
}

// Create the clipboard button element
function createClipboardButton(codeElement, config) {
    const shouldValidate = config.validateClasses !== false;
    const buttonClass = config.buttonClass || DEFAULT_BUTTON_CLASS;

    const finalButtonClass = getValidatedClass(
        buttonClass,
        DEFAULT_BUTTON_CLASS,
        config.validButtonClasses || defaultValidButtonClasses,
        shouldValidate,
        'button'
    );

    const button = document.createElement('button');
    button.className = finalButtonClass;

    const icon = document.createElement('i');
    icon.className = config.iconDefault || 'bi bi-clipboard';
    button.appendChild(icon);

    button.addEventListener('click', () => {
        if (!navigator.clipboard) {
            toastr.warning(config.messageClipboardUnsupported || 'Clipboard API is not available.');
            return;
        }

        const code = codeElement.textContent;

        navigator.clipboard.writeText(code).then(() => {
            icon.className = config.iconSuccess || 'bi bi-check-lg';

            setTimeout(() => {
                icon.className = config.iconDefault || 'bi bi-clipboard';
            }, config.iconResetDelay || 1500);

            toastr.success(config.messageSuccess || 'Code copied to clipboard');
        }).catch(() => {
            toastr.error(config.messageError || 'Error copying the code');
        });
    });

    return button;
}

// Enhance all <pre><code> blocks on the page
function enhanceCodeBlocks(config = {}) {
    hljs.highlightAll();

    const shouldValidate = config.validateClasses !== false;
    const wrapperClass = config.wrapperClass || DEFAULT_WRAPPER_CLASS;

    const finalWrapperClass = getValidatedClass(
        wrapperClass,
        DEFAULT_WRAPPER_CLASS,
        config.validWrapperClasses || defaultValidWrapperClasses,
        shouldValidate,
        'wrapper'
    );

    document.querySelectorAll('pre > code').forEach(code => {
        const pre = code.parentElement;

        const wrapper = document.createElement('div');
        wrapper.className = finalWrapperClass;

        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const button = createClipboardButton(code, config);
        wrapper.appendChild(button);
    });
}

// Public method to fire the enhancement
function fire(config = {}) {
    toastr.options = {
        closeButton: config.closeButton ?? false,
        progressBar: config.progressBar ?? false,
        timeOut: config.timeOut ?? 1500,
        escapeHtml: true,
    };

    document.addEventListener('DOMContentLoaded', () => {
        enhanceCodeBlocks(config);
    });
}

// Export API
export default {
    fire,
    enhanceCodeBlocks
};
