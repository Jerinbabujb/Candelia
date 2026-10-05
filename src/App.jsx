import React, { useState, useEffect, useRef } from "react";
import { Box, Copy, ScrollArea, Action, Input, Picture, Backdrop, styles, Icon, pickImage, openLink } from "./ui.jsx";
import { demoStore } from "./store.js";
import { screens } from "./screens.js";
import {
  images,
  pillars,
  fair,
  providers,
  programs,
  weddingStages,
  products,
  courses,
  revenue,
} from "./data.js";

const categoryLabels = {
  All: "All",
  beauty: "Beauty",
  health: "Health",
  fitness: "Fitness",
  fashion: "Fashion",
  wellness: "Wellness",
};
const C = {
  bg: "#F8F6F0",
  ink: "#243C30",
  muted: "#748075",
  lime: "#D9E8A2",
  line: "#E3E5DC",
  white: "#FFFFFF",
  soft: "#EDF0E6",
};
const money = (n) => `₹${n.toLocaleString("en-IN")}`;
const I = ({ name, size = 22, color = C.ink }) => (
  <Icon name={name} size={size} color={color} />
);
const P = ({ children, style }) => <Copy style={[s.p, style]}>{children}</Copy>;
const H = ({ children }) => <Copy style={s.h}>{children}</Copy>;
const Tag = ({ children, dark = false }) => (
  <Box style={[s.tag, dark && { backgroundColor: C.ink }]}>
    <Copy style={[s.tagText, dark && { color: C.lime }]}>{children}</Copy>
  </Box>
);
const Btn = ({
  children,
  onClick,
  light = false,
  disabled = false,
  testId,
}) => (
  <Action
    data-testid={testId}
    role="button"
    aria-label={typeof children === "string" ? children : undefined}
    disabled={disabled}
    onClick={onClick}
    style={({ pressed }) => [
      s.btn,
      light && s.btnLight,
      disabled && { opacity: 0.4 },
      pressed && { opacity: 0.75 },
    ]}
  >
    <Copy style={[s.btnText, light && { color: C.ink }]}>{children}</Copy>
    <I name="arrow-forward-outline" size={18} color={light ? C.ink : C.white} />
  </Action>
);
const Card = ({ children, style }) => (
  <Box style={[s.card, style]}>{children}</Box>
);
const Title = ({ eyebrow, title, sub }) => (
  <Box style={s.title}>
    <Copy style={s.eyebrow}>{eyebrow}</Copy>
    <H>{title}</H>
    {sub && <P>{sub}</P>}
  </Box>
);
const Section = ({ title, action, onClick }) => (
  <Box style={s.section}>
    <Copy style={s.sectionTitle}>{title}</Copy>
    {action && (
      <Action onClick={onClick}>
        <Copy style={s.link}>{action} →</Copy>
      </Action>
    )}
  </Box>
);
const Row = ({ title, sub, icon = "chevron-forward-outline", onClick }) => (
  <Action onClick={onClick} style={s.row}>
    <Box style={{ flex: 1 }}>
      <Copy style={s.rowTitle}>{title}</Copy>
      {sub && <P style={{ fontSize: 12, marginTop: 4 }}>{sub}</P>}
    </Box>
    <I name={icon} />
  </Action>
);
const Field = ({
  label,
  value,
  onValueChange,
  placeholder,
  multiline = false,
  keyboardType,
}) => (
  <Box style={{ marginBottom: 16 }}>
    <Copy style={s.label}>{label}</Copy>
    <Input
      aria-label={label}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      placeholderTextColor="#8C968C"
      multiline={multiline}
      keyboardType={keyboardType}
      style={[s.input, multiline && { height: 90, textAlignVertical: "top" }]}
    />
  </Box>
);
const Chips = ({ items, value, onChange }) => (
  <Box style={s.chips}>
    {items.map((x) => (
      <Action
        key={x}
        onClick={() => onChange(x)}
        style={[s.chip, value === x && s.chipActive]}
      >
        <Copy style={[s.chipText, value === x && { color: C.white }]}>{x}</Copy>
      </Action>
    ))}
  </Box>
);
const Note = ({ children }) => (
  <Box style={s.note}>
    <I name="information-circle-outline" size={17} />
    <P style={{ fontSize: 12, flex: 1 }}>{children}</P>
  </Box>
);
const Hero = ({
  image = images.hero,
  eyebrow,
  title,
  sub,
  onClick,
  button,
  height = 285,
}) => (
  <Backdrop
    source={image}
    style={[s.hero, { height }]}
    imageStyle={{ borderRadius: 24, width: "100%", height: "100%" }}
  >
    <Box style={s.heroShade} />
    <Box style={s.heroContent}>
      <Copy style={[s.eyebrow, { color: C.lime }]}>{eyebrow}</Copy>
      <Copy style={s.heroTitle}>{title}</Copy>
      {sub && <P style={{ color: "#EEF0E8", marginBottom: 10 }}>{sub}</P>}
      {button && (
        <Action onClick={onClick} style={s.heroButton}>
          <Copy style={s.heroButtonText}>{button}</Copy>
          <I name="arrow-forward-outline" size={18} />
        </Action>
      )}
    </Box>
  </Backdrop>
);
const STORAGE = "candelia.demo.v1";
const previewRoute = () => {
  const requested = new URLSearchParams(window.location.search).get("screen");
  return screens.some(s => s.id === requested) ? requested : "welcome";
};

