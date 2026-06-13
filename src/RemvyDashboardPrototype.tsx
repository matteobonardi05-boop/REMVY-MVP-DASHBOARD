import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowRight,
  CakeSlice,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Edit3,
  Flower2,
  Gift,
  MapPin,
  PackageCheck,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Truck,
  UserPlus,
  Users,
} from "lucide-react";
import "./RemvyDashboardPrototype.css";

type Page = "dashboard" | "team" | "moments" | "orders" | "reports";
type ModalName = "detail" | "edit" | "employee" | "employeeMoments" | null;
type MomentType = "Birthday" | "Onboarding";
type MomentProcessId = "birthday" | "onboarding" | "workversary";

type Moment = {
  id: string;
  employee: string;
  initials: string;
  role: string;
  department: string;
  type: MomentType;
  date: string;
  day: number;
  countdown: string;
  packageName: string;
  packageMeta: string;
  supplier: string;
  shipper: string;
  location: string;
  deliveryTime: string;
  status: string;
  cost: string;
  allergens?: string;
  flowers?: string;
  notes: string;
};

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  birthday: string;
  hiring: string;
  office: string;
  status: "Covered" | "Missing data";
  personalization: string;
};

type Package = {
  id: string;
  type: MomentType;
  name: string;
  range: string;
  included: string;
  bestUse: string;
  timing: string;
  selected?: boolean;
  suppliers: string[];
  options: string[];
};

type MomentProcess = {
  id: MomentProcessId;
  title: string;
  subtitle: string;
  state: "Attivo" | "In setup" | "Da attivare";
  icon: ReactNode;
  headline: string;
  description: string;
  roadmap: { title: string; detail: string; status: "live" | "editable" | "planned" }[];
  personalization: { label: string; value: string }[];
  options: { title: string; detail: string }[];
};

const upcomingMoments: Moment[] = [
  {
    id: "m1",
    employee: "Luca Rossi",
    initials: "LR",
    role: "Product Manager",
    department: "Product",
    type: "Birthday",
    date: "12 Maggio 2026",
    day: 12,
    countdown: "2 giorni · 04h",
    packageName: "Birthday Signature",
    packageMeta: "Torta artigianale + card personalizzata",
    supplier: "Pasticceria Gamberini · Bologna",
    shipper: "Delivery Remvy Local",
    location: "Bologna HQ · Sala People",
    deliveryTime: "12 Mag · 10:30",
    status: "Da confermare",
    cost: "€48",
    allergens: "Glutine, latte, uova. Da confermare entro 48h.",
    flowers: "Non incluso",
    notes: "Preferisce messaggi sobri, firmati dal team Product.",
  },
  {
    id: "m2",
    employee: "Sara Bianchi",
    initials: "SB",
    role: "Sales Specialist",
    department: "Sales",
    type: "Onboarding",
    date: "15 Maggio 2026",
    day: 15,
    countdown: "5 giorni · 09h",
    packageName: "Branded Welcome",
    packageMeta: "Merch + card personalizzata",
    supplier: "Atelier Merch Milano",
    shipper: "DHL Business",
    location: "Milano Office · Reception",
    deliveryTime: "15 Mag · 09:00",
    status: "Pronto per approvazione",
    cost: "€65",
    flowers: "Non incluso",
    notes: "Aggiungere welcome message firmato dal manager.",
  },
  {
    id: "m3",
    employee: "Davide Serra",
    initials: "DS",
    role: "Account Executive",
    department: "Sales",
    type: "Birthday",
    date: "22 Maggio 2026",
    day: 22,
    countdown: "12 giorni · 02h",
    packageName: "Floral Birthday",
    packageMeta: "Fiori + card personalizzata",
    supplier: "Botanica Urbana · Milano",
    shipper: "Delivery Remvy Local",
    location: "Milano Office · Reception",
    deliveryTime: "22 Mag · 11:00",
    status: "Dati da completare",
    cost: "€38",
    flowers: "Bouquet stagionale chiaro con card personalizzata.",
    notes: "Manca conferma allergie e preferenza tono messaggio.",
  },
];

const pastMoments = [
  { day: 4, type: "Birthday", label: "Anna Ferrari", score: "5/5" },
  { day: 7, type: "Onboarding", label: "Tommaso Costa", score: "4/5" },
  { day: 9, type: "Birthday", label: "Giulia Mancini", score: "5/5" },
];

const futureMarkers = [
  { day: 12, type: "Birthday", label: "Luca Rossi" },
  { day: 15, type: "Onboarding", label: "Sara Bianchi" },
  { day: 22, type: "Birthday", label: "Davide Serra" },
  { day: 28, type: "Onboarding", label: "Elena Villa" },
];

const employees: Employee[] = [
  { id: "e1", name: "Luca Rossi", role: "Product Manager", department: "Product", birthday: "12 Mag", hiring: "15 Mag 2022", office: "Bologna HQ", status: "Covered", personalization: "Tono sobrio, card firmata dal team" },
  { id: "e2", name: "Sara Bianchi", role: "Sales Specialist", department: "Sales", birthday: "03 Giu", hiring: "15 Mag 2026", office: "Milano", status: "Covered", personalization: "Welcome kit branded, messaggio manager" },
  { id: "e3", name: "Anna Ferrari", role: "Designer", department: "Brand", birthday: "04 Mag", hiring: "01 Mag 2024", office: "Bologna HQ", status: "Covered", personalization: "Preferisce fiori chiari e messaggi brevi" },
  { id: "e4", name: "Davide Serra", role: "Account Executive", department: "Sales", birthday: "22 Mag", hiring: "18 Nov 2023", office: "Milano", status: "Missing data", personalization: "Allergie mancanti" },
  { id: "e5", name: "Elena Villa", role: "HR Generalist", department: "People", birthday: "28 Mag", hiring: "02 Feb 2025", office: "Bologna HQ", status: "Covered", personalization: "Gift pratici, no food" },
];

