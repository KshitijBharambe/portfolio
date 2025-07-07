// app/components/Server/Server-Side_ProjectSection.tsx
import ClientProjectsSection from "@/components/Client/ClientProjectSection";
import projects from "@/public/assets/data/projects_data.json";

export default async function ProjectsSection() {
  return <ClientProjectsSection projects={projects.projects} />;
}
