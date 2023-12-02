import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MixForm from "@/components/MixForm";
import styles from "@/styles/addMix.module.css";

export default function AddMixPage() {
  const { data: session } = useSession();
  const { mutate } = useSWR("/api/mixes");
  const router = useRouter();

  async function handleSubmit(formData) {
    if (!session) {
      // User is not logged in, redirect to the home page
      router.push("/");
      return;
    }

    const response = await fetch("/api/mixes", {
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

  // If user is not logged in, redirect to the home page
  if (!session) {
    // You can also display a message or additional content if needed
    router.push("/");
    return null; // This can be any content you want to display when redirecting
  }

  return (
    <>
      <MixForm onSubmit={handleSubmit} value="" />
    </>
  );
}
