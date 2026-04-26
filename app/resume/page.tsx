import Link from "next/link";

export const metadata = {
  title: "Resume - Kshitij Pritish Bharambe",
};

const Section = ({ title, num, children }: { title: string; num: string; children: React.ReactNode }) => (
  <section className="relative">
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[9px] text-[var(--accent)] tracking-[0.3em] uppercase">{num}</span>
      <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)]">{title}</h3>
      <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
    </div>
    {children}
  </section>
);

const EntryHeader = ({ title, sub, period }: { title: string; sub?: string; period?: string }) => (
  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
    <div>
      <h4 className="text-base font-bold text-white/90 leading-snug">{title}</h4>
      {sub && <p className="text-sm text-[var(--accent)] font-mono mt-0.5">{sub}</p>}
    </div>
    {period && (
      <span className="font-mono text-[11px] text-white/30 border border-white/[0.07] px-3 py-1 rounded-lg bg-white/[0.02] whitespace-nowrap">
        {period}
      </span>
    )}
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-1.5 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
        <span className="text-[var(--accent)] mt-1 flex-shrink-0 text-xs">&gt;</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 relative" style={{ background: "var(--bg)", color: "var(--foreground)" }}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="spotlight-card rounded-2xl p-8 mb-6">
          <div className="relative z-[1] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                Kshitij Pritish Bharambe
              </h1>
              <p className="text-sm font-mono text-[var(--accent)] tracking-wider mb-4">
                Backend Software Engineer | AI, Distributed Systems &amp; Cloud
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/40 font-mono">
                <a href="mailto:kshitij.b@mailmywork.com" className="hover:text-[var(--accent)] transition-colors">
                  kshitij.b@mailmywork.com
                </a>
                <span className="text-white/10">|</span>
                <span>+1 (315) 374-9649</span>
                <span className="text-white/10">|</span>
                <span>Princeton, NJ</span>
                <span className="text-white/10">|</span>
                <a href="https://www.linkedin.com/in/kshitijbharambe/" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors">LinkedIn</a>
                <span className="text-white/10">|</span>
                <a href="https://github.com/KshitijBharambe" target="_blank" rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors">GitHub</a>
                <span className="text-white/10">|</span>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">Portfolio</Link>
              </div>
            </div>
            <a href="/Resume.pdf" download="Kshitij_Bharambe_Resume.pdf" className="btn-primary shrink-0">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>

        <div className="spotlight-card rounded-2xl p-8 space-y-10">
          <div className="relative z-[1] space-y-10">
            <Section title="Summary" num="01">
              <p className="text-white/50 text-sm leading-relaxed">
                Backend-focused Software Engineer with 4+ years of experience designing and shipping distributed systems,
                cloud-native microservices, and production-grade AI integrations at high scale. Proven track record owning
                end-to-end features from architecture through deployment, reducing system latency by 40%, and driving
                measurable engineering impact across fintech and enterprise SaaS domains.
              </p>
            </Section>

            <Section title="Work Experience" num="02">
              <div className="space-y-7">
                <div>
                  <EntryHeader
                    title="Software Engineer II, QuickBooks Platform"
                    sub="Intuit - Mountain View, CA"
                    period="Jan 2025 - Present"
                  />
                  <BulletList items={[
                    "Architected a real-time financial data synchronization service in Python using Kafka event streams and Cassandra state persistence, reducing transaction-sync latency by 38% across 12 regional data centers.",
                    "Designed and deployed an agentic AI bookkeeping assistant integrating LangChain agents with internal MCP tooling, improving automated categorization accuracy by 14% for 3 high-volume SMB cohorts.",
                    "Built a GenAI-powered expense-forecasting microservice on AWS SageMaker with Lambda inference endpoints, cutting cold-start latency by 52% and reducing over-accrual events by 22%.",
                    "Migrated 6 legacy Python monoliths to FastAPI microservices on AWS EKS, eliminating 3 critical SLA breaches per quarter and reducing infrastructure spend by $180K/year.",
                    "Implemented distributed tracing with Jaeger and Prometheus across 18 downstream services, cutting MTTD by 45% and reducing on-call pages by 30%.",
                    "Authored an internal RFC for async-safe Kafka consumer patterns with idempotent processing, improving consumer throughput by 2.1x.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="Software Engineer II"
                    sub="Razorpay - Bengaluru, India"
                    period="Oct 2021 - Jul 2023"
                  />
                  <BulletList items={[
                    "Owned backend architecture for Smart Collect reconciliation using Python, FastAPI, PostgreSQL, event sourcing, and idempotent retry queues, processing 4M+ daily transactions with 99.97% uptime.",
                    "Delivered an end-to-end payment-routing ML pipeline with Python feature engineering jobs on Apache Spark and Flask prediction APIs, improving routing success rate by 9.2%.",
                    "Designed multi-cloud failover across AWS and GCP for critical payment APIs, achieving 30s RPO and 90s RTO across regional outage scenarios.",
                    "Built automated fraud-signal ingestion with AWS Kinesis and Redis caching, cutting fraud-check p99 latency from 320ms to 48ms and blocking 12K+ fraudulent transactions in 60 days.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="Associate Developer"
                    sub="Razorpay - Bengaluru, India"
                    period="Feb 2021 - Sep 2021"
                  />
                  <BulletList items={[
                    "Integrated Razorpay Payments API into 3 enterprise merchant onboarding flows using Node.js and MySQL, reducing integration time from 5 days to 18 hours per merchant.",
                    "Contributed to API contract testing tooling using Pact, reducing CI/CD regression failures by 41% across 7 microservices.",
                    "Revamped the merchant payout analytics dashboard with React and TypeScript, reducing support ticket volume by 28% and improving load time from 4.1s to 1.2s.",
                    "Promoted to Software Engineer II within 11 months after owning 3 production microservices and driving zero-downtime Kubernetes blue-green deployments.",
                  ]} />
                </div>
              </div>
            </Section>

            <Section title="Projects" num="03">
              <div className="space-y-7">
                <div>
                  <EntryHeader
                    title="AgentFlow: Multi-Agent Task Orchestration Framework"
                    sub="Python, LangChain, FastAPI, Redis, Docker"
                    period=""
                  />
                  <BulletList items={[
                    "Built a multi-agent orchestration system using LangChain with MCP tool integrations and FastAPI async APIs, load-tested to 50+ concurrent agent sessions with sub-200ms task dispatch latency.",
                    "Implemented dual-layer memory with Redis vector storage for in-session context and pgvector for durable cross-session memory, improving task completion accuracy by 31% over a stateless baseline.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="SmartPipe: Real-Time ML Data Pipeline"
                    sub="Python, Kafka, Spark Streaming, AWS S3, Airflow"
                    period=""
                  />
                  <BulletList items={[
                    "Designed a streaming ML pipeline ingesting 50K events/sec with Kafka and Spark Streaming, automating feature store refresh with Apache Airflow DAGs.",
                    "Benchmarked streaming architecture against an equivalent Airflow batch baseline, reducing data-to-model feedback from 6 hours to 22 minutes.",
                  ]} />
                </div>
                <div>
                  <EntryHeader
                    title="DistributedKV: Fault-Tolerant Key-Value Store"
                    sub="Python, Raft Consensus, gRPC, Docker"
                    period=""
                  />
                  <BulletList items={[
                    "Built a distributed key-value store implementing Raft leader election, log replication, snapshotting, and linearizable reads/writes across a 3-node cluster.",
                    "Designed a gRPC client with retries and leader redirects, validating correctness through 500+ Jepsen-style chaos test iterations.",
                  ]} />
                </div>
              </div>
            </Section>

            <Section title="Education" num="04">
              <div className="space-y-5">
                <div>
                  <EntryHeader
                    title="Master of Science, Computer Science"
                    sub="Syracuse University - Syracuse, NY"
                    period="Aug 2023 - May 2025"
                  />
                </div>
                <div>
                  <EntryHeader
                    title="Bachelor of Engineering, Computer Engineering"
                    sub="New Horizon Institute of Technology and Management - Thane, India"
                    period="Aug 2019 - May 2023"
                  />
                </div>
              </div>
            </Section>

            <Section title="Skills" num="05">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Languages", items: "Python, JavaScript/TypeScript, SQL, Bash" },
                  { label: "Backend & APIs", items: "FastAPI, Flask, Django, Node.js, REST, GraphQL, Microservices Architecture" },
                  { label: "AI/ML", items: "LangChain, MCP, LLM Integration, AWS SageMaker, Apache Spark, Feature Engineering, Agentic AI Systems" },
                  { label: "Cloud & DevOps", items: "AWS, GCP, Docker, Kubernetes, Terraform, GitHub Actions, CI/CD, Blue-Green Deployments" },
                  { label: "Data & Messaging", items: "Kafka, Spark Streaming, Airflow, PostgreSQL, MySQL, Cassandra, Redis, pgvector, MongoDB" },
                  { label: "Observability", items: "Prometheus, Grafana, Jaeger, Datadog, Distributed Tracing, Incident Response" },
                ].map((skill) => (
                  <div key={skill.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <h4 className="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2">{skill.label}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{skill.items}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Certifications" num="06">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span className="text-[var(--accent)] text-xs">&gt;</span>
                  AWS Certified Solutions Architect Associate
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
