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
  "Seeking Work CVs",
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
  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  // USA: ["California", "New York", "Texas"],
};

export const storeCatergories = [
  {
    iconImagePath: require("../assets/foodCatIcon.png"),
    categoryName: "Food",
  },
  {
    iconImagePath: require("../assets/electronicsIcon.png"),
    categoryName: "Electronics",
  },
  {
    iconImagePath: require("../assets/fashionCatIcon.png"),
    categoryName: "Fashion",
  },
  {
    iconImagePath: require("../assets/servicesCatIcon.png"),
    categoryName: "Services",
  },

  // Add more categories as needed
];

export const productCards = [
  { title: "High Quality T shirts" },
  { title: "Designer Jeans" },
  { title: "Luxury Watches" },
  // Add more products as needed
];
