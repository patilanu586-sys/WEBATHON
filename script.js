// Global State Storage
let currentUser = {
  name: "Alex Johnson",
  trustScore: 98,
  isLoggedIn: false
};

// Available Resources Database
let availableResources = [
  {
    id: 1,
    title: "Sony Alpha A7 III Camera Kit",
    owner: "Sarah M.",
    category: "photography",
    mode: "rent",
    fee: 300,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 2,
    title: "TI-84 Plus Graphic Calculator",
    owner: "Rohan P.",
    category: "academics",
    mode: "donate",
    fee: 0,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 3,
    title: "Arduino Starter & Sensor Kit",
    owner: "Dev K.",
    category: "electronics",
    mode: "barter",
    fee: 0,
    barterPref: "Raspberry Pi or Logic Analyzer",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 4,
    title: "Engineering Mechanics Textbook (14th Ed)",
    owner: "Priya S.",
    category: "academics",
    mode: "rent",
    fee: 40,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 5,
    title: "Portable Projector & 80-inch Screen",
    owner: "Aarav N.",
    category: "photography",
    mode: "rent",
    fee: 150,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 6,
    title: "Badminton Racket Set & Shuttlecocks",
    owner: "Karan M.",
    category: "sports",
    mode: "donate",
    fee: 0,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1626225967045-9410dd996704?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 7,
    title: "Digital Oscilloscope 50MHz",
    owner: "Vikram R.",
    category: "electronics",
    mode: "barter",
    fee: 0,
    barterPref: "Function Generator or Multimeter",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 8,
    title: "Studio Lighting Softbox Kit",
    owner: "Neha T.",
    category: "photography",
    mode: "rent",
    fee: 200,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  }
];

// Active borrowing tracker requests database
let activeUserRequests = [
  {
    id: 101,
    title: "Sony Alpha A7 III Camera Kit",
    owner: "Sarah M.",
    category: "photography",
    mode: "rent",
    fee: 300,
    status: "Accepted",
    stageIndex: 1
  },
  {
    id: 102,
    title: "TI-84 Plus Graphic Calculator",
    owner: "Rohan P.",
    category: "academics",
    mode: "donate",
    fee: 0,
    status: "Pending",
    stageIndex: 0
  },
  {
    id: 103,
    title: "Arduino Starter & Sensor Kit",
    owner: "Dev K.",
    category: "electronics",
    mode: "barter",
    fee: 0,
    status: "In Handover",
    stageIndex: 2
  },
  {
    id: 104,
    title: "Digital Oscilloscope 50MHz",
    owner: "Vikram R.",
    category: "electronics",
    mode: "barter",
    fee: 0,
    status: "Pending",
    stageIndex: 0
  },
  {
    id: 105,
    title: "Portable Projector & 80-inch Screen",
    owner: "Aarav N.",
    category: "photography",
    mode: "rent",
    fee: 150,
    status: "Returned",
    stageIndex: 3
  },
  {
    id: 106,
    title: "Engineering Mechanics Textbook (14th Ed)",
    owner: "Priya S.",
    category: "academics",
    mode: "rent",
    fee: 40,
    status: "Accepted",
    stageIndex: 1
  }
];

const lifecycleStages = ["Requested", "Accepted", "In Handover", "Returned"];
let showAllRequests = false;

// --- RESOURCE CATALOG RENDER & FILTERING ---

