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
                { label: 'Ubicación', value: 'Buenos Aires, Argentina' }
            ]
        }
    },
    {
        id: 'educacion',
        type: 'education',
        label: 'Educación',
        detail: {
            kind: 'education',
            title: 'Educación',
            institution: 'Universidad Empresarial Siglo 21',
            degree: 'Licenciatura en Inteligencia Artificial y Robótica',
            period: 'Marzo 2024 — Presente',
            note: 'Aplicando lo teórico en proyectos reales (SecretarIA, Edisolutions) mientras cursa la carrera.',
            languages: [
                { lang: 'Español', level: 'Nativo' },
                { lang: 'Inglés', level: 'Intermedio (hablado y escrito)' },
                { lang: 'Portugués', level: 'Básico' }
            ]
        }
    },
    {
        id: 'contacto',
        type: 'contact',
        label: 'Contacto',
        detail: {
            kind: 'contact',
            title: 'Contacto',
            intro: '¿Tenés un proyecto en mente? Hablemos.',
            channels: [
                { icon: 'fas fa-envelope', label: 'pedromesaglio05@gmail.com', href: 'mailto:pedromesaglio05@gmail.com' },
                { icon: 'fas fa-phone', label: '+54 9 11 3946-0342', href: 'tel:+5491139460342' },
                { icon: 'fab fa-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/pedro-mesaglio-49946a307/' },
                { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/pedromesaglio' }
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
    },
    {
        id: 'python',
        type: 'tech',
        label: 'Python',
        detail: {
            kind: 'skill',
            title: 'Python',
            text: 'Lenguaje principal del backend — Flask en Edisolutions y FastAPI en SecretarIA, con pytest para testing de integración.'
        }
    },
    {
        id: 'fastapi-flask',
        type: 'tech',
        label: 'FastAPI / Flask',
        detail: {
            kind: 'skill',
            title: 'FastAPI & Flask',
            text: 'FastAPI como base async de SecretarIA (Pydantic, SQLAlchemy); Flask en las APIs REST de Edisolutions con JWT/RBAC.'
        }
    },
    {
        id: 'orm-validation',
        type: 'tech',
        label: 'SQLAlchemy / Pydantic',
        detail: {
            kind: 'skill',
            title: 'SQLAlchemy & Pydantic',
            text: 'ORM y validación de datos tipados sobre PostgreSQL; migraciones de esquema versionadas con Alembic.'
        }
    },
    {
        id: 'auth',
        type: 'tech',
        label: 'JWT / RBAC',
        detail: {
            kind: 'skill',
            title: 'JWT & RBAC',
            text: 'Autenticación por tokens y control de acceso por roles con aislamiento de datos por tenant, en producción en Edisolutions.'
        }
    },
    {
        id: 'ts-js',
        type: 'tech',
        label: 'TypeScript / JS',
        detail: {
            kind: 'skill',
            title: 'TypeScript & JavaScript',
            text: 'Tipado end-to-end en el frontend de SecretarIA y Mueble Libre, del componente a la llamada a la API.'
        }
    },
    {
        id: 'nextjs-react',
        type: 'tech',
        label: 'Next.js / React',
        detail: {
            kind: 'skill',
            title: 'Next.js & React',
            text: 'Frontend de SecretarIA y Mueble Libre, con TanStack Query para estado de servidor y actualizaciones en tiempo real vía SSE.'
        }
    },
    {
        id: 'tailwind',
        type: 'tech',
        label: 'Tailwind CSS',
        detail: {
            kind: 'skill',
            title: 'Tailwind CSS',
            text: 'Sistema de estilos utilitario del dashboard de SecretarIA — diseño consistente sin CSS a medida por componente.'
        }
    },
    {
        id: 'llm-apps',
        type: 'tech',
        label: 'LLM Apps',
        detail: {
            kind: 'skill',
            title: 'LLM Apps',
            text: 'Integración de Anthropic y OpenAI con ruteo de modelos, evaluación y benchmarking; prompting y diseño de chatbots, con autorización y reglas de negocio fuera del límite del LLM.'
        }
    },
    {
        id: 'rag',
        type: 'tech',
        label: 'RAG',
        detail: {
            kind: 'skill',
            title: 'RAG (Retrieval-Augmented Generation)',
            text: 'Búsqueda vectorial (FAISS) y workflows de retrieval-first help/knowledge, con embeddings e indexing asíncronos en SecretarIA.'
        }
    }
];

const GRAPH_EDGES = [
    // Hub — Pedro to each top-level area
    ['pedro', 'edisolutions'],
    ['pedro', 'secretaria'],
    ['pedro', 'mueble-libre'],
    ['pedro', 'ai-engineering'],
    ['pedro', 'backend'],
    ['pedro', 'cloud-devops'],
    ['pedro', 'frontend'],
    ['pedro', 'data-integration'],
    ['pedro', 'educacion'],
    ['pedro', 'contacto'],
    ['educacion', 'ai-engineering'],

    // Skill clusters broken down into specific technologies
    ['backend', 'python'],
    ['backend', 'fastapi-flask'],
    ['backend', 'orm-validation'],
    ['backend', 'auth'],
    ['frontend', 'ts-js'],
    ['frontend', 'nextjs-react'],
    ['frontend', 'tailwind'],
    ['ai-engineering', 'llm-apps'],
    ['ai-engineering', 'rag'],

    // Projects/experience to the specific tech they actually use
    ['secretaria', 'python'],
    ['secretaria', 'fastapi-flask'],
    ['secretaria', 'orm-validation'],
    ['secretaria', 'ts-js'],
    ['secretaria', 'nextjs-react'],
    ['secretaria', 'tailwind'],
    ['secretaria', 'llm-apps'],
    ['secretaria', 'rag'],
    ['secretaria', 'data-integration'],

    ['edisolutions', 'python'],
    ['edisolutions', 'fastapi-flask'],
    ['edisolutions', 'auth'],
    ['edisolutions', 'cloud-devops'],
    ['edisolutions', 'data-integration'],

    ['mueble-libre', 'ts-js'],
    ['mueble-libre', 'nextjs-react'],
    ['mueble-libre', 'data-integration']
];

// Which cluster node each tech ("tier-2") node belongs to, for layout only
// (seeding the force simulation and positioning the mobile static graph).
const TECH_PARENT = {
    'python': 'backend',
    'fastapi-flask': 'backend',
    'orm-validation': 'backend',
    'auth': 'backend',
    'ts-js': 'frontend',
    'nextjs-react': 'frontend',
    'tailwind': 'frontend',
    'llm-apps': 'ai-engineering',
    'rag': 'ai-engineering'
};

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

function renderEducationContent(node) {
    const d = node.detail;
    return `
        <h3>${escapeHtml(d.title)}</h3>
        <p class="detail-role">${escapeHtml(d.degree)}</p>
        <p class="detail-paragraph">${escapeHtml(d.institution)} <span class="dot">·</span> ${escapeHtml(d.period)}</p>
        <p class="detail-paragraph">${escapeHtml(d.note)}</p>
        <div class="detail-facts">
            ${d.languages.map(l => `
                <div class="fact">
                    <span class="fact-label">${escapeHtml(l.lang)}</span>
                    <span class="fact-value">${escapeHtml(l.level)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderContactContent(node) {
    const d = node.detail;
    return `
        <h3>${escapeHtml(d.title)}</h3>
        <p class="detail-paragraph">${escapeHtml(d.intro)}</p>
        <div class="detail-contact-links">
            ${d.channels.map(c => `
                <a href="${c.href}" class="contact-link" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                    <i class="${c.icon}"></i><span>${escapeHtml(c.label)}</span>
                </a>
            `).join('')}
        </div>
    `;
}

function renderNodeDetail(node) {
    switch (node.detail.kind) {
        case 'about': return renderAboutContent(node);
        case 'experience': return renderExperienceContent(node);
        case 'project': return renderProjectContent(node);
        case 'skill': return renderSkillContent(node);
        case 'education': return renderEducationContent(node);
        case 'contact': return renderContactContent(node);
        default: return '';
    }
}
