"use client";

import { useEffect, useState, type FormEvent } from "react";

const interests = ["Heritage", "Nature", "Food", "Hidden Gems", "Spirituality", "Photography", "Adventure", "Local Culture"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const travelStyles = ["Adventure", "Cultural", "Spiritual", "Nature", "Food", "Relaxation", "Balanced"];
const accommodationOptions = ["Guesthouse", "Comfortable stay", "Boutique hotel"];
const transportationOptions = ["Shared local transport", "Public transport", "Rail-first", "Private car"];
const dietaryOptions = ["No preference", "Vegetarian", "Vegan", "Jain"];
const accessibilityOptions = ["No specific needs", "Prefer less walking", "Step-free routes where available"];
const budgetModes = ["Budget", "Balanced", "Comfort"];
const checklistItems = ["Identification documents", "Tickets and reservations", "Accommodation confirmation", "Medicines and personal essentials", "Weather-appropriate clothing", "Chargers and electronics", "Destination-specific preparation", "Emergency contacts"];
const maximumBudget = 1_000_000;

type Destination = {
  name: string;
  state: string;
  region: string;
  description: string;
  image: string;
  credit?: string;
  tag: string;
  interests: string[];
  days: [string, string, string][];
  food: string;
  daily: number;
};

const destinations: Destination[] = [
  { name: "Hampi", state: "Karnataka", region: "South India", description: "Ancient kingdoms, giant boulders, and the slow rhythm of the Tungabhadra.", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Hampi%2C_India%2C_Matanga_Hill_at_sunset.jpg/960px-Hampi%2C_India%2C_Matanga_Hill_at_sunset.jpg", credit: "Photo: Vyacheslav Argenberg · CC BY 4.0", tag: "The ancient world", interests: ["Heritage", "Photography", "Adventure", "Local Culture"], days: [["Watch the first light catch the Virupaksha Temple gopuram", "Wander through the quiet colonnades of the Vittala Temple", "Find a rooftop for golden-hour views over the boulder fields"], ["Walk the old royal enclosure as the day begins", "Cross the river for a village-side view of Hampi", "Take the longer trail to the carved monolithic chariot"], ["Explore the riverside ghats before the heat settles in", "Follow a local guide through the temple-market streets", "Watch the sun set behind the Matanga Hill skyline"]], food: "Local thali, crisp dosa, and banana-leaf meals", daily: 3600 },
  { name: "Jaisalmer", state: "Rajasthan", region: "West India", description: "A living sandstone fort rising above the long, quiet sweep of the Thar.", image: "photo-1599661046827-dacff0c0f09a", tag: "The desert city", interests: ["Heritage", "Photography", "Hidden Gems", "Local Culture"], days: [["Enter the living fort as its lanes wake for the morning", "Visit carved havelis tucked just off the main lanes", "Take in the desert light from the old city ramparts"], ["Explore the intricately carved Patwon Ki Haveli", "Meet local makers in the lanes around the fort", "Head out to the dunes for a quiet desert sunset"], ["Walk to Gadisar Lake while the air is still cool", "Discover the city's old merchant architecture", "Dine under the open sky with folk music in the distance"]], food: "Ker sangri, dal baati churma, and local sweets", daily: 4100 },
  { name: "Varanasi", state: "Uttar Pradesh", region: "North India", description: "A city of river mornings, winding lanes, and a thousand years of living tradition.", image: "photo-1561361513-2d000a50f0dc", tag: "Along the sacred river", interests: ["Spirituality", "Food", "Heritage", "Photography", "Local Culture"], days: [["Take a quiet boat ride as the ghats meet the morning light", "Walk the narrow old-city lanes with a local storyteller", "Watch the evening aarti from a respectful distance"], ["Visit the riverside ghats before the city grows busy", "Explore weaving workshops and handloom traditions", "Try a seasonal sweet at a family-run old-city shop"], ["See the river from a different ghat at sunrise", "Discover the city's music and craft traditions", "Share a relaxed dinner of regional vegetarian dishes"]], food: "Kachori sabzi, tamatar chaat, and malaiyyo in season", daily: 3400 },
  { name: "Meghalaya", state: "Meghalaya", region: "Northeast India", description: "Living root bridges, cloud-soft valleys, and trails that disappear into green.", image: "photo-1516026672322-bc52d61a55d5", tag: "Where the clouds gather", interests: ["Nature", "Adventure", "Hidden Gems", "Photography"], days: [["Start early for the living root bridge trail", "Follow a local path past falls and forest pools", "Settle in at a hilltop viewpoint as clouds roll in"], ["Explore Shillong's old lanes and local market", "Drive through the green hills toward Cherrapunji", "Find a small homestay for a Khasi home-cooked meal"], ["Take the steps down to the clear water at Dawki", "Walk a village trail at an unhurried pace", "Watch the last light move across the Khasi hills"]], food: "Jadoh, tungrymbai, and seasonal Khasi dishes", daily: 5200 },
  { name: "Majuli Island", state: "Assam", region: "Northeast India", description: "River-island life, centuries-old satras, and an invitation to slow down.", image: "photo-1500530855697-b586d89ba3ee", tag: "An island apart", interests: ["Nature", "Spirituality", "Hidden Gems", "Local Culture"], days: [["Cycle along the riverbank as the island wakes", "Visit a satra and learn about its living traditions", "Watch the Brahmaputra turn gold at dusk"], ["Meet local mask-makers in a village workshop", "Take the ferry across the broad river channels", "Share a meal made with island-grown produce"], ["Explore a village lane on foot or bicycle", "Spend the afternoon by the water and wetland birds", "Catch the soft evening light over the island"]], food: "Assamese thali, rice cakes, and seasonal river fish", daily: 3200 },
  { name: "Ziro Valley", state: "Arunachal Pradesh", region: "Northeast India", description: "Pine-fringed trails and Apatani villages tucked into a beautiful green valley.", image: "photo-1470252649378-9c29740c9fa8", tag: "The green quiet", interests: ["Nature", "Photography", "Adventure", "Local Culture"], days: [["Walk the quiet edges of an Apatani village", "Follow a pine-forest trail above the valley", "Photograph the paddy fields in the afternoon light"], ["Meet a local guide for a valley walk", "Visit a village market and craft workshop", "Settle into a family-run homestay for dinner"], ["Take an early walk past the terraced fields", "Learn about traditional farming in the valley", "Watch evening mist move between the hills"]], food: "Smoked pork, local greens, and millet-based dishes", daily: 4600 },
  { name: "Chettinad", state: "Tamil Nadu", region: "South India", description: "Remarkable mansions, tile-lined streets, and a richly spiced culinary heritage.", image: "photo-1602216056096-3b40cc0c9944", tag: "A world of its own", interests: ["Heritage", "Food", "Photography", "Local Culture"], days: [["Visit a heritage mansion with a local guide", "Browse old tile and weaving workshops", "Settle in for a carefully spiced Chettinad meal"], ["Walk the quiet streets of Karaikudi's old quarter", "See the Athangudi tile-making tradition firsthand", "Browse a local market for regional ingredients"], ["Explore the region's distinctive temple architecture", "Visit a family-run craft workshop", "End the day with a traditional banana-leaf dinner"]], food: "Peppery Chettinad curry, idiyappam, and local filter coffee", daily: 3900 },
];

type DestinationDetails = {
  kind: string;
  familyFriendly: boolean;
  bestTime: string;
  bestMonths: string[];
  duration: string;
  budgetRange: [number, number];
  highlights: string[];
  culture: string;
  tips: string[];
  nearby: string[];
  seasons: Record<string, string>;
};

const destinationDetails: Record<string, DestinationDetails> = {
  Hampi: { kind: "Heritage", familyFriendly: true, bestTime: "November to February", bestMonths: ["November", "December", "January", "February"], duration: "3–4 days", budgetRange: [2800, 6500], highlights: ["Virupaksha Temple", "Vittala Temple complex", "Matanga Hill"], culture: "The former Vijayanagara capital is known for its temple architecture, sacred river landscape, and living Kannada traditions.", tips: ["Start outdoor walks early; midday heat can be intense.", "Check temple hours and local river-crossing arrangements before setting out."], nearby: ["Chettinad", "Meghalaya"], seasons: { Winter: "The cooler months are generally the most comfortable for exploring the ruins on foot.", Summer: "Plan shorter early-morning visits and rest during the hottest hours.", Monsoon: "Rain can make uneven stone paths slippery; check local access before hiking.", Autumn: "Expect warm days and variable rain; keep plans flexible." } },
  Jaisalmer: { kind: "Desert & heritage", familyFriendly: true, bestTime: "October to March", bestMonths: ["October", "November", "December", "January", "February", "March"], duration: "3–4 days", budgetRange: [3200, 7600], highlights: ["Jaisalmer Fort", "Patwon Ki Haveli", "Gadisar Lake"], culture: "A living desert fort city shaped by caravan routes, sandstone craft, and the music and food traditions of western Rajasthan.", tips: ["Choose respectful, locally guided desert experiences.", "Bring sun protection even in the cooler season."], nearby: ["Hampi", "Varanasi"], seasons: { Winter: "Cooler weather is well suited to fort walks and desert outings.", Summer: "Desert heat can be severe; limit midday outdoor activities.", Monsoon: "Rain is usually limited but can still affect road plans; check locally.", Autumn: "Days gradually cool; carry water and sun protection." } },
  Varanasi: { kind: "Spiritual & heritage", familyFriendly: true, bestTime: "October to March", bestMonths: ["October", "November", "December", "January", "February", "March"], duration: "2–4 days", budgetRange: [2500, 6200], highlights: ["Old-city ghats", "Morning boat ride", "Handloom workshops"], culture: "One of India's oldest continuously inhabited cities, with distinctive river rituals, classical music, silk weaving, and regional cuisine.", tips: ["Ask before photographing people or ceremonies.", "Old-city lanes can be crowded and uneven; allow extra walking time."], nearby: ["Jaisalmer", "Chettinad"], seasons: { Winter: "Mornings can be cool or misty; keep a warm layer for river outings.", Summer: "Heat and humidity are strongest midday; schedule walks around cooler hours.", Monsoon: "River levels and ghat access can change; check local notices before a boat trip.", Autumn: "Festive periods draw crowds; allow extra time for transport." } },
  Meghalaya: { kind: "Nature & adventure", familyFriendly: false, bestTime: "October to April", bestMonths: ["October", "November", "December", "January", "February", "March", "April"], duration: "4–6 days", budgetRange: [4200, 9000], highlights: ["Living root bridges", "Cherrapunji waterfalls", "Khasi hill trails"], culture: "Khasi, Jaintia, and Garo communities bring distinct matrilineal traditions, languages, music, and food to the region.", tips: ["Some root-bridge walks involve many steep steps; check route demands before committing.", "Carry rain protection and confirm road conditions with local hosts."], nearby: ["Ziro Valley", "Majuli Island"], seasons: { Winter: "Generally drier conditions suit many hill walks; mornings can be cool.", Summer: "Conditions vary by elevation; pack layers and check local guidance.", Monsoon: "Heavy rain can affect trails and roads; use local advice and flexible plans.", Autumn: "Rain may continue early in the season; confirm trail access locally." } },
  "Majuli Island": { kind: "Island & culture", familyFriendly: true, bestTime: "October to March", bestMonths: ["October", "November", "December", "January", "February", "March"], duration: "2–3 days", budgetRange: [2400, 5600], highlights: ["Satras", "Mask-making workshops", "Brahmaputra riverbank"], culture: "The river island's satras preserve devotional music, performance, mask-making, and Assamese community traditions.", tips: ["Ferry schedules and river conditions can change; verify locally before travel.", "Choose locally run stays and ask before photographing cultural performances."], nearby: ["Meghalaya", "Ziro Valley"], seasons: { Winter: "Cooler, drier months are generally comfortable for village visits and cycling.", Summer: "Plan around heat and check river transport in advance.", Monsoon: "Flooding can disrupt ferry routes and access; confirm current local conditions.", Autumn: "River conditions vary; build flexibility around ferry connections." } },
  "Ziro Valley": { kind: "Nature & village culture", familyFriendly: false, bestTime: "March to October", bestMonths: ["March", "April", "May", "June", "September", "October"], duration: "3–5 days", budgetRange: [3600, 7800], highlights: ["Apatani villages", "Terraced paddy fields", "Pine-forest trails"], culture: "The Apatani cultural landscape is known for distinctive village life, carefully managed wet-rice agriculture, and deep ecological knowledge.", tips: ["Travel permits may apply; verify requirements with official sources before departure.", "Use a local guide for village visits and ask before taking photographs."], nearby: ["Meghalaya", "Majuli Island"], seasons: { Winter: "Expect cooler conditions and confirm road access before travelling.", Summer: "A good season for green valley walks, with rain possible later in the season.", Monsoon: "Rain can affect roads and trails; bring waterproof layers and local guidance.", Autumn: "Conditions vary; ask local hosts about trail and road access." } },
  Chettinad: { kind: "Heritage & food", familyFriendly: true, bestTime: "November to February", bestMonths: ["November", "December", "January", "February"], duration: "2–3 days", budgetRange: [3000, 7000], highlights: ["Chettinad mansions", "Athangudi tile workshops", "Karaikudi markets"], culture: "The Chettiar merchant community's historic homes, handcrafted tiles, and distinctive culinary traditions define this region.", tips: ["Confirm mansion visiting hours with local hosts.", "Ask artisans before photographing workshops or their work."], nearby: ["Hampi", "Varanasi"], seasons: { Winter: "Cooler weather is generally comfortable for exploring heritage homes and markets.", Summer: "Southern heat can be strong; plan outdoor visits early.", Monsoon: "Carry rain protection and confirm site access locally.", Autumn: "Warm conditions continue; check dates around local festivals." } },
};

const experiences = [
  { number: "01", title: "At the table", kind: "Cuisine", text: "Follow a region from its market stalls to the family kitchen. Every landscape has a flavor of its own.", image: "photo-1546833999-b9f581a1996d" },
  { number: "02", title: "Made by hand", kind: "Traditional arts", text: "Meet the potters, weavers, painters, and woodworkers keeping generations of craft in motion.", image: "photo-1452860606245-08befc0ff44b" },
  { number: "03", title: "A country in celebration", kind: "Festivals", text: "Find a season of color, music, ceremony, and community, wherever your journey takes you.", image: "photo-1533174072545-7a4b6ad7a6c3" },
  { number: "04", title: "Stories in stone", kind: "Architecture", text: "From quiet stepwells to intricate temple corridors, discover the histories held in India's built world.", image: "photo-1514222134-b57cbb8ce073" },
];

type TripForm = { startCity: string; budget: number; days: number; travelers: number; interests: string[]; destination: string; region: string; month: string; travelStyle: string; accommodation: string; transportation: string; dietary: string; accessibility: string; budgetMode: string };
type TripCosts = { stay: number; food: number; transport: number; activities: number };
type ItineraryDay = { day: number; title: string; morning: string; afternoon: string; evening: string; food: string; estimatedCost: number; costs: TripCosts };
type SavedTrip = { id: string; name: string; destination: string; state: string; form: TripForm; itinerary: ItineraryDay[]; checklist: string[] };

const initialForm: TripForm = { startCity: "Mumbai", budget: 45000, days: 4, travelers: 2, interests: ["Heritage", "Food"], destination: "", region: "", month: "October", travelStyle: "Balanced", accommodation: "Comfortable stay", transportation: "Shared local transport", dietary: "No preference", accessibility: "No specific needs", budgetMode: "Balanced" };
const cityRegions: Record<string, string> = { Mumbai: "West India", Delhi: "North India", Bengaluru: "South India", Chennai: "South India", Kolkata: "Northeast India", Hyderabad: "South India", Pune: "West India", Ahmedabad: "West India" };

function normalizeSavedTrip(value: unknown): SavedTrip | null {
  if (!isRecord(value) || !isRecord(value.form) || !Array.isArray(value.itinerary)) return null;
  const legacyForm = value.form;
  const form = { ...initialForm, ...legacyForm, interests: Array.isArray(legacyForm.interests) ? legacyForm.interests.filter((item): item is string => typeof item === "string" && interests.includes(item)) : initialForm.interests } as TripForm;
  const destination = destinations.find((item) => item.name === value.destination);
  if (!destination || destination.state !== value.state || typeof value.id !== "string") return null;
  const itinerary = value.itinerary.map((rawDay) => {
    if (!isRecord(rawDay) || typeof rawDay.estimatedCost !== "number") return null;
    const total = Math.max(0, rawDay.estimatedCost);
    const stay = Math.round(total * 0.4);
    const food = Math.round(total * 0.25);
    const transport = Math.round(total * 0.15);
    return { ...rawDay, costs: isRecord(rawDay.costs) ? rawDay.costs : { stay, food, transport, activities: total - stay - food - transport } } as unknown as ItineraryDay;
  });
  if (itinerary.some((day) => day === null)) return null;
  const normalized: SavedTrip = { id: value.id, name: typeof value.name === "string" ? value.name : `A journey in ${destination.name}`, destination: destination.name, state: destination.state, form, itinerary: itinerary as ItineraryDay[], checklist: Array.isArray(value.checklist) ? value.checklist.filter((item): item is string => typeof item === "string" && checklistItems.includes(item)) : [] };
  return isSavedTrip(normalized) ? normalized : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTripCosts(value: unknown): value is TripCosts {
  return isRecord(value)
    && [value.stay, value.food, value.transport, value.activities].every((cost) => typeof cost === "number" && Number.isFinite(cost) && cost >= 0);
}

function isSavedTrip(value: unknown): value is SavedTrip {
  if (!isRecord(value) || !isRecord(value.form) || !Array.isArray(value.itinerary)) return false;

  const form = value.form;
  const destination = destinations.find((item) => item.name === value.destination);
  return typeof value.id === "string"
    && typeof value.name === "string"
    && destination?.state === value.state
    && typeof form.startCity === "string"
    && Object.hasOwn(cityRegions, form.startCity)
    && typeof form.budget === "number"
    && Number.isInteger(form.budget)
    && form.budget >= 3000
    && form.budget <= maximumBudget
    && typeof form.days === "number"
    && Number.isInteger(form.days)
    && form.days >= 1
    && form.days <= 14
    && typeof form.travelers === "number"
    && Number.isInteger(form.travelers)
    && form.travelers >= 1
    && form.travelers <= 12
    && Array.isArray(form.interests)
    && form.interests.every((interest) => typeof interest === "string" && interests.includes(interest))
    && typeof form.region === "string"
    && (form.region === "" || ["North India", "South India", "West India", "Northeast India"].includes(form.region))
    && months.includes(String(form.month))
    && travelStyles.includes(String(form.travelStyle))
    && accommodationOptions.includes(String(form.accommodation))
    && transportationOptions.includes(String(form.transportation))
    && dietaryOptions.includes(String(form.dietary))
    && accessibilityOptions.includes(String(form.accessibility))
    && budgetModes.includes(String(form.budgetMode))
    && (form.destination === "" || destinations.some((item) => item.name === form.destination))
    && Array.isArray(value.checklist)
    && value.checklist.every((item) => typeof item === "string" && checklistItems.includes(item))
    && value.itinerary.length === form.days
    && value.itinerary.every((day, index) => isRecord(day)
      && day.day === index + 1
      && typeof day.title === "string"
      && typeof day.morning === "string"
      && typeof day.afternoon === "string"
      && typeof day.evening === "string"
      && typeof day.food === "string"
      && typeof day.estimatedCost === "number"
      && Number.isFinite(day.estimatedCost)
      && day.estimatedCost >= 0
      && isTripCosts(day.costs)
      && day.costs.stay + day.costs.food + day.costs.transport + day.costs.activities === day.estimatedCost);
}

const photo = (id: string, width = 1000) => id.startsWith("http") ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const rupees = (value: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
const minimumTripBudget = (days: number, travelers: number) => Math.max(5000, days * travelers * 1000);

    function getSeason(month: string) {
      if (["December", "January", "February"].includes(month)) return "Winter";
      if (["March", "April", "May", "June"].includes(month)) return "Summer";
      if (["July", "August", "September"].includes(month)) return "Monsoon";
      return "Autumn";
    }

function buildTrip(form: TripForm): SavedTrip {
  const candidates = form.destination
    ? destinations.filter((item) => item.name === form.destination)
    : destinations.filter((item) => !form.region || item.region === form.region);
  const perPersonDay = form.budget / Math.max(form.days * form.travelers, 1);
  const destination = [...(candidates.length ? candidates : destinations)].sort((a, b) => {
        const score = (item: Destination) => form.interests.filter((interest) => item.interests.includes(interest)).length * 4
          + (cityRegions[form.startCity] === item.region ? 2 : 0)
          + (destinationDetails[item.name].bestMonths.includes(form.month) ? 2 : 0)
          + (form.travelStyle === "Adventure" && item.interests.includes("Adventure") ? 3 : 0)
          + (form.travelStyle === "Cultural" && (item.interests.includes("Heritage") || item.interests.includes("Local Culture")) ? 3 : 0)
          + (form.travelStyle === "Spiritual" && item.interests.includes("Spirituality") ? 3 : 0)
          + (form.travelStyle === "Nature" && item.interests.includes("Nature") ? 3 : 0)
          + (form.travelStyle === "Food" && item.interests.includes("Food") ? 3 : 0)
          + (perPersonDay >= item.daily * 1.2 ? 3 : perPersonDay < item.daily * 0.7 ? -3 : 0)
          + (form.budgetMode === "Budget" ? (item.daily < 4200 ? 2 : 0) : form.budgetMode === "Comfort" ? (item.daily > 4000 ? 2 : 0) : 1);
        return score(b) - score(a);
  })[0];
  const accommodationFactor = form.accommodation === "Guesthouse" ? 0.72 : form.accommodation === "Boutique hotel" ? 1.4 : 1;
  const transportFactor = form.transportation === "Public transport" ? 0.72 : form.transportation === "Rail-first" ? 0.82 : form.transportation === "Private car" ? 1.5 : 1;
  const modeFactor = form.budgetMode === "Budget" ? 0.82 : form.budgetMode === "Comfort" ? 1.28 : 1;
  const seasonalFactor = destinationDetails[destination.name].bestMonths.includes(form.month) ? 1.08 : 1;
  const itinerary = Array.from({ length: form.days }, (_, index) => {
    const activities = destination.days[index % destination.days.length];
    const interest = form.interests[index % Math.max(form.interests.length, 1)];
    const dailyBase = destination.daily * modeFactor * seasonalFactor;
    const costs: TripCosts = {
      stay: Math.round(dailyBase * 0.4 * accommodationFactor * form.travelers),
      food: Math.round(dailyBase * 0.25 * (form.dietary === "No preference" ? 1 : 1.08) * form.travelers),
      transport: Math.round(dailyBase * 0.15 * transportFactor * form.travelers),
      activities: Math.round(dailyBase * 0.2 * (form.travelStyle === "Adventure" ? 1.15 : 1) * form.travelers),
    };
    const estimatedCost = costs.stay + costs.food + costs.transport + costs.activities;
    return {
      day: index + 1,
      title: ["Arrive, then take it all in", "Find your own rhythm", "A little further in", "Leave room for the unexpected"][index % 4],
      morning: index === 0 ? `Travel from ${form.startCity} and settle into your stay.` : `${form.accessibility === "Prefer less walking" ? "Choose a shorter route for " : form.accessibility === "Step-free routes where available" ? "Ask locally about step-free access before " : ""}${activities[0]}${interest ? `, with time to linger over ${interest.toLowerCase()}.` : "."}`,
      afternoon: index === 0 ? `Take an easy first walk through ${destination.name}. ${activities[1]}` : activities[1],
      evening: activities[2],
      food: form.dietary === "No preference" ? destination.food : `Ask local hosts for ${form.dietary.toLowerCase()} alternatives to ${destination.food}.`,
      estimatedCost, costs,
    };
  });
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: `A ${form.travelStyle.toLowerCase()} journey in ${destination.name}`, destination: destination.name, state: destination.state, form: { ...form, interests: [...form.interests] }, itinerary, checklist: [] };
}

export default function TravelExperience() {
  const [form, setForm] = useState<TripForm>(initialForm);
  const [trip, setTrip] = useState<SavedTrip | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [interestError, setInterestError] = useState("");
  const [notice, setNotice] = useState("");
  const [detailDestination, setDetailDestination] = useState<Destination | null>(null);
  const [compareNames, setCompareNames] = useState<string[]>([]);
  const [savedExperienceIds, setSavedExperienceIds] = useState<string[]>([]);
  const [cultureFilter, setCultureFilter] = useState("All experiences");
  const [showExplanation, setShowExplanation] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [renamingTripId, setRenamingTripId] = useState<string | null>(null);
  const [tripNameDraft, setTripNameDraft] = useState("");
  const [editingSavedTripId, setEditingSavedTripId] = useState<string | null>(null);
  const [explorerFilters, setExplorerFilters] = useState({ region: "All regions", budget: "Any budget", style: "Any style", type: "Any type", familyFriendly: false, culture: false, nature: false });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem("bharat-unbound-saved-trips");
        if (stored) {
          let parsed: unknown;
          try {
            parsed = JSON.parse(stored);
          } catch {
            parsed = [];
          }
          const knownIds = new Set<string>();
          const trips = Array.isArray(parsed) ? parsed.map(normalizeSavedTrip).filter((item): item is SavedTrip => {
            if (!item || knownIds.has(item.id)) return false;
            knownIds.add(item.id);
            return true;
          }) : [];
          setSavedTrips(trips);
          try {
            window.localStorage.setItem("bharat-unbound-saved-trips", JSON.stringify(trips));
          } catch {}
        }
      } catch {
      }
      try {
        const storedExperiences = window.localStorage.getItem("bharat-unbound-saved-experiences");
        if (storedExperiences) {
          const parsedExperiences: unknown = JSON.parse(storedExperiences);
          if (Array.isArray(parsedExperiences)) setSavedExperienceIds(parsedExperiences.filter((id): id is string => typeof id === "string" && experiences.some((experience) => experience.number === id)));
        }
      } catch {
        try { window.localStorage.removeItem("bharat-unbound-saved-experiences"); } catch {}
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateForm<K extends keyof TripForm>(key: K, value: TripForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleInterest(interest: string) {
    setForm((current) => ({ ...current, interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest] }));
    setInterestError("");
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.interests.length) { setInterestError("Choose at least one thing you would love to experience."); return; }
    const generated = buildTrip(form);
    const editing = savedTrips.find((saved) => saved.id === editingSavedTripId);
    if (editing) {
      generated.id = editing.id;
      generated.name = editing.name;
      generated.checklist = editing.checklist;
    }
    setTrip(generated);
    setEditingSavedTripId(null);
    setShowExplanation(false);
    setNotice("");
    window.setTimeout(() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  function persistTrips(next: SavedTrip[]) {
    try {
      window.localStorage.setItem("bharat-unbound-saved-trips", JSON.stringify(next));
      setSavedTrips(next);
      return true;
    } catch {
      setNotice("Browser storage is unavailable or full. This change could not be saved.");
      return false;
    }
  }

  function saveTrip() {
    if (!trip) return;
    const isUpdate = savedTrips.some((saved) => saved.id === trip.id);
    if (persistTrips([trip, ...savedTrips.filter((saved) => saved.id !== trip.id)])) setNotice(`${trip.name} is ${isUpdate ? "updated in" : "saved to"} this browser's saved journeys.`);
  }

  function renameSavedTrip(id: string) {
    const name = tripNameDraft.trim().slice(0, 60);
    if (!name) return;
    const next = savedTrips.map((saved) => saved.id === id ? { ...saved, name } : saved);
    if (persistTrips(next)) { setRenamingTripId(null); setNotice("Journey name updated."); }
  }

  function duplicateSavedTrip(saved: SavedTrip) {
    const duplicate = { ...saved, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: `${saved.name} (copy)`, checklist: [...saved.checklist] };
    if (persistTrips([duplicate, ...savedTrips])) setNotice(`${duplicate.name} added to your saved journeys.`);
  }

  function confirmDeleteSavedTrip() {
    if (!pendingDeleteId) return;
    const next = savedTrips.filter((saved) => saved.id !== pendingDeleteId);
    if (persistTrips(next)) { setPendingDeleteId(null); setNotice("Journey removed from this browser."); }
  }

  function toggleChecklistItem(item: string) {
    if (!trip) return;
    const checked = trip.checklist.includes(item);
    const updated = { ...trip, checklist: checked ? trip.checklist.filter((value) => value !== item) : [...trip.checklist, item] };
    setTrip(updated);
    if (savedTrips.some((saved) => saved.id === trip.id)) persistTrips(savedTrips.map((saved) => saved.id === trip.id ? updated : saved));
  }

  function toggleComparison(name: string) {
    if (compareNames.includes(name)) { setCompareNames(compareNames.filter((item) => item !== name)); return; }
    if (compareNames.length >= 3) { setNotice("Compare up to three destinations at a time."); return; }
    setCompareNames([...compareNames, name]);
  }

  function toggleSavedExperience(number: string) {
    const next = savedExperienceIds.includes(number) ? savedExperienceIds.filter((id) => id !== number) : [...savedExperienceIds, number];
    try {
      window.localStorage.setItem("bharat-unbound-saved-experiences", JSON.stringify(next));
      setSavedExperienceIds(next);
      setNotice(next.includes(number) ? "Cultural experience saved." : "Cultural experience removed.");
    } catch {
      setNotice("Browser storage is unavailable or full.");
    }
  }

  function exploreDestination(destination: Destination) {
    setEditingSavedTripId(null);
    setForm((current) => ({ ...current, destination: destination.name, region: destination.region }));
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  }

  function updateDestination(destinationName: string) {
    const destination = destinations.find((item) => item.name === destinationName);
    setForm((current) => ({ ...current, destination: destinationName, region: destination?.region ?? current.region }));
  }

  function updateRegion(region: string) {
    setForm((current) => ({ ...current, region, destination: current.destination && destinations.find((item) => item.name === current.destination)?.region !== region ? "" : current.destination }));
  }

  function revisitTrip(saved: SavedTrip) {
    setTrip(saved);
    setForm(saved.form);
    setEditingSavedTripId(saved.id);
    setShowExplanation(false);
    window.setTimeout(() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  function updateExplorerFilter(key: keyof typeof explorerFilters, value: string | boolean) {
    setExplorerFilters((current) => ({ ...current, [key]: value }));
  }

  const chosenDestination = destinations.find((item) => item.name === form.destination);
  const budgetMinimum = minimumTripBudget(form.days, form.travelers);
  const budgetMaximum = maximumBudget;
  const estimatedTotal = trip?.itinerary.reduce((total, day) => total + day.estimatedCost, 0) ?? 0;
  const costTotals: TripCosts = trip?.itinerary.reduce((total, day) => ({ stay: total.stay + day.costs.stay, food: total.food + day.costs.food, transport: total.transport + day.costs.transport, activities: total.activities + day.costs.activities }), { stay: 0, food: 0, transport: 0, activities: 0 }) ?? { stay: 0, food: 0, transport: 0, activities: 0 };
  const budgetRemaining = trip ? trip.form.budget - estimatedTotal : 0;
  const budgetUtilization = trip && trip.form.budget ? Math.round((estimatedTotal / trip.form.budget) * 100) : 0;
  const expenseBreakdown = [
    { label: "Stay", amount: costTotals.stay },
    { label: "Food", amount: costTotals.food },
    { label: "Transport", amount: costTotals.transport },
    { label: "Experiences", amount: costTotals.activities },
  ];
  const filteredDestinations = destinations.filter((destination) => {
    const details = destinationDetails[destination.name];
    const styleInterest: Record<string, string> = { Adventure: "Adventure", Cultural: "Heritage", Spiritual: "Spirituality", Nature: "Nature", Food: "Food" };
    return (explorerFilters.region === "All regions" || destination.region === explorerFilters.region)
      && (explorerFilters.budget === "Any budget" || (explorerFilters.budget === "Under ₹4,000/person/day" ? destination.daily < 4000 : destination.daily >= 4000))
      && (explorerFilters.style === "Any style" || destination.interests.includes(styleInterest[explorerFilters.style] ?? explorerFilters.style))
      && (explorerFilters.type === "Any type" || details.kind.toLowerCase().includes(explorerFilters.type.toLowerCase()))
      && (!explorerFilters.familyFriendly || details.familyFriendly)
      && (!explorerFilters.culture || destination.interests.some((interest) => ["Heritage", "Local Culture", "Spirituality"].includes(interest)))
      && (!explorerFilters.nature || destination.interests.includes("Nature"));
  });
  const visibleExperiences = experiences.filter((experience) => cultureFilter === "All experiences" || experience.kind === cultureFilter);
  const selectedComparison = compareNames.map((name) => destinations.find((destination) => destination.name === name)).filter((destination): destination is Destination => Boolean(destination));
  const activeDestination = trip ? destinations.find((item) => item.name === trip.destination) : undefined;
  const activeDetails = trip ? destinationDetails[trip.destination] : undefined;
  const biggestExpense = [...expenseBreakdown].sort((a, b) => b.amount - a.amount)[0];
  const accommodationFactor = trip?.form.accommodation === "Guesthouse" ? 0.72 : trip?.form.accommodation === "Boutique hotel" ? 1.4 : 1;
  const transportFactor = trip?.form.transportation === "Public transport" ? 0.72 : trip?.form.transportation === "Rail-first" ? 0.82 : trip?.form.transportation === "Private car" ? 1.5 : 1;
  const lodgingSavings = trip ? Math.max(0, Math.round(costTotals.stay * (1 - 0.72 / accommodationFactor))) : 0;
  const transportSavings = trip ? Math.max(0, Math.round(costTotals.transport * (1 - 0.72 / transportFactor))) : 0;
  const travelTips = activeDetails && trip ? [...activeDetails.tips, ...(trip.form.accessibility !== "No specific needs" ? ["Confirm route accessibility directly with local venues and transport providers; access conditions can change."] : []), ...(trip.form.dietary !== "No preference" ? [`Confirm ${trip.form.dietary.toLowerCase()} meal options with individual restaurants or hosts.`] : [])] : [];

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Bharat Unbound home"><span className="wordmark-symbol" aria-hidden="true">B</span><span className="wordmark-type">BHARAT <span>UNBOUND</span></span></a>
        <nav className="main-nav" aria-label="Main navigation"><a href="#discover">Discover</a><a href="#destinations">Destinations</a><a href="#experiences">Experiences</a><a className="nav-plan" href="#planner">Plan a trip <span aria-hidden="true">↗</span></a></nav>
      </header>

      <section className="hero" id="home" style={{ backgroundImage: `linear-gradient(90deg, rgba(17,33,25,.76) 0%, rgba(17,33,25,.44) 45%, rgba(17,33,25,.08) 100%), url("${photo("photo-1524492412937-b28074a5d7da", 2200)}")` }}>
        <div className="hero-content" id="discover"><p className="eyebrow hero-eyebrow"><span className="eyebrow-rule" /> A different kind of India</p><h1>Some journeys take you places.<br /><em>Others bring you closer</em><br />to India.</h1><p className="hero-copy">Thoughtfully made journeys for the places you dream about, the stories you want to hear, and the India waiting just around the corner.</p><div className="hero-actions"><a className="button button-light" href="#planner">Create my journey <span aria-hidden="true">↗</span></a><a className="button button-outline-light" href="#destinations">Explore India <span aria-hidden="true">↓</span></a></div></div>
        <div className="hero-caption"><span>AGRA · UTTAR PRADESH</span><span>27°10′N &nbsp; 78°02′E</span></div><a className="hero-scroll" href="#destinations" aria-label="Scroll to destinations"><span /> SCROLL TO WANDER</a>
      </section>

      <section className="intro-strip" aria-label="Our approach"><p>MADE FOR THE CURIOUS</p><span className="intro-divider" /><p>ROOTED IN REAL PLACES</p><span className="intro-divider" /><p>ALWAYS YOURS TO DISCOVER</p><span className="intro-note">One country. A thousand ways in.</span></section>

      <section className="section destinations-section" id="destinations"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> A good place to begin</p><h2>India, in <em>all its</em><br />wonderful elsewhere.</h2></div><p className="section-aside">Not just somewhere to go.<br />Somewhere to feel something.</p></div>
        <div className="explorer-filters" aria-label="Filter destinations">
          <label>Region<select value={explorerFilters.region} onChange={(event) => updateExplorerFilter("region", event.target.value)}><option>All regions</option>{["North India", "South India", "West India", "Northeast India"].map((region) => <option key={region}>{region}</option>)}</select></label>
          <label>Budget<select value={explorerFilters.budget} onChange={(event) => updateExplorerFilter("budget", event.target.value)}><option>Any budget</option><option>Under ₹4,000/person/day</option><option>₹4,000+/person/day</option></select></label>
          <label>Travel style<select value={explorerFilters.style} onChange={(event) => updateExplorerFilter("style", event.target.value)}><option>Any style</option>{travelStyles.filter((style) => style !== "Balanced").map((style) => <option key={style}>{style}</option>)}</select></label>
          <label>Destination type<select value={explorerFilters.type} onChange={(event) => updateExplorerFilter("type", event.target.value)}><option>Any type</option>{["Heritage", "Nature", "Spiritual", "Island", "Desert", "Food"].map((type) => <option key={type}>{type}</option>)}</select></label>
          <div className="explorer-toggles"><label><input type="checkbox" checked={explorerFilters.familyFriendly} onChange={(event) => updateExplorerFilter("familyFriendly", event.target.checked)} /> Family-friendly</label><label><input type="checkbox" checked={explorerFilters.culture} onChange={(event) => updateExplorerFilter("culture", event.target.checked)} /> Cultural</label><label><input type="checkbox" checked={explorerFilters.nature} onChange={(event) => updateExplorerFilter("nature", event.target.checked)} /> Nature & adventure</label></div>
        </div>
        <p className="explorer-count">{filteredDestinations.length} CURATED DESTINATIONS · ESTIMATES ONLY</p>
        {filteredDestinations.length ? <div className="destination-grid">{filteredDestinations.map((destination, index) => { const details = destinationDetails[destination.name]; return <article className={`destination-card destination-card-${(index % 4) + 1}`} key={destination.name}><button className="destination-image destination-image-button" type="button" aria-label={`View ${destination.name} details`} onClick={() => setDetailDestination(destination)} style={{ backgroundImage: `url("${photo(destination.image, 900)}")` }}><span className="image-index">{String(index + 1).padStart(2, "0")}</span><span className="image-tag">{destination.tag}</span>{destination.credit && <span className="photo-credit">{destination.credit}</span>}</button><div className="destination-info"><p className="location-label">{destination.state} <span>·</span> {destination.region}</p><div className="destination-title-row"><h3>{destination.name}</h3><button className="text-link" onClick={() => setDetailDestination(destination)} type="button">Details <span aria-hidden="true">↗</span></button></div><p className="destination-description">{destination.description}</p><div className="destination-card-actions"><span>{details.kind} · ~{rupees(destination.daily)}/person/day</span><button type="button" aria-pressed={compareNames.includes(destination.name)} onClick={() => toggleComparison(destination.name)}>{compareNames.includes(destination.name) ? "Compared ✓" : "+ Compare"}</button><button type="button" onClick={() => exploreDestination(destination)}>Add to trip</button></div></div></article>; })}</div> : <div className="explorer-empty"><p>No destinations match every filter.</p><button className="text-link" type="button" onClick={() => setExplorerFilters({ region: "All regions", budget: "Any budget", style: "Any style", type: "Any type", familyFriendly: false, culture: false, nature: false })}>Clear filters <span aria-hidden="true">↗</span></button></div>}
        {selectedComparison.length > 0 && <section className="comparison-panel" aria-label="Destination comparison"><div className="comparison-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> Side by side</p><h3>Compare destinations <span>({selectedComparison.length}/3)</span></h3></div><button className="text-link" type="button" onClick={() => setCompareNames([])}>Clear comparison</button></div><div className="comparison-grid">{selectedComparison.map((destination) => { const details = destinationDetails[destination.name]; return <article key={destination.name}><button className="comparison-remove" type="button" onClick={() => toggleComparison(destination.name)} aria-label={`Remove ${destination.name} from comparison`}>×</button><p className="location-label">{destination.region}</p><h4>{destination.name}</h4><dl><div><dt>Daily estimate</dt><dd>~{rupees(destination.daily)} / person</dd></div><div><dt>Suggested stay</dt><dd>{details.duration}</dd></div><div><dt>Style</dt><dd>{details.kind}</dd></div><div><dt>Known for</dt><dd>{details.highlights.slice(0, 2).join(", ")}</dd></div><div><dt>Best suited for</dt><dd>{destination.interests.slice(0, 2).join(" and ")}</dd></div></dl><button className="text-link" type="button" onClick={() => exploreDestination(destination)}>Plan this trip <span aria-hidden="true">↗</span></button></article>; })}</div></section>}
      </section>

      <section className="hidden-section" id="hidden-india"><div className="hidden-heading"><p className="eyebrow"><span className="eyebrow-rule" /> For those who wander a little further</p><h2>There is more<br />to India than <em>you know.</em></h2><p className="hidden-copy">Take the quieter road. Let the ferry, the forest track, and a local&apos;s recommendation show you the way.</p></div><div className="hidden-grid">{destinations.slice(4).map((destination, index) => <article className="hidden-card" key={destination.name}><div className="hidden-image" role="img" aria-label={`${destination.name}, ${destination.state}`} style={{ backgroundImage: `url("${photo(destination.image, 900)}")` }}><span className="image-index">0{index + 5}</span><button className="round-arrow" onClick={() => exploreDestination(destination)} type="button" aria-label={`Plan a trip to ${destination.name}`}>↗</button></div><p className="location-label">{destination.state} <span>·</span> {destination.region}</p><h3>{destination.name}</h3><p>{destination.description}</p></article>)}</div></section>

      <section className="experience-section" id="experiences"><div className="experience-topline"><p className="eyebrow"><span className="eyebrow-rule" /> The good stuff, up close</p><label className="culture-filter">Explore by theme<select value={cultureFilter} onChange={(event) => setCultureFilter(event.target.value)}><option>All experiences</option>{experiences.map((experience) => <option key={experience.kind}>{experience.kind}</option>)}</select></label></div><div className="experience-heading"><h2>Get to know India<br /><em>by getting into it.</em></h2><p>Regional foodways, living crafts, and cultural traditions are best experienced with curiosity, permission, and local knowledge.</p></div><div className="experience-grid">{visibleExperiences.map((experience) => <article className="experience-card" key={experience.number}><div className="experience-image" role="img" aria-label={`${experience.kind} in India`} style={{ backgroundImage: `url("${photo(experience.image, 760)}")` }}><span>{experience.number}</span></div><p className="location-label">{experience.kind}</p><h3>{experience.title}</h3><p className="experience-description">{experience.text}</p><div className="experience-actions"><a className="experience-link" href="#planner">Make room for it <span aria-hidden="true">↗</span></a><button className="text-link" type="button" aria-pressed={savedExperienceIds.includes(experience.number)} onClick={() => toggleSavedExperience(experience.number)}>{savedExperienceIds.includes(experience.number) ? "Saved ✓" : "Save experience"}</button></div></article>)}</div><p className="responsible-note">Travel thoughtfully: ask before photographing people, follow local guidance at sacred sites, and choose locally owned experiences where possible.</p></section>

      <section className="planner-section" id="planner"><div className="planner-intro"><p className="eyebrow"><span className="eyebrow-rule" /> Your trip, your terms</p><h2>Start with a feeling.<br /><em>We&apos;ll find the place.</em></h2><p>Tell us what sounds like you. We’ll put together a thoughtful first draft, made from local knowledge and a little room to roam.</p><div className="planner-note"><span className="planner-note-mark" aria-hidden="true">✳</span><p>No bookings. No live prices. Just a good place to start.</p></div></div>
        <form className="planner-form" onSubmit={createTrip}>
          <div className="form-topline"><span>PLAN A JOURNEY</span><span>YOUR INDIA, YOUR PACE</span></div>
          <div className="form-row form-row-two">
            <label className="field-label">Starting city<select value={form.startCity} onChange={(event) => updateForm("startCity", event.target.value)}>{Object.keys(cityRegions).map((city) => <option key={city}>{city}</option>)}</select></label>
            <label className="field-label">Destination<select value={form.destination} onChange={(event) => updateDestination(event.target.value)}><option value="">Surprise me</option>{destinations.map((destination) => <option key={destination.name} value={destination.name}>{destination.name}</option>)}</select></label>
          </div>
          <div className="form-row form-row-three">
            <label className="field-label">Preferred region<select value={form.region} onChange={(event) => updateRegion(event.target.value)}><option value="">Anywhere in India</option>{["North India", "South India", "West India", "Northeast India"].map((region) => <option key={region}>{region}</option>)}</select></label>
            <label className="field-label">Travel month<select value={form.month} onChange={(event) => updateForm("month", event.target.value)}>{months.map((month) => <option key={month}>{month}</option>)}</select></label>
            <label className="field-label">Budget mode<select value={form.budgetMode} onChange={(event) => updateForm("budgetMode", event.target.value)}>{budgetModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
          </div>
          {chosenDestination && <p className="destination-picked">A little something in mind: <strong>{chosenDestination.name}, {chosenDestination.state}</strong></p>}
          <div className="form-row form-row-three">
            <label className="field-label">Total budget (INR)<div className="input-prefix"><span>₹</span><input type="number" min={budgetMinimum} max={budgetMaximum} step="500" required value={form.budget} onChange={(event) => updateForm("budget", Number(event.target.value))} aria-label="Total trip budget in Indian rupees" /></div><span className="field-hint">Minimum for this group and duration: {rupees(budgetMinimum)}</span></label>
            <label className="field-label">Duration<div className="input-suffix"><input type="number" min="1" max="14" required value={form.days} onChange={(event) => updateForm("days", Number(event.target.value))} /><span>days</span></div></label>
            <label className="field-label">Travelers<div className="input-suffix"><input type="number" min="1" max="12" required value={form.travelers} onChange={(event) => updateForm("travelers", Number(event.target.value))} /><span>people</span></div></label>
          </div>
          <fieldset className="interest-fieldset"><legend>What are you drawn to? <span>Pick a few</span></legend><div className="interest-options">{interests.map((interest) => <button className={`interest-chip ${form.interests.includes(interest) ? "is-selected" : ""}`} aria-pressed={form.interests.includes(interest)} key={interest} onClick={() => toggleInterest(interest)} type="button">{form.interests.includes(interest) && <span aria-hidden="true">✓ </span>}{interest}</button>)}</div>{interestError && <p className="form-error" role="alert">{interestError}</p>}</fieldset>
          <div className="form-row form-row-three preference-row"><label className="field-label">Travel style<select value={form.travelStyle} onChange={(event) => updateForm("travelStyle", event.target.value)}>{travelStyles.map((style) => <option key={style}>{style}</option>)}</select></label><label className="field-label">Accommodation<select value={form.accommodation} onChange={(event) => updateForm("accommodation", event.target.value)}>{accommodationOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label className="field-label">Getting around<select value={form.transportation} onChange={(event) => updateForm("transportation", event.target.value)}>{transportationOptions.map((option) => <option key={option}>{option}</option>)}</select></label></div>
          <div className="form-row form-row-two preference-row"><label className="field-label">Dietary preference<select value={form.dietary} onChange={(event) => updateForm("dietary", event.target.value)}>{dietaryOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label className="field-label">Accessibility<select value={form.accessibility} onChange={(event) => updateForm("accessibility", event.target.value)}>{accessibilityOptions.map((option) => <option key={option}>{option}</option>)}</select></label></div>
          <button className="button button-green planner-submit" type="submit">Find my kind of India <span aria-hidden="true">↗</span></button><p className="form-disclaimer">Curated itinerary and cost estimates only. Seasonal notes are general guidance, not a live forecast.</p>
        </form>
      </section>

      {trip && activeDetails && <section className="itinerary-section" id="itinerary" aria-live="polite"><div className="itinerary-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> A first draft, made for you</p><h2>{trip.name}</h2><p className="itinerary-location">{trip.destination}, {trip.state} <span>·</span> {trip.form.month} <span>·</span> {trip.form.days} days <span>·</span> {trip.form.travelers} {trip.form.travelers === 1 ? "traveler" : "travelers"}</p></div><div className="itinerary-actions"><button className="button button-outline-green" onClick={() => window.print()} type="button">Print / Save PDF <span aria-hidden="true">↗</span></button><button className="button button-green save-trip-button" onClick={saveTrip} type="button"><span aria-hidden="true">＋</span> Save this journey</button></div></div>
        {notice && <p className="notice-message" role="status">{notice}</p>}
        <div className="budget-metrics"><div><span>ESTIMATED TRIP COST</span><strong>{rupees(estimatedTotal)}</strong></div><div><span>PER TRAVELLER</span><strong>{rupees(Math.ceil(estimatedTotal / trip.form.travelers))}</strong></div><div><span>BUDGET REMAINING</span><strong className={budgetRemaining < 0 ? "over-budget" : ""}>{rupees(budgetRemaining)}</strong></div><div><span>BUDGET USED</span><strong className={budgetUtilization > 100 ? "over-budget" : ""}>{budgetUtilization}%</strong></div></div>
        {budgetRemaining < 0 && <div className="budget-alert" role="status"><strong>This draft is {rupees(Math.abs(budgetRemaining))} over your budget.</strong><span>Try a guesthouse, local transport, or Budget mode below; each recalculates the estimate.</span></div>}
        <div className="itinerary-summary"><div><span>YOUR MAXIMUM BUDGET</span><strong>{rupees(trip.form.budget)}</strong></div><div><span>DESTINATION</span><strong>{activeDestination?.region}</strong></div><div><span>PLANNING FOR</span><strong>{trip.form.travelStyle} · {trip.form.budgetMode}</strong></div><p>All amounts are illustrative estimates, not live prices, bookings, or quotes. Intercity transport and personal purchases may be additional.</p></div>
        <div className="expense-breakdown"><div className="breakdown-heading"><span>ESTIMATED EXPENSE BREAKDOWN</span><span>{rupees(estimatedTotal)} total · {rupees(Math.ceil(estimatedTotal / trip.form.travelers))} per traveller</span></div><div className="breakdown-grid">{expenseBreakdown.map((expense) => <div className="breakdown-item" key={expense.label}><div><span>{expense.label}</span><strong>{rupees(expense.amount)}</strong></div><span className="breakdown-track"><i style={{ width: `${estimatedTotal ? (expense.amount / estimatedTotal) * 100 : 0}%` }} /></span></div>)}</div><p>Costs recalculate from your accommodation, transport, dietary, seasonal, and budget-mode preferences. These are planning estimates, not live rates.</p></div>
        <div className="optimizer-panel"><div className="optimizer-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> Adjust the actual estimate</p><h3>Make the numbers feel right.</h3><p>Each change rebuilds your day-by-day cost calculation.</p></div><label className="budget-control"><span>Maximum budget <strong>{rupees(trip.form.budget)}</strong></span><input type="range" min={minimumTripBudget(trip.form.days, trip.form.travelers)} max={maximumBudget} step="500" value={trip.form.budget} onChange={(event) => { const updated = { ...trip.form, budget: Number(event.target.value) }; setForm(updated); setTrip({ ...buildTrip(updated), id: trip.id, name: trip.name, checklist: trip.checklist }); }} aria-label="Adjust maximum trip budget" /><span className="range-labels"><span>{rupees(minimumTripBudget(trip.form.days, trip.form.travelers))}</span><span>{rupees(maximumBudget)}</span></span></label></div><div className="optimizer-options"><label>Budget mode<select value={trip.form.budgetMode} onChange={(event) => { const updated = { ...trip.form, budgetMode: event.target.value }; setForm(updated); setTrip({ ...buildTrip(updated), id: trip.id, name: trip.name, checklist: trip.checklist }); }}>{budgetModes.map((mode) => <option key={mode}>{mode}</option>)}</select></label><label>Stay<select value={trip.form.accommodation} onChange={(event) => { const updated = { ...trip.form, accommodation: event.target.value }; setForm(updated); setTrip({ ...buildTrip(updated), id: trip.id, name: trip.name, checklist: trip.checklist }); }}>{accommodationOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>Transport<select value={trip.form.transportation} onChange={(event) => { const updated = { ...trip.form, transportation: event.target.value }; setForm(updated); setTrip({ ...buildTrip(updated), id: trip.id, name: trip.name, checklist: trip.checklist }); }}>{transportationOptions.map((option) => <option key={option}>{option}</option>)}</select></label></div><div className="savings-options"><strong>Potential savings at these estimates</strong><p>{lodgingSavings ? `Guesthouse instead of ${trip.form.accommodation}: about ${rupees(lodgingSavings)} less.` : "Your current stay selection is already the lowest-cost option in this planner."}</p><p>{transportSavings ? `Shared local transport instead of ${trip.form.transportation}: about ${rupees(transportSavings)} less.` : "Your current transport selection is already the lowest-cost option in this planner."}</p></div></div>
        <div className="itinerary-days"><div className="itinerary-subheading"><h3>Day by day</h3><span>Morning · Afternoon · Evening</span></div>{trip.itinerary.map((day) => <article className="itinerary-day" key={`${trip.id}-${day.day}`}><div className="day-number"><span>DAY</span><strong>{String(day.day).padStart(2, "0")}</strong></div><div className="day-detail"><div className="day-title-row"><h4>{day.title}</h4><span className="day-cost">~{rupees(day.estimatedCost)} <small>/ group / day</small></span></div><div className="day-schedule"><p><span>MORNING</span>{day.morning}</p><p><span>AFTERNOON</span>{day.afternoon}</p><p><span>EVENING</span>{day.evening}</p><p><span>AT THE TABLE</span>{day.food}</p></div><p className="day-cost-detail">Stay {rupees(day.costs.stay)} · Food {rupees(day.costs.food)} · Transport {rupees(day.costs.transport)} · Activities {rupees(day.costs.activities)}</p></div></article>)}</div>
        <div className="itinerary-support-grid"><section className="tips-panel"><p className="eyebrow"><span className="eyebrow-rule" /> Before you go</p><h3>{getSeason(trip.form.month)} in {trip.destination}</h3><p className="season-guidance">{activeDetails.seasons[getSeason(trip.form.month)]} General seasonal guidance only; this is not a live weather forecast.</p><ul>{travelTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section><section className="checklist-panel"><p className="eyebrow"><span className="eyebrow-rule" /> Your travel checklist</p><h3>Ready when you are.</h3><div className="checklist-items">{checklistItems.map((item) => <label key={item}><input type="checkbox" checked={trip.checklist.includes(item)} onChange={() => toggleChecklistItem(item)} /><span>{item}</span></label>)}</div><p>Checklist progress is saved with this trip when you save it in this browser.</p></section></div>
        <section className="explain-panel"><div><p className="eyebrow"><span className="eyebrow-rule" /> Made from your trip data</p><h3>Explain my itinerary</h3></div><button className="text-link" type="button" aria-expanded={showExplanation} onClick={() => setShowExplanation((current) => !current)}>{showExplanation ? "Hide explanation" : "See why this fits"} <span aria-hidden="true">↗</span></button>{showExplanation && <ul><li><strong>Destination fit:</strong> {trip.destination} matches your {trip.form.travelStyle.toLowerCase()} style, {trip.form.interests.join(" and ") || "open-ended"} interests, and {trip.form.region || "any-region"} preference.</li><li><strong>Order:</strong> Day one allows for travel from {trip.form.startCity}; later days follow curated local experiences at a steadier pace.</li><li><strong>Budget:</strong> This draft estimates {rupees(estimatedTotal)} against your {rupees(trip.form.budget)} maximum ({budgetUtilization}% used). Accommodation and transport preferences are included.</li><li><strong>Largest category:</strong> {biggestExpense.label} is the biggest estimate at {rupees(biggestExpense.amount)}. {lodgingSavings || transportSavings ? `Choosing a guesthouse or shared transport could save up to ${rupees(lodgingSavings + transportSavings)} in this model.` : "Your selected stay and transport are already at the lower-cost settings."}</li><li><strong>Verify before travel:</strong> Confirm opening hours, route accessibility, ferry/road access, permits, and dietary arrangements with local providers.</li><li><strong>Estimates:</strong> Prices are illustrative planning allocations, not live quotes, availability, bookings, or forecasts.</li></ul>}</section>
        <p className="estimate-footnote">All amounts are illustrative estimates in Indian rupees. Seasonal advice is general and not a weather forecast.</p>
      </section>}

      <section className="saved-section" id="saved-trips">
        <div className="saved-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> Kept on this browser</p><h2>Your <em>saved</em> journeys.</h2></div><span className="saved-count">{String(savedTrips.length).padStart(2, "0")} SAVED</span></div>
        <p className="saved-storage-note">Saved trips stay in this browser only; they do not sync across devices.</p>
        {savedTrips.length ? <div className="saved-grid">{savedTrips.map((saved) => {
          const destination = destinations.find((item) => item.name === saved.destination) ?? destinations[0];
          const total = saved.itinerary.reduce((sum, day) => sum + day.estimatedCost, 0);
          return <article className="saved-card" key={saved.id}>
            <div className="saved-image" style={{ backgroundImage: `url("${photo(destination.image, 700)}")` }} role="img" aria-label={`${saved.destination}, ${saved.state}`}>{destination.credit && <span className="photo-credit">{destination.credit}</span>}</div>
            <div className="saved-card-info"><p className="location-label">{saved.state} <span>·</span> {saved.form.days} days <span>·</span> {saved.form.month}</p>
              {renamingTripId === saved.id ? <div className="rename-trip"><label htmlFor={`rename-${saved.id}`}>Trip name</label><input id={`rename-${saved.id}`} maxLength={60} value={tripNameDraft} onChange={(event) => setTripNameDraft(event.target.value)} /><button type="button" onClick={() => renameSavedTrip(saved.id)}>Save name</button><button type="button" onClick={() => setRenamingTripId(null)}>Cancel</button></div> : <h3>{saved.name}</h3>}
              <p>{destination.name} · {rupees(total)} estimated · {saved.form.travelers} {saved.form.travelers === 1 ? "traveler" : "travelers"}</p>
              <div className="saved-actions"><button className="text-link" onClick={() => revisitTrip(saved)} type="button">Open itinerary <span aria-hidden="true">↗</span></button><button type="button" onClick={() => { setRenamingTripId(saved.id); setTripNameDraft(saved.name); }}>Rename</button><button type="button" onClick={() => duplicateSavedTrip(saved)}>Duplicate</button><button type="button" onClick={() => setPendingDeleteId(saved.id)}>Delete</button></div>
            </div>
          </article>;
        })}</div> : <div className="saved-empty"><span className="saved-empty-symbol" aria-hidden="true">✳</span><p>No journeys tucked away just yet.</p><a href="#planner">Start dreaming <span aria-hidden="true">↗</span></a></div>}
        {savedExperienceIds.length > 0 && <div className="saved-cultural-list"><p className="saved-culture-note">Saved cultural experiences in this browser</p>{experiences.filter((experience) => savedExperienceIds.includes(experience.number)).map((experience) => <article key={experience.number}><span className="location-label">{experience.kind}</span><strong>{experience.title}</strong><button type="button" onClick={() => toggleSavedExperience(experience.number)}>Remove</button><a href="#experiences">Explore <span aria-hidden="true">↗</span></a></article>)}</div>}
      </section>

      {detailDestination && <div className="modal-backdrop" onClick={() => setDetailDestination(null)}><section className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="destination-detail-title" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === "Escape") setDetailDestination(null); }}><div className="detail-hero" style={{ backgroundImage: `linear-gradient(0deg, rgba(20,38,28,.75), transparent 85%), url("${photo(detailDestination.image, 1200)}")` }}><button className="modal-close" type="button" aria-label="Close destination details" onClick={() => setDetailDestination(null)}>×</button><p className="location-label">{detailDestination.state} · {detailDestination.region}</p><h2 id="destination-detail-title">{detailDestination.name}</h2>{detailDestination.credit && <span className="photo-credit">{detailDestination.credit}</span>}</div><div className="detail-content"><p className="detail-overview">{detailDestination.description}</p><div className="detail-facts"><p><span>BEST TIME</span>{destinationDetails[detailDestination.name].bestTime}</p><p><span>SUGGESTED STAY</span>{destinationDetails[detailDestination.name].duration}</p><p><span>ROUGH DAILY RANGE</span>{rupees(destinationDetails[detailDestination.name].budgetRange[0])}–{rupees(destinationDetails[detailDestination.name].budgetRange[1])} / person</p></div><div className="detail-columns"><div><h3>Places to begin</h3><ul>{destinationDetails[detailDestination.name].highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><h3>Culture & context</h3><p>{destinationDetails[detailDestination.name].culture}</p><h3>Local table</h3><p>{detailDestination.food}</p></div><div><h3>For {form.month}</h3><p>{destinationDetails[detailDestination.name].seasons[getSeason(form.month)]}</p><p className="season-guidance">General seasonal guidance, not a live forecast.</p><h3>Practical notes</h3><ul>{destinationDetails[detailDestination.name].tips.map((tip) => <li key={tip}>{tip}</li>)}</ul><h3>Nearby ideas</h3><p>{destinationDetails[detailDestination.name].nearby.join(" · ")}</p></div></div><button className="button button-green" type="button" onClick={() => { const selected = detailDestination; setDetailDestination(null); exploreDestination(selected); }}>Add {detailDestination.name} to my trip <span aria-hidden="true">↗</span></button></div></section></div>}

      {pendingDeleteId && <div className="modal-backdrop" onClick={() => setPendingDeleteId(null)}><section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" onClick={(event) => event.stopPropagation()}><h2 id="delete-title">Delete this saved journey?</h2><p>This only removes the saved copy from this browser.</p><div><button className="button button-outline-green" type="button" onClick={() => setPendingDeleteId(null)}>Keep it</button><button className="button button-danger" type="button" onClick={confirmDeleteSavedTrip}>Delete journey</button></div></section></div>}

      <section className="closing-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(20,41,29,.83), rgba(20,41,29,.24)), url("${photo("photo-1518005020951-eccb494ad742", 1800)}")` }}><p className="eyebrow"><span className="eyebrow-rule" /> The best part is still ahead</p><h2>Leave room for<br /><em>the unexpected.</em></h2><a className="button button-light" href="#planner">Find your way in <span aria-hidden="true">↗</span></a></section>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-symbol" aria-hidden="true">B</span><span className="wordmark-type">BHARAT <span>UNBOUND</span></span></a><p>Discover India beyond the ordinary.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#destinations">Destinations</a><a href="#hidden-india">Hidden India</a><a href="#experiences">Experiences</a></div><div><span>MAKE IT YOURS</span><a href="#planner">Plan a trip</a><a href="#saved-trips">Saved journeys</a></div><div><span>THE IMPORTANT BIT</span><p>Travel costs and itineraries are estimates for inspiration only. They are not live prices, bookings, or guarantees.</p></div></div></div><div className="footer-bottom"><span>© BHARAT UNBOUND</span><span>MADE FOR THE LONG WAY ROUND.</span><a href="#home">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}