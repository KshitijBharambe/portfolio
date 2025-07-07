// app/components/Server/Server-Side_HomePage.tsx
import ClientHomePage from "@/components/Client/ClientHomePage";
import projectsData from "@/public/assets/data/projects_data.json";

export default async function HomePage() {
  return (
    <>
      <ClientHomePage projects={projectsData.projects} />
    </>
  );
}
