// HomePage.js
import { useRouter } from "next/router";
import useSWR from "swr";
import MixForm from "../components/MixForm";
import MixList from "../components/MixList";
import Slider from "@/components/slider";
import Demo from "@/components/Demo";

export default function HomePage() {
  const { data: mixesData, error, mutate } = useSWR("/api/mixes");
  const router = useRouter();

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

  if (error) return <div>Error loading mixes</div>;
  if (!mixesData || !Array.isArray(mixesData))
    return <div>Loading mixes...</div>;

  return (
    <>
      <Slider />
      <MixList mixes={mixesData} onTagClick={handleTagClick} />
    </>
  );
}
