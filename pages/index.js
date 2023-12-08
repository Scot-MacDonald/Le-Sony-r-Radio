import { useRouter } from "next/router";
import useSWR from "swr";
import MixForm from "../components/MixForm";
import MixList from "../components/MixList";
import Slider from "@/components/slider";
import Demo from "@/components/Demo";
import { useSelectedTrack } from "@/context/SelectedTrackContext";
import ThemeSwitch from "@/components/ThemeSwitch";
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
    // Handle the tag click logic here
    console.log(`Tag clicked on Home page: ${tag}`);

    // Update the URL to the explore page with the selected tag
    router.push(`/explore?tags=${tag}`, undefined, { shallow: true });
  };

  const handlePlayClick = (trackUrl) => {
    const isSameTrack = trackUrl === selectedTrack;

    // If the clicked track is the same as the currently selected track, pause it
    setSelectedTrack(isSameTrack ? null : trackUrl);
  };

  if (error) return <div>Error loading mixes</div>;
  if (!mixesData || !Array.isArray(mixesData))
    return <div>Loading mixes...</div>;

  return (
    <>
      <Featured />

      <MixList
        mixes={mixesData}
        onTagClick={handleTagClick}
        onPlayClick={handlePlayClick}
      />
    </>
  );
}