export default function App() {
  const [route, setRoute] = useState(previewRoute() || "welcome");
  const [history, setHistory] = useState([]);
  const [tab, setTab] = useState("home");
  const scroll = useRef();
  const [state, setState] = useState({
    bookings: [],
    journey: null,
    membership: null,
    cart: [],
    savedLook: null,
    enrollments: [],
    enquiries: [],
  });
  const [ready, setReady] = useState(false);
  const [provider, setProvider] = useState(fair);
  const [category, setCategory] = useState("All");
  const [network, setNetwork] = useState("All");
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState(programs[0]);
  const [goal, setGoal] = useState("Feel confident on my wedding day");
  const [goalDate, setGoalDate] = useState("2027-04-04");
  const [budget, setBudget] = useState("Balanced");
  const [photo, setPhoto] = useState(null);
  const [styleMode, setStyleMode] = useState("Complete look");
  const [look, setLook] = useState("Modern classic");
  const [occasion, setOccasion] = useState("Wedding");
  const [aiBusy, setAiBusy] = useState(false);
  const [service, setService] = useState(fair.services[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [location, setLocation] = useState("Partner location");
  const [address, setAddress] = useState("");
  const [latestBooking, setLatestBooking] = useState(null);
  const [notice, setNotice] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [city, setCity] = useState("Trivandrum");
  const [type, setType] = useState("Salon");
  const [credentials, setCredentials] = useState("");
  const [providerTab, setProviderTab] = useState("Appointments");
  const [venue, setVenue] = useState("Home");
  useEffect(() => {
    demoStore.getItem(STORAGE)
      .then((x) => {
        if (x) {
          try {
            setState(JSON.parse(x));
          } catch {}
        }
      })
      .finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready)
      demoStore.setItem(STORAGE, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);
  useEffect(() => {
    scroll.current?.scrollTo({ top: 0, behavior: "instant" });
    setNotice("");
  }, [route]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(id);
  }, [notice]);
  const go = (r) => {
    setHistory((h) => [...h, route]);
    setRoute(r);
  };
  const back = () => {
    if (history.length) {
      setRoute(history[history.length - 1]);
      setHistory((h) => h.slice(0, -1));
    } else {
      setRoute("home");
      setTab("home");
    }
  };
  useEffect(() => {
    const navigate = (event) => {
      if (!screens.some(s => s.id === event.detail)) return;
      setHistory(h => [...h, route]);
      setRoute(event.detail);
      if (mainRoutes.includes(event.detail)) setTab(event.detail);
    };
    window.addEventListener("candelia:navigate", navigate);
    return () => window.removeEventListener("candelia:navigate", navigate);
  }, [route]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("candelia:route", { detail: route }));
    const url = new URL(window.location.href);
    url.searchParams.set("screen", route);
    window.history.replaceState(null, "", url);
  }, [route]);
  const switchTab = (r) => {
    setTab(r);
    setHistory([]);
    setRoute(r);
  };
  const selectProvider = (p) => {
    setProvider(p);
    setService(p.services[0]);
    go("provider-detail");
  };
  const chooseProgram = (p) => {
    setProgram(p);
    go("program-detail");
  };
  const bookProvider = () => {
    setDate(dates[0].value);
    setLocation(
      provider.kind === "Home service" ? "At home" : "Partner location",
    );
    go("booking");
  };
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      value: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    };
  });
  const set = (patch) => setState((old) => ({ ...old, ...patch }));
  const fairBookings = state.bookings.filter((x) => x.provider === fair.name);
  const count = state.cart.reduce((n, x) => n + x.quantity, 0);
  const total = state.cart.reduce((n, x) => n + x.quantity * x.price, 0);
  const addCart = (p) => {
    setState((old) => {
      const found = old.cart.find((x) => x.id === p.id);
      return {
        ...old,
        cart: found
          ? old.cart.map((x) =>
              x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x,
            )
          : [...old.cart, { ...p, quantity: 1 }],
      };
    });
    setNotice(`${p.name} added to bag`);
  };
  const removeCart = (id) =>
    setState((old) => ({
      ...old,
      cart: old.cart.flatMap((x) =>
        x.id !== id
          ? [x]
          : x.quantity > 1
            ? [{ ...x, quantity: x.quantity - 1 }]
            : [],
      ),
    }));
  const pickPhoto = async () => {
    try {
      const image = await pickImage();
      if (image) setPhoto(image);
    } catch (error) {
      setNotice(error.message || "Please choose an image file.");
    }
  };
  const generate = () => {
    setAiBusy(true);
    setTimeout(() => {
      setAiBusy(false);
      go("ai-result");
    }, 900);
  };
  const saveBooking = () => {
    if (location === "At home" && !address.trim()) {
      setNotice("Please enter a home, office or hotel address.");
      return;
    }
    const b = {
      id: `CD-${Date.now().toString().slice(-6)}`,
      provider: provider.name,
      service: service.name,
      date: date || dates[0].value,
      time,
      location,
      address:
        location === "At home"
          ? address
          : provider.address || "Demo partner location, Trivandrum",
      price: service.price,
      status: "Demo confirmed",
    };
    setState((old) => ({ ...old, bookings: [b, ...old.bookings] }));
    setLatestBooking(b);
    go("confirmation");
  };
  const enquiry = (kind) => {
    if (!name.trim() || !email.includes("@") || !org.trim()) {
      setNotice("Enter your name, business name and a valid email.");
      return;
    }
    setState((old) => ({
      ...old,
      enquiries: [
        ...old.enquiries,
        {
          kind,
          name,
          email,
          org,
          city,
          type,
          credentials,
          date: new Date().toISOString(),
        },
      ],
    }));
    setNotice("Enquiry saved in this demo. No message has been sent.");
  };
  const filtered = providers.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (network === "All" || p.kind === network) &&
      `${p.name} ${p.subtitle} ${p.services.map((x) => x.name).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const mainRoutes = ["home", "discover", "ai", "journey", "account"];
  const labels = {
    home: "Candelia",
    discover: "Discover",
    ai: "Style studio",
    journey: "Your journey",
    account: "Your space",
    "provider-detail": "Professional profile",
    "program-detail": "Transformation program",
    programs: "Programs",
    goal: "Define your goal",
    plan: "Your personal plan",
    booking: "Book an experience",
    confirmation: "Booking complete",
    "ai-result": "Your style concept",
    membership: "Candelia membership",
    shop: "The curated edit",
    cart: "Shopping bag",
    academy: "Candelia Academy",
    course: "Course details",
    enrollment: "Your enrolment",
    provider: "Provider workspace",
    onboarding: "Join the network",
    franchise: "Grow with Candelia",
    corporate: "Corporate wellness",
    about: "The Candelia vision",
    bookings: "Your appointments",
  };
  const renderProviders = (list) =>
    list.map((p) => (
      <Action
        key={p.id}
        onClick={() => selectProvider(p)}
        style={s.providerCard}
      >
        <Picture source={images[p.image]} style={s.providerImage} />
        <Box style={{ padding: 16 }}>
          <Box style={s.between}>
            <Tag>
              {p.id === "fair"
                ? "REAL BUSINESS · DEMO LISTING"
                : "DEMO PROVIDER"}
            </Tag>
            <I name="arrow-forward-outline" size={18} />
          </Box>
          <Copy style={s.providerName}>{p.name}</Copy>
          <P style={{ fontSize: 12 }}>{p.subtitle}</P>
          <Box style={[s.between, { marginTop: 12 }]}>
            <P style={{ fontSize: 12 }}>{p.kind}</P>
            <Copy style={s.link}>Explore →</Copy>
          </Box>
        </Box>
      </Action>
    ));
  const content = () => {
    switch (route) {
      case "welcome":
        return (
          <>
            <Backdrop
              source={images.hero}
              style={s.welcomeImage}
              imageStyle={{ width: "100%", height: "100%" }}
            >
              <Box style={s.heroShade} />
              <Box style={{ position: "absolute", top: 30, left: 26 }}>
                <Copy style={s.welcomeBrand}>
                  candelia<Copy style={{ color: C.lime }}> ✦</Copy>
                </Copy>
                <Copy style={[s.eyebrow, { color: "white", marginTop: 12 }]}>
                  LOOK GOOD. FEEL LIKE YOU.
                </Copy>
              </Box>
              <Box
                style={{
                  position: "absolute",
                  bottom: 35,
                  left: 26,
                  right: 26,
                }}
              >
                <Copy style={[s.heroTitle, { fontSize: 40, lineHeight: 44 }]}>
                  Illuminate your{"\n"}transformation.
                </Copy>
              </Box>
            </Backdrop>
            <Box style={{ padding: 26 }}>
              <P>
                Grooming, wellness, fitness, healthcare, fashion and lifestyle.
                A connected journey, built around you.
              </P>
              <Box style={[s.between, { marginVertical: 24 }]}>
                {["Discover", "Visualize", "Transform", "Maintain"].map(
                  (x, i) => (
                    <Box key={x}>
                      <Copy
                        style={{
                          color: C.muted,
                          fontSize: 10,
                          marginBottom: 7,
                        }}
                      >
                        0{i + 1}
                      </Copy>
                      <Copy
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: C.ink,
                        }}
                      >
                        {x}
                      </Copy>
                    </Box>
                  ),
                )}
              </Box>
              <Btn onClick={() => switchTab("home")}>Begin your journey</Btn>
              <P style={{ fontSize: 11, textAlign: "center", marginTop: 15 }}>
                Interactive concept · No account needed
              </P>
            </Box>
          </>
        );
      case "home":
        return (
          <>
            <Box style={[s.between, { marginBottom: 22 }]}>
              <Box>
                <Copy style={s.eyebrow}>YOUR EVERYDAY, ELEVATED</Copy>
                <H>Hello, beautiful.</H>
              </Box>
              <Action onClick={() => go("bookings")} style={s.round}>
                <I name="calendar-outline" />
              </Action>
            </Box>
            <Hero
              eyebrow="ONE PLATFORM. EVERY ASPECT OF YOU."
              title={"A little change.\nA whole new you."}
              sub="Explore your look. Build your wellbeing."
              button="Find your transformation"
              onClick={() => go("programs")}
            />
            <Box style={s.quickRow}>
              {[
                ["sparkles-outline", "Visualize", "ai"],
                ["calendar-outline", "Book", "discover"],
                ["leaf-outline", "Maintain", "membership"],
              ].map(([icon, title, r]) => (
                <Action key={r} onClick={() => go(r)} style={s.quick}>
                  <I name={icon} />
                  <Copy style={s.quickText}>{title}</Copy>
                </Action>
              ))}
            </Box>
            <Section title="Six ways to feel more you" />
            <Box style={s.grid}>
              {pillars.map((p) => (
                <Action
                  key={p.id}
                  onClick={() => {
                    if (p.id === "ai") go("ai");
                    else {
                      setCategory(p.id);
                      go("discover");
                    }
                  }}
                  style={[s.pillar, { backgroundColor: p.color }]}
                >
                  <I name={p.icon} />
                  <Copy style={s.pillarText}>{p.name}</Copy>
                  <I name="arrow-forward-outline" size={16} />
                </Action>
              ))}
            </Box>
            <Section
              title="Your salon, your starting point"
              action="See all"
              onClick={() => go("discover")}
            />
            {renderProviders([fair])}
            <Hero
              image={images.wedding}
              eyebrow="FEATURED JOURNEY"
              title="Wedding-ready, together."
              sub="Six months. One coordinated plan."
              button="Explore the program"
              onClick={() => chooseProgram(programs[0])}
              height={250}
            />
            <Section title="Beyond the appointment" />
            <Row
              title="Shop the curated edit"
              sub="Haircare, skincare, fitness, fashion & wellness"
              onClick={() => go("shop")}
            />
            <Row
              title="Candelia Academy"
              sub="Training, certification & service standards"
              onClick={() => go("academy")}
            />
          </>
        );
      case "discover":
        return (
          <>
            <Title
              eyebrow="A WORLD OF EXPERTISE"
              title="Find your people."
              sub="Explore professionals around your goals."
            />
            <Box style={s.search}>
              <I name="search-outline" size={20} />
              <Input
                aria-label="Search professionals"
                placeholder="Salons, trainers, skin, style…"
                value={search}
                onValueChange={setSearch}
                style={{ flex: 1, color: C.ink, fontSize: 14 }}
              />
            </Box>
            <ScrollArea
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              <Chips
                items={Object.values(categoryLabels)}
                value={categoryLabels[category]}
                onChange={(label) =>
                  setCategory(
                    Object.keys(categoryLabels).find(
                      (key) => categoryLabels[key] === label,
                    ),
                  )
                }
              />
            </ScrollArea>
            <Chips
              items={[
                "All",
                "Partner location",
                "Certified freelancer",
                "Home service",
              ]}
              value={network}
              onChange={setNetwork}
            />
            <P style={{ fontSize: 12, marginVertical: 12 }}>
              {filtered.length} professionals · Trivandrum
            </P>
            {category !== "All" && (
              <Card>
                <Copy style={s.rowTitle}>
                  {pillars.find((x) => x.id === category)?.name}
                </Copy>
                <P style={{ fontSize: 12, marginTop: 8 }}>
                  {pillars.find((x) => x.id === category)?.services.join(" · ")}
                </P>
              </Card>
            )}
            {filtered.length ? (
              renderProviders(filtered)
            ) : (
              <Card>
                <H>No matches yet.</H>
                <P>Try another category or search term.</P>
                <Btn
                  light
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setNetwork("All");
                  }}
                >
                  Reset filters
                </Btn>
              </Card>
            )}
            <Card style={{ backgroundColor: C.soft }}>
              <Copy style={s.rowTitle}>A network built on trust</Copy>
              <P style={{ marginTop: 8 }}>
                Partner salons, gyms, skin clinics, dental and aesthetic
                centers. Freelancers follow credential verification, skill
                assessment, brand training and continuous quality monitoring.
              </P>
            </Card>
            <Row
              title="Prefer your own space?"
              sub="Home, office & hotel visits"
              onClick={() => go("home-services")}
            />
            <Row title="Explore AI & personal style" onClick={() => go("ai")} />
            <Note>
              Fair is a real business shown for demonstration. Candelia
              partnerships and verification have not been established. Other
              profiles are fictional.
            </Note>
          </>
        );
      case "home-services":
        return (
          <>
            <Title
              eyebrow="EXPERTISE THAT COMES TO YOU"
              title="Your space. Your pace."
              sub="Haircuts, makeup, personal training, yoga, physiotherapy and nutrition consultations at home, office or hotel."
            />
            <Hero
              image={images.home}
              eyebrow="HOME SERVICES"
              title="Care, wherever you are."
              height={240}
            />
            <Section title="Choose your setting" />
            <Chips
              items={["Home", "Office", "Hotel"]}
              value={venue}
              onChange={setVenue}
            />
            {renderProviders([providers[4], providers[5]])}
            <Note>
              Service coverage, credentials and location availability are
              illustrative in this demo.
            </Note>
          </>
        );
      case "provider-detail":
        return (
          <>
            <Picture source={images[provider.image]} style={s.detailImage} />
            <Box style={[s.between, { marginTop: 18 }]}>
              <Tag>
                {provider.id === "fair"
                  ? "REAL BUSINESS · DEMO LISTING"
                  : "DEMO PROVIDER"}
              </Tag>
              <Copy style={s.link}>{provider.kind}</Copy>
            </Box>
            <H>{provider.name}</H>
            <P>{provider.subtitle}</P>
            <Section title="About the professional" />
            <P>
              {provider.about ||
                "A fictional profile demonstrating how Candelia connects you with specialists, coordinated consultations and ongoing lifestyle support."}
            </P>
            <Section title="Services" />
            <P style={{ fontSize: 11, marginBottom: 12 }}>
              Illustrative prices in INR · Not a salon quotation
            </P>
            {provider.services.map((x) => (
              <Action
                key={x.name}
                onClick={() => setService(x)}
                style={[
                  s.service,
                  service.name === x.name && {
                    borderColor: C.ink,
                    backgroundColor: C.soft,
                  },
                ]}
              >
                <Box style={{ flex: 1 }}>
                  <Copy style={s.rowTitle}>{x.name}</Copy>
                  <P style={{ fontSize: 12 }}>
                    {x.duration} · {money(x.price)} demo price
                  </P>
                </Box>
                <I
                  name={
                    service.name === x.name
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                />
              </Action>
            ))}
            <Btn onClick={bookProvider}>Choose a time</Btn>
            <Section title="Visit & contact" />
            <Card>
              <P>{provider.address || "Trivandrum · Sample service area"}</P>
              {provider.id === "fair" && (
                <>
                  <P style={{ fontSize: 12, marginTop: 12 }}>{fair.hours}</P>
                  {fair.phones.map(([label, num]) => (
                    <Row
                      key={label}
                      title={`${label}: ${num}`}
                      icon="call-outline"
                      onClick={() =>
                        openLink(`tel:${num.replace(/ /g, "")}`)
                      }
                    />
                  ))}
                  <Row
                    title="Open official website"
                    icon="open-outline"
                    onClick={() => openLink(fair.website)}
                  />
                  <Row
                    title="View on maps"
                    icon="map-outline"
                    onClick={() =>
                      openLink(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fair.formalName + " " + fair.address)}`,
                      )
                    }
                  />
                  <P style={{ fontSize: 11, marginTop: 12 }}>{fair.source}</P>
                </>
              )}
            </Card>
            <Note>
              The photo is a concept image from your deck, not a photograph of
              Fair. Booking slots, prices and any availability shown are
              simulated.
            </Note>
          </>
        );
      case "ai":
        return (
          <>
            <Title
              eyebrow="AI & PERSONAL STYLE"
              title="Meet your next look."
              sub="Explore a concept before you commit."
            />
            <Backdrop
              source={photo ? { uri: photo } : images.style}
              style={s.studioImage}
              imageStyle={{ borderRadius: 24, width: "100%", height: "100%" }}
            >
              <Box style={s.studioCaption}>
                <Tag dark>
                  {photo ? "YOUR PHOTO · LOCAL ONLY" : "SAMPLE PORTRAIT"}
                </Tag>
              </Box>
            </Backdrop>
            <Box style={{ marginTop: 14 }}>
              <Btn light onClick={pickPhoto}>
                Choose your photo
              </Btn>
            </Box>
            <Section title="What would you like to explore?" />
            <Chips
              items={[
                "Hairstyle & grooming",
                "Clothing & styling",
                "Eyewear",
                "Complete look",
              ]}
              value={styleMode}
              onChange={setStyleMode}
            />
            <Section title="Your style direction" />
            <Chips
              items={["Modern classic", "Soft natural", "Bold expression"]}
              value={look}
              onChange={setLook}
            />
            <Section title="Dress for your moment" />
            <Chips
              items={["Wedding", "Event", "Work", "Everyday"]}
              value={occasion}
              onChange={setOccasion}
            />
            <Btn disabled={aiBusy} onClick={generate}>
              {aiBusy ? "Building your concept…" : "Preview style concept"}
            </Btn>
            <Note>
              This prototype uses preset style concepts; it does not generate AI
              images. Hairstyle length, colour, beard styles, makeup, outfits
              and eyewear are intended AI features. Medical decisions remain
              with qualified professionals; AI offers concepts, not diagnoses.
            </Note>
          </>
        );
      case "ai-result":
        return (
          <>
            <Title
              eyebrow="YOUR STYLE CONCEPT"
              title={`${look}.`}
              sub={`${occasion} · ${styleMode} · Preset demonstration`}
            />
            <Picture
              source={photo ? { uri: photo } : images.hero}
              style={s.resultImage}
            />
            <P style={{ fontSize: 11, marginTop: 8 }}>
              Style reference / original photo. No digital makeover has been
              applied.
            </P>
            <Section title="A complete direction" />
            {[
              [
                "Hair & grooming",
                look === "Bold expression"
                  ? "Statement cut, rich colour and defined grooming."
                  : "Soft layers, polished styling and considered grooming.",
              ],
              [
                "Clothing",
                occasion === "Work"
                  ? "Structured separates and a calm, tonal palette."
                  : "A coordinated outfit, tailored proportions and refined accessories.",
              ],
              [
                "Skin & smile",
                "Discuss your goals with qualified skin and dental professionals.",
              ],
              ["Eyewear", "Explore frame shapes with a personal stylist."],
            ].map(([t, d]) => (
              <Card key={t}>
                <Copy style={s.rowTitle}>{t}</Copy>
                <P style={{ marginTop: 8 }}>{d}</P>
              </Card>
            ))}
            <Btn
              onClick={() => {
                set({ savedLook: { look, styleMode, occasion } });
                setNotice("Style concept saved to Your space.");
              }}
            >
              Save this concept
            </Btn>
            <Box style={{ height: 10 }} />
            <Btn
              light
              onClick={() => {
                setCategory("beauty");
                go("discover");
              }}
            >
              Find a professional
            </Btn>
            <Note>
              Future AI concepts can connect outfits to real brands and
              stylists. This is an illustrative recommendation, not a treatment
              plan or diagnosis.
            </Note>
          </>
        );
      case "programs":
        return (
          <>
            <Title
              eyebrow="GOALS, NOT JUST SERVICES"
              title="Who do you want to become?"
              sub="One objective. The right professionals. A coordinated journey."
            />
            <Hero
              image={images.wedding}
              eyebrow="FEATURED · 6 MONTHS"
              title="Your wedding transformation."
              button="Explore wedding journey"
              onClick={() => chooseProgram(programs[0])}
              height={255}
            />
            <Section title="Choose your goal" />
            {programs.map((p) => (
              <Action
                key={p.name}
                onClick={() => chooseProgram(p)}
                style={s.programRow}
              >
                <Box style={s.iconBox}>
                  <I name={p.icon} />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Copy style={s.rowTitle}>{p.name}</Copy>
                  <P style={{ fontSize: 12, marginTop: 4 }}>{p.duration}</P>
                </Box>
                <I name="chevron-forward-outline" size={18} />
              </Action>
            ))}
          </>
        );
      case "program-detail":
        return (
          <>
            <Hero
              image={
                program.name === programs[0].name
                  ? images.wedding
                  : images.lifestyle
              }
              eyebrow="CONNECTED TRANSFORMATION"
              title={program.name}
              sub={program.duration}
              height={260}
            />
            <Box style={{ marginTop: 20 }}>
              <P>{program.desc}</P>
            </Box>
            <Section title="Your coordinated support" />
            <Box style={s.chips}>
              {program.focus.map((x) => (
                <Tag key={x}>{x}</Tag>
              ))}
            </Box>
            <Section title="From possibility to progress" />
            {[
              "Define Goal",
              "AI Visual Exploration",
              "Personalized Plan",
              "Book Services",
              "Transform & Maintain",
            ].map((x, i) => (
              <Box key={x} style={s.step}>
                <Box style={s.stepNumber}>
                  <Copy style={{ color: C.ink, fontWeight: "700" }}>
                    {i + 1}
                  </Copy>
                </Box>
                <Box style={{ flex: 1 }}>
                  <Copy style={s.rowTitle}>{x}</Copy>
                  <P style={{ fontSize: 12, marginTop: 5 }}>
                    {
                      [
                        "Set outcome-focused objectives.",
                        "Discover looks via AI previews.",
                        "Receive a curated program and timeline.",
                        "Coordinate professionals seamlessly.",
                        "Deliver results and maintain your lifestyle.",
                      ][i]
                    }
                  </P>
                </Box>
              </Box>
            ))}
            {program.name === programs[0].name && (
              <>
                <Section title="The six-month wedding journey" />
                {weddingStages.map(([n, t, m, d]) => (
                  <Card key={n}>
                    <Box style={s.between}>
                      <Tag>{m}</Tag>
                      <Copy style={{ color: C.muted }}>{n}</Copy>
                    </Box>
                    <Copy style={[s.sectionTitle, { marginTop: 12 }]}>{t}</Copy>
                    <P style={{ marginTop: 7 }}>{d}</P>
                  </Card>
                ))}
              </>
            )}
            <Btn onClick={() => go("goal")}>Personalize my journey</Btn>
            <Note>
              Program details illustrate the deck's concept. Consultations and
              professional review would be required before a live program
              begins.
            </Note>
          </>
        );
      case "goal":
        return (
          <>
            <Title
              eyebrow="STEP 01 · DEFINE YOUR GOAL"
              title="Start with you."
              sub={program.name}
            />
            <Field
              label="What would you like to achieve?"
              value={goal}
              onValueChange={setGoal}
              multiline
            />
            <Field
              label="Target date (YYYY-MM-DD)"
              value={goalDate}
              onValueChange={setGoalDate}
              placeholder="2027-04-04"
            />
            <Section title="Your preferred approach" />
            <Chips
              items={["Essential", "Balanced", "Premium"]}
              value={budget}
              onChange={setBudget}
            />
            <Card>
              <Copy style={s.rowTitle}>A plan around your life</Copy>
              <P style={{ marginTop: 8 }}>
                Your goal and timeline guide coordinated consultations, AI style
                exploration, service bookings and long-term maintenance.
              </P>
            </Card>
            <Btn
              onClick={() => {
                if (
                  !goal.trim() ||
                  !/^\d{4}-\d{2}-\d{2}$/.test(goalDate) ||
                  isNaN(new Date(goalDate).getTime()) ||
                  new Date(goalDate).toISOString().slice(0, 10) !== goalDate
                ) {
                  setNotice("Enter a goal and a valid target date.");
                  return;
                }
                go("plan");
              }}
            >
              Build my demo plan
            </Btn>
          </>
        );
      case "plan":
        return (
          <>
            <Title
              eyebrow="STEP 03 · PERSONALIZED PLAN"
              title="Your path, connected."
              sub={`${program.name} · ${budget} approach`}
            />
            <Card style={{ backgroundColor: C.ink }}>
              <Copy style={[s.sectionTitle, { color: C.lime }]}>{goal}</Copy>
              <P style={{ color: "white", marginTop: 8 }}>Target: {goalDate}</P>
            </Card>
            <Note>
              This is a preset prototype plan. It requires qualified
              professional assessment and is not a clinical recommendation.
            </Note>
            {(program.name === programs[0].name
              ? weddingStages
              : [
                  [
                    "01",
                    "Assessment",
                    "Start",
                    "Discuss your objectives with qualified specialists.",
                  ],
                  [
                    "02",
                    "Personalized plan",
                    "Next",
                    "Coordinate " + program.focus.join(", ") + ".",
                  ],
                  [
                    "03",
                    "Follow-up",
                    "Ongoing",
                    "Review your experience and progress with your professionals.",
                  ],
                  [
                    "04",
                    "Maintain",
                    "Long term",
                    "Continue appropriate services and lifestyle support.",
                  ],
                ]
            ).map(([n, t, m, d]) => (
              <Box key={n} style={s.step}>
                <Box style={s.stepNumber}>
                  <Copy style={{ fontWeight: "700", color: C.ink }}>{n}</Copy>
                </Box>
                <Box style={{ flex: 1 }}>
                  <Copy style={s.rowTitle}>{t}</Copy>
                  <Copy style={[s.link, { marginTop: 5 }]}>{m}</Copy>
                  <P style={{ marginTop: 5 }}>{d}</P>
                </Box>
              </Box>
            ))}
            <Btn
              onClick={() => {
                set({
                  journey: {
                    program: program.name,
                    goal,
                    date: goalDate,
                    budget,
                    completed: [],
                  },
                });
                switchTab("journey");
              }}
            >
              Start this journey
            </Btn>
            <Box style={{ height: 10 }} />
            <Btn light onClick={() => go("ai")}>
              Explore my look first
            </Btn>
          </>
        );
      case "booking":
        return (
          <>
            <Title
              eyebrow="AN EXPERIENCE, RESERVED"
              title="Make time for yourself."
              sub={provider.name}
            />
            <Card>
              <Copy style={s.rowTitle}>{service.name}</Copy>
              <P style={{ marginTop: 8 }}>
                {service.duration} · {money(service.price)} demo price
              </P>
            </Card>
            <Section title="Choose a date" />
            <Chips
              items={dates.map((x) => x.label)}
              value={
                dates.find((x) => x.value === date)?.label || dates[0].label
              }
              onChange={(label) =>
                setDate(dates.find((x) => x.label === label).value)
              }
            />
            <Section title="Choose a time" />
            <Chips
              items={["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"]}
              value={time}
              onChange={setTime}
            />
            <Section title="Where would you like to meet?" />
            <Chips
              items={
                provider.id === "fair"
                  ? ["Partner location"]
                  : ["Partner location", "At home"]
              }
              value={location}
              onChange={setLocation}
            />
            {location === "At home" && (
              <Field
                label="Home / office / hotel address"
                value={address}
                onValueChange={setAddress}
                multiline
              />
            )}
            <Note>
              Slots and prices are illustrative. This saves a local demo booking
              and does not contact the provider or charge you.
            </Note>
            <Btn onClick={saveBooking}>Confirm demo booking</Btn>
          </>
        );
      case "confirmation": {
        const b = latestBooking ||
          state.bookings[0] || {
            id: "CD-PREVIEW",
            provider: fair.name,
            service: fair.services[0].name,
            date: dates[0].value,
            time: "10:00 AM",
            price: 1200,
          };
        return (
          <>
            <Box style={s.successIcon}>
              <I name="checkmark" size={38} />
            </Box>
            <Title
              eyebrow="SAVED IN YOUR DEMO"
              title="A moment, just for you."
              sub="Your appointment is ready to explore."
            />
            <Card>
              <Tag>DEMO CONFIRMED</Tag>
              <Copy style={[s.sectionTitle, { marginTop: 18 }]}>
                {b.service}
              </Copy>
              <P style={{ marginTop: 8 }}>{b.provider}</P>
              <Row title={`${b.date} · ${b.time}`} icon="calendar-outline" />
              <P>{b.address || fair.address}</P>
              <Box style={[s.between, { marginTop: 16 }]}>
                <P>Demo total</P>
                <Copy style={s.rowTitle}>{money(b.price)}</Copy>
              </Box>
              <P style={{ fontSize: 11, marginTop: 12 }}>
                Reference: {b.id} · No payment taken
              </P>
            </Card>
            <Btn onClick={() => go("bookings")}>View my appointments</Btn>
            <Box style={{ height: 10 }} />
            <Btn light onClick={() => switchTab("home")}>
              Back to home
            </Btn>
            <Note>
              This is not a real reservation. Contact Fair directly to make an
              actual appointment.
            </Note>
          </>
        );
      }
      case "bookings":
        return (
          <>
            <Title
              eyebrow="YOUR TIME, WELL SPENT"
              title="Your appointments."
              sub="Demo bookings saved on this device."
            />
            {!state.bookings.length ? (
              <Card>
                <I name="calendar-outline" size={35} />
                <H>Your calendar is open.</H>
                <P>Find an experience and create your first demo booking.</P>
                <Btn onClick={() => go("discover")}>Explore professionals</Btn>
              </Card>
            ) : (
              state.bookings.map((b) => (
                <Card key={b.id}>
                  <Tag>{b.status.toUpperCase()}</Tag>
                  <Copy style={[s.sectionTitle, { marginTop: 14 }]}>
                    {b.service}
                  </Copy>
                  <P style={{ marginTop: 6 }}>{b.provider}</P>
                  <P style={{ marginTop: 6 }}>
                    {b.date} · {b.time}
                  </P>
                  <P style={{ fontSize: 12, marginTop: 6 }}>{b.address}</P>
                  {b.status !== "Cancelled" && (
                    <Row
                      title="Cancel demo booking"
                      icon="close-circle-outline"
                      onClick={() =>
                        set({
                          bookings: state.bookings.map((x) =>
                            x.id === b.id ? { ...x, status: "Cancelled" } : x,
                          ),
                        })
                      }
                    />
                  )}
                </Card>
              ))
            )}
          </>
        );
      case "journey": {
        const j = state.journey;
        return (
          <>
            <Title
              eyebrow="TRANSFORM & MAINTAIN"
              title="Small steps. Lasting change."
              sub="Your goals, your professionals, your progress."
            />
            {!j ? (
              <>
                <Hero
                  image={images.lifestyle}
                  eyebrow="START YOUR NEXT CHAPTER"
                  title="A journey worth making."
                  button="Choose a transformation"
                  onClick={() => go("programs")}
                />
                <Section title="How your journey works" />
                {[
                  "Define your goal",
                  "Explore your look",
                  "Build your plan",
                  "Coordinate services",
                  "Transform and maintain",
                ].map((x, i) => (
                  <Row
                    key={x}
                    title={`0${i + 1} · ${x}`}
                    onClick={() => go("programs")}
                  />
                ))}
              </>
            ) : (
              <>
                <Card style={{ backgroundColor: C.ink }}>
                  <Copy style={[s.eyebrow, { color: C.lime }]}>
                    ACTIVE DEMO JOURNEY
                  </Copy>
                  <Copy style={[s.heroTitle, { fontSize: 28, lineHeight: 33 }]}>
                    {j.program}
                  </Copy>
                  <P style={{ color: "white", marginTop: 12 }}>{j.goal}</P>
                  <P style={{ color: "#DEE4D8", marginTop: 10 }}>
                    Target: {j.date}
                  </P>
                  <Box style={s.progressTrack}>
                    <Box
                      style={{
                        height: 6,
                        borderRadius: 6,
                        backgroundColor: C.lime,
                        width: `${(j.completed.length / 4) * 100}%`,
                      }}
                    />
                  </Box>
                  <P style={{ color: C.lime, fontSize: 12 }}>
                    {j.completed.length} of 4 milestones checked
                  </P>
                </Card>
                <Section title="Your milestones" />
                {[
                  "Initial assessment",
                  "Personalized plan",
                  "Services & follow-ups",
                  "Maintenance routine",
                ].map((x, i) => (
                  <Action
                    key={x}
                    onClick={() =>
                      set({
                        journey: {
                          ...j,
                          completed: j.completed.includes(i)
                            ? j.completed.filter((n) => n !== i)
                            : [...j.completed, i],
                        },
                      })
                    }
                    style={s.row}
                  >
                    <I
                      name={
                        j.completed.includes(i) ? "checkbox" : "square-outline"
                      }
                    />
                    <Copy style={[s.rowTitle, { flex: 1, marginLeft: 12 }]}>
                      {x}
                    </Copy>
                  </Action>
                ))}
                <Section title="Your next experience" />
                {renderProviders([fair])}
                <Btn onClick={() => go("bookings")}>View my appointments</Btn>
                <Note>
                  Milestones track demo checklist completion, not medical or
                  fitness outcomes.
                </Note>
              </>
            )}
            <Section title="Make it a lifestyle" />
            <Row
              title="Your membership"
              sub="Long-term grooming, fitness & wellness continuity"
              onClick={() => go("membership")}
            />
          </>
        );
      }
      case "membership":
        return (
          <>
            <Title
              eyebrow="MAINTAIN YOUR MOMENTUM"
              title="Belong to your better everyday."
              sub="Turn one-time experiences into long-term continuity."
            />
            {[
              [
                "Essential",
                799,
                [
                  "Grooming reminders",
                  "Member discovery",
                  "Monthly lifestyle check-in",
                ],
              ],
              [
                "Evolve",
                1499,
                [
                  "Essential benefits",
                  "Coordinated journey support",
                  "Fitness & wellness planning",
                ],
              ],
              [
                "Signature",
                2499,
                [
                  "Evolve benefits",
                  "Personal style coordination",
                  "Priority demo appointment selection",
                ],
              ],
            ].map(([t, p, benefits], i) => (
              <Card key={t} style={i === 1 ? { backgroundColor: C.ink } : null}>
                <Box style={s.between}>
                  <Copy style={[s.sectionTitle, i === 1 && { color: "white" }]}>
                    {t}
                  </Copy>
                  <Tag>{i === 1 ? "MOST POPULAR" : "MONTHLY"}</Tag>
                </Box>
                <Copy style={[s.price, i === 1 && { color: C.lime }]}>
                  {money(p)}
                  <Copy style={{ fontSize: 12 }}> / month · demo</Copy>
                </Copy>
                {benefits.map((x) => (
                  <P
                    key={x}
                    style={{
                      marginBottom: 8,
                      color: i === 1 ? "#F0F2EA" : C.muted,
                    }}
                  >
                    ✓ {x}
                  </P>
                ))}
                <Btn
                  light={i === 1}
                  onClick={() => {
                    set({ membership: t });
                    setNotice(
                      `${t} selected. No subscription or charge created.`,
                    );
                  }}
                >
                  {state.membership === t ? "Selected in demo" : `Choose ${t}`}
                </Btn>
              </Card>
            ))}
            <Note>
              Membership tiers, benefits and pricing are prototype assumptions;
              the deck specifies the recurring membership concept only.
            </Note>
          </>
        );
      case "shop":
        return (
          <>
            <Title
              eyebrow="PRODUCT COMMERCE"
              title="Good rituals start here."
              sub="Curated essentials for your look and wellbeing."
            />
            <Row
              title={`Your shopping bag (${count})`}
              icon="bag-outline"
              onClick={() => go("cart")}
            />
            <Box style={s.grid}>
              {products.map((p, i) => (
                <Box key={p.id} style={s.product}>
                  <Box
                    style={[
                      s.productArt,
                      { backgroundColor: pillars[i].color },
                    ]}
                  >
                    <Box style={s.productBottle}>
                      <I name={p.icon} size={34} />
                    </Box>
                  </Box>
                  <Copy style={s.eyebrow}>{p.category.toUpperCase()}</Copy>
                  <Copy style={s.rowTitle}>{p.name}</Copy>
                  <P style={{ marginVertical: 8 }}>{money(p.price)} · demo</P>
                  <Action onClick={() => addCart(p)} style={s.addButton}>
                    <Copy style={s.link}>Add to bag</Copy>
                    <I name="add" size={18} />
                  </Action>
                </Box>
              ))}
            </Box>
            <Note>
              Products, brands and prices are fictional. Checkout is simulated.
            </Note>
          </>
        );
      case "cart":
        return (
          <>
            <Title
              eyebrow="YOUR CURATED ESSENTIALS"
              title="A bag of good habits."
              sub={`${count} items · Prototype shopping bag`}
            />
            {state.cart.length ? (
              state.cart.map((p) => (
                <Card key={p.id}>
                  <Box style={s.between}>
                    <Box style={{ flex: 1 }}>
                      <Copy style={s.rowTitle}>{p.name}</Copy>
                      <P style={{ marginTop: 8 }}>
                        {money(p.price)} × {p.quantity}
                      </P>
                    </Box>
                    <Action
                      aria-label={`Remove one ${p.name}`}
                      onClick={() => removeCart(p.id)}
                      style={s.round}
                    >
                      <I name="remove" />
                    </Action>
                    <Action
                      aria-label={`Add one ${p.name}`}
                      onClick={() => addCart(p)}
                      style={[s.round, { marginLeft: 8 }]}
                    >
                      <I name="add" />
                    </Action>
                  </Box>
                </Card>
              ))
            ) : (
              <Card>
                <H>Your bag is waiting.</H>
                <P>Explore the edit and add an essential.</P>
                <Btn onClick={() => go("shop")}>Browse products</Btn>
              </Card>
            )}
            {!!count && (
              <>
                <Box style={[s.between, { marginVertical: 20 }]}>
                  <Copy style={s.sectionTitle}>Demo total</Copy>
                  <Copy style={s.price}>{money(total)}</Copy>
                </Box>
                <Btn
                  onClick={() => {
                    set({ cart: [] });
                    setNotice(
                      "Demo checkout completed. No order placed or payment taken.",
                    );
                  }}
                >
                  Complete demo checkout
                </Btn>
                <Note>
                  Delivery and tax rules are not implemented in this prototype.
                </Note>
              </>
            )}
          </>
        );
      case "academy":
        return (
          <>
            <Title
              eyebrow="TRAINING & CERTIFICATION"
              title="Raise the standard."
              sub="Platform-certified learning in hairstyling, grooming, beauty, hygiene and service standards."
            />
            <Hero
              image={images.academy}
              eyebrow="CANDELIA ACADEMY"
              title="Better skills. Better experiences."
              height={250}
            />
            <Section title="Explore the curriculum" />
            {courses.map((c) => (
              <Card key={c.name}>
                <Tag>{c.duration} · demo curriculum</Tag>
                <Copy style={[s.sectionTitle, { marginTop: 14 }]}>
                  {c.name}
                </Copy>
                <P style={{ marginVertical: 12 }}>{c.desc}</P>
                <Btn
                  light
                  onClick={() => {
                    setSelectedCourse(c);
                    go("course");
                  }}
                >
                  View course
                </Btn>
              </Card>
            ))}
          </>
        );
      case "course":
        return (
          <>
            <Title
              eyebrow="CANDELIA ACADEMY"
              title={selectedCourse.name}
              sub={`${selectedCourse.duration} · Illustrative curriculum`}
            />
            <Picture source={images.academy} style={s.detailImage} />
            <P style={{ marginVertical: 18 }}>{selectedCourse.desc}</P>
            <Section title="Your learning journey" />
            {[
              "Practical learning",
              "Hygiene & safety standards",
              "Skill assessment",
              "Platform certification review",
            ].map((x) => (
              <Row key={x} title={x} icon="checkmark-circle-outline" />
            ))}
            <Field label="Your name" value={name} onValueChange={setName} />
            <Field
              label="Email address"
              value={email}
              onValueChange={setEmail}
              keyboardType="email-address"
            />
            <Btn
              onClick={() => {
                if (!name.trim() || !email.includes("@")) {
                  setNotice("Enter your name and a valid email address.");
                  return;
                }
                setState((old) => ({
                  ...old,
                  enrollments: [
                    ...old.enrollments,
                    { name: selectedCourse.name, email },
                  ],
                }));
                go("enrollment");
              }}
            >
              Save demo enrolment
            </Btn>
            <Note>
              No real enrolment or certification is issued. Course lengths and
              content are illustrative.
            </Note>
          </>
        );
      case "enrollment":
        return (
          <>
            <Box style={s.successIcon}>
              <I name="school-outline" size={38} />
            </Box>
            <Title
              eyebrow="YOUR NEXT STEP"
              title="Keep growing."
              sub={`Demo enrolment saved for ${selectedCourse.name}.`}
            />
            <Card>
              <P>
                Your interest is saved on this device. Academy onboarding,
                assessments and platform certification can be connected in a
                production version.
              </P>
            </Card>
            <Btn onClick={() => go("academy")}>Back to Academy</Btn>
          </>
        );
      case "provider":
        return (
          <>
            <Title
              eyebrow="PROVIDER ECOSYSTEM"
              title="Your practice, connected."
              sub="Appointments, staff, payments, reviews and customer relationships."
            />
            <Card style={{ backgroundColor: C.ink }}>
              <Copy style={[s.eyebrow, { color: C.lime }]}>DEMO WORKSPACE</Copy>
              <Copy style={[s.sectionTitle, { color: "white", marginTop: 10 }]}>
                Candelia Salon Trivandrum
              </Copy>
              <P style={{ color: "#E3E9DE", marginTop: 8 }}>
                Illustrative dashboard · No access to Fair's systems
              </P>
              <Box style={[s.between, { marginTop: 18 }]}>
                {[
                  [
                    "Appointments",
                    fairBookings.filter((x) => x.status !== "Cancelled").length,
                  ],
                  [
                    "Demo revenue",
                    money(
                      fairBookings
                        .filter((x) => x.status !== "Cancelled")
                        .reduce((n, x) => n + x.price, 0),
                    ),
                  ],
                ].map(([a, b]) => (
                  <Box key={a}>
                    <Copy style={{ color: C.lime, fontSize: 26 }}>{b}</Copy>
                    <Copy style={{ color: "white", fontSize: 11 }}>{a}</Copy>
                  </Box>
                ))}
              </Box>
            </Card>
            <Chips
              items={[
                "Appointments",
                "Staff",
                "Payments",
                "Reviews",
                "Customers",
              ]}
              value={providerTab}
              onChange={setProviderTab}
            />
            <Section title={providerTab} />
            {providerTab === "Appointments" &&
              (fairBookings.length ? (
                fairBookings.map((b) => (
                  <Card key={b.id}>
                    <Copy style={s.rowTitle}>{b.service}</Copy>
                    <P>
                      {b.provider} · {b.date} · {b.time}
                    </P>
                    <Tag>{b.status}</Tag>
                  </Card>
                ))
              ) : (
                <Card>
                  <P>
                    No demo appointments yet. Book a service from Discover to
                    populate this dashboard.
                  </P>
                </Card>
              ))}
            {providerTab === "Staff" &&
              [
                "Senior stylist · Demo",
                "Beauty specialist · Demo",
                "Salon coordinator · Demo",
              ].map((x) => (
                <Row
                  key={x}
                  title={x}
                  sub="Available in demo roster"
                  icon="person-outline"
                />
              ))}
            {providerTab === "Payments" && (
              <Card>
                <Copy style={s.rowTitle}>No real payments collected</Copy>
                <P style={{ marginTop: 8 }}>
                  All appointment totals are illustrative. Settlement and
                  payment processing require a production integration.
                </P>
              </Card>
            )}
            {providerTab === "Reviews" && (
              <Card>
                <Tag>FICTIONAL EXAMPLE</Tag>
                <Copy style={[s.sectionTitle, { marginTop: 12 }]}>
                  A thoughtful experience
                </Copy>
                <P style={{ marginTop: 8 }}>
                  “Easy to find the right service and coordinate my next
                  appointment.”
                </P>
                <P style={{ fontSize: 11, marginTop: 8 }}>
                  Demo customer · Not a review of Fair
                </P>
              </Card>
            )}
            {providerTab === "Customers" && (
              <Card>
                <Copy style={s.rowTitle}>Demo customer</Copy>
                <P style={{ marginTop: 8 }}>
                  {fairBookings.length} appointments ·{" "}
                  {state.membership || "No"} membership
                </P>
                <P>
                  Relationship tools: history, preferences and service
                  follow-ups.
                </P>
              </Card>
            )}
            <Section title="Professional membership" />
            <Card>
              <P>
                Participating professionals can use membership plans for access
                to provider tools, training and the Candelia network. Pricing is
                to be defined.
              </P>
            </Card>
            <Row
              title="Join as a professional"
              onClick={() => go("onboarding")}
            />
          </>
        );
      case "onboarding":
        return (
          <>
            <Title
              eyebrow="CERTIFIED FREELANCERS & PARTNERS"
              title="Bring your expertise."
              sub="Partner salons, clinics, gyms and independent professionals."
            />
            {[
              "Credential verification",
              "Skill assessment",
              "Brand training",
              "Continuous quality monitoring",
            ].map((x, i) => (
              <Row
                key={x}
                title={`0${i + 1} · ${x}`}
                icon="shield-checkmark-outline"
              />
            ))}
            <Box style={{ height: 18 }} />
            <Field label="Your name" value={name} onValueChange={setName} />
            <Field
              label="Business / professional name"
              value={org}
              onValueChange={setOrg}
            />
            <Field
              label="Email address"
              value={email}
              onValueChange={setEmail}
              keyboardType="email-address"
            />
            <Chips
              items={["Salon", "Clinic", "Gym", "Freelancer"]}
              value={type}
              onChange={setType}
            />
            <Field
              label="Credentials / experience summary"
              value={credentials}
              onValueChange={setCredentials}
              multiline
            />
            <Btn onClick={() => enquiry("Professional onboarding")}>
              Save demo application
            </Btn>
            <Note>
              Saved locally. No application is submitted and no verification or
              certification is granted.
            </Note>
          </>
        );
      case "franchise":
        return (
          <>
            <Title
              eyebrow="PHYSICAL + DIGITAL GROWTH"
              title="A centre for transformation."
              sub="Expand with gyms, salons, skin clinics and diagnostic hubs, connected to digital services."
            />
            <Hero
              image={images.salon}
              eyebrow="FRANCHISE EXPANSION"
              title="Build the next starting point."
              height={240}
            />
            <Section title="Tell us about your idea" />
            <Field label="Your name" value={name} onValueChange={setName} />
            <Field label="Business name" value={org} onValueChange={setOrg} />
            <Field
              label="Email address"
              value={email}
              onValueChange={setEmail}
              keyboardType="email-address"
            />
            <Field label="City" value={city} onValueChange={setCity} />
            <Chips
              items={["Salon", "Gym", "Skin clinic", "Diagnostic hub"]}
              value={type}
              onChange={setType}
            />
            <Btn onClick={() => enquiry("Franchise")}>
              Save franchise interest
            </Btn>
            <Note>
              This demo does not offer a franchise agreement. Interest is stored
              locally.
            </Note>
          </>
        );
      case "corporate":
        return (
          <>
            <Title
              eyebrow="CORPORATE PROGRAMS"
              title="Wellbeing, at work."
              sub="B2B wellness and lifestyle programs for companies."
            />
            <Card>
              <Copy style={s.sectionTitle}>
                A coordinated workplace program
              </Copy>
              <P style={{ marginTop: 10 }}>
                Combine grooming, fitness, nutrition, wellness and personal
                image support. Shape the program around your team's goals.
              </P>
            </Card>
            <Field label="Your name" value={name} onValueChange={setName} />
            <Field label="Company name" value={org} onValueChange={setOrg} />
            <Field
              label="Email address"
              value={email}
              onValueChange={setEmail}
              keyboardType="email-address"
            />
            <Btn onClick={() => enquiry("Corporate program")}>
              Save corporate enquiry
            </Btn>
            <Note>
              Illustrative enquiry flow. No email or business request is sent.
            </Note>
          </>
        );
      case "about":
        return (
          <>
            <Title
              eyebrow="THE CANDELIA VISION"
              title="The salon is the starting point."
              sub="One platform. Your look. Your wellness. Your transformation."
            />
            <Hero
              image={images.lifestyle}
              eyebrow="ILLUMINATE YOUR TRANSFORMATION"
              title="Visualize. Plan. Experience."
              height={250}
            />
            <Section title="One platform. Every aspect of you." />
            <P>
              An AI-powered personal grooming, wellness and transformation
              ecosystem connecting customers with trusted professionals across
              beauty, fitness, healthcare, fashion and lifestyle, anchored by an
              established salon.
            </P>
            <Section title="Discover · Visualize · Transform · Maintain" />
            <P>
              Find verified professionals. Explore appearance and personal style
              with AI. Coordinate programs around your goals. Maintain your
              lifestyle through long-term membership and continuity.
            </P>
            <Section title="Six interconnected pillars" />
            {pillars.map((p) => (
              <Card key={p.id}>
                <Copy style={s.rowTitle}>{p.name}</Copy>
                <P style={{ marginTop: 8 }}>{p.services.join(", ")}.</P>
              </Card>
            ))}
            <Section title="Multiple revenue streams" />
            {[
              ...revenue,
              "Professional membership (plans for participating professionals)",
            ].map((x) => (
              <Row key={x} title={x} icon="ellipse-outline" />
            ))}
            <P style={{ marginTop: 16 }}>
              Recurring memberships convert one-time customers into long-term
              ecosystem members, supporting sustainable, compounding revenue.
            </P>
            <Section title="A connected service network" />
            <P>
              Partner locations, certified freelancers and services at home,
              office or hotel. Quality grows through training, certification,
              credential verification, skill assessment, brand training and
              ongoing monitoring.
            </P>
            <Section title="Quality, commerce & growth" />
            <P>
              Provider tools manage appointments, staff, payments, reviews and
              customer relationships. The academy develops professional
              standards. Curated commerce spans haircare, skincare, fitness
              equipment, fashion and wellness. Franchises extend the ecosystem
              into physical centres.
            </P>
            <Note>
              AI is a visualization, discovery and personalization assistant.
              Medical decisions remain with qualified professionals. AI provides
              concepts, not diagnoses.
            </Note>
            <P style={{ fontSize: 11 }}>
              Based on all 10 slides of “Illuminate your transformation”. Photos
              are concept imagery from the supplied deck.
            </P>
          </>
        );
      case "account":
        return (
          <>
            <Box style={[s.between, { marginBottom: 22 }]}>
              <Box>
                <Copy style={s.eyebrow}>YOUR LOOK. YOUR WELLNESS.</Copy>
                <H>Your space.</H>
              </Box>
              <Box style={s.avatar}>
                <Copy style={{ color: C.ink, fontSize: 22 }}>Y</Copy>
              </Box>
            </Box>
            <Card style={{ backgroundColor: C.soft }}>
              <Tag>DEMO CUSTOMER</Tag>
              <Copy style={[s.sectionTitle, { marginTop: 14 }]}>
                Your lifestyle, connected.
              </Copy>
              <P style={{ marginTop: 8 }}>
                {state.membership
                  ? `${state.membership} membership selected`
                  : "Find your long-term rhythm with Candelia."}
              </P>
            </Card>
            {[
              [
                "Your appointments",
                `${state.bookings.length} demo bookings`,
                "bookings",
              ],
              [
                "Your membership",
                "Grooming, fitness & wellness continuity",
                "membership",
              ],
              [
                "Saved style concept",
                state.savedLook
                  ? `${state.savedLook.look} · ${state.savedLook.occasion}`
                  : "Explore your next look",
                "ai-result",
              ],
              ["Shop the edit", `${count} items in your bag`, "shop"],
              [
                "Academy & certification",
                `${state.enrollments.length} demo enrolments`,
                "academy",
              ],
              [
                "Provider workspace",
                "Appointments, staff, payments, reviews & customers",
                "provider",
              ],
              [
                "Join the professional network",
                "Credential verification & onboarding",
                "onboarding",
              ],
              [
                "Corporate programs",
                "Wellness & lifestyle for companies",
                "corporate",
              ],
              [
                "Franchise opportunities",
                "Physical centres + digital ecosystem",
                "franchise",
              ],
              [
                "About Candelia",
                "The complete vision & business model",
                "about",
              ],
            ].map(([t, sub, r]) => (
              <Row key={r} title={t} sub={sub} onClick={() => go(r)} />
            ))}
            <Note>
              Demo data is saved for this browser and synced to the Node server. AI, payments,
              verification and real bookings need production integrations.
            </Note>
            <Row
              title="Reset demo data"
              icon="refresh-outline"
              onClick={() => {
                setState({
                  bookings: [],
                  journey: null,
                  membership: null,
                  cart: [],
                  savedLook: null,
                  enrollments: [],
                  enquiries: [],
                });
                setNotice("Demo data reset.");
              }}
            />
          </>
        );
      default:
        return <Title title="Welcome to Candelia" />;
    }
  };
  return (
    <>
      <Box style={s.safe} className="mobile-app">
        
        {route !== "welcome" && (
          <Box style={s.header}>
            {mainRoutes.includes(route) ? (
              <Copy style={s.brand}>
                candelia<Copy style={{ color: "#809347" }}> ✦</Copy>
              </Copy>
            ) : (
              <Action
                aria-label="Go back"
                onClick={back}
                style={s.headerBack}
              >
                <I name="arrow-back-outline" />
                <Copy style={s.headerLabel}>
                  {labels[route] || "Home services"}
                </Copy>
              </Action>
            )}
            <Action
              aria-label="Open your space"
              onClick={() => switchTab("account")}
            >
              <I name="person-circle-outline" size={28} />
            </Action>
          </Box>
        )}
        <Box
          
          style={{ flex: 1 }}
        >
          <ScrollArea
            ref={scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={
              route === "welcome" ? { paddingBottom: 15 } : s.content
            }
          >
            {content()}
          </ScrollArea>
        </Box>
        {notice && (
          <Box role="alert" style={s.toast}>
            <Copy style={{ color: "white", fontSize: 13, lineHeight: 18 }}>
              {notice}
            </Copy>
          </Box>
        )}
        {route !== "welcome" && (
          <Box style={s.tabBar}>
            {[
              ["home", "home-outline", "Home"],
              ["discover", "compass-outline", "Discover"],
              ["ai", "sparkles-outline", "Visualize"],
              ["journey", "leaf-outline", "Journey"],
              ["account", "grid-outline", "More"],
            ].map(([r, icon, label]) => (
              <Action
                key={r}
                role="button"
                aria-label={label}
                onClick={() => switchTab(r)}
                style={s.tab}
              >
                <Box
                  style={[
                    s.tabIcon,
                    (route === r ||
                      (tab === r && !mainRoutes.includes(route))) && {
                      backgroundColor: C.lime,
                    },
                  ]}
                >
                  <I name={icon} size={21} />
                </Box>
                <Copy style={s.tabLabel}>{label}</Copy>
              </Action>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}

const serif = "Georgia, serif";
const s = styles.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 65,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  brand: { fontFamily: serif, fontSize: 28, color: C.ink, letterSpacing: -1 },
  headerBack: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  headerLabel: { fontSize: 13, fontWeight: "600", color: C.ink },
  content: { padding: 22, paddingBottom: 34 },
  p: { fontSize: 14, lineHeight: 22, color: C.muted },
  h: {
    fontFamily: serif,
    fontSize: 32,
    lineHeight: 38,
    color: C.ink,
    marginTop: 6,
    marginBottom: 10,
    letterSpacing: -0.6,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.6,
    color: C.muted,
    marginBottom: 6,
  },
  title: { marginBottom: 22 },
  section: {
    marginTop: 26,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  sectionTitle: {
    fontFamily: serif,
    fontSize: 20,
    lineHeight: 25,
    color: C.ink,
  },
  link: { fontSize: 11, fontWeight: "700", color: C.ink },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  btn: {
    backgroundColor: C.ink,
    borderRadius: 15,
    paddingHorizontal: 19,
    minHeight: 53,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 5,
  },
  btnLight: { backgroundColor: C.lime },
  btnText: { color: C.white, fontSize: 13, fontWeight: "600", flexShrink: 1 },
  card: {
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.line,
    padding: 20,
    marginBottom: 14,
  },
  tag: {
    backgroundColor: C.soft,
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  tagText: { color: C.ink, fontSize: 8, fontWeight: "700", letterSpacing: 0.5 },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.soft,
    justifyContent: "center",
    alignItems: "center",
  },
  hero: { overflow: "hidden", borderRadius: 24, backgroundColor: C.ink },
  heroShade: {
    ...styles.absoluteFillObject,
    backgroundColor: "rgba(15,35,25,0.37)",
  },
  heroContent: { position: "absolute", bottom: 23, left: 23, right: 23 },
  heroTitle: {
    fontFamily: serif,
    fontSize: 34,
    lineHeight: 38,
    color: C.white,
    letterSpacing: -0.7,
    marginVertical: 8,
  },
  heroButton: {
    backgroundColor: C.lime,
    borderRadius: 12,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    gap: 18,
  },
  heroButtonText: { fontSize: 12, fontWeight: "600", color: C.ink },
  quickRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  quick: {
    flex: 1,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
  },
  quickText: { color: C.ink, fontSize: 12, fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  pillar: {
    width: "48%",
    minHeight: 126,
    borderRadius: 18,
    padding: 16,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  pillarText: {
    fontSize: 13,
    fontWeight: "600",
    color: C.ink,
    lineHeight: 18,
    marginVertical: 10,
  },
  providerCard: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: C.white,
    marginBottom: 16,
  },
  providerImage: { width: "100%", height: 165 },
  providerName: {
    fontFamily: serif,
    fontSize: 23,
    color: C.ink,
    marginTop: 13,
    marginBottom: 6,
  },
  row: {
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowTitle: { fontSize: 14, fontWeight: "600", color: C.ink, lineHeight: 20 },
  search: {
    borderWidth: 1,
    borderColor: C.line,
    backgroundColor: C.white,
    borderRadius: 14,
    minHeight: 51,
    paddingHorizontal: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: C.white,
  },
  chipActive: { backgroundColor: C.ink, borderColor: C.ink },
  chipText: { fontSize: 11, color: C.ink, fontWeight: "500" },
  note: {
    backgroundColor: C.soft,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 9,
    marginTop: 18,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  detailImage: { width: "100%", height: 225, borderRadius: 23 },
  service: {
    padding: 17,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  studioImage: { height: 325, backgroundColor: C.soft, borderRadius: 24 },
  studioCaption: { position: "absolute", left: 16, bottom: 16 },
  resultImage: { width: "100%", height: 355, borderRadius: 24 },
  step: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 37,
    height: 37,
    backgroundColor: C.lime,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  programRow: {
    padding: 18,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  iconBox: {
    width: 43,
    height: 43,
    backgroundColor: C.soft,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { fontSize: 12, fontWeight: "600", color: C.ink, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 14,
    padding: 15,
    minHeight: 50,
    color: C.ink,
    backgroundColor: C.white,
    fontSize: 14,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: C.lime,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    alignSelf: "center",
  },
  price: { fontFamily: serif, fontSize: 29, color: C.ink, marginVertical: 14 },
  progressTrack: {
    height: 6,
    backgroundColor: "#5D7063",
    borderRadius: 6,
    marginVertical: 16,
  },
  product: {
    width: "48%",
    backgroundColor: C.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.line,
    padding: 14,
    marginBottom: 2,
  },
  productArt: {
    height: 140,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  productBottle: {
    width: 64,
    height: 95,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    borderTopWidth: 1,
    borderTopColor: C.line,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabBar: {
    height: 75,
    backgroundColor: C.bg,
    borderTopWidth: 1,
    borderTopColor: C.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 3,
  },
  tab: { alignItems: "center", flex: 1, gap: 3 },
  tabIcon: { borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 },
  tabLabel: { fontSize: 9, fontWeight: "600", color: C.ink },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: C.lime,
    justifyContent: "center",
    alignItems: "center",
  },
  toast: {
    position: "absolute",
    bottom: 87,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 14,
    backgroundColor: C.ink,
    zIndex: 10,
  },
  welcomeImage: { height: 480, backgroundColor: C.ink },
  welcomeBrand: {
    fontFamily: serif,
    fontSize: 40,
    color: C.white,
    letterSpacing: -1.5,
  },
});
