// ---------------------------------------------------------------------------
// Linear "list mode" — same content/data as the graph, traditional scroll
// layout for anyone who wants to read fast instead of exploring the graph.
// ---------------------------------------------------------------------------

function buildListView() {
    const root = document.getElementById('list-view');
    const pedro = GRAPH_NODES.find(n => n.id === 'pedro');
    const edisolutions = GRAPH_NODES.find(n => n.id === 'edisolutions');
    const projects = GRAPH_NODES.filter(n => n.type === 'project');
    const skills = GRAPH_NODES.filter(n => n.type === 'skill');

    root.innerHTML = `
        <section id="about" class="about">
            <div class="container">
                <h2 class="section-title"><span class="section-number">01</span> Sobre mí</h2>
                <div class="about-grid">
                    <div class="about-text fade-in">
                        ${pedro.detail.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
                    </div>
                    <aside class="about-facts fade-in">
                        ${pedro.detail.facts.map(f => `
                            <div class="fact">
                                <span class="fact-label">${escapeHtml(f.label)}</span>
                                <span class="fact-value">${escapeHtml(f.value)}</span>
                            </div>
                        `).join('')}
                    </aside>
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

        <section id="contact" class="contact">
            <div class="container">
                <h2 class="section-title"><span class="section-number">05</span> Contacto</h2>
                <p class="contact-text">¿Tenés un proyecto en mente? Hablemos.</p>
                <div class="contact-links">
                    <a href="mailto:pedromesaglio05@gmail.com" class="contact-link fade-in">
                        <i class="fas fa-envelope"></i><span>pedromesaglio05@gmail.com</span>
                    </a>
                    <a href="tel:+5491139460342" class="contact-link fade-in">
                        <i class="fas fa-phone"></i><span>+54 9 11 3946-0342</span>
                    </a>
                    <a href="https://www.linkedin.com/in/pedro-mesaglio-49946a307/" class="contact-link fade-in" target="_blank" rel="noopener">
                        <i class="fab fa-linkedin"></i><span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/pedromesaglio" class="contact-link fade-in" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i><span>GitHub</span>
                    </a>
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
