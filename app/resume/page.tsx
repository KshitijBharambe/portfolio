// app/resume/page.tsx
import Link from 'next/link';
import StarsCanvas from '@/components/Client/StarsBackground';

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
              <h2 className="text-2xl font-bold">Kshitij Bharambe</h2>
              <p className="text-gray-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>kshitij.bharambe@gmail.com</span>
                <span className="hidden sm:inline">•</span>
                <span>315-374-9649</span>
                <span className="hidden sm:inline">•</span>
                <span>Syracuse, NY</span>
                <span className="hidden sm:inline">•</span>
                <a href="https://www.linkedin.com/in/kshitij-bharambe" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
                <span className="hidden sm:inline">•</span>
                <a href="https://github.com/kshitij-bharambe" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a>
                <span className="hidden sm:inline">•</span>
                <a href="/" className="text-blue-400 hover:underline">Portfolio</a>
              </p>
            </div>
            <a
              href="/KshitijB_Resume.pdf"
              download="KshitijB_Resume.pdf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 md:mt-0 rounded-md transition-colors flex items-center justify-center shrink-0"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>

          <div className="space-y-8">
            {/* Education Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">Masters in Computational & Informational Sciences</h4>
                  <p className="text-gray-300">Syracuse University - Syracuse, NY | August 2023 – May 2025</p>
                  <p className="text-gray-400 text-sm mt-1">Relevant Coursework: Data Mining, AI, Operating Systems, DBMS, Algorithms, IoT Security, Intro to Data Science, Natural Language Processing.</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Bachelors in Computer Engineering</h4>
                  <p className="text-gray-300">New Horizon Institute of Technology & Management - Thane, India | August 2019 – May 2023</p>
                </div>
              </div>
            </section>

            {/* Work Experience Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Work Experience</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium">Software Engineer Team Intern</h4>
                  <p className="text-gray-300">Cognologix Technologies Pvt. Ltd. - Remote | June 2022 - May 2023</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>Contributed to backend development using Python and FastAPI; integrated over 10 secure REST APIs.</li>
                    <li>Collaborated on CI workflow automation via GitHub Actions for streamlined deployment and testing.</li>
                    <li>Assisted in AWS provisioning and monitoring (EC2, S3, Lambda, IAM), supporting tagging to reduce costs.</li>
                    <li>Participated in PostgreSQL query tuning, improving performance by ~30% on data-heavy endpoints.</li>
                    <li>Participated in sprint planning and code reviews to ensure delivery of scalable backend components.</li>
                    <li>Supported documentation of API endpoints and deployment workflows to improve team onboarding.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Vulnerability & Penetration Testing Team Intern</h4>
                  <p className="text-gray-300">Sequretek Pvt. Ltd. - Andheri, India | June 2024 - August 2024</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>Conducted vulnerability assessments across 15+ applications using Burp Suite and Kali Linux.</li>
                    <li>Identified and documented 20+ vulnerabilities (XSS, SQLi, misconfigurations) with mitigation steps.</li>
                    <li>Supported ISO 27001-aligned infrastructure audits and revalidation scans for compliance tracking.</li>
                    <li>Collaborated with team to improve backend and network security posture.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Project Experience Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Project Experience</h3>
              <div className="space-y-6">
                 <div>
                  <h4 className="text-lg font-medium">Data Hygiene Toolkit (In Progress)</h4>
                  <p className="text-gray-300">Independent Projects - Syracuse, NY | May 2025 - Present</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>Building a modular data hygiene tool in FastAPI and PostgreSQL with 30+ validation and standardization rules.</li>
                    <li>Designing Angular frontend with editable grid to improve efficiency of data validation and correction workflows.</li>
                    <li>Integrating Power BI dashboards for rule-wise metrics, anomaly tracking, and export support (CSV, Excel, JSON).</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium">InsightBot – AI-Powered University Chatbot</h4>
                  <p className="text-gray-300">Independent Projects - Syracuse, NY | September 2022 - December 2022</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>Built a Streamlit-based chatbot to help international students explore universities by budget, weather, and field.</li>
                    <li>Used OpenAI API + ChromaDB to provide personalized, context-aware recommendations.</li>
                    <li>Integrated OpenWeather API + cost/job data across 25+ states for decision support.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Dynamic Portfolio Website</h4>
                  <p className="text-gray-300">Independent Projects - Syracuse, NY | August 2024 - December 2024</p>
                  <ul className="list-disc list-inside text-gray-400 text-sm mt-2 space-y-1">
                    <li>Built responsive portfolio with Next.js, Tailwind CSS, and Framer Motion.</li>
                    <li>Integrated server-side rendering and secure contact form using Resend API.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <p className="text-gray-400 text-sm">Python, Bash, TypeScript (basic)</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cloud & DevOps</h4>
                  <p className="text-gray-400 text-sm">AWS (EC2, S3, IAM, CloudWatch), Git, Docker, GitHub Actions, Linux</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">APIs & Backend</h4>
                  <p className="text-gray-400 text-sm">FastAPI, REST, PostgreSQL, MySQL</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Frontend (Personal Use)</h4>
                  <p className="text-gray-400 text-sm">React, Next.js, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Security & Compliance</h4>
                  <p className="text-gray-400 text-sm">Burp Suite, Nessus</p>
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Certifications</h3>
              <div className="space-y-2 text-gray-300">
                  <p>• ISO/IEC 27001:2022 Lead Auditor – BSI Training (Valid till May 2029).</p>
                  <p>• AWS Solutions Architect – Associate (In Progress).</p>
                  <p>• AWS Certified Cloud Practitioner – Udemy.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