const packages: Package[] = [
  {
    id: "p1",
    type: "Birthday",
    name: "Birthday Signature",
    range: "€35-€60",
    included: "Torta artigianale + card personalizzata",
    bestUse: "Compleanni in sede con team presente",
    timing: "48h prima della consegna",
    selected: true,
    suppliers: ["Pasticceria Gamberini", "Forno Brisa", "Pasticceria Regina"],
    options: ["Cioccolato fondente", "Crema e frutti rossi", "Vaniglia e pistacchio"],
  },
  {
    id: "p2",
    type: "Birthday",
    name: "Floral Birthday",
    range: "€25-€45",
    included: "Fiori stagionali + card personalizzata",
    bestUse: "Momenti più personali o manageriali",
    timing: "72h prima della consegna",
    suppliers: ["Frida's Flowers", "Botanica Urbana", "Fiori San Luca"],
    options: ["Bouquet chiaro", "Composizione premium", "Fiori di stagione"],
  },
  {
    id: "p3",
    type: "Onboarding",
    name: "Branded Welcome",
    range: "€55-€90",
    included: "Merch + card personalizzata",
    bestUse: "Nuovi ingressi in sede o ibridi",
    timing: "5 giorni prima del day one",
    selected: true,
    suppliers: ["Atelier Merch Milano", "Studio Gadget", "Print Boutique"],
    options: ["Cappello", "T-shirt", "Felpa", "Tuta"],
  },
  {
    id: "p4",
    type: "Onboarding",
    name: "Work Essentials",
    range: "€35-€75",
    included: "Gadget aziendali + card personalizzata",
    bestUse: "Welcome kit pratico per ogni funzione",
    timing: "5 giorni prima del day one",
    suppliers: ["Atelier Merch Milano", "Studio Gadget", "Print Boutique"],
    options: ["Borraccia", "Pallina anti stress", "Porta computer", "Agenda"],
  },
];

const momentProcesses: MomentProcess[] = [
  {
    id: "birthday",
    title: "Compleanni",
    subtitle: "Gestione compleanni",
    state: "Attivo",
    icon: <CakeSlice size={20} />,
    headline: "Standardizza ogni compleanno senza perdere il tocco personale.",
    description: "Remvy gestisce calendario, scelta gift, fornitore locale, reminder di conferma, delivery e feedback.",
    roadmap: [
      { title: "7 giorni prima", detail: "Reminder al responsabile per confermare persona, sede e tono del messaggio.", status: "live" },
      { title: "5 giorni prima", detail: "Fornitore selezionato e opzioni gift bloccate in base alle regole aziendali.", status: "live" },
      { title: "48h cut-off", detail: "Ultima finestra per modifiche, allergie, card o cambio sede di consegna.", status: "editable" },
      { title: "Delivery + feedback", detail: "Consegna fisica e form breve per misurare soddisfazione del momento.", status: "planned" },
    ],
    personalization: [
      { label: "Gift logic", value: "Bakery, flowers o pacchetto personalizzato" },
      { label: "Budget", value: "Range per sede, ruolo o seniority" },
      { label: "Tone of voice", value: "Card firmata da manager o team" },
    ],
    options: [
      { title: "Bakery", detail: "Torta artigianale, gusti, dimensione, allergeni." },
      { title: "Flowers", detail: "Bouquet stagionale, card, fascia oraria." },
      { title: "Custom package", detail: "Combinazione su richiesta con supplier locali." },
    ],
  },
  {
    id: "onboarding",
    title: "Onboarding",
    subtitle: "Welcome journey",
    state: "Attivo",
    icon: <Rocket size={20} />,
    headline: "Trasforma il primo giorno in un percorso operativo già pronto.",
    description: "Welcome kit, reminder di formazione, check-in manager e gift post periodo di prova vengono orchestrati in un unico workflow.",
    roadmap: [
      { title: "Pre day-one", detail: "Conferma dati, sede, ruolo e welcome kit prima dell’arrivo.", status: "live" },
      { title: "Day one", detail: "Kit consegnato al luogo concordato con card e materiali personalizzati.", status: "live" },
      { title: "Prima settimana", detail: "Reminder corsi, documenti interni, buddy e check-in manager.", status: "editable" },
      { title: "Fine prova", detail: "Gift o messaggio di conferma dopo il periodo iniziale.", status: "planned" },
    ],
    personalization: [
      { label: "Welcome kit", value: "Merch, gadget, card e materiali utili" },
      { label: "Reminders", value: "Corsi, formazione, documenti, follow-up" },
      { label: "Approval", value: "Responsabile, HR o office manager" },
    ],
    options: [
      { title: "Merch", detail: "Cappello, t-shirt, felpa, tuta." },
      { title: "Gadget", detail: "Borraccia, agenda, porta computer, antistress." },
      { title: "Training reminders", detail: "Workflow operativo coming soon." },
    ],
  },
  {
    id: "workversary",
    title: "Workversary",
    subtitle: "Anniversari lavorativi",
    state: "In setup",
    icon: <Gift size={20} />,
    headline: "Crea una progressione coerente per ogni anniversario lavorativo.",
    description: "Definisci cosa succede a year 1, year 2 e oltre, con gift fisico o digitale, budget e messaggio standardizzabili.",
    roadmap: [
      { title: "Year 1", detail: "Primo anniversario: card personale, gadget premium o gift digitale.", status: "editable" },
      { title: "Year 2", detail: "Upgrade del riconoscimento con pacchetto fisico, esperienza o budget maggiore.", status: "editable" },
      { title: "Year 3+", detail: "Regole per milestone più rilevanti e comunicazione manageriale.", status: "planned" },
      { title: "Feedback loop", detail: "Misurazione risposta employee e ottimizzazione della policy.", status: "planned" },
    ],
    personalization: [
      { label: "Gift type", value: "Fisico, digitale o esperienza" },
      { label: "Seniority logic", value: "Year 1, Year 2, Year 3+" },
      { label: "Budget ladder", value: "Crescente per anzianità o ruolo" },
    ],
    options: [
      { title: "Year 1", detail: "Card + gadget personalizzato." },
      { title: "Year 2", detail: "Gift premium o esperienza locale." },
      { title: "Year 3+", detail: "Momento su misura con approval dedicata." },
    ],
  },
];

