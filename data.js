// ---------------------------------------------------------------------------
// Content graph: single source of truth for both the interactive graph view
// and the linear list view. Edges express real relationships (a project uses
// a skill cluster, etc.) — not decoration.
// ---------------------------------------------------------------------------

const GRAPH_NODES = [
    {
        id: 'pedro',
        type: 'core',
        label: 'Pedro Mesaglio',
        detail: {
            kind: 'about',
            title: 'Pedro Mesaglio',
            role: 'AI Engineer | Python Backend & Full-Stack Developer',
            paragraphs: [
                'Soy Ingeniero en IA y desarrollador Full-Stack. Construyo productos SaaS y de IA de punta a punta (0→1): definición funcional, arquitectura, desarrollo, integraciones externas y despliegue en la nube.',
                'Trabajo principalmente con Python (FastAPI, Flask), APIs REST, JWT/RBAC, PostgreSQL y AWS. Del lado de IA aplicada: aplicaciones LLM, RAG / búsqueda vectorial, LangGraph e integraciones MCP para automatizar workflows y mejorar la atención al usuario.',
                'Actualmente cursando la Licenciatura en Inteligencia Artificial y Robótica en la Universidad Empresarial Siglo 21, aplicando lo teórico en proyectos reales.'
            ],
            facts: [
                { label: 'Ubicación', value: 'Buenos Aires, Argentina' },
                { label: 'Educación', value: 'Lic. en IA & Robótica — UES21 (en curso)' },
                { label: 'Idiomas', value: 'Español (nativo) · Inglés (intermedio) · Portugués (básico)' }
            ]
        }
    },
    {
        id: 'edisolutions',
        type: 'experience',
        label: 'Edisolutions',
        detail: {
            kind: 'experience',
            title: 'AI Engineer & Full-Stack Developer',
            company: 'Edisolutions',
            companyNote: 'Plataforma SaaS de gestión de consorcios',
            period: 'May 2024 — Presente',
            bullets: [
                'Diseñé y construí una plataforma SaaS end-to-end: backend, frontend, integraciones de terceros y despliegue.',
                'APIs REST en Python/Flask con autenticación JWT, control de acceso por roles (RBAC) y aislamiento de datos por tenant.',
                'Asistente de autoservicio por WhatsApp Cloud API para consultas de saldo, resúmenes en PDF, reclamos y emergencias.',
                'Integración de AWS S3 y proxy seguro de PDFs; gestión de AWS EC2, Nginx, SSL/HTTPS, dominios custom y migraciones con Alembic.',
                'Resolución de condiciones de carrera en producción multi-worker mediante guards de idempotencia y procesamiento asíncrono en background.',
                'Cobertura de tests de integración con pytest para los endpoints críticos del bot; participación en decisiones de producto, UX/UI y monetización.'
            ],
            tags: ['Python', 'Flask', 'JWT / RBAC', 'WhatsApp Cloud API', 'AWS EC2 / S3', 'MySQL', 'Alembic']
        }
    },
    {
        id: 'secretaria',
        type: 'project',
        featured: true,
        label: 'SecretarIA',
        detail: {
            kind: 'project',
            eyebrow: 'Proyecto personal · IA',
            title: 'SecretarIA',
            desc: 'Secretaria virtual de IA multi-tenant para gestión de turnos, conversaciones con clientes y workflows operativos.',
            bullets: [
                'Monolito modular: backend FastAPI, frontend Next.js/React, PostgreSQL, Redis, workers Celery y deploy con Docker.',
                'Runtime conversacional con LangGraph que combina interpretación por LLM con herramientas determinísticas para disponibilidad, reservas y handoff humano.',
                'Integración de Anthropic y OpenAI con ruteo de modelos, evaluación y benchmarking; autorización y reglas de negocio fuera del límite del LLM.',
                'Flujos de reserva idempotentes, sesiones seguras con protección CSRF, outbox events y reintentos asíncronos.',
                'Google OAuth, Calendar y Meet; canales WhatsApp, Telegram y webchat; actualizaciones en tiempo real vía SSE.'
            ],
            tags: ['FastAPI', 'LangGraph', 'Next.js / React', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Anthropic / OpenAI']
        }
    },
    {
        id: 'mueble-libre',
        type: 'project',
        label: 'Mueble Libre',
        detail: {
            kind: 'project',
            eyebrow: 'Proyecto personal · 2025',
            title: 'Mueble Libre',
            desc: 'Marketplace de muebles usados construido end-to-end: publicaciones, autenticación y modelado de datos relacional.',
            bullets: [],
            tags: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript']
        }
    },
    {
        id: 'ai-engineering',
        type: 'skill',
        label: 'AI Engineering',
        detail: {
            kind: 'skill',
            title: 'AI Engineering',
            text: 'LangGraph, OpenAI, Anthropic, LLM apps, prompting, RAG, retrieval, vector search (FAISS), integraciones MCP, evaluación de modelos, diseño de chatbots'
        }
    },
    {
        id: 'backend',
        type: 'skill',
        label: 'Backend',
        detail: {
            kind: 'skill',
            title: 'Backend',
            text: 'Python, FastAPI, Flask, REST APIs, Pydantic, SQLAlchemy, JWT, RBAC, Alembic, pytest, Celery'
        }
    },
    {
        id: 'cloud-devops',
        type: 'skill',
        label: 'Cloud & DevOps',
        detail: {
            kind: 'skill',
            title: 'Cloud & DevOps',
            text: 'AWS EC2, AWS S3, Docker, Redis, Nginx, SSL/HTTPS, Linux, dominios custom, workers asíncronos'
        }
    },
    {
        id: 'frontend',
        type: 'skill',
        label: 'Frontend',
        detail: {
            kind: 'skill',
            title: 'Frontend',
            text: 'TypeScript, JavaScript, Next.js, React, TanStack Query, Tailwind CSS, HTML, CSS, PWA'
        }
    },
    {
        id: 'data-integration',
        type: 'skill',
        label: 'Data & Integration',
        detail: {
            kind: 'skill',
            title: 'Data & Integration',
            text: 'PostgreSQL, MySQL, SQLite, Server-Sent Events, Google OAuth, Google Calendar/Meet, WhatsApp Cloud API, Telegram, Git/GitHub'
        }
    }
];

const GRAPH_EDGES = [
    ['pedro', 'edisolutions'],
    ['pedro', 'secretaria'],
    ['pedro', 'mueble-libre'],
    ['pedro', 'ai-engineering'],
    ['pedro', 'backend'],
    ['pedro', 'cloud-devops'],
    ['pedro', 'frontend'],
    ['pedro', 'data-integration'],
    ['secretaria', 'ai-engineering'],
    ['secretaria', 'backend'],
    ['secretaria', 'frontend'],
    ['secretaria', 'data-integration'],
    ['edisolutions', 'backend'],
    ['edisolutions', 'cloud-devops'],
    ['edisolutions', 'data-integration'],
    ['mueble-libre', 'frontend'],
    ['mueble-libre', 'data-integration']
];

// ---------------------------------------------------------------------------
// Shared content renderers — consumed by both graph.js (detail panel) and
// list.js (linear view), so copy lives in exactly one place.
// ---------------------------------------------------------------------------

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderTags(tags) {
    if (!tags || !tags.length) return '';
    return `<div class="tag-row">${tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`;
}

function renderAboutContent(node) {
    const d = node.detail;
    return `
        <p class="detail-role">${escapeHtml(d.role)}</p>
        ${d.paragraphs.map(p => `<p class="detail-paragraph">${escapeHtml(p)}</p>`).join('')}
        <div class="detail-facts">
            ${d.facts.map(f => `
                <div class="fact">
                    <span class="fact-label">${escapeHtml(f.label)}</span>
                    <span class="fact-value">${escapeHtml(f.value)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExperienceContent(node) {
    const d = node.detail;
    return `
        <div class="experience-head">
            <div>
                <h3>${escapeHtml(d.title)}</h3>
                <p class="experience-company">${escapeHtml(d.company)} <span class="dot">·</span> ${escapeHtml(d.companyNote)}</p>
            </div>
            <span class="experience-period">${escapeHtml(d.period)}</span>
        </div>
        <ul class="experience-list">
            ${d.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
        ${renderTags(d.tags)}
    `;
}

function renderProjectContent(node) {
    const d = node.detail;
    return `
        <span class="project-eyebrow">${escapeHtml(d.eyebrow)}</span>
        <h3>${escapeHtml(d.title)}</h3>
        <p class="project-desc">${escapeHtml(d.desc)}</p>
        ${d.bullets && d.bullets.length ? `
            <ul class="project-list">
                ${d.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
            </ul>
        ` : ''}
        ${renderTags(d.tags)}
    `;
}

function renderSkillContent(node) {
    const d = node.detail;
    return `
        <h3>${escapeHtml(d.title)}</h3>
        <p class="detail-paragraph">${escapeHtml(d.text)}</p>
    `;
}

function renderNodeDetail(node) {
    switch (node.detail.kind) {
        case 'about': return renderAboutContent(node);
        case 'experience': return renderExperienceContent(node);
        case 'project': return renderProjectContent(node);
        case 'skill': return renderSkillContent(node);
        default: return '';
    }
}
