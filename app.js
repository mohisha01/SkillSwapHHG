/**
 * SkillSwap — Main Application Logic
 * Peer-to-Peer Knowledge Currency Exchange Platform
 */

class SkillSwapApp {
  constructor() {
    this.currentView = "landing";
    this.users = [];
    this.activeUser = null;
    this.aiMatches = [];
    this.requests = [];
    this.sessions = [];
    this.transactions = [];
    this.learningPaths = [];
    this.communityPosts = [];
    this.leaderboard = [];
    this.chats = {};
    this.notifications = [];
    this.activeChatPartnerId = "user-david";
    this.activePathId = "path-react";
    this.searchQuery = "";
    this.selectedCategory = "all";
    this.targetSwapMentorId = null;

    this.init();
  }

  init() {
    this.loadState();
    this.setupEventListeners();
    this.navigate(this.getHashView() || "landing");
    this.renderAll();
    this.initLucide();
  }

  initLucide() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Load state from localStorage or seed data
  loadState() {
    const savedUsers = localStorage.getItem("skillswap_users");
    const savedActiveUserId = localStorage.getItem("skillswap_active_user_id");
    const savedRequests = localStorage.getItem("skillswap_requests");
    const savedSessions = localStorage.getItem("skillswap_sessions");
    const savedTransactions = localStorage.getItem("skillswap_transactions");
    const savedPosts = localStorage.getItem("skillswap_posts");
    const savedChats = localStorage.getItem("skillswap_chats");
    const savedPaths = localStorage.getItem("skillswap_paths");

    this.users = savedUsers ? JSON.parse(savedUsers) : [...SEED_USERS];
    const activeId = savedActiveUserId || DEFAULT_ACTIVE_USER_ID;
    this.activeUser = this.users.find(u => u.id === activeId) || this.users[0];

    this.requests = savedRequests ? JSON.parse(savedRequests) : [...SEED_SWAP_REQUESTS];
    this.sessions = savedSessions ? JSON.parse(savedSessions) : [...SEED_SESSIONS];
    this.transactions = savedTransactions ? JSON.parse(savedTransactions) : [...SEED_TRANSACTIONS];
    this.communityPosts = savedPosts ? JSON.parse(savedPosts) : [...SEED_COMMUNITY_POSTS];
    this.chats = savedChats ? JSON.parse(savedChats) : { ...SEED_CHATS };
    this.learningPaths = savedPaths ? JSON.parse(savedPaths) : [...SEED_LEARNING_PATHS];
    this.leaderboard = [...SEED_LEADERBOARD];
    this.notifications = [...SEED_NOTIFICATIONS];

    this.computeAIMatches();
  }

  saveState() {
    localStorage.setItem("skillswap_users", JSON.stringify(this.users));
    localStorage.setItem("skillswap_active_user_id", this.activeUser.id);
    localStorage.setItem("skillswap_requests", JSON.stringify(this.requests));
    localStorage.setItem("skillswap_sessions", JSON.stringify(this.sessions));
    localStorage.setItem("skillswap_transactions", JSON.stringify(this.transactions));
    localStorage.setItem("skillswap_posts", JSON.stringify(this.communityPosts));
    localStorage.setItem("skillswap_chats", JSON.stringify(this.chats));
    localStorage.setItem("skillswap_paths", JSON.stringify(this.learningPaths));
  }

  getHashView() {
    const hash = window.location.hash.replace("#", "");
    const validViews = ["landing", "dashboard", "discover", "matches", "requests", "credits", "messages", "learning-paths", "community", "leaderboard"];
    return validViews.includes(hash) ? hash : null;
  }

  setupEventListeners() {
    window.addEventListener("hashchange", () => {
      const hashView = this.getHashView();
      if (hashView && hashView !== this.currentView) {
        this.navigate(hashView);
      }
    });

    document.addEventListener("click", (e) => {
      const notifBtn = document.getElementById("notif-btn");
      const notifDropdown = document.getElementById("notif-dropdown");
      const userBtn = document.getElementById("user-profile-btn");
      const userDropdown = document.getElementById("user-dropdown");

      if (notifDropdown && !notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        notifDropdown.classList.remove("show");
      }
      if (userDropdown && !userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove("show");
      }
    });
  }

  navigate(viewName) {
    this.currentView = viewName;
    window.location.hash = viewName;

    // Toggle view containers
    document.querySelectorAll(".view-panel").forEach(panel => {
      panel.style.display = "none";
    });

    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) {
      targetPanel.style.display = "block";
    }

    // Update nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.view === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close mobile nav drawer if open
    const drawer = document.getElementById("mobile-menu-drawer");
    if (drawer) drawer.style.display = "none";

    // Refresh specific view data
    if (viewName === "dashboard") this.renderDashboard();
    if (viewName === "discover") this.renderDiscover();
    if (viewName === "matches") this.renderMatches();
    if (viewName === "requests") this.renderRequests();
    if (viewName === "credits") this.renderCredits();
    if (viewName === "messages") this.renderMessages();
    if (viewName === "learning-paths") this.renderLearningPaths();
    if (viewName === "community") this.renderCommunity();
    if (viewName === "leaderboard") this.renderLeaderboard();

