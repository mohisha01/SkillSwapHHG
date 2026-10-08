// SkillSwap - Comprehensive Mock & Seed Data
// Platform: Peer-to-Peer Knowledge Currency Exchange

const SEED_USERS = [
  {
    id: "user-maya",
    name: "Maya Lin",
    title: "Senior Frontend Engineer & React Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    location: "San Francisco, CA (Remote Friendly)",
    rating: 4.95,
    reviewsCount: 38,
    credits: 140,
    creditsEarned: 260,
    creditsSpent: 120,
    swapsCompleted: 26,
    hoursTaught: 32,
    badge: "Top Mentor",
    availability: "Weekday Evenings & Saturdays",
    format: "Online & In-person",
    bio: "Building web apps for 6+ years. Passionate about component architecture, state management, and modern CSS. Looking to sharpen my UI/UX design and Figma prototyping skills in exchange for React/TypeScript coaching!",
    teachingSkills: [
      { name: "React", level: "Advanced", category: "Programming", years: 5, hourlyRate: 10, demand: "High" },
      { name: "TypeScript", level: "Advanced", category: "Programming", years: 4, hourlyRate: 10, demand: "High" },
      { name: "Next.js", level: "Intermediate", category: "Programming", years: 3, hourlyRate: 10, demand: "Medium" },
      { name: "Tailwind CSS", level: "Advanced", category: "Programming", years: 4, hourlyRate: 10, demand: "High" }
    ],
    learningSkills: [
      { name: "UI/UX Design", targetLevel: "Intermediate", category: "Design", priority: "Highest" },
      { name: "Figma Prototyping", targetLevel: "Advanced", category: "Design", priority: "High" },
      { name: "Design Systems", targetLevel: "Intermediate", category: "Design", priority: "Medium" }
    ],
    reviews: [
      {
        author: "David Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "3 days ago",
        comment: "Maya is an incredible React tutor! She explained custom hooks in 30 minutes better than 3 online courses did. Swapped for Figma design systems — win-win!"
      },
      {
        author: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Super patient and hands-on. We pair-programmed a full state management flow. Highly recommended!"
      }
    ]
  },
  {
    id: "user-david",
    name: "David Chen",
    title: "Lead Product Designer @ FinTech Studio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=800&q=80",
    location: "New York, NY (Online / In-Person)",
    rating: 4.92,
    reviewsCount: 44,
    credits: 110,
    creditsEarned: 310,
    creditsSpent: 200,
    swapsCompleted: 31,
    hoursTaught: 38,
    badge: "Knowledge Sharer",
    availability: "Sundays & Flexible Evenings",
    format: "Online & In-person",
    bio: "Ex-agency design director. I teach Figma auto-layouts, micro-interactions, user research, and portfolio reviews. Seeking to learn modern React and frontend basics so I can bridge design with code!",
    teachingSkills: [
      { name: "UI/UX Design", level: "Advanced", category: "Design", years: 7, hourlyRate: 10, demand: "High" },
      { name: "Figma Prototyping", level: "Advanced", category: "Design", years: 6, hourlyRate: 10, demand: "High" },
      { name: "Design Systems", level: "Advanced", category: "Design", years: 5, hourlyRate: 10, demand: "High" },
      { name: "User Research", level: "Intermediate", category: "Design", years: 4, hourlyRate: 10, demand: "Medium" }
    ],
    learningSkills: [
      { name: "React", targetLevel: "Intermediate", category: "Programming", priority: "Highest" },
      { name: "CSS Animations", targetLevel: "Advanced", category: "Programming", priority: "High" },
      { name: "Webflow", targetLevel: "Intermediate", category: "Design", priority: "Medium" }
    ],
    reviews: [
      {
        author: "Maya Lin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "David transformed my understanding of typography hierarchy and responsive layout tokens in Figma. 10/10 swap!"
      }
    ]
  },
  {
    id: "user-elena",
    name: "Elena Rostova",
    title: "AI Researcher & Python Data Scientist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    location: "Austin, TX (Remote)",
    rating: 4.88,
    reviewsCount: 29,
    credits: 95,
    creditsEarned: 190,
    creditsSpent: 95,
    swapsCompleted: 19,
    hoursTaught: 24,
    badge: "Top Mentor",
    availability: "Weekday Mornings & Weekends",
    format: "Online",
    bio: "PhD in Computational Stats. I teach Python, Pandas, PyTorch, and prompt engineering from foundational principles. Wanting to exchange for video editing and content creation to launch my technical YouTube channel!",
    teachingSkills: [
      { name: "Python", level: "Advanced", category: "Programming", years: 6, hourlyRate: 10, demand: "High" },
      { name: "Data Science & Pandas", level: "Advanced", category: "Programming", years: 5, hourlyRate: 10, demand: "High" },
      { name: "Machine Learning Basics", level: "Advanced", category: "Programming", years: 4, hourlyRate: 10, demand: "High" },
      { name: "Prompt Engineering", level: "Intermediate", category: "Programming", years: 2, hourlyRate: 10, demand: "High" }
    ],
    learningSkills: [
      { name: "Video Editing", targetLevel: "Intermediate", category: "Video & Media", priority: "Highest" },
      { name: "Premiere Pro / DaVinci", targetLevel: "Intermediate", category: "Video & Media", priority: "High" },
      { name: "Public Speaking", targetLevel: "Beginner", category: "Business", priority: "Medium" }
    ],
    reviews: [
      {
        author: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "4 days ago",
        comment: "Elena broke down vector embeddings in 45 minutes with clear interactive notebooks. Amazing teacher!"
      }
    ]
  },
  {
    id: "user-marcus",
    name: "Marcus Vance",
    title: "Cinematographer & DaVinci Resolve Colorist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    location: "Los Angeles, CA (Online & In-person)",
    rating: 4.96,
    reviewsCount: 52,
    credits: 180,
    creditsEarned: 420,
    creditsSpent: 240,
    swapsCompleted: 42,
    hoursTaught: 50,
    badge: "Community Builder",
    availability: "Flexible Afternoons & Evenings",
    format: "Online & In-person",
    bio: "Independent filmmaker with 8 years of storytelling experience. Teaching video pacing, color grading, sound design, and YouTube workflow. Eager to learn Python automation and AI scripts for automating video asset generation!",
    teachingSkills: [
      { name: "Video Editing", level: "Advanced", category: "Video & Media", years: 8, hourlyRate: 10, demand: "High" },
      { name: "Premiere Pro / DaVinci", level: "Advanced", category: "Video & Media", years: 7, hourlyRate: 10, demand: "High" },
      { name: "Color Grading", level: "Advanced", category: "Video & Media", years: 6, hourlyRate: 10, demand: "Medium" },
      { name: "Sound Design", level: "Intermediate", category: "Video & Media", years: 4, hourlyRate: 10, demand: "Medium" }
    ],
    learningSkills: [
      { name: "Python", targetLevel: "Beginner", category: "Programming", priority: "Highest" },
      { name: "Prompt Engineering", targetLevel: "Intermediate", category: "Programming", priority: "High" },
      { name: "Digital Marketing", targetLevel: "Intermediate", category: "Marketing", priority: "Medium" }
    ],
    reviews: [
      {
        author: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Marcus showed me how to color grade my food travel videos in DaVinci. Night and day difference!"
      }
    ]
  },
  {
    id: "user-sarah",
    name: "Sarah Jenkins",
    title: "Growth Marketer & SEO Strategist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    location: "Chicago, IL (Online)",
    rating: 4.84,
    reviewsCount: 22,
    credits: 80,
    creditsEarned: 150,
    creditsSpent: 70,
    swapsCompleted: 15,
    hoursTaught: 18,
    badge: "Skill Explorer",
    availability: "Tuesdays, Thursdays & Weekends",
    format: "Online",
    bio: "Scaled 4 SaaS products from 0 to 100K organic visits. Teaching content marketing, technical SEO, conversion rate optimization, and LinkedIn branding. Looking to learn photography for lifestyle brand shoots!",
    teachingSkills: [
      { name: "Digital Marketing", level: "Advanced", category: "Marketing", years: 5, hourlyRate: 10, demand: "High" },
      { name: "Technical SEO", level: "Advanced", category: "Marketing", years: 6, hourlyRate: 10, demand: "High" },
      { name: "Conversion Rate Opt", level: "Intermediate", category: "Marketing", years: 4, hourlyRate: 10, demand: "Medium" },
      { name: "Copywriting", level: "Advanced", category: "Marketing", years: 5, hourlyRate: 10, demand: "High" }
    ],
    learningSkills: [
      { name: "Photography", targetLevel: "Intermediate", category: "Photography", priority: "Highest" },
      { name: "Lightroom Editing", targetLevel: "Intermediate", category: "Photography", priority: "High" },
      { name: "UI/UX Design", targetLevel: "Beginner", category: "Design", priority: "Medium" }
    ],
    reviews: [
      {
        author: "Kenji Sato",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "Her SEO audit framework unlocked our top ranking keywords within two weeks. Absolutely top tier."
      }
    ]
  },
  {
    id: "user-kenji",
    name: "Kenji Sato",
    title: "Portrait & Street Photographer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    location: "Seattle, WA (In-person & Online)",
    rating: 4.98,
    reviewsCount: 61,
    credits: 220,
    creditsEarned: 510,
    creditsSpent: 290,
    swapsCompleted: 51,
    hoursTaught: 64,
    badge: "Top Mentor",
    availability: "Weekends & Golden Hour Sessions",
    format: "Online & In-person",
    bio: "Published photographer with work featured in Tokyo & PNW exhibitions. Master camera manual mode, composition, natural lighting, and Lightroom presets. Want to learn digital marketing to expand my print shop!",
    teachingSkills: [
      { name: "Photography", level: "Advanced", category: "Photography", years: 9, hourlyRate: 10, demand: "High" },
      { name: "Lightroom Editing", level: "Advanced", category: "Photography", years: 8, hourlyRate: 10, demand: "High" },
      { name: "Portrait Lighting", level: "Advanced", category: "Photography", years: 7, hourlyRate: 10, demand: "Medium" },
      { name: "Street Photography", level: "Advanced", category: "Photography", years: 9, hourlyRate: 10, demand: "Medium" }
    ],
    learningSkills: [
      { name: "Digital Marketing", targetLevel: "Advanced", category: "Marketing", priority: "Highest" },
      { name: "E-Commerce Setup", targetLevel: "Intermediate", category: "Business", priority: "High" },
      { name: "React", targetLevel: "Beginner", category: "Programming", priority: "Low" }
    ],
    reviews: [
      {
        author: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Kenji taught me how to read light like a painter. My product photos look like studio magazine covers now!"
      }
    ]
  },
  {
    id: "user-aisha",
    name: "Aisha Patel",
    title: "Startup Pitch Coach & Public Speaker",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    cover: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    location: "Boston, MA (Online)",
    rating: 4.90,
    reviewsCount: 33,
    credits: 130,
    creditsEarned: 280,
    creditsSpent: 150,
    swapsCompleted: 28,
    hoursTaught: 34,
    badge: "Knowledge Sharer",
    availability: "Mondays, Wednesdays & Fridays",
    format: "Online",
    bio: "Former TEDx curator and Y Combinator pitch mentor. I coach stage presence, story crafting, and overcoming public speaking anxiety. Looking to swap for Python data analysis to understand customer metrics!",
    teachingSkills: [
      { name: "Public Speaking", level: "Advanced", category: "Business", years: 8, hourlyRate: 10, demand: "High" },
      { name: "Pitch Deck Storytelling", level: "Advanced", category: "Business", years: 6, hourlyRate: 10, demand: "High" },
      { name: "Negotiation", level: "Intermediate", category: "Business", years: 5, hourlyRate: 10, demand: "Medium" }
    ],
    learningSkills: [
      { name: "Python", targetLevel: "Intermediate", category: "Programming", priority: "Highest" },
      { name: "Data Science & Pandas", targetLevel: "Beginner", category: "Programming", priority: "High" },
      { name: "Figma Prototyping", targetLevel: "Beginner", category: "Design", priority: "Medium" }
    ],
    reviews: [
      {
        author: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "Aisha transformed my technical conference paper presentation into an engaging keynote story. Outstanding!"
      }
    ]
  }
];

