// app/resume/page.tsx
import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Resume
        </h1>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Kshitij Pritish Bharambe</h2>
              <p className="text-gray-300 mt-1">
                Syracuse NY | +1 3153749649 | kbharamb@syr.edu
              </p>
            </div>
            <a
              href="/KshitijB_Resume.pdf"
              download="KshitijB_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 md:mt-0 rounded-md transition-colors flex items-center justify-center"
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
            {/* Education Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">
                    Master of Science in Computer Science
                  </h4>
                  <p className="text-gray-300">
                    Syracuse University - College of Engineering & Computer
                    Science, Syracuse, NY | August 2023 - Present
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Relevant Coursework: Intro to AI, DBMS, Operating Science,
                    DAA, IoT security, CA.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-medium">
                    Bachelors in Computer Engineering
                  </h4>
                  <p className="text-gray-300">
                    New Horizon Institute of Technology & Management - Thane,
                    India | August 2019 - May 2023
                  </p>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Experience
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium">Intern - DevOps Team</h4>
                  <p className="text-gray-300">
                    SEQURETEK Pvt. Ltd. - Andheri, IN | Jun 2024 - Aug 2024
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Engaged in Kubernetes-based deployments, contributing to
                      scaling 100+ containers to assure high availability and
                      optimal performance.
                    </li>
                    <li>
                      Designed and optimized CI/CD pipelines in Jenkins,
                      automating workflows and decreasing deployment time by
                      30%.
                    </li>
                    <li>
                      Automated 10+ recurring tasks using Bash scripting and
                      Python, streamlining operations and revising efficiency.
                    </li>
                    <li>
                      Implemented Infrastructure-as-Code with Terraform and
                      Ansible, achieving 95% consistency in cloud infrastructure
                      deployments.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Intern - VAPT Team</h4>
                  <p className="text-gray-300">
                    SEQURETEK Pvt. Ltd. - Andheri, IN | Jan 2022 - Dec 2022
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Conducted vulnerability assessments and penetration
                      testing on 15+ web applications, mobile apps, and
                      networks.
                    </li>
                    <li>
                      Utilized Burp Suite, Kali Linux, Nmap, Acunetix,
                      Netsparker, and Nessus for manual and automated security
                      testing.
                    </li>
                    <li>
                      Managed incident response and containment of 5+ security
                      incidents, reducing impact.
                    </li>
                    <li>
                      Identified and reported 20+ vulnerabilities, including
                      XSS, SQL injection, and mis-configurations, ensuring
                      compliance with security best practices.
                    </li>
                    <li>
                      Created 15+ detailed security reports for senior
                      stakeholders, outlining risks and mitigation strategies.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Projects
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium">
                    AI-Powered Log Analyzer
                  </h4>
                  <p className="text-gray-300">Mar 2025 - Mar 2025</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Developed a real-time log analyzing system using Docker
                      Compose, Elasticsearch, Kibana, and Grafana, handling
                      1000+ logs/sec.
                    </li>
                    <li>
                      Built an anomaly detection service in Python, cutting down
                      manual log review time by 60% with computerized analysis.
                    </li>
                    <li>
                      Created Kibana & Grafana dashboards, enhancing incident
                      response efficiency for large-scale log data.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium">
                    InsightBot - The AI chatbot for university
                  </h4>
                  <p className="text-gray-300">Sep 2024 - Sep 2024</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Developed an AI chatbot using Python and Flask with
                      NLP-based query handling for real-time interactions.
                    </li>
                    <li>
                      Designed for scalability and integration with APIs to
                      improve functionality and ensure platform compatibility.
                    </li>
                    <li>
                      Optimized query processing by implementing advanced
                      algorithms and techniques to revise accuracy, reduce
                      response time, and ensure efficient handling of a wide
                      range of queries.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium">
                    Social Media Influencer Analysis for Business Marketing
                  </h4>
                  <p className="text-gray-300">Jan 2024 - Apr 2024</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Carried out a data-driven analysis of influencer marketing
                      strategies across TikTok, YouTube, and Instagram using
                      TensorFlow neural networks.
                    </li>
                    <li>
                      Assessed engagement metrics and discovered fake profiles,
                      enhancing efficiency of influencer collaborations for
                      business marketing.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                Certifications
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">
                    ISO/IEC 27001:2022 ISMS Lead Auditor
                  </h4>
                  <p className="text-gray-300">
                    BSI Training Academy | May 2024 - May 2024
                  </p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                      Gained expertise in analyzing and assessing organizational
                      security controls against international standards.
                    </li>
                    <li>
                      Qualified to lead ISMS audit teams and conduct independent
                      security compliance assessments.
                    </li>
                    <li>
                      Certificate ID: ENR-01510183 (Valid through May 2029).
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Development & Cloud</h4>
                  <p className="text-gray-400 text-sm">
                    Java, Python, JavaScript/TypeScript (React, Next.js),
                    Docker, Microservices, API Design
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">CI/CD & Automation</h4>
                  <p className="text-gray-400 text-sm">
                    GitHub Actions, Jenkins, Bash scripting, Terraform, Ansible
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data & Messaging</h4>
                  <p className="text-gray-400 text-sm">Kafka, Elasticsearch</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Monitoring & Security</h4>
                  <p className="text-gray-400 text-sm">
                    Prometheus, Grafana, Kibana, Web/Network Security (Burp
                    Suite, Kali Linux, Nmap, OWASP Top 10)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
