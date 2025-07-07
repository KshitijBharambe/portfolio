// app/page.tsx
import HomePage from "@/components/Server/Server-Side_HomePage";

// This is a Server Component that will fetch data from GitHub
export default async function Home() {
  return <HomePage />;
}
