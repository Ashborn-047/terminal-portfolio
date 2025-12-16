/* ==========================================================================
   MAN PAGES - Complete Documentation for All Commands
   ========================================================================== */

const MAN_PAGES = {
    // ==================== SYSTEM COMMANDS ====================
    whoami: {
        name: "whoami",
        synopsis: "whoami",
        description: "Print the current effective username. This is typically used in scripts or when switching between user sessions.",
        examples: ["whoami"],
        seeAlso: "ssh(1), sudo(1)"
    },

    theme: {
        name: "theme",
        synopsis: "theme [dark|light|matrix]",
        description: "Switch the terminal's visual theme. Available themes are 'dark' (default), 'light', and 'matrix'. The theme preference is persisted in local storage.",
        options: "dark - Dark background with cool gray text\nlight - Light background with dark text\nmatrix - Green-on-black hacker aesthetic",
        examples: ["theme dark", "theme light", "theme matrix"],
        seeAlso: "clear(1)"
    },

    clear: {
        name: "clear",
        synopsis: "clear",
        description: "Clear the terminal screen. All previous output is removed from view. Command history is preserved and can still be accessed with arrow keys.",
        notes: "Keyboard shortcut: Ctrl+L",
        examples: ["clear"],
        seeAlso: "exit(1)"
    },

    exit: {
        name: "exit",
        synopsis: "exit",
        description: "Terminate the current session. In this portfolio terminal, this simulates a logout. Refresh the page to start a new session.",
        notes: "All unsaved work in the editor will be lost.",
        examples: ["exit"],
        seeAlso: "ssh(1), logout"
    },

    ssh: {
        name: "ssh",
        synopsis: "ssh [user@host]",
        description: "OpenSSH client (simulated). Connect to a remote system securely. In this portfolio, available hosts are limited.",
        options: "portfolio@dodo.dev - Connect to the portfolio server as guest",
        notes: "Only 'portfolio@dodo.dev' is reachable. For privileged access, use 'sudo ssh dodo@dev'.",
        examples: ["ssh portfolio@dodo.dev"],
        seeAlso: "sudo(1), exit(1)"
    },

    sudo: {
        name: "sudo",
        synopsis: "sudo [COMMAND] [ARGS...]",
        description: "Execute a command as another user (typically root/admin). In this portfolio, sudo is used to access privileged sessions.",
        notes: "Guests have limited sudo privileges. Exception: 'sudo ssh dodo@dev' grants admin access to write to the guestbook.",
        examples: ["sudo ssh dodo@dev"],
        seeAlso: "ssh(1), whoami(1)"
    },

    // ==================== NAVIGATION COMMANDS ====================
    ls: {
        name: "ls",
        synopsis: "ls [DIRECTORY]",
        description: "List directory contents. If no directory is specified, lists the contents of the current working directory. Output includes file permissions, owner, size, and name.",
        options: "DIRECTORY - Optional path to list (supports ~, .., and absolute paths)",
        notes: "Directories are shown with a trailing slash (/). Project files are marked with an asterisk (*).",
        examples: ["ls", "ls ~", "ls /home", "ls ../"],
        seeAlso: "cd(1), cat(1)"
    },

    cd: {
        name: "cd",
        synopsis: "cd [DIRECTORY]",
        description: "Change the current working directory. With no arguments, changes to the user's home directory (~).",
        options: "DIRECTORY - Target directory path\n~ - User's home directory\n.. - Parent directory\n. - Current directory",
        examples: ["cd", "cd ~", "cd projects", "cd ..", "cd /var/guestbook"],
        seeAlso: "ls(1), pwd"
    },

    cat: {
        name: "cat",
        synopsis: "cat [FILE]",
        description: "Concatenate and print file contents to the terminal. Displays the entire content of the specified file.",
        notes: "Cannot be used on directories. For project files, consider using 'open' instead for a richer view.",
        examples: ["cat about.txt", "cat ~/contact.txt", "cat /etc/motd"],
        seeAlso: "vi(1), open(1), ls(1)"
    },

    // ==================== EDITOR COMMANDS ====================
    vi: {
        name: "vi",
        synopsis: "vi [FILE]",
        description: "Screen-oriented text editor (Lite version). Opens the specified file for viewing or editing. Support basic vi-style modal editing.",
        options: "FILE - Path to file to edit or create",
        notes: "Supported commands:\n  i - Enter INSERT mode\n  Esc - Return to NORMAL mode\n  :w - Write (save) file\n  :q - Quit editor\n  :wq - Write and quit\n  :q! - Quit without saving\n\nGuests are restricted to READ-ONLY mode. Use 'sudo ssh dodo@dev' for write access.",
        examples: ["vi about.txt", "vi /var/guestbook/messages.log", "vi newfile.txt"],
        seeAlso: "cat(1), nano"
    },

    // ==================== CONTENT COMMANDS ====================
    about: {
        name: "about",
        synopsis: "about",
        description: "Display information about the portfolio owner. This is a shortcut for 'cat ~/about.txt'.",
        notes: "Quick way to learn about the developer behind this portfolio.",
        examples: ["about"],
        seeAlso: "contact(1), projects(1), cat(1)"
    },

    projects: {
        name: "projects",
        synopsis: "projects",
        description: "Navigate to the projects directory and list all available projects. This is a shortcut that combines 'cd ~/projects' and 'ls'.",
        notes: "Project files (*.md) can be opened with the 'open' command for detailed view.",
        examples: ["projects"],
        seeAlso: "open(1), ls(1), cd(1)"
    },

    open: {
        name: "open",
        synopsis: "open [PROJECT_FILE]",
        description: "Open a project file in the graphical panel view. Displays project details including role, tech stack, summary, and challenges in a rich sidebar format.",
        notes: "Only works with project files (files with type 'project'). Use 'cat' for regular text files.",
        examples: ["open lifesync.md", "open terminus.md", "open chromadb.md"],
        seeAlso: "projects(1), cat(1), close"
    },

    logs: {
        name: "logs",
        synopsis: "logs",
        description: "Display the guestbook log file. This is a shortcut for 'cat /var/guestbook/messages.log'. View messages left by previous visitors.",
        notes: "To leave a message in the guestbook, gain write access with 'sudo ssh dodo@dev', then use 'vi /var/guestbook/messages.log'.",
        examples: ["logs"],
        seeAlso: "vi(1), cat(1), sudo(1)"
    },

    // ==================== UTILITY COMMANDS ====================
    contact: {
        name: "contact",
        synopsis: "contact",
        description: "Display contact information. This is a shortcut for 'cat ~/contact.txt'. Shows email, GitHub, LinkedIn, and other contact details.",
        examples: ["contact"],
        seeAlso: "about(1), cat(1)"
    },

    man: {
        name: "man",
        synopsis: "man [COMMAND]",
        description: "Display the manual page for a command. Provides detailed documentation including synopsis, description, options, examples, and related commands.",
        notes: "If you are lost, start with 'help' for an overview of available commands.",
        examples: ["man ls", "man vi", "man theme", "man man"],
        seeAlso: "help(1)"
    },

    reboot: {
        name: "reboot",
        synopsis: "reboot",
        description: "Restart the terminal system. This clears the local storage (memory) and reloads the page, which is useful for applying system updates.",
        examples: ["reboot"],
        seeAlso: "exit(1), clear(1)"
    },

    help: {
        name: "help",
        synopsis: "help [GROUP]",
        description: "Display information about available commands. Without arguments, shows all command groups. With a group name, shows commands in that specific group.",
        options: "GROUP - Optional command group (system, navigation, editor, content, utility)",
        examples: ["help", "help system", "help navigation", "help editor"],
        seeAlso: "man(1)"
    },

    // ==================== ALIAS COMMANDS ====================
    pwd: {
        name: "pwd",
        synopsis: "pwd",
        description: "Print the name of the current working directory. Displays the full absolute path from the root to your current location in the filesystem.",
        examples: ["pwd"],
        seeAlso: "cd(1), ls(1)"
    },

    cls: {
        name: "cls",
        synopsis: "cls",
        description: "Clear the terminal screen. This is an alias for 'clear', provided for convenience for users familiar with Windows/DOS.",
        notes: "Alias for: clear",
        examples: ["cls"],
        seeAlso: "clear(1)"
    },

    dir: {
        name: "dir",
        synopsis: "dir [DIRECTORY]",
        description: "List directory contents. This is an alias for 'ls', provided for convenience for users familiar with Windows/DOS.",
        notes: "Alias for: ls",
        examples: ["dir", "dir ~", "dir /home"],
        seeAlso: "ls(1), cd(1)"
    },

    logout: {
        name: "logout",
        synopsis: "logout",
        description: "Terminate the current session. This is an alias for 'exit'. Refresh the page to start a new session.",
        notes: "Alias for: exit",
        examples: ["logout"],
        seeAlso: "exit(1)"
    },

    quit: {
        name: "quit",
        synopsis: "quit",
        description: "Terminate the current session. This is an alias for 'exit'. Refresh the page to start a new session.",
        notes: "Alias for: exit",
        examples: ["quit"],
        seeAlso: "exit(1)"
    }
};

