// pages/tags/[tag].js
import useSWR from "swr";
import EventList from "@/components/EventList";

// tags/[tag].js
import { useRouter } from "next/router";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;

  console.log("Tag:", tag);

  const { data, error } = useSWR(`/api/events?tag=${tag}`);

  if (error) {
    return <div>Error loading mixes</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <EventList mixes={data} />;
}
