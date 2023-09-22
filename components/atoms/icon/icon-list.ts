const IconList = ["search", "delete", "edit", "cross", "add-to-card"] as const;

export type IconType = (typeof IconList)[number];
