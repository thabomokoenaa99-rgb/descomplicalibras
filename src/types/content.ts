export type PlanId = "basic" | "complete";

export type BonusItem = {
  id: string;
  title: string;
  text: string;
  image: string;
  originalPrice: number;
};

export type FaqItem = {
  q: string;
  a: string;
};
