import { projects } from './projects';

export interface FileSystemNode {
  type: 'file' | 'directory';
  name: string;
  content?: string;
  children?: Record<string, FileSystemNode>;
}

const experienceContent = `┌─────────────────────────────────────────────────────────────┐
│                     EXPERIENCE LOG                          │
└─────────────────────────────────────────────────────────────┘

[2025-09-01] Royal Bank of Canada
  Role: Quantitative Developer | Status: Current
  Optimized risk assessment by migrating pricing engine from MATLAB
  to Python + Dask, deploying scalable pipelines that sped up
  valuations 70% and cut maintenance 50%+. Created comprehensive
  onboarding documentation using Confluence, cutting onboarding
  time by 50%.

[2025-01-01] Quantico Research
  Role: Quantitative Developer | Status: Jan 2025 - May 2025
  Led development of a Hidden Markov Model in Stan with a
  Python/NumPy interface, slashing seismic risk exposure by 80%.
  Designed real-time seismic data pipelines in Python using NumPy
  for vectorized data cleaning. Automated walk-forward validation
  and stress testing with PyTest inside a CI/CD pipeline.

[2025-06-01] UBC Science Undergraduate Society
  Role: Frontend Developer | Status: Current
  Redesigned website with 5+ new pages. Engineered 10+ reusable
  components and introduced 15+ design tokens in Next.js/TypeScript.

[2025-05-01] UBC Actuarial Science Club
  Role: Frontend Engineer | Status: Current
  Built site with Next.js, React, and Tailwind CSS, increasing
  member sign-ups by 200%. Led planning and development of the
  club's first website.
`;

const aboutContent = `┌─────────────────────────────────────────────────────────────┐
│                      ABOUT OWEN                             │
└─────────────────────────────────────────────────────────────┘

Name:       Owen Fisher
Role:       Quantitative Developer
Location:   Vancouver, BC, Canada
Education:  University of British Columbia

Currently building quantitative systems at Royal Bank of Canada.
Engineering data-driven solutions for systematic finance.

Skills:
├── Languages: Python, TypeScript, JavaScript, Java, SQL
├── Frameworks: Next.js, React, Flask, NumPy, Pandas
├── Tools: Git, Docker, CI/CD, PostgreSQL
└── Focus: Quant Finance, Full-Stack Development

Contact:
├── Email: owenfisher46@gmail.com
├── GitHub: github.com/obro79
└── LinkedIn: linkedin.com/in/fisherowen
`;

const contactContent = `┌─────────────────────────────────────────────────────────────┐
│                       CONTACT                               │
└─────────────────────────────────────────────────────────────┘

Available for freelance projects and consulting.

Email:    owenfisher46@gmail.com
GitHub:   github.com/obro79
LinkedIn: linkedin.com/in/fisherowen

Run 'mailto' to open email client.
`;

const resumeContent = `┌─────────────────────────────────────────────────────────────┐
│                    OWEN FISHER - RESUME                      │
└─────────────────────────────────────────────────────────────┘

EDUCATION
  University of British Columbia                    2023 - 2027
  B.Sc. Combined Major in Computer Science & Statistics

EXPERIENCE
  Royal Bank of Canada — Quantitative Developer   Sept. 2025 -
    Migrated pricing engine from MATLAB to Python + Dask,
    deploying scalable pipelines that sped up valuations 70%
    and cut maintenance 50%+.

  Quantico Research — Quantitative Developer     Jan. - May 2025
    Built Hidden Markov Model in Stan with Python/NumPy,
    slashing seismic risk exposure by 80%. Designed real-time
    seismic data pipelines with vectorized cleaning.

  UBC Science Undergrad Society — Frontend Dev    June 2025 -
    Redesigned website with 5+ new pages, engineered 10+
    reusable components in Next.js/TypeScript.

SKILLS
  Languages:   Python, TypeScript, JavaScript, Java, SQL
  Frameworks:  Next.js, React, Flask, NumPy, Pandas, Dask
  Tools:       Git, Docker, CI/CD, PostgreSQL, Redis, Kafka
  Focus:       Quantitative Finance, Backend Engineering

LINKS
  GitHub:      https://github.com/obro79
  LinkedIn:    https://linkedin.com/in/fisherowen
  Email:       owenfisher46@gmail.com
`;

