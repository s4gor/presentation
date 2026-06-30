/** Slide speaker assignments — balanced across Team 14 (4 solo slides each). */
export const SLIDE_SPEAKERS: Record<number, string> = {
  1: "Emran",
  2: "Wasay",
  3: "Arshi",
  4: "Ashik",
  5: "Wasay",
  6: "Arshi",
  7: "Ashik",
  8: "Ashik",
  9: "Özlem",
  10: "Özlem",
  11: "Özlem",
  12: "Emran",
  13: "Arshi",
  14: "Ashik",
  15: "Özlem",
  16: "Wasay",
  17: "Wasay",
  18: "Emran",
  19: "Emran",
};

export function speakerForSlide(index: number): string | undefined {
  return SLIDE_SPEAKERS[index];
}
