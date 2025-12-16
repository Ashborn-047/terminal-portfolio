/* ==========================================================================
   COMMAND IMPLEMENTATIONS
   Each command is a separate function for clean organization
   ========================================================================== */

const Commands = {
    // ==================== SYSTEM COMMANDS ====================

    whoami(args, state) {
        return { type: 'text', lines: [state.user] };
    },

    theme(args, state, setState) {
        const themeName = args[0];
        const validThemes = ['dark', 'light', 'matrix'];

        if (!themeName) {
            return { type: 'text', lines: [`Current theme: ${state.theme}`, `Available: ${validThemes.join(', ')}`] };
        }

        if (!validThemes.includes(themeName)) {
            return { type: 'error', message: `theme: invalid theme '${themeName}'. Use: ${validThemes.join(', ')}` };
        }

        setState('theme', themeName);
        return { type: 'text', lines: [`Theme set to ${themeName}`] };
    },

    clear(args, state, setState, openEditor, clearHistory) {
        clearHistory();
        return { type: 'clear' };
    },

    exit(args, state) {
        return {
            type: 'sys',
            lines: ['logout', 'Connection to ' + state.host + ' closed.', '', 'Refresh the page to reconnect.']
        };
    },

    reboot(args, state) {
        localStorage.removeItem('vfs_data');
        setTimeout(() => location.reload(), 1000);
        return {
            type: 'sys',
            lines: ['System reboot initiated...', 'Clearing memory buffers...', 'See you on the other side.']
        };
    },


    ssh(args, state, setState) {
        const target = args[0];

        if (!target) {
            return { type: 'error', message: 'usage: ssh [user@host]' };
        }

        if (target === 'portfolio@dodo.dev') {
            if (state.user === 'guest' && state.host === 'portfolio') {
                return { type: 'text', lines: ['Already connected to portfolio@dodo.dev'] };
            }
            setState('user', 'guest');
            setState('host', 'portfolio');
            setState('cwd', '/home/guest');
            return {
                type: 'sys',
                lines: ['Connecting to portfolio@dodo.dev...', 'Authentication successful.', '', 'Welcome back!']
            };
        }

        return { type: 'error', message: `ssh: connect to host ${target.split('@')[1] || target} port 22: Connection refused` };
    },

    sudo(args, state, setState) {
        if (args.length === 0) {
            return { type: 'error', message: 'usage: sudo <command>' };
        }

        if (args[0] === 'ssh' && args[1] === 'dodo@dev') {
            setState('user', 'dodo');
            setState('host', 'dev');
            setState('cwd', '/home/dodo');
            return {
                type: 'sys',
                lines: [
                    '[sudo] password for guest: ********',
                    'Authenticating...',
                    'Access granted.',
                    '',
                    'Welcome, admin. You now have write access to the filesystem.'
                ]
            };
        }

        if (state.user === 'guest') {
            return { type: 'error', message: `${state.user} is not in the sudoers file. This incident will be reported.` };
        }

        return { type: 'error', message: 'sudo: command not found or not permitted' };
    },

    // ==================== NAVIGATION COMMANDS ====================

    ls(args, state) {
        const target = args[0] || '';
        const res = VFS.resolvePath(state.cwd, target, state.user);

        if (!res.node) {
            return { type: 'error', message: `ls: cannot access '${target}': No such file or directory` };
        }

        const formatEntry = (name, node) => {
            const isDir = node.type === 'dir';
            const isProject = node.type === 'project';
            const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = node.size || (isDir ? '4.0K' : '100B');
            const suffix = isDir ? '/' : (isProject ? '*' : '');
            return `${perms}  ${isDir ? 2 : 1} ${state.user}  portfolio  ${size.padStart(6)}  ${name}${suffix}`;
        };

        if (res.node.type === 'dir') {
            const entries = Object.entries(res.node.children)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([name, node]) => formatEntry(name, node));

            return entries.length === 0
                ? { type: 'text', lines: ['(empty directory)'] }
                : { type: 'text', lines: entries };
        }

        return { type: 'text', lines: [formatEntry(target.split('/').pop(), res.node)] };
    },

    cd(args, state, setState) {
        const target = args[0] || '~';
        const res = VFS.resolvePath(state.cwd, target, state.user);

        if (!res.node) {
            return { type: 'error', message: `cd: ${args[0]}: No such file or directory` };
        }

        if (res.node.type !== 'dir') {
            return { type: 'error', message: `cd: ${args[0]}: Not a directory` };
        }

        setState('cwd', res.path);
        return { type: 'success' };
    },

    cat(args, state) {
        if (!args[0]) {
            return { type: 'error', message: 'cat: missing file operand' };
        }

        const res = VFS.resolvePath(state.cwd, args[0], state.user);

        if (!res.node) {
            return { type: 'error', message: `cat: ${args[0]}: No such file or directory` };
        }

        if (res.node.type === 'dir') {
            return { type: 'error', message: `cat: ${args[0]}: Is a directory` };
        }

        return { type: 'text', lines: res.node.content.split('\n') };
    },

    // ==================== EDITOR COMMANDS ====================

    vi(args, state, setState, openEditor) {
        const path = args[0];

        if (!path) {
            return { type: 'error', message: 'usage: vi <file>' };
        }

        const res = VFS.resolvePath(state.cwd, path, state.user);
        const isReadOnly = state.user === 'guest';

        let content = '';
        let filePath = res.path;

        if (res.node) {
            if (res.node.type === 'dir') {
                return { type: 'error', message: `vi: "${path}" is a directory` };
            }
            content = res.node.content;
        } else if (isReadOnly) {
            return { type: 'error', message: 'vi: cannot create file (read-only filesystem for guests)' };
        }

        openEditor(filePath, content, isReadOnly);
        return { type: 'success' };
    },

    // ==================== CONTENT SHORTCUTS ====================

    about(args, state) {
        return Commands.cat(['~/about.txt'], state);
    },

    contact(args, state) {
        return Commands.cat(['~/contact.txt'], state);
    },

    projects(args, state, setState) {
        const target = '~/projects';
        const res = VFS.resolvePath(state.cwd, target, state.user);

        if (!res.node) {
            return { type: 'error', message: 'Projects directory not found' };
        }

        setState('cwd', res.path);
        return Commands.ls([], { ...state, cwd: res.path });
    },

    logs(args, state) {
        return Commands.cat(['/var/guestbook/messages.log'], state);
    },

    open(args, state, setState, openEditor, clearHistory, openProject) {
        const target = args[0];

        if (!target) {
            return { type: 'error', message: 'usage: open <project-file>' };
        }

        const res = VFS.resolvePath(state.cwd, target, state.user);

        if (!res.node) {
            return { type: 'error', message: `open: ${target}: No such file` };
        }

        if (res.node.type === 'project' && res.node.details) {
            openProject(res.node.details);
            return { type: 'sys', lines: [`Opening ${res.node.details.title}...`] };
        }

        return { type: 'error', message: `open: ${target}: Not a project file. Use 'cat' for regular files.` };
    },

    // ==================== UTILITY COMMANDS ====================

    man(args) {
        const cmd = args[0];
        if (!cmd) {
            return { type: 'error', message: 'What manual page do you want?\nFor example, try: man ls' };
        }
        return renderManPage(cmd);
    },

    help(args) {
        return renderHelpOutput(args[0]);
    }
};

/* ==========================================================================
   COMMAND EXECUTOR
   ========================================================================== */

function executeCommand(input, state, setState, openEditor, clearHistory, openProject) {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!cmd) {
        return { type: 'success' };
    }

    if (Commands[cmd]) {
        return Commands[cmd](args, state, setState, openEditor, clearHistory, openProject);
    }

    // Check if it's a common typo or alternative
    const aliases = {
        'cls': 'clear',
        'dir': 'ls',
        'pwd': null, // Will handle specially
        'logout': 'exit',
        'quit': 'exit'
    };

    if (aliases[cmd] === null) {
        // Handle pwd specially
        return { type: 'text', lines: [state.cwd] };
    }

    if (aliases[cmd]) {
        return Commands[aliases[cmd]](args, state, setState, openEditor, clearHistory, openProject);
    }

    return { type: 'error', message: `${cmd}: command not found. Type 'help' for available commands.` };
}
