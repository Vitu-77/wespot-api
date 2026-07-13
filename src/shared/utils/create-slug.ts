import { remove as removeAccents } from "remove-accents";

export function createSlug(rawName: string | null) {
  return rawName
    ? removeAccents(rawName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "")
    : "";
}
