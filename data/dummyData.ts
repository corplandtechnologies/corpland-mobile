import { RegionsByCountry } from "../utils/interfaces";

export const categories = [
  "Agriculture & Food",
  "Babies & Kids",
  "Commercial Equipment & Tools",
  "Electronics",
  "Fashion",
  "Health & Beauty",
  "Home, Furniture & Appliances",
  "Jobs",
  "Services",
  "Mobile Phones & Tablets",
  "Pets",
  "Property",
  "Repair & Construction",
  "Services",
  "Sports, Arts & Outdoors",
  "Vehicles",
];
export const regionsByCountry: RegionsByCountry = {
  Ghana: [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Central",
    "Eastern",
    "Northern",
    "Upper East",
    "Upper West",
    "Volta",
    "Oti",
    "Bono East",
    "Bono West",
    "Ahafo",
    "Bono East",
    "Bono West",
    "Ahafo",
  ],
  // India: [
  //   "Andhra Pradesh",
  //   "Arunachal Pradesh",
  //   "Assam",
  //   "Bihar",
  //   "Chhattisgarh",
  //   "Goa",
  //   "Gujarat",
  //   "Haryana",
  //   "Himachal Pradesh",
  //   "Jharkhand",
  //   "Karnataka",
  //   "Kerala",
  //   "Madhya Pradesh",
  //   "Maharashtra",
  //   "Manipur",
  //   "Meghalaya",
  //   "Mizoram",
  //   "Nagaland",
  //   "Odisha",
  //   "Punjab",
  //   "Rajasthan",
  //   "Sikkim",
  //   "Tamil Nadu",
  //   "Telangana",
  //   "Tripura",
  //   "Uttar Pradesh",
  //   "Uttarakhand",
  //   "West Bengal",
  // ],
  // USA: ["California", "New York", "Texas"],
};

export const storeCatergories = [
  {
    iconImagePath: require("../assets/foodCatIcon.png"),
    category: "Food",
  },
  {
    iconImagePath: require("../assets/electronicsIcon.png"),
    category: "Electronics",
  },
  {
    iconImagePath: require("../assets/fashionCatIcon.png"),
    category: "Fashion",
  },
  {
    iconImagePath: require("../assets/servicesCatIcon.png"),
    category: "Services",
  },
  {
    iconImagePath: require("../assets/toycar.png"),
    category: "Babies & Kids",
  },
  {
    iconImagePath: require("../assets/tools.png"),
    category: "Commercial Equipment & Tools",
  },
  {
    iconImagePath: require("../assets/health.png"),
    category: "Health & Beauty",
  },
  {
    iconImagePath: require("../assets/phone.png"),
    category: "Mobile Phones & Tablets",
  },
  {
    iconImagePath: require("../assets/pet.png"),
    category: "Pets",
  },
  {
    iconImagePath: require("../assets/lease.png"),
    category: "Property",
  },
  {
    iconImagePath: require("../assets/construction.png"),
    category: "Repair & Construction",
  },
  {
    iconImagePath: require("../assets/job.png"),
    category: "Jobs",
  },
  {
    iconImagePath: require("../assets/sports.png"),
    category: "Sports, Arts & Outdoors",
  },
  {
    iconImagePath: require("../assets/vehicle.png"),
    category: "Vehicles",
  },
  // Add more categories as needed
];

export const productCards = [
  { title: "High Quality T shirts" },
  { title: "Designer Jeans" },
  { title: "Luxury Watches" },
  // Add more products as needed
];