// Helper to wrap text to a max width
function wrapText(text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= maxWidth) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Helper to truncate text
function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;
}

const BOX_WIDTH = 58; // Inner width of the box

// Generate project directories from projects data
const projectDirs: Record<string, FileSystemNode> = {};
projects.forEach(project => {
  const links = [];
  if (project.links.github) links.push(`GitHub:   ${project.links.github}`);
  if (project.links.demo) links.push(`Demo:     ${project.links.demo}`);
  if (project.links.devpost) links.push(`Devpost:  ${project.links.devpost}`);
  if (project.links.video) links.push(`Video:    ${project.links.video}`);
  if (project.links.docs) links.push(`Docs:     ${project.links.docs}`);

  const title = truncate(project.title, BOX_WIDTH - 2);
  const year = `Year: ${project.year}`;
  const tags = `Tags: ${truncate(project.categories.join(', '), BOX_WIDTH - 8)}`;
  const descLines = wrapText(project.description, BOX_WIDTH - 2);

  const border = '─'.repeat(BOX_WIDTH);

  const readmeContent = `┌${border}┐
│ ${title.padEnd(BOX_WIDTH - 2)} │
├${border}┤
│ ${year.padEnd(BOX_WIDTH - 2)} │
│ ${tags.padEnd(BOX_WIDTH - 2)} │
├${border}┤
${descLines.map(line => `│ ${line.padEnd(BOX_WIDTH - 2)} │`).join('\n')}
├${border}┤
│ ${'Links:'.padEnd(BOX_WIDTH - 2)} │
${links.map(link => `│ ${truncate(link, BOX_WIDTH - 2).padEnd(BOX_WIDTH - 2)} │`).join('\n')}
└${border}┘

Run 'npm run dev' to launch this project in StackBlitz.`;

  const packageJsonContent = `{
  "name": "${project.id}",
  "version": "1.0.0",
  "description": "${project.description.slice(0, 80)}...",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}`;

  // Create project directory with files
  projectDirs[project.id] = {
    type: 'directory',
    name: project.id,
    children: {
      'README.md': {
        type: 'file',
        name: 'README.md',
        content: readmeContent
      },
      'package.json': {
        type: 'file',
        name: 'package.json',
        content: packageJsonContent
      }
    }
  };
});

export const fileSystem: FileSystemNode = {
  type: 'directory',
  name: '~',
  children: {
    'about.txt': {
      type: 'file',
      name: 'about.txt',
      content: aboutContent
    },
    'contact.txt': {
      type: 'file',
      name: 'contact.txt',
      content: contactContent
    },
    'resume.txt': {
      type: 'file',
      name: 'resume.txt',
      content: resumeContent
    },
    'projects': {
      type: 'directory',
      name: 'projects',
      children: projectDirs
    },
    'experience': {
      type: 'directory',
      name: 'experience',
      children: {
        'roles.log': {
          type: 'file',
          name: 'roles.log',
          content: experienceContent
        }
      }
    }
  }
};

export function resolvePath(path: string, currentDir: string[]): string[] {
  const parts = path.split('/').filter(p => p !== '');
  let result = [...currentDir];

  for (const part of parts) {
    if (part === '..') {
      if (result.length > 0) {
        result.pop();
      }
    } else if (part === '~') {
      result = [];
    } else if (part !== '.') {
      result.push(part);
    }
  }

  return result;
}

export function getNode(path: string[]): FileSystemNode | null {
  let node: FileSystemNode = fileSystem;

  for (const part of path) {
    if (node.type !== 'directory' || !node.children) {
      return null;
    }
    const child = node.children[part];
    if (!child) {
      return null;
    }
    node = child;
  }

  return node;
}

export function listDirectory(path: string[]): string[] {
  const node = getNode(path);
  if (!node || node.type !== 'directory' || !node.children) {
    return [];
  }
  return Object.keys(node.children);
}
