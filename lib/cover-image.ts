export function coverImage<T extends { kind?: string }>(images: T[]): T | undefined {
  return images.find((image) => image.kind !== "VIDEO");
}

export function firstVideoUrl(images: { url: string; kind?: string }[]): string | undefined {
  return images.find((image) => image.kind === "VIDEO")?.url;
}
