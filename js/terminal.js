/* ==========================================================================
   TERMINAL CONTROLLER
   ========================================================================== */

const Terminal = {
    // DOM Elements
    elements: {
        history: null,
        input: null,
        prompt: null,
        content: null,
        headerUser: null,
        headerTheme: null,
        terminalArea: null
    },

    // Command history for up/down navigation
    cmdHistory: [],
    cmdIndex: -1,

    // Initialize terminal
    init() {
        this.elements.history = document.getElementById('history');
        this.elements.input = document.getElementById('command-input');
        this.elements.prompt = document.getElementById('prompt');
        this.elements.content = document.getElementById('terminal-content');
        this.elements.headerUser = document.getElementById('header-user');
        this.elements.headerTheme = document.getElementById('header-theme');
        this.elements.terminalArea = document.getElementById('terminal-area');

        this.bindEvents();
    },

    // Bind event listeners
    bindEvents() {
        // Focus input when clicking terminal content
        this.elements.content.addEventListener('click', () => {
            if (!Editor.isActive()) {
                this.elements.input.focus();
            }
        });

        // Handle input
        this.elements.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    },

    // Handle keydown events
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.executeInput();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete();
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            this.clear();
        }
    },

    // Execute current input
    executeInput() {
        const input = this.elements.input.value.trim();

        // Add to history
        if (input) {
            this.cmdHistory.push(input);
            this.cmdIndex = this.cmdHistory.length;
        }

        // Display input line
        this.addInputLine(input);

        // Clear input
        this.elements.input.value = '';

        // Execute command
        if (input) {
            const result = executeCommand(
                input,
                App.state,
                App.setState.bind(App),
                Editor.open.bind(Editor),
                this.clear.bind(this),
                ProjectPanel.open.bind(ProjectPanel)
            );

            this.displayResult(result);
        }

        // Scroll to bottom
        this.scrollToBottom();
    },

    // Navigate command history
    navigateHistory(direction) {
        const newIndex = this.cmdIndex + direction;

        if (newIndex < 0 || newIndex > this.cmdHistory.length) {
            return;
        }

        this.cmdIndex = newIndex;

        if (newIndex === this.cmdHistory.length) {
            this.elements.input.value = '';
        } else {
            this.elements.input.value = this.cmdHistory[newIndex];
        }

        // Move cursor to end
        setTimeout(() => {
            this.elements.input.selectionStart = this.elements.input.value.length;
        }, 0);
    },

    // Autocomplete
    autocomplete() {
        const input = this.elements.input.value;
        const parts = input.split(/\s+/);

        // If first word, autocomplete commands
        if (parts.length === 1) {
            const commands = Object.keys(Commands);
            const matches = commands.filter(c => c.startsWith(parts[0]));

            if (matches.length === 1) {
                this.elements.input.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                this.addOutputLine(matches.join('  '), 'text');
            }
        }
        // If second word, autocomplete paths
        else if (parts.length >= 2) {
            const pathPart = parts[parts.length - 1];
            const dirPath = pathPart.includes('/')
                ? pathPart.substring(0, pathPart.lastIndexOf('/') + 1)
                : '';
            const prefix = pathPart.includes('/')
                ? pathPart.substring(pathPart.lastIndexOf('/') + 1)
                : pathPart;

            const res = VFS.resolvePath(App.state.cwd, dirPath || '.', App.state.user);

            if (res.node && res.node.type === 'dir') {
                const matches = Object.keys(res.node.children)
                    .filter(name => name.startsWith(prefix));

                if (matches.length === 1) {
                    const completed = dirPath + matches[0];
                    const isDir = res.node.children[matches[0]].type === 'dir';
                    parts[parts.length - 1] = completed + (isDir ? '/' : '');
                    this.elements.input.value = parts.join(' ');
                } else if (matches.length > 1) {
                    this.addOutputLine(matches.join('  '), 'text');
                }
            }
        }
    },

    // Add input line to history
    addInputLine(input) {
        const div = document.createElement('div');
        div.className = 'input-entry';
        div.innerHTML = `<span class="prompt">${this.getPromptText()}</span>${this.escapeHtml(input)}`;
        this.elements.history.appendChild(div);
    },

    // Add output line
    addOutputLine(text, type) {
        const div = document.createElement('div');
        div.className = type === 'error' ? 'error-line' :
            type === 'sys' ? 'sys-line' :
                'text-line';
        div.textContent = text;
        this.elements.history.appendChild(div);
    },

    // Add HTML output
    addHtmlOutput(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        this.elements.history.appendChild(div);
    },

    // Display command result
    displayResult(result) {
        if (!result || result.type === 'success' || result.type === 'clear') {
            return;
        }

        if (result.type === 'text' || result.type === 'sys') {
            result.lines.forEach(line => {
                this.addOutputLine(line, result.type);
            });
        } else if (result.type === 'error') {
            this.addOutputLine(result.message, 'error');
        } else if (result.type === 'html') {
            this.addHtmlOutput(result.content);
        }
    },

    // Show boot message
    showBootMessage() {
        const now = new Date().toLocaleString();
        this.addOutputLine(`Connecting to ${App.state.user}@${App.state.host}...`, 'sys');
        this.addOutputLine('Authentication successful.', 'sys');
        this.addOutputLine('', 'text');
        this.addOutputLine(`Last login: ${now} from web-client`, 'sys');
        this.addOutputLine('', 'text');
        this.addOutputLine('Type "help" to get started.', 'text');
    },

    // Clear terminal
    clear() {
        this.elements.history.innerHTML = '';
    },

    // Update prompt
    updatePrompt() {
        const state = App.state;
        const homePath = `/home/${state.user}`;
        const displayPath = state.cwd === homePath ? '~' :
            state.cwd.split('/').pop() || '/';
        const symbol = state.user === 'dodo' ? '#' : '$';

        this.elements.prompt.textContent = `${state.user}@${state.host}:${displayPath}${symbol}`;
        this.elements.headerUser.textContent = `${state.user}@${state.host}`;
    },

    // Get current prompt text
    getPromptText() {
        return this.elements.prompt.textContent;
    },

    // Scroll to bottom
    scrollToBottom() {
        this.elements.content.scrollTop = this.elements.content.scrollHeight;
    },

    // Escape HTML
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Focus input
    focus() {
        this.elements.input.focus();
    },

    // Disable input
    disable() {
        this.elements.input.disabled = true;
    },

    // Enable input
    enable() {
        this.elements.input.disabled = false;
        this.focus();
    }
};
