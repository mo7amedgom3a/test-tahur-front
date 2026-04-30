export type Specialty = {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  accent: "primary" | "mint" | "coral" | "deep";
};

export const specialties: Specialty[] = [
  { slug: "general", name: "طب عام", description: "استشارات صحية شاملة", icon: "Stethoscope", accent: "primary" },
  { slug: "family", name: "طب الأسرة", description: "رعاية كل أفراد الأسرة", icon: "Users", accent: "mint" },
  { slug: "psychiatry", name: "الطب النفسي", description: "دعم نفسي متخصص", icon: "Brain", accent: "coral" },
  { slug: "pediatrics", name: "طب الأطفال", description: "رعاية متكاملة للأطفال", icon: "Baby", accent: "primary" },
  { slug: "dermatology", name: "الجلدية", description: "علاج البشرة والشعر", icon: "Sparkles", accent: "deep" },
  { slug: "cardiology", name: "القلب", description: "صحة القلب والأوعية", icon: "Heart", accent: "coral" },
  { slug: "neurology", name: "الأعصاب", description: "اضطرابات الجهاز العصبي", icon: "Activity", accent: "mint" },
  { slug: "dental", name: "الأسنان", description: "صحة الفم والأسنان", icon: "Smile", accent: "deep" },
];
