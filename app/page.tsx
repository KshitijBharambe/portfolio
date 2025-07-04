// app/page.tsx
import HomePage from "@/components/Server/Server-Side_HomePage";

// This is a Server Component that will fetch data from GitHub
export default async function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-600">
      <HomePage />
    </div>
  );
}