function renderCatalog(itemsToRender = availableResources) {
  const grid = document.getElementById("resourceGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (itemsToRender.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; background: white; border-radius: 12px;"><p>No resources match your query.</p></div>`;
    return;
  }

  itemsToRender.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    let tagClass = "tag-rent";
    let priceLabel = `₹${item.fee}/day`;
    if (item.mode === "barter") {
      tagClass = "tag-barter";
      priceLabel = "Barter";
    } else if (item.mode === "donate") {
      tagClass = "tag-donate";
      priceLabel = "Free";
    }

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="card-img" onerror="this.src='https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'">
      <div class="card-body">
        <span class="card-tag ${tagClass}">${item.mode}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-meta"><i class="fas fa-user"></i> Owner: ${item.owner}</p>
        <p class="card-meta"><i class="fas fa-info-circle"></i> Status: <strong>${item.status}</strong></p>
        ${item.barterPref ? `<p class="card-meta"><i class="fas fa-exchange-alt"></i> Pref: ${item.barterPref}</p>` : ''}
        <div class="card-footer">
          <span class="card-price">${priceLabel}</span>
          <button onclick="requestResource('${item.title.replace(/'/g, "\\'")}', '${item.owner.replace(/'/g, "\\'")}', '${item.mode}')" class="btn-approve">Request</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const keyword = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const selectedCategory = document.getElementById("categoryFilter")?.value || "all";
  const selectedMode = document.getElementById("modeFilter")?.value || "all";

  const filtered = availableResources.filter(item => {
    const matchesKeyword = item.title.toLowerCase().includes(keyword) ||
                           item.owner.toLowerCase().includes(keyword) ||
                           (item.barterPref && item.barterPref.toLowerCase().includes(keyword));

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesMode = selectedMode === "all" || item.mode === selectedMode;

    return matchesKeyword && matchesCategory && matchesMode;
  });

  renderCatalog(filtered);
}

function handleAISearch() {
  const query = (document.getElementById("aiInput")?.value || "").toLowerCase().trim();
  if (!query) {
    renderCatalog(availableResources);
    return;
  }

  const matches = availableResources.filter(item => {
    return query.split(" ").some(term => 
      term.length > 2 && (
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.mode.toLowerCase().includes(term)
      )
    );
  });

  renderCatalog(matches);
}

// --- DYNAMIC TRACKER SYSTEM ---

function renderTrackerList() {
  const container = document.getElementById("trackerCardsContainer");
  const searchVal = (document.getElementById("trackerSearch")?.value || "").toLowerCase();
  const filterVal = document.getElementById("trackerStatusFilter")?.value || "All";

  if (!container) return;

  const filteredRequests = activeUserRequests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchVal) || req.owner.toLowerCase().includes(searchVal);
    const matchesStatus = filterVal === "All" || req.status === filterVal;
    return matchesSearch && matchesStatus;
  });

  const trackerCountEl = document.getElementById("trackerCount");
  if (trackerCountEl) trackerCountEl.innerText = filteredRequests.length;

  container.innerHTML = "";

  if (filteredRequests.length === 0) {
    container.innerHTML = `<div class="card" style="padding: 20px; text-align: center;"><p>No active requests found.</p></div>`;
    return;
  }

  // Display initial set or all items based on toggle state
  const visibleRequests = showAllRequests ? filteredRequests : filteredRequests.slice(0, 3);

  visibleRequests.forEach(req => {
    const card = document.createElement("div");
    card.className = "card lifecycle-card";

    const stepperHTML = lifecycleStages.map((stage, idx) => {
      const isCompleted = idx < req.stageIndex;
      const isActive = idx === req.stageIndex;
      let stepClass = "";
      if (isCompleted) stepClass = "completed";
      if (isActive) stepClass = "active";

      return `
        <div class="step-item ${stepClass}">
          <div class="step-circle">${idx + 1}</div>
          <span class="step-label">${stage}</span>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="tracked-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px;">
        <div>
          <h3 style="margin: 0;">${req.title}</h3>
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">Owner: <strong>${req.owner}</strong> | Mode: <strong style="text-transform: capitalize;">${req.mode}</strong></p>
        </div>
        <span class="badge-stage" style="background: #eef2ff; color: #3b82f6; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 13px;">${req.status}</span>
      </div>

      <div class="stepper-wrapper">
        ${stepperHTML}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; background: #fafafa; padding: 10px; border-radius: 6px;">
        <div class="btn-group">
          <button onclick="advanceItemStage(${req.id})" class="btn-approve" style="padding: 6px 12px; margin-right: 8px;">Advance Stage</button>
          <button onclick="resetItemStage(${req.id})" style="padding: 6px 12px; background: #64748b; color: white; border: none; border-radius: 6px; cursor: pointer;">Reset</button>
        </div>
        ${req.status === 'Pending' ? `<button onclick="cancelRequest(${req.id})" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Cancel Request</button>` : ''}
      </div>
    `;

    container.appendChild(card);
  });

  // Render View More / View Less Toggle Button if more than 3 requests exist
  if (filteredRequests.length > 3) {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn-toggle-view";
    toggleBtn.innerText = showAllRequests ? "View Less" : `View More (${filteredRequests.length - 3} more)`;
    toggleBtn.onclick = toggleViewRequests;
    container.appendChild(toggleBtn);
  }
}

function toggleViewRequests() {
  showAllRequests = !showAllRequests;
  renderTrackerList();
}

function advanceItemStage(id) {
  activeUserRequests = activeUserRequests.map(req => {
    if (req.id === id) {
      const nextIndex = Math.min(req.stageIndex + 1, lifecycleStages.length - 1);
      req.stageIndex = nextIndex;
      req.status = lifecycleStages[nextIndex];
    }
    return req;
  });
  renderTrackerList();
}

function resetItemStage(id) {
  activeUserRequests = activeUserRequests.map(req => {
    if (req.id === id) {
      req.stageIndex = 0;
      req.status = lifecycleStages[0];
    }
    return req;
  });
  renderTrackerList();
}

function cancelRequest(id) {
  activeUserRequests = activeUserRequests.filter(req => req.id !== id);
  renderTrackerList();
}

function requestResource(title, owner, mode) {
  const newReq = {
    id: Date.now(),
    title: title,
    owner: owner || "Campus Member",
    category: "general",
    mode: mode || "rent",
    fee: 0,
    status: "Pending",
    stageIndex: 0
  };
  activeUserRequests.unshift(newReq);
  renderTrackerList();
  alert(`Request submitted for "${title}"! Check your Active Tracker.`);
}

// --- AUTH & CREATION ---

function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");

  if (tab === "login") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
  }
}

function handleLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById("loginEmail").value;
  currentUser.isLoggedIn = true;
  currentUser.name = emailInput.split("@")[0] || "Campus Student";
  updateAuthUI();
}

function handleRegister(event) {
  event.preventDefault();
  const nameInput = document.getElementById("regName").value;
  currentUser.isLoggedIn = true;
  currentUser.name = nameInput || "New Member";
  updateAuthUI();
}

function handleLogout() {
  currentUser.isLoggedIn = false;
  document.getElementById("authOverlay").style.display = "flex";
  document.getElementById("navUserName").innerText = "Guest User";
}

function updateAuthUI() {
  document.getElementById("authOverlay").style.display = "none";
  document.getElementById("navUserName").innerText = currentUser.name;
  document.getElementById("navTrustScore").innerText = `Trust Score: ${currentUser.trustScore}/100`;
  renderTrackerList();
}

function handleCreateResource(event) {
  event.preventDefault();
  const title = document.getElementById("newTitle").value;
  const category = document.getElementById("newCategory").value;
  const mode = document.getElementById("newMode").value;
  const fee = Number(document.getElementById("newFee").value) || 0;
  const barterPref = document.getElementById("newBarterPref").value || "";
  const image = document.getElementById("newImg").value || "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80";

  const newResource = {
    id: Date.now(),
    title: title,
    owner: currentUser.name || "Alex Johnson",
    category: category,
    mode: mode,
    fee: mode === "rent" ? fee : 0,
    barterPref: mode === "barter" ? barterPref : "",
    image: image,
    status: "Available"
  };

  availableResources.unshift(newResource);
  renderCatalog();
  closeCreateModal();
  event.target.reset();
}

function openCreateModal() {
  document.getElementById("createModal").style.display = "flex";
}
function closeCreateModal() {
  document.getElementById("createModal").style.display = "none";
}
function closeBorrowModal() {
  document.getElementById("borrowModal").style.display = "none";
}
function toggleBarterInput(mode) {
  const feeGroup = document.getElementById("feeInputGroup");
  const barterGroup = document.getElementById("barterInputGroup");
  if (mode === "rent") {
    feeGroup.style.display = "block";
    barterGroup.style.display = "none";
  } else if (mode === "barter") {
    feeGroup.style.display = "none";
    barterGroup.style.display = "block";
  } else {
    feeGroup.style.display = "none";
    barterGroup.style.display = "none";
  }
}

function approveItem(buttonElement) {
  const li = buttonElement.parentElement;
  if (li) {
    li.style.textDecoration = "line-through";
    buttonElement.disabled = true;
    buttonElement.innerText = "Approved";
  }
}

function flagUser() {
  alert("Borrower flagged. Account trust score review initiated.");
}

// Initial script execution on load
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderTrackerList();
});