import { useRouter } from "next/router";

export default function ClientsProjectsPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Client {router.query.id} Page</h1>
    </div>
  );
}
