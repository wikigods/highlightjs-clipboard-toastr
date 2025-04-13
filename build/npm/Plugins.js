'use strict'

const Plugins = [
    // toastr
    {
        from: 'node_modules/toastr/build/toastr.min.css',
        to: 'plugins/toastr.min.css'
    },
    // highlight.js
    {
        from: 'node_modules/highlight.js/styles/atom-one-dark.css',
        to: 'plugins/atom-one-dark.css'
    },
    {
        from: 'node_modules/highlight.js/styles/codepen-embed.css',
        to: 'plugins/codepen-embed.css'
    },
    // bootstrap-icons
    {
        from: 'node_modules/bootstrap-icons',
        to: 'plugins/bootstrap-icons'
    },
    // Font Awesome
    {
        from: 'node_modules/@fortawesome/fontawesome-free/css',
        to: 'plugins/fontawesome-free/css'
    },
    {
        from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
        to: 'plugins/fontawesome-free/webfonts'
    },
]

module.exports = Plugins