const completedOrders = [
  { employee: "Anna Ferrari", type: "Birthday", packageName: "Sweet & Floral", supplier: "Frida's Flowers", cost: "€52", score: "5/5" },
  { employee: "Tommaso Costa", type: "Onboarding", packageName: "Work Essentials", supplier: "Studio Gadget", cost: "€59", score: "4/5" },
  { employee: "Giulia Mancini", type: "Birthday", packageName: "Birthday Signature", supplier: "Pasticceria Regina", cost: "€46", score: "5/5" },
];

const feedback = [
  { quote: "Tempismo perfetto e messaggio molto personale", source: "Anna Ferrari · Compleanno", score: "5/5" },
  { quote: "Il welcome kit ha reso il primo giorno più strutturato", source: "Team Sales · Onboarding", score: "4/5" },
  { quote: "Consegna fluida, allergie da confermare prima", source: "People team · Compleanno", score: "4/5" },
];

const reportMonths = [
  {
    label: "Aprile 2026",
    mode: "Dati reali",
    spend: 612,
    feedback: 4.6,
    birthday: 5,
    onboarding: 1,
    items: [
      ["Momenti gestiti", "6"],
      ["Pacchetti usati", "5 compleanni · 1 onboarding"],
      ["Employee serviti", "6"],
      ["Budget usato", "€612 / €700"],
      ["Spesa sostenuta", "€612"],
      ["Spesa residua", "€0"],
      ["Tempo HR risparmiato", "5.5h"],
      ["Issue non risolte", "0"],
    ] as [string, string][],
  },
  {
    label: "Maggio 2026",
    mode: "Mese corrente",
    spend: 700,
    feedback: 4.7,
    birthday: 4,
    onboarding: 3,
    items: [
      ["Momenti gestiti", "7"],
      ["Pacchetti usati", "4 compleanni · 3 onboarding"],
      ["Employee serviti", "7"],
      ["Budget usato", "€261 / €700"],
      ["Spesa sostenuta", "€261"],
      ["Spesa pianificata", "€439"],
      ["Tempo HR risparmiato", "6.5h"],
      ["Issue non risolte", "1 allergia da confermare"],
    ] as [string, string][],
  },
  {
    label: "Giugno 2026",
    mode: "Expected data",
    spend: 690,
    feedback: 4.8,
    birthday: 5,
    onboarding: 2,
    items: [
      ["Compleanni previsti", "5"],
      ["Onboarding previsti", "2"],
      ["Pacchetti attesi", "7"],
      ["Spesa prevista", "€520-€690"],
      ["Employee serviti", "7"],
      ["Capacità fornitori", "2 pasticcerie · 1 merch partner"],
      ["Alert dati mancanti", "3 profili employee"],
    ] as [string, string][],
  },
];

const reportMomentBreakdowns = [
  [
    { type: "Compleanni", budget: 420, orders: 5, feedback: 4.7 },
    { type: "Onboarding", budget: 192, orders: 1, feedback: 4.4 },
    { type: "Anniversari", budget: 0, orders: 0, feedback: 0 },
    { type: "Milestone", budget: 0, orders: 0, feedback: 0 },
  ],
  [
    { type: "Compleanni", budget: 196, orders: 4, feedback: 4.8 },
    { type: "Onboarding", budget: 195, orders: 3, feedback: 4.6 },
    { type: "Anniversari", budget: 0, orders: 0, feedback: 0 },
    { type: "Milestone", budget: 0, orders: 0, feedback: 0 },
  ],
  [
    { type: "Compleanni", budget: 340, orders: 5, feedback: 4.8 },
    { type: "Onboarding", budget: 180, orders: 2, feedback: 4.7 },
    { type: "Anniversari", budget: 90, orders: 1, feedback: 4.6 },
    { type: "Milestone", budget: 80, orders: 1, feedback: 4.6 },
  ],
];

const upcomingOrders = [
  { employee: "Luca Rossi", type: "Birthday", packageName: "Birthday Signature", supplier: "Gamberini", location: "Bologna HQ", time: "12 Mag · 10:30", approval: "Da confermare", status: "Fornitore pronto" },
  { employee: "Sara Bianchi", type: "Onboarding", packageName: "Branded Welcome", supplier: "Atelier Merch", location: "Milano", time: "15 Mag · 09:00", approval: "In attesa HR", status: "Kit in preparazione" },
  { employee: "Davide Serra", type: "Birthday", packageName: "Sweet & Floral", supplier: "Botanica Urbana", location: "Milano", time: "22 Mag · 11:00", approval: "Allergie mancanti", status: "In attesa" },
];

export default function RemvyDashboardPrototype() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [modal, setModal] = useState<ModalName>(null);
  const [selectedMoment, setSelectedMoment] = useState<Moment>(upcomingMoments[0]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employees[0]);
  const [expandedPackage, setExpandedPackage] = useState<string>("p1");

  const openMomentModal = (name: ModalName, moment: Moment) => {
    setSelectedMoment(moment);
    setModal(name);
  };

  const openEmployeeMoments = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModal("employeeMoments");
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="rd-shell">
      <Sidebar page={page} setPage={setPage} />
      <main className="rd-main">
        <TopBar page={page} onLogout={() => setIsAuthenticated(false)} />
        <div className="rd-content">
          {page === "dashboard" && (
            <DashboardView
              openMomentModal={openMomentModal}
              openEmployeeModal={() => setModal("employee")}
            />
          )}
          {page === "team" && <TeamView openEmployeeMoments={openEmployeeMoments} />}
          {page === "moments" && (
            <MomentsView
              expandedPackage={expandedPackage}
              setExpandedPackage={setExpandedPackage}
            />
          )}
          {page === "orders" && <OrdersView />}
          {page === "reports" && <ReportsView />}
        </div>
      </main>

      {modal === "detail" && <DetailModal moment={selectedMoment} onClose={() => setModal(null)} />}
      {modal === "edit" && <EditMomentModal moment={selectedMoment} onClose={() => setModal(null)} />}
      {modal === "employee" && <EmployeeModal onClose={() => setModal(null)} />}
      {modal === "employeeMoments" && <EmployeeMomentsModal employee={selectedEmployee} onClose={() => setModal(null)} />}
    </div>
  );
}