/* ==========================================================================
   COMMAND GROUPS - Organization of Commands
   ========================================================================== */

const COMMAND_GROUPS = {
    system: {
        name: 'System',
        description: 'System and session management commands',
        commands: ['whoami', 'theme', 'clear', 'exit', 'ssh', 'sudo']
    },
    navigation: {
        name: 'Navigation',
        description: 'File system navigation commands',
        commands: ['ls', 'cd', 'cat']
    },
    editor: {
        name: 'Editor',
        description: 'Text editing commands',
        commands: ['vi']
    },
    content: {
        name: 'Content',
        description: 'Portfolio content shortcuts',
        commands: ['about', 'projects', 'open', 'logs']
    },
    utility: {
        name: 'Utility',
        description: 'Help and information commands',
        commands: ['contact', 'man', 'help']
    }
};

/* ==========================================================================
   HELPER FUNCTIONS FOR MAN PAGES
   ========================================================================== */

function renderManPage(cmdName) {
    const page = MAN_PAGES[cmdName];
    if (!page) {
        return { type: 'error', message: `No manual entry for ${cmdName}` };
    }

    let html = '<div class="man-page">';

    // Header
    html += `<div class="man-header">`;
    html += `<span>${page.name.toUpperCase()}(1)</span>`;
    html += `<span>User Commands</span>`;
    html += `<span>${page.name.toUpperCase()}(1)</span>`;
    html += `</div>`;

    // Sections
    const sections = [
        { key: 'name', title: 'NAME' },
        { key: 'synopsis', title: 'SYNOPSIS' },
        { key: 'description', title: 'DESCRIPTION' },
        { key: 'options', title: 'OPTIONS' },
        { key: 'notes', title: 'NOTES' },
        { key: 'examples', title: 'EXAMPLES', isArray: true },
        { key: 'seeAlso', title: 'SEE ALSO' }
    ];

    for (const section of sections) {
        if (page[section.key]) {
            html += `<div class="man-section">`;
            html += `<span class="section-title">${section.title}</span>`;

            if (section.isArray) {
                const content = page[section.key].map(ex => `  $ ${ex}`).join('\n');
                html += `<span class="section-content">${content}</span>`;
            } else {
                html += `<span class="section-content">${page[section.key]}</span>`;
            }

            html += `</div>`;
        }
    }

    html += '</div>';
    return { type: 'html', content: html };
}

function renderHelpOutput(groupArg) {
    if (!groupArg) {
        let html = '<div class="help-output">';
        html += '<div class="title">AVAILABLE COMMAND GROUPS</div>';

        for (const [groupKey, group] of Object.entries(COMMAND_GROUPS)) {
            html += `<div class="help-group">`;
            html += `<span class="group-name">${groupKey}</span>`;
            html += `<span class="commands">${group.commands.join(', ')}</span>`;
            html += `</div>`;
        }

        html += '<div class="help-footer">Type: help &lt;group&gt; or man &lt;command&gt;</div>';
        html += '</div>';

        return { type: 'html', content: html };
    }

    const group = COMMAND_GROUPS[groupArg];
    if (!group) {
        return { type: 'error', message: `help: group '${groupArg}' not found.` };
    }

    return {
        type: 'text',
        lines: [
            `${group.name.toUpperCase()} COMMANDS`,
            `${group.description}`,
            '',
            ...group.commands.map(c => `  ${c.padEnd(12)} - ${MAN_PAGES[c]?.description?.split('.')[0] || 'No description'}`)
        ]
    };
}
