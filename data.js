// ---------------------------------------------------------------------------
// Content graph: single source of truth for both the interactive graph view
// and the linear list view. Edges express real relationships (a project uses
// a skill cluster, etc.) — not decoration.
// ---------------------------------------------------------------------------

const GRAPH_NODES_ES = [
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
            location: 'Buenos Aires, Argentina'
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
            text: 'De prompting a producción: modelos integrados con reglas de negocio deterministas alrededor, no adentro del LLM.',
            bullets: [
                'LangGraph como runtime conversacional: combina interpretación por LLM con herramientas determinísticas.',
                'Integración de Anthropic y OpenAI con ruteo de modelos, evaluación y benchmarking.',
                'RAG con búsqueda vectorial (FAISS) para workflows de retrieval-first help/knowledge.',
                'Integraciones MCP, automatización de workflows y diseño de chatbots multi-canal.'
            ],
            tags: ['LangGraph', 'Anthropic', 'OpenAI', 'RAG', 'FAISS', 'MCP', 'Prompting', 'Chatbot design']
        }
    },
    {
        id: 'backend',
        type: 'skill',
        label: 'Backend',
        detail: {
            kind: 'skill',
            title: 'Backend',
            text: 'APIs REST en Python pensadas para producción multi-tenant: tipado de punta a punta, autenticación robusta y despliegues estables.',
            bullets: [
                'Arquitecturas async con FastAPI (SecretarIA) y APIs REST síncronas con Flask (Edisolutions).',
                'Validación de datos con Pydantic y persistencia con SQLAlchemy sobre PostgreSQL/MySQL.',
                'Autenticación JWT, control de acceso por roles (RBAC) y aislamiento de datos por tenant en producción.',
                'Migraciones de esquema versionadas con Alembic; testing de integración con pytest.',
                'Procesamiento asíncrono en background y colas de trabajo con Celery.'
            ],
            tags: ['Python', 'FastAPI', 'Flask', 'Pydantic', 'SQLAlchemy', 'JWT / RBAC', 'Alembic', 'pytest', 'Celery', 'REST APIs']
        }
    },
    {
        id: 'cloud-devops',
        type: 'skill',
        label: 'Cloud & DevOps',
        detail: {
            kind: 'skill',
            title: 'Cloud & DevOps',
            text: 'Infraestructura productiva de punta a punta — no solo el deploy, sino la operación diaria de servidores en producción.',
            bullets: [
                'AWS EC2 + Nginx + SSL/HTTPS con dominios custom, en producción en Edisolutions.',
                'AWS S3 y un proxy seguro de archivos para contenido privado (resúmenes en PDF).',
                'Docker para empaquetar y desplegar SecretarIA; Redis para cache y colas de mensajes.',
                'Workers asíncronos en background para tareas que no deben bloquear la request.'
            ],
            tags: ['AWS EC2', 'AWS S3', 'Docker', 'Redis', 'Nginx', 'SSL/HTTPS', 'Linux', 'Dominios custom']
        }
    },
    {
        id: 'frontend',
        type: 'skill',
        label: 'Frontend',
        detail: {
            kind: 'skill',
            title: 'Frontend',
            text: 'Interfaces React tipadas de punta a punta, con foco en estado de servidor y una UI consistente.',
            bullets: [
                'Next.js / React como base del frontend en SecretarIA y Mueble Libre.',
                'TanStack Query para cache y sincronización de estado de servidor, con updates en tiempo real vía SSE.',
                'Tailwind CSS como sistema de estilos utilitario, consistente en todo el dashboard.',
                'TypeScript en todo el frontend, del componente a la llamada a la API.',
                'PWA y HTML/CSS semántico como base de performance y accesibilidad.'
            ],
            tags: ['TypeScript', 'JavaScript', 'Next.js', 'React', 'TanStack Query', 'Tailwind CSS', 'PWA']
        }
    },
    {
        id: 'data-integration',
        type: 'skill',
        label: 'Data & Integration',
        detail: {
            kind: 'skill',
            title: 'Data & Integration',
            text: 'La persistencia relacional y las integraciones externas que conectan el producto con el mundo real.',
            bullets: [
                'PostgreSQL como base principal; MySQL y SQLite según el proyecto.',
                'Server-Sent Events para actualizaciones en tiempo real sin polling.',
                'Google OAuth, Calendar y Meet integrados en el flujo de reservas de SecretarIA.',
                'WhatsApp Cloud API y Telegram como canales de atención multi-tenant.'
            ],
            tags: ['PostgreSQL', 'MySQL', 'SQLite', 'SSE', 'Google OAuth', 'WhatsApp Cloud API', 'Telegram', 'Git/GitHub']
        }
    },
    {
        id: 'python',
        type: 'tech',
        label: 'Python',
        detail: {
            kind: 'skill',
            title: 'Python',
            text: 'Lenguaje principal del backend en los dos proyectos productivos del portfolio.',
            bullets: [
                'Flask en Edisolutions: APIs REST con JWT/RBAC, en producción multi-tenant desde 2024.',
                'FastAPI en SecretarIA: arquitectura async con Pydantic y SQLAlchemy.',
                'pytest para cobertura de integración en los endpoints críticos.'
            ],
            tags: ['FastAPI', 'Flask', 'Pydantic', 'pytest', 'asyncio']
        }
    },
    {
        id: 'fastapi-flask',
        type: 'tech',
        label: 'FastAPI / Flask',
        detail: {
            kind: 'skill',
            title: 'FastAPI & Flask',
            text: 'Los dos frameworks que sostienen el backend de cada proyecto, elegidos según el caso de uso.',
            bullets: [
                'FastAPI en SecretarIA: tipado con Pydantic y async nativo, base del runtime conversacional con LangGraph.',
                'Flask en Edisolutions: APIs REST livianas con JWT/RBAC y aislamiento por tenant, en producción.'
            ],
            tags: ['FastAPI', 'Flask', 'Pydantic', 'JWT / RBAC']
        }
    },
    {
        id: 'orm-validation',
        type: 'tech',
        label: 'SQLAlchemy / Pydantic',
        detail: {
            kind: 'skill',
            title: 'SQLAlchemy & Pydantic',
            text: 'Capa de datos tipada de punta a punta: validación en el borde, persistencia relacional en el centro.',
            bullets: [
                'Pydantic valida y serializa cada request/response de la API.',
                'SQLAlchemy como ORM sobre PostgreSQL, con relaciones y queries para el modelo multi-tenant.',
                'Alembic versiona cada cambio de esquema con migraciones reproducibles.'
            ],
            tags: ['SQLAlchemy', 'Pydantic', 'Alembic', 'PostgreSQL']
        }
    },
    {
        id: 'auth',
        type: 'tech',
        label: 'JWT / RBAC',
        detail: {
            kind: 'skill',
            title: 'JWT & RBAC',
            text: 'Autenticación y autorización pensadas para SaaS multi-tenant: cada usuario ve solo lo suyo.',
            bullets: [
                'Tokens JWT para sesiones sin estado en el backend.',
                'Control de acceso por roles (RBAC) para diferenciar permisos de admin, staff y usuario final.',
                'Aislamiento de datos por tenant a nivel de query, en producción en Edisolutions.'
            ],
            tags: ['JWT', 'RBAC', 'Multi-tenant', 'Auth']
        }
    },
    {
        id: 'ts-js',
        type: 'tech',
        label: 'TypeScript / JS',
        detail: {
            kind: 'skill',
            title: 'TypeScript & JavaScript',
            text: 'Tipado end-to-end del frontend: menos bugs en runtime, refactors más seguros.',
            bullets: [
                'Tipos compartidos entre componentes y llamadas a la API en SecretarIA.',
                'Misma base de TypeScript/JavaScript en el marketplace Mueble Libre.'
            ],
            tags: ['TypeScript', 'JavaScript', 'Next.js']
        }
    },
    {
        id: 'nextjs-react',
        type: 'tech',
        label: 'Next.js / React',
        detail: {
            kind: 'skill',
            title: 'Next.js & React',
            text: 'Framework y librería principal del frontend en los dos proyectos personales.',
            bullets: [
                'Next.js con Server/Client Components como base de SecretarIA.',
                'TanStack Query para estado de servidor y actualizaciones en tiempo real vía SSE.',
                'Mueble Libre: listados, autenticación y flujos de usuario completos en React.'
            ],
            tags: ['Next.js', 'React', 'TanStack Query', 'SSE']
        }
    },
    {
        id: 'tailwind',
        type: 'tech',
        label: 'Tailwind CSS',
        detail: {
            kind: 'skill',
            title: 'Tailwind CSS',
            text: 'Sistema de estilos utilitario del dashboard de SecretarIA.',
            bullets: [
                'Diseño consistente sin CSS a medida por componente.',
                'Theming e iteración rápida de UI sobre un design system propio.'
            ],
            tags: ['Tailwind CSS', 'Design system']
        }
    },
    {
        id: 'llm-apps',
        type: 'tech',
        label: 'LLM Apps',
        detail: {
            kind: 'skill',
            title: 'LLM Apps',
            text: 'Integración de modelos de lenguaje en producción, no solo en prototipos.',
            bullets: [
                'Anthropic y OpenAI con ruteo de modelos según el caso de uso.',
                'Evaluación y benchmarking de respuestas antes de producción.',
                'Autorización, reglas de negocio y transiciones de estado se mantienen fuera del límite del LLM.'
            ],
            tags: ['Anthropic', 'OpenAI', 'Model routing', 'Evaluación', 'Prompting']
        }
    },
    {
        id: 'rag',
        type: 'tech',
        label: 'RAG',
        detail: {
            kind: 'skill',
            title: 'RAG (Retrieval-Augmented Generation)',
            text: 'Retrieval-Augmented Generation aplicado a ayuda y conocimiento operativo.',
            bullets: [
                'Búsqueda vectorial con FAISS sobre contenido indexado.',
                'Workflows de retrieval-first help/knowledge en SecretarIA.',
                'Embeddings e indexing asíncronos, sin bloquear el flujo conversacional.'
            ],
            tags: ['FAISS', 'Vector search', 'Embeddings', 'Retrieval']
        }
    }
];

