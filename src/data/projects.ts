export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
  award?: string;
  description: string;
  categories: string[];
  gradient?: string;
  stack: string[];
  metrics: string[];
  preview: string[];
  visual: {
    type: 'terminal' | 'architecture' | 'product';
    title: string;
    image?: string;
    imageAlt?: string;
    media?: {
      src: string;
      title: string;
      alt: string;
    }[];
    lines: string[];
  };
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
    video?: string;
    docs?: string;
  };
  stackblitz?: {
    repo: string;
    openFile?: string;
    startScript?: string;
  };
  terminalDemo?: string;
}

export const projects: Project[] = [
  {
    id: 'flux',
    slug: 'flux.md',
    title: 'Flux',
    year: 'Mar. 2026',
    role: 'Backend / data infrastructure',
    description: 'Real-time market data pipeline with exchange ingestion, Kafka fan-out, FastAPI read paths, Postgres persistence, Redis-backed indicators, and Prometheus/Grafana observability.',
    categories: ['highlighted', 'realtime', 'backend', 'infra'],
    stack: ['Python', 'FastAPI', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Prometheus', 'Grafana'],
    metrics: ['Exchange-aware ingestion', 'Kafka consumer lag alerts', 'REST + WebSocket APIs', 'DLQ and smoke-test coverage'],
    preview: [
      'Built normalized exchange adapters and async consumers around a stable trade schema.',
      'Separated ingestion, aggregation, indicators, API, and metrics into dockerized services.',
      'Instrumented throughput, API latency, Redis writes, DLQ volume, and consumer lag.'
    ],
    visual: {
      type: 'terminal',
      title: 'service trace',
      image: '/projects/flux-metrics.svg',
      imageAlt: 'Flux pipeline metrics and observability',
      lines: [
        '$ docker compose up kafka postgres redis api workers',
        '[adapters] coinbase connected; kraken connected',
        '[kafka] market_trades topic online; partitions=6',
        '[consumer:candles] writing OHLC windows -> PostgreSQL',
        '[consumer:indicators] publishing RSI/MACD snapshots -> Redis',
        '[api] GET /markets /candles /crypto /indicators healthy',
        '[metrics] consumer_lag=0 api_p95=42ms dlq=0'
      ]
    },
    links: {
      github: 'https://github.com/obro79/Flux'
    },
    terminalDemo: 'run flux'
  },
  {
    id: 'rehabify',
    slug: 'rehabify.md',
    title: 'Rehabify',
    year: 'Jan. 2026',
    role: 'Real-time AI workflow',
    award: '1st Overall, nwHacks 2026',
    description: 'AI physical therapy coach. In-browser pose estimation, speech-to-text, LLM feedback and text-to-speech run as one live loop that corrects your form mid-rep.',
    categories: ['highlighted', 'realtime', 'hackathon'],
    stack: ['TypeScript', 'MediaPipe', 'Deepgram', 'Gemini', 'ElevenLabs', 'Realtime UX'],
    metrics: ['Pose estimation in the browser', 'Sub-second demo feedback loop', 'Session and rep state model', 'Voice + vision orchestration'],
    preview: [
      'Integrated multiple realtime providers into one coaching workflow.',
      'Owned session state for exercises, reps, and generated coaching events.',
      'Balanced product polish with reliable demo latency during a hackathon build.'
    ],
    visual: {
      type: 'product',
      title: 'live coaching loop',
      image: '/projects/rehabify-landing.png',
      imageAlt: 'Rehabify landing page screenshot',
      media: [
        { src: '/projects/rehabify-landing.png', title: 'landing', alt: 'Rehabify landing page screenshot' },
        { src: '/projects/rehabify-demo.webp', title: 'demo', alt: 'Rehabify exercise demo image' }
      ],
      lines: [
        'camera frame -> pose landmarks',
        'voice prompt -> STT transcript',
        'exercise state -> coaching event',
        'feedback -> TTS response + UI cue'
      ]
    },
    links: {
      github: 'https://github.com/obro79/Rehabify',
      devpost: 'https://devpost.com/software/rehabify-y2f5mu',
      video: 'https://www.youtube.com/watch?v=gXh_Ct_AQGU'
    }
  },
  {
    id: 'recruit',
    slug: 'recruit.md',
    title: 'Recruit',
    year: 'Apr. 2026',
    role: 'Supervised AI agents',
    award: '1st, YC track + 3rd, Sideshift prize, HackTech 2026',
    description: 'Supervised AI agents for the job hunt: a pipeline spanning job ingestion, fit ranking, role research, tailored artifacts, browser automation, dead-letter review, and follow-up workflows.',
    categories: ['highlighted', 'hackathon', 'backend', 'automation'],
    stack: ['Python', 'TypeScript', 'Playwright', 'Browserbase', 'Search', 'Embeddings'],
    metrics: ['500+ roles ingested', 'BM25 + rules + reranking', 'Human-review dead letters', 'ATS automation pipeline'],
    preview: [
      'Separated high-confidence automation from sensitive answers that require review.',
      'Built ranking from hard filters, lexical search, embeddings, and reranking.',
      'Tracked application state from discovery through follow-up.'
    ],
    visual: {
      type: 'product',
      title: 'application pipeline',
      image: '/projects/recruit-dashboard.png',
      imageAlt: 'Recruit dashboard screenshot',
      media: [
        { src: '/projects/recruit-dashboard.png', title: 'dashboard', alt: 'Recruit dashboard screenshot' },
        { src: '/projects/recruit-queue.png', title: 'queue', alt: 'Recruit applications queue screenshot' },
        { src: '/projects/recruit-architecture.png', title: 'system', alt: 'Recruit system architecture diagram' }
      ],
      lines: [
        'ingest ats_feeds --limit 500',
        'filter hard_mismatches',
        'rank bm25 + rules + embeddings',
        'generate resume.pdf + role_notes.md',
        'submit supervised_browser_job -> review queue'
      ]
    },
    links: {
      github: 'https://github.com/recruitttt/recruit-main',
      demo: 'https://recruit-main-beryl.vercel.app',
      devpost: 'https://devpost.com/software/recruit-h3lc2r'
    },
    terminalDemo: 'run recruit'
  },
  {
    id: 'maintaineros',
    slug: 'maintaineros.md',
    title: 'MaintainerOS',
    year: 'May 2026',
    role: 'Workflow backend + verification gates',
    award: '1st Overall + 1st Clustly prize, Cursor AI Hackathon',
    description: 'Repo-native work-routing system that imports GitHub issue backlogs, classifies work lanes, prepares agent context, and keeps PR verification and bounty payout proof behind review gates.',
    categories: ['highlighted', 'hackathon', 'backend', 'automation'],
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Neon', 'GitHub API', 'Provider adapters'],
    metrics: ['Issue import workflows', 'AI/DEV/CLARIFY/BOUNTY lanes', 'Verification evidence gates', 'Fixture and live data modes'],
    preview: [
      'Modeled automation as proposals that remain behind explicit maintainer acceptance.',
      'Added provider boundaries for GitHub import, verification, and payout surfaces.',
      'Kept fixture mode available for demos while supporting live repository imports.'
    ],
    visual: {
      type: 'architecture',
      title: 'trust boundary',
      image: '/projects/maintaineros-home.png',
      imageAlt: 'MaintainerOS homepage screenshot',
      media: [
        { src: '/projects/maintaineros-home.png', title: 'home', alt: 'MaintainerOS homepage screenshot' },
        { src: '/projects/maintaineros-connect.png', title: 'connect', alt: 'MaintainerOS GitHub connect screenshot' },
        { src: '/projects/maintaineros-docs.png', title: 'docs', alt: 'MaintainerOS docs screenshot' }
      ],
      lines: [
        'issue -> route -> context pack',
        'context pack -> agent attempt or contributor task',
        'PR -> verification evidence',
        'maintainer acceptance -> merge or payout'
      ]
    },
    links: {
      github: 'https://github.com/obro79/maintainerOS',
      devpost: 'https://devpost.com/software/maintaineros'
    }
  },
  {
    id: 'cortex',
    slug: 'cortex.md',
    title: 'Cortex',
    year: 'May 2026',
    role: 'Context infrastructure for AI agents',
    description: 'Trusted decision context for AI engineering teams. Connects approved knowledge sources, returns cited task context over an API and MCP server, and gates agents with allow, warn or block when evidence is stale, conflicting or missing.',
    categories: ['highlighted', 'backend', 'infra'],
    stack: ['Python', 'FastAPI', 'MCP', 'Pydantic', 'Pytest', 'Docker Compose', 'Ruff', 'Mypy'],
    metrics: ['Cited, task-specific context', 'Context gate: allow / warn / block', 'MCP + REST access for agents', 'Tests pass without external services'],
    preview: [
      'Built the application spine before adding risky connectors or retrieval behavior.',
      'Kept external dependencies lazy so local tests and CI do not require live services.',
      'Established typed contracts for API, config, worker roles, and future ingestion surfaces.'
    ],
    visual: {
      type: 'terminal',
      title: 'local validation',
      image: '/projects/cortex-cli.svg',
      imageAlt: 'Cortex CLI validation output',
      lines: [
        '$ cortex doctor',
        'config: ok',
        'api factory: ok',
        'worker role=noop: ok',
        '$ ruff check . && mypy src && pytest',
        'all checks passed'
      ]
    },
    links: {
      github: 'https://github.com/obro79/cortex'
    },
    terminalDemo: 'run cortex'
  },
  {
    id: 'echome',
    slug: 'echome.md',
    title: 'EchoMe',
    year: 'Oct. 2025',
    role: 'Voice-to-deploy app builder',
    description: 'Speak an idea, get a deployed app. Voice in, Claude generates the full-stack Next.js code, a sandbox previews it live, and Vercel ships it. Built at StormHacks 2025.',
    categories: ['hackathon', 'automation'],
    stack: ['TypeScript', 'Next.js', 'Speech input', 'Claude API', 'Vercel'],
    metrics: ['Voice-first creation flow', 'Generated full-stack projects', 'Vercel deployment path', 'Demo video available'],
    preview: [
      'Built a voice-driven interface around code generation and deployment.',
      'Optimized for fast demos: idea capture, generation, preview, and deploy.',
      'Kept the workflow understandable for non-technical users.'
    ],
    visual: {
      type: 'terminal',
      title: 'voice deployment flow',
      lines: [
        'speak app idea',
        'generate code with Claude',
        'preview Next.js project',
        'deploy to Vercel'
      ]
    },
    links: {
      github: 'https://github.com/obro79/stormhacks',
      demo: 'https://stormhacks-three.vercel.app',
      video: 'https://youtu.be/RmVdUAm20Ms',
      devpost: 'https://devpost.com/software/echome-ixe6qy'
    },
    stackblitz: {
      repo: 'obro79/stormhacks',
      openFile: 'src/app/page.tsx'
    }
  },
  {
    id: 'voice-interviewer',
    slug: 'voice-interviewer.md',
    title: 'AI Voice Interviewer',
    year: 'May 2025',
    role: 'Realtime interview app',
    description: 'Practice interviews out loud with a real-time AI voice interviewer, with a live transcript, call state, and feedback at the end.',
    categories: ['realtime', 'automation'],
    stack: ['TypeScript', 'Next.js', 'Vapi', 'Realtime voice', 'Accessibility'],
    metrics: ['Live transcript loop', 'Call-state UI', 'Feedback generation', '100 Lighthouse accessibility score'],
    preview: [
      'Built interview state around live voice sessions and transcript events.',
      'Designed the interface to make live call state legible and recoverable.',
      'Kept the project runnable in a browser-based source sandbox.'
    ],
    visual: {
      type: 'terminal',
      title: 'voice session state',
      lines: [
        'idle -> connecting -> live call',
        'audio stream -> transcript',
        'transcript -> feedback summary',
        'session history -> review'
      ]
    },
    links: {
      github: 'https://github.com/obro79/mock_interview_ai',
      demo: 'https://mock-interview-ai-git-main-owens-projects-e5b63a60.vercel.app/sign-in'
    },
    stackblitz: {
      repo: 'obro79/mock_interview_ai',
      openFile: 'src/app/page.tsx'
    }
  },
  {
    id: 'tower',
    slug: 'tower.md',
    title: 'Tower',
    year: 'Oct. 2025',
    role: 'Local-network backend + CLI',
    description: 'Privacy-first file discovery and sync system with a FastAPI metadata registry, SQLite storage, TypeScript CLI, watched directories, wildcard search, and SCP-based transfer flow.',
    categories: ['highlighted', 'backend', 'infra'],
    stack: ['Python', 'FastAPI', 'SQLite', 'TypeScript', 'Node.js', 'SCP', 'SSH'],
    metrics: ['Metadata-only backend', 'Cross-device search', 'Watched directory sync', 'Direct file transfer flow'],
    preview: [
      'Designed the backend as a coordinator that stores metadata instead of user files.',
      'Built CLI commands for init, watch, sync, search, and get workflows.',
      'Optimized for low-latency private networks and recoverable local setup.'
    ],
    visual: {
      type: 'terminal',
      title: 'transfer model',
      lines: [
        'Device A CLI -> FastAPI registry -> SQLite metadata',
        'Device B CLI -> search "*.pdf"',
        'registry returns source host + file id',
        'transfer uses SCP; files stay on source device'
      ]
    },
    links: {
      github: 'https://github.com/obro79/Tower',
      devpost: 'https://devpost.com/software/tower-zk0875'
    }
  },
  {
    id: 'option-pricing',
    slug: 'option-pricing.md',
    title: 'Option Strategy App',
    year: 'Sept. 2025',
    role: 'Python analytics app',
    description: 'Streamlit analytics tool for simulating options strategies, visualizing profit/loss profiles, and exploring pricing/risk scenarios with vectorized Python models.',
    categories: ['backend', 'analytics'],
    stack: ['Python', 'Streamlit', 'NumPy', 'Pandas', 'Plotly', 'Monte Carlo'],
    metrics: ['Black-Scholes models', 'Monte Carlo pricing', 'Interactive risk dashboards', 'Vectorized pricing loops'],
    preview: [
      'Implemented pricing models and strategy simulations in Python.',
      'Exposed risk views through interactive dashboards for faster scenario exploration.',
      'Kept the app lightweight enough to run as a hosted Streamlit demo.'
    ],
    visual: {
      type: 'terminal',
      title: 'pricing workflow',
      lines: [
        'input underlying / strike / vol / expiry',
        'compute Black-Scholes + Monte Carlo scenarios',
        'render P&L curve + risk attribution',
        'compare strategy legs interactively'
      ]
    },
    links: {
      github: 'https://github.com/obro79/optionStrategyApp',
      demo: 'https://optitrade.streamlit.app'
    }
  }
];

export const projectCategories = ['all', 'realtime', 'backend', 'infra', 'hackathon', 'automation', 'analytics'] as const;

export function findProject(query?: string): Project | undefined {
  if (!query) return undefined;
  const normalized = query.replace(/^projects\//, '').replace(/\.md$/, '').toLowerCase();
  return projects.find((project) =>
    project.id === normalized ||
    project.slug.replace(/\.md$/, '') === normalized ||
    project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized
  );
}
