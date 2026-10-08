# SkillSwap — Learn From People Around You
> **A peer-to-peer learning platform where people exchange skills instead of money using Knowledge as Currency.**

---

## 🌟 Overview & Concept

**SkillSwap** is a peer-to-peer knowledge exchange platform designed around a fundamental principle: **Knowledge is an infinite asset that multiplies when shared.** 

Instead of traditional monetary transactions or costly tutoring fees, SkillSwap uses an intuitive **Skill Credit economy**:
- **Teach 1 hour** → Earn **10 Skill Credits** ⚡
- **Learn 1 hour** → Spend **10 Skill Credits** ⚡
- **Join community** → Receive **50 Welcome Credits** 🎁

Users can teach topics they excel at and learn skills they desire through an **AI-powered Reciprocal Matching Engine** that analyzes complementary skills and availability overlap.

---

## 🚀 Key Features & Built Sections

### 1. 🌈 Landing Page
- **Hero Section**: *"Learn a Skill. Teach a Skill. Grow Together."*
- **Action Buttons**: `Find a Skill` (Discover directory), `Offer a Skill` (Skill catalog creator), and `AI Skill Matcher`.
- **Interactive Visual Flow**: Demonstrates the core platform cycle:
  $$\text{Teach} \longrightarrow \text{Earn Skill Credits (10 ⚡/hr)} \longrightarrow \text{Learn} \longrightarrow \text{Grow}$$
- **Live Stats Counter**: 4,850+ Skills Swapped, 12,400+ Active Members, 98.4% 5-Star Feedback, $0 Money Spent.
- **Popular Skills Grid**: Categorized tiles for Frontend, Python & AI, UI/UX Design, Video Editing, Photography, Growth Marketing, Public Speaking, and Music Production.
- **Community Testimonials**: Verified peer exchange stories with reciprocal tags.
- **Call-to-Action**: Direct conversion banner with instant 50 bonus credits on sign-up.

### 2. 🔐 User Authentication (Sign Up & Login)
- **Comprehensive Sign Up Form**:
  - Full Name, Profile Photo selector, Location (City or Remote)
  - Skills they can teach & Skills they want to learn
  - Proficiency level (Beginner, Intermediate, Advanced)
  - Availability (Weekends, Weekday Evenings, Flexible)
  - Learning format preference (Online, In-person, Both)
  - Automatic **50 Welcome Credits** deposit.
- **Quick Demo Login & Switcher**: Instant one-click login for hackathon testing as any of 7 realistic personas.

### 3. 📊 User Dashboard
- **Personalized Banner**: Welcome message tailored to the active user.
- **Knowledge Wallet Card**: Real-time credit balance (e.g. 140 ⚡), total credits earned, and total credits spent.
- **Skills I Teach**: Lists active teaching topics with high-demand indicators and exp level.
- **Skills I Want to Learn**: Target goals with shortcut to discover matching mentors.
- **Top AI Reciprocal Match Spotlight**: Highlights highest compatibility peer.
- **Upcoming Sessions Card**: Scheduled agendas with quick link to virtual rooms.
- **Recent Activity Feed**: Timestamps of completed swaps and reviews.

### 4. 🔍 Skill Discovery Page
- **Instant Search**: Search across skills (React, Python, UI/UX, DaVinci), mentor names, and bios.
- **Multi-Filter Engine**:
  - Skill Categories (Programming, Design, Video & Media, Marketing, Photography, Business)
  - Experience Level (All, Beginner, Intermediate, Advanced)
  - Format (Online, In-Person)
  - Availability (Weekends, Weekday Evenings)
  - Rating (4.8+, 4.9+)
  - Sorting (Best Match, Highest Rated, Most Swaps, Most Hours Taught)
- **Profile Cards**: Detailed cards showing photo, verified badge, rating, bio, teaching badges, learning tags, and credit rate.

