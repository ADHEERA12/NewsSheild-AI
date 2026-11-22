import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

// Lightweight inline SVG icons
const Icons = {
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  ),
  Copy: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  History: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Clipboard: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
};

// Preset sample news headlines to quickly test
const SAMPLE_NEWS = [
  {
    type: 'real',
    title: 'NASA James Webb Telescope',
    text: "NASA's James Webb Space Telescope has captured unprecedented direct images of exoplanet atmospheres, revealing rich carbon dioxide and water vapor signatures in a peer-reviewed astrophysical study published by researchers."
  },
  {
    type: 'real',
    title: 'Global Renewable Energy Report',
    text: 'The International Energy Agency announced that solar and wind power generation grew by a record 30% globally this past year, officially outpacing fossil fuel additions across major industrial nations.'
  },
  {
    type: 'fake',
    title: 'Antarctic Secret Pyramid',
    text: 'WHISTLEBLOWERS REVEAL: Secret military pyramid discovered beneath Antarctic ice sheet using banned Google Earth coordinates! Government is actively silencing journalists who dare expose the extraterrestrial power source!'
  },
  {
    type: 'fake',
    title: 'Miracle Kitchen Cure',
    text: 'SHOCKING: Drinking boiled onion peel water with baking soda destroys all chronic inflammation and diseases overnight! Big pharma has been secretly spending millions to ban this ancient natural remedy from public libraries!'
  }
];

