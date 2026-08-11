import React, { useState } from 'react';
import { Bot, Code2, Download, Copy, Check, FileText, Terminal, Sparkles, Cpu, Layers } from 'lucide-react';

export function AiHubView({ companies, showToast }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '1');
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const atsCounts = companies.reduce((acc, c) => {
    const ats = c.ats_type || 'Custom Corporate Portal';
    acc[ats] = (acc[ats] || 0) + 1;
    return acc;
  }, {});

  const promptTemplates = [
    {
      id: 'agent-auto-apply',
      title: '🤖 Browser Automation / Subagent Auto-Apply Prompt',
      target: 'Playwright / Puppeteer / Claude Subagent',
      prompt: `Act as a Browser Automation Subagent. Read the CareeRepo Malaysia structured portal data below:

Company: ${selectedCompany?.name || 'PETRONAS'}
Career Portal: ${selectedCompany?.career_url || 'https://careers.petronas.com/'}
Internship Portal: ${selectedCompany?.internship_url || 'N/A'}
ATS Type: ${selectedCompany?.ats_type || 'Workday'}

Instructions:
1. Navigate to the official URL provided above.
2. Locate candidate login/registration or 'Apply Now' buttons.
3. Identify input fields for Resume (PDF), Full Name, Email, Phone (+60), and University/Faculty.
4. Stop before final submission and request human approval.`
    },
    {
      id: 'student-intern-finder',
      title: '🎓 Student Internship & Graduate Trainee Extraction Prompt',
      target: 'ChatGPT / Claude 3.5 / Gemini',
      prompt: `Please parse the CareeRepo Malaysia dataset (${companies.length} verified companies).
Filter out all companies in the 'Technology' and 'Banking' sectors that provide explicit 'internship_url' and 'graduate_url' fields.
Output a Markdown table listing:
| Company Name | Hub Location | ATS Type | Direct Internship Link |`
    },
    {
      id: 'cv-tailor',
      title: '📄 CV & Cover Letter Customizer Prompt',
      target: 'LLM Assistant',
      prompt: `I am applying to ${selectedCompany?.name} (${selectedCompany?.industry} in ${selectedCompany?.location}).
Company overview: "${selectedCompany?.description}"

Please tailor my resume summary and write a targeted 200-word cover letter matching ${selectedCompany?.name}'s corporate focus in Malaysia.`
    }
  ];

  const handleCopyText = (text, key) => {
    navigator.clipboard.writeText(text);
    if (key === 'json') {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
      showToast('Copied JSON payload to clipboard!', 'success');
    } else {
      setCopiedPrompt(key);
      setTimeout(() => setCopiedPrompt(null), 2000);
      showToast('Copied AI Prompt template to clipboard!', 'success');
    }
  };

  const handleDownloadCsv = () => {
    const headers = ["ID", "Name", "Category", "Industry", "Company Type", "Location", "ATS Type", "Career URL", "Internship URL", "Graduate URL"];
    const rows = companies.map(c => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.category}"`,
      `"${c.industry}"`,
      `"${c.company_type}"`,
      `"${c.location}"`,
      `"${c.ats_type || 'Custom'}"`,
      `"${c.career_url}"`,
      `"${c.internship_url || ''}"`,
      `"${c.graduate_url || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `careerepo_malaysia_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Downloaded CSV dataset!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold">
          <Bot className="w-4 h-4 text-brand-600" /> Machine-Readable API & Agent Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Agent & Developer Integration Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          CareeRepo MY is built to be <strong>Agentic AI Ready</strong>. Access raw structured data, standard <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-brand-600 font-mono text-xs">/llms.txt</code> files, ATS portal schemas, and ready-to-use prompts for AI job automation tools.
        </p>
      </div>

      {/* Endpoint Cards & Standards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
            <Code2 className="w-4 h-4 text-brand-600" /> Raw JSON Dataset
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Full array of {companies.length} corporate portals formatted in standard JSON syntax.
          </p>
          <a
            href="https://raw.githubusercontent.com/pwntable/career-repo/main/src/data/companies.json"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-semibold transition w-full justify-center"
          >
            <FileText className="w-3.5 h-3.5" /> Open Raw JSON
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
            <Cpu className="w-4 h-4 text-purple-600" /> Standard llms.txt File
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Clean, unformatted text file designed for LLMs (Claude, ChatGPT, Gemini, Antigravity).
          </p>
          <div className="flex items-center gap-2">
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-xl font-semibold transition flex-1 justify-center"
            >
              llms.txt
            </a>
            <a
              href="/llms-full.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-xl font-semibold transition flex-1 justify-center"
            >
              llms-full.txt
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
            <Download className="w-4 h-4 text-emerald-600" /> Export CSV Spreadsheet
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Download company portal metadata as a CSV spreadsheet for custom scripts and analysis.
          </p>
          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition w-full justify-center shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Download CSV
          </button>
        </div>
      </div>

      {/* ATS System Distribution Metrics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-600" /> ATS Platform Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {Object.entries(atsCounts).map(([ats, count]) => (
            <div key={ats} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 font-medium">{ats}</div>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{count} Portals</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Templates */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-500" /> AI Agent Prompt Templates
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {promptTemplates.map(item => (
            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                  <span className="text-[11px] text-slate-400">Target: {item.target}</span>
                </div>
                <button
                  onClick={() => handleCopyText(item.prompt, item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition self-start sm:self-auto"
                >
                  {copiedPrompt === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPrompt === item.id ? 'Copied Prompt!' : 'Copy Prompt'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                {item.prompt}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive JSON Inspector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-600" /> Interactive Company Schema Inspector
            </h3>
            <p className="text-xs text-slate-500">Select any company to view and copy its structured JSON payload.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white outline-none"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
              ))}
            </select>

            <button
              onClick={() => handleCopyText(JSON.stringify(selectedCompany, null, 2), 'json')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition whitespace-nowrap"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedJson ? 'Copied Payload!' : 'Copy JSON'}
            </button>
          </div>
        </div>

        <pre className="p-4 bg-slate-950 text-emerald-400 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-80 custom-scrollbar">
          {JSON.stringify(selectedCompany, null, 2)}
        </pre>
      </div>
    </div>
  );
}
