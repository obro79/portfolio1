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

[2026-06 -> present] Sendbird
  Role: AI Engineer (Internship)
  Location: San Mateo, California, United States
  - Building agentic AI workflows with LangChain.
  - Backend engineering in Python.

[2025-09 -> 2026-05] Royal Bank of Canada
  Role: Quantitative Developer (Internship)
  - Migrated legacy MATLAB factor-scoring pipeline to Python/PySpark
    on Databricks, cutting single-factor backfills from 3.25 hours to
    under 1 minute for a 250x+ speedup across 30+ years of financial
    time-series data.

  - Owned Python POC rebuild of legacy MATLAB batch preprocessing
    pipeline, preserving backward-compatible file outputs while adding
    caching and multithreading to make daily runs more reliable and
    15-20x faster.

  - Built regression validation framework across golden datasets, 26
    intermediate calculation columns, 150 factor-region combinations,
    and 500M+ score rows, giving the team confidence to replace the
    legacy MATLAB pipeline.

  - Built Parquet/Delta migration pipeline centralizing 3.1B+ rows of
    legacy research data from proprietary MATLAB/NAS formats into
    Databricks volumes and governed Delta tables for faster querying.

[2025-01 -> 2025-03] Quantico Research
  Role: Software Engineer
  - Provisioned Terraform-managed AWS infrastructure for data ingestion,
    embedding storage, and investment-factor generation.
  - Built Python/NumPy risk-signal pipelines and automated walk-forward
    validation and stress testing with Pytest inside CI.

[2025-06 -> present] UBC Science Undergraduate Society
  Role: Frontend Developer
  - Built production Next.js/TypeScript pages and reusable components
    for student-facing workflows, room bookings, clubs, and events.

[2025-05 -> present] UBC Actuarial Science Club
  Role: Frontend Engineer
  - Led the club website build and shipped event/member surfaces in
    Next.js, React, and Tailwind CSS.
`;

const aboutContent = `┌─────────────────────────────────────────────────────────────┐
│                      ABOUT OWEN                             │
└─────────────────────────────────────────────────────────────┘

Name:       Owen Fisher
Role:       Backend Engineer
Location:   Vancouver, BC, Canada
Education:  University of British Columbia

I build Python services, data pipelines, and production-minded
infrastructure. Recent work spans FastAPI services, Kafka consumers,
Postgres/Redis data paths, Databricks migrations, AWS infrastructure,
Dockerized local stacks, CI validation, and observability.

Skills:
├── Languages: Python, TypeScript, Java, C++, SQL, Bash
├── Backend: FastAPI, Kafka, PostgreSQL, Redis, Pydantic, Pytest
├── Data: PySpark, Databricks, NumPy, Pandas, Delta/Parquet
├── Infra: AWS, Docker, Terraform, GitHub Actions, Vercel
└── Focus: Backend systems, data infrastructure, reliability

Contact:
├── Email: owenfisher46@gmail.com
├── GitHub: github.com/obro79
└── LinkedIn: linkedin.com/in/fisherowen
`;

const skillsContent = `┌─────────────────────────────────────────────────────────────┐
│                     SKILLS                                  │
└─────────────────────────────────────────────────────────────┘

Languages
  Python, TypeScript, Java, C++, SQL, Bash, MATLAB, R

Backend & Data
  FastAPI, Kafka, PostgreSQL, Redis, PySpark, Pydantic, NumPy, Pandas

Infrastructure
  AWS, Docker, Terraform, Databricks, GitHub Actions, Vercel, Pytest

Working style
  Observable services, regression-tested migrations, local-first dev
  environments, clear trust boundaries for automation.
`;

const contactContent = `┌─────────────────────────────────────────────────────────────┐
│                       CONTACT                               │
└─────────────────────────────────────────────────────────────┘

Open to backend, infrastructure, Python, data platform, and automation
work.

Email:    owenfisher46@gmail.com
GitHub:   github.com/obro79
LinkedIn: linkedin.com/in/fisherowen
Devpost:  devpost.com/obro79
Medium:   medium.com/@owenfisher46

Run 'mailto' to open an email client.
`;

const resumeContent = `┌─────────────────────────────────────────────────────────────┐
│                    OWEN FISHER - RESUME                     │
└─────────────────────────────────────────────────────────────┘

EDUCATION
  University of British Columbia
  B.Sc. Computer Science, Minor in Mathematics      Expected May 2027

