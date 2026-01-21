// app/resume/page.tsx
import StarsCanvas from "@/components/Client/StarsBackground";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="min-h-screen text-white pt-20 px-4 relative">
      <StarsCanvas />
      <div className="max-w-4xl mx-auto py-12 relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Resume
        </h1>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Kshitij Pritish Bharambe</h2>
              <p className="text-gray-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>kshitij.bharambe@gmail.com</span>
                <span className="hidden sm:inline">•</span>
                <span>315-374-9649</span>
                <span className="hidden sm:inline">•</span>
                <span>Syracuse, NY</span>
                <span className="hidden sm:inline">•</span>
                <a
                  href="https://www.linkedin.com/in/kshitij-bharambe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  LinkedIn
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="https://github.com/kshitij-bharambe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                <span className="hidden sm:inline">•</span>
                <Link href="/" className="text-blue-400 hover:underline">
                  Portfolio
                </Link>
              </p>
            </div>
            <a
              href="/KshitijB_Resume.pdf"
              download="KshitijB_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 md:mt-0 rounded-md transition-colors flex items-center justify-center shrink-0"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </a>
          </div>

          <div className="space-y-8">
            {/* Summary Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Summary
              </h3>
              <p className="text-gray-300">
                Cloud-native engineer with a Master&apos;s in CS, specializing
                in AWS, Docker, and Terraform automation. Expert in building
                resilient CI/CD pipelines and eliminating configuration drift
                for scalable microservices. Combines strong backend expertise
                (Python) with security-first Infrastructure-as-Code management.
              </p>
            </section>

            {/* Education Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">
                      Master&apos;s in Computer Science
                    </h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      Aug 2023 – May 2025
                    </span>
                  </div>
                  <p className="text-gray-300">
                    Syracuse University - Syracuse, NY
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">
                      Bachelor&apos;s in Computer Engineering
                    </h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      Aug 2019 – May 2023
                    </span>
                  </div>
                  <p className="text-gray-300">
                    University of Mumbai - Thane, India
                  </p>
                </div>
              </div>
            </section>

            {/* Work Experience Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Work Experience
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">DevOps Intern</h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      June 2024 – Aug 2024
                    </span>
                  </div>
                  <p className="text-gray-300">
                    Sequretek Pvt. Ltd. - Andheri, India
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Designed and provisioned scalable AWS environments (EC2,
                      S3, IAM) using Terraform.
                    </li>
                    <li>
                      Developed reusable modules and enforced tagging strategies
                      that slashed infrastructure costs by 15% while ensuring
                      compliance.
                    </li>
                    <li>
                      Engineered automated build-and-deploy workflows in GitHub
                      Actions integrated with Docker and GitHub.
                    </li>
                    <li>
                      Successfully reduced release latency by 40% across 5+
                      microservices, eliminating manual intervention errors.
                    </li>
                    <li>
                      Led infrastructure security initiatives by analyzing VAPT
                      reports and implementing 15+ critical configuration
                      remediations, resulting in a 20% reduction in recurring
                      security vulnerabilities.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">
                      Backend & Cloud Engineer Team
                    </h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      June 2022 – May 2023
                    </span>
                  </div>
                  <p className="text-gray-300">
                    Cognologix Technologies Pvt. Ltd. - Remote
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Designed and optimized RESTful APIs with FastAPI and
                      PostgreSQL, implementing async endpoints, query
                      optimization, and pagination for 10+ high-traffic APIs,
                      improving responsiveness for data-heavy client
                      applications by 30%.
                    </li>
                    <li>
                      Streamlined build-test-deploy pipelines using GitHub
                      Actions, integrating automated unit testing, coverage
                      reports, and tagging workflows to improve traceability and
                      deployment consistency across environments.
                    </li>
                    <li>
                      Containerized application services using Docker and
                      orchestrated deployments on AWS (EC2, S3, Lambda) through
                      infrastructure as code templates, maintaining consistent
                      environments across stages and reducing configuration
                      drift.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Project Experience Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Project Experience
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">
                      Data Hygiene Toolkit - Cloud-Native Data Validation
                      Platform
                    </h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      Aug 2025 – Present
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Engineered a full-stack data hygiene platform using
                      FastAPI, Next.js, and PostgreSQL, featuring 8 validator
                      types, rule templates, and batch validation with
                      memory-optimized chunking for datasets exceeding 1M rows.
                    </li>
                    <li>
                      Automated infrastructure provisioning and deployment
                      through Terraform and GitHub Actions, achieving instant
                      rollbacks, multi-environment parity, and unified MinIO/GCS
                      storage management.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">
                      Automated Infrastructure Provisioner - AWS Terraform +
                      Ansible
                    </h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      Feb 2025 – April 2025
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Built an Automated Infrastructure Framework (IaC) using
                      Terraform and Ansible to provision secure AWS environments
                      (VPC, EC2, networking), integrating server hardening and
                      CloudWatch monitoring.
                    </li>
                    <li>
                      Established DevSecOps workflows with CI/CD integration and
                      Makefile automation, designed to reduce setup effort by
                      60% through reusable templates and standardized tagging.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium">
                      InsightBot – AI-Powered University Chatbot
                    </h4>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      Oct 2024 – Dec 2024
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Implemented a RAG system using OpenAI and ChromaDB for
                      personalized university recommendations. Leverages vector
                      embeddings to deliver contextual insights on job trends
                      and costs across 25+ states.
                    </li>
                    <li>
                      Developed a full-stack Streamlit application integrated
                      with external APIs (e.g., Open Weather) and data files,
                      featuring persistent memory and enables essential student
                      workflows, including application tracking and the instant
                      generation of DOCX checklists.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Cloud & DevOps</h4>
                  <p className="text-gray-400 text-sm">
                    AWS (EC2, S3, IAM, Lambda, VPC), Terraform, Docker, Linux,
                    GitHub Actions, CI/CD Pipelines
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    Infrastructure & Automation
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Ansible, Bash, PowerShell, Infrastructure-as-Code (IaC),
                    Monitoring & Incident Response
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Programming & Databases</h4>
                  <p className="text-gray-400 text-sm">
                    Python, FastAPI, REST APIs, PostgreSQL, MySQL
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    Monitoring & Observability
                  </h4>
                  <p className="text-gray-400 text-sm">
                    AWS CloudWatch, Grafana, Log Management, Performance Metrics
                  </p>
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Certifications
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>• AWS Certified Solutions Architect - Associate.</p>
                <p>• ISO/IEC 27001:2022 Lead Auditor - BSI Training.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