export default function App() {
  const [newsText, setNewsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('detector'); // 'detector' | 'history' | 'tips'
  const [apiUrl, setApiUrl] = useState(() => localStorage.getItem('verinews_api_url') || 'http://127.0.0.1:8000');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'online' | 'offline' | 'checking'
  const [demoMode, setDemoMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiUrl, setTempApiUrl] = useState(apiUrl);
  const [theme, setTheme] = useState(() => localStorage.getItem('verinews_theme') || 'dark');
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('verinews_history') || '[]');
    } catch {
      return [];
    }
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('verinews_theme', theme);
  }, [theme]);

  // Check backend health
  const checkBackend = useCallback(async () => {
    setBackendStatus('checking');
    try {
      const res = await fetch(`${apiUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    }
  }, [apiUrl]);

  useEffect(() => {
    let ignore = false;
    const runCheck = async () => {
      try {
        const res = await fetch(`${apiUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(3000) });
        if (!ignore) {
          setBackendStatus(res.ok ? 'online' : 'offline');
        }
      } catch {
        if (!ignore) {
          setBackendStatus('offline');
        }
      }
    };
    runCheck();
    return () => {
      ignore = true;
    };
  }, [apiUrl]);

  // Heuristic analysis of input text
  const stats = useMemo(() => {
    const trimmed = newsText.trim();
    if (!trimmed) {
      return { words: 0, chars: 0, readingTime: 0, sensationalScore: 0, sensationalWarnings: [] };
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const chars = trimmed.length;
    const readingTime = Math.max(1, Math.ceil(words.length / 200));

    // Heuristics for sensationalism / clickbait cues
    const clickbaitPatterns = [
      /\b(shocking|unbelievable|miracle|secret|exposed|banned|whistleblower|hidden truth|conspiracy|big pharma|overnight)\b/gi,
      /!{2,}/g,
      /\?{2,}/g
    ];

    let triggersFound = [];
    clickbaitPatterns.forEach(pat => {
      const matches = trimmed.match(pat);
      if (matches) {
        triggersFound.push(...matches.map(m => m.toLowerCase()));
      }
    });

    const uppercaseWords = words.filter(w => w.length > 2 && w === w.toUpperCase() && !/^\d+$/.test(w));
    if (uppercaseWords.length >= 2) {
      triggersFound.push(`${uppercaseWords.length} ALL-CAPS words`);
    }

    const sensationalScore = Math.min(100, Math.round((triggersFound.length / Math.max(1, words.length * 0.1)) * 100));

    return {
      words: words.length,
      chars,
      readingTime,
      sensationalScore,
      sensationalWarnings: [...new Set(triggersFound)]
    };
  }, [newsText]);

  const saveToHistory = useCallback((item) => {
    setHistory((prev) => {
      const updated = [item, ...prev.slice(0, 19)];
      localStorage.setItem('verinews_history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Handle detection request
  const handleAnalyze = async () => {
    const textToAnalyze = newsText.trim();
    if (!textToAnalyze) {
      setError('Please enter or paste a news article headline or text to evaluate.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    // If Demo Mode is enabled
    if (demoMode) {
      setTimeout(() => {
        const isFakeHeuristic = stats.sensationalScore > 35 || stats.sensationalWarnings.length >= 2;
        const isReal = !isFakeHeuristic;
        const conf = isReal ? 88.5 : 91.2;

        const simulated = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          prediction: isReal ? 'Real News' : 'Fake News',
          isReal,
          confidence: conf,
          realProb: isReal ? conf : (100 - conf),
          fakeProb: isReal ? (100 - conf) : conf,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString(),
          textSnippet: textToAnalyze.slice(0, 140) + (textToAnalyze.length > 140 ? '...' : ''),
          isDemo: true
        };

        setResult(simulated);
        saveToHistory(simulated);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze }),
        signal: AbortSignal.timeout(6000)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const isReal = data.prediction?.toLowerCase().includes('real') ?? (data.is_real ?? true);
      const conf = data.confidence !== undefined
        ? data.confidence
        : (data.probabilities ? (isReal ? data.probabilities.real : data.probabilities.fake) : 85);

      const parsedResult = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        prediction: isReal ? 'Real News' : 'Fake News',
        isReal,
        confidence: Number(conf) || 85.0,
        realProb: data.probabilities?.real ?? (isReal ? Number(conf) : (100 - Number(conf))),
        fakeProb: data.probabilities?.fake ?? (isReal ? (100 - Number(conf)) : Number(conf)),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        textSnippet: textToAnalyze.slice(0, 140) + (textToAnalyze.length > 140 ? '...' : '')
      };

      setResult(parsedResult);
      saveToHistory(parsedResult);
      setBackendStatus('online');
    } catch (err) {
      console.error(err);
      setError(`Cannot reach backend at ${apiUrl}. Please verify the FastAPI server is running or toggle Demo Mode.`);
      setBackendStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('verinews_history');
  };

  const deleteHistoryItem = (id, e) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem('verinews_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopyResult = () => {
    if (!result) return;
    const summary = `[NewsShieldAI Analysis]\nVerdict: ${result.prediction}\nConfidence: ${result.confidence}%\nProbabilities: Real: ${result.realProb}% | Fake: ${result.fakeProb}%\nSnippet: "${result.textSnippet}"`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasteClipboard = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) setNewsText(clip);
    } catch {
      // Ignore
    }
  };

  const handleSaveSettings = () => {
    const formatted = tempApiUrl.trim().replace(/\/$/, '');
    setApiUrl(formatted);
    localStorage.setItem('verinews_api_url', formatted);
    setShowSettings(false);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="header">
        <div className="header-content">
          <div className="brand" onClick={() => setActiveTab('detector')}>
            <div className="brand-icon">
              <Icons.Shield />
            </div>
            <div className="brand-title">NewsShieldAI</div>
            <span className="brand-badge">ML 2.0</span>
          </div>

          <nav className="nav-tabs">
            <button
              className={`nav-tab-btn ${activeTab === 'detector' ? 'active' : ''}`}
              onClick={() => setActiveTab('detector')}
            >
              <Icons.Sparkles />
              Detector
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <Icons.History />
              History
              {history.length > 0 && <span className="badge-count">{history.length}</span>}
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
              onClick={() => setActiveTab('tips')}
            >
              <Icons.BookOpen />
              Fact-Checking Guide
            </button>
          </nav>

          <div className="header-actions">
            {/* Status indicator pill */}
            <div
              className="status-indicator"
              title={`API URL: ${apiUrl}`}
              onClick={() => setShowSettings(true)}
              style={{ cursor: 'pointer' }}
            >
              <span className={`status-dot ${demoMode ? 'demo' : (backendStatus === 'online' ? 'online' : 'offline')}`}></span>
              <span>
                {demoMode ? 'Demo Mode' : (backendStatus === 'online' ? 'API Online' : backendStatus === 'checking' ? 'Checking...' : 'API Offline')}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              className="icon-btn"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
            </button>

            {/* Settings Modal Toggle */}
            <button
              className="icon-btn"
              onClick={() => setShowSettings(true)}
              title="API & Configuration Settings"
            >
              <Icons.Settings />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="main-content">
        {activeTab === 'detector' && (
          <>
            {/* Hero Section */}
            <section className="hero">
              <div className="hero-pill">
                <Icons.Sparkles /> Powered by TF-IDF &amp; Logistic Regression NLP
              </div>
              <h1>
                Verify News Authenticity with <span>Machine Learning</span>
              </h1>
              <p className="hero-desc">
                Paste any news article, headline, or claim to evaluate credibility, spot sensationalism, and detect fabricated stories.
              </p>
            </section>

            {/* Sample Headlines Section */}
            <div className="samples-card">
              <div className="samples-header">
                <span className="samples-title">
                  <Icons.Sparkles /> Click to test instant sample articles:
                </span>
              </div>
              <div className="samples-grid">
                {SAMPLE_NEWS.map((sample, idx) => (
                  <button
                    key={idx}
                    className="sample-chip"
                    onClick={() => {
                      setNewsText(sample.text);
                      setError(null);
                    }}
                  >
                    <span className={`sample-tag ${sample.type}`}>
                      {sample.type === 'real' ? 'Verified Sample' : 'Clickbait / Fake'}
                    </span>
                    <span className="sample-headline">{sample.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Detector Input Card */}
            <div className="detector-card">
              <div className="input-header">
                <label className="input-label" htmlFor="news-input">
                  <Icons.Shield /> Article Text or Headline
                </label>
                <div className="input-actions">
                  <button className="tool-btn" onClick={handlePasteClipboard} title="Paste from clipboard">
                    <Icons.Clipboard /> Paste
                  </button>
                  {newsText && (
                    <button className="tool-btn" onClick={() => { setNewsText(''); setResult(null); setError(null); }} title="Clear text">
                      <Icons.Trash /> Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="textarea-wrapper">
                <textarea
                  id="news-input"
                  className="news-textarea"
                  rows={6}
                  value={newsText}
                  onChange={(e) => {
                    setNewsText(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Paste or write the news headline, article body, or press release here to analyze..."
                />
              </div>

              {/* Character & Heuristic Stats Bar */}
              <div className="input-stats">
                <div className="stat-pills">
                  <span className="stat-item">Words: <strong>{stats.words}</strong></span>
                  <span className="stat-item">Characters: <strong>{stats.chars}</strong></span>
                  <span className="stat-item">Est. Reading: <strong>{stats.readingTime} min</strong></span>
                </div>

                {stats.sensationalWarnings.length > 0 && (
                  <div className="heuristic-warning" title={stats.sensationalWarnings.join(', ')}>
                    <Icons.AlertTriangle /> Sensational triggers detected: {stats.sensationalWarnings.slice(0, 2).join(', ')}
                  </div>
                )}
              </div>

              {/* Analyze CTA Button */}
              <button
                className="cta-btn"
                disabled={loading || !newsText.trim()}
                onClick={handleAnalyze}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Running NLP Vectorizer &amp; Model...
                  </>
                ) : (
                  <>
                    <Icons.Sparkles />
                    Analyze News Authenticity
                  </>
                )}
              </button>

              {/* Offline & Error Alert with Help Action */}
              {error && (
                <div className="offline-banner">
                  <div className="offline-header">
                    <Icons.AlertTriangle /> Connection Notice
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{error}</p>

                  {backendStatus === 'offline' && !demoMode && (
                    <>
                      <div className="offline-code">
                        <span>cd Fake-News-Detection-\backend &amp;&amp; uvicorn main:app --reload</span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
                        <button
                          className="tool-btn"
                          style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none' }}
                          onClick={() => {
                            setDemoMode(true);
                            setError(null);
                            handleAnalyze();
                          }}
                        >
                          Enable Interactive Demo Mode
                        </button>
                        <button className="tool-btn" onClick={checkBackend}>
                          <Icons.Refresh /> Retry API Connection
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Result Presentation */}
              {result && (
                <div className="result-container">
                  <div className={`result-card ${result.isReal ? 'real' : 'fake'}`}>
                    <div className="result-badge-row">
                      <div className="result-badge">
                        <div className="badge-icon-lg">
                          {result.isReal ? <Icons.CheckCircle /> : <Icons.AlertTriangle />}
                        </div>
                        <div className="badge-text-group">
                          <h3>{result.isReal ? 'Likely Authentic / Real News' : 'Suspicious / Fake News Detected'}</h3>
                          <p>
                            {result.isReal
                              ? 'Model classification indicates linguistic patterns consistent with credible journalism.'
                              : 'Model classification indicates markers frequently associated with fabricated or deceptive stories.'
                            }
                          </p>
                        </div>
                      </div>

                      <div className="result-actions">
                        <button className="tool-btn" onClick={handleCopyResult}>
                          {copied ? <Icons.Check /> : <Icons.Copy />}
                          {copied ? 'Copied!' : 'Copy Summary'}
                        </button>
                      </div>
                    </div>

                    {/* Confidence Meter Box */}
                    <div className="confidence-box">
                      <div className="confidence-header">
                        <span className="confidence-title">Classification Confidence Score</span>
                        <span className="confidence-value">{result.confidence}%</span>
                      </div>
                      <div className="meter-track">
                        <div
                          className="meter-fill-real"
                          style={{ width: `${result.realProb}%` }}
                          title={`Real News Probability: ${result.realProb}%`}
                        ></div>
                        <div
                          className="meter-fill-fake"
                          style={{ width: `${result.fakeProb}%` }}
                          title={`Fake News Probability: ${result.fakeProb}%`}
                        ></div>
                      </div>
                      <div className="meter-labels">
                        <span style={{ color: 'var(--status-real)', fontWeight: 600 }}>
                          Real Probability: {result.realProb}%
                        </span>
                        <span style={{ color: 'var(--status-fake)', fontWeight: 600 }}>
                          Fake Probability: {result.fakeProb}%
                        </span>
                      </div>
                    </div>

                    {/* Diagnostic Breakdown Grid */}
                    <div className="diagnostic-grid">
                      <div className="diag-card">
                        <div className="diag-title">Model Architecture</div>
                        <div className="diag-val">Logistic Regression + TF-IDF</div>
                      </div>
                      <div className="diag-card">
                        <div className="diag-title">Sensationalism Cue</div>
                        <div className="diag-val">
                          {stats.sensationalScore > 30 ? 'High Hyperbole' : 'Neutral / Factual'}
                        </div>
                      </div>
                      <div className="diag-card">
                        <div className="diag-title">Verification Advice</div>
                        <div className="diag-val">
                          {result.isReal ? 'Safe to review sources' : 'Cross-check with AP/Reuters'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab: History */}
        {activeTab === 'history' && (
          <div className="history-view">
            <div className="history-header">
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Past Analysis History</h2>
              {history.length > 0 && (
                <button className="tool-btn" onClick={clearHistory}>
                  <Icons.Trash /> Clear All History
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="history-empty">
                <Icons.History />
                <p style={{ marginTop: '0.75rem' }}>No past predictions yet. Analyze an article to see history here.</p>
              </div>
            ) : (
              <div className="history-list">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="history-item"
                    onClick={() => {
                      setNewsText(item.textSnippet);
                      setResult(item);
                      setActiveTab('detector');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="history-info">
                      <div className="history-meta">
                        <span className={`sample-tag ${item.isReal ? 'real' : 'fake'}`}>
                          {item.prediction} ({item.confidence}%)
                        </span>
                        <span>•</span>
                        <span>{item.date} {item.timestamp}</span>
                      </div>
                      <div className="history-text">"{item.textSnippet}"</div>
                    </div>
                    <button
                      className="icon-btn"
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      title="Delete entry"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Tips */}
        {activeTab === 'tips' && (
          <div>
            <div className="hero" style={{ marginBottom: '1.75rem' }}>
              <h2>Essential Fact-Checking Verification Guide</h2>
              <p className="hero-desc">How to spot disinformation and maintain media literacy in an age of viral content.</p>
            </div>

            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon"><Icons.Shield /></div>
                <h3>1. Verify the Domain &amp; URL</h3>
                <p>Check for subtle domain typos (e.g. <code>.co</code> instead of <code>.com</code> or altered subdomains). Credible news outlets maintain transparent, verified domain names and contact info.</p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Icons.Sparkles /></div>
                <h3>2. Check Primary Sources</h3>
                <p>Does the article link directly to primary documentation, government records, academic studies, or recognized wire services like Associated Press, Reuters, or BBC?</p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Icons.AlertTriangle /></div>
                <h3>3. Watch Emotional Triggers</h3>
                <p>Fake news stories intentionally exploit high-arousal emotions: outrage, fear, panic, or miraculous hope. If a headline elicits an extreme emotional spike, verify before sharing.</p>
              </div>

              <div className="tip-card">
                <div className="tip-icon"><Icons.BookOpen /></div>
                <h3>4. Reverse Image Search</h3>
                <p>Misinformation frequently recycles genuine photographs from older, unrelated disasters or conflicts. Use Google Images or TinEye to verify the photo's original date and context.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Settings /> Backend API Settings
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Configure the endpoint of your FastAPI backend service.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                FastAPI Host URL
              </label>
              <input
                type="text"
                value={tempApiUrl}
                onChange={(e) => setTempApiUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem'
                }}
                placeholder="http://127.0.0.1:8000"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Demo Simulation Mode</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Simulate NLP predictions offline without a backend</div>
              </div>
              <input
                type="checkbox"
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
              <button className="tool-btn" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
              <button
                className="tool-btn"
                style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '0.5rem 1rem' }}
                onClick={handleSaveSettings}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>NewsShieldAI • Powered by Scikit-Learn TF-IDF Vectorizer &amp; Logistic Regression • Built with React &amp; FastAPI</p>
      </footer>
    </div>
  );
}