### 5. 🤖 AI-Powered Matching Matrix
- **Two-Way Reciprocal Algorithm**:
  - Compares *What you can teach* $\leftrightarrow$ *What others want to learn*.
  - Compares *What you want to learn* $\leftrightarrow$ *What others can teach*.
- **Compatibility Breakdown**:
  - Match percentage score (e.g., 96% Match, 92% Match).
  - Skill synergy, availability overlap, and learning style metrics.
- **Natural Language "Why Recommended" Explanation**:
  > *"You want to learn UI/UX Design and David wants to learn React. You can teach React (Senior level), while David has 7 years of UI/UX lead experience. You both prefer Online sessions on weekends!"*
- **Interactive AI Skill Sandbox Simulator**: Input any hypothetical skill offered and wanted to compute projected compatibility.

### 6. 👤 Skill Swap Profile View (Modal)
- Comprehensive modal displaying full bio, teaching philosophy, skill taxonomy, rates, availability, and authentic written reviews from peers.

### 7. ⚡ Skill Credit System & Wallet
- Dedicated Knowledge Ledger view explaining the 1 hr = 10 ⚡ standard.
- Immutable transaction history with filter tabs (All, Earned, Spent).
- **"Simulate Completing 1 Hr Session (+10 ⚡)"** button that demonstrates live wallet updates with toast feedback.

### 8. 📥 Skill Swap Proposals Inbox
- Incoming vs. Outgoing vs. Past Swaps tabs.
- Interactive actions: **Accept Swap** (auto-schedules session), **Decline**, and **Reschedule**.

### 9. 💬 Messaging & Virtual Learning Rooms
- Multi-peer chat thread with realistic auto-replies.
- **Schedule Session** action embedded in chat header.
- **Virtual Pair Room**: Simulated 1-on-1 video call stage with webcam mock, audio/screen toggles, collaborative notes, and "End Session & Release 10 ⚡" settlement button.

### 10. 🗺️ AI-Generated Personalized Learning Paths
- Multi-curriculum selector (React & Frontend, UI/UX Design, Python Data Science & AI).
- Interactive milestone check-off timeline that computes live completion percentage.
- Direct "Find Mentor for this Step" button linking each milestone to verified teachers.
- Custom Roadmap Generator: Type any topic (e.g. 3D Blender, Flutter) to generate a 5-step curriculum.

### 11. 👥 Community Hub
- Public post composer with category filters (Programming, Design, Photography, Video).
- Interactive post cards with like counters and comment links.
- Study Buddy Matcher widget.

### 12. 🏆 Leaderboard & Hall of Fame
- Top 3 Podium with gold/silver/bronze crowns and glowing avatars.
- Ranked community table tracking skills taught, hours taught, credits earned, and swaps completed.
- Badges: *"Top Mentor"*, *"Knowledge Sharer"*, *"Community Builder"*, *"Skill Explorer"*.

### 13. 🔔 Interactive Notifications
- Live unread bell badge.
- Dropdown tracking new AI matches, swap proposals, session reminders, and credit deposits.

---

## 💻 Tech Stack & Architecture

- **Core**: HTML5 Semantic Architecture, Vanilla JavaScript (ES6+ Modules & Classes)
- **Styling**: Vanilla CSS3 with Modern CSS Custom Properties (Design Tokens), Glassmorphism, CSS Grid & Flexbox, smooth keyframe animations
- **Icons**: Lucide Icons
- **Persistence**: Reactive `localStorage` state management with automatic fallback to realistic seed personas
- **Local Server**: Zero-dependency Node.js HTTP server with automatic port fallback (`serve.js`)

---

## 🏃 Running the Application

### Option A: Using Node.js
```bash
node serve.js
```
Open **[http://localhost:3050](http://localhost:3050)** in your browser.

### Option B: Using PowerShell (Windows)
```powershell
.\serve.ps1
```

### Option C: Direct Browser Opening
Simply double-click or open `index.html` in any modern web browser.
