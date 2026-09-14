# Portfolio redesign + content refresh — Design

## Context
El portfolio (`index.html` / `styles.css` / `script.js`, sitio estático desplegado en Vercel) tenía un diseño genérico de plantilla (hero oscuro con degradado violeta, canvas de partículas, cards con íconos grandes de Font Awesome) y contenido desactualizado: no mencionaba SecretarIA ni Mueble Libre, y mostraba proyectos (CASH-TRACK, un "Sistema RAG" genérico, "Dashboards Interactivos") que no figuran en el CV 2026 de Pedro.

Fuente de verdad para el contenido: `Pedro_Mesaglio_English_CV (ULT).pdf`.

## Objetivo
Rediseño visual con identidad propia (no genérico) + contenido alineado 1:1 con el CV actual, manteniendo el sitio como HTML/CSS/JS plano sin build step (coherente con el despliegue actual en Vercel).

## Dirección visual
- Fondo casi negro (`#0a0a0c`), un solo color de acento (ámbar/lima eléctrico) en vez del violeta/celeste genérico.
- Tipografía: sans para cuerpo, monoespaciada (JetBrains Mono) para detalles técnicos — tags de stack, numeración de secciones (`01 · Sobre mí`), un detalle tipo prompt en el hero.
- Se elimina el canvas de partículas; fondo con grid/líneas sutiles.
- Cards de proyecto sin íconos gigantes; tags en monoespaciada, jerarquía tipográfica fuerte.

## Estructura de secciones
Nav: Inicio · Sobre mí · Experiencia · Proyectos · Skills · Contacto

- **Hero**: nombre, título exacto del CV ("AI Engineer | Python Backend & Full-Stack Developer"), botón **Descargar CV** (nuevo) + "Ver Proyectos".
- **Sobre mí**: resumen reescrito según CV (Python/FastAPI/Flask, LLM apps, RAG, LangGraph, MCP), mención Lic. en IA y Robótica (UES21, en curso).
- **Experiencia** (nueva, separada de Proyectos): Edisolutions como rol laboral, bullets reales del CV (RBAC, WhatsApp Cloud API, S3 + proxy PDF, idempotencia multi-worker, pytest).
- **Proyectos**: SecretarIA (destacado) y Mueble Libre. Se remueven CASH-TRACK, RAG genérico y Dashboards (no están en el CV).
- **Skills**: 5 categorías del CV — AI Engineering, Backend, Cloud/DevOps, Frontend, Data & Integration.
- **Contacto**: sin cambios (mail, tel, LinkedIn, GitHub).

## Implementación
- HTML/CSS/JS plano, cero dependencias nuevas de build.
- Se agrega `assets/CV_Pedro_Mesaglio.pdf` (versión en inglés provista) enlazado desde "Descargar CV".
- Verificación local en navegador antes de cualquier commit/push.
- **No se hace push a GitHub sin confirmación explícita del usuario.**

## Fuera de alcance
- CV en español descargable (se puede agregar después si se pide).
- Sección de Educación dedicada (queda mencionada en "Sobre mí").
- Formulario de contacto funcional, blog, CMS (sugerencias del README original, no pedidas).
