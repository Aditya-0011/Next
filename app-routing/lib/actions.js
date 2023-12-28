"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function invalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    invalidText(meal.title) ||
    invalidText(meal.summary) ||
    invalidText(meal.instructions) ||
    invalidText(meal.creator) ||
    invalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0 ||
    meal.image.name.split(".").pop() !== "jpeg" ||
    meal.image.name.split(".").pop() !== "png"
  ) {
    return {
      message: "Invalid Input.",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
