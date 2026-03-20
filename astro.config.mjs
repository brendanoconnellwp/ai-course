// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'AI Power User Course',
			description: 'Learn to use Claude Code, MCP, Skills, Cloudflare, and AI-powered dev workflows.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/brendanoconnellwp/ai-course' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: '00-getting-started' },
				},
				{
					label: 'Claude Code Fundamentals',
					autogenerate: { directory: '01-claude-code-fundamentals' },
				},
				{
					label: 'Skills & Extensibility',
					autogenerate: { directory: '02-skills-and-extensibility' },
				},
				{
					label: 'MCP Servers',
					autogenerate: { directory: '03-mcp-servers' },
				},
				{
					label: 'Dev Workflows',
					autogenerate: { directory: '04-dev-workflows' },
				},
				{
					label: 'Cloudflare Stack',
					autogenerate: { directory: '05-cloudflare-stack' },
				},
				{
					label: 'Automation Flows',
					autogenerate: { directory: '06-automation-flows' },
				},
				{
					label: 'Projects',
					autogenerate: { directory: '07-projects' },
				},
			],
		}),
	],
});
