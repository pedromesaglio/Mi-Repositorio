// ---------------------------------------------------------------------------
// Linear "list mode" — same content/data as the graph, traditional scroll
// layout for anyone who wants to read fast instead of exploring the graph.
// ---------------------------------------------------------------------------

function buildListView() {
    const root = document.getElementById('list-view');
    const pedro = GRAPH_NODES.find(n => n.id === 'pedro');
    const edisolutions = GRAPH_NODES.find(n => n.id === 'edisolutions');
    const educacion = GRAPH_NODES.find(n => n.id === 'educacion');
    const contacto = GRAPH_NODES.find(n => n.id === 'contacto');
    const projects = GRAPH_NODES.filter(n => n.type === 'project');
    const skills = GRAPH_NODES.filter(n => n.type === 'skill');

    root.innerHTML = `
        <section id="about" class="about">
            <div class="container">
                <h2 class="section-title"><span class="section-number">01</span> Sobre mí</h2>
                <div class="about-content fade-in">
                    <p class="about-meta"><i class="fas fa-location-dot"></i> ${escapeHtml(pedro.detail.location)}</p>
                    <div class="about-text">
                        ${pedro.detail.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section id="experience" class="experience">
            <div class="container">
                <h2 class="section-title"><span class="section-number">02</span> Experiencia</h2>
                <div class="experience-card fade-in">
                    ${renderExperienceContent(edisolutions)}
                </div>
            </div>
        </section>

        <section id="projects" class="projects">
            <div class="container">
                <h2 class="section-title"><span class="section-number">03</span> Proyectos</h2>
                ${projects.map(p => `
                    <div class="project-card fade-in ${p.featured ? 'project-card--featured' : ''}">
                        ${renderProjectContent(p)}
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="skills" class="skills">
            <div class="container">
                <h2 class="section-title"><span class="section-number">04</span> Skills</h2>
                <div class="skills-grid">
                    ${skills.map((s, i) => `
                        <div class="skill-card fade-in">
                            <span class="skill-index">0${i + 1}</span>
                            <h3>${escapeHtml(s.detail.title)}</h3>
                            <p>${escapeHtml(s.detail.text)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="education" class="about">
            <div class="container">
                <h2 class="section-title"><span class="section-number">05</span> Educación</h2>
                <div class="about-grid">
                    <div class="about-text fade-in">
                        <h3>${escapeHtml(educacion.detail.degree)}</h3>
                        <p>${escapeHtml(educacion.detail.institution)} · ${escapeHtml(educacion.detail.period)}</p>
                        <p>${escapeHtml(educacion.detail.note)}</p>
                    </div>
                    <aside class="about-facts fade-in">
                        ${educacion.detail.languages.map(l => `
                            <div class="fact">
                                <span class="fact-label">${escapeHtml(l.lang)}</span>
                                <span class="fact-value">${escapeHtml(l.level)}</span>
                            </div>
                        `).join('')}
                    </aside>
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2 class="section-title"><span class="section-number">06</span> Contacto</h2>
                <p class="contact-text">${escapeHtml(contacto.detail.intro)}</p>
                <div class="contact-links">
                    ${contacto.detail.channels.map(c => `
                        <a href="${c.href}" class="contact-link fade-in" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                            <i class="${c.icon}"></i><span>${escapeHtml(c.label)}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>

        <footer class="footer">
            <div class="container footer-inner">
                <p>&copy; 2026 Pedro Mesaglio</p>
                <p class="footer-tag">AI Engineer &amp; Full-Stack Developer</p>
            </div>
        </footer>
    `;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 30);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    root.querySelectorAll('.fade-in').forEach(el => revealObserver.observe(el));
}
