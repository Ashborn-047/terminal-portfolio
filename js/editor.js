/* ==========================================================================
   VI EDITOR CONTROLLER
   ========================================================================== */

const Editor = {
    elements: { container: null, textarea: null, modeDisplay: null, fileDisplay: null },
    state: { active: false, file: null, originalContent: '', mode: 'normal', isReadOnly: false, cmdBuffer: '' },

    init() {
        this.elements.container = document.getElementById('vi-editor');
        this.elements.textarea = document.getElementById('editor-textarea');
        this.elements.modeDisplay = document.getElementById('editor-mode');
        this.elements.fileDisplay = document.getElementById('editor-file');
        this.elements.container.addEventListener('keydown', (e) => this.handleKeyDown(e));
    },

    isActive() { return this.state.active; },

    open(filePath, content, isReadOnly) {
        this.state = { active: true, file: filePath, originalContent: content, mode: 'normal', isReadOnly, cmdBuffer: '' };
        this.elements.textarea.value = content;
        this.elements.textarea.readOnly = true;
        this.elements.fileDisplay.textContent = `${filePath}${isReadOnly ? ' [RO]' : ''}`;
        this.updateModeDisplay();
        this.elements.container.classList.remove('hidden');
        Terminal.disable();
        this.elements.container.focus();
    },

    close() {
        this.state.active = false;
        this.elements.container.classList.add('hidden');
        Terminal.enable();
    },

    handleKeyDown(e) {
        if (!this.state.active) return;
        if (this.state.mode === 'normal') { e.preventDefault(); this.handleNormal(e); }
        else if (this.state.mode === 'insert') { if (e.key === 'Escape') { e.preventDefault(); this.enterNormal(); } }
        else if (this.state.mode === 'command') { e.preventDefault(); this.handleCommand(e); }
    },

    handleNormal(e) {
        if (e.key === 'i' && !this.state.isReadOnly) this.enterInsert();
        else if (e.key === ':') this.enterCommand();
    },

    handleCommand(e) {
        if (e.key === 'Enter') this.executeCmd();
        else if (e.key === 'Escape') this.enterNormal();
        else if (e.key === 'Backspace') { this.state.cmdBuffer = this.state.cmdBuffer.slice(0, -1) || ':'; this.updateModeDisplay(); }
        else if (e.key.length === 1) { this.state.cmdBuffer += e.key; this.updateModeDisplay(); }
    },

    enterInsert() { this.state.mode = 'insert'; this.elements.textarea.readOnly = false; this.elements.textarea.focus(); this.updateModeDisplay(); },
    enterNormal() { this.state.mode = 'normal'; this.state.cmdBuffer = ''; this.elements.textarea.readOnly = true; this.elements.container.focus(); this.updateModeDisplay(); },
    enterCommand() { this.state.mode = 'command'; this.state.cmdBuffer = ':'; this.updateModeDisplay(); },

    executeCmd() {
        const cmd = this.state.cmdBuffer.slice(1);
        if (cmd === 'q' || cmd === 'q!') this.close();
        else if (cmd === 'w') { if (!this.state.isReadOnly) { VFS.writeFile(this.state.file, this.elements.textarea.value); } this.enterNormal(); }
        else if (cmd === 'wq' || cmd === 'x') { if (!this.state.isReadOnly) VFS.writeFile(this.state.file, this.elements.textarea.value); this.close(); }
        else this.enterNormal();
    },

    updateModeDisplay() { this.elements.modeDisplay.textContent = this.state.mode === 'command' ? this.state.cmdBuffer : `-- ${this.state.mode.toUpperCase()} --`; }
};
