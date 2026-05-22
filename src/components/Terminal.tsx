import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import dynamic from 'next/dynamic';
import { resolvePath, getNode, listDirectory, FileSystemNode } from '../data/filesystem';
import { findProject, projects, Project } from '../data/projects';

// Dynamic import to prevent SSR issues with StackBlitz
const StackBlitzEmbed = dynamic(() => import('./StackBlitzEmbed'), { ssr: false });

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'ascii';
  content: string;
}

// Snake game types
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

interface SnakeGameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  score: number;
  gameOver: boolean;
  started: boolean;
}

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 10;

const createInitialSnakeState = (): SnakeGameState => ({
  snake: [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ],
  food: { x: 15, y: 5 },
  direction: 'RIGHT',
  score: 0,
  gameOver: false,
  started: false,
});

const ASCII_NAME = ` ██████╗ ██╗    ██╗███████╗███╗   ██╗    ███████╗██╗███████╗██╗  ██╗███████╗██████╗
██╔═══██╗██║    ██║██╔════╝████╗  ██║    ██╔════╝██║██╔════╝██║  ██║██╔════╝██╔══██╗
██║   ██║██║ █╗ ██║█████╗  ██╔██╗ ██║    █████╗  ██║███████╗███████║█████╗  ██████╔╝
██║   ██║██║███╗██║██╔══╝  ██║╚██╗██║    ██╔══╝  ██║╚════██║██╔══██║██╔══╝  ██╔══██╗
╚██████╔╝╚███╔███╔╝███████╗██║ ╚████║    ██║     ██║███████║██║  ██║███████╗██║  ██║
 ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`;

const WELCOME_TEXT = `
Welcome to Owen Fisher's interactive terminal portfolio.

Try these:
  projects          Browse backend and infrastructure work
  open flux         Inspect a project in the TUI preview
  code prepme       Open source in a StackBlitz sandbox
  run flux          Launch a live data pipeline demo
  neofetch          System info, terminal-style

Type 'help' for the full command list.
`;

// Helper function to convert URLs in text to clickable links
function linkifyText(text: string): (string | React.ReactElement)[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ color: 'var(--accent)' }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

const COMMANDS = [
  'help', 'clear', 'pwd', 'ls', 'cd', 'cat', 'whoami', 'contact',
  'mailto', 'sudo', 'echo', 'date', 'neofetch', 'npm', 'nrd',
  'history', 'tree', 'git', 'fortune', 'cowsay', 'snake', 'coffee',
  'sl', 'rm', 'vim', 'exit', 'theme', 'run', 'resume', 'make',
  'projects', 'open', 'code', 'sandbox', 'demo', 'skills', 'experience',
];

const HELP_TEXT = `
COOL STUFF
  projects         Browse project files           open <project>   Select project
  code <project>   Open source sandbox            demo <project>   Run scripted demo
  run flux         Live pipeline demo             neofetch         System info
  theme <name>     Switch theme                   git log          GitHub activity

NAVIGATE                                         PORTFOLIO
  ls / cd / cat / pwd / tree                       whoami  contact  resume  skills

SHORTCUTS: Tab autocomplete | Up/Down history | Ctrl+L clear | Ctrl+C cancel
`;

interface TerminalViewProps {
  onClose?: () => void;
  initialCommand?: string;
}

