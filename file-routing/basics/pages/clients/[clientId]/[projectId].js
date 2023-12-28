import { useRouter } from "next/router";

export default function ClientProjectPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>
        Client: {router.query.clientId} Project: {router.query.projectId} Page
      </h1>
    </div>
  );
}
