import HomePage from "@/components/home-page";
import projectsData from "@/public/assets/data/projects_data.json";

export default function Home() {
  return <HomePage projects={projectsData.projects} />;
}