// Current logged in active user (Default: Maya Lin)
const DEFAULT_ACTIVE_USER_ID = "user-maya";

// Pre-defined AI Reciprocal Matches relative to default user (Maya Lin: Teaches React, Wants UI/UX)
const SEED_AI_MATCHES = [
  {
    id: "match-1",
    targetUserId: "user-david",
    matchScore: 96,
    synergyScore: 98,
    availabilityScore: 94,
    styleScore: 96,
    teachSkill: "React",
    learnSkill: "UI/UX Design",
    reason: "You want to learn UI/UX Design and David wants to learn React. You can teach React (Senior level), while David has 7 years of UI/UX lead experience. You both prefer Online sessions on weekends!",
    tags: ["Perfect 2-Way Reciprocal Swap", "Complementary Tech/Design Pair", "Top Rated Mentors"]
  },
  {
    id: "match-2",
    targetUserId: "user-elena",
    matchScore: 88,
    synergyScore: 89,
    availabilityScore: 85,
    styleScore: 90,
    teachSkill: "Next.js",
    learnSkill: "Figma Prototyping",
    reason: "Elena is expanding her web knowledge and needs frontend architecture guidance, while she can introduce you to product structure and data-backed UX concepts.",
    tags: ["High Chemistry", "Weekend Overlap"]
  },
  {
    id: "match-3",
    targetUserId: "user-marcus",
    matchScore: 82,
    synergyScore: 84,
    availabilityScore: 80,
    styleScore: 85,
    teachSkill: "React",
    learnSkill: "Design Systems",
    reason: "Marcus is building a video streaming portfolio using React and wants frontend help; in return he offers visual aesthetic reviews and brand motion coaching.",
    tags: ["Creative Synergy", "Hands-on Project Based"]
  }
];

