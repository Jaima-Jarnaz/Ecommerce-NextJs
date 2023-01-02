const IconList = ["search", "delete", "edit", "cross"] as const;

export type IconType = typeof IconList[number];
