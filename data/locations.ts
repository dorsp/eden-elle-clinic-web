export type Branch = {
  slug: string;
  name: string;
  label: string;
  address: string;
  shortAddress: string;
  hours: string;
  mapUrl: string;
  imageAlt: string;
};

export const branches: Branch[] = [
  {
    slug: "iloilo",
    name: "Iloilo",
    label: "Flagship Clinic",
    address: "Iloilo City, Western Visayas",
    shortAddress: "Iloilo City · Western Visayas",
    hours: "Mon-Sun · 10:00-20:00",
    mapUrl: "https://maps.google.com/?q=Iloilo%20City%20Western%20Visayas",
    imageAlt: "Iloilo clinic landscape placeholder"
  },
  {
    slug: "boracay",
    name: "Boracay",
    label: "Exclusive Branch",
    address: "D'Mall, Station 2, Boracay Island",
    shortAddress: "D'Mall, Station 2 · Boracay",
    hours: "Mon-Sun · 10:00-22:00",
    mapUrl: "https://maps.google.com/?q=D%27Mall%20Station%202%20Boracay",
    imageAlt: "Boracay clinic landscape placeholder"
  }
];