// Active and past swap requests
const SEED_SWAP_REQUESTS = [
  {
    id: "req-1",
    senderId: "user-david",
    receiverId: "user-maya",
    type: "incoming",
    status: "pending",
    offeredSkill: "UI/UX Design",
    requestedSkill: "React",
    proposedDate: "2026-10-12",
    proposedTime: "15:00",
    durationHours: 1,
    creditStake: 10,
    note: "Hey Maya! Saw you're looking to level up your Figma and Design Systems skills. I'd love to swap for some React hooks and state optimization for my current side project!",
    createdAt: "2026-10-07T11:20:00Z"
  },
  {
    id: "req-2",
    senderId: "user-aisha",
    receiverId: "user-maya",
    type: "incoming",
    status: "pending",
    offeredSkill: "Public Speaking",
    requestedSkill: "TypeScript",
    proposedDate: "2026-10-14",
    proposedTime: "18:00",
    durationHours: 1,
    creditStake: 10,
    note: "Hi Maya! I'm preparing a workshop website and need a quick TypeScript review. I can coach you on tech talk delivery or conference proposal pitching in return!",
    createdAt: "2026-10-06T15:45:00Z"
  },
  {
    id: "req-3",
    senderId: "user-maya",
    receiverId: "user-kenji",
    type: "outgoing",
    status: "accepted",
    offeredSkill: "React",
    requestedSkill: "Lightroom Editing",
    proposedDate: "2026-10-15",
    proposedTime: "11:00",
    durationHours: 1,
    creditStake: 10,
    note: "Hey Kenji! Would love a 1-on-1 walkthrough of your color grading preset pipeline in exchange for building your personal portfolio component in React.",
    createdAt: "2026-10-05T09:10:00Z"
  }
];

