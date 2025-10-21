export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  categories: string[];
  gradient: string;
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
    video?: string;
    docs?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'prepme',
    title: 'PrepMe',
    year: 'May 2025',
    description: 'Built AI voice interviewer with real-time speech, transcripts, and 100 Lighthouse accessibility score.',
    categories: ['highlighted'],
    gradient: 'linear-gradient(135deg, rgba(124, 108, 255, 0.3), rgba(59, 201, 255, 0.3))',
    links: {
      github: 'https://github.com/obro79/mock_interview_ai',
      demo: 'https://mock-interview-ai-git-main-owens-projects-e5b63a60.vercel.app/sign-in'
    }
  },
  {
    id: 'financely',
    title: 'Financely',
    year: 'June 2025',
    description: 'Configured Vercel CI/CD pipeline to auto-build/test/deploy, cutting manual release steps 75%. Built ETL services in Python/Node to load transactions into SQL.',
    categories: ['highlighted'],
    gradient: 'linear-gradient(135deg, rgba(255, 107, 170, 0.3), rgba(124, 108, 255, 0.3))',
    links: {
      github: 'https://github.com/obro79/financely',
      demo: 'https://financely-nine.vercel.app/sign-in',
      docs: 'https://noisy-pansy-2e8.notion.site/Financely-1eab9c27045980579544ce5e4f96ed55'
    }
  },
  {
    id: 'echome',
    title: 'EchoMe',
    year: 'Jan. 2025',
    description: 'Voice-driven application builder that generates full-stack apps from natural language descriptions. Built with Next.js and AI-powered code generation for rapid prototyping.',
    categories: ['highlighted', 'hackathon'],
    gradient: 'linear-gradient(135deg, rgba(45, 55, 72, 0.3), rgba(74, 85, 104, 0.3))',
    links: {
      github: 'https://github.com/obro79/stormhacks',
      demo: 'https://stormhacks-three.vercel.app',
      video: 'https://youtu.be/RmVdUAm20Ms',
      devpost: 'https://devpost.com/software/echome-ixe6qy'
    }
  },
  {
    id: 'option-pricing',
    title: 'Option Pricing & Portfolio Management Web App',
    year: 'Sept. 2025',
    description: 'Implemented Black-Scholes and Monte Carlo pricing models with 4x faster vectorized loops. Delivered interactive portfolio dashboards surfacing pricing results, portfolio metrics, and risk attribution.',
    categories: ['all'],
    gradient: 'linear-gradient(135deg, rgba(59, 201, 255, 0.3), rgba(107, 255, 193, 0.3))',
    links: {
      github: 'https://github.com/obro79/optionStrategyApp',
      demo: 'https://optitrade.streamlit.app'
    }
  },
  {
    id: 'tower',
    title: 'Tower',
    year: 'Oct. 2025',
    description: 'Cross-device file sync and discovery tool for local networks. Privacy-first file sharing with lightweight central registry tracking metadata for instant discovery and transfer without cloud dependencies.',
    categories: ['hackathon'],
    gradient: 'linear-gradient(135deg, rgba(147, 112, 219, 0.3), rgba(186, 85, 211, 0.3))',
    links: {
      github: 'https://github.com/obro79/Tower',
      devpost: 'https://devpost.com/software/tower-zk0875'
    }
  },
  {
    id: 'pantry-pal',
    title: 'Pantry Pal',
    year: 'Jan. 2025',
    description: 'Grocery list and meal-planning app reducing food waste by tracking expiry dates and suggesting recipes. Built with React, TypeScript, Flask, and OpenAI API for receipt scanning and smart recipe recommendations.',
    categories: ['hackathon'],
    gradient: 'linear-gradient(135deg, rgba(72, 187, 120, 0.3), rgba(56, 161, 105, 0.3))',
    links: {
      github: 'https://github.com/kliu04/nwhacks25',
      demo: 'https://pantrypaldeploy.vercel.app',
      devpost: 'https://devpost.com/software/pantrypal-2gnrdz'
    }
  },
  {
    id: 'staff-scheduler',
    title: 'Staff Scheduler',
    year: 'Apr. 2024',
    description: 'Java-based restaurant scheduling system that automatically generates employee schedules based on availability, job roles, and staffing requirements. Features GUI, data persistence, and event logging.',
    categories: ['school'],
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.3))',
    links: {
      github: 'https://github.com/obro79/staffScheduling1.0'
    }
  }
];
