async function parseErrorMessage(response) {
  try {
    const data = await response.json();
    return data.error || `Erro ${response.status}`;
  } catch {
    return `Erro ${response.status}`;
  }
}

export async function fetchReviews() {
  const response = await fetch("/api/reviews");
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return response.json();
}

export async function createReview(reviewData) {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return response.json();
}
