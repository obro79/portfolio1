export interface Project {
  id: string;
  slug: string;
  title: string;
  year: string;
  role: string;
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
    categories: ['highlighted', 'backend', 'infra'],
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
    id: 'cortex',
    slug: 'cortex.md',
    title: 'Cortex',
    year: 'May 2026',
    role: 'Backend platform skeleton',
    description: 'Production-shaped Python backend spine for knowledge infrastructure: FastAPI app factory, typed configuration, CLI entrypoints, worker contracts, lazy clients, and smoke-testable local infrastructure.',
    categories: ['highlighted', 'backend', 'infra'],
    stack: ['Python', 'FastAPI', 'Pydantic', 'Pytest', 'Docker Compose', 'Ruff', 'Mypy'],
    metrics: ['Factory API entrypoint', 'CLI and worker commands', 'Tests pass without external services', 'Local infra contracts documented'],
    preview: [
      'Built the application spine before adding risky connectors or retrieval behavior.',
      'Kept external dependencies lazy so local tests and CI do not require live services.',
      'Established typed contracts for API, config, worker roles, and future ingestion surfaces.'
    ],
    visual: {
      type: 'terminal',
      title: 'local validation',
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
      type: 'architecture',
      title: 'transfer model',
      image: '/projects/tower-devpost.png',
      imageAlt: 'Tower Devpost project thumbnail',
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
    id: 'maintaineros',
    slug: 'maintaineros.md',
    title: 'MaintainerOS',
    year: 'May 2026',
    role: 'Workflow backend + verification gates',
    description: 'Repo-native work-routing system that imports GitHub issue backlogs, classifies work lanes, prepares agent context, and keeps PR verification and bounty payout proof behind review gates.',
    categories: ['highlighted', 'backend'],
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
    id: 'recruit',
    slug: 'recruit.md',
    title: 'Recruit',
    year: 'Apr. 2026',
    role: 'Automation backend',
    description: 'Supervised job-application automation system spanning job ingestion, fit ranking, role research, tailored artifacts, browser automation, dead-letter review, and follow-up workflows.',
    categories: ['backend', 'automation'],
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
      github: 'https://github.com/obro79/recruit',
      demo: 'https://recruit-main-beryl.vercel.app',
      devpost: 'https://devpost.com/software/recruit-h3lc2r'
    }
  },
  {
    id: 'rehabify',
    slug: 'rehabify.md',
    title: 'Rehabify',
    year: 'Jan. 2026',
    role: 'Real-time AI workflow',
    description: 'nwHacks 2026 1st Place Winner. Real-time physiotherapy coach combining computer vision, speech-to-text, LLM feedback, and text-to-speech into a live coaching loop.',
    categories: ['highlighted', 'hackathon'],
    stack: ['TypeScript', 'MediaPipe', 'Deepgram', 'Gemini', 'ElevenLabs', 'Realtime UX'],
    metrics: ['1st overall at nwHacks', 'Sub-second demo feedback loop', 'Session and rep state model', 'Voice + vision orchestration'],
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
      type: 'product',
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
  },
  {
    id: 'echome',
    slug: 'echome.md',
    title: 'EchoMe',
    year: 'Jan. 2026',
    role: 'Voice-to-deploy app builder',
    description: 'Hackathon project that turns spoken product ideas into generated full-stack web apps and deploys them to Vercel from a guided creation flow.',
    categories: ['hackathon', 'automation'],
    stack: ['TypeScript', 'Next.js', 'Speech input', 'Claude API', 'Vercel'],
    metrics: ['Voice-first creation flow', 'Generated full-stack projects', 'Vercel deployment path', 'Demo video available'],
    preview: [
      'Built a voice-driven interface around code generation and deployment.',
      'Optimized for fast demos: idea capture, generation, preview, and deploy.',
      'Kept the workflow understandable for non-technical users.'
    ],
    visual: {
      type: 'product',
      title: 'voice deployment flow',
      image: '/projects/echome-devpost.png',
      imageAlt: 'EchoMe Devpost project thumbnail',
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
    id: 'prepme',
    slug: 'prepme.md',
    title: 'PrepMe',
    year: 'May 2025',
    role: 'Realtime interview app',
    description: 'AI voice interviewer with live transcripts, call state, and feedback, built as a polished full-stack interview practice experience.',
    categories: ['automation'],
    stack: ['TypeScript', 'Next.js', 'Vapi', 'Realtime voice', 'Accessibility'],
    metrics: ['Live transcript loop', 'Call-state UI', 'Feedback generation', '100 Lighthouse accessibility score'],
    preview: [
      'Built interview state around live voice sessions and transcript events.',
      'Designed the interface to make live call state legible and recoverable.',
      'Kept the project runnable in a browser-based source sandbox.'
    ],
    visual: {
      type: 'product',
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
  }
];

export const projectCategories = ['all', 'backend', 'infra', 'hackathon', 'automation', 'analytics'] as const;

export function findProject(query?: string): Project | undefined {
  if (!query) return undefined;
  const normalized = query.replace(/^projects\//, '').replace(/\.md$/, '').toLowerCase();
  return projects.find((project) =>
    project.id === normalized ||
    project.slug.replace(/\.md$/, '') === normalized ||
    project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized
  );
}
