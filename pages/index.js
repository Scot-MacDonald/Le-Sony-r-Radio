import useSWR from "swr";

import MixForm from "../components/MixForm";
import MixList from "../components/MixList";
import Slider from "@/components/slider";
import Demo from "@/components/Demo";

export default function HomePage() {
  const { data: mixesData, error, mutate } = useSWR("/api/mixes");

  async function handleSubmit(formData) {
    const response = await fetch("/api/mixes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate(); // Trigger re-fetch after successful post
    }
  }

  if (error) return <div>Error loading mixes</div>;
  if (!mixesData || !Array.isArray(mixesData))
    return <div>Loading mixes...</div>;

  return (
    <>
      <Slider />
      <MixList mixes={mixesData} />
    </>
  );
}
