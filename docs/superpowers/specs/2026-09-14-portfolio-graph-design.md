# Portfolio as a knowledge graph — Design (supersedes previous card-layout spec)

## Context
La primera pasada (spec anterior, `2026-09-14-portfolio-redesign-design.md`) actualizó el contenido pero mantuvo la estructura genérica de "hero + scroll de cards". Pedro pidió algo que estructuralmente no se parezca a ningún otro portfolio.

## Concepto
La home es un grafo interactivo de fuerzas (d3-force, vía CDN, sin build step). Nodo central "Pedro Mesaglio" conectado a 8 nodos: Edisolutions (experiencia), SecretarIA y Mueble Libre (proyectos), y 5 categorías de skills. Los proyectos también conectan directo a las skills/stack que usan (ej. SecretarIA ↔ AI Engineering/Backend/Frontend/Data), mostrando relaciones reales — no es decorativo.

Click en un nodo abre un panel de detalle (lateral en desktop, bottom sheet en mobile) con el contenido real (mismos bullets/tags que en el CV). Hover/focus en un nodo resalta sus conexiones y atenúa el resto.

## Accesibilidad y fallback
- Los nodos son `<button>` reales del DOM (no canvas), con tab order lógico y paneles con `role="dialog"`.
- Toggle "Ver como lista" muestra el mismo contenido en formato lineal tradicional (about/experiencia/proyectos/skills/contacto) para reclutadores que quieren leer rápido, o quien prefiera no interactuar con el grafo.
- **Mobile (<768px): por defecto arranca en modo lista** (la física con drag táctil en pantallas chicas es poco confiable). El toggle permite ver igual una versión estática del grafo (layout circular precalculado, sin drag).
- Contenido de detalle (bullets, tags, bio) vive en un solo lugar (`data.js`) y se renderiza tanto en el panel del grafo como en el modo lista — sin duplicar copy.

## Elementos fijos (fuera del grafo)
Header persistente: wordmark, toggle Grafo/Lista, botón "Descargar CV" + íconos de contacto (mail/GitHub/LinkedIn) — siempre visibles, no dependen de explorar el grafo.

## Estructura de archivos
`index.html` (header + vista grafo + vista lista + panel de detalle) · `styles.css` (se mantienen los estilos de cards/tags/botones de la spec anterior para el modo lista; se agregan estilos de grafo/panel/header) · `data.js` (nodos, edges, contenido, funciones de render de contenido compartidas) · `graph.js` (motor del grafo: simulación interactiva en desktop, layout estático en mobile, drag, hover-highlight, apertura de panel) · `list.js` (arma el modo lista desde `data.js`) · `app.js` (toggle de modo, panel open/close, manejo de foco y resize).

## Fuera de alcance
Nodos de segundo nivel dentro de cada skill (ej. un nodo separado por cada tecnología), zoom/pan del grafo, persistencia de layout entre visitas.