function LoginView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="rd-shell rd-login-shell">
      <section className="rd-login-card">
        <div className="rd-login-copy">
          <div className="rd-brand rd-login-brand">
            <div className="rd-logo-orbit">
              <img src="/logo.svg" alt="Remvy" />
            </div>
            <div>
              <div className="rd-wordmark">REMVY</div>
              <div className="rd-brand-sub">Employee Moments System</div>
            </div>
          </div>

          <span className="rd-eyebrow">Client workspace</span>
          <h1>Accedi alla piattaforma Remvy.</h1>
          <p>
            Una vista operativa per capire quali momenti stanno arrivando, quali ordini sono attivi,
            quanto budget viene usato e che feedback è stato raccolto.
          </p>

          <div className="rd-login-proof">
            <div><strong>7</strong><span>momenti attivi</span></div>
            <div><strong>€700</strong><span>budget mensile</span></div>
            <div><strong>4.7/5</strong><span>feedback medio</span></div>
          </div>
        </div>

        <form
          className="rd-login-form"
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
        >
          <span className="rd-eyebrow">Demo access</span>
          <h2>Entra nella dashboard</h2>
          <label>
            Email
            <input type="email" placeholder="demo@remvy.app" defaultValue="demo@remvy.app" />
          </label>
          <label>
            Password
            <input type="password" placeholder="remvy2026" defaultValue="remvy2026" />
          </label>
          <button type="submit" className="rd-primary">
            Accedi alla piattaforma <ArrowRight size={16} />
          </button>
          <small>Accesso demo statico per presentazioni. Nessun dato reale viene salvato.</small>
        </form>
      </section>
    </div>
  );
}

function Sidebar({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const items: { id: Page; label: string; icon: ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <CalendarDays size={18} /> },
    { id: "team", label: "Team", icon: <Users size={18} /> },
    { id: "moments", label: "Momenti", icon: <Sparkles size={18} /> },
    { id: "orders", label: "Ordini", icon: <Truck size={18} /> },
    { id: "reports", label: "Report", icon: <ShieldCheck size={18} /> },
  ];

  return (
    <aside className="rd-sidebar">
      <div className="rd-brand">
        <div className="rd-logo-orbit">
          <img src="/logo.svg" alt="Remvy" />
        </div>
        <div>
          <div className="rd-wordmark">REMVY</div>
          <div className="rd-brand-sub">Employee Moments System</div>
        </div>
      </div>

      <nav className="rd-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`rd-nav-item ${page === item.id ? "is-active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="rd-pilot-card">
        <span className="rd-live-dot" />
        <p>Pilot workspace</p>
        <strong>Innovatech S.r.l.</strong>
        <small>Bologna · Milano</small>
      </div>
    </aside>
  );
}

function TopBar({ page, onLogout }: { page: Page; onLogout: () => void }) {
  const title = {
    dashboard: "Centro operativo momenti",
    team: "Registro employee",
    moments: "Momenti e pacchetti",
    orders: "Gestione ordini",
    reports: "Report mensile",
  }[page];

  return (
    <header className="rd-topbar">
      <div>
        <p>Remvy dashboard</p>
        <h1>{title}</h1>
      </div>
      <div className="rd-top-actions">
        <button className="rd-ghost">Esporta report</button>
        <button className="rd-primary"><Plus size={16} /> Nuovo momento</button>
        <button className="rd-ghost" onClick={onLogout}>Esci</button>
      </div>
    </header>
  );
}

function DashboardView({
  openMomentModal,
  openEmployeeModal,
}: {
  openMomentModal: (name: ModalName, moment: Moment) => void;
  openEmployeeModal: () => void;
}) {
  return (
    <div className="rd-page-grid">
      <section className="rd-hero-panel">
        <div className="rd-hero-copy">
          <span className="rd-eyebrow">Dashboard aziendale per gestire recognition e retention</span>
          <h2>I momenti del tuo team, tracciati e gestiti.</h2>
          <p>Compleanni, onboarding e workversary vengono configurati come processi operativi: regole, fornitori, budget, reminder, delivery e feedback restano visibili in un unico workspace.</p>
        </div>
        <div className="rd-kpi-strip">
          <MomentMixKpi />
          <SpendKpi />
        </div>
      </section>

      <section className="rd-calendar-panel">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Maggio 2026</span>
            <h3>Calendario momenti</h3>
          </div>
          <Pill tone="cyan">Oggi · 10 Mag</Pill>
        </div>
        <Calendar />
      </section>

      <section className="rd-moments-stack">
        <MomentCard moment={upcomingMoments[0]} openMomentModal={openMomentModal} />
      </section>

      <section className="rd-lower-moments">
        {upcomingMoments.slice(1, 3).map((moment) => (
          <MomentCard key={moment.id} moment={moment} openMomentModal={openMomentModal} />
        ))}
      </section>

      <TeamCoverage openEmployeeModal={openEmployeeModal} />

      <section className="rd-completed-panel">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Solo ordini eseguiti</span>
            <h3>Ordini completati</h3>
          </div>
          <Pill>3 chiusi</Pill>
        </div>
      <div className="rd-completed-list">
          {completedOrders.map((order) => (
            <div className="rd-completed-row" key={`${order.employee}-${order.packageName}`}>
              <Avatar initials={order.employee.split(" ").map((part) => part[0]).join("")} />
              <div>
                <strong>{order.employee}</strong>
                <span>{order.type === "Birthday" ? "Compleanno" : "Onboarding"} · {order.packageName}</span>
              </div>
              <small>{order.supplier}</small>
              <b>{order.cost}</b>
              <Pill tone="green">{order.score}</Pill>
            </div>
          ))}
        </div>
      </section>

      <FeedbackCarousel />
    </div>
  );
}