// Scheduled Learning Sessions
const SEED_SESSIONS = [
  {
    id: "sess-1",
    partnerId: "user-david",
    skill: "UI/UX Design Systems",
    role: "Learner",
    date: "2026-10-11",
    time: "16:00 EST",
    duration: "1 Hour",
    format: "Online (Virtual Room)",
    meetingLink: "https://meet.skillswap.peer/room-maya-david-392",
    status: "Scheduled",
    credits: 10,
    topic: "Translating Token Architecture from Figma Variables to CSS/JSON"
  },
  {
    id: "sess-2",
    partnerId: "user-elena",
    skill: "React Performance & Re-render Optimization",
    role: "Mentor",
    date: "2026-10-13",
    time: "14:00 EST",
    duration: "1 Hour",
    format: "Online (Virtual Room)",
    meetingLink: "https://meet.skillswap.peer/room-maya-elena-814",
    status: "Scheduled",
    credits: 10,
    topic: "Profiling components with React DevTools and memoization strategies"
  },
  {
    id: "sess-3",
    partnerId: "user-marcus",
    skill: "Introduction to Next.js App Router",
    role: "Mentor",
    date: "2026-10-04",
    time: "18:00 EST",
    duration: "1.5 Hours",
    format: "Online (Virtual Room)",
    meetingLink: "https://meet.skillswap.peer/room-archive-441",
    status: "Completed",
    credits: 15,
    topic: "Server Actions and dynamic OG image generation"
  }
];