const GRAPH_NODES_EN = [
    {
        id: 'pedro',
        type: 'core',
        label: 'Pedro Mesaglio',
        detail: {
            kind: 'about',
            title: 'Pedro Mesaglio',
            role: 'AI Engineer | Python Backend & Full-Stack Developer',
            paragraphs: [
                "I'm an AI Engineer and Full-Stack developer. I build SaaS and AI products end-to-end (0→1): functional scoping, architecture, development, third-party integrations, and cloud deployment.",
                'I mainly work with Python (FastAPI, Flask), REST APIs, JWT/RBAC, PostgreSQL, and AWS. On the applied AI side: LLM applications, RAG / vector search, LangGraph, and MCP integrations to automate workflows and improve user support.',
                'Currently pursuing a B.Sc. in Artificial Intelligence & Robotics at Universidad Empresarial Siglo 21, applying the coursework to real projects.'
            ],
            location: 'Buenos Aires, Argentina'
        }
    },
    {
        id: 'educacion',
        type: 'education',
        label: 'Education',
        detail: {
            kind: 'education',
            title: 'Education',
            institution: 'Universidad Empresarial Siglo 21',
            degree: 'B.Sc. in Artificial Intelligence & Robotics',
            period: 'March 2024 — Present',
            note: 'Applying the coursework to real projects (SecretarIA, Edisolutions) while completing the degree.',
            languages: [
                { lang: 'Spanish', level: 'Native' },
                { lang: 'English', level: 'Intermediate (spoken and written)' },
                { lang: 'Portuguese', level: 'Basic' }
            ]
        }
    },
    {
        id: 'contacto',
        type: 'contact',
        label: 'Contact',
        detail: {
            kind: 'contact',
            title: 'Contact',
            intro: "Got a project in mind? Let's talk.",
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
            companyNote: 'Condominium and building-management SaaS platform',
            period: 'May 2024 — Present',
            bullets: [
                'Designed and built an end-to-end SaaS platform, covering backend, frontend, third-party integrations and deployment.',
                'Implemented Python/Flask REST APIs with JWT authentication, role-based access control (RBAC), and per-tenant data isolation.',
                'Built a WhatsApp Cloud API self-service assistant for balance inquiries, PDF statements, issue reporting and emergencies.',
                'Integrated AWS S3 and a secure PDF proxy endpoint; managed AWS EC2, Nginx, SSL/HTTPS, custom domains and Alembic migrations.',
                'Resolved race conditions in a multi-worker production environment through idempotency guards and asynchronous background processing.',
                "Created pytest integration coverage for the bot's critical endpoints and contributed to product, UX/UI and monetization decisions."
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
            eyebrow: 'Personal project · AI',
            title: 'SecretarIA',
            desc: 'Multi-tenant AI virtual secretary for appointment booking, customer conversations, and operational workflows.',
            bullets: [
                'Modular monolith: FastAPI backend, Next.js/React frontend, PostgreSQL, Redis, Celery workers, and Docker-based deployment.',
                'Built a LangGraph conversational runtime that combines LLM interpretation with deterministic tools for availability, bookings, and human handoff.',
                'Integrated Anthropic and OpenAI with model routing, evaluation, and benchmarking; authorization and business rules stay outside the LLM boundary.',
                'Idempotent booking flows, secure sessions with CSRF protection, outbox events, and asynchronous retries.',
                'Google OAuth, Calendar, and Meet; WhatsApp, Telegram, and webchat channels; real-time updates via SSE.'
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
            eyebrow: 'Personal project · 2025',
            title: 'Mueble Libre',
            desc: 'End-to-end used-furniture marketplace: listings, authentication, and relational data modeling.',
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
            text: 'From prompting to production: models integrated with deterministic business rules around them, not inside the LLM.',
            bullets: [
                'LangGraph as the conversational runtime: combines LLM interpretation with deterministic tools.',
                'Anthropic and OpenAI integration with model routing, evaluation, and benchmarking.',
                'RAG with vector search (FAISS) for retrieval-first help/knowledge workflows.',
                'MCP integrations, workflow automation, and multi-channel chatbot design.'
            ],
            tags: ['LangGraph', 'Anthropic', 'OpenAI', 'RAG', 'FAISS', 'MCP', 'Prompting', 'Chatbot design']
        }
    },
    {
        id: 'backend',
        type: 'skill',
        label: 'Backend',
        detail: {
            kind: 'skill',
            title: 'Backend',
            text: 'REST APIs in Python built for multi-tenant production: end-to-end typing, robust authentication, and stable deployments.',
            bullets: [
                'Async architectures with FastAPI (SecretarIA) and synchronous REST APIs with Flask (Edisolutions).',
                'Data validation with Pydantic and persistence with SQLAlchemy on PostgreSQL/MySQL.',
                'JWT authentication, role-based access control (RBAC), and per-tenant data isolation in production.',
                'Versioned schema migrations with Alembic; integration testing with pytest.',
                'Background async processing and task queues with Celery.'
            ],
            tags: ['Python', 'FastAPI', 'Flask', 'Pydantic', 'SQLAlchemy', 'JWT / RBAC', 'Alembic', 'pytest', 'Celery', 'REST APIs']
        }
    },
    {
        id: 'cloud-devops',
        type: 'skill',
        label: 'Cloud & DevOps',
        detail: {
            kind: 'skill',
            title: 'Cloud & DevOps',
            text: 'End-to-end production infrastructure — not just deployment, but day-to-day server operations in production.',
            bullets: [
                'AWS EC2 + Nginx + SSL/HTTPS with custom domains, in production at Edisolutions.',
                'AWS S3 and a secure file proxy for private content (PDF statements).',
                'Docker to package and deploy SecretarIA; Redis for cache and message queues.',
                "Background async workers for tasks that shouldn't block the request."
            ],
            tags: ['AWS EC2', 'AWS S3', 'Docker', 'Redis', 'Nginx', 'SSL/HTTPS', 'Linux', 'Custom domains']
        }
    },
    {
        id: 'frontend',
        type: 'skill',
        label: 'Frontend',
        detail: {
            kind: 'skill',
            title: 'Frontend',
            text: 'End-to-end typed React interfaces, focused on server state and a consistent UI.',
            bullets: [
                'Next.js / React as the frontend foundation in SecretarIA and Mueble Libre.',
                'TanStack Query for caching and server-state sync, with real-time updates via SSE.',
                'Tailwind CSS as the utility-first styling system, consistent across the whole dashboard.',
                'TypeScript across the whole frontend, from the component to the API call.',
                'PWA and semantic HTML/CSS as the foundation for performance and accessibility.'
            ],
            tags: ['TypeScript', 'JavaScript', 'Next.js', 'React', 'TanStack Query', 'Tailwind CSS', 'PWA']
        }
    },
    {
        id: 'data-integration',
        type: 'skill',
        label: 'Data & Integration',
        detail: {
            kind: 'skill',
            title: 'Data & Integration',
            text: 'The relational persistence layer and the external integrations that connect the product to the real world.',
            bullets: [
                'PostgreSQL as the primary database; MySQL and SQLite depending on the project.',
                'Server-Sent Events for real-time updates without polling.',
                "Google OAuth, Calendar, and Meet integrated into SecretarIA's booking flow.",
                'WhatsApp Cloud API and Telegram as multi-tenant support channels.'
            ],
            tags: ['PostgreSQL', 'MySQL', 'SQLite', 'SSE', 'Google OAuth', 'WhatsApp Cloud API', 'Telegram', 'Git/GitHub']
        }
    },
    {
        id: 'python',
        type: 'tech',
        label: 'Python',
        detail: {
            kind: 'skill',
            title: 'Python',
            text: "The backend's main language across both production projects in this portfolio.",
            bullets: [
                'Flask at Edisolutions: REST APIs with JWT/RBAC, in multi-tenant production since 2024.',
                'FastAPI at SecretarIA: async architecture with Pydantic and SQLAlchemy.',
                'pytest for integration coverage on critical endpoints.'
            ],
            tags: ['FastAPI', 'Flask', 'Pydantic', 'pytest', 'asyncio']
        }
    },
    {
        id: 'fastapi-flask',
        type: 'tech',
        label: 'FastAPI / Flask',
        detail: {
            kind: 'skill',
            title: 'FastAPI & Flask',
            text: "The two frameworks behind each project's backend, chosen based on the use case.",
            bullets: [
                'FastAPI at SecretarIA: typed with Pydantic and native async, the base of the LangGraph conversational runtime.',
                'Flask at Edisolutions: lightweight REST APIs with JWT/RBAC and per-tenant isolation, in production.'
            ],
            tags: ['FastAPI', 'Flask', 'Pydantic', 'JWT / RBAC']
        }
    },
    {
        id: 'orm-validation',
        type: 'tech',
        label: 'SQLAlchemy / Pydantic',
        detail: {
            kind: 'skill',
            title: 'SQLAlchemy & Pydantic',
            text: 'End-to-end typed data layer: validation at the edge, relational persistence at the core.',
            bullets: [
                'Pydantic validates and serializes every API request/response.',
                'SQLAlchemy as the ORM over PostgreSQL, with relationships and queries for the multi-tenant model.',
                'Alembic versions every schema change with reproducible migrations.'
            ],
            tags: ['SQLAlchemy', 'Pydantic', 'Alembic', 'PostgreSQL']
        }
    },
    {
        id: 'auth',
        type: 'tech',
        label: 'JWT / RBAC',
        detail: {
            kind: 'skill',
            title: 'JWT & RBAC',
            text: 'Authentication and authorization built for multi-tenant SaaS: every user sees only their own data.',
            bullets: [
                'JWT tokens for stateless backend sessions.',
                'Role-based access control (RBAC) to separate admin, staff, and end-user permissions.',
                'Per-tenant data isolation at the query level, in production at Edisolutions.'
            ],
            tags: ['JWT', 'RBAC', 'Multi-tenant', 'Auth']
        }
    },
    {
        id: 'ts-js',
        type: 'tech',
        label: 'TypeScript / JS',
        detail: {
            kind: 'skill',
            title: 'TypeScript & JavaScript',
            text: 'End-to-end frontend typing: fewer runtime bugs, safer refactors.',
            bullets: [
                'Shared types between components and API calls in SecretarIA.',
                'Same TypeScript/JavaScript foundation in the Mueble Libre marketplace.'
            ],
            tags: ['TypeScript', 'JavaScript', 'Next.js']
        }
    },
    {
        id: 'nextjs-react',
        type: 'tech',
        label: 'Next.js / React',
        detail: {
            kind: 'skill',
            title: 'Next.js & React',
            text: 'The main frontend framework and library across both personal projects.',
            bullets: [
                'Next.js with Server/Client Components as the base of SecretarIA.',
                'TanStack Query for server state and real-time updates via SSE.',
                'Mueble Libre: listings, authentication, and complete user flows in React.'
            ],
            tags: ['Next.js', 'React', 'TanStack Query', 'SSE']
        }
    },
    {
        id: 'tailwind',
        type: 'tech',
        label: 'Tailwind CSS',
        detail: {
            kind: 'skill',
            title: 'Tailwind CSS',
            text: "SecretarIA dashboard's utility-first styling system.",
            bullets: [
                'Consistent design without custom CSS per component.',
                'Theming and fast UI iteration on top of an in-house design system.'
            ],
            tags: ['Tailwind CSS', 'Design system']
        }
    },
    {
        id: 'llm-apps',
        type: 'tech',
        label: 'LLM Apps',
        detail: {
            kind: 'skill',
            title: 'LLM Apps',
            text: 'Language model integration in production, not just in prototypes.',
            bullets: [
                'Anthropic and OpenAI with model routing based on the use case.',
                'Evaluation and benchmarking of responses before production.',
                'Authorization, business rules, and state transitions stay outside the LLM boundary.'
            ],
            tags: ['Anthropic', 'OpenAI', 'Model routing', 'Evaluation', 'Prompting']
        }
    },
    {
        id: 'rag',
        type: 'tech',
        label: 'RAG',
        detail: {
            kind: 'skill',
            title: 'RAG (Retrieval-Augmented Generation)',
            text: 'Retrieval-Augmented Generation applied to help content and operational knowledge.',
            bullets: [
                'Vector search with FAISS over indexed content.',
                'Retrieval-first help/knowledge workflows in SecretarIA.',
                'Asynchronous embeddings and indexing, without blocking the conversation flow.'
            ],
            tags: ['FAISS', 'Vector search', 'Embeddings', 'Retrieval']
        }
    }
];

let CURRENT_LANG = 'es';

function getNodes() {
    return CURRENT_LANG === 'en' ? GRAPH_NODES_EN : GRAPH_NODES_ES;
}

const UI_STRINGS = {
    es: {
        navAbout: 'Sobre mí',
        navExperience: 'Experiencia',
        navProjects: 'Proyectos',
        navSkills: 'Skills',
        navEducation: 'Educación',
        navContact: 'Contacto',
        cvLabel: 'Descargar CV',
        modeToList: 'Ver como lista',
        modeToGraph: 'Ver grafo',
        graphHint: '$ explorá el grafo — arrastrá los nodos, pasá el mouse para ver conexiones, hacé click para ver el detalle',
        langSwitchTo: 'EN'
    },
    en: {
        navAbout: 'About',
        navExperience: 'Experience',
        navProjects: 'Projects',
        navSkills: 'Skills',
        navEducation: 'Education',
        navContact: 'Contact',
        cvLabel: 'Download CV',
        modeToList: 'View as list',
        modeToGraph: 'View graph',
        graphHint: '$ explore the graph — drag the nodes, hover to see connections, click to see details',
        langSwitchTo: 'ES'
    }
};

function t(key) {
    return UI_STRINGS[CURRENT_LANG][key];
}

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
        <p class="detail-meta"><i class="fas fa-location-dot"></i> ${escapeHtml(d.location)}</p>
        ${d.paragraphs.map(p => `<p class="detail-paragraph">${escapeHtml(p)}</p>`).join('')}
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
        ${d.bullets && d.bullets.length ? `
            <ul class="project-list">
                ${d.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
            </ul>
        ` : ''}
        ${renderTags(d.tags)}
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