export default function TerminalView({ onClose, initialCommand }: TerminalViewProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'ascii', content: ASCII_NAME },
    { type: 'output', content: WELCOME_TEXT }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentDir, setCurrentDir] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [stackblitzProject, setStackblitzProject] = useState<Project | null>(null);
  const [theme, setTheme] = useState<string>('default');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'flux');
  const fluxDemoRef = useRef<NodeJS.Timeout | null>(null);

  // Snake game state
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const [snakeGame, setSnakeGame] = useState<SnakeGameState>(createInitialSnakeState());
  const snakeDirectionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Fallback: just maximize the container
        setIsFullscreen(!isFullscreen);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    } else {
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleMinimize = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        setIsMinimized(true);
      });
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  // Snake game functions
  const spawnFood = (snake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_HEIGHT),
      };
    } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  };

  const startSnakeGame = () => {
    const initialState = createInitialSnakeState();
    setSnakeGame(initialState);
    snakeDirectionRef.current = 'RIGHT';
    setIsPlayingSnake(true);
  };

  const endSnakeGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setIsPlayingSnake(false);
    addLine('output', `Game Over! Final score: ${snakeGame.score}`);
  };

  const updateSnakeGame = () => {
    setSnakeGame(prev => {
      if (prev.gameOver || !prev.started) return prev;

      const head = prev.snake[0];
      const direction = snakeDirectionRef.current;

      let newHead: Position;
      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= BOARD_WIDTH ||
          newHead.y < 0 || newHead.y >= BOARD_HEIGHT) {
        return { ...prev, gameOver: true };
      }

      // Check self collision
      if (prev.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        return { ...prev, gameOver: true };
      }

      const newSnake = [newHead, ...prev.snake];
      let newFood = prev.food;
      let newScore = prev.score;

      // Check food collision
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newScore += 10;
        newFood = spawnFood(newSnake);
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
        direction,
      };
    });
  };

  const renderSnakeBoard = (): string => {
    const board: string[][] = [];

    // Initialize empty board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      board[y] = [];
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[y][x] = ' ';
      }
    }

    // Place food
    board[snakeGame.food.y][snakeGame.food.x] = '◆';

    // Place snake
    snakeGame.snake.forEach((seg, i) => {
      if (seg.y >= 0 && seg.y < BOARD_HEIGHT && seg.x >= 0 && seg.x < BOARD_WIDTH) {
        board[seg.y][seg.x] = i === 0 ? '●' : '○';
      }
    });

    // Build board string with border
    const topBorder = '┌' + '─'.repeat(BOARD_WIDTH) + '┐';
    const bottomBorder = '└' + '─'.repeat(BOARD_WIDTH) + '┘';

    const rows = board.map(row => '│' + row.join('') + '│');

    const instructions = snakeGame.started
      ? (snakeGame.gameOver ? 'GAME OVER! Press any key to exit' : 'Arrow keys or WASD to move')
      : 'Press any key to start';

    return [
      '',
      '  🐍 SNAKE',
      '',
      topBorder,
      ...rows,
      bottomBorder,
      '',
      `  Score: ${snakeGame.score}`,
      `  ${instructions}`,
      '',
    ].join('\n');
  };

  // Snake game loop effect
  useEffect(() => {
    if (isPlayingSnake && snakeGame.started && !snakeGame.gameOver) {
      gameLoopRef.current = setInterval(updateSnakeGame, 150);
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [isPlayingSnake, snakeGame.started, snakeGame.gameOver]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
    const saved = localStorage.getItem('terminal-theme');
    if (saved) {
      setTheme(saved);
      if (saved === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', saved);
      }
    }
    const savedAccent = localStorage.getItem('terminal-accent');
    if (savedAccent) {
      document.documentElement.style.setProperty('--accent', savedAccent);
      document.documentElement.style.setProperty('--accent-glow', `${savedAccent}26`);
    }
  }, []);

  const initialCommandRef = useRef(initialCommand);
  useEffect(() => {
    if (initialCommandRef.current) {
      const cmd = initialCommandRef.current;
      initialCommandRef.current = undefined;
      setTimeout(() => executeCommand(cmd), 500);
    }
  }, []);

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('terminal-theme', theme);
  }, [theme]);

  // Snake game keyboard controls
  useEffect(() => {
    if (!isPlayingSnake) return;

    const handleSnakeKeyDown = (e: globalThis.KeyboardEvent) => {
      // Prevent default for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
      }

      // If game over, any key exits
      if (snakeGame.gameOver) {
        endSnakeGame();
        return;
      }

      // If not started, any key starts the game
      if (!snakeGame.started) {
        setSnakeGame(prev => ({ ...prev, started: true }));
        return;
      }

      // Direction controls
      const currentDir = snakeDirectionRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir !== 'DOWN') snakeDirectionRef.current = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir !== 'UP') snakeDirectionRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir !== 'RIGHT') snakeDirectionRef.current = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir !== 'LEFT') snakeDirectionRef.current = 'RIGHT';
          break;
        case 'Escape':
          endSnakeGame();
          break;
      }
    };

    window.addEventListener('keydown', handleSnakeKeyDown);
    return () => window.removeEventListener('keydown', handleSnakeKeyDown);
  }, [isPlayingSnake, snakeGame.gameOver, snakeGame.started]);

  const getPrompt = () => {
    const path = currentDir.length === 0 ? '~' : '~/' + currentDir.join('/');
    return `visitor@owenfisher.dev:${path}$ `;
  };

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { type, content }]);
  };

  const selectedProject = projects.find(project => project.id === selectedProjectId) || projects[0];

  const formatProjectSummary = (project: Project): string => {
    const links = [
      project.links.github ? `source:  ${project.links.github}` : '',
      project.links.demo ? `demo:    ${project.links.demo}` : '',
      project.stackblitz ? `sandbox: code ${project.id}` : '',
      project.terminalDemo ? `demo:    ${project.terminalDemo}` : '',
    ].filter(Boolean);

    return `projects/${project.slug}

${project.title} (${project.year})
role:  ${project.role}
stack: ${project.stack.join(', ')}

${project.description}

proof:
${project.metrics.map(metric => `  - ${metric}`).join('\n')}

preview:
${project.preview.map(line => `  > ${line}`).join('\n')}

${links.join('\n')}`;
  };

  const listProjects = () => {
    const rows = projects.map(project => {
      const marker = project.id === selectedProjectId ? '>' : ' ';
      const tags = project.categories.filter(cat => cat !== 'highlighted').slice(0, 2).join(',');
      return `${marker} ${project.slug.padEnd(20)} ${project.role.padEnd(32)} ${tags}`;
    });
    addLine('output', `PROJECTS
  FILE                 ROLE                             TAGS
  ${'─'.repeat(72)}
${rows.join('\n')}

Use: open <project>, cat projects/<project>.md, code <project>, demo <project>`);
  };

  const selectProject = (query?: string, silent = false): Project | null => {
    const project = findProject(query);
    if (!project) {
      addLine('error', `open: project '${query || ''}' not found. Try: projects`);
      return null;
    }
    setSelectedProjectId(project.id);
    if (!silent) addLine('output', formatProjectSummary(project));
    return project;
  };

  const openProjectSandbox = (project: Project) => {
    if (project.stackblitz) {
      addLine('success', `Launching StackBlitz sandbox for ${project.title}...`);
      setTimeout(() => setStackblitzProject(project), 300);
      return;
    }

    if (project.links.github) {
      addLine('output', `${project.title} does not have an embedded sandbox yet.`);
      addLine('success', `Opening source: ${project.links.github}`);
      window.open(project.links.github, '_blank');
      return;
    }

    addLine('error', `code: no source configured for ${project.title}`);
  };

  const suggestCommand = (cmd: string): string | null => {
    let best = '';
    let bestScore = 0;
    for (const candidate of COMMANDS) {
      let score = 0;
      for (let i = 0; i < Math.min(cmd.length, candidate.length); i++) {
        if (cmd[i] === candidate[i]) score++;
      }
      if (candidate.includes(cmd) || cmd.includes(candidate)) score += 2;
      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    }
    return bestScore >= 2 ? best : null;
  };

  // Get project from current directory
  const getCurrentProject = (): Project | null => {
    // Check if we're in a project directory: projects/<project-id>
    if (currentDir[0] === 'projects' && currentDir.length >= 2) {
      const projectId = currentDir[1];
      return projects.find(p => p.id === projectId) || null;
    }
    return null;
  };

  // Handle npm run dev command
  const handleNpmRunDev = (targetProject?: Project) => {
    const project = targetProject || getCurrentProject();

    if (!project) {
      addLine('error', 'npm ERR! Missing script: "dev"');
      addLine('error', 'npm ERR! Navigate to a project directory first: cd projects/<project-name>');
      return;
    }

    if (!project.stackblitz) {
      // No StackBlitz config, open demo URL if available
      if (project.links.demo) {
        addLine('output', `> ${project.title}@1.0.0 dev`);
        addLine('output', '> next dev');
        addLine('output', '');
        addLine('success', `Starting development server...`);
        addLine('output', `Opening ${project.links.demo}`);
        window.open(project.links.demo, '_blank');
      } else {
        addLine('error', `npm ERR! No dev server configured for ${project.title}`);
        addLine('output', 'Try: cat README.md or code <project> for more information');
      }
      return;
    }

    // Has StackBlitz config - launch embedded IDE
    addLine('output', `> ${project.title}@1.0.0 dev`);
    addLine('output', '> next dev');
    addLine('output', '');
    addLine('success', 'Launching StackBlitz development environment...');

    // Small delay for visual feedback
    setTimeout(() => {
      setStackblitzProject(project);
    }, 300);
  };

  // Build tree output for directory
  const buildTree = (node: FileSystemNode, name: string, prefix: string = '', isLast: boolean = true): string => {
    let result = prefix + (prefix ? (isLast ? '└── ' : '├── ') : '') + name;

    if (node.type === 'directory' && node.children) {
      result += '/';
      const children = Object.entries(node.children);
      children.forEach(([childName, childNode], index) => {
        const isLastChild = index === children.length - 1;
        const newPrefix = prefix + (prefix ? (isLast ? '    ' : '│   ') : '');
        result += '\n' + buildTree(childNode, childName, newPrefix, isLastChild);
      });
    }

    return result;
  };

  const executeCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add to history
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Show the command
    addLine('input', getPrompt() + trimmed);

    // Parse command
    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        addLine('output', HELP_TEXT);
        break;

      case 'clear':
        setLines([]);
        break;

      case 'pwd':
        addLine('output', '/' + (currentDir.length === 0 ? '~' : '~/' + currentDir.join('/')));
        break;

      case 'ls': {
        const targetPath = args[0] ? resolvePath(args[0], currentDir) : currentDir;
        const items = listDirectory(targetPath);
        if (items.length === 0) {
          const node = getNode(targetPath);
          if (!node) {
            addLine('error', `ls: cannot access '${args[0] || '.'}': No such file or directory`);
          } else if (node.type === 'file') {
            addLine('output', node.name);
          } else {
            addLine('output', '(empty directory)');
          }
        } else {
          // Simple formatting - show as directory listing
          const output = items.map(item => {
            const node = getNode([...targetPath, item]);
            return node?.type === 'directory' ? item + '/' : item;
          }).join('  ');
          addLine('output', output);
        }
        break;
      }

      case 'cd': {
        if (!args[0] || args[0] === '~') {
          setCurrentDir([]);
          break;
        }
        const newPath = resolvePath(args[0], currentDir);
        const node = getNode(newPath);
        if (!node) {
          addLine('error', `cd: no such file or directory: ${args[0]}`);
        } else if (node.type !== 'directory') {
          addLine('error', `cd: not a directory: ${args[0]}`);
        } else {
          setCurrentDir(newPath);
        }
        break;
      }

      case 'cat': {
        if (!args[0]) {
          addLine('error', 'cat: missing file operand');
          break;
        }
        const filePath = resolvePath(args[0], currentDir);
        const node = getNode(filePath);
        const project = findProject(args[0]);
        if (!node && project) {
          setSelectedProjectId(project.id);
          addLine('output', formatProjectSummary(project));
        } else if (!node) {
          addLine('error', `cat: ${args[0]}: No such file or directory`);
        } else if (node.type === 'directory') {
          addLine('error', `cat: ${args[0]}: Is a directory`);
        } else if (node.content) {
          addLine('output', node.content);
        }
        break;
      }

      case 'whoami':
        const aboutNode = getNode(['about.txt']);
        if (aboutNode?.content) {
          addLine('output', aboutNode.content);
        }
        break;

      case 'skills':
        const skillsNode = getNode(['skills.txt']);
        if (skillsNode?.content) {
          addLine('output', skillsNode.content);
        }
        break;

      case 'experience':
        const experienceNode = getNode(['experience', 'roles.log']);
        if (experienceNode?.content) {
          addLine('output', experienceNode.content);
        }
        break;

      case 'contact':
        const contactNode = getNode(['contact.txt']);
        if (contactNode?.content) {
          addLine('output', contactNode.content);
        }
        break;

      case 'mailto':
        window.open('mailto:owenfisher46@gmail.com', '_blank');
        addLine('success', 'Opening email client...');
        break;

      case 'sudo':
        if (args.join(' ').toLowerCase() === 'hire-owen') {
          addLine('success', `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🎉 ACCESS GRANTED 🎉                                         ║
║                                                               ║
║   Congratulations! You've discovered the secret command.      ║
║                                                               ║
║   Owen would love to work with you.                           ║
║   Email: owenfisher46@gmail.com                               ║
║   LinkedIn: linkedin.com/in/fisherowen                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`);
        } else {
          addLine('error', `sudo: ${args[0]}: command not found`);
        }
        break;

      case 'echo':
        addLine('output', args.join(' '));
        break;

      case 'date':
        addLine('output', new Date().toString());
        break;

      case 'neofetch': {
        const hackathonCount = projects.filter(p => p.categories.includes('hackathon')).length;
        addLine('output', `
         .oOOo.         visitor@owenfisher.dev
        oO    Oo        ──────────────────────────
       oO      Oo       OS:         Portfolio OS v2.0
       oO      Oo       Host:       owenfisher.dev
        oO    Oo        Kernel:     Next.js 15
         'oOOo'         Shell:      terminal.tsx
      .oOOOOOOOo.       Theme:      ${theme}
     oO          Oo     Uptime:     Since Jan 2025
                         ──────────────────────────
                         Role:       Backend Engineer
                         Location:   Vancouver, BC
                         Education:  UBC Computer Science
                         ──────────────────────────
                         Languages:  Python, TS, Java, C++, SQL
                         Backend:    FastAPI, Kafka, Postgres, Redis
                         Infra:      Docker, AWS, Terraform, Databricks
                         Projects:   ${projects.length}
                         Hackathons: ${hackathonCount}
                         ──────────────────────────
                         ████████████████████████
`);
        break;
      }

      case 'npm': {
        // Handle npm commands
        const npmCmd = args.join(' ').toLowerCase();
        if (npmCmd === 'run dev' || npmCmd === 'start') {
          handleNpmRunDev();
        } else if (npmCmd === 'install' || npmCmd === 'i') {
          addLine('output', 'Installing dependencies...');
          setTimeout(() => {
            addLine('success', `
added 847 packages in 3.2s

142 packages are looking for funding
  run \`npm fund\` for details
`);
          }, 500);
        } else {
          addLine('error', `npm: unknown command "${args[0]}"`);
        }
        break;
      }

      case 'nrd': {
        // Shortcut for npm run dev
        handleNpmRunDev();
        break;
      }

      case 'projects':
        listProjects();
        break;

      case 'open': {
        selectProject(args[0]);
        break;
      }

      case 'code':
      case 'sandbox': {
        const project = selectProject(args[0] || selectedProjectId, true);
        if (project) openProjectSandbox(project);
        break;
      }

      case 'demo': {
        const project = selectProject(args[0] || selectedProjectId, true);
        if (!project) break;
        if (project.terminalDemo) {
          executeCommand(project.terminalDemo);
        } else if (project.links.demo) {
          addLine('success', `Opening live demo for ${project.title}...`);
          window.open(project.links.demo, '_blank');
        } else {
          addLine('error', `demo: ${project.id} does not have a configured demo`);
        }
        break;
      }

      case 'history': {
        const historyOutput = history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
        addLine('output', historyOutput || '(no command history)');
        break;
      }

      case 'tree': {
        const targetPath = args[0] ? resolvePath(args[0], currentDir) : currentDir;
        const targetNode = getNode(targetPath);
        if (!targetNode) {
          addLine('error', `tree: ${args[0] || '.'}: No such directory`);
        } else if (targetNode.type !== 'directory') {
          addLine('error', `tree: ${args[0]}: Not a directory`);
        } else {
          const treeName = targetPath.length === 0 ? '.' : targetPath[targetPath.length - 1];
          addLine('output', buildTree(targetNode, treeName));
        }
        break;
      }

      // Easter eggs
      case 'vim':
      case 'vi':
      case 'nano':
        addLine('output', `
~
~
~                    VIM - Vi IMproved
~
~                    You're now stuck in vim!
~                    Press :q to escape... or try
~                    :q!  :wq  :x  ZZ  (just kidding)
~
~                    Type 'exit' to return to safety.
~
`);
        break;

      case 'exit':
        addLine('success', 'Phew! You escaped vim. You\'re a true developer now.');
        break;

      case 'cowsay': {
        const message = args.join(' ') || 'Moo!';
        const border = '_'.repeat(message.length + 2);
        addLine('output', `
 ${border}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`);
        break;
      }

      case 'sl': {
        addLine('output', `
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/

You've been hit by the steam locomotive! 🚂
`);
        break;
      }

      case 'rm': {
        if (args.join(' ').includes('-rf /') || args.join(' ').includes('-rf ~')) {
          addLine('error', `
rm: DANGER ZONE!

⚠️  WARNING: You are about to delete everything!

Just kidding, this is a simulated terminal.
Your files are safe... this time. 😈

Pro tip: Never run 'rm -rf /' on a real system.
`);
        } else {
          addLine('error', `rm: cannot remove '${args[0] || ''}': This is a read-only portfolio`);
        }
        break;
      }

      case 'resume': {
        const resumeNode = getNode(['resume.txt']);
        if (resumeNode?.content) {
          addLine('output', resumeNode.content);
          addLine('success', 'Download PDF: https://owenfisher.dev/Owen_Fisher_Resume.pdf');
        }
        break;
      }

      case 'theme': {
        const themes = ['default', 'dracula', 'gruvbox', 'solarized'];
        if (!args[0]) {
          addLine('output', `Current theme: ${theme}\nAvailable: ${themes.join(', ')}\n\nUsage:\n  theme <name>           Switch theme\n  theme accent <color>   Set custom accent color (hex or name)`);
        } else if (args[0] === 'accent') {
          const color = args[1];
          if (!color) {
            addLine('error', 'Usage: theme accent <color>  (e.g. #ff6600, cyan, hotpink)');
          } else {
            document.documentElement.style.setProperty('--accent', color);
            document.documentElement.style.setProperty('--accent-glow', `${color}26`);
            localStorage.setItem('terminal-accent', color);
            addLine('success', `Accent color set to '${color}'`);
          }
        } else if (args[0] === 'reset') {
          document.documentElement.style.removeProperty('--accent');
          document.documentElement.style.removeProperty('--accent-glow');
          localStorage.removeItem('terminal-accent');
          addLine('success', 'Accent color reset to theme default');
        } else if (themes.includes(args[0].toLowerCase())) {
          const newTheme = args[0].toLowerCase();
          setTheme(newTheme);
          document.documentElement.style.removeProperty('--accent');
          document.documentElement.style.removeProperty('--accent-glow');
          localStorage.removeItem('terminal-accent');
          addLine('success', `Theme changed to '${newTheme}'`);
        } else {
          addLine('error', `theme: '${args[0]}' not found. Available: ${themes.join(', ')}\nOr try: theme accent <color>`);
        }
        break;
      }

      case 'run': {
        if (args[0] === 'flux') {
          setSelectedProjectId('flux');
          // Flux pipeline demo
          addLine('ascii', `
  ╔═══════════════════════════════════════╗
  ║          FLUX DATA PIPELINE           ║
  ╚═══════════════════════════════════════╝`);

          const steps = [
            { delay: 400, type: 'output' as const, msg: '[compose] Starting postgres, redis, kafka, prometheus, grafana...' },
            { delay: 800, type: 'success' as const, msg: '[compose] ✓ PostgreSQL    :5432  ready' },
            { delay: 1200, type: 'success' as const, msg: '[compose] ✓ Redis         :6379  ready' },
            { delay: 1600, type: 'success' as const, msg: '[compose] ✓ Kafka         :9092  topic=market_trades' },
            { delay: 2000, type: 'success' as const, msg: '[api]     ✓ FastAPI       :8000  /health ok' },
            { delay: 2600, type: 'output' as const, msg: '\n[ingest] Coinbase + Kraken adapters normalizing trades' },
            { delay: 3000, type: 'output' as const, msg: `[trade] ${new Date().toISOString()} exchange=coinbase product=BTC-USD px=102438.12 qty=0.018` },
            { delay: 3300, type: 'output' as const, msg: `[trade] ${new Date().toISOString()} exchange=kraken   product=ETH-USD px=3921.45 qty=0.420` },
            { delay: 3700, type: 'output' as const, msg: '\n[kafka] Fan-out consumers: raw, candles, indicators' },
            { delay: 4100, type: 'output' as const, msg: '  raw-consumer        committed offset 18,244  lag 0' },
            { delay: 4400, type: 'output' as const, msg: '  ticker-consumer     wrote OHLCV candle -> postgres' },
            { delay: 4700, type: 'output' as const, msg: '  indicator-consumer  wrote SMA/RSI/EMA -> redis' },
            { delay: 5200, type: 'output' as const, msg: '\n[prometheus] scrape targets up: ingestion, consumer, api' },
            { delay: 5500, type: 'output' as const, msg: '  api_latency_p95_ms=24  dlq_total=0  consumer_lag=0' },
            { delay: 6000, type: 'success' as const, msg: '\n[smoke] GET /markets -> 200' },
            { delay: 6300, type: 'success' as const, msg: '[smoke] GET /candles/BTC-USD/1m?exchange=demo -> 200' },
            { delay: 6600, type: 'success' as const, msg: '[smoke] WS /indicators/BTC-USD -> streaming' },
            { delay: 7200, type: 'success' as const, msg: '\n[pipeline] Status: healthy, observable, replay-safe' },
            { delay: 9000, type: 'output' as const, msg: '\n  GitHub: https://github.com/obro79/Flux' },
          ];

          steps.forEach(step => {
            const t = setTimeout(() => addLine(step.type, step.msg), step.delay);
            if (!fluxDemoRef.current) fluxDemoRef.current = t;
          });
        } else if (args[0]) {
          addLine('error', `run: unknown target '${args[0]}'. Try: run flux`);
        } else {
          addLine('error', 'run: missing target. Try: run flux');
        }
        break;
      }

      case 'git': {
        if (args[0] === 'blame') {
          addLine('output', `
commit a1b2c3d (HEAD -> main)
Author: Owen Fisher <owenfisher46@gmail.com>
Date:   ${new Date().toDateString()}

    Made this awesome portfolio you're looking at right now

(Hint: If there's a bug, blame Owen. If it's good, also Owen.)
`);
        } else if (args[0] === 'status') {
          addLine('success', `
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

(This portfolio is always in a perfect state)
`);
        } else if (args[0] === 'log') {
          addLine('output', 'Fetching recent GitHub activity...');
          fetch('https://api.github.com/users/obro79/events/public?per_page=10')
            .then(res => res.json())
            .then((events: any[]) => {
              const formatted = events.slice(0, 10).map(event => {
                const date = new Date(event.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const repo = event.repo.name.replace('obro79/', '');
                let action = event.type;
                if (event.type === 'PushEvent') {
                  const commits = event.payload?.commits?.length || 0;
                  action = `pushed ${commits} commit(s)`;
                } else if (event.type === 'CreateEvent') {
                  action = `created ${event.payload?.ref_type || 'ref'}`;
                } else if (event.type === 'PullRequestEvent') {
                  action = `${event.payload?.action || 'updated'} PR`;
                } else if (event.type === 'IssuesEvent') {
                  action = `${event.payload?.action || 'updated'} issue`;
                } else if (event.type === 'WatchEvent') {
                  action = 'starred';
                } else if (event.type === 'ForkEvent') {
                  action = 'forked';
                } else if (event.type === 'DeleteEvent') {
                  action = `deleted ${event.payload?.ref_type || 'ref'}`;
                }
                return `  ${date.padEnd(8)} ${action.padEnd(25)} ${repo}`;
              }).join('\n');

              const header = `  DATE     ACTION                    REPO\n  ${'─'.repeat(55)}`;
              addLine('output', header + '\n' + (formatted || '  No recent activity'));
            })
            .catch(() => {
              addLine('error', 'Failed to fetch GitHub activity. Try again later.');
            });
        } else {
          addLine('error', `git: '${args[0]}' is not available in this terminal`);
        }
        break;
      }

      case 'fortune':
        const fortunes = [
          '"The best way to predict the future is to invent it." - Alan Kay',
          '"Any sufficiently advanced technology is indistinguishable from magic." - Arthur C. Clarke',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"Debugging is twice as hard as writing the code." - Brian Kernighan',
          '"There are only two hard things in CS: cache invalidation and naming things." - Phil Karlton',
          '"Talk is cheap. Show me the code." - Linus Torvalds',
        ];
        addLine('output', fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;

      case 'coffee':
      case 'make':
        if (cmd === 'make' && args[0] !== 'coffee') {
          addLine('error', `make: *** No rule to make target '${args[0] || 'nothing'}'. Stop.`);
        } else {
          addLine('output', `
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

☕ Here's your coffee! Now get back to coding.
`);
        }
        break;

      case 'snake':
        startSnakeGame();
        break;

      default:
        const suggestion = suggestCommand(cmd);
        addLine('error', `${cmd}: command not found.${suggestion ? ` Did you mean '${suggestion}'?` : ''} Type 'help' for available commands.`);
    }

    setCurrentInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = currentInput.split(/\s+/);
      const lastPart = parts[parts.length - 1] || '';

      const getCommonPrefix = (arr: string[]): string => {
        if (arr.length === 0) return '';
        let prefix = arr[0];
        for (let i = 1; i < arr.length; i++) {
          while (!arr[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
          }
        }
        return prefix;
      };

      if (parts.length <= 1) {
        // Command completion
        const matches = COMMANDS.filter(c => c.startsWith(lastPart));
        if (matches.length === 1) {
          setCurrentInput(matches[0] + ' ');
        } else if (matches.length > 1) {
          addLine('output', matches.join('  '));
          const prefix = getCommonPrefix(matches);
          if (prefix.length > lastPart.length) setCurrentInput(prefix);
        }
      } else if (['open', 'code', 'sandbox', 'demo', 'run'].includes(parts[0])) {
        const matches = projects.map(project => project.id).filter(id => id.startsWith(lastPart));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setCurrentInput(parts.join(' '));
        } else if (matches.length > 1) {
          addLine('output', matches.join('  '));
        }
      } else {
        // Path completion
        const pathParts = lastPart.split('/');
        const partial = pathParts.pop() || '';
        const dirPath = pathParts.length > 0
          ? resolvePath(pathParts.join('/'), currentDir)
          : currentDir;
        const items = listDirectory(dirPath);
        const matches = items.filter(item => item.startsWith(partial));

        // For cd, filter to directories only
        const filtered = parts[0] === 'cd'
          ? matches.filter(m => getNode([...dirPath, m])?.type === 'directory')
          : matches;

        if (filtered.length === 1) {
          const match = filtered[0];
          const isDir = getNode([...dirPath, match])?.type === 'directory';
          const completed = pathParts.length > 0
            ? pathParts.join('/') + '/' + match
            : match;
          parts[parts.length - 1] = completed + (isDir ? '/' : '');
          setCurrentInput(parts.join(' '));
        } else if (filtered.length > 1) {
          addLine('output', filtered.join('  '));
          const prefix = getCommonPrefix(filtered);
          if (prefix.length > partial.length) {
            const completed = pathParts.length > 0
              ? pathParts.join('/') + '/' + prefix
              : prefix;
            parts[parts.length - 1] = completed;
            setCurrentInput(parts.join(' '));
          }
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      addLine('input', getPrompt() + currentInput + '^C');
      setCurrentInput('');
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Render StackBlitz if active
  if (stackblitzProject && stackblitzProject.stackblitz) {
    return (
      <StackBlitzEmbed
        repo={stackblitzProject.stackblitz.repo}
        openFile={stackblitzProject.stackblitz.openFile}
        startScript={stackblitzProject.stackblitz.startScript}
        onClose={() => setStackblitzProject(null)}
      />
    );
  }

  return (
    <div
      className={`terminal-view ${isFullscreen ? 'terminal-fullscreen' : ''}`}
      onClick={handleContainerClick}
      ref={containerRef}
    >
      <div className={`terminal-container ${isMinimized ? 'terminal-minimized' : ''}`}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <button
              className="terminal-dot red"
              onClick={(e) => { e.stopPropagation(); handleClose(); }}
              title="Exit to GUI mode"
              aria-label="Close terminal"
            />
            <button
              className="terminal-dot yellow"
              onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
              title={isMinimized ? "Restore" : "Minimize"}
              aria-label="Minimize terminal"
            />
            <button
              className="terminal-dot green"
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              aria-label="Toggle fullscreen"
            />
          </div>
          <span className="terminal-title">visitor@owenfisher.dev — terminal</span>
        </div>

        {!isMinimized && (
          <>
            <div className="terminal-workspace">
              <div className="terminal-body" ref={outputRef}>
                {isPlayingSnake ? (
                  <div className="terminal-output">
                    <div className="terminal-line term-accent" style={{ whiteSpace: 'pre' }}>
                      {renderSnakeBoard()}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="terminal-output">
                      {lines.map((line, index) => (
                        <div
                          key={index}
                          className={`terminal-line ${line.type === 'error' ? 'term-error' : ''} ${line.type === 'success' ? 'term-success' : ''} ${line.type === 'ascii' ? 'term-accent' : ''}`}
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          {line.type === 'ascii' ? line.content : linkifyText(line.content)}
                        </div>
                      ))}
                    </div>

                    <div className="terminal-input-line">
                      <span className="terminal-prompt">visitor</span>
                      <span style={{ color: 'var(--text-dim)' }}>@</span>
                      <span className="terminal-path">owenfisher.dev</span>
                      <span style={{ color: 'var(--text-dim)' }}>:</span>
                      <span className="terminal-path">{currentDir.length === 0 ? '~' : '~/' + currentDir.join('/')}</span>
                      <span style={{ color: 'var(--text-dim)' }}>$ </span>
                      <input
                        ref={inputRef}
                        type="text"
                        className="terminal-input"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="terminal-statusbar">
              <span>mode: terminal</span>
              <span>theme: {theme}</span>
              <span>selected: {selectedProject.slug}</span>
              <span>shortcuts: tab autocomplete · ctrl+l clear · code {selectedProject.id}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
