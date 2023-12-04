import useSWR from "swr";

import EventList from "@/components/EventList";

export default function EventPage() {
  const { data: eventsData, error, mutate } = useSWR("/api/events");

  async function handleSubmit(formData) {
    const response = await fetch("/api/events", {
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
  if (!eventsData || !Array.isArray(eventsData))
    return <div>Loading Events...</div>;

  return (
    <>
      <EventList events={eventsData} />
    </>
  );
}
