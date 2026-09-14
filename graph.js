// ---------------------------------------------------------------------------
// Graph engine: renders GRAPH_NODES/GRAPH_EDGES as an interactive force graph
// on wide viewports, and a static precomputed circular layout on narrow ones
// (touch-drag physics on small screens is unreliable, so we don't attempt it).
// ---------------------------------------------------------------------------

const GRAPH_BREAKPOINT = 768;

let graphState = {
    svg: null,
    nodesLayer: null,
    container: null,
    simulation: null,
    interactive: false
};

function nodeRadius(node) {
    if (node.type === 'core') return 58;
    if (node.featured) return 48;
    return 40;
}

function buildGraphDom() {
    const container = document.getElementById('graph-canvas');
    container.innerHTML = '';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'graph-edges');
    container.appendChild(svg);

    const nodesLayer = document.createElement('div');
    nodesLayer.className = 'graph-nodes';
    container.appendChild(nodesLayer);

    graphState.container = container;
    graphState.svg = svg;
    graphState.nodesLayer = nodesLayer;

    return { container, svg, nodesLayer };
}

function createNodeButton(node) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `graph-node graph-node--${node.type}`;
    if (node.featured) btn.classList.add('graph-node--featured');
    btn.dataset.id = node.id;
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.style.width = `${nodeRadius(node) * 2}px`;
    btn.style.height = `${nodeRadius(node) * 2}px`;

    const dot = document.createElement('span');
    dot.className = 'node-dot';
    btn.appendChild(dot);

    const label = document.createElement('span');
    label.className = 'node-label';
    label.textContent = node.label;
    btn.appendChild(label);

    return btn;
}

function connectedIds(nodeId) {
    const ids = new Set([nodeId]);
    const edgeKeys = new Set();
    GRAPH_EDGES.forEach(([a, b], i) => {
        if (a === nodeId || b === nodeId) {
            ids.add(a);
            ids.add(b);
            edgeKeys.add(i);
        }
    });
    return { ids, edgeKeys };
}

function setHighlight(nodeId) {
    const nodeButtons = graphState.nodesLayer.querySelectorAll('.graph-node');
    const edgeLines = graphState.svg.querySelectorAll('.graph-edge');

    if (!nodeId) {
        nodeButtons.forEach(el => el.classList.remove('is-dimmed', 'is-active'));
        edgeLines.forEach(el => el.classList.remove('is-dimmed', 'is-active'));
        return;
    }

    const { ids, edgeKeys } = connectedIds(nodeId);

    nodeButtons.forEach(el => {
        const active = ids.has(el.dataset.id);
        el.classList.toggle('is-active', active);
        el.classList.toggle('is-dimmed', !active);
    });

    edgeLines.forEach((el, i) => {
        const active = edgeKeys.has(i);
        el.classList.toggle('is-active', active);
        el.classList.toggle('is-dimmed', !active);
    });
}

function renderInteractiveGraph() {
    const { container, svg, nodesLayer } = buildGraphDom();
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    const nodes = GRAPH_NODES.map(n => ({ ...n }));
    const links = GRAPH_EDGES.map(([source, target]) => ({ source, target }));

    const cx = width / 2;
    const cy = height / 2;
    const seedRadius = Math.min(width, height) * 0.32;
    const others = nodes.filter(n => n.id !== 'pedro');
    others.forEach((node, i) => {
        const angle = (i / others.length) * Math.PI * 2 - Math.PI / 2;
        node.x = cx + seedRadius * Math.cos(angle);
        node.y = cy + seedRadius * Math.sin(angle);
    });

    const core = nodes.find(n => n.id === 'pedro');
    core.x = cx;
    core.y = cy;
    core.fx = cx;
    core.fy = cy;

    const lineEls = new Map();
    links.forEach((link, i) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'graph-edge');
        svg.appendChild(line);
        lineEls.set(i, line);
    });

    const nodeEls = new Map();
    nodes.forEach(node => {
        const btn = createNodeButton(node);
        nodesLayer.appendChild(btn);
        nodeEls.set(node.id, btn);
        d3.select(btn).datum(node);

        btn.addEventListener('mouseenter', () => setHighlight(node.id));
        btn.addEventListener('mouseleave', () => setHighlight(null));
        btn.addEventListener('focus', () => setHighlight(node.id));
        btn.addEventListener('blur', () => setHighlight(null));
        btn.addEventListener('click', () => openDetailPanel(node.id));
    });

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150).strength(0.6))
        .force('charge', d3.forceManyBody().strength(-260))
        .force('collide', d3.forceCollide(d => nodeRadius(d) + 26))
        .force('x', d3.forceX(width / 2).strength(0.04))
        .force('y', d3.forceY(height / 2).strength(0.04));

    simulation.on('tick', () => {
        links.forEach((link, i) => {
            if (!link.source || !link.target) return;
            const line = lineEls.get(i);
            line.setAttribute('x1', link.source.x);
            line.setAttribute('y1', link.source.y);
            line.setAttribute('x2', link.target.x);
            line.setAttribute('y2', link.target.y);
        });
        nodes.forEach(node => {
            const el = nodeEls.get(node.id);
            el.style.transform = `translate(-50%, -50%) translate(${node.x}px, ${node.y}px)`;
        });
    });

    const drag = d3.drag()
        .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
        })
        .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            if (d.id !== 'pedro') {
                d.fx = null;
                d.fy = null;
            }
        });

    nodes.forEach(node => {
        drag(d3.select(nodeEls.get(node.id)));
    });

    graphState.simulation = simulation;
    graphState.interactive = true;
}

function renderStaticGraph() {
    const { container, svg, nodesLayer } = buildGraphDom();
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.36;

    const others = GRAPH_NODES.filter(n => n.id !== 'pedro');
    const positions = { pedro: { x: cx, y: cy } };

    others.forEach((node, i) => {
        const angle = (i / others.length) * Math.PI * 2 - Math.PI / 2;
        positions[node.id] = {
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle)
        };
    });

    GRAPH_EDGES.forEach(([a, b]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'graph-edge');
        line.setAttribute('x1', positions[a].x);
        line.setAttribute('y1', positions[a].y);
        line.setAttribute('x2', positions[b].x);
        line.setAttribute('y2', positions[b].y);
        svg.appendChild(line);
    });

    GRAPH_NODES.forEach(node => {
        const btn = createNodeButton(node);
        const pos = positions[node.id];
        btn.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`;
        nodesLayer.appendChild(btn);

        btn.addEventListener('click', () => openDetailPanel(node.id));
        btn.addEventListener('focus', () => setHighlight(node.id));
        btn.addEventListener('blur', () => setHighlight(null));
    });

    graphState.interactive = false;
}

function teardownGraph() {
    if (graphState.simulation) {
        graphState.simulation.stop();
        graphState.simulation = null;
    }
}

function renderGraph() {
    teardownGraph();
    const isWide = window.innerWidth >= GRAPH_BREAKPOINT;
    if (isWide) {
        renderInteractiveGraph();
    } else {
        renderStaticGraph();
    }
}

let resizeTimer = null;
function scheduleGraphResize() {
    if (document.body.dataset.mode !== 'graph') return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderGraph, 200);
}

window.addEventListener('resize', scheduleGraphResize);