// Transaction Wallet History
const SEED_TRANSACTIONS = [
  {
    id: "tx-1",
    type: "credit",
    title: "Taught Session: Next.js App Router",
    partner: "Marcus Vance",
    amount: 15,
    date: "Oct 4, 2026",
    status: "Completed",
    icon: "arrow-down-left"
  },
  {
    id: "tx-2",
    type: "debit",
    title: "Learned Session: Figma Auto-Layout",
    partner: "David Chen",
    amount: -10,
    date: "Sep 28, 2026",
    status: "Completed",
    icon: "arrow-up-right"
  },
  {
    id: "tx-3",
    type: "credit",
    title: "Taught Session: TypeScript Generics",
    partner: "Sarah Jenkins",
    amount: 10,
    date: "Sep 24, 2026",
    status: "Completed",
    icon: "arrow-down-left"
  },
  {
    id: "tx-4",
    type: "bonus",
    title: "Community Welcome Grant",
    partner: "SkillSwap Genesis",
    amount: 50,
    date: "Sep 15, 2026",
    status: "Completed",
    icon: "sparkles"
  },
  {
    id: "tx-5",
    type: "credit",
    title: "Milestone: Top 5 Mentor of the Week",
    partner: "Community Reward",
    amount: 25,
    date: "Sep 20, 2026",
    status: "Completed",
    icon: "trophy"
  }
];

// Personalized AI Learning Paths
const SEED_LEARNING_PATHS = [
  {
    id: "path-react",
    title: "Modern React & Frontend Engineering Mastery",
    category: "Programming",
    icon: "code",
    targetRole: "Frontend Architect",
    summary: "From DOM fundamentals to production-scale server-rendered component architectures.",
    progress: 75,
    milestones: [
      { id: "m1", title: "HTML5 Semantic Architecture & CSS Grid/Flex", completed: true, mentorTip: "Build strong layout foundations without CSS frameworks first." },
      { id: "m2", title: "Modern JavaScript (ES6+, Closures, Async/Await)", completed: true, mentorTip: "Understand event loops and immutability primitives." },
      { id: "m3", title: "React Fundamentals: JSX & Props vs State", completed: true, mentorTip: "Think in unidirectional data flows." },
      { id: "m4", title: "Hooks Deep Dive: useEffect, useMemo, custom hooks", completed: true, mentorTip: "Avoid stale closures and premature optimization." },
      { id: "m5", title: "Global State Management & Zustand / Context", completed: false, mentorTip: "Learn atomic vs flux state patterns." },
      { id: "m6", title: "Next.js SSR, Streaming & Full-Stack Projects", completed: false, mentorTip: "Build a real-world SaaS portfolio swap project." }
    ],
    recommendedMentors: ["user-maya", "user-david"]
  },
  {
    id: "path-uiux",
    title: "UI/UX & Product Design Systems",
    category: "Design",
    icon: "layout",
    targetRole: "Product Designer",
    summary: "Master design thinking, user journey mapping, Figma auto-layouts, design tokens, and usability testing.",
    progress: 35,
    milestones: [
      { id: "u1", title: "User Research & Problem Definition", completed: true, mentorTip: "Conduct 5 qualitative user interviews before sketching." },
      { id: "u2", title: "Information Architecture & Wireframing", completed: true, mentorTip: "Prioritize user clarity over aesthetic fluff." },
      { id: "u3", title: "Figma Mastery: Components, Variants & Auto-layout", completed: false, mentorTip: "Build nested responsive component structures." },
      { id: "u4", title: "Design Systems & Token Architecture", completed: false, mentorTip: "Align color and spacing tokens with developer code." },
      { id: "u5", title: "Interactive Prototyping & Micro-animations", completed: false, mentorTip: "Use smart-animate for intuitive tactile feedback." },
      { id: "u6", title: "Usability Testing & Design Handoff Specs", completed: false, mentorTip: "Document developer edge cases and empty states." }
    ],
    recommendedMentors: ["user-david", "user-maya"]
  },
  {
    id: "path-python-ai",
    title: "Python Data Science & GenAI Engineering",
    category: "Programming",
    icon: "cpu",
    targetRole: "AI Application Developer",
    summary: "Hands-on journey through Python data analysis, vector embeddings, LLM orchestration, and fine-tuning.",
    progress: 20,
    milestones: [
      { id: "p1", title: "Python Core: Comprehensions, OOP & Package Tooling", completed: true, mentorTip: "Master virtual environments and typing." },
      { id: "p2", title: "Data Wrangling with Pandas & NumPy", completed: false, mentorTip: "Handle real dirty datasets and missing values." },
      { id: "p3", title: "Data Visualization with Matplotlib & Seaborn", completed: false, mentorTip: "Tell compelling visual data narratives." },
      { id: "p4", title: "Machine Learning Foundations & Scikit-Learn", completed: false, mentorTip: "Focus on evaluation metrics and validation splits." },
      { id: "p5", title: "Prompt Engineering & LLM APIs (Gemini / OpenAI)", completed: false, mentorTip: "Structure multimodal inputs and schema outputs." },
      { id: "p6", title: "RAG Systems & Vector Database Integration", completed: false, mentorTip: "Build a live knowledge retrieval search bot." }
    ],
    recommendedMentors: ["user-elena", "user-aisha"]
  }
];

