import { useRouter } from "next/router";

export default function ProjectPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Project {router.query.id} Page</h1>
    </div>
  );
}
