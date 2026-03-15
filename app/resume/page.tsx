import Link from "next/link";

export const metadata = {
  title: "Resume — Kshitij Bharambe",
};

const Section = ({ title, num, children }: { title: string; num: string; children: React.ReactNode }) => (
  <section className="relative">
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[9px] text-[var(--accent)] tracking-[0.3em] uppercase">{num}</span>
      <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)]">{title}</h3>
      <div className="flex-1 h-px bg-white/5" />
    </div>
    {children}
  </section>
);

const EntryHeader = ({ title, sub, period }: { title: string; sub?: string; period: string }) => (
  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
    <div>
      <h4 className="text-base font-bold text-white/90 leading-snug">{title}</h4>
      {sub && <p className="text-sm text-[var(--accent)] font-mono mt-0.5">{sub}</p>}
    </div>
    <span className="font-mono text-[11px] text-white/30 border border-white/[0.07] px-3 py-1 rounded-lg bg-white/[0.02] whitespace-nowrap">
      {period}
    </span>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
        <span className="text-[var(--accent)] mt-1 flex-shrink-0 text-xs">›</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function ResumePage() {
  return (
    <div className="min-h-screen text-white pt-20 pb-16 px-4 relative">
      {/* Atmospheric orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)" }} />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header card */}
        <div className="spotlight-card rounded-2xl p-8 mb-6">
          <div className="relative z-[1] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                Kshitij Bharambe
              </h1>
              <p className="text-sm font-mono text-[var(--accent)] tracking-wider mb-4">
                Cloud Infrastructure Engineer · DevOps · AWS
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/40 font-mono">
                <a href="mailto:kshitij.bharambe@gmail.com" className="hover:text-[var(--accent)] transition-colors">
                  kshitij.bharambe@gmail.com
                </a>
                <span className="text-white/10">·</span>
                <span>315-374-9649</span>
                <span className="text-white/10">·</span>
                <span>Princeton, NJ</span>
                <span className="text-white/10">·</span>
                <a href="https://www.linkedin.com/in/kshitijbharambe/" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>
                <span className="text-white/10">·</span>
                <a href="https://github.com/KshitijBharambe" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors">GitHub</a>
                <span className="text-white/10">·</span>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">Portfolio</Link>
              </div>
            </div>
            <a href="/KshitijB_Resume.pdf" download="KshitijB_Resume.pdf" className="btn-primary shrink-0">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className="spotlight-card rounded-2xl p-8 space-y-10">
          <div className="relative z-[1] space-y-10">

            {/* Summary */}
            <Section title="Summary" num="01">
              <p className="text-white/50 text-sm leading-relaxed">
                Cloud-native Infrastructure Engineer with a Master&apos;s in Computer Science and deep expertise in
                AWS, Terraform, and DevSecOps. Proven track record of architecting resilient CI/CD pipelines,
                optimizing backend performance using FastAPI, and enforcing cost governance (FinOps). Specialist
                in infrastructure automation, container orchestration, and eliminating configuration drift for scalable systems.
              </p>
            </Section>

            {/* Education */}
            <Section title="Education" num="02">
              <div className="space-y-5">
                <div>
                  <EntryHeader
                    title="M.S. Computer Science"
                    sub="Syracuse University — Syracuse, NY"
                    period="Aug 2023 – May 2025"
                  />
                </div>
                <div>
                  <EntryHeader
                    title="B.E. Computer Engineering"
                    sub="University of Mumbai — Thane, India"
                    period="Aug 2019 – May 2023"
                  />
                </div>
              </div>
            </Section>

            {/* Experience */}
            <Section title="Work Experience" num="03">
              <div className="space-y-7">
                <div>
                  <EntryHeader
                    title="Cloud Deployment Engineer"
                    sub="Sequretek Pvt. Ltd. — Princeton, NJ"
                    period="Feb 2026 – Present"
                  />
                  <BulletList items={[
                    "Spearheading phased deployment of Percept EDR across complex multi-tenant Azure cloud infrastructure, serving as primary technical anchor for client integration.",
                    "Orchestrated secure network communication by configuring firewall rules and establishing IPsec tunnels between client Azure environments and centralized management servers.",
                    "Executed targeted staging and manual validation on 15+ servers, ensuring agent compatibility and system stability prior to scaling deployment.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="DevOps Intern"
                    sub="Sequretek Pvt. Ltd. — Andheri, India"
                    period="Jun 2024 – Aug 2024"
                  />
                  <BulletList items={[
                    "Provisioned scalable AWS environments (EC2, S3, IAM) via Terraform to support backend infrastructure for Percept XDR, reducing provisioning time by 30% through reusable modules.",
                    "Engineered automated build-and-deploy workflows in GitHub Actions for Percept XDR microservices, cutting release latency by 40% and eliminating manual intervention errors.",
                    "Slashed cloud infrastructure costs by 10% by enforcing strict resource tagging strategies and identifying idle instances for termination.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="Software & Cloud Engineer"
                    sub="Cognologix — Remote"
                    period="Jun 2022 – May 2023"
                  />
                  <BulletList items={[
                    "Optimized high-traffic REST APIs using FastAPI and PostgreSQL, improving data retrieval speeds by 30% for data-heavy client applications via query indexing.",
                    "Streamlined release cycles by architecting CI/CD pipelines in GitHub Actions, integrating automated unit testing and coverage reports.",
                    "Eliminated configuration drift across staging and production environments by containerizing legacy applications using Docker and orchestrating deployments on AWS.",
                  ]} />
                </div>
              </div>
            </Section>

            {/* Projects */}
            <Section title="Project Experience" num="04">
              <div className="space-y-7">
                <div>
                  <EntryHeader
                    title="Data Hygiene Toolkit — Cloud-Native Data Validation Platform"
                    period="Aug 2025 – Jan 2025"
                  />
                  <BulletList items={[
                    "Engineered a full-stack data hygiene platform using FastAPI, Next.js, and PostgreSQL, featuring 8 validator types, rule templates, and batch validation with memory-optimized chunking for datasets exceeding 1M rows.",
                    "Automated infrastructure provisioning and deployment through Terraform and GitHub Actions, achieving instant rollbacks, multi-environment parity, and unified MinIO/GCS storage management.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="Automated Infrastructure Provisioner — AWS Terraform + Ansible"
                    period="Feb 2025 – Apr 2025"
                  />
                  <BulletList items={[
                    "Built an Automated Infrastructure Framework (IaC) using Terraform and Ansible to provision secure AWS environments (VPC, EC2, networking), integrating server hardening and CloudWatch monitoring.",
                    "Established DevSecOps workflows with CI/CD integration and Makefile automation, designed to reduce setup effort by 60% through reusable templates and standardized tagging.",
                  ]} />
                </div>
              </div>
            </Section>

            {/* Skills */}
            <Section title="Skills" num="05">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Cloud & DevOps", items: "AWS (EC2, S3, IAM, Lambda, VPC), Terraform, Docker, Linux, GitHub Actions, CI/CD Pipelines" },
                  { label: "Infrastructure & Automation", items: "Ansible, Bash, PowerShell, Infrastructure-as-Code (IaC), Monitoring & Incident Response" },
                  { label: "Programming & Databases", items: "Python, FastAPI, REST APIs, PostgreSQL, MySQL" },
                  { label: "Monitoring & Observability", items: "AWS CloudWatch, Grafana, Log Management, Performance Metrics" },
                ].map((skill) => (
                  <div key={skill.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <h4 className="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2">{skill.label}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{skill.items}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Certifications */}
            <Section title="Certifications" num="06">
              <div className="space-y-2">
                {[
                  "AWS Certified Solutions Architect — Associate",
                  "ISO/IEC 27001:2022 Lead Auditor — BSI Training",
                ].map((cert) => (
                  <div key={cert} className="flex items-center gap-3 text-sm text-white/50">
                    <span className="text-[var(--accent)] text-xs">›</span>
                    {cert}
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
