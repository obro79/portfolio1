import { useEffect, useMemo, useState } from 'react';

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

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GitHubContributions() {
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      try {
        const response = await fetch('/api/github-contributions');
        if (!response.ok) throw new Error('GitHub contributions unavailable');
        const nextData = await response.json();
        if (!cancelled) {
          setData(nextData);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load contributions');
        }
      }
    }

    loadContributions();
    const interval = window.setInterval(loadContributions, 300000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const { weeks, monthLabels } = useMemo(() => {
    const emptyWeeks = Array.from({ length: 53 }, () => Array<ContributionDay | null>(7).fill(null));
    const emptyLabels = Array<string>(53).fill('');
    if (!data) return { weeks: emptyWeeks, monthLabels: emptyLabels };

    data.days.forEach((day) => {
      if (!emptyWeeks[day.week]) return;
      emptyWeeks[day.week][day.weekday] = day;
    });

    const seenMonths = new Set<string>();
    [...data.days].sort((a, b) => a.date.localeCompare(b.date)).forEach((day) => {
      const date = new Date(`${day.date}T00:00:00Z`);
      const month = date.getUTCMonth();
      const marker = `${date.getUTCFullYear()}-${month}`;
      if (!seenMonths.has(marker)) {
        seenMonths.add(marker);
        emptyLabels[day.week] = MONTH_LABELS[month];
      }
    });

    return { weeks: emptyWeeks, monthLabels: emptyLabels };
  }, [data]);

  return (
    <section className="section contributions-section" id="contributions">
      <div className="container projects-container">
        <div className="section-header fade-in-section">
          <p className="section-command">git log --contributions</p>
          <h2 className="section-title">GitHub Activity</h2>
        </div>

        <div className="contrib-panel fade-in-section">
          <div className="contrib-header">
            <div>
              <p className="contrib-total">
                {data ? data.total.toLocaleString() : '...'} contributions
              </p>
              <p className="contrib-meta">
                github.com/{data?.username || 'obro79'}
                {' · '}{data?.period || 'loading latest calendar'}
              </p>
              <a
                href={`https://github.com/${data?.username || 'obro79'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contrib-github-link"
              >
                &gt; github
              </a>
            </div>
            <div className="contrib-live">
              <span className={`status-dot ${data && !error ? 'live' : ''}`} />
              <span>{error ? 'OFFLINE' : 'LIVE'}</span>
            </div>
          </div>

          {error ? (
            <p className="contrib-error">{error}</p>
          ) : (
            <div className="contrib-scroll">
              <div className="contrib-months" aria-hidden="true">
                {monthLabels.map((label, index) => (
                  <span key={`${label || 'empty'}-${index}`}>{label}</span>
                ))}
              </div>
              <div className="contrib-body">
                <div className="contrib-weekdays" aria-hidden="true">
                  {WEEKDAY_LABELS.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
                <div className="contrib-grid" aria-label="GitHub contribution calendar">
                  {weeks.map((week, weekIndex) => (
                    <div className="contrib-week" key={weekIndex}>
                      {week.map((day, weekdayIndex) => (
                        <span
                          key={day?.date || `${weekIndex}-${weekdayIndex}`}
                          className="contrib-day"
                          data-level={day?.level || 0}
                          title={day ? `${day.count} contributions on ${day.date}` : 'No contribution data'}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="contrib-footer">
                <span>{data ? `updated ${new Date(data.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'syncing'}</span>
                <div className="contrib-legend" aria-label="Contribution intensity legend">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span key={level} className="contrib-day" data-level={level} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
