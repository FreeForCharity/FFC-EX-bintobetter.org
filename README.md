# Bin to Better

Bin to Better is a student-led nonprofit dedicated to waste reduction and environmental sustainability. This repository is the Next.js application behind [bintobetter.org](https://bintobetter.org), the organization's primary website.

## About this repository

**Free For Charity (FFC) is Bin to Better's digital infrastructure partner.** FFC
provides and maintains this website, its hosting, its domain, and the automation
around them, at no cost to the charity.

**FFC is not Bin to Better's fiscal sponsor** and should never be described as
one. FFC is separately a 501(c)(3) with its own EIN — that is FFC's own identity
and says nothing about who receives Bin to Better's donations. Donations are
processed through **PledgeIt**, whose checkout may name a different entity as
fiscal sponsor or payment recipient, so this site deliberately asserts no
sponsoring organization or tax identification anywhere. See
[/terms-of-service](https://bintobetter.org/terms-of-service/), which defers to
PledgeIt's own checkout and receipt language.

This repository was generated from the FFC website template. Documentation that
still describes "the Free For Charity website" is a leftover, not a statement
about this site.

Contributors and AI agents should read **[AGENTS.md](./AGENTS.md)** before making
changes — it documents the structural and compliance contracts this repository
has to keep.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/), static export
- **Testing**: [Vitest](https://vitest.dev/) + Testing Library
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (successor to Framer Motion)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Production URL**: [https://bintobetter.org](https://bintobetter.org)
- **Hosting**: GitHub Pages
- **Deployment Strategy**: Static Export (`output: 'export'`)

### GitHub Pages Configuration

For developers replicating this setup:
1. Ensure `next.config.ts` has `output: "export"`.
2. Subdirectory deployments are handled by Next's own `basePath`, set from
   `NEXT_PUBLIC_BASE_PATH`. Leave it unset for an apex domain; set it to
   `/<repo>` for a project page. (This replaced a hand-rolled `assetPath`
   helper, which no longer exists.)
3. The `.github/workflows/deploy.yml` handles the build and deployment process.

## CNCF-Compliant Open Source Project

This repository follows **Cloud Native Computing Foundation (CNCF)** standards for governance, security, and community practices. We are committed to transparency, inclusive participation, and professional project management.

### Project Governance and Policies

- 📜 **[LICENSE](./LICENSE)** - Apache 2.0 open source license
- 🤝 **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community standards (Contributor Covenant 2.1)
- ⚖️ **[GOVERNANCE.md](./GOVERNANCE.md)** - Decision-making processes
- 👥 **[MAINTAINERS.md](./MAINTAINERS.md)** - Repository maintainers and their roles
- 🎉 **[CONTRIBUTORS.md](./CONTRIBUTORS.md)** - Recognition of all contributors
- 🔒 **[SECURITY.md](./SECURITY.md)** - Vulnerability reporting and security practices
- 🛡️ **[THREAT-MODEL.md](./THREAT-MODEL.md)** - Security threat analysis
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- 🤖 **[AGENTS.md](./AGENTS.md)** - Structural and compliance contracts (read before changing anything)
- 💬 **[SUPPORT.md](./SUPPORT.md)** - How to get help
- 🔗 **[EXTERNAL_DEPENDENCIES.md](./EXTERNAL_DEPENDENCIES.md)** - Third-party services
- 📖 **[CITATION.cff](./CITATION.cff)** - Citation information for academic use
- 📝 **[CHANGELOG.md](./CHANGELOG.md)** - Release notes and version history

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:
- Code of Conduct
- How to submit issues
- How to submit pull requests
- Coding standards

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.

## Historical Context

This repository was originally a static HTML website and was migrated to a modern Next.js 16 application in February 2026 to improve maintainability, performance, and developer experience.
