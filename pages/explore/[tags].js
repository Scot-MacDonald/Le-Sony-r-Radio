import { useRouter } from "next/router";
import useSWR from "swr";
import MixList from "@/components/MixList"; // Update the path based on your project structure

export default function ExploreTags() {
  const router = useRouter();
  const { tags } = router.query;

  // Check if tags are not available
  if (!tags) {
    return <div>No tags selected</div>;
  }

  // Fetch mixes with the specific tag
  const { data, error } = useSWR(`/api/mixes?tags=${tags}`, fetcher);

  if (error) return <div>Error loading mixes</div>;
  if (!data) return <div>Loading mixes...</div>;

  return (
    <div>
      <h2>Mixes with Tag: {tags}</h2>
      <MixList mixes={data} />
    </div>
  );
}

// Define the fetcher function (use it if you don't have it already)
const fetcher = (url) => fetch(url).then((res) => res.json());
