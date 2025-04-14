# 📋 highlightjs-clipboard-toastr

Una extensión sencilla y personalizable para añadir botones de copiar con notificaciones *toastr* a bloques de código resaltado con **highlight.js**.

Ideal para documentaciones, blogs técnicos o cualquier sitio que muestre bloques de código y quiera mejorar la experiencia del usuario al copiar fragmentos.

---

## 📦 Requisitos

Este paquete depende de:

- [highlight.js](https://highlightjs.org/)
- [toastr](https://codeseven.github.io/toastr/)
- [bootstrap](https://getbootstrap.com/)
- [bootstrap-icons](https://icons.getbootstrap.com/)
- [@popperjs/core](https://popper.js.org/docs/v2/)

🔁 **Opcional:**

- [@fortawesome/fontawesome-free](https://fontawesome.com/) – para íconos personalizados

---

## 🚀 Instalación

### ✅ Opción 1: Usando NPM (Import + Bundler como Vite, Webpack)

```bash
npm install highlightjs-clipboard-toastr @popperjs/core bootstrap bootstrap-icons highlight.js toastr
# Opcional:
npm install @fortawesome/fontawesome-free
```
### ✅ Opción 2: Usando archivos .min.js en HTML
Agrega los siguientes scripts y estilos directamente en tu HTML:
```bash
<!-- Bootstrap CSS y Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

<!-- Toastr CSS -->
<link href="https://cdn.jsdelivr.net/npm/toastr@2.1.4/build/toastr.min.css" rel="stylesheet">

<!-- FontAwesome (opcional) -->
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/fontawesome.min.css" rel="stylesheet">

<!-- highlight.js -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

<!-- Toastr JS -->
<script src="https://cdn.jsdelivr.net/npm/toastr@2.1.4/toastr.min.js"></script>

<!-- highlightjs-clipboard-toastr -->
<script src="https://unpkg.com/highlightjs-clipboard-toastr/dist/js/hl-clip-toast.min.js"></script>
```
### ✨ Uso Básico
```bash
const coreInstance = new HCT({});
coreInstance.info();  // Muestra información útil de los parámetros disponibles
coreInstance.fire();  // Inicia el paquete
```
### ⚙️ Configuración Personalizada (Ejemplo)
```bash
const coreInstance = new HCT({
    iconDefault: 'fa-solid fa-clipboard',                       // Ícono por defecto
    iconSuccess: 'fa-solid fa-clipboard-check',                // Ícono al copiar exitosamente
    iconResetDelay: 2000,                                      // Tiempo para resetear ícono (ms)
    messageSuccess: '¡Copiado!',                               // Mensaje de éxito
    messageError: 'Ups, no se pudo copiar',                    // Mensaje de error
    messageClipboardUnsupported: 'Tu navegador no soporta copiar', // Si el navegador no soporta el portapapeles
    buttonClass: 'btn btn-sm btn-success position-absolute top-0 end-0 m-2', // Clase del botón
    wrapperClass: 'position-relative',                         // Clase del contenedor
    closeButton: true,                                         // Botón de cerrar en toastr
    progressBar: true,                                         // Barra de progreso en toastr
    timeOut: 3000,                                             // Duración de toastr (ms)
    validateClasses: true                                      // Validar clases del botón
});
coreInstance.fire(); // Iniciar
```
### 🧪 Consideraciones
Este paquete requiere que los bloques <pre><code> ya estén resaltados por highlight.js.
Puedes usar tanto Bootstrap Icons como FontAwesome (según tu preferencia).
Asegúrate de que todos los estilos estén correctamente cargados si usas archivos .min.js.
