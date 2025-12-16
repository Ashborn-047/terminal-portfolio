/* ==========================================================================
   PROJECT PANEL CONTROLLER
   ========================================================================== */

const ProjectPanel = {
    elements: { panel: null, title: null, content: null, closeBtn: null },

    init() {
        this.elements.panel = document.getElementById('project-panel');
        this.elements.title = document.getElementById('project-title');
        this.elements.content = document.getElementById('project-content');
        this.elements.closeBtn = document.getElementById('close-panel');
        this.elements.closeBtn.addEventListener('click', () => this.close());
    },

    open(details) {
        this.elements.title.textContent = details.title;
        this.elements.content.innerHTML = `
      <p class="project-summary">${details.summary}</p>
      <div class="project-section">
        <h3>Role</h3>
        <p>${details.role}</p>
      </div>
      <div class="project-section">
        <h3>Stack</h3>
        <div class="stack-tags">${details.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}</div>
      </div>
      <div class="project-section">
        <h3>Challenge</h3>
        <p>${details.challenges}</p>
      </div>
    `;
        this.elements.panel.classList.remove('hidden');
        document.getElementById('terminal-area').classList.add('with-panel');
    },

    close() {
        this.elements.panel.classList.add('hidden');
        document.getElementById('terminal-area').classList.remove('with-panel');
        Terminal.focus();
    }
};

/* ==========================================================================
   MAIN APPLICATION
   ========================================================================== */

const App = {
    state: { user: 'guest', host: 'portfolio', cwd: '/home/guest', theme: 'dark' },

    init() {
        // Load saved theme
        const savedTheme = localStorage.getItem('term_theme');
        if (savedTheme && CONFIG.themes[savedTheme]) {
            this.state.theme = savedTheme;
        }

        // Initialize modules
        VFS.init();
        Terminal.init();
        Editor.init();
        ProjectPanel.init();

        // Apply theme
        this.applyTheme(this.state.theme);

        // Boot sequence
        this.boot();
    },

    boot() {
        setTimeout(() => {
            document.getElementById('boot-screen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
            Terminal.showBootMessage();
            Terminal.updatePrompt();
            Terminal.focus();
        }, 800);
    },

    setState(key, value) {
        this.state[key] = value;

        if (key === 'user' || key === 'host' || key === 'cwd') {
            Terminal.updatePrompt();
        }

        if (key === 'theme') {
            this.applyTheme(value);
        }
    },

    applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        document.getElementById('header-theme').textContent = themeName;
        localStorage.setItem('term_theme', themeName);

        // Apply CSS variables
        const tokens = CONFIG.themes[themeName];
        if (tokens) {
            Object.entries(tokens).forEach(([key, val]) => {
                document.documentElement.style.setProperty(key, val);
            });
        }
    }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
