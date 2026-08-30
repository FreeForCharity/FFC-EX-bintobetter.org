# Bin to Better

Bin to Better is a nonprofit organization dedicated to waste reduction and environmental sustainability. This project is a Next.js 16 application that serves as the organization's primary website.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

- **Production URL**: [https://FreeForCharity.github.io/FFC-EX-bintobetter.org/](https://FreeForCharity.github.io/FFC-EX-bintobetter.org/)
- **Hosting**: GitHub Pages
- **Deployment Strategy**: Static Export (`output: 'export'`)

### GitHub Pages Configuration

For developers replicating this setup:
1. Ensure `next.config.ts` has `output: "export"`.
2. Assets use the `assetPath` helper to handle the GitHub Pages subdirectory.
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
- 🌟 **[ADOPTERS.md](./ADOPTERS.md)** - Organizations using this template
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
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
