import type { NextApiRequest, NextApiResponse } from 'next';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
  week: number;
  weekday: number;
}

interface ContributionResponse {
  username: string;
  total: number;
  period: string;
  generatedAt: string;
  days: ContributionDay[];
}

const USERNAME = 'obro79';
const GITHUB_CONTRIBUTIONS_URL = `https://github.com/users/${USERNAME}/contributions`;

function extractAttr(source: string, name: string) {
  const match = source.match(new RegExp(`${name}="([^"]*)"`));
  return match?.[1] || '';
}

function parseContributionCount(label: string) {
  if (label.startsWith('No contributions')) return 0;
  const match = label.match(/([\d,]+)\s+contribution/);
  return match ? Number(match[1].replace(/,/g, '')) : 0;
}

function parseContributionCalendar(html: string): ContributionResponse {
  const headingMatch = html.match(/<h2[^>]*>\s*([\d,]+)\s+contributions\s*(?:in\s+([^<\n]+))?/i);
  const total = headingMatch ? Number(headingMatch[1].replace(/,/g, '')) : 0;
  const period = headingMatch?.[2]?.trim() || 'the latest GitHub calendar';
  const cellRegex = /<td[^>]*class="ContributionCalendar-day"[^>]*><\/td>\s*<tool-tip[^>]*>(.*?)<\/tool-tip>/g;
  const days: ContributionDay[] = [];
  let match: RegExpExecArray | null;

  while ((match = cellRegex.exec(html)) !== null) {
    const cell = match[0];
    const date = extractAttr(cell, 'data-date');
    if (!date) continue;

    const parsedDate = new Date(`${date}T00:00:00Z`);
    const weekday = parsedDate.getUTCDay();
    const week = Number(extractAttr(cell, 'data-ix')) || 0;

    days.push({
      date,
      count: parseContributionCount(match[1]),
      level: Number(extractAttr(cell, 'data-level')) || 0,
      week,
      weekday
    });
  }

  return {
    username: USERNAME,
    total,
    period,
    generatedAt: new Date().toISOString(),
    days
  };
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ContributionResponse | { error: string }>
) {
  try {
    const response = await fetch(GITHUB_CONTRIBUTIONS_URL, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'owenfisher.dev portfolio'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const html = await response.text();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
    res.status(200).json(parseContributionCalendar(html));
  } catch (error) {
    res.status(502).json({
      error: error instanceof Error ? error.message : 'Unable to load GitHub contributions'
    });
  }
}
