import { ServiceCategory } from "@/lib/types";

// Demo taxonomy. Customer-facing labels stay plain-language; problems map to
// the technical skills providers are matched on under the hood.
export const categories: ServiceCategory[] = [
  {
    id: "home",
    name: "Home Services",
    icon: "Home",
    emoji: "🏠",
    description: "General home repairs, carpentry, painting & cleaning",
    featured: true,
    subcategories: [
      {
        id: "home-general",
        categoryId: "home",
        name: "General Home Repair",
        problems: [
          { id: "carpentry", label: "Carpentry / furniture repair", requiredSkills: ["Carpentry"] },
          { id: "painting", label: "Painting & wall repair", requiredSkills: ["Painting"] },
          { id: "cleaning", label: "Deep cleaning", requiredSkills: ["Home Cleaning"] },
          { id: "home-other", label: "Something else", requiredSkills: [] },
        ],
      },
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "Zap",
    emoji: "⚡",
    description: "Wiring, switches, fans, panels & power issues",
    featured: true,
    subcategories: [
      {
        id: "elec-domestic",
        categoryId: "electrical",
        name: "Domestic Electrical",
        problems: [
          { id: "power-failure", label: "Power failure", requiredSkills: ["Domestic Electrical", "Diagnostics"] },
          { id: "wiring", label: "Wiring issue", requiredSkills: ["Domestic Electrical", "Wiring"] },
          { id: "switch-socket", label: "Switch / socket repair", requiredSkills: ["Domestic Electrical"] },
          { id: "fan-install", label: "Fan installation", requiredSkills: ["Domestic Electrical"] },
          { id: "motor-issue", label: "Motor issue", requiredSkills: ["Industrial Electrical", "Diagnostics"] },
          { id: "panel-issue", label: "Control panel issue", requiredSkills: ["Industrial Electrical", "Control Panels"] },
          { id: "elec-other", label: "Something else", requiredSkills: ["Domestic Electrical"] },
        ],
      },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "Droplets",
    emoji: "🚿",
    description: "Leaks, pipe fitting, bathroom fittings & tank cleaning",
    featured: true,
    subcategories: [
      {
        id: "plumb-general",
        categoryId: "plumbing",
        name: "General Plumbing",
        problems: [
          { id: "leak", label: "Leaking pipe / tap", requiredSkills: ["Pipe Fitting"] },
          { id: "blockage", label: "Blocked drain", requiredSkills: ["Drainage"] },
          { id: "fitting-install", label: "Fitting installation", requiredSkills: ["Pipe Fitting"] },
          { id: "tank-clean", label: "Water tank cleaning", requiredSkills: ["Tank Cleaning"] },
          { id: "plumb-other", label: "Something else", requiredSkills: ["Pipe Fitting"] },
        ],
      },
    ],
  },
  {
    id: "ac-hvac",
    name: "AC & HVAC",
    icon: "Snowflake",
    emoji: "❄️",
    description: "AC service, gas refill, installation & HVAC maintenance",
    featured: true,
    subcategories: [
      {
        id: "ac-general",
        categoryId: "ac-hvac",
        name: "AC & HVAC",
        problems: [
          { id: "ac-not-cooling", label: "AC not cooling", requiredSkills: ["AC Repair", "Refrigerant Handling"] },
          { id: "ac-service", label: "General service / cleaning", requiredSkills: ["AC Repair"] },
          { id: "ac-install", label: "New AC installation", requiredSkills: ["AC Installation"] },
          { id: "hvac-industrial", label: "Industrial HVAC maintenance", requiredSkills: ["HVAC Systems"] },
          { id: "ac-other", label: "Something else", requiredSkills: ["AC Repair"] },
        ],
      },
    ],
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    icon: "Wrench",
    emoji: "🔧",
    description: "Washing machine, fridge, microwave & kitchen appliances",
    featured: true,
    subcategories: [
      {
        id: "appliance-general",
        categoryId: "appliance",
        name: "Home Appliances",
        problems: [
          { id: "washing-machine", label: "Washing machine issue", requiredSkills: ["Appliance Repair"] },
          { id: "refrigerator", label: "Refrigerator issue", requiredSkills: ["Appliance Repair", "Refrigerant Handling"] },
          { id: "microwave", label: "Microwave / kitchen appliance", requiredSkills: ["Appliance Repair"] },
          { id: "appliance-other", label: "Something else", requiredSkills: ["Appliance Repair"] },
        ],
      },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "Car",
    emoji: "🚗",
    description: "Vehicle breakdown, servicing & roadside assistance",
    featured: true,
    subcategories: [
      {
        id: "auto-general",
        categoryId: "automotive",
        name: "Cars & Two-Wheelers",
        problems: [
          { id: "breakdown", label: "Vehicle breakdown", requiredSkills: ["Automotive Diagnostics", "Roadside Assistance"] },
          { id: "battery", label: "Battery / won't start", requiredSkills: ["Automotive Electrical"] },
          { id: "servicing", label: "Periodic servicing", requiredSkills: ["Automotive Mechanic"] },
          { id: "auto-other", label: "Something else", requiredSkills: ["Automotive Mechanic"] },
        ],
      },
    ],
  },
  {
    id: "commercial-vehicles",
    name: "Commercial Vehicles",
    icon: "Truck",
    emoji: "🚛",
    description: "Trucks, fleet maintenance & on-road breakdown support",
    featured: false,
    subcategories: [
      {
        id: "commercial-general",
        categoryId: "commercial-vehicles",
        name: "Trucks & Fleet",
        problems: [
          { id: "truck-breakdown", label: "Truck breakdown", requiredSkills: ["Commercial Vehicle Repair", "Roadside Assistance"] },
          { id: "fleet-maintenance", label: "Scheduled fleet maintenance", requiredSkills: ["Commercial Vehicle Repair"] },
          { id: "commercial-other", label: "Something else", requiredSkills: ["Commercial Vehicle Repair"] },
        ],
      },
    ],
  },
  {
    id: "ev",
    name: "EV Services",
    icon: "BatteryCharging",
    emoji: "🔋",
    description: "EV charging, battery systems & motor diagnostics",
    featured: true,
    subcategories: [
      {
        id: "ev-general",
        categoryId: "ev",
        name: "Electric Vehicles",
        problems: [
          { id: "ev-motor", label: "Motor problem", requiredSkills: ["EV Electrical", "Diagnostics"] },
          { id: "ev-battery", label: "Battery system issue", requiredSkills: ["Battery Systems"] },
          { id: "ev-charging", label: "Charging issue", requiredSkills: ["EV Electrical"] },
          { id: "ev-other", label: "Something else", requiredSkills: ["EV Electrical"] },
        ],
      },
    ],
  },
  {
    id: "industrial",
    name: "Industrial",
    icon: "Factory",
    emoji: "🏭",
    description: "Machine maintenance, industrial electrical & control panels",
    featured: true,
    subcategories: [
      {
        id: "industrial-general",
        categoryId: "industrial",
        name: "Plant & Machinery",
        problems: [
          { id: "motor-maintenance", label: "Motor maintenance", requiredSkills: ["Industrial Electrical", "Motor Systems"] },
          { id: "control-panel", label: "Control panel issue", requiredSkills: ["Control Panels"] },
          { id: "machine-maintenance", label: "Machine maintenance", requiredSkills: ["Machine Maintenance"] },
          { id: "industrial-other", label: "Something else", requiredSkills: ["Industrial Electrical"] },
        ],
      },
    ],
  },
  {
    id: "it-electronics",
    name: "IT & Electronics",
    icon: "Laptop",
    emoji: "💻",
    description: "Computers, networking, CCTV & consumer electronics",
    featured: false,
    subcategories: [
      {
        id: "it-general",
        categoryId: "it-electronics",
        name: "IT & Electronics",
        problems: [
          { id: "computer-repair", label: "Computer / laptop repair", requiredSkills: ["IT Support"] },
          { id: "networking", label: "Networking / Wi-Fi setup", requiredSkills: ["Networking"] },
          { id: "cctv", label: "CCTV installation", requiredSkills: ["CCTV Installation"] },
          { id: "it-other", label: "Something else", requiredSkills: ["IT Support"] },
        ],
      },
    ],
  },
  {
    id: "solar",
    name: "Solar",
    icon: "Sun",
    emoji: "☀️",
    description: "Solar panel installation, cleaning & maintenance",
    featured: false,
    subcategories: [
      {
        id: "solar-general",
        categoryId: "solar",
        name: "Solar Systems",
        problems: [
          { id: "solar-install", label: "New installation", requiredSkills: ["Solar Installation"] },
          { id: "solar-maintenance", label: "Maintenance / cleaning", requiredSkills: ["Solar Maintenance"] },
          { id: "solar-other", label: "Something else", requiredSkills: ["Solar Installation"] },
        ],
      },
    ],
  },
  {
    id: "other",
    name: "Other Services",
    icon: "Plus",
    emoji: "➕",
    description: "Can't find your category? Describe your need and we'll match you",
    featured: false,
    subcategories: [
      {
        id: "other-general",
        categoryId: "other",
        name: "Other",
        problems: [{ id: "other-general-problem", label: "Describe what you need", requiredSkills: [] }],
      },
    ],
  },
];

export const featuredCategories = categories.filter((c) => c.featured);

export function getCategory(id: string): ServiceCategory | undefined {
  return categories.find((c) => c.id === id);
}