// Community Feed Posts
const SEED_COMMUNITY_POSTS = [
  {
    id: "post-1",
    authorId: "user-david",
    category: "Design",
    title: "How I converted our 200+ Figma components into developer-friendly CSS tokens",
    content: "Sharing my free template for mapping Figma variables directly to CSS custom properties! If you're a designer looking to speak the same language as your engineers, check this out. Swapping 1-on-1 walkthroughs for React tutoring!",
    likes: 47,
    commentsCount: 12,
    timestamp: "2 hours ago",
    badge: "Resource Share",
    comments: [
      { author: "Maya Lin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", text: "This saved our team hours of back-and-forth handoff meetings. Gold!", time: "1 hour ago" },
      { author: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", text: "Does this support dark mode tokens cleanly?", time: "30 mins ago" }
    ]
  },
  {
    id: "post-2",
    authorId: "user-elena",
    category: "Programming",
    title: "Study Partner Search: Anyone building RAG agents with Gemini Flash?",
    content: "Looking for an accountable study partner this weekend to build a retrieval-augmented generation app from scratch. I bring Python/PyTorch background; looking for someone with React frontend or UI chops to co-build!",
    likes: 31,
    commentsCount: 8,
    timestamp: "5 hours ago",
    badge: "Study Partner",
    comments: [
      { author: "Maya Lin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", text: "I'd love to partner on this Elena! I can wire up the frontend in React + Tailwind.", time: "4 hours ago" }
    ]
  },
  {
    id: "post-3",
    authorId: "user-kenji",
    category: "Photography",
    title: "The #1 mistake beginners make with natural light portraiture",
    content: "Stop placing your subjects directly under overhead noon sunlight! Look for open shade or reflective concrete walls that bounce diffused light straight into their eyes. Check out these before/after crops.",
    likes: 89,
    commentsCount: 23,
    timestamp: "1 day ago",
    badge: "Quick Tip",
    comments: [
      { author: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80", text: "Tried this yesterday for our product shoot and the skin tones look flawless!", time: "18 hours ago" }
    ]
  },
  {
    id: "post-4",
    authorId: "user-marcus",
    category: "Video Editing",
    title: "Free Sound FX Pack for YouTube Creators & Video Editors",
    content: "Put together 45 high-fidelity whooshes, keyboard clicks, risers, and ambient room tones recorded on my Zoom H6. Totally free for the SkillSwap community. Let me know what you think!",
    likes: 64,
    commentsCount: 15,
    timestamp: "2 days ago",
    badge: "Free Asset",
    comments: []
  }
];

// Leaderboard Entries
const SEED_LEADERBOARD = [
  {
    rank: 1,
    userId: "user-kenji",
    skillsTaught: "Photography, Lightroom, Lighting",
    hoursTaught: 64,
    creditsEarned: 510,
    swapsCompleted: 51,
    badge: "Top Mentor",
    badgeColor: "gold"
  },
  {
    rank: 2,
    userId: "user-marcus",
    skillsTaught: "Video Editing, DaVinci, Sound Design",
    hoursTaught: 50,
    creditsEarned: 420,
    swapsCompleted: 42,
    badge: "Community Builder",
    badgeColor: "silver"
  },
  {
    rank: 3,
    userId: "user-david",
    skillsTaught: "UI/UX, Figma, Design Systems",
    hoursTaught: 38,
    creditsEarned: 310,
    swapsCompleted: 31,
    badge: "Knowledge Sharer",
    badgeColor: "bronze"
  },
  {
    rank: 4,
    userId: "user-aisha",
    skillsTaught: "Public Speaking, Pitch Deck Coaching",
    hoursTaught: 34,
    creditsEarned: 280,
    swapsCompleted: 28,
    badge: "Knowledge Sharer",
    badgeColor: "blue"
  },
  {
    rank: 5,
    userId: "user-maya",
    skillsTaught: "React, TypeScript, Next.js",
    hoursTaught: 32,
    creditsEarned: 260,
    swapsCompleted: 26,
    badge: "Top Mentor",
    badgeColor: "blue"
  },
  {
    rank: 6,
    userId: "user-elena",
    skillsTaught: "Python, Data Science, AI Basics",
    hoursTaught: 24,
    creditsEarned: 190,
    swapsCompleted: 19,
    badge: "Skill Explorer",
    badgeColor: "purple"
  },
  {
    rank: 7,
    userId: "user-sarah",
    skillsTaught: "Digital Marketing, SEO, Copywriting",
    hoursTaught: 18,
    creditsEarned: 150,
    swapsCompleted: 15,
    badge: "Skill Explorer",
    badgeColor: "purple"
  }
];

// Seed Chat Messages
const SEED_CHATS = {
  "user-david": [
    { sender: "user-david", text: "Hey Maya! Loved seeing your React workshop notes in the community.", time: "Yesterday, 3:15 PM" },
    { sender: "user-maya", text: "Thanks David! Your Figma design system templates are legendary around here.", time: "Yesterday, 3:20 PM" },
    { sender: "user-david", text: "Haha appreciate it! I just sent you a formal SkillSwap request for our session this weekend. We can dive into building tokens and exchanging hooks.", time: "Yesterday, 3:22 PM" },
    { sender: "user-maya", text: "Awesome, I'll accept it right away. Looking forward to our swap! 🚀", time: "Yesterday, 3:25 PM" }
  ],
  "user-elena": [
    { sender: "user-elena", text: "Hi Maya, are you free for our React dev tools optimization session on Monday?", time: "2 days ago, 11:00 AM" },
    { sender: "user-maya", text: "Yes! 2:00 PM EST works perfectly. I've prepared a reproducible repo with memoization test cases.", time: "2 days ago, 11:15 AM" },
    { sender: "user-elena", text: "Fantastic. In our second hour I can show you how we vectorize that data in Python!", time: "2 days ago, 11:18 AM" }
  ],
  "user-marcus": [
    { sender: "user-marcus", text: "Hey Maya, thanks for the great Next.js session last week! Credits transferred successfully.", time: "Oct 4, 7:30 PM" },
    { sender: "user-maya", text: "You're very welcome Marcus! Let me know when you're ready to tackle Server Actions next.", time: "Oct 4, 7:45 PM" }
  ]
};

// Seed Notifications
const SEED_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "match",
    title: "New 96% AI Reciprocal Match!",
    message: "David Chen teaches UI/UX Design and wants to learn React.",
    time: "10 mins ago",
    read: false,
    action: "open-matches"
  },
  {
    id: "notif-2",
    type: "request",
    title: "New Skill Swap Proposal Received",
    message: "David Chen sent you a swap request for 10 Skill Credits.",
    time: "2 hours ago",
    read: false,
    action: "open-requests"
  },
  {
    id: "notif-3",
    type: "session",
    title: "Upcoming Session in 24 Hours",
    message: "UI/UX Design Systems with David Chen on Oct 11, 4:00 PM EST.",
    time: "5 hours ago",
    read: true,
    action: "open-sessions"
  },
  {
    id: "notif-4",
    type: "credits",
    title: "+15 Skill Credits Earned!",
    message: "Session with Marcus Vance was marked completed. 15 credits deposited.",
    time: "Oct 4",
    read: true,
    action: "open-wallet"
  }
];
