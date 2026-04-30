export type Doctor = {
  id: string;
  name: string;
  specialty: string; // slug
  specialtyName: string;
  experience: number;
  rating: number;
  reviews: number;
  bio: string;
  image: string;
  available: string;
};

export const doctors: Doctor[] = [
  {
    id: "shikha-verma",
    name: "د. شيخة فيرما",
    specialty: "dermatology",
    specialtyName: "الجلدية",
    experience: 15,
    rating: 4.9,
    reviews: 320,
    bio: "أخصائية في علاج الأمراض الجلدية والتجميل، خبرة واسعة في علاج حب الشباب وتساقط الشعر.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop",
    available: "متاحة اليوم 9:00 صباحاً",
  },
  {
    id: "ahmed-alharbi",
    name: "د. أحمد الحربي",
    specialty: "general",
    specialtyName: "طب عام",
    experience: 12,
    rating: 4.8,
    reviews: 450,
    bio: "طبيب عام بخبرة طويلة في تشخيص وعلاج الأمراض المزمنة والشائعة.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop",
    available: "متاح غداً 10:30 صباحاً",
  },
  {
    id: "sara-alqahtani",
    name: "د. سارة القحطاني",
    specialty: "pediatrics",
    specialtyName: "طب الأطفال",
    experience: 10,
    rating: 4.9,
    reviews: 280,
    bio: "استشارية أطفال وحديثي الولادة، متخصصة في تطوير الطفل والتغذية.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80&auto=format&fit=crop",
    available: "متاحة اليوم 2:00 ظهراً",
  },
  {
    id: "khalid-alotaibi",
    name: "د. خالد العتيبي",
    specialty: "cardiology",
    specialtyName: "القلب",
    experience: 18,
    rating: 4.9,
    reviews: 510,
    bio: "استشاري أمراض القلب والقسطرة، متابعة شاملة لصحة القلب والشرايين.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80&auto=format&fit=crop",
    available: "متاح غداً 11:00 صباحاً",
  },
  {
    id: "noura-alshehri",
    name: "د. نورة الشهري",
    specialty: "psychiatry",
    specialtyName: "الطب النفسي",
    experience: 9,
    rating: 4.8,
    reviews: 195,
    bio: "أخصائية الطب النفسي، خبرة في علاج القلق والاكتئاب واضطرابات النوم.",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&q=80&auto=format&fit=crop",
    available: "متاحة اليوم 6:00 مساءً",
  },
  {
    id: "majed-aldosari",
    name: "د. ماجد الدوسري",
    specialty: "neurology",
    specialtyName: "الأعصاب",
    experience: 14,
    rating: 4.7,
    reviews: 230,
    bio: "استشاري الأعصاب، متخصص في الصداع المزمن والصرع والسكتات.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80&auto=format&fit=crop",
    available: "متاح بعد غد 9:00 صباحاً",
  },
  {
    id: "lama-alzahrani",
    name: "د. لمى الزهراني",
    specialty: "family",
    specialtyName: "طب الأسرة",
    experience: 8,
    rating: 4.8,
    reviews: 175,
    bio: "طبيبة أسرة متخصصة في الرعاية الوقائية والمتابعة الدورية لكل أفراد الأسرة.",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&q=80&auto=format&fit=crop",
    available: "متاحة اليوم 4:30 عصراً",
  },
  {
    id: "faisal-alharthi",
    name: "د. فيصل الحارثي",
    specialty: "dental",
    specialtyName: "الأسنان",
    experience: 11,
    rating: 4.9,
    reviews: 340,
    bio: "أخصائي طب وتقويم الأسنان، خبرة في زراعة الأسنان وتجميل الابتسامة.",
    image: "https://images.unsplash.com/photo-1640876493571-6f93a410f3a4?w=400&q=80&auto=format&fit=crop",
    available: "متاح غداً 1:00 ظهراً",
  },
];

export const getDoctorsBySpecialty = (slug: string) =>
  doctors.filter((d) => d.specialty === slug);

export const getDoctorById = (id: string) => doctors.find((d) => d.id === id);
