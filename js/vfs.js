/* ==========================================================================
   VIRTUAL FILE SYSTEM
   ========================================================================== */

const VFS = {
    // Initial filesystem structure
    initial: {
        "/": {
            type: "dir",
            children: {
                "home": {
                    type: "dir",
                    children: {
                        "guest": {
                            type: "dir",
                            children: {
                                "about.txt": {
                                    type: "file",
                                    content: "# From Curiosity to Creation\n\nI started as a mechanical engineer, fascinated by how things work. But I found my true calling not in gears and pistons, but in pixels and logic.\n\nThe transition was fueled by a simple loop: curiosity → tinkering → engineering → design.\n\nToday, I apply systems thinking to digital experiences, translating complex requirements into intuitive, human-centered interfaces. I don't just build; I craft universes where ideas can live."
                                },
                                "contact.txt": {
                                    type: "file",
                                    content: "EMAIL:   dev@dodo.dev\nGITHUB:  github.com/dododev\nLINKEDIN: linkedin.com/in/dododev\nTWITTER: @dododev"
                                },
                                "projects": {
                                    type: "dir",
                                    children: {
                                        "personal-portfolio.md": {
                                            type: "project",
                                            id: "personal-portfolio",
                                            content: "# Personal Portfolio v1.2\n\n## Overview\nA stunning cinematic portfolio showcasing the intersection of design and technology.\n\n## Key Features\n- Dual Dusk/Dawn themes\n- Interactive particle effects\n- Custom cursor animations\n- Glassmorphic UI with smooth transitions\n\n## Tech Stack\n- TypeScript\n- React\n- Framer Motion\n- CSS\n\n## Challenges\nCreating seamless theme transitions and optimizing particle effects for performance while maintaining visual fidelity.\n\n[Live Demo](https://personal-portfolio-v1-2.vercel.app)",
                                            details: {
                                                title: "Personal Portfolio v1.2",
                                                role: "Creator & Designer",
                                                stack: ["TypeScript", "React", "Framer Motion", "CSS"],
                                                summary: "A stunning cinematic portfolio showcasing the intersection of design and technology. Features dual Dusk/Dawn themes, particle effects, custom cursor animations, and glassmorphic UI with smooth transitions and immersive visuals.",
                                                challenges: "Creating seamless theme transitions and optimizing particle effects for performance while maintaining visual fidelity.",
                                                link: "https://personal-portfolio-v1-2.vercel.app"
                                            }
                                        },
                                        "ashborn-terminal.md": {
                                            type: "project",
                                            id: "ashborn-terminal",
                                            content: "# Ashborn Terminal OS\n\n## Overview\nA cinematic, terminal-driven personal operating system.\n\n## Key Features\n- Dynamic identity rendering\n- Adaptive memory archives\n- Encrypted communications simulation\n- Detailed project dossiers\n\n## Tech Stack\n- TypeScript\n- React\n- Framer Motion\n- CSS\n\n## Challenges\nBuilding a complex OS-like UI in the browser while ensuring smooth performance and responsive layout across devices.\n\n[Live Demo](https://ashborn-terminal-os.vercel.app)",
                                            details: {
                                                title: "Ashborn Terminal OS",
                                                role: "Creator & Engineer",
                                                stack: ["TypeScript", "React", "Framer Motion", "CSS"],
                                                summary: "A cinematic, terminal-driven personal operating system built with React, TypeScript, and Motion. Features dynamic identity rendering, adaptive memory archives, encrypted comms, and project dossiers. Powers my portfolio experience across GitHub Pages and Vercel.",
                                                challenges: "Building a complex OS-like UI in the browser while ensuring smooth performance and responsive layout across devices.",
                                                link: "https://ashborn-terminal-os.vercel.app"
                                            }
                                        },
                                        "lifesync.md": {
                                            type: "project",
                                            id: "lifesync",
                                            content: "# LifeSync (In Progress)\n\n## Overview\nA modular, AI-powered personal operating system built to scale from prototype to production.\n\n## Key Features\n- Behavioral analytics\n- Adaptive personas\n- Seamless cross-platform automation\n- Clean, event-driven architecture\n\n## Tech Stack\n- Python\n- TypeScript\n- AI/ML\n\n## Challenges\nIntegrating diverse AI models with real-time behavioral analytics and ensuring seamless synchronization across different platforms.",
                                            details: {
                                                title: "LifeSync",
                                                role: "Creator & Architect",
                                                stack: ["Python", "TypeScript", "AI/ML"],
                                                summary: "A modular, AI-powered personal operating system that unifies behavioral analytics, adaptive personas, and seamless cross-platform automation. Built to scale from prototype to production with a clean, event-driven architecture.",
                                                challenges: "Integrating diverse AI models with real-time behavioral analytics and ensuring seamless synchronization across different platforms.",
                                            }
                                        },
                                        "lifesync-design.md": {
                                            type: "project",
                                            id: "lifesync-design",
                                            content: "# LifeSync Design System\n\n## Overview\nComprehensive design system for LifeSync AI - Ashborn Edition v2.0.\n\n## Components\n- Design Foundations & Iconography\n- Complete Component Library\n- Mobile/Web Templates\n- Exportable Design Tokens\n\n## Tech Stack\n- TypeScript\n- React\n- Tailwind CSS\n- Radix UI\n\n## Challenges\nCreating a scalable and flexible design system that maintains consistency across web and mobile platforms.",
                                            details: {
                                                title: "LifeSync Design System",
                                                role: "Lead Designer & Developer",
                                                stack: ["TypeScript", "React", "Tailwind CSS", "Radix UI"],
                                                summary: "Comprehensive design system for LifeSync AI - Ashborn Edition v2.0. Features foundations, iconography, component library, mobile/web templates, and exportable design tokens. Built with React, TypeScript, Tailwind CSS, and Radix UI.",
                                                challenges: "Creating a scalable and flexible design system that maintains consistency across web and mobile platforms."
                                            }
                                        },
                                        "webtoon-redesign.md": {
                                            type: "project",
                                            id: "webtoon-redesign",
                                            content: "# Webtoon Ecosystem Platform Redesign\n\n## Overview\nStrategic UX transformation of Webtoon's web platform demonstrating full research documentation and ROI projections.\n\n## Key Features\n- Modular homepage redesign\n- Micro-personalization engine\n- Canvas creator visibility upgrade\n\n## Tech Stack\n- TypeScript\n- Next.js\n- React\n- Tailwind CSS\n\n## Challenges\nBalancing creator visibility with personalized reader recommendations while maintaining a cohesive visual identity.",
                                            details: {
                                                title: "Webtoon Ecosystem",
                                                role: "Lead UX Engineer",
                                                stack: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
                                                summary: "Strategic UX transformation of Webtoon's web platform — featuring a modular homepage redesign, micro-personalization engine, and Canvas creator visibility upgrade. Built for portfolio demonstration with full research documentation and ROI projections.",
                                                challenges: "Balancing creator visibility with personalized reader recommendations while maintaining a cohesive visual identity."
                                            }
                                        },
                                        "silverwall.md": {
                                            type: "project",
                                            id: "silverwall",
                                            content: "# Silverwall (In Progress)\n\n## Overview\nLive F1 telemetry dashboard featuring real-time car tracking on circuit maps.\n\n## Key Features\n- Real-time car tracking on circuit maps\n- Live leaderboard updates\n- Driver data visualization\n- OpenF1 API integration\n- Demo mode with simulated race data\n\n## Tech Stack\n- TypeScript\n- Python\n- React\n- FastAPI\n\n## Challenges\nHandling high-frequency telemetry data updates and rendering smooth real-time visualizations on the circuit map.\n\n[Live Demo](https://silverwall.vercel.app)",
                                            details: {
                                                title: "Silverwall",
                                                role: "Full Stack Engineer",
                                                stack: ["TypeScript", "Python", "React", "FastAPI"],
                                                summary: "Live F1 telemetry dashboard featuring real-time car tracking on circuit maps, leaderboard updates, and driver data visualization. React + FastAPI frontend/backend with OpenF1 API integration. Includes demo mode with simulated race data.",
                                                challenges: "Handling high-frequency telemetry data updates and rendering smooth real-time visualizations on the circuit map.",
                                                link: "https://silverwall.vercel.app"
                                            }
                                        },
                                        "kinetic-typography.md": {
                                            type: "project",
                                            id: "kinetic-typography",
                                            content: "# Kinetic Typography\n\n## Overview\nInteractive typography experiments exploring the intersection of motion and letterforms.\n\n## Key Features\n- 9 Unique Typographic Effects:\n  - Elastic physics\n  - Chromatic layers\n  - 3D eclipse shadows\n  - Glitch distortion\n  - Fluid turbulence\n  - And more...\n\n## Tech Stack\n- JavaScript\n- GSAP\n- Three.js\n- WebGL\n\n## Challenges\nOptimizing complex WebGL shaders and animation loops to ensure smooth performance across different devices.\n\n[Live Demo](https://ashborn-047.github.io/kinetic-typography/)",
                                            details: {
                                                title: "Kinetic Typography",
                                                role: "Creative Developer",
                                                stack: ["JavaScript", "GSAP", "Three.js", "WebGL"],
                                                summary: "Interactive typography experiments exploring the intersection of motion and letterforms. Features 9 unique effects including elastic physics, chromatic layers, 3D eclipse shadows, glitch distortion, and fluid turbulence. Built with vanilla JS, GSAP, and Three.js.",
                                                challenges: "Optimizing complex WebGL shaders and animation loops to ensure smooth performance across different devices.",
                                                link: "https://ashborn-047.github.io/kinetic-typography/"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "dodo": {
                            type: "dir",
                            children: {
                                ".secrets": {
                                    type: "file",
                                    content: "TOP SECRET: The matrix theme is just CSS variables.\n\nAlso, the cake is a lie."
                                },
                                "todo.txt": {
                                    type: "file",
                                    content: "[ ] Add more projects\n[ ] Implement new features\n[x] Create awesome terminal portfolio"
                                }
                            }
                        }
                    }
                },
                "var": {
                    type: "dir",
                    children: {
                        "guestbook": {
                            type: "dir",
                            children: {
                                "messages.log": {
                                    type: "file",
                                    content: "# Guestbook\n# Feel free to leave a message using 'vi'.\n# (Requires privileged access via: sudo ssh dodo@dev)\n\n"
                                }
                            }
                        }
                    }
                },
                "etc": {
                    type: "dir",
                    children: {
                        "motd": {
                            type: "file",
                            content: "Welcome to the Terminal Portfolio!\n\nType 'help' to get started."
                        }
                    }
                }
            }
        }
    },

    // Current filesystem state
    data: null,

    // Initialize VFS
    init() {
        const saved = localStorage.getItem('vfs_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge saved guestbook into initial VFS
                this.data = this.clone(this.initial);
                if (parsed['/']?.children?.var?.children?.guestbook) {
                    this.data['/'].children.var.children.guestbook = parsed['/'].children.var.children.guestbook;
                }
            } catch (e) {
                console.error("VFS Corruption, using defaults:", e);
                this.data = this.clone(this.initial);
            }
        } else {
            this.data = this.clone(this.initial);
        }
    },

    // Deep clone helper
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Get node at path
    getNode(path) {
        if (path === '/') return this.data['/'];
        const parts = path.split('/').filter(p => p);
        let current = this.data['/'];

        for (const part of parts) {
            if (current?.type !== 'dir' || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }

        return current;
    },

    // Resolve path (handles ~, .., .)
    resolvePath(cwd, target, user) {
        if (!target) {
            return { node: this.getNode(cwd), path: cwd };
        }

        let parts = cwd === '/' ? [] : cwd.split('/').filter(p => p);

        if (target.startsWith('/')) {
            parts = [];
            target = target.slice(1);
        } else if (target.startsWith('~')) {
            parts = user === 'dodo' ? ['home', 'dodo'] : ['home', 'guest'];
            target = target.slice(2);
        }

        const tokens = target.split('/');
        for (const token of tokens) {
            if (!token || token === '.') continue;
            if (token === '..') {
                if (parts.length > 0) parts.pop();
            } else {
                parts.push(token);
            }
        }

        const resolvedPath = '/' + parts.join('/');
        return { node: this.getNode(resolvedPath), path: resolvedPath };
    },

    // Write file to VFS
    writeFile(path, content) {
        const parts = path.split('/').filter(p => p);
        const fileName = parts.pop();
        let current = this.data['/'];

        // Create directories if needed
        for (const part of parts) {
            if (!current.children[part]) {
                current.children[part] = { type: 'dir', children: {} };
            }
            current = current.children[part];
        }

        current.children[fileName] = {
            type: 'file',
            content: content,
            size: content.length + 'B'
        };

        this.save();
    },

    // Save to localStorage
    save() {
        localStorage.setItem('vfs_data', JSON.stringify(this.data));
    }
};