function MomentMixKpi() {
  return (
    <div className="rd-mini-kpi rd-moment-mix-kpi">
      <div className="rd-kpi-heading">
        <span>Processi attivi</span>
        <strong>3</strong>
      </div>
      <div className="rd-process-health">
        <div><span>Birthday</span><strong>Live</strong></div>
        <div><span>Onboarding</span><strong>Live</strong></div>
        <div><span>Workversary</span><strong>Setup</strong></div>
      </div>
    </div>
  );
}

function SpendKpi() {
  return (
    <div className="rd-mini-kpi rd-spend-kpi">
      {[
        ["Budget mese", "€700"],
        ["Speso", "€261"],
        ["Da sostenere", "€439"],
      ].map(([label, value], index) => (
        <div className="rd-spend-node" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          {index < 2 && <ArrowRight size={15} />}
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const blanks = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className="rd-calendar">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <span className="rd-weekday" key={day}>{day}</span>
      ))}
      {blanks.map((blank) => <span className="rd-day is-empty" key={`blank-${blank}`} />)}
      {days.map((day) => {
        const past = pastMoments.find((item) => item.day === day);
        const future = futureMarkers.find((item) => item.day === day);
        const isToday = day === 10;
        const event = past || future;
        return (
          <div
            className={`rd-day ${isToday ? "is-today" : ""} ${past ? "is-past" : ""} ${future ? "is-upcoming" : ""}`}
            key={day}
          >
            <span>{day}</span>
            {event && (
              <div className={`rd-marker ${event.type === "Birthday" ? "is-birthday" : "is-onboarding"}`}>
                {event.type === "Birthday" ? <CakeSlice size={13} /> : <Rocket size={13} />}
                <small>{event.label}</small>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MomentCard({
  moment,
  openMomentModal,
}: {
  moment: Moment;
  openMomentModal: (name: ModalName, moment: Moment) => void;
}) {
  const Icon = moment.type === "Birthday" ? CakeSlice : Rocket;
  const momentLabel = moment.type === "Birthday" ? "Compleanno" : "Onboarding";

  return (
    <article className="rd-moment-card">
      <div className="rd-moment-date">
        <span>May</span>
        <strong>{moment.day}</strong>
      </div>
      <div className="rd-moment-body">
        <div className="rd-moment-title">
          <div className="rd-icon-badge"><Icon size={20} /></div>
          <div>
            <span>{momentLabel}</span>
            <h3>{moment.employee}</h3>
          </div>
          <Pill tone="cyan">{moment.countdown}</Pill>
        </div>
        <div className="rd-operational-grid">
          <Info label="Kit selezionato" value={moment.packageName} sub={moment.packageMeta} />
          <Info label="Fornitore" value={moment.supplier} />
          <Info label="Consegna" value={moment.deliveryTime} sub={moment.location} />
          <Info label="Costo" value={moment.cost} />
        </div>
        <OperationalChecklist moment={moment} />
        <div className="rd-card-actions">
          <button className="rd-primary">Conferma</button>
          <button className="rd-ghost" onClick={() => openMomentModal("edit", moment)}><Edit3 size={15} /> Modifica</button>
          <button className="rd-text-btn" onClick={() => openMomentModal("detail", moment)}>Dettagli <ArrowRight size={15} /></button>
        </div>
      </div>
    </article>
  );
}

function OperationalChecklist({ moment }: { moment: Moment }) {
  const isBirthday = moment.type === "Birthday";
  const checks = [
    { icon: <Clock3 size={15} />, label: "Reminder", value: isBirthday ? "7g · 5g · 48h" : "7g · 3g · day-one" },
    { icon: <PackageCheck size={15} />, label: "Cut-off approvazione", value: isBirthday ? "48h prima" : "72h prima" },
    { icon: <MapPin size={15} />, label: "Owner operativo", value: "Remvy coordina fornitore + delivery" },
  ];

  return (
    <div className="rd-operation-strip">
      {checks.map((check) => (
        <div key={check.label}>
          <span>{check.icon}</span>
          <p>{check.label}</p>
          <strong>{check.value}</strong>
        </div>
      ))}
    </div>
  );
}

function Info({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rd-info">
      <span>{label}</span>
      <strong>{value}</strong>
      {sub && <small>{sub}</small>}
    </div>
  );
}

function TeamCoverage({ openEmployeeModal }: { openEmployeeModal: () => void }) {
  return (
    <section className="rd-coverage-panel">
      <div>
        <span className="rd-eyebrow">Copertura team</span>
        <h3>34 employee coperti</h3>
        <p>Il 92% del team ha dati sufficienti per eseguire i momenti automaticamente.</p>
      </div>
      <div className="rd-ring">
        <span>92%</span>
      </div>
      <button className="rd-primary" onClick={openEmployeeModal}><UserPlus size={16} /> Aggiungi employee</button>
    </section>
  );
}

function FeedbackCarousel() {
  return (
    <section className="rd-feedback-panel">
      <div className="rd-section-head">
        <div>
          <span className="rd-eyebrow">Raccolti dopo la consegna</span>
          <h3>Feedback</h3>
        </div>
      </div>
      <div className="rd-feedback-scroll">
        {feedback.map((item) => (
          <blockquote className="rd-feedback-card" key={item.quote}>
            <p>“{item.quote}”</p>
            <footer>
              <span>{item.source}</span>
              <Pill tone="green">{item.score}</Pill>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function TeamView({ openEmployeeMoments }: { openEmployeeMoments: (employee: Employee) => void }) {
  return (
    <section className="rd-table-panel">
      <div className="rd-section-head">
        <div>
          <span className="rd-eyebrow">Registro</span>
          <h3>Employee gestiti da Remvy</h3>
        </div>
        <Pill tone="cyan">34 totali</Pill>
      </div>
      <div className="rd-employee-table">
        <div className="rd-table-head">
          <span>Employee</span><span>Ruolo</span><span>Date</span><span>Sede</span><span>Stato</span><span />
        </div>
        {employees.map((employee) => (
          <div className="rd-table-row" key={employee.id}>
            <div className="rd-name-cell">
              <Avatar initials={employee.name.split(" ").map((part) => part[0]).join("")} />
              <div>
                <strong>{employee.name}</strong>
                <small>{employee.department}</small>
              </div>
            </div>
            <span>{employee.role}</span>
            <span>{employee.birthday} · {employee.hiring}</span>
            <span>{employee.office}</span>
            <Pill tone={employee.status === "Covered" ? "green" : "warning"}>{employee.status === "Covered" ? "Coperto" : "Dati mancanti"}</Pill>
            <button className="rd-text-btn" onClick={() => openEmployeeMoments(employee)}>Vedi momenti <ChevronRight size={15} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

function MomentsView({
  expandedPackage: _expandedPackage,
  setExpandedPackage: _setExpandedPackage,
}: {
  expandedPackage: string;
  setExpandedPackage: (id: string) => void;
}) {
  const [selectedProcess, setSelectedProcess] = useState<MomentProcessId>("birthday");
  const process = momentProcesses.find((item) => item.id === selectedProcess) ?? momentProcesses[0];

  return (
    <div className="rd-moments-page rd-moment-lab">
      <section className="rd-moment-map-panel">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Moment operating map</span>
            <h3>Configura la gestione dei momenti</h3>
            <p>Attiva un processo, definisci le regole e Remvy orchestra fornitori, reminder, delivery e feedback.</p>
          </div>
          <Pill tone="cyan">3 processi core</Pill>
        </div>

        <div className="rd-process-console">
          <div className="rd-process-switcher" aria-label="Seleziona processo momento">
            {momentProcesses.map((item) => (
              <button
                key={item.id}
                className={`rd-process-button ${item.id === selectedProcess ? "is-active" : ""}`}
                onClick={() => setSelectedProcess(item.id)}
              >
                <span>{item.icon}</span>
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
                <em>{item.state}</em>
              </button>
            ))}
          </div>

          <div className="rd-concept-map">
            <div className="rd-map-core">
              <span className="rd-live-dot" />
              <strong>Remvy OS</strong>
              <small>rules · suppliers · timing · delivery · feedback</small>
            </div>
            {process.options.map((option, index) => (
              <div className={`rd-map-node rd-map-node-${index + 1}`} key={option.title}>
                <span>{index + 1}</span>
                <strong>{option.title}</strong>
                <small>{option.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-process-detail-panel">
        <div className="rd-process-hero">
          <div className="rd-icon-badge">{process.icon}</div>
          <div>
            <span className="rd-eyebrow">{process.state}</span>
            <h3>{process.headline}</h3>
            <p>{process.description}</p>
          </div>
        </div>

        <div className="rd-roadmap-grid">
          <div className="rd-roadmap">
            {process.roadmap.map((step, index) => (
              <article className={`rd-roadmap-step is-${step.status}`} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
                <Pill tone={step.status === "live" ? "green" : step.status === "editable" ? "cyan" : "default"}>
                  {step.status === "live" ? "Live" : step.status === "editable" ? "Modificabile" : "Pianificato"}
                </Pill>
              </article>
            ))}
          </div>

          <aside className="rd-personalization-panel">
            <span className="rd-eyebrow">Personalizzazione</span>
            {process.personalization.map((item) => (
              <Info key={item.label} label={item.label} value={item.value} />
            ))}
            <button className="rd-primary">Modifica roadmap</button>
            <button className="rd-ghost">Aggiungi regola</button>
          </aside>
        </div>
      </section>
    </div>
  );
}

function PackageSection({
  title,
  description,
  packages,
  expandedPackage,
  setExpandedPackage,
}: {
  title: string;
  description: string;
  packages: Package[];
  expandedPackage: string;
  setExpandedPackage: (id: string) => void;
}) {
  return (
    <section className="rd-package-section">
      <div className="rd-section-head">
        <div>
          <span className="rd-eyebrow">Tipologia momento</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="rd-package-grid">
        {packages.map((item) => (
          <PackageCard
            key={item.id}
            item={item}
            expanded={expandedPackage === item.id}
            onExpand={() => setExpandedPackage(expandedPackage === item.id ? "" : item.id)}
          />
        ))}
      </div>
      {title === "Onboarding" && (
        <div className="rd-coming-soon-card">
          <Pill>Coming soon</Pill>
          <h4>Reminder gestione onboarding</h4>
          <p>Corsi, formazione, consigli, documenti interni, check-in manager e follow-up strutturati.</p>
        </div>
      )}
    </section>
  );
}

function PackageCard({ item, expanded, onExpand }: { item: Package; expanded: boolean; onExpand: () => void }) {
  return (
    <article className={`rd-package-card ${item.selected ? "is-selected" : ""}`}>
      <div className="rd-package-top">
        <div>
          <Pill tone={item.selected ? "cyan" : "default"}>{item.selected ? "Selezionato" : "Disponibile"}</Pill>
          <h4>{item.name}</h4>
          <p>{item.included}</p>
        </div>
        <strong>{item.range}</strong>
      </div>
      <div className="rd-package-meta">
        <Info label="Uso ideale" value={item.bestUse} />
        <Info label="Timing consegna" value={item.timing} />
      </div>
      <button className="rd-expand-btn" onClick={onExpand}>
        {expanded ? "Nascondi opzioni fornitore" : "Mostra opzioni fornitore"} <ChevronDown size={16} />
      </button>
      {expanded && (
        <SupplierSelector item={item} />
      )}
    </article>
  );
}

function SupplierSelector({ item }: { item: Package }) {
  return (
    <div className="rd-supplier-panel">
      <div>
        <span>Fornitore</span>
        <select>
          {item.suppliers.map((supplier) => <option key={supplier}>{supplier}</option>)}
        </select>
      </div>
      {item.type === "Birthday" && item.name.includes("Birthday") && (
        <>
          <div>
            <span>Gusto torta</span>
            <select>{item.options.map((option) => <option key={option}>{option}</option>)}</select>
          </div>
          <div>
            <span>Dimensione</span>
            <select><option>8 people</option><option>12 people</option><option>18 people</option></select>
          </div>
          <label>
            Note allergeni
            <input placeholder="Gluten-free request, lactose notes..." />
          </label>
        </>
      )}
      {item.type === "Birthday" && item.name.includes("Floral") && (
        <>
          <div>
            <span>Composizione fiori</span>
            <select>{item.options.map((option) => <option key={option}>{option}</option>)}</select>
          </div>
          <label>
            Card messaggio
            <input placeholder="Write message preview..." />
          </label>
          <div>
            <span>Orario consegna</span>
            <select><option>09:30</option><option>10:30</option><option>14:30</option></select>
          </div>
        </>
      )}
      {item.type === "Onboarding" && (
        <>
          <fieldset>
            <legend>{item.name === "Branded Welcome" ? "Merch aziendale" : "Gadget aziendali"}</legend>
            {item.options.map((option, index) => (
              <label key={option}><input type="checkbox" defaultChecked={index < 2} /> {option}</label>
            ))}
          </fieldset>
          <label>
            Personalizzazione
            <input placeholder="Logo, nome, ruolo o welcome message..." />
          </label>
        </>
      )}
    </div>
  );
}

function OrdersView() {
  return (
    <div className="rd-orders-page">
      <section className="rd-table-panel">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Prossimi 3 momenti</span>
            <h3>Ordini in arrivo</h3>
          </div>
        </div>
        <OrdersTable />
      </section>
      <section className="rd-shipping-panel">
        <div className="rd-section-head">
          <div>
            <span className="rd-eyebrow">Delivery live</span>
            <h3>Tracciamento spedizione</h3>
          </div>
        </div>
        <div className="rd-shipment-card">
          <div className="rd-icon-badge"><Truck size={20} /></div>
          <div>
            <strong>Welcome Kit · Sara Bianchi</strong>
            <span>DHL Business · estimated 15 Mag, 08:45-09:15</span>
          </div>
          <Pill tone="cyan">In transito</Pill>
        </div>
        <div className="rd-empty-state">
          <AlertCircle size={18} />
          Nessuna eccezione operativa rilevata.
        </div>
      </section>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="rd-orders-table">
      <div className="rd-table-head">
        <span>Employee</span><span>Momento</span><span>Pacchetto</span><span>Fornitore</span><span>Consegna</span><span>Approval</span><span>Stato</span>
      </div>
      {upcomingOrders.map((order) => (
        <div className="rd-table-row" key={`${order.employee}-${order.type}`}>
          <strong>{order.employee}</strong>
          <span>{order.type === "Birthday" ? "Compleanno" : "Onboarding"}</span>
          <span>{order.packageName}</span>
          <span>{order.supplier}</span>
          <span>{order.location} · {order.time}</span>
          <Pill tone={order.approval.includes("mancanti") ? "warning" : "default"}>{order.approval}</Pill>
          <Pill tone={order.status === "Fornitore pronto" ? "green" : "cyan"}>{order.status}</Pill>
        </div>
      ))}
    </div>
  );
}

function ReportsView() {
  const [monthIndex, setMonthIndex] = useState(1);
  const month = reportMonths[monthIndex];
  const chartItems = reportMomentBreakdowns[monthIndex];
  const maxBudget = Math.max(...chartItems.map((item) => item.budget), 1);
  const maxOrders = Math.max(...chartItems.map((item) => item.orders), 1);
  const totalOrders = chartItems.reduce((sum, item) => sum + item.orders, 0);
  const totalBudget = chartItems.reduce((sum, item) => sum + item.budget, 0);

  return (
    <div className="rd-reports-grid">
      <ReportPanel title="Budget e ordini per momento" eyebrow="Report operativo">
        <div className="rd-report-summary">
          <div><span>Ordini gestiti</span><strong>{totalOrders}</strong></div>
          <div><span>Budget allocato</span><strong>€{totalBudget}</strong></div>
          <div><span>Feedback medio</span><strong>{month.feedback}/5</strong></div>
        </div>
        <div className="rd-report-chart" aria-label="Budget speso e ordini per tipologia di momento">
          <div className="rd-chart-y-axis">
            <span>€{Math.ceil(maxBudget / 100) * 100}</span>
            <span>Budget</span>
            <span>€0</span>
          </div>
          <div className="rd-moment-chart">
            {chartItems.map((item) => (
              <MomentReportBar
                key={item.type}
                item={item}
                maxBudget={maxBudget}
                maxOrders={maxOrders}
              />
            ))}
          </div>
        </div>
        <div className="rd-report-legend">
          <span><b className="is-budget" /> Budget speso o pianificato</span>
          <span><b className="is-orders" /> Ordini per tipologia</span>
          <span><b className="is-feedback" /> Feedback medio raccolto</span>
        </div>
      </ReportPanel>

      <ReportPanel title={month.label} eyebrow={month.mode}>
        <div className="rd-month-switch">
          <button disabled={monthIndex === 0} onClick={() => setMonthIndex((value) => Math.max(0, value - 1))}>← Mese precedente</button>
          <strong>{month.label}</strong>
          <button disabled={monthIndex === reportMonths.length - 1} onClick={() => setMonthIndex((value) => Math.min(reportMonths.length - 1, value + 1))}>Mese successivo →</button>
        </div>
        <MetricList items={month.items} />
      </ReportPanel>

      <ReportPanel title="Analisi feedback" eyebrow="Qualità recognition">
        <div className="rd-analytics">
          <div><strong>{month.feedback}/5</strong><span>Feedback medio</span></div>
          <div><strong>Compleanno</strong><span>Momento più apprezzato</span></div>
          <div><strong>Birthday Signature</strong><span>Pacchetto più efficace</span></div>
          <div><strong>Allergie</strong><span>Miglioramento suggerito</span></div>
        </div>
      </ReportPanel>
    </div>
  );
}

function MomentReportBar({
  item,
  maxBudget,
  maxOrders,
}: {
  item: { type: string; budget: number; orders: number; feedback: number };
  maxBudget: number;
  maxOrders: number;
}) {
  const budgetHeight = item.budget > 0 ? `${Math.max(14, Math.round((item.budget / maxBudget) * 100))}%` : "0%";
  const orderHeight = item.orders > 0 ? `${Math.max(10, Math.round((item.orders / maxOrders) * 88))}%` : "0%";

  return (
    <div className={`rd-moment-chart-item ${item.orders === 0 ? "is-muted" : ""}`}>
      <div className="rd-chart-topline">
        <strong>€{item.budget}</strong>
        <span>{item.orders} ordini</span>
      </div>
      <div className="rd-chart-stage">
        <span className="rd-budget-bar" style={{ height: budgetHeight }} />
        <span className="rd-orders-bar" style={{ height: orderHeight }} />
        {item.feedback > 0 && (
          <span className="rd-feedback-dot" style={{ bottom: `${Math.round((item.feedback / 5) * 100)}%` }}>
            {item.feedback}
          </span>
        )}
      </div>
      <small>{item.type}</small>
    </div>
  );
}

function ReportPanel({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section className="rd-report-panel">
      <span className="rd-eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function MetricList({ items }: { items: [string, string][] }) {
  return (
    <div className="rd-metric-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function DetailModal({ moment, onClose }: { moment: Moment; onClose: () => void }) {
  return (
    <Modal title={`${moment.type === "Birthday" ? "Compleanno" : "Onboarding"} · operazione`} onClose={onClose}>
      <div className="rd-modal-grid">
        <Info label="Operazione" value={`${moment.packageName} per ${moment.employee}`} sub={moment.packageMeta} />
        <Info label="Fornitore" value={moment.supplier} />
        <Info label="Delivery operator" value={moment.shipper} />
        <Info label="Allergeni" value={moment.allergens || "Nessun food previsto"} />
        <Info label="Fiori" value={moment.flowers || "Non incluso"} />
        <Info label="Sede consegna" value={moment.location} />
        <Info label="Orario previsto" value={moment.deliveryTime} />
        <Info label="Stato attuale" value={moment.status} />
      </div>
      <div className="rd-note-box">
        <strong>Note interne</strong>
        <p>{moment.notes}</p>
      </div>
    </Modal>
  );
}

function EditMomentModal({ moment, onClose }: { moment: Moment; onClose: () => void }) {
  return (
    <Modal title={`Modifica ${moment.employee}`} onClose={onClose}>
      <form className="rd-form">
        <label>Pacchetto selezionato<select defaultValue={moment.packageName}>{packages.map((item) => <option key={item.id}>{item.name}</option>)}</select></label>
        <label>Orario consegna<input defaultValue={moment.deliveryTime} /></label>
        <label>Sede consegna<input defaultValue={moment.location} /></label>
        <label>Fornitore<input defaultValue={moment.supplier} /></label>
        <label>Gusto torta<input placeholder="Solo per pacchetti torta" defaultValue={moment.type === "Birthday" ? "Crema e frutti rossi" : ""} /></label>
        <label>Composizione fiori<input placeholder="Solo per pacchetti fiori" /></label>
        <label>Note<textarea defaultValue={moment.notes} /></label>
        <label>Stato approval<select defaultValue={moment.status}><option>Da confermare</option><option>Pronto per approvazione</option><option>Confermato</option></select></label>
        <button type="button" className="rd-primary">Salva modifiche</button>
      </form>
    </Modal>
  );
}

function EmployeeModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Aggiungi employee" onClose={onClose}>
      <form className="rd-form">
        <label>Nome<input placeholder="Sara" /></label>
        <label>Cognome<input placeholder="Bianchi" /></label>
        <label>Email<input placeholder="sara@company.it" /></label>
        <label>Ruolo<input placeholder="Sales Specialist" /></label>
        <label>Dipartimento<input placeholder="Sales" /></label>
        <label>Data compleanno<input type="date" /></label>
        <label>Data assunzione<input type="date" /></label>
        <label>Sede / luogo consegna<input placeholder="Milano Office" /></label>
        <label>Allergie o note rilevanti<textarea placeholder="Allergie, preferenze, note interne..." /></label>
        <label>Stile recognition preferito<select><option>Caldo e personale</option><option>Formale e discreto</option><option>Celebrazione di team</option></select></label>
        <button type="button" className="rd-primary">Salva employee</button>
      </form>
    </Modal>
  );
}

function EmployeeMomentsModal({ employee, onClose }: { employee: Employee; onClose: () => void }) {
  return (
    <Modal title={`${employee.name} · prossimi momenti`} onClose={onClose}>
      <div className="rd-modal-grid">
        <Info label="Prossimo compleanno" value={employee.birthday} sub="Birthday Signature selezionato" />
        <Info label="Anniversario lavorativo" value={employee.hiring} sub="Pacchetto coming soon" />
        <Info label="Stato onboarding" value={employee.name === "Sara Bianchi" ? "Settimana 1 attiva" : "Non rilevante"} />
        <Info label="Personalizzazione" value={employee.personalization} />
        <Info label="Feedback precedente" value="5/5 · Molto personale" />
        <Info label="Storico pacchetti" value="Birthday Signature · Sweet & Floral" />
      </div>
    </Modal>
  );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="rd-modal-backdrop" role="dialog" aria-modal="true">
      <div className="rd-modal">
        <div className="rd-modal-head">
          <h3>{title}</h3>
          <button onClick={onClose}>Chiudi</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return <div className="rd-avatar">{initials}</div>;
}

function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "cyan" | "green" | "warning" }) {
  return <span className={`rd-pill rd-pill-${tone}`}>{children}</span>;
}
