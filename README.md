# Entrenamiento 4+2

Aplicación web **personal** para registrar mi rutina de entrenamiento de ocho semanas: fuerza, spinning, movilidad, ejercicios complementarios y estimaciones orientativas de gasto calórico. Es un proyecto de uso propio, publicado como ejemplo de una pequeña aplicación web sin backend; **no es un producto comercial, una prescripción médica ni una herramienta de calorimetría validada**.

## Abrir la aplicación

- **Versión publicada:** https://sebastianzawrzykraj.github.io/entrenamiento-4-2/
- **Código fuente:** https://github.com/sebastianzawrzykraj/entrenamiento-4-2
- También se puede ejecutar localmente con un servidor estático: `python3 -m http.server 8000` y visitar `http://localhost:8000/`. No usar la vista previa `file://` del teléfono para validar el almacenamiento o el service worker.

## Instalar en el teléfono

**iPhone:** abrir la URL publicada en **Safari**, elegir **Compartir → Agregar a pantalla de inicio → Agregar** (si aparece «Abrir como app», activarlo). Las actualizaciones se obtienen desde GitHub Pages; no se instala desde App Store.

**Android:** abrir la URL en Chrome y elegir **Instalar aplicación** o **Agregar a pantalla principal**, según disponibilidad.

## Funcionalidad

- Rutina 4+2 de ocho semanas y objetivos por serie; registro individual de carga, repeticiones y RIR.
- Formularios específicos para fuerza, cardio, core, postura y rehabilitación; en cardio sólo se solicita duración e intensidad.
- Entrada de cargas con punto **o coma decimal** (`12,5` y `12.5`).
- Temporizador flotante de descanso.
- Cálculos **aproximados**, no mediciones, de calorías de actividad, total diario y extra respecto al reposo. Evitar registrar dos veces una actividad.
- Persistencia mediante `localStorage`; exportación/importación de respaldos JSON y exportación CSV.

## Estructura del repositorio

```text
index.html           # Estructura y textos de interfaz (español)
styles.css           # Diseño adaptable a móvil
app.js               # Estado, eventos, cálculo y representación en la interfaz
sw.js                # Service worker y recursos offline
manifest.webmanifest # Metadatos de instalación PWA
icon-192.png         # Ícono para instalación
icon-512.png         # Ícono para instalación
```

El **código y los identificadores nuevos están en inglés**, mientras que la interfaz y esta documentación están en español. La aplicación nació como un prototipo de un solo archivo; esta versión separa HTML, CSS y JS sin cambiar el formato de datos existente. La modularización interna, las pruebas automatizadas y un pipeline de CI son mejoras pendientes. No se pretende presentar el prototipo como una arquitectura empresarial.

## Datos y privacidad

Los registros se guardan **en el navegador y dispositivo**, no en GitHub ni en un servidor. No hay cuentas ni sincronización de Google Fit/Health. Eliminar los datos del sitio puede eliminar el historial; conviene exportar copias JSON antes de actualizar o cambiar de dispositivo. El archivo JSON puede contener información personal de entrenamiento: **no subirlo al repositorio público**.

## Publicación

Sitio estático distribuido mediante GitHub Pages desde la rama `main`, usando el flujo de trabajo del repositorio. Al modificar `sw.js`, actualizar el identificador de caché para que los clientes descarguen los archivos nuevos.

## Limitaciones conocidas

La estimación de calorías utiliza supuestos sobre intensidad, duración y pausas. No es una medición de potencia ni sustituye una evaluación profesional. Los ejercicios de rehabilitación deben ajustarse al diagnóstico y a la tolerancia individual. La compatibilidad debe probarse en Safari iOS; una validación de sintaxis no reemplaza una prueba funcional real.