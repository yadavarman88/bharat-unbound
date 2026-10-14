"use client";

import { useEffect, useState, type FormEvent } from "react";

const interests = ["Heritage", "Nature", "Food", "Hidden Gems", "Spirituality", "Photography", "Adventure", "Local Culture"];

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

const experiences = [
  { number: "01", title: "At the table", kind: "Cuisine", text: "Follow a region from its market stalls to the family kitchen. Every landscape has a flavor of its own.", image: "photo-1546833999-b9f581a1996d" },
  { number: "02", title: "Made by hand", kind: "Traditional arts", text: "Meet the potters, weavers, painters, and woodworkers keeping generations of craft in motion.", image: "photo-1452860606245-08befc0ff44b" },
  { number: "03", title: "A country in celebration", kind: "Festivals", text: "Find a season of color, music, ceremony, and community, wherever your journey takes you.", image: "photo-1533174072545-7a4b6ad7a6c3" },
  { number: "04", title: "Stories in stone", kind: "Architecture", text: "From quiet stepwells to intricate temple corridors, discover the histories held in India's built world.", image: "photo-1514222134-b57cbb8ce073" },
];

type TripForm = { startCity: string; budget: number; days: number; travelers: number; interests: string[]; style: string; destination: string };
type ItineraryDay = { day: number; title: string; morning: string; afternoon: string; evening: string; food: string; estimatedCost: number };
type SavedTrip = { id: string; destination: string; state: string; form: TripForm; itinerary: ItineraryDay[] };

const initialForm: TripForm = { startCity: "Mumbai", budget: 45000, days: 4, travelers: 2, interests: ["Heritage", "Food"], style: "A thoughtful balance", destination: "" };
const cityRegions: Record<string, string> = { Mumbai: "West India", Delhi: "North India", Bengaluru: "South India", Chennai: "South India", Kolkata: "Northeast India", Hyderabad: "South India", Pune: "West India", Ahmedabad: "West India" };
const photo = (id: string, width = 1000) => id.startsWith("http") ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const rupees = (value: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;

function buildTrip(form: TripForm): SavedTrip {
  const perPersonDay = form.budget / Math.max(form.days * form.travelers, 1);
  const destination = form.destination
    ? destinations.find((item) => item.name === form.destination) ?? destinations[0]
    : [...destinations].sort((a, b) => {
        const score = (item: Destination) => form.interests.filter((interest) => item.interests.includes(interest)).length * 4
          + (cityRegions[form.startCity] === item.region ? 2 : 0)
          + (perPersonDay >= item.daily * 1.25 ? 2 : perPersonDay >= item.daily * 0.75 ? 1 : -2)
          + (form.style === "A little more comfort" ? (item.daily < perPersonDay ? 2 : 0) : form.style === "Keep it local" ? (item.daily < 4200 ? 2 : 0) : 1);
        return score(b) - score(a);
      })[0];
  const itinerary = Array.from({ length: form.days }, (_, index) => {
    const activities = destination.days[index % destination.days.length];
    const interest = form.interests[index % Math.max(form.interests.length, 1)];
    const styleFactor = form.style === "A little more comfort" ? 1.3 : form.style === "Keep it local" ? 0.8 : 1;
    return {
      day: index + 1,
      title: ["Arrive, then take it all in", "Find your own rhythm", "A little further in", "Leave room for the unexpected"][index % 4],
      morning: `${activities[0]}${interest ? `, with time to linger over ${interest.toLowerCase()}.` : "."}`,
      afternoon: activities[1], evening: activities[2], food: destination.food,
      estimatedCost: Math.floor(Math.min(perPersonDay, destination.daily * styleFactor) * form.travelers),
    };
  });
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, destination: destination.name, state: destination.state, form: { ...form, interests: [...form.interests] }, itinerary };
}

