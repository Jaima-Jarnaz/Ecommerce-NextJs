const IconList = [
  "search",
  "delete",
  "edit",
  "cross",
  "add-to-card",
  "call",
  "location",
  "profile",
] as const;

export type IconType = (typeof IconList)[number];
