// ---------------------------------------------------------------------------
// App shell: mode toggle (graph/list), detail panel open/close + focus
// management, list-mode scrollspy, initial boot.
// ---------------------------------------------------------------------------

let lastFocusedNode = null;

function openDetailPanel(nodeId) {
    const node = getNodes().find(n => n.id === nodeId);
    if (!node) return;

    lastFocusedNode = document.activeElement;

    const panel = document.getElementById('detail-panel');
    const body = document.getElementById('detail-panel-body');
    body.innerHTML = renderNodeDetail(node);

    panel.classList.add('open');
    document.getElementById('detail-backdrop').classList.add('visible');
    document.getElementById('panel-close-btn').focus();

    if (document.body.dataset.mode === 'graph') {
        setHighlight(nodeId);
    }
}

function closeDetailPanel() {
    document.getElementById('detail-panel').classList.remove('open');
    document.getElementById('detail-backdrop').classList.remove('visible');
    if (document.body.dataset.mode === 'graph') {
        setHighlight(null);
    }
    if (lastFocusedNode) {
        lastFocusedNode.focus();
        lastFocusedNode = null;
    }
}

function setMode(mode) {
    document.body.dataset.mode = mode;
    const graphView = document.getElementById('graph-view');
    const listView = document.getElementById('list-view');
    const toggleBtn = document.getElementById('mode-toggle');
    const listNav = document.getElementById('list-nav');

    if (mode === 'graph') {
        graphView.hidden = false;
        listView.hidden = true;
        listNav.hidden = true;
        toggleBtn.innerHTML = `<i class="fas fa-list"></i> <span>${t('modeToList')}</span>`;
        toggleBtn.classList.remove('is-cta');
        renderGraph();
    } else {
        graphView.hidden = true;
        listView.hidden = false;
        listNav.hidden = false;
        toggleBtn.innerHTML = `<i class="fas fa-diagram-project"></i> <span>${t('modeToGraph')}</span>`;
        toggleBtn.classList.add('is-cta');
        teardownGraph();
    }
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelector('.lang-toggle-label').textContent = t('langSwitchTo');
    document.documentElement.lang = CURRENT_LANG;
}

function setLang(lang) {
    if (lang === CURRENT_LANG) return;
    CURRENT_LANG = lang;
    try {
        localStorage.setItem('lang', lang);
    } catch (e) {
        // localStorage unavailable (private mode, etc.) — language just won't persist
    }

    closeDetailPanel();
    applyTranslations();
    buildListView();
    setMode(document.body.dataset.mode);
}

function initLangToggle() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
        setLang(CURRENT_LANG === 'en' ? 'es' : 'en');
    });
}

function initModeToggle() {
    const toggleBtn = document.getElementById('mode-toggle');
    toggleBtn.addEventListener('click', () => {
        const next = document.body.dataset.mode === 'graph' ? 'list' : 'graph';
        setMode(next);
    });
}

function initPanel() {
    document.getElementById('panel-close-btn').addEventListener('click', closeDetailPanel);
    document.getElementById('detail-backdrop').addEventListener('click', closeDetailPanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('detail-panel').classList.contains('open')) {
            closeDetailPanel();
        }
    });
}

function initListNav() {
    document.querySelectorAll('.list-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (document.body.dataset.mode !== 'list') return;
        const sections = document.querySelectorAll('#list-view section[id]');
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 120) {
                current = section.id;
            }
        });
        document.querySelectorAll('.list-nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedLang = localStorage.getItem('lang');
        if (savedLang === 'en' || savedLang === 'es') CURRENT_LANG = savedLang;
    } catch (e) {
        // localStorage unavailable — default language stands
    }

    applyTranslations();
    buildListView();
    initModeToggle();
    initLangToggle();
    initPanel();
    initListNav();

    setMode('list');
});
