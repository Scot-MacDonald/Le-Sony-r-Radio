import { useRouter } from "next/router";
import useSWR from "swr";
import MixList from "../components/MixList";
import { useSelectedTrack } from "@/context/SelectedTrackContext";
import Featured from "@/components/Featured";

export default function HomePage() {
  const { data: mixesData, error, mutate } = useSWR("/api/mixes");
  const router = useRouter();
  const { selectedTrack, setSelectedTrack } = useSelectedTrack();

  async function handleSubmit(formData) {
    const response = await fetch("/api/mixes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate(); // Trigger re-fetch after a successful post
    }
  }

  const handleTagClick = (tag) => {
    console.log(`Tag clicked on Home page: ${tag}`);

    router.push(`/explore?tags=${tag}`, undefined, { shallow: true });
  };

  const handlePlayClick = (trackUrl) => {
    const isSameTrack = trackUrl === selectedTrack;

    setSelectedTrack(isSameTrack ? null : trackUrl);
  };

  if (error) return <div>Error loading mixes</div>;
  if (!mixesData || !Array.isArray(mixesData))
    return <div>Loading mixes...</div>;
  const mixListData = mixesData && mixesData.slice(4);
  return (
    <>
      <Featured mixes={mixesData && mixesData.slice(0, 4)} />
      <MixList
        mixes={mixListData}
        onTagClick={handleTagClick}
        onPlayClick={handlePlayClick}
      />
    </>
  );
}
