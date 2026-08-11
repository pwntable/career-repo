import fs from 'fs';
import path from 'path';

const companiesPath = path.resolve('src/data/companies.json');
const companies = JSON.parse(fs.readFileSync(companiesPath, 'utf8'));

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Generate summary llms.txt
let llmsText = `# CareeRepo Malaysia (https://github.com/pwntable/career-repo)
> Official Corporate Career & Internship Directory in Malaysia (${companies.length} Verified Employers)

## Project Overview
CareeRepo MY is a machine-readable directory providing direct, verified links to official career, internship, and graduate trainee portals of MNCs, GLCs, statutory bodies, and tech companies operating in Malaysia.

## Raw API Endpoints & Structured Data
- Companies JSON: https://raw.githubusercontent.com/pwntable/career-repo/main/src/data/companies.json
- Full Text Markdown Index: https://pwntable.github.io/career-repo/llms-full.txt

## Featured Employer Categories
- Technology & Cloud
- Banking & Financial Services
- Energy, Oil & Gas
- FMCG & Consumer Goods
- Government & Statutory Bodies
- Fintech & Startups

## Company Directory Index (${companies.length} Portals)
`;

companies.forEach(c => {
  llmsText += `- [${c.name}](${c.career_url}): ${c.category} | ${c.company_type} | ${c.location} (ATS: ${c.ats_type})\n`;
});

fs.writeFileSync('public/llms.txt', llmsText);

// Generate full detailed llms-full.txt
let llmsFullText = `# CareeRepo Malaysia - Full Machine-Readable Directory

This file contains full structured text specs for all ${companies.length} verified corporate career portals in Malaysia, optimized for LLM context processing and AI Browser Subagents.

`;

companies.forEach((c, idx) => {
  llmsFullText += `### ${idx + 1}. ${c.name} (${c.company_type})
- **Category:** ${c.category}
- **Industry:** ${c.industry}
- **Location:** ${c.location}
- **ATS Platform:** ${c.ats_type}
- **Official Career Portal:** ${c.career_url}
- **Internship Portal:** ${c.internship_url || 'N/A'}
- **Graduate Trainee Portal:** ${c.graduate_url || 'N/A'}
- **Verified:** ${c.is_verified ? 'Yes' : 'No'}
- **Description:** ${c.description}

`;
});

fs.writeFileSync('public/llms-full.txt', llmsFullText);
console.log('Successfully generated public/llms.txt and public/llms-full.txt');