    window.scrollTo({ top: 0, behavior: "smooth" });
    this.initLucide();
  }

  renderAll() {
    this.renderNav();
    this.renderLandingPopularSkills();
    this.renderDashboard();
    this.renderDiscover();
    this.renderMatches();
    this.renderRequests();
    this.renderCredits();
    this.renderMessages();
    this.renderLearningPaths();
    this.renderCommunity();
    this.renderLeaderboard();
    this.renderNotifications();
    this.renderPersonaSwitchers();
  }

  // =========================================================================
  // Navigation & User Persona Management
  // =========================================================================
  renderNav() {
    if (!this.activeUser) return;
    const navCredit = document.getElementById("nav-credit-balance");
    const navAvatar = document.getElementById("nav-user-avatar");
    const navName = document.getElementById("nav-user-name");
    const dropAvatar = document.getElementById("dropdown-user-avatar");
    const dropName = document.getElementById("dropdown-user-name");
    const dropRole = document.getElementById("dropdown-user-role");
    const dropBadge = document.getElementById("dropdown-user-badge");

    if (navCredit) navCredit.textContent = this.activeUser.credits;
    if (navAvatar) navAvatar.src = this.activeUser.avatar;
    if (navName) navName.textContent = this.activeUser.name;
    if (dropAvatar) dropAvatar.src = this.activeUser.avatar;
    if (dropName) dropName.textContent = this.activeUser.name;
    if (dropRole) dropRole.textContent = this.activeUser.title;
    if (dropBadge) dropBadge.textContent = this.activeUser.badge;

    // Unread count
    const unreadCount = this.notifications.filter(n => !n.read).length;
    const notifBadge = document.getElementById("notif-badge");
    if (notifBadge) {
      notifBadge.style.display = unreadCount > 0 ? "block" : "none";
    }
  }

  toggleNotifDropdown() {
    const dd = document.getElementById("notif-dropdown");
    if (dd) dd.classList.toggle("show");
  }

  toggleUserDropdown() {
    const dd = document.getElementById("user-dropdown");
    if (dd) dd.classList.toggle("show");
  }

  toggleMobileNav() {
    const drawer = document.getElementById("mobile-menu-drawer");
    if (drawer) {
      drawer.style.display = drawer.style.display === "block" ? "none" : "block";
    }
  }

  renderPersonaSwitchers() {
    const container = document.getElementById("persona-switchers-list");
    const loginPresets = document.getElementById("login-preset-accounts");
    if (!container) return;

    container.innerHTML = this.users.map(u => {
      const isCurrent = u.id === this.activeUser.id;
      return `
        <button class="btn btn-secondary btn-sm" style="width: 100%; justify-content: flex-start; gap: 0.5rem; ${isCurrent ? 'border-color: var(--primary); background: rgba(99,102,241,0.15);' : ''}" onclick="app.switchActiveUser('${u.id}')">
          <img src="${u.avatar}" style="width: 22px; height: 22px; border-radius: 50%; object-fit: cover;">
          <span style="font-weight: 600;">${u.name}</span>
          <span style="font-size: 0.72rem; color: var(--text-dim); margin-left: auto;">${u.teachingSkills[0]?.name || ''}</span>
        </button>
      `;
    }).join("");

    if (loginPresets) {
      loginPresets.innerHTML = this.users.slice(0, 4).map(u => `
        <button type="button" class="btn btn-secondary" style="width: 100%; justify-content: flex-start; gap: 0.75rem;" onclick="app.switchActiveUser('${u.id}'); app.closeModal('modal-auth');">
          <img src="${u.avatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
          <div style="text-align: left;">
            <div style="font-weight: 700; font-size: 0.9rem;">${u.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim);">${u.title}</div>
          </div>
        </button>
      `).join("");
    }
  }

  switchActiveUser(userId) {
    const target = this.users.find(u => u.id === userId);
    if (!target) return;
    this.activeUser = target;
    this.saveState();
    this.computeAIMatches();
    this.renderAll();
    this.showToast(`Switched active profile to ${target.name}`, "success");
    const dd = document.getElementById("user-dropdown");
    if (dd) dd.classList.remove("show");
  }

  // =========================================================================
  // VIEW 1: Landing Page Components
  // =========================================================================
  renderLandingPopularSkills() {
    const container = document.getElementById("popular-skills-container");
    if (!container) return;

    const categories = [
      { name: "Frontend & React", icon: "⚛️", mentors: 142, tags: ["React", "TypeScript", "Next.js", "Tailwind"] },
      { name: "Python & Data AI", icon: "🤖", mentors: 98, tags: ["Python", "Pandas", "PyTorch", "LLMs"] },
      { name: "UI/UX & Design Systems", icon: "🎨", mentors: 115, tags: ["Figma", "Auto-layout", "Design Tokens", "Wireframing"] },
      { name: "Video & Color Grading", icon: "🎬", mentors: 64, tags: ["DaVinci Resolve", "Premiere", "Color Grading", "Sound FX"] },
      { name: "Street & Portrait Photography", icon: "📷", mentors: 53, tags: ["Lightroom", "Manual Exposure", "Lighting", "Portraits"] },
      { name: "SEO & Growth Marketing", icon: "📈", mentors: 77, tags: ["Organic SEO", "Conversion Rate", "Content Strategy", "Copywriting"] },
      { name: "Public Speaking & Pitching", icon: "🎤", mentors: 41, tags: ["Storytelling", "Pitch Decks", "TEDx Prep", "Negotiation"] },
      { name: "Music & Audio Production", icon: "🎧", mentors: 36, tags: ["Ableton Live", "Mixing", "Mastering", "Vocal Tuning"] }
    ];

    container.innerHTML = categories.map(c => `
      <div class="skill-category-card" onclick="app.filterBySkillKeyword('${c.tags[0]}')">
        <div class="cat-icon-bar">
          <span class="cat-icon">${c.icon}</span>
          <span class="cat-mentors-count">${c.mentors} Active Mentors</span>
        </div>
        <h3 class="cat-title">${c.name}</h3>
        <div class="cat-tags">
          ${c.tags.map(t => `<span class="cat-tag">${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  filterBySkillKeyword(keyword) {
    this.navigate("discover");
    const searchInput = document.getElementById("discover-search-input");
    if (searchInput) {
      searchInput.value = keyword;
      this.handleSearchChange();
    }
  }

  // =========================================================================
  // VIEW 2: Dashboard
  // =========================================================================
  renderDashboard() {
    if (!this.activeUser) return;
    const u = this.activeUser;

    // Header Meta
    const dAvatar = document.getElementById("dash-user-avatar");
    const dName = document.getElementById("dash-user-name");
    const dTitle = document.getElementById("dash-user-title");
    const dLocation = document.getElementById("dash-user-location");

    if (dAvatar) dAvatar.src = u.avatar;
    if (dName) dName.textContent = u.name.split(" ")[0];
    if (dTitle) dTitle.innerHTML = `${u.title} • <span id="dash-user-location">${u.location}</span>`;

    // Metrics Cards
    const dCredits = document.getElementById("dash-credit-balance");
    const dEarned = document.getElementById("dash-credits-earned");
    const dSpent = document.getElementById("dash-credits-spent");
    const dSwaps = document.getElementById("dash-swaps-count");
    const dHours = document.getElementById("dash-hours-taught");
    const dRating = document.getElementById("dash-rating-val");
    const dReviews = document.getElementById("dash-reviews-count");
    const dBadge = document.getElementById("dash-mentor-badge");

    if (dCredits) dCredits.textContent = u.credits;
    if (dEarned) dEarned.textContent = `+${u.creditsEarned} ⚡`;
    if (dSpent) dSpent.textContent = `-${u.creditsSpent} ⚡`;
    if (dSwaps) dSwaps.textContent = u.swapsCompleted;
    if (dHours) dHours.textContent = u.hoursTaught;
    if (dRating) dRating.textContent = u.rating;
    if (dReviews) dReviews.textContent = u.reviewsCount;
    if (dBadge) dBadge.textContent = u.badge;

    // Pending requests count in button
    const pendingReqCount = this.requests.filter(r => r.receiverId === u.id && r.status === "pending").length;
    const reqBtnCount = document.getElementById("dash-pending-req-count");
    if (reqBtnCount) reqBtnCount.textContent = pendingReqCount;

    // Skills I Teach
    const teachContainer = document.getElementById("dash-skills-teach-list");
    if (teachContainer) {
      teachContainer.innerHTML = u.teachingSkills.map(s => `
        <div class="skill-row-item">
          <div class="skill-row-info">
            <span class="skill-row-name">${s.name}</span>
            <span class="skill-row-meta">
              <span class="badge badge-primary">${s.level}</span>
              <span>${s.years} yrs exp</span>
              <span>10 ⚡/hr</span>
            </span>
          </div>
          <div class="skill-row-action">
            <span class="badge badge-gold">🔥 ${s.demand} Demand</span>
          </div>
        </div>
      `).join("");
    }

    // Skills I Want to Learn
    const learnContainer = document.getElementById("dash-skills-learn-list");
    if (learnContainer) {
      learnContainer.innerHTML = u.learningSkills.map(s => `
        <div class="skill-row-item">
          <div class="skill-row-info">
            <span class="skill-row-name">${s.name}</span>
            <span class="skill-row-meta">
              <span class="badge badge-subtle">Target: ${s.targetLevel}</span>
              <span style="color: var(--primary);">Priority: ${s.priority}</span>
            </span>
          </div>
          <div class="skill-row-action">
            <button class="btn btn-secondary btn-sm" onclick="app.filterBySkillKeyword('${s.name}')">
              Find Mentors
            </button>
          </div>
        </div>
      `).join("");
    }

    // Top AI Match Spotlight
    const topMatchContainer = document.getElementById("dash-top-match-card");
    if (topMatchContainer) {
      const topMatch = this.aiMatches[0];
      if (topMatch) {
        const target = this.users.find(usr => usr.id === topMatch.targetUserId);
        if (target) {
          topMatchContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="${target.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
                <div>
                  <h4 style="font-size: 0.95rem; font-weight: 700;">${target.name}</h4>
                  <p style="font-size: 0.78rem; color: var(--text-muted);">${target.title}</p>
                </div>
              </div>
              <span class="badge badge-emerald" style="font-size: 0.85rem; font-weight: 800;">${topMatch.matchScore}% Match</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 1rem; line-height: 1.5;">
              ${topMatch.reason}
            </p>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="app.openRequestSwapModal('${target.id}')">
                <i data-lucide="repeat"></i> Request Swap
              </button>
              <button class="btn btn-secondary btn-sm" onclick="app.openChat('${target.id}')">
                <i data-lucide="message-square"></i> Chat
              </button>
            </div>
          `;
        }
      }
    }

    // Upcoming Sessions
    const sessionsContainer = document.getElementById("dash-sessions-list");
    if (sessionsContainer) {
      sessionsContainer.innerHTML = this.sessions.slice(0, 3).map(s => {
        const partner = this.users.find(usr => usr.id === s.partnerId) || this.users[0];
        return `
          <div class="session-card-dash">
            <div class="session-head">
              <div class="session-partner-info">
                <img src="${partner.avatar}" class="session-p-avatar" alt="${partner.name}">
                <div>
                  <div class="session-title-text">${s.skill}</div>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">${s.role === 'Mentor' ? 'Mentoring' : 'Learning from'} ${partner.name}</span>
                </div>
              </div>
              <span class="badge ${s.status === 'Completed' ? 'badge-subtle' : 'badge-emerald'}">${s.status}</span>
            </div>
            <div class="session-timing-row">
              <span>📅 ${s.date} at ${s.time}</span>
              <span>⚡ ${s.credits} Credits</span>
            </div>
            ${s.status === 'Scheduled' ? `
              <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="app.launchVirtualRoom('${s.id}')">
                  <i data-lucide="video"></i> Join Virtual Room
                </button>
                <button class="btn btn-secondary btn-sm" onclick="app.openScheduleSessionModal('${partner.id}')">
                  Reschedule
                </button>
              </div>
            ` : ''}
          </div>
        `;
      }).join("");
    }

    // Recent Activity List
    const actContainer = document.getElementById("dash-activity-list");
    if (actContainer) {
      actContainer.innerHTML = `
        <div class="activity-feed-item">
          <div class="act-icon" style="color: #34d399;"><i data-lucide="arrow-down-left"></i></div>
          <div class="act-text">
            Received <strong>+15 Skill Credits</strong> for teaching Next.js App Router to Marcus Vance.
            <span class="act-time">3 days ago</span>
          </div>
        </div>
        <div class="activity-feed-item">
          <div class="act-icon" style="color: #fbbf24;"><i data-lucide="repeat"></i></div>
          <div class="act-text">
            Accepted 1-hour swap proposal with <strong>David Chen</strong> (UI/UX Design Systems).
            <span class="act-time">Yesterday</span>
          </div>
        </div>
        <div class="activity-feed-item">
          <div class="act-icon" style="color: var(--primary);"><i data-lucide="star"></i></div>
          <div class="act-text">
            Received 5-star review from <strong>Elena Rostova</strong>: "Super patient and hands-on React tutor."
            <span class="act-time">2 weeks ago</span>
          </div>
        </div>
      `;
    }
  }

  // =========================================================================
  // VIEW 3: Skill Discovery & Filtering
  // =========================================================================
  renderDiscover() {
    const container = document.getElementById("mentors-cards-container");
    if (!container) return;

    const filteredUsers = this.getFilteredMentors();

    if (filteredUsers.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-medium);">
          <i data-lucide="search-x" style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700;">No Mentors Matching Your Query</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.35rem;">Try adjusting your search terms or relaxing the filters.</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;" onclick="app.resetFilters()">Reset All Filters</button>
        </div>
      `;
      this.initLucide();
      return;
    }

    container.innerHTML = filteredUsers.map(user => {
      const isSelf = user.id === this.activeUser.id;
      return `
        <div class="profile-card">
          <div class="profile-card-cover" style="background-image: url('${user.cover}')">
            <span class="cover-badge badge badge-gold">${user.badge}</span>
          </div>
          <div class="profile-card-body">
            <div class="profile-card-header">
              <img src="${user.avatar}" alt="${user.name}" class="card-avatar">
              <div class="card-name-rating">
                <h3 class="card-user-name">
                  ${user.name}
                  ${isSelf ? '<span class="badge badge-primary" style="font-size: 0.65rem;">You</span>' : ''}
                </h3>
                <p class="card-user-title">${user.title}</p>
                <div class="card-rating-badge">
                  <span>★</span>
                  <span>${user.rating}</span>
                  <span style="color: var(--text-dim); font-weight: 500;">(${user.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <p class="profile-card-bio">${user.bio}</p>

            <div class="skills-teaches-box">
              <span class="box-micro-label">Teaches (${user.teachingSkills.length})</span>
              <div class="skills-badges-wrap">
                ${user.teachingSkills.map(s => `<span class="badge badge-primary">${s.name} • ${s.level}</span>`).join("")}
              </div>
            </div>

            <div class="skills-wants-box">
              <span class="box-micro-label">Wants to Learn</span>
              <div class="skills-badges-wrap">
                ${user.learningSkills.map(s => `<span class="badge badge-gold">${s.name}</span>`).join("")}
              </div>
            </div>

            <div class="card-footer-meta">
              <div class="credit-rate-tag">
                <span>⚡</span>
                <span>10 Credits / hr</span>
              </div>
              <div class="card-actions-group">
                <button class="btn btn-secondary btn-sm" onclick="app.openProfileModal('${user.id}')" title="View Full Profile">
                  Details
                </button>
                ${!isSelf ? `
                  <button class="btn btn-secondary btn-sm" onclick="app.openChat('${user.id}')" title="Send Direct Message">
                    <i data-lucide="message-square"></i>
                  </button>
                  <button class="btn btn-primary btn-sm" onclick="app.openRequestSwapModal('${user.id}')">
                    <i data-lucide="repeat"></i> Swap
                  </button>
                ` : `
                  <button class="btn btn-secondary btn-sm" onclick="app.openOfferSkillModal()">
                    + Add Skill
                  </button>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    this.initLucide();
  }

  getFilteredMentors() {
    const q = (this.searchQuery || "").toLowerCase().trim();
    const levelFilter = document.getElementById("filter-level")?.value || "all";
    const formatFilter = document.getElementById("filter-format")?.value || "all";
    const ratingFilter = parseFloat(document.getElementById("filter-rating")?.value || "0");
    const sortFilter = document.getElementById("filter-sort")?.value || "recommended";

    return this.users.filter(user => {
      // Category filter
      if (this.selectedCategory !== "all") {
        const hasCat = user.teachingSkills.some(s => s.category === this.selectedCategory);
        if (!hasCat) return false;
      }

      // Rating filter
      if (user.rating < ratingFilter) return false;

      // Format filter
      if (formatFilter !== "all" && !user.format.includes(formatFilter)) {
        return false;
      }

      // Level filter
      if (levelFilter !== "all") {
        const hasLevel = user.teachingSkills.some(s => s.level.toLowerCase() === levelFilter.toLowerCase());
        if (!hasLevel) return false;
      }

      // Text query (skills, name, bio, title)
      if (q) {
        const matchName = user.name.toLowerCase().includes(q);
        const matchTitle = user.title.toLowerCase().includes(q);
        const matchBio = user.bio.toLowerCase().includes(q);
        const matchTeach = user.teachingSkills.some(s => s.name.toLowerCase().includes(q));
        const matchLearn = user.learningSkills.some(s => s.name.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchBio && !matchTeach && !matchLearn) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortFilter === "rating") return b.rating - a.rating;
      if (sortFilter === "swaps") return b.swapsCompleted - a.swapsCompleted;
      if (sortFilter === "hours") return b.hoursTaught - a.hoursTaught;
      return 0; // Default recommended
    });
  }

  handleSearchChange() {
    const input = document.getElementById("discover-search-input");
    this.searchQuery = input ? input.value : "";
    this.renderDiscover();
  }

  handleFilterChange() {
    this.renderDiscover();
  }

  setCategoryFilter(category) {
    this.selectedCategory = category;
    document.querySelectorAll("#discover-category-chips .filter-chip").forEach(chip => {
      if (chip.dataset.category === category) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });
    this.renderDiscover();
  }

  resetFilters() {
    this.searchQuery = "";
    this.selectedCategory = "all";
    const sInput = document.getElementById("discover-search-input");
    if (sInput) sInput.value = "";
    const fLevel = document.getElementById("filter-level");
    if (fLevel) fLevel.value = "all";
    const fFormat = document.getElementById("filter-format");
    if (fFormat) fFormat.value = "all";
    const fRating = document.getElementById("filter-rating");
    if (fRating) fRating.value = "0";

    this.setCategoryFilter("all");
    this.renderDiscover();
  }

  // =========================================================================
  // VIEW 4: AI Matching Engine Matrix
  // =========================================================================
  computeAIMatches() {
    if (!this.activeUser) return;
    const active = this.activeUser;
    const matches = [];

    this.users.forEach(otherUser => {
      if (otherUser.id === active.id) return;

      // What active teaches vs what other wants to learn
      const activeTeaches = active.teachingSkills.map(s => s.name.toLowerCase());
      const otherWants = otherUser.learningSkills.map(s => s.name.toLowerCase());
      const forwardMatches = activeTeaches.filter(s => otherWants.some(ow => ow.includes(s) || s.includes(ow)));

      // What active wants to learn vs what other teaches
      const activeWants = active.learningSkills.map(s => s.name.toLowerCase());
      const otherTeaches = otherUser.teachingSkills.map(s => s.name.toLowerCase());
      const backwardMatches = activeWants.filter(s => otherTeaches.some(ot => ot.includes(s) || s.includes(ot)));

      let baseScore = 60;
      let isReciprocal = false;

      if (forwardMatches.length > 0 && backwardMatches.length > 0) {
        baseScore = 92 + Math.min(6, (forwardMatches.length + backwardMatches.length) * 2);
        isReciprocal = true;
      } else if (backwardMatches.length > 0) {
        baseScore = 78 + Math.floor(Math.random() * 8);
      } else if (forwardMatches.length > 0) {
        baseScore = 72 + Math.floor(Math.random() * 8);
      } else {
        baseScore = 65 + Math.floor(Math.random() * 10);
      }

      // Generate natural language explanation
      let reason = "";
      if (isReciprocal) {
        const teachName = active.teachingSkills[0]?.name || "Tech";
        const learnName = otherUser.teachingSkills[0]?.name || "Skills";
        reason = `You want to learn ${learnName} and ${otherUser.name.split(" ")[0]} wants to learn ${teachName}. You can teach ${teachName} (${active.teachingSkills[0]?.level || 'Pro'}), while ${otherUser.name.split(" ")[0]} is an experienced mentor in ${learnName}. You both have matching weekend availability!`;
      } else if (backwardMatches.length > 0) {
        reason = `${otherUser.name.split(" ")[0]} teaches ${otherUser.teachingSkills[0]?.name}, matching your learning goal. You can exchange skill credits or teach complementary concepts in your domain.`;
      } else {
        reason = `High interdisciplinary synergy between ${active.title.split(" ")[0]} and ${otherUser.title.split(" ")[0]}. Broad knowledge overlap for cross-functional co-learning.`;
      }

      matches.push({
        id: `match-${active.id}-${otherUser.id}`,
        targetUserId: otherUser.id,
        matchScore: Math.min(99, baseScore),
        synergyScore: Math.min(99, baseScore + 2),
        availabilityScore: 92,
        styleScore: 95,
        isReciprocal: isReciprocal,
        reason: reason,
        forwardMatchSkill: forwardMatches[0] || active.teachingSkills[0]?.name,
        backwardMatchSkill: backwardMatches[0] || otherUser.teachingSkills[0]?.name
      });
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);
    this.aiMatches = matches;

    const navBadge = document.getElementById("nav-match-count");
    if (navBadge) navBadge.textContent = matches.length;
  }

  refreshAIMatches() {
    this.computeAIMatches();
    this.renderMatches();
    this.showToast("AI compatibility matrix re-computed across network!", "success");
  }

  renderMatches() {
    const container = document.getElementById("ai-matches-list-container");
    const teachSummary = document.getElementById("ai-active-teach-summary");
    const learnSummary = document.getElementById("ai-active-learn-summary");

    if (teachSummary && this.activeUser) {
      teachSummary.textContent = this.activeUser.teachingSkills.map(s => s.name).join(", ");
    }
    if (learnSummary && this.activeUser) {
      learnSummary.textContent = this.activeUser.learningSkills.map(s => s.name).join(", ");
    }

    if (!container) return;

    container.innerHTML = this.aiMatches.map(match => {
      const target = this.users.find(u => u.id === match.targetUserId);
      if (!target) return "";

      return `
        <div class="ai-match-card ${match.matchScore >= 90 ? 'perfect-match' : ''}">
          <div class="ai-card-top">
            <div class="ai-target-user-info">
              <img src="${target.avatar}" alt="${target.name}" class="ai-target-avatar">
              <div class="ai-target-meta">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <h3>${target.name}</h3>
                  <span class="badge badge-gold">${target.badge}</span>
                  ${match.isReciprocal ? '<span class="badge badge-emerald">✨ Perfect Reciprocal Pair</span>' : ''}
                </div>
                <p>${target.title} • 📍 ${target.location}</p>
                <div style="margin-top: 0.35rem; display: flex; gap: 0.4rem;">
                  <span class="badge badge-subtle">Teaches: ${target.teachingSkills.map(s => s.name).slice(0, 3).join(", ")}</span>
                  <span class="badge badge-subtle">Wants: ${target.learningSkills.map(s => s.name).slice(0, 2).join(", ")}</span>
                </div>
              </div>
            </div>

            <div class="ai-score-radial-box">
              <span class="ai-percentage-badge">${match.matchScore}%</span>
              <span class="ai-percentage-label">AI Compatibility</span>
            </div>
          </div>

          <!-- Why Recommended Box -->
          <div class="ai-reason-box">
            <div class="ai-reason-header">
              <i data-lucide="sparkles"></i>
              <span>Why This Match Is Recommended By AI</span>
            </div>
            <p class="ai-reason-text">${match.reason}</p>
          </div>

          <!-- Compatibility Breakdown Radar Bars -->
          <div class="ai-metrics-bars">
            <div class="metric-bar-item">
              <div class="metric-bar-head">
                <span>Skill Synergies</span>
                <strong>${match.synergyScore}%</strong>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${match.synergyScore}%;"></div>
              </div>
            </div>

            <div class="metric-bar-item">
              <div class="metric-bar-head">
                <span>Availability Overlap</span>
                <strong>${match.availabilityScore}%</strong>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${match.availabilityScore}%; background: var(--grad-currency);"></div>
              </div>
            </div>

            <div class="metric-bar-item">
              <div class="metric-bar-head">
                <span>Learning Chemistry</span>
                <strong>${match.styleScore}%</strong>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${match.styleScore}%; background: var(--grad-emerald);"></div>
              </div>
            </div>
          </div>

          <div class="ai-card-actions">
            <button class="btn btn-secondary btn-sm" onclick="app.openProfileModal('${target.id}')">
              View Profile & Reviews
            </button>
            <button class="btn btn-secondary btn-sm" onclick="app.openChat('${target.id}')">
              <i data-lucide="message-square"></i> Send Message
            </button>
            <button class="btn btn-primary" onclick="app.openRequestSwapModal('${target.id}')">
              <i data-lucide="repeat"></i> Request Skill Swap (10 ⚡)
            </button>
          </div>
        </div>
      `;
    }).join("");

    this.initLucide();
  }

  runCustomAISimulation() {
    const offer = document.getElementById("sim-offer-input")?.value.trim();
    const want = document.getElementById("sim-want-input")?.value.trim();
    const resultBox = document.getElementById("sim-result-box");

    if (!offer || !want) {
      this.showToast("Please enter both a skill to offer and a skill to learn.", "danger");
      return;
    }

    if (resultBox) {
      resultBox.style.display = "block";
      resultBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <span class="badge badge-emerald">Simulation Complete: 94% Projected Compatibility</span>
        </div>
        <p style="font-size: 0.92rem; color: #fff; line-height: 1.6;">
          <strong>AI Analysis:</strong> Offering <strong>${offer}</strong> in exchange for <strong>${want}</strong> creates high reciprocity in the SkillSwap community. 
          There are currently <strong>8 active practitioners</strong> teaching ${want} who have indicated interest in ${offer}.
        </p>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="app.filterBySkillKeyword('${want}')">
            Explore ${want} Mentors Now
          </button>
        </div>
      `;
    }
  }

  // =========================================================================
  // VIEW 5: Skill Swap Requests Inbox
  // =========================================================================
  renderRequests() {
    this.renderRequestTab("incoming");
  }

  switchRequestTab(tabName) {
    document.querySelectorAll(".tabs-navigation-bar .tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    this.renderRequestTab(tabName);
  }

  renderRequestTab(tabName) {
    const container = document.getElementById("requests-list-container");
    const countIncoming = document.getElementById("count-incoming-req");
    const countOutgoing = document.getElementById("count-outgoing-req");

    const incomingReqs = this.requests.filter(r => r.receiverId === this.activeUser.id && r.status === "pending");
    const outgoingReqs = this.requests.filter(r => r.senderId === this.activeUser.id && r.status === "pending");
    const completedReqs = this.requests.filter(r => (r.senderId === this.activeUser.id || r.receiverId === this.activeUser.id) && r.status !== "pending");

    if (countIncoming) countIncoming.textContent = incomingReqs.length;
    if (countOutgoing) countOutgoing.textContent = outgoingReqs.length;
    if (!container) return;

    let itemsToDisplay = [];
    if (tabName === "incoming") itemsToDisplay = incomingReqs;
    else if (tabName === "outgoing") itemsToDisplay = outgoingReqs;
    else itemsToDisplay = completedReqs;

    if (itemsToDisplay.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-medium);">
          <i data-lucide="inbox" style="font-size: 2.2rem; color: var(--text-dim); margin-bottom: 0.75rem;"></i>
          <h3 style="font-size: 1.15rem; font-weight: 700;">No Requests in This Tab</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Explore mentors or check your outgoing proposals.</p>
        </div>
      `;
      this.initLucide();
      return;
    }

    container.innerHTML = itemsToDisplay.map(req => {
      const isIncoming = req.receiverId === this.activeUser.id;
      const partnerId = isIncoming ? req.senderId : req.receiverId;
      const partner = this.users.find(u => u.id === partnerId) || this.users[0];

      return `
        <div class="request-card">
          <img src="${partner.avatar}" class="req-sender-avatar" alt="${partner.name}">
          
          <div class="req-center-content">
            <div class="req-header-row">
              <span class="req-sender-name">${partner.name}</span>
              <span class="badge ${req.status === 'accepted' ? 'badge-emerald' : req.status === 'rejected' ? 'badge-danger' : 'badge-gold'}">${req.status.toUpperCase()}</span>
            </div>

            <div class="req-exchange-pill">
              <span>Offers: <strong>${req.offeredSkill}</strong></span>
              <i data-lucide="repeat" style="font-size: 0.8rem; margin: 0 4px;"></i>
              <span>Requests: <strong>${req.requestedSkill}</strong></span>
            </div>

            <p class="req-note-text">"${req.note}"</p>

            <div class="req-meta-details">
              <span>📅 Proposed: ${req.proposedDate} at ${req.proposedTime}</span>
              <span>⚡ Stake: ${req.creditStake} Credits</span>
              <span>⏱️ Duration: ${req.durationHours} Hour</span>
            </div>
          </div>

          <div class="req-action-buttons">
            ${isIncoming && req.status === 'pending' ? `
              <button class="btn btn-primary btn-sm" onclick="app.acceptRequest('${req.id}')">
                <i data-lucide="check"></i> Accept Swap
              </button>
              <button class="btn btn-secondary btn-sm" onclick="app.openScheduleSessionModal('${partner.id}')">
                Reschedule
              </button>
              <button class="btn btn-secondary btn-sm" style="color: var(--danger);" onclick="app.rejectRequest('${req.id}')">
                Decline
              </button>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="app.openChat('${partner.id}')">
                <i data-lucide="message-square"></i> Chat
              </button>
            `}
          </div>
        </div>
      `;
    }).join("");

    this.initLucide();
  }

  acceptRequest(reqId) {
    const req = this.requests.find(r => r.id === reqId);
    if (!req) return;
    req.status = "accepted";

    // Create scheduled session automatically
    const newSession = {
      id: `sess-${Date.now()}`,
      partnerId: req.senderId,
      skill: `${req.offeredSkill} ⇄ ${req.requestedSkill}`,
      role: "Exchange Partner",
      date: req.proposedDate,
      time: `${req.proposedTime} EST`,
      duration: "1 Hour",
      format: "Online (Virtual Room)",
      meetingLink: `https://meet.skillswap.peer/room-${Date.now()}`,
      status: "Scheduled",
      credits: req.creditStake,
      topic: req.note
    };
    this.sessions.unshift(newSession);

    // Add notification
    const partner = this.users.find(u => u.id === req.senderId);
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: "request",
      title: "Swap Proposal Accepted!",
      message: `Session booked with ${partner?.name || 'peer'} for ${req.proposedDate}.`,
      time: "Just now",
      read: false
    });

    this.saveState();
    this.renderRequests();
    this.renderDashboard();
    this.renderNav();
    this.showToast(`Accepted swap proposal from ${partner?.name}! Session added to agenda.`, "success");
  }

  rejectRequest(reqId) {
    const req = this.requests.find(r => r.id === reqId);
    if (!req) return;
    req.status = "rejected";
    this.saveState();
    this.renderRequests();
    this.showToast("Proposal declined politely.", "subtle");
  }

  // =========================================================================
  // VIEW 6: Skill Credit System & Wallet
  // =========================================================================
  renderCredits() {
    if (!this.activeUser) return;
    const bigNum = document.getElementById("wallet-big-num");
    const tEarned = document.getElementById("wallet-total-earned");
    const tSpent = document.getElementById("wallet-total-spent");

    if (bigNum) bigNum.textContent = this.activeUser.credits;
    if (tEarned) tEarned.textContent = `+${this.activeUser.creditsEarned} ⚡`;
    if (tSpent) tSpent.textContent = `-${this.activeUser.creditsSpent} ⚡`;

    this.filterTransactions("all");
  }

  filterTransactions(filterType) {
    const container = document.getElementById("transactions-list-container");
    if (!container) return;

    let txs = this.transactions;
    if (filterType === "credit") txs = txs.filter(t => t.amount > 0);
    if (filterType === "debit") txs = txs.filter(t => t.amount < 0);

    container.innerHTML = txs.map(t => {
      const isPositive = t.amount > 0;
      return `
        <div class="tx-row">
          <div class="tx-info-block">
            <div class="tx-type-icon" style="background: ${isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; color: ${isPositive ? '#34d399' : '#fbbf24'};">
              <i data-lucide="${isPositive ? 'arrow-down-left' : 'arrow-up-right'}"></i>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${t.title}</div>
              <div style="font-size: 0.78rem; color: var(--text-dim);">Peer: ${t.partner} • ${t.date}</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <span class="badge badge-subtle">${t.status}</span>
            <span class="tx-amount-badge ${isPositive ? 'positive' : 'negative'}">
              ${isPositive ? '+' : ''}${t.amount} ⚡
            </span>
          </div>
        </div>
      `;
    }).join("");

    this.initLucide();
  }

  simulateCompletedSession() {
    this.activeUser.credits += 10;
    this.activeUser.creditsEarned += 10;
    this.activeUser.hoursTaught += 1;
    this.activeUser.swapsCompleted += 1;

    const newTx = {
      id: `tx-${Date.now()}`,
      type: "credit",
      title: "Completed 1-Hour Peer Teaching Session",
      partner: "Verified Community Learner",
      amount: 10,
      date: "Just now",
      status: "Completed",
      icon: "arrow-down-left"
    };
    this.transactions.unshift(newTx);

    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      type: "credits",
      title: "+10 Skill Credits Deposited!",
      message: "Completed verified 1-hour teaching session.",
      time: "Just now",
      read: false
    });

    this.saveState();
    this.renderCredits();
    this.renderNav();
    this.renderDashboard();
    this.showToast("Session marked completed! +10 ⚡ added to your Knowledge Wallet.", "currency");
  }

  // =========================================================================
  // VIEW 7: Messaging & Learning Sessions
  // =========================================================================
  renderMessages() {
    this.renderChatUsersList();
    this.renderActiveChatThread();
    this.renderMessagesAgenda();
  }

  renderChatUsersList() {
    const container = document.getElementById("chat-users-list");
    if (!container) return;

    // Peers with chats or seed peers
    const peerIds = Object.keys(this.chats);

    container.innerHTML = peerIds.map(pid => {
      const peer = this.users.find(u => u.id === pid);
      if (!peer) return "";
      const isActive = pid === this.activeChatPartnerId;
      const lastMsg = this.chats[pid][this.chats[pid].length - 1];

      return `
        <div class="chat-user-item ${isActive ? 'active' : ''}" onclick="app.openChat('${pid}')">
          <div class="chat-avatar-frame">
            <img src="${peer.avatar}" class="chat-avatar-img" alt="${peer.name}">
            <span class="online-dot"></span>
          </div>
          <div style="flex: 1; overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <h5 style="font-size: 0.92rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${peer.name}</h5>
              <span style="font-size: 0.7rem; color: var(--text-dim);">${lastMsg ? lastMsg.time.split(",")[0] : ''}</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${lastMsg ? lastMsg.text : 'Tap to start swap conversation...'}
            </p>
          </div>
        </div>
      `;
    }).join("");
  }

  openChat(peerId) {
    this.activeChatPartnerId = peerId;
    if (!this.chats[peerId]) {
      this.chats[peerId] = [
        { sender: peerId, text: `Hi ${this.activeUser.name.split(" ")[0]}! Thanks for connecting on SkillSwap. Looking forward to trading knowledge with you!`, time: "Just now" }
      ];
    }
    this.navigate("messages");
    this.renderMessages();
  }

  renderActiveChatThread() {
    const peer = this.users.find(u => u.id === this.activeChatPartnerId) || this.users[1];
    const headerAvatar = document.getElementById("chat-header-avatar");
    const headerName = document.getElementById("chat-header-name");
    const headerRole = document.getElementById("chat-header-role");
    const container = document.getElementById("chat-messages-container");

    if (headerAvatar) headerAvatar.src = peer.avatar;
    if (headerName) headerName.textContent = peer.name;
    if (headerRole) headerRole.textContent = `● Online • ${peer.title}`;

    if (!container) return;
    const messages = this.chats[this.activeChatPartnerId] || [];

    container.innerHTML = messages.map(m => {
      const isOutgoing = m.sender === this.activeUser.id;
      return `
        <div class="chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">
          <div>${m.text}</div>
          <span class="bubble-time">${m.time}</span>
        </div>
      `;
    }).join("");

    container.scrollTop = container.scrollHeight;
  }

  sendChatMessage() {
    const input = document.getElementById("chat-input");
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = "";

    const userMsg = {
      sender: this.activeUser.id,
      text: text,
      time: "Just now"
    };

    if (!this.chats[this.activeChatPartnerId]) {
      this.chats[this.activeChatPartnerId] = [];
    }
    this.chats[this.activeChatPartnerId].push(userMsg);
    this.saveState();
    this.renderActiveChatThread();
    this.renderChatUsersList();

    // Simulated Auto-Reply from Peer after 1.4s
    const partnerId = this.activeChatPartnerId;
    const partner = this.users.find(u => u.id === partnerId);
    setTimeout(() => {
      const replies = [
        "Sounds like a great plan! Sunday 3:00 PM works nicely for me.",
        "Awesome! I've prepped a mini outline for our session. See you in the virtual room!",
        "Perfect, thank you! Looking forward to diving into this exchange.",
        "Great idea. I'll make sure to have Figma and our test components ready."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      this.chats[partnerId].push({
        sender: partnerId,
        text: randomReply,
        time: "Just now"
      });
      this.saveState();
      if (this.activeChatPartnerId === partnerId) {
        this.renderActiveChatThread();
      }
      this.renderChatUsersList();
      this.showToast(`New message from ${partner?.name || 'Peer'}`, "subtle");
    }, 1400);
  }

  renderMessagesAgenda() {
    const container = document.getElementById("messages-agenda-container");
    if (!container) return;

    container.innerHTML = this.sessions.map(s => {
      const partner = this.users.find(u => u.id === s.partnerId) || this.users[0];
      return `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <div style="font-weight: 700; font-size: 0.88rem; color: #fff;">${s.skill}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin: 2px 0 6px;">With ${partner.name}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
            <span>📅 ${s.date}</span>
            <span class="badge badge-emerald" style="font-size: 0.7rem;">${s.status}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  launchVirtualRoom(sessionId) {
    const modal = document.getElementById("modal-virtual-room");
    if (modal) {
      modal.classList.add("active");
      this.initLucide();
    }
  }

  finishSessionFromCall() {
    this.closeModal("modal-virtual-room");
    this.simulateCompletedSession();
    this.showToast("Virtual swap session finalized! Credits successfully transferred.", "currency");
  }

  // =========================================================================
  // VIEW 8: Personalized AI Learning Path
  // =========================================================================
  renderLearningPaths() {
    const cardsContainer = document.getElementById("path-selector-cards");
    const timelineContainer = document.getElementById("path-timeline-view");

    if (cardsContainer) {
      cardsContainer.innerHTML = this.learningPaths.map(p => {
        const isActive = p.id === this.activePathId;
        return `
          <div class="path-card-selector ${isActive ? 'active' : ''}" onclick="app.selectLearningPath('${p.id}')">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="badge badge-primary">${p.category}</span>
              <span style="font-size: 0.82rem; font-weight: 700; color: #34d399;">${p.progress}% Completed</span>
            </div>
            <h4 style="font-size: 1.1rem; font-weight: 700;">${p.title}</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted);">${p.summary}</p>
            <div class="bar-track" style="margin-top: 0.5rem;">
              <div class="bar-fill" style="width: ${p.progress}%;"></div>
            </div>
          </div>
        `;
      }).join("");
    }

    if (timelineContainer) {
      const activePath = this.learningPaths.find(p => p.id === this.activePathId) || this.learningPaths[0];
      timelineContainer.innerHTML = `
        <div class="timeline-progress-banner">
          <div>
            <span class="badge badge-gold" style="margin-bottom: 0.5rem;"><i data-lucide="award"></i> Career Target: ${activePath.targetRole}</span>
            <h2 style="font-size: 1.6rem; font-weight: 700;">${activePath.title}</h2>
            <p style="color: var(--text-muted); font-size: 0.92rem;">${activePath.summary}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 800; color: #34d399;">${activePath.progress}%</div>
            <span style="font-size: 0.78rem; color: var(--text-dim); font-weight: 600; text-transform: uppercase;">Curriculum Progress</span>
          </div>
        </div>

        <div class="timeline-steps-list">
          ${activePath.milestones.map((m, idx) => `
            <div class="timeline-step-row">
              <button class="step-marker-btn ${m.completed ? 'completed' : ''}" onclick="app.toggleMilestone('${activePath.id}', '${m.id}')" title="Click to toggle completed">
                ${m.completed ? '✓' : idx + 1}
              </button>
              <div class="timeline-step-info">
                <h4 style="${m.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${m.title}</h4>
                <p>💡 Mentor Insight: "${m.mentorTip}"</p>
              </div>
              <div>
                <button class="btn btn-secondary btn-sm" onclick="app.filterBySkillKeyword('${m.title.split(' ')[0]}')">
                  Find Mentor for this Step
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    this.initLucide();
  }

  selectLearningPath(pathId) {
    this.activePathId = pathId;
    this.renderLearningPaths();
  }

  toggleMilestone(pathId, milestoneId) {
    const path = this.learningPaths.find(p => p.id === pathId);
    if (!path) return;
    const milestone = path.milestones.find(m => m.id === milestoneId);
    if (!milestone) return;

    milestone.completed = !milestone.completed;
    const completedCount = path.milestones.filter(m => m.completed).length;
    path.progress = Math.round((completedCount / path.milestones.length) * 100);

    this.saveState();
    this.renderLearningPaths();
    this.showToast(`Updated milestone: "${milestone.title}"`, "success");
  }

  generateCustomPath() {
    const input = document.getElementById("custom-path-input");
    if (!input || !input.value.trim()) {
      this.showToast("Please enter a skill topic to generate a roadmap.", "danger");
      return;
    }

    const title = input.value.trim();
    const newPath = {
      id: `path-${Date.now()}`,
      title: `${title} Mastery Curriculum`,
      category: "Specialized",
      targetRole: `${title} Practitioner`,
      summary: `AI generated 5-step curriculum to achieve proficiency in ${title}.`,
      progress: 0,
      milestones: [
        { id: "m1", title: `${title} Foundations & Core Concepts`, completed: false, mentorTip: "Grasp fundamental grammar and terminology." },
        { id: "m2", title: `Tools, Setup & Industry Standards`, completed: false, mentorTip: "Configure modern toolchain and best workflows." },
        { id: "m3", title: `Intermediate Practical Hands-On Exercises`, completed: false, mentorTip: "Build 2 guided projects with feedback." },
        { id: "m4", title: `Advanced Optimization & Edge Cases`, completed: false, mentorTip: "Learn debugging and production hurdles." },
        { id: "m5", title: `Full Capstone Project & Peer Code Review`, completed: false, mentorTip: "Swap your final deliverable with a SkillSwap peer." }
      ],
      recommendedMentors: [this.users[0].id]
    };

    this.learningPaths.unshift(newPath);
    this.activePathId = newPath.id;
    input.value = "";
    this.saveState();
    this.renderLearningPaths();
    this.showToast(`Generated AI Learning Roadmap for ${title}!`, "success");
  }

  // =========================================================================
  // VIEW 9: Community Hub & Posts
  // =========================================================================
  renderCommunity() {
    this.filterCommunityPosts("all");
  }

  filterCommunityPosts(category) {
    document.querySelectorAll("#community-category-filter .filter-chip").forEach(c => {
      c.classList.toggle("active", c.dataset.cat === category);
    });

    const container = document.getElementById("community-posts-container");
    if (!container) return;

    let posts = this.communityPosts;
    if (category !== "all") {
      posts = posts.filter(p => p.category === category);
    }

    container.innerHTML = posts.map(post => {
      const author = this.users.find(u => u.id === post.authorId) || this.users[0];
      return `
        <div class="community-post-card">
          <div class="post-card-author-row">
            <div class="post-author-meta">
              <img src="${author.avatar}" class="post-author-avatar" alt="${author.name}">
              <div>
                <h4 style="font-size: 0.95rem; font-weight: 700;">${author.name}</h4>
                <p style="font-size: 0.75rem; color: var(--text-dim);">${author.title} • ${post.timestamp}</p>
              </div>
            </div>
            <span class="badge badge-primary">${post.category}</span>
          </div>

          <h3 class="post-card-title">${post.title}</h3>
          <p class="post-card-body">${post.content}</p>

          <div class="post-card-actions">
            <button class="post-action-btn" onclick="app.likePost('${post.id}')">
              <i data-lucide="heart"></i> <span>${post.likes}</span>
            </button>
            <button class="post-action-btn" onclick="app.openChat('${author.id}')">
              <i data-lucide="message-circle"></i> <span>${post.commentsCount} Comments</span>
            </button>
            <button class="btn btn-secondary btn-sm" style="margin-left: auto;" onclick="app.openRequestSwapModal('${author.id}')">
              <i data-lucide="repeat"></i> Request Swap with Author
            </button>
          </div>
        </div>
      `;
    }).join("");

    this.initLucide();
  }

  likePost(postId) {
    const post = this.communityPosts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      this.saveState();
      this.renderCommunity();
      this.showToast("Post liked!", "subtle");
    }
  }

  publishCommunityPost() {
    const title = document.getElementById("new-post-title")?.value.trim();
    const content = document.getElementById("new-post-content")?.value.trim();
    const category = document.getElementById("new-post-category")?.value || "Programming";

    if (!title || !content) {
      this.showToast("Please provide both a title and post description.", "danger");
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      authorId: this.activeUser.id,
      category: category,
      title: title,
      content: content,
      likes: 1,
      commentsCount: 0,
      timestamp: "Just now",
      badge: "Member Post",
      comments: []
    };

    this.communityPosts.unshift(newPost);
    document.getElementById("new-post-title").value = "";
    document.getElementById("new-post-content").value = "";

    this.saveState();
    this.renderCommunity();
    this.showToast("Post published to the SkillSwap community!", "success");
  }

  // =========================================================================
  // VIEW 10: Leaderboard
  // =========================================================================
  renderLeaderboard() {
    const podiumContainer = document.getElementById("leaderboard-podium");
    const tableBody = document.getElementById("leaderboard-table-body");

    // Top 3 for Podium
    const top3 = this.leaderboard.slice(0, 3);
    if (podiumContainer && top3.length >= 3) {
      const u1 = this.users.find(u => u.id === top3[0].userId) || this.users[0];
      const u2 = this.users.find(u => u.id === top3[1].userId) || this.users[1];
      const u3 = this.users.find(u => u.id === top3[2].userId) || this.users[2];

      podiumContainer.innerHTML = `
        <!-- Second Place -->
        <div class="podium-seat second">
          <span style="font-size: 1.5rem;">🥈</span>
          <img src="${u2.avatar}" class="podium-avatar silver" alt="${u2.name}">
          <h4 style="font-size: 1rem; font-weight: 700; margin-top: 0.5rem;">${u2.name}</h4>
          <span class="badge badge-subtle">Silver Mentor</span>
          <span style="font-weight: 800; color: #cbd5e1; margin-top: 4px;">${top3[1].creditsEarned} ⚡</span>
        </div>

        <!-- First Place -->
        <div class="podium-seat first">
          <span class="podium-crown">👑</span>
          <img src="${u1.avatar}" class="podium-avatar" alt="${u1.name}">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 0.5rem;">${u1.name}</h3>
          <span class="badge badge-gold">Top Mentor Champion</span>
          <span style="font-weight: 800; font-size: 1.25rem; color: #fbbf24; margin-top: 4px;">${top3[0].creditsEarned} ⚡</span>
        </div>

        <!-- Third Place -->
        <div class="podium-seat third">
          <span style="font-size: 1.5rem;">🥉</span>
          <img src="${u3.avatar}" class="podium-avatar bronze" alt="${u3.name}">
          <h4 style="font-size: 1rem; font-weight: 700; margin-top: 0.5rem;">${u3.name}</h4>
          <span class="badge badge-subtle">Bronze Mentor</span>
          <span style="font-weight: 800; color: #d97706; margin-top: 4px;">${top3[2].creditsEarned} ⚡</span>
        </div>
      `;
    }

    // Full Table
    if (tableBody) {
      tableBody.innerHTML = this.leaderboard.map(lb => {
        const u = this.users.find(usr => usr.id === lb.userId) || this.users[0];
        const isSelf = u.id === this.activeUser.id;
        return `
          <tr style="${isSelf ? 'background: rgba(99,102,241,0.1);' : ''}">
            <td style="font-weight: 800; color: ${lb.rank <= 3 ? '#fbbf24' : 'var(--text-muted)'};">#${lb.rank}</td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="${u.avatar}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                <div>
                  <div style="font-weight: 700;">${u.name} ${isSelf ? '<span class="badge badge-primary" style="font-size: 0.65rem;">You</span>' : ''}</div>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">${u.location}</div>
                </div>
              </div>
            </td>
            <td>${lb.skillsTaught}</td>
            <td style="font-weight: 700;">${lb.hoursTaught} hrs</td>
            <td style="font-weight: 800; color: #fbbf24;">${lb.creditsEarned} ⚡</td>
            <td>${lb.swapsCompleted}</td>
            <td><span class="badge badge-gold">${lb.badge}</span></td>
          </tr>
        `;
      }).join("");
    }
  }

  // =========================================================================
  // NOTIFICATIONS SYSTEM
  // =========================================================================
  renderNotifications() {
    const list = document.getElementById("notif-items-list");
    if (!list) return;

    list.innerHTML = this.notifications.map(n => `
      <div style="padding: 0.85rem 1.25rem; border-bottom: 1px solid var(--border-subtle); background: ${n.read ? 'transparent' : 'rgba(99,102,241,0.08)'}; cursor: pointer;" onclick="app.handleNotifClick('${n.action}')">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h5 style="font-size: 0.85rem; font-weight: 700; color: ${n.read ? 'var(--text-muted)' : '#fff'};">${n.title}</h5>
          <span style="font-size: 0.7rem; color: var(--text-dim);">${n.time}</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">${n.message}</p>
      </div>
    `).join("");
  }

  handleNotifClick(action) {
    if (action === "open-matches") this.navigate("matches");
    if (action === "open-requests") this.navigate("requests");
    if (action === "open-sessions") this.navigate("dashboard");
    if (action === "open-wallet") this.navigate("credits");
    this.markAllNotifsRead();
    this.toggleNotifDropdown();
  }

  markAllNotifsRead() {
    this.notifications.forEach(n => n.read = true);
    this.renderNav();
    this.renderNotifications();
  }

  // =========================================================================
  // MODALS & FORMS
  // =========================================================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  openOfferSkillModal() {
    this.openModal("modal-offer-skill");
  }

  submitNewSkillTeach() {
    const name = document.getElementById("offer-skill-name")?.value.trim();
    const cat = document.getElementById("offer-skill-category")?.value;
    const level = document.getElementById("offer-skill-level")?.value;
    const years = parseInt(document.getElementById("offer-skill-years")?.value || "3");

    if (!name) return;

    this.activeUser.teachingSkills.push({
      name: name,
      category: cat,
      level: level,
      years: years,
      hourlyRate: 10,
      demand: "High"
    });

    this.saveState();
    this.computeAIMatches();
    this.closeModal("modal-offer-skill");
    this.renderDashboard();
    this.renderDiscover();
    this.showToast(`Added ${name} to your teaching catalog!`, "success");
  }

  openAddLearningSkillModal() {
    this.openModal("modal-add-learning-skill");
  }

  submitNewSkillLearn() {
    const name = document.getElementById("learn-skill-name")?.value.trim();
    const cat = document.getElementById("learn-skill-category")?.value;
    const target = document.getElementById("learn-skill-target-level")?.value;

    if (!name) return;

    this.activeUser.learningSkills.push({
      name: name,
      category: cat,
      targetLevel: target,
      priority: "High"
    });

    this.saveState();
    this.computeAIMatches();
    this.closeModal("modal-add-learning-skill");
    this.renderDashboard();
    this.renderMatches();
    this.showToast(`Saved ${name} as a target learning goal!`, "success");
  }

  openRequestSwapModal(mentorId) {
    this.targetSwapMentorId = mentorId;
    const mentor = this.users.find(u => u.id === mentorId);
    if (!mentor) return;

    const targetAvatar = document.getElementById("modal-req-target-avatar");
    const targetName = document.getElementById("modal-req-target-name");
    const learnSelect = document.getElementById("modal-req-learn-skill");
    const teachSelect = document.getElementById("modal-req-teach-skill");
    const dateInput = document.getElementById("modal-req-date");

    if (targetAvatar) targetAvatar.src = mentor.avatar;
    if (targetName) targetName.textContent = mentor.name;

    if (learnSelect) {
      learnSelect.innerHTML = mentor.teachingSkills.map(s => `
        <option value="${s.name}">${s.name} (${s.level})</option>
      `).join("");
    }

    if (teachSelect) {
      teachSelect.innerHTML = this.activeUser.teachingSkills.map(s => `
        <option value="${s.name}">${s.name} (${s.level})</option>
      `).join("");
    }

    // Set default tomorrow date
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      dateInput.value = tomorrow.toISOString().split("T")[0];
    }

    this.openModal("modal-request-swap");
  }

  submitSwapRequest() {
    const mentor = this.users.find(u => u.id === this.targetSwapMentorId);
    if (!mentor) return;

    const learnSkill = document.getElementById("modal-req-learn-skill")?.value;
    const teachSkill = document.getElementById("modal-req-teach-skill")?.value;
    const date = document.getElementById("modal-req-date")?.value;
    const time = document.getElementById("modal-req-time")?.value;
    const note = document.getElementById("modal-req-note")?.value || "Looking forward to this swap!";

    const newReq = {
      id: `req-${Date.now()}`,
      senderId: this.activeUser.id,
      receiverId: mentor.id,
      type: "outgoing",
      status: "pending",
      offeredSkill: teachSkill,
      requestedSkill: learnSkill,
      proposedDate: date,
      proposedTime: time,
      durationHours: 1,
      creditStake: 10,
      note: note,
      createdAt: new Date().toISOString()
    };

    this.requests.unshift(newReq);
    this.saveState();
    this.closeModal("modal-request-swap");
    this.showToast(`Swap proposal sent to ${mentor.name}!`, "success");
    this.navigate("requests");
  }

  openProfileModal(userId) {
    const user = this.users.find(u => u.id === userId);
    if (!user) return;

    const body = document.getElementById("modal-user-profile-body");
    if (!body) return;

    body.innerHTML = `
      <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
        <div class="avatar-container-editable" onclick="${user.id === this.activeUser.id ? 'app.closeModal(\'modal-user-profile\'); app.openEditPhotoModal();' : ''}" style="${user.id === this.activeUser.id ? 'cursor: pointer;' : ''}">
          <img src="${user.avatar}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary);">
          ${user.id === this.activeUser.id ? '<button class="avatar-edit-badge" type="button" title="Change Photo"><i data-lucide="camera"></i></button>' : ''}
        </div>
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 700;">${user.name}</h2>
          <p style="font-size: 0.9rem; color: var(--text-muted);">${user.title}</p>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-gold">★ ${user.rating} (${user.reviewsCount} reviews)</span>
            <span class="badge badge-emerald">📍 ${user.location}</span>
            <span class="badge badge-primary">${user.badge}</span>
            ${user.id === this.activeUser.id ? '<button class="btn btn-secondary btn-sm" onclick="app.closeModal(\'modal-user-profile\'); app.openEditPhotoModal();" style="padding: 2px 8px; font-size: 0.72rem;"><i data-lucide="camera"></i> Change Photo</button>' : ''}
          </div>
        </div>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.4rem;">About & Teaching Philosophy</h4>
        <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6;">${user.bio}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem;">
        <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md);">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.5rem;">Skills Taught</h4>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${user.teachingSkills.map(s => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="font-weight: 600;">${s.name}</span>
                <span class="badge badge-primary">${s.level}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md);">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.5rem;">Skills Wanted in Return</h4>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${user.learningSkills.map(s => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="font-weight: 600;">${s.name}</span>
                <span class="badge badge-gold">${s.targetLevel}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem;">Verified Peer Reviews (${user.reviews.length})</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${user.reviews.map(r => `
            <div style="background: rgba(0,0,0,0.25); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: 700; font-size: 0.85rem;">${r.author}</span>
                <span style="color: #fbbf24; font-size: 0.8rem;">★★★★★</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-muted);">"${r.comment}"</p>
            </div>
          `).join("")}
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem;">
        ${user.id === this.activeUser.id ? `
          <button class="btn btn-primary" style="flex: 1;" onclick="app.closeModal('modal-user-profile'); app.openEditPhotoModal();">
            <i data-lucide="camera"></i> Change Profile Photo
          </button>
        ` : `
          <button class="btn btn-secondary" style="flex: 1;" onclick="app.closeModal('modal-user-profile'); app.openChat('${user.id}')">
            <i data-lucide="message-square"></i> Send Message
          </button>
          <button class="btn btn-primary" style="flex: 1;" onclick="app.closeModal('modal-user-profile'); app.openRequestSwapModal('${user.id}')">
            <i data-lucide="repeat"></i> Request Swap (10 ⚡)
          </button>
        `}
      </div>
    `;

    this.openModal("modal-user-profile");
    this.initLucide();
  }

  openScheduleSessionModal(targetPeerId) {
    const partnerSelect = document.getElementById("modal-sched-partner");
    const dateInput = document.getElementById("modal-sched-date");

    if (partnerSelect) {
      partnerSelect.innerHTML = this.users
        .filter(u => u.id !== this.activeUser.id)
        .map(u => `
          <option value="${u.id}" ${targetPeerId === u.id ? 'selected' : ''}>${u.name} (${u.title})</option>
        `).join("");
    }

    if (dateInput) {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      dateInput.value = d.toISOString().split("T")[0];
    }

    this.openModal("modal-schedule-session");
  }

  submitScheduleSession() {
    const partnerId = document.getElementById("modal-sched-partner")?.value;
    const topic = document.getElementById("modal-sched-topic")?.value.trim();
    const date = document.getElementById("modal-sched-date")?.value;
    const time = document.getElementById("modal-sched-time")?.value;
    const format = document.getElementById("modal-sched-format")?.value;

    if (!topic || !date) return;

    const newSess = {
      id: `sess-${Date.now()}`,
      partnerId: partnerId,
      skill: topic,
      role: "Exchange Partner",
      date: date,
      time: `${time} EST`,
      duration: "1 Hour",
      format: format,
      meetingLink: `https://meet.skillswap.peer/room-${Date.now()}`,
      status: "Scheduled",
      credits: 10,
      topic: topic
    };

    this.sessions.unshift(newSess);
    this.saveState();
    this.closeModal("modal-schedule-session");
    this.renderDashboard();
    this.renderMessages();
    this.showToast(`Session successfully scheduled for ${date}!`, "success");
  }

  // =========================================================================
  // AUTHENTICATION MODAL (LOGIN & SIGN UP)
  // =========================================================================
  openAuthModal(tab) {
    this.switchAuthTab(tab || "signup");
    this.openModal("modal-auth");
  }

  switchAuthTab(tab) {
    const isSignup = tab === "signup";
    const signupTab = document.getElementById("auth-tab-signup");
    const loginTab = document.getElementById("auth-tab-login");
    const signupForm = document.getElementById("form-auth-signup");
    const loginForm = document.getElementById("form-auth-login");
    const modalTitle = document.getElementById("auth-modal-title");

    if (signupTab) signupTab.classList.toggle("active", isSignup);
    if (loginTab) loginTab.classList.toggle("active", !isSignup);
    if (signupForm) signupForm.style.display = isSignup ? "block" : "none";
    if (loginForm) loginForm.style.display = isSignup ? "none" : "block";
    if (modalTitle) modalTitle.textContent = isSignup ? "Create Your SkillSwap Account" : "Welcome Back to SkillSwap";
  }

  handleSignupSubmit() {
    const name = document.getElementById("reg-name")?.value.trim();
    const location = document.getElementById("reg-location")?.value.trim();
    const format = document.getElementById("reg-format")?.value;
    const teachRaw = document.getElementById("reg-skills-teach")?.value.trim();
    const learnRaw = document.getElementById("reg-skills-learn")?.value.trim();
    const level = document.getElementById("reg-level")?.value;
    const availability = document.getElementById("reg-availability")?.value;
    const photo = document.getElementById("reg-photo-preset")?.value;

    if (!name || !teachRaw || !learnRaw) {
      this.showToast("Please fill all required registration fields.", "danger");
      return;
    }

    const teachSkills = teachRaw.split(",").map(s => ({
      name: s.trim(),
      level: level,
      category: "Programming",
      years: 3,
      hourlyRate: 10,
      demand: "High"
    }));

    const learnSkills = learnRaw.split(",").map(s => ({
      name: s.trim(),
      targetLevel: "Intermediate",
      category: "Design",
      priority: "Highest"
    }));

    const newUser = {
      id: `user-${Date.now()}`,
      name: name,
      title: `${teachSkills[0]?.name || 'Skill'} Practitioner`,
      avatar: photo,
      cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      location: location,
      rating: 5.0,
      reviewsCount: 0,
      credits: 50, // Welcome grant!
      creditsEarned: 50,
      creditsSpent: 0,
      swapsCompleted: 0,
      hoursTaught: 0,
      badge: "Skill Explorer",
      availability: availability,
      format: format,
      bio: `Hello! I'm ${name}. Passionate about sharing my knowledge in ${teachRaw} and excited to learn ${learnRaw}!`,
      teachingSkills: teachSkills,
      learningSkills: learnSkills,
      reviews: []
    };

    this.users.unshift(newUser);
    this.activeUser = newUser;

    // Welcome Transaction
    this.transactions.unshift({
      id: `tx-${Date.now()}`,
      type: "bonus",
      title: "Welcome Grant Bonus",
      partner: "SkillSwap Genesis",
      amount: 50,
      date: "Just now",
      status: "Completed",
      icon: "sparkles"
    });

    this.saveState();
    this.computeAIMatches();
    this.closeModal("modal-auth");
    this.renderAll();
    this.navigate("dashboard");
  // =========================================================================
  // PROFILE PHOTO & EDITING MANAGEMENT
  // =========================================================================
  openEditPhotoModal() {
    if (!this.activeUser) return;
    const preview = document.getElementById("edit-photo-preview");
    const nameEl = document.getElementById("edit-photo-user-name");
    const roleEl = document.getElementById("edit-photo-user-role");
    const urlInput = document.getElementById("edit-photo-url-input");
    const fileInput = document.getElementById("edit-photo-file-input");
    const presetsContainer = document.getElementById("avatar-presets-grid");

    if (preview) preview.src = this.activeUser.avatar;
    if (nameEl) nameEl.textContent = this.activeUser.name;
    if (roleEl) roleEl.textContent = this.activeUser.title;
    if (urlInput) urlInput.value = this.activeUser.avatar.startsWith("data:") ? "" : this.activeUser.avatar;
    if (fileInput) fileInput.value = "";

    const PRESET_AVATARS = [
      { name: "Frontend Pro", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80" },
      { name: "UI Designer", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" },
      { name: "AI Scientist", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" },
      { name: "Video Creator", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80" },
      { name: "Growth Marketer", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80" },
      { name: "Photographer", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80" },
      { name: "Speaker Coach", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" },
      { name: "Software Architect", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80" },
      { name: "Product Manager", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80" },
      { name: "Creative Lead", url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80" },
      { name: "Tech Founder", url: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=250&q=80" },
      { name: "Systems Engineer", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80" }
    ];

    if (presetsContainer) {
      presetsContainer.innerHTML = PRESET_AVATARS.map(preset => {
        const isSelected = preset.url === this.activeUser.avatar;
        return `
          <img src="${preset.url}" 
               alt="${preset.name}" 
               class="avatar-preset-item ${isSelected ? 'selected' : ''}" 
               title="${preset.name}" 
               onclick="app.selectPresetAvatar('${preset.url}')">
        `;
      }).join("");
    }

    const userDropdown = document.getElementById("user-dropdown");
    if (userDropdown) userDropdown.classList.remove("show");

    this.openModal("modal-edit-profile-photo");
    this.initLucide();
  }

  selectPresetAvatar(url) {
    const preview = document.getElementById("edit-photo-preview");
    const urlInput = document.getElementById("edit-photo-url-input");
    if (preview) preview.src = url;
    if (urlInput) urlInput.value = url;

    document.querySelectorAll(".avatar-preset-item").forEach(item => {
      item.classList.toggle("selected", item.src === url);
    });
  }

  handlePhotoUrlInput(event) {
    const url = event.target.value.trim();
    const preview = document.getElementById("edit-photo-preview");
    if (url && preview) {
      preview.src = url;
      document.querySelectorAll(".avatar-preset-item").forEach(item => {
        item.classList.remove("selected");
      });
    }
  }

  handlePhotoFileUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      this.showToast("Please choose an image file (PNG, JPG, GIF, WebP).", "danger");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const preview = document.getElementById("edit-photo-preview");
      const urlInput = document.getElementById("edit-photo-url-input");
      if (preview) preview.src = dataUrl;
      if (urlInput) urlInput.value = "";
      document.querySelectorAll(".avatar-preset-item").forEach(item => {
        item.classList.remove("selected");
      });
      this.showToast("Local photo loaded for preview!", "success");
    };
    reader.readAsDataURL(file);
  }

  saveProfilePhoto() {
    const preview = document.getElementById("edit-photo-preview");
    if (!preview || !preview.src) return;

    const newPhotoUrl = preview.src;
    this.activeUser.avatar = newPhotoUrl;

    const userInList = this.users.find(u => u.id === this.activeUser.id);
    if (userInList) {
      userInList.avatar = newPhotoUrl;
    }

    this.saveState();
    this.closeModal("modal-edit-profile-photo");
    this.renderAll();
    this.showToast("Profile photo updated successfully across SkillSwap!", "success");
  }

  // Toast Notification helper
  showToast(message, type = "normal") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    let icon = "info";
    if (type === "success") icon = "check-circle";
    if (type === "currency") icon = "zap";
    if (type === "danger") icon = "alert-circle";

    toast.innerHTML = `
      <i data-lucide="${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    this.initLucide();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Global Application Instance
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new SkillSwapApp();
  window.app = app;
});