EXPERIENCE
  Sendbird — AI Engineer (Internship)               Jun 2026 - Present
    Building agentic AI workflows with LangChain and backend systems
    in Python. San Mateo, California.

  Royal Bank of Canada — Quantitative Developer     Sep 2025 - May 2026
    (Internship). Migrated MATLAB factor-scoring to Python/PySpark on Databricks,
    reducing single-factor backfills from 3.25 hours to under 1 minute
    for a 250x+ speedup across 30+ years of financial time-series data.

    Rebuilt legacy MATLAB batch preprocessing in Python with
    backward-compatible file outputs, caching, and multithreading for
    15-20x faster daily runs.

    Built regression validation across golden datasets, 26 intermediate
    columns, 150 factor-region combinations, and 500M+ score rows.

    Built Parquet/Delta migration pipeline centralizing 3.1B+ rows from
    proprietary MATLAB/NAS formats into Databricks volumes and governed
    Delta tables.

  Quantico Research — Software Engineer             Jan 2025 - Mar 2025
    - Provisioned Terraform-managed AWS infrastructure for data ingestion,
      embedding storage, and investment-factor generation.
    - Built Python/NumPy risk-signal pipelines and automated walk-forward
      validation and stress testing with Pytest inside CI.

  UBC Science Undergraduate Society — Frontend Dev  Jun 2025 - Present
    - Built production Next.js/TypeScript pages and reusable components
      for student-facing workflows, room bookings, clubs, and events.

  UBC Actuarial Science Club — Frontend Engineer    May 2025 - Present
    - Led the club website build and shipped event/member surfaces in
      Next.js, React, and Tailwind CSS.

SELECTED PROJECTS
${projects.map((project) => `  ${project.title.padEnd(14)}${project.description.slice(0, 52)}`).join('\n')}

SKILLS
  Python, TypeScript, Java, C++, SQL, Bash
  FastAPI, Kafka, PostgreSQL, Redis, PySpark, Docker, AWS, Terraform

LINKS
  GitHub:    https://github.com/obro79
  LinkedIn:  https://linkedin.com/in/fisherowen
  Email:     owenfisher46@gmail.com
`;

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

function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;
}

const BOX_WIDTH = 58;

const projectFiles: Record<string, FileSystemNode> = {};
const projectDirs: Record<string, FileSystemNode> = {};

projects.forEach(project => {
  const links = [];
  if (project.links.github) links.push(`GitHub:   ${project.links.github}`);
  if (project.links.demo) links.push(`Demo:     ${project.links.demo}`);
  if (project.links.devpost) links.push(`Devpost:  ${project.links.devpost}`);
  if (project.links.video) links.push(`Video:    ${project.links.video}`);
  if (project.links.docs) links.push(`Docs:     ${project.links.docs}`);
  if (project.stackblitz) links.push(`Sandbox:  code ${project.id}`);
  if (project.terminalDemo) links.push(`Demo:     ${project.terminalDemo}`);

  const border = '─'.repeat(BOX_WIDTH);
  const descLines = wrapText(project.description, BOX_WIDTH - 2);
  const stackLines = wrapText(project.stack.join(', '), BOX_WIDTH - 9);
  const metricLines = project.metrics.flatMap(metric => wrapText(`- ${metric}`, BOX_WIDTH - 2));
  const previewLines = project.preview.flatMap(line => wrapText(`> ${line}`, BOX_WIDTH - 2));

  const readmeContent = `┌${border}┐
│ ${truncate(project.title, BOX_WIDTH - 2).padEnd(BOX_WIDTH - 2)} │
├${border}┤
│ ${`Role: ${project.role}`.padEnd(BOX_WIDTH - 2)} │
│ ${`Year: ${project.year}`.padEnd(BOX_WIDTH - 2)} │
│ ${`Tags: ${project.categories.join(', ')}`.padEnd(BOX_WIDTH - 2)} │
├${border}┤
${descLines.map(line => `│ ${line.padEnd(BOX_WIDTH - 2)} │`).join('\n')}
├${border}┤
│ ${'Stack:'.padEnd(BOX_WIDTH - 2)} │
${stackLines.map(line => `│ ${line.padEnd(BOX_WIDTH - 2)} │`).join('\n')}
├${border}┤
│ ${'Proof / metrics:'.padEnd(BOX_WIDTH - 2)} │
${metricLines.map(line => `│ ${line.padEnd(BOX_WIDTH - 2)} │`).join('\n')}
├${border}┤
${previewLines.map(line => `│ ${line.padEnd(BOX_WIDTH - 2)} │`).join('\n')}
├${border}┤
│ ${'Links and actions:'.padEnd(BOX_WIDTH - 2)} │
${links.map(link => `│ ${truncate(link, BOX_WIDTH - 2).padEnd(BOX_WIDTH - 2)} │`).join('\n')}
└${border}┘`;

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

  projectFiles[project.slug] = {
    type: 'file',
    name: project.slug,
    content: readmeContent
  };

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
    'skills.txt': {
      type: 'file',
      name: 'skills.txt',
      content: skillsContent
    },
    'projects': {
      type: 'directory',
      name: 'projects',
      children: {
        ...projectFiles,
        ...projectDirs
      }
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
  let node = fileSystem;

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
