export function getColorBasedOnRating(rating: number | null | undefined) {
  if (!rating) {
    return "";
  }

  let color = "border-red-600 bg-red-50";
  if (rating > 7) {
    color = "border-green-600 bg-green-50";
  } else if (rating > 5) {
    color = "border-yellow-600 bg-yellow-50";
  } else if (rating > 2) {
    color = "border-orange-600 bg-orange-50";
  }
  return color;
}

export function getMoodBasedOnRating(rating: number | null | undefined) {
  if (!rating) {
    return "";
  }

  let mood = "hated";
  if (rating> 7) {
    mood = "loved";
  } else if (rating > 5) {
    mood = "liked";
  } else if (rating> 2) {
    mood = "disliked";
  }
  return mood;
}