export default function TravelExperience() {
  const [form, setForm] = useState<TripForm>(initialForm);
  const [trip, setTrip] = useState<SavedTrip | null>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [interestError, setInterestError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem("bharat-unbound-saved-trips");
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (Array.isArray(parsed)) setSavedTrips(parsed as SavedTrip[]);
        }
      } catch {
        window.localStorage.removeItem("bharat-unbound-saved-trips");
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
    setTrip(buildTrip(form));
    setNotice("");
    window.setTimeout(() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }), 80);
  }

  function saveTrip() {
    if (!trip) return;
    const isUpdate = savedTrips.some((saved) => saved.id === trip.id);
    try {
      const next = [trip, ...savedTrips.filter((saved) => saved.id !== trip.id)];
      window.localStorage.setItem("bharat-unbound-saved-trips", JSON.stringify(next));
      setSavedTrips(next);
      setNotice(`${trip.destination} is ${isUpdate ? "updated in" : "saved for"} your next daydream.`);
    } catch {
      setNotice("Browser storage is full. This journey could not be saved.");
    }
  }

  function removeSavedTrip(id: string) {
    const next = savedTrips.filter((saved) => saved.id !== id);
    try {
      window.localStorage.setItem("bharat-unbound-saved-trips", JSON.stringify(next));
      setSavedTrips(next);
    } catch {
      setNotice("This journey could not be removed from browser storage.");
    }
  }

  function exploreDestination(destination: Destination) {
    setForm((current) => ({ ...current, destination: destination.name }));
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  }

  const chosenDestination = destinations.find((item) => item.name === form.destination);

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
        <div className="destination-grid">{destinations.slice(0, 4).map((destination, index) => <article className={`destination-card destination-card-${index + 1}`} key={destination.name}><div className="destination-image" role="img" aria-label={`${destination.name}, ${destination.state}`} style={{ backgroundImage: `url("${photo(destination.image, 900)}")` }}><span className="image-index">0{index + 1}</span><span className="image-tag">{destination.tag}</span>{destination.credit && <span className="photo-credit">{destination.credit}</span>}</div><div className="destination-info"><p className="location-label">{destination.state} <span>·</span> {destination.region}</p><div className="destination-title-row"><h3>{destination.name}</h3><button className="text-link" onClick={() => exploreDestination(destination)} type="button">Explore <span aria-hidden="true">↗</span></button></div><p className="destination-description">{destination.description}</p></div></article>)}</div>
      </section>

      <section className="hidden-section" id="hidden-india"><div className="hidden-heading"><p className="eyebrow"><span className="eyebrow-rule" /> For those who wander a little further</p><h2>There is more<br />to India than <em>you know.</em></h2><p className="hidden-copy">Take the quieter road. Let the ferry, the forest track, and a local&apos;s recommendation show you the way.</p></div><div className="hidden-grid">{destinations.slice(4).map((destination, index) => <article className="hidden-card" key={destination.name}><div className="hidden-image" role="img" aria-label={`${destination.name}, ${destination.state}`} style={{ backgroundImage: `url("${photo(destination.image, 900)}")` }}><span className="image-index">0{index + 5}</span><button className="round-arrow" onClick={() => exploreDestination(destination)} type="button" aria-label={`Plan a trip to ${destination.name}`}>↗</button></div><p className="location-label">{destination.state} <span>·</span> {destination.region}</p><h3>{destination.name}</h3><p>{destination.description}</p></article>)}</div></section>

      <section className="experience-section" id="experiences"><div className="experience-topline"><p className="eyebrow"><span className="eyebrow-rule" /> The good stuff, up close</p><p>PLACE IS ONLY THE BEGINNING</p></div><div className="experience-heading"><h2>Get to know India<br /><em>by getting into it.</em></h2><p>Go beyond the itinerary. The best parts of a journey are often the ones that stay with you.</p></div><div className="experience-grid">{experiences.map((experience) => <article className="experience-card" key={experience.number}><div className="experience-image" role="img" aria-label={`${experience.kind} in India`} style={{ backgroundImage: `url("${photo(experience.image, 760)}")` }}><span>{experience.number}</span></div><p className="location-label">{experience.kind}</p><h3>{experience.title}</h3><p className="experience-description">{experience.text}</p><a className="experience-link" href="#planner">Make room for it <span aria-hidden="true">↗</span></a></article>)}</div></section>

      <section className="planner-section" id="planner"><div className="planner-intro"><p className="eyebrow"><span className="eyebrow-rule" /> Your trip, your terms</p><h2>Start with a feeling.<br /><em>We&apos;ll find the place.</em></h2><p>Tell us what sounds like you. We’ll put together a thoughtful first draft, made from local knowledge and a little room to roam.</p><div className="planner-note"><span className="planner-note-mark" aria-hidden="true">✳</span><p>No bookings. No live prices. Just a good place to start.</p></div></div>
        <form className="planner-form" onSubmit={createTrip}><div className="form-topline"><span>PLAN A JOURNEY</span><span>01 — 06</span></div><div className="form-row form-row-two"><label className="field-label">Starting city<select value={form.startCity} onChange={(event) => updateForm("startCity", event.target.value)}>{Object.keys(cityRegions).map((city) => <option key={city}>{city}</option>)}</select></label><label className="field-label">Destination <span className="optional-label">optional</span><select value={form.destination} onChange={(event) => updateForm("destination", event.target.value)}><option value="">Surprise me</option>{destinations.map((destination) => <option key={destination.name} value={destination.name}>{destination.name}</option>)}</select></label></div>
          {chosenDestination && <p className="destination-picked">A little something in mind: <strong>{chosenDestination.name}, {chosenDestination.state}</strong></p>}
          <div className="form-row form-row-three"><label className="field-label">Budget (INR)<div className="input-prefix"><span>₹</span><input type="number" min="3000" step="1000" required value={form.budget} onChange={(event) => updateForm("budget", Number(event.target.value))} aria-label="Total trip budget in Indian rupees" /></div></label><label className="field-label">How long?<div className="input-suffix"><input type="number" min="1" max="14" required value={form.days} onChange={(event) => updateForm("days", Number(event.target.value))} /><span>days</span></div></label><label className="field-label">Travelers<div className="input-suffix"><input type="number" min="1" max="12" required value={form.travelers} onChange={(event) => updateForm("travelers", Number(event.target.value))} /><span>people</span></div></label></div>
          <fieldset className="interest-fieldset"><legend>What are you drawn to? <span>Pick a few</span></legend><div className="interest-options">{interests.map((interest) => <button className={`interest-chip ${form.interests.includes(interest) ? "is-selected" : ""}`} aria-pressed={form.interests.includes(interest)} key={interest} onClick={() => toggleInterest(interest)} type="button">{form.interests.includes(interest) && <span aria-hidden="true">✓ </span>}{interest}</button>)}</div>{interestError && <p className="form-error" role="alert">{interestError}</p>}</fieldset>
          <label className="field-label travel-style-label">Your kind of travel<select value={form.style} onChange={(event) => updateForm("style", event.target.value)}><option>A thoughtful balance</option><option>Keep it local</option><option>A little more comfort</option></select></label><button className="button button-green planner-submit" type="submit">Find my kind of India <span aria-hidden="true">↗</span></button><p className="form-disclaimer">Illustrative itinerary and cost estimates only. Not a booking or price quote.</p>
        </form>
      </section>

      {trip && <section className="itinerary-section" id="itinerary" aria-live="polite"><div className="itinerary-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> A first draft, made for you</p><h2>Your days in <em>{trip.destination}.</em></h2><p className="itinerary-location">{trip.state} <span>·</span> {trip.form.days} days <span>·</span> {trip.form.travelers} {trip.form.travelers === 1 ? "traveler" : "travelers"}</p></div><button className="button button-green save-trip-button" onClick={saveTrip} type="button"><span aria-hidden="true">＋</span> Save this journey</button></div>
        {notice && <p className="notice-message" role="status">{notice}</p>}
        <div className="itinerary-summary"><div><span>YOUR STARTING BUDGET</span><strong>{rupees(trip.form.budget)}</strong></div><div><span>ESTIMATED TOTAL</span><strong>{rupees(trip.itinerary.reduce((total, day) => total + day.estimatedCost, 0))}</strong></div><div><span>INTERESTS IN THE MIX</span><strong>{trip.form.interests.join(" · ")}</strong></div><p>Estimates are illustrative, based on your inputs. Actual costs vary by season, availability, and personal choices.</p></div>
        <div className="itinerary-days">{trip.itinerary.map((day) => <article className="itinerary-day" key={`${trip.id}-${day.day}`}><div className="day-number"><span>DAY</span><strong>{String(day.day).padStart(2, "0")}</strong></div><div className="day-detail"><div className="day-title-row"><h3>{day.title}</h3><span className="day-cost">~{rupees(day.estimatedCost)} <small>/ day</small></span></div><div className="day-schedule"><p><span>MORNING</span>{day.morning}</p><p><span>AFTERNOON</span>{day.afternoon}</p><p><span>EVENING</span>{day.evening}</p><p><span>AT THE TABLE</span>{day.food}</p></div></div></article>)}</div>
        <div className="budget-optimizer"><div><p className="eyebrow"><span className="eyebrow-rule" /> Make it work for you</p><h3>A different kind of budget?</h3><p>Adjust your total and we’ll shape the days around it.</p></div><label className="budget-control"><span>Total budget <strong>{rupees(trip.form.budget)}</strong></span><input type="range" min="5000" max="200000" step="5000" value={trip.form.budget} onChange={(event) => { const updated = { ...trip.form, budget: Number(event.target.value) }; setForm(updated); setTrip({ ...buildTrip(updated), id: trip.id }); }} aria-label="Adjust your total trip budget" /><span className="range-labels"><span>₹5,000</span><span>₹2,00,000</span></span></label></div><p className="estimate-footnote">All amounts shown are illustrative estimates in Indian rupees, not live prices or booking offers.</p>
      </section>}

      <section className="saved-section" id="saved-trips"><div className="saved-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> Keep a little inspiration close</p><h2>Your <em>saved</em> journeys.</h2></div><span className="saved-count">{String(savedTrips.length).padStart(2, "0")} SAVED</span></div>{savedTrips.length ? <div className="saved-grid">{savedTrips.map((saved) => { const destination = destinations.find((item) => item.name === saved.destination) ?? destinations[0]; return <article className="saved-card" key={saved.id}><div className="saved-image" style={{ backgroundImage: `url("${photo(destination.image, 700)}")` }} role="img" aria-label={`${saved.destination}, ${saved.state}`}>{destination.credit && <span className="photo-credit">{destination.credit}</span>}</div><div className="saved-card-info"><p className="location-label">{saved.state} <span>·</span> {saved.form.days} days</p><h3>{saved.destination}</h3><p>{rupees(saved.form.budget)} · {saved.form.travelers} {saved.form.travelers === 1 ? "traveler" : "travelers"}</p><button className="text-link" onClick={() => { setTrip(saved); setForm(saved.form); window.setTimeout(() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" }), 80); }} type="button">Revisit this journey <span aria-hidden="true">↗</span></button><button className="remove-trip" onClick={() => removeSavedTrip(saved.id)} type="button" aria-label={`Remove ${saved.destination} from saved trips`}>Remove</button></div></article>; })}</div> : <div className="saved-empty"><span className="saved-empty-symbol" aria-hidden="true">✳</span><p>No journeys tucked away just yet.</p><a href="#planner">Start dreaming <span aria-hidden="true">↗</span></a></div>}</section>

      <section className="closing-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(20,41,29,.83), rgba(20,41,29,.24)), url("${photo("photo-1518005020951-eccb494ad742", 1800)}")` }}><p className="eyebrow"><span className="eyebrow-rule" /> The best part is still ahead</p><h2>Leave room for<br /><em>the unexpected.</em></h2><a className="button button-light" href="#planner">Find your way in <span aria-hidden="true">↗</span></a></section>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-symbol" aria-hidden="true">B</span><span className="wordmark-type">BHARAT <span>UNBOUND</span></span></a><p>Discover India beyond the ordinary.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#destinations">Destinations</a><a href="#hidden-india">Hidden India</a><a href="#experiences">Experiences</a></div><div><span>MAKE IT YOURS</span><a href="#planner">Plan a trip</a><a href="#saved-trips">Saved journeys</a></div><div><span>THE IMPORTANT BIT</span><p>Travel costs and itineraries are estimates for inspiration only. They are not live prices, bookings, or guarantees.</p></div></div></div><div className="footer-bottom"><span>© BHARAT UNBOUND</span><span>MADE FOR THE LONG WAY ROUND.</span><a href="#home">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}