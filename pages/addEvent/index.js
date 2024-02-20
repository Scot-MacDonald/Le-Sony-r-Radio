import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EventForm from "@/components/EventForm";
import styles from "@/styles/addMix.module.css";

export default function AddEventPage() {
  const { data: session } = useSession();
  const { mutate } = useSWR("/api/events");
  const router = useRouter();

  async function handleSubmit(formData) {
    if (!session) {
      // User is not logged in, redirect to the home page
      router.push("/");
      return;
    }

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate();
    }
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <>
      <EventForm onSubmit={handleSubmit} value="" />
    </>
  );
}
