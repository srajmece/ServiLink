import { Provider } from "@/lib/types";

// Conceptual "match score" for the MVP prototype — a transparent, illustrative
// blend of skill fit, distance, availability, experience and rating. This is
// NOT a scientific ranking model, just a way to visually communicate how
// smart matching works.
export function computeMatchScore(provider: Provider, requiredSkills: string[]): number {
  const skillFit = requiredSkills.length
    ? requiredSkills.filter((s) => provider.skills.includes(s)).length / requiredSkills.length
    : 0.7;
  const distanceScore = Math.max(0, 1 - provider.distanceKm / 20);
  const availabilityScore = provider.availability === "available" ? 1 : provider.availability === "busy" ? 0.4 : 0;
  const experienceScore = Math.min(provider.yearsExperience / 15, 1);
  const ratingScore = provider.rating / 5;

  const weighted =
    skillFit * 0.35 + distanceScore * 0.2 + availabilityScore * 0.2 + experienceScore * 0.1 + ratingScore * 0.15;

  return Math.round(Math.min(weighted, 0.99) * 100);
}
