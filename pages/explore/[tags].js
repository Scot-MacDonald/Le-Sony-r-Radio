import { useRouter } from "next/router";
import useSWR from "swr";
import MixList from "@/components/MixList"; // Update the path based on your project structure

export default function ExploreTags() {
  return (
    <div>
      <h2>Events</h2>
    </div>
  );
}

// Define the fetcher function (use it if you don't have it already)
const fetcher = (url) => fetch(url).then((res) => res.json());
