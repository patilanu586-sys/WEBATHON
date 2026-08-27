// Default User State
let currentUser = {
  name: "Guest User",
  trustScore: 0,
  isLoggedIn: false,
  role: "student"
};

// Expanded Data Objects Catalog
let availableResources = [
  {
    id: 1,
    title: "Sony Alpha A7 III Camera Kit",
    owner: "Sarah M.",
    ownerTrustScore: 92,
    distanceKm: 0.3,
    suitabilityScore: 98,
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
    ownerTrustScore: 88,
    distanceKm: 0.1,
    suitabilityScore: 90,
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
    ownerTrustScore: 81,
    distanceKm: 0.8,
    suitabilityScore: 85,
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
    ownerTrustScore: 95,
    distanceKm: 0.5,
    suitabilityScore: 92,
    category: "academics",
    mode: "rent",
    fee: 40,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 5,
    title: "Raspberry Pi 4 Model B (8GB RAM)",
    owner: "Aarav N.",
    ownerTrustScore: 90,
    distanceKm: 0.2,
    suitabilityScore: 94,
    category: "electronics",
    mode: "rent",
    fee: 80,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 6,
    title: "Portable Projector 1080p HD",
    owner: "Neha G.",
    ownerTrustScore: 87,
    distanceKm: 0.6,
    suitabilityScore: 89,
    category: "electronics",
    mode: "rent",
    fee: 150,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 7,
    title: "Badminton Rackets & Shuttlecocks Set",
    owner: "Kabir M.",
    ownerTrustScore: 84,
    distanceKm: 0.4,
    suitabilityScore: 83,
    category: "sports",
    mode: "donate",
    fee: 0,
    barterPref: "",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  },
  {
    id: 8,
    title: "Digital Storage Oscilloscope 50MHz",
    owner: "Vikram R.",
    ownerTrustScore: 96,
    distanceKm: 0.7,
    suitabilityScore: 91,
    category: "electronics",
    mode: "barter",
    fee: 0,
    barterPref: "Function Generator or Soldering Station",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    status: "Available"
  }
];

// 10-Stage Lifecycle Pipeline
const lifecycleStages = [
  "Available",
  "Requested",
  "Accepted",
  "Handover",
  "Borrowed",
  "Return Due",
  "Returned",
  "Inspection",
  "Settlement",
  "Rated"
];

// Expanded Active Requests Data Objects
const existingUserRequests = [
  {
    id: 101,
    title: "Sony Alpha A7 III Camera Kit",
    owner: "Sarah M.",
    category: "photography",
    mode: "rent",
    fee: 300,
    status: "Accepted",
    stageIndex: 2,
    beforeCondition: null,
    afterCondition: null,
    daysOverdue: 0,
    damageReported: false,
    disputeStatus: "None"
  },
  {
    id: 102,
    title: "Arduino Starter & Sensor Kit",
    owner: "Dev K.",
    category: "electronics",
    mode: "barter",
    fee: 0,
    status: "Handover",
    stageIndex: 3,
    beforeCondition: {
      photo: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80",
      checklist: ["Pins Unbent", "Sensors Operational", "USB Cable Included"],
      rating: 5,
      notes: "Handed over in mint condition."
    },
    afterCondition: null,
    daysOverdue: 2,
    damageReported: false,
    disputeStatus: "None"
  },
  {
    id: 103,
    title: "Digital Storage Oscilloscope 50MHz",
    owner: "Vikram R.",
    category: "electronics",
    mode: "barter",
    fee: 0,
    status: "Inspection",
    stageIndex: 7,
    beforeCondition: {
      photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      checklist: ["Probes Included", "Screen Working", "Calibrated"],
      rating: 4,
      notes: "Slight scuff on plastic housing."
    },
    afterCondition: {
      photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      checklist: ["Probes Included", "Screen Working"],
      rating: 3,
      notes: "Channel 2 probe wire loose upon return."
    },
    daysOverdue: 1,
    damageReported: true,
    disputeStatus: "Under Admin Review"
  }
];

// Expanded Admin Approvals & Disputes Objects
let pendingApprovalsList = [
  { id: 201, title: "TI-84 Plus Calculator", submitter: "Rohan P.", category: "academics" },
  { id: 202, title: "Electric Guitar & Amplifier", submitter: "Priyesh S.", category: "sports" },
  { id: 203, title: "FLIR Thermal Imaging Camera", submitter: "Ananya R.", category: "electronics" }
];

let adminDisputesData = [
  { id: 301, title: "Tripod Stand", borrower: "Vikram R.", issue: "Overdue by 2 days", status: "Flagged" },
  { id: 302, title: "Digital Storage Oscilloscope", borrower: "Fiza B.", issue: "Damaged Probe Wire", status: "Pending Action" }
];

// Active state tracking
let activeUserRequests = [...existingUserRequests];
let pendingAgreementItem = null;
let activeConditionItemId = null;
let activeSettlementItemId = null;
let showAllRequests = false;

// --- AUTHENTICATION & PROFILE LOGIC ---

function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");

  if (tab === "login") {
    if (loginForm) loginForm.style.display = "block";
    if (registerForm) registerForm.style.display = "none";
    if (tabLogin) tabLogin.classList.add("active");
    if (tabRegister) tabRegister.classList.remove("active");
  } else {
    if (loginForm) loginForm.style.display = "none";
    if (registerForm) registerForm.style.display = "block";
    if (tabRegister) tabRegister.classList.add("active");
    if (tabLogin) tabLogin.classList.remove("active");
  }
}

function handleLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById("loginEmail").value;
  const username = emailInput.split("@")[0] || "Alex Johnson";
  const isAdmin = emailInput.includes("admin");

  currentUser = {
    name: username.charAt(0).toUpperCase() + username.slice(1),
    trustScore: isAdmin ? 100 : 85,
    isLoggedIn: true,
    role: isAdmin ? "admin" : "student"
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  if (isAdmin) {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
}

function handleRegister(event) {
  event.preventDefault();
  const nameInput = document.getElementById("regName").value;

  currentUser = {
    name: nameInput || "New Student Member",
    trustScore: 75,
    isLoggedIn: true,
    role: "student"
  };

  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "index.html";
}

function handleLogout() {
  localStorage.removeItem("currentUser");
  currentUser = {
    name: "Guest User",
    trustScore: 0,
    isLoggedIn: false,
    role: "guest"
  };
  window.location.href = "login.html";
}

function loadSession() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
  updateAuthUI();
}

function updateAuthUI() {
  const navUserName = document.getElementById("navUserName");
  const navTrustScore = document.getElementById("navTrustScore");

  if (navUserName) navUserName.innerText = currentUser.name;
  if (navTrustScore) navTrustScore.innerText = `Trust Score: ${currentUser.trustScore}/100`;
}

// --- RESOURCE CATALOG RENDER & MATCHING ---

function renderCatalog(itemsToRender = availableResources) {
  const grid = document.getElementById("resourceGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (itemsToRender.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <i class="fas fa-search-minus" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 10px;"></i>
        <h3 style="margin-bottom: 6px;">No exact matches found</h3>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">Try exploring suggested alternatives or post a resource request.</p>
        <button onclick="openCommunityReqModal()" class="btn-submit" style="width: auto; padding: 8px 20px;"><i class="fas fa-bullhorn"></i> Post a Community Request</button>
      </div>
    `;
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
        <p class="card-meta"><i class="fas fa-user"></i> Owner: <strong>${item.owner}</strong> (${item.ownerTrustScore} pts)</p>
        <p class="card-meta"><i class="fas fa-map-marker-alt"></i> Distance: <strong>${item.distanceKm} km away</strong></p>
        <p class="card-meta"><i class="fas fa-info-circle"></i> Status: <strong>${item.status}</strong></p>
        ${item.barterPref ? `<p class="card-meta"><i class="fas fa-exchange-alt"></i> Pref: ${item.barterPref}</p>` : ''}
        <div class="card-footer">
          <span class="card-price">${priceLabel}</span>
          <button onclick="openAgreementModal('${item.title.replace(/'/g, "\\'")}', '${item.owner.replace(/'/g, "\\'")}', '${item.mode}', ${item.fee})" class="btn-approve">Request</button>
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
  const sortBy = document.getElementById("sortFilter")?.value || "suitability";

  let filtered = availableResources.filter(item => {
    const matchesKeyword = item.title.toLowerCase().includes(keyword) ||
                           item.owner.toLowerCase().includes(keyword) ||
                           (item.barterPref && item.barterPref.toLowerCase().includes(keyword));

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesMode = selectedMode === "all" || item.mode === selectedMode;

    return matchesKeyword && matchesCategory && matchesMode;
  });

  filtered.sort((a, b) => {
    if (sortBy === "distance") return a.distanceKm - b.distanceKm;
    if (sortBy === "trust") return b.ownerTrustScore - a.ownerTrustScore;
    if (sortBy === "charges") return a.fee - b.fee;
    return b.suitabilityScore - a.suitabilityScore;
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

// --- BORROWING AGREEMENT MODAL ---

function openAgreementModal(title, owner, mode, fee) {
  pendingAgreementItem = { title, owner, mode, fee };
  const modal = document.getElementById("borrowModal");
  const detailsContainer = document.getElementById("borrowModalDetails");
  
  const platformFee = mode === 'rent' ? 20 : 0;
  const securityDeposit = mode === 'rent' ? Math.max(100, fee * 2) : 0;
  const totalAmount = fee + platformFee + securityDeposit;

  detailsContainer.innerHTML = `
    <h2><i class="fas fa-file-contract"></i> Peer Borrowing Agreement</h2>
    <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
    <p><strong>Resource:</strong> ${title}</p>
    <p><strong>Owner:</strong> ${owner}</p>
    <p><strong>Borrower:</strong> ${currentUser.name}</p>
    <p><strong>Exchange Mode:</strong> <span style="text-transform: capitalize;">${mode}</span></p>
    
    <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
      <p><strong>Borrowing Fee:</strong> ₹${fee}</p>
      <p><strong>Platform Service Fee:</strong> ₹${platformFee}</p>
      <p><strong>Refundable Deposit:</strong> ₹${securityDeposit}</p>
      <hr style="margin: 6px 0;">
      <p><strong>Total Payable Amount:</strong> ₹${totalAmount}</p>
    </div>

    <div style="margin: 15px 0; padding: 10px; background: #fffbe3; border: 1px solid #ffe58f; border-radius: 6px;">
      <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; font-size: 0.85rem; color: #1e293b; font-weight: 500;">
        <input type="checkbox" id="agreementConfirmCheckbox" onchange="toggleAgreementSubmitButton()" style="margin-top: 3px;">
        <span>I confirm that I will return this resource in its original condition before the deadline.</span>
      </label>
    </div>

    <button id="btnConfirmAgreement" onclick="confirmAgreementAndRequest()" class="btn-submit" disabled style="opacity: 0.5; cursor: not-allowed;">
      <i class="fas fa-signature"></i> Accept Agreement & Confirm Request
    </button>
  `;
  
  modal.style.display = "flex";
}

function toggleAgreementSubmitButton() {
  const checkbox = document.getElementById("agreementConfirmCheckbox");
  const submitBtn = document.getElementById("btnConfirmAgreement");
  if (checkbox && submitBtn) {
    submitBtn.disabled = !checkbox.checked;
    submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";
    submitBtn.style.cursor = checkbox.checked ? "pointer" : "not-allowed";
  }
}

function confirmAgreementAndRequest() {
  const checkbox = document.getElementById("agreementConfirmCheckbox");
  if (!checkbox || !checkbox.checked) return;

  if (!pendingAgreementItem) return;
  const { title, owner, mode, fee } = pendingAgreementItem;
  
  const newReq = {
    id: Date.now(),
    title: title,
    owner: owner || "Campus Member",
    category: "general",
    mode: mode || "rent",
    fee: fee || 0,
    status: "Requested",
    stageIndex: 1,
    beforeCondition: null,
    afterCondition: null,
    daysOverdue: 0,
    damageReported: false,
    disputeStatus: "None"
  };
  
  activeUserRequests.unshift(newReq);
  renderTrackerList();
  closeBorrowModal();
  pendingAgreementItem = null;
  alert(`Agreement signed! Your request for "${title}" has been added to your Active Tracker.`);
}

// --- CONDITION MODAL SYSTEM ---

function openConditionModal(reqId, phase) {
  activeConditionItemId = reqId;
  const item = activeUserRequests.find(r => r.id === reqId);
  if (!item) return;

  const modal = document.getElementById("conditionModal");
  const details = document.getElementById("conditionModalDetails");

  if (phase === 'compare') {
    details.innerHTML = `
      <h2><i class="fas fa-columns"></i> Condition Comparison</h2>
      <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 12px;">Resource: <strong>${item.title}</strong></p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 15px 0;">
        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h4 style="color: #1e293b; margin-bottom: 6px;">Before Borrowing</h4>
          ${item.beforeCondition ? `
            <img src="${item.beforeCondition.photo}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
            <p style="font-size: 0.8rem;"><strong>Rating:</strong> ${'★'.repeat(item.beforeCondition.rating)} (${item.beforeCondition.rating}/5)</p>
            <p style="font-size: 0.8rem;"><strong>Notes:</strong> ${item.beforeCondition.notes}</p>
          ` : '<p style="font-size: 0.8rem; color: #94a3b8;">No initial record submitted.</p>'}
        </div>

        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h4 style="color: #1e293b; margin-bottom: 6px;">After Return</h4>
          ${item.afterCondition ? `
            <img src="${item.afterCondition.photo}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
            <p style="font-size: 0.8rem;"><strong>Rating:</strong> ${'★'.repeat(item.afterCondition.rating)} (${item.afterCondition.rating}/5)</p>
            <p style="font-size: 0.8rem;"><strong>Notes:</strong> ${item.afterCondition.notes}</p>
          ` : '<p style="font-size: 0.8rem; color: #94a3b8;">No return record submitted yet.</p>'}
        </div>
      </div>
      <button onclick="closeConditionModal()" class="btn-submit" style="background: #64748b;">Close View</button>
    `;
  } else {
    const isBefore = phase === 'before';
    details.innerHTML = `
      <h2><i class="fas fa-clipboard-check"></i> ${isBefore ? 'Record Before Condition' : 'Record After Condition'}</h2>
      <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 15px;">Item: <strong>${item.title}</strong></p>
      
      <form onsubmit="saveConditionRecord(event, ${reqId}, '${phase}')">
        <div class="form-group">
          <label>Condition Rating (1 to 5 Stars)</label>
          <select id="condRating" required>
            <option value="5">5 Stars - Pristine / Like New</option>
            <option value="4">4 Stars - Minor Wear</option>
            <option value="3">3 Stars - Moderate Wear</option>
            <option value="2">2 Stars - Defect / Scratch</option>
            <option value="1">1 Star - Damaged</option>
          </select>
        </div>
        <div class="form-group">
          <label>Inspection Notes</label>
          <input type="text" id="condNotes" placeholder="State of item, accessories included..." required>
        </div>
        <div class="form-group">
          <label>Photo URL</label>
          <input type="url" id="condPhoto" required value="${item.image || ''}">
        </div>
        <button type="submit" class="btn-submit"><i class="fas fa-save"></i> Save Condition Log</button>
      </form>
    `;
  }

  modal.style.display = "flex";
}

function saveConditionRecord(event, reqId, phase) {
  event.preventDefault();
  const rating = Number(document.getElementById("condRating").value);
  const photo = document.getElementById("condPhoto").value;
  const notes = document.getElementById("condNotes").value;

  const record = { photo, rating, notes };

  activeUserRequests = activeUserRequests.map(req => {
    if (req.id === reqId) {
      if (phase === 'before') req.beforeCondition = record;
      else req.afterCondition = record;
    }
    return req;
  });

  closeConditionModal();
  renderTrackerList();
  alert("Condition log saved successfully!");
}

function closeConditionModal() {
  document.getElementById("conditionModal").style.display = "none";
}

// --- SETTLEMENT & DISPUTES ---

function openSettlementModal(reqId) {
  activeSettlementItemId = reqId;
  const item = activeUserRequests.find(r => r.id === reqId);
  if (!item) return;

  const modal = document.getElementById("settlementModal");
  const details = document.getElementById("settlementModalDetails");

  const lateFeePerDay = 50;
  const totalLateFee = (item.daysOverdue || 0) * lateFeePerDay;
  const baseFee = item.fee || 0;
  const damageFee = item.damageReported ? 150 : 0;
  const grandTotal = baseFee + totalLateFee + damageFee;

  details.innerHTML = `
    <h2><i class="fas fa-calculator"></i> Final Settlement & Fees</h2>
    <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px;">Item: <strong>${item.title}</strong></p>
    
    <div style="background: #f8fafc; padding: 12px; border-radius: 8px; margin: 12px 0;">
      <p><strong>Base Fee:</strong> ₹${baseFee}</p>
      <p><strong>Overdue Days:</strong> ${item.daysOverdue || 0} day(s)</p>
      <p><strong>Late Fee (₹50/day):</strong> <span style="color: #d31d1d;">₹${totalLateFee}</span></p>
      <p><strong>Deductions/Damage:</strong> <span style="color: #d31d1d;">₹${damageFee}</span></p>
      <hr style="margin: 8px 0;">
      <p style="font-size: 1.1rem; color: #1e293b;"><strong>Total Settlement:</strong> ₹${grandTotal}</p>
    </div>

    <div style="border: 1px dashed #cbd5e1; padding: 10px; border-radius: 6px; margin-bottom: 15px;">
      <h4 style="margin-bottom: 6px; font-size: 0.85rem;"><i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i> Report Damage or Raise Dispute</h4>
      <button onclick="raiseDispute(${item.id})" class="btn-flag" style="font-size: 0.8rem; width: 100%;"><i class="fas fa-gavel"></i> Escalate to Admin Panel</button>
    </div>

    <button onclick="completeSettlement(${item.id})" class="btn-submit"><i class="fas fa-check-circle"></i> Complete Settlement</button>
  `;

  modal.style.display = "flex";
}

function raiseDispute(reqId) {
  const reason = prompt("Describe the issue or damage evidence:");
  if (!reason) return;

  activeUserRequests = activeUserRequests.map(req => {
    if (req.id === reqId) {
      req.damageReported = true;
      req.disputeStatus = "Under Admin Review";
    }
    return req;
  });

  adminDisputesData.push({
    id: Date.now(),
    title: activeUserRequests.find(r => r.id === reqId)?.title || "Resource",
    borrower: currentUser.name,
    issue: reason,
    status: "Under Review"
  });

  closeSettlementModal();
  renderTrackerList();
  renderAdminPanel();
  alert("Dispute raised and forwarded to the Admin Panel.");
}

function completeSettlement(reqId) {
  activeUserRequests = activeUserRequests.map(req => {
    if (req.id === reqId) {
      req.stageIndex = lifecycleStages.length - 1;
      req.status = "Rated";
    }
    return req;
  });

  closeSettlementModal();
  renderTrackerList();
  alert("Settlement completed successfully!");
}

function closeSettlementModal() {
  document.getElementById("settlementModal").style.display = "none";
}

// --- DYNAMIC TRACKER ---

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
    container.innerHTML = `
      <div class="card" style="padding: 30px; text-align: center; color: #64748b;">
        <i class="fas fa-folder-open" style="font-size: 2rem; margin-bottom: 10px; color: #cbd5e1;"></i>
        <p style="font-weight: 600; margin: 0;">No active borrowing requests found.</p>
      </div>
    `;
    return;
  }

  const visibleRequests = showAllRequests ? filteredRequests : filteredRequests.slice(0, 3);

  visibleRequests.forEach(req => {
    const card = document.createElement("div");
    card.className = "card lifecycle-card";

    const stepperHTML = lifecycleStages.map((stage, idx) => {
      let stepClass = "";
      if (idx < req.stageIndex) stepClass = "completed";
      if (idx === req.stageIndex) stepClass = "active";

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
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">
            Owner: <strong>${req.owner}</strong> | Mode: <strong style="text-transform: capitalize;">${req.mode}</strong>
            ${req.disputeStatus !== 'None' ? ` | <span style="color: #d31d1d; font-weight: bold;"><i class="fas fa-exclamation-circle"></i> Dispute: ${req.disputeStatus}</span>` : ''}
          </p>
        </div>
        <span class="badge-stage" style="background: #eef2ff; color: #3b82f6; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 13px;">${req.status} (Stage ${req.stageIndex + 1}/10)</span>
      </div>

      <div class="stepper-wrapper">
        ${stepperHTML}
      </div>

      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; background: #fafafa; padding: 10px; border-radius: 6px; margin-top: 10px; gap: 8px;">
        <div class="btn-group" style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button onclick="advanceItemStage(${req.id})" class="btn-approve" style="padding: 6px 12px;">Advance Stage</button>
          <button onclick="resetItemStage(${req.id})" style="padding: 6px 12px; background: #64748b; color: white; border: none; border-radius: 6px; cursor: pointer;">Reset</button>
          <button onclick="openConditionModal(${req.id}, 'before')" style="padding: 6px 10px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem;"><i class="fas fa-camera"></i> Record Before</button>
          <button onclick="openConditionModal(${req.id}, 'after')" style="padding: 6px 10px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem;"><i class="fas fa-check-double"></i> Record After</button>
          <button onclick="openConditionModal(${req.id}, 'compare')" style="padding: 6px 10px; background: #0ea5e9; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem;"><i class="fas fa-columns"></i> Compare</button>
          <button onclick="openSettlementModal(${req.id})" style="padding: 6px 10px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.8rem;"><i class="fas fa-receipt"></i> Settle & Fees</button>
        </div>
        ${(req.status === 'Requested' || req.status === 'Available') ? `<button onclick="cancelRequest(${req.id})" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Cancel Request</button>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
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
      req.stageIndex = 1;
      req.status = lifecycleStages[1];
    }
    return req;
  });
  renderTrackerList();
}

function cancelRequest(id) {
  activeUserRequests = activeUserRequests.filter(req => req.id !== id);
  renderTrackerList();
}

// --- ADMIN PANEL RENDERING & CONTROLS ---

function renderAdminPanel() {
  const pendingContainer = document.getElementById("pendingApprovalsList");
  const disputesContainer = document.getElementById("adminDisputesList");

  if (pendingContainer) {
    pendingContainer.innerHTML = pendingApprovalsList.map(item => `
      <li>
        <span><strong>${item.title}</strong> (Submitted by ${item.submitter})</span>
        <button onclick="approveListing(${item.id})" class="btn-approve">Approve</button>
      </li>
    `).join('');
  }

  if (disputesContainer) {
    disputesContainer.innerHTML = adminDisputesData.map(d => `
      <li class="warning">
        <span><strong>${d.title}</strong> - ${d.issue} (User: ${d.borrower})</span>
        <button onclick="flagUserAdmin(${d.id})" class="btn-flag">Flag User</button>
      </li>
    `).join('');
  }
}

function approveListing(id) {
  pendingApprovalsList = pendingApprovalsList.filter(item => item.id !== id);
  renderAdminPanel();
  alert("Listing approved and published to the active campus catalog.");
}

function flagUserAdmin(id) {
  adminDisputesData = adminDisputesData.filter(d => d.id !== id);
  renderAdminPanel();
  alert("User account flagged and trust score penalty applied.");
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
    owner: currentUser.name || "Campus Member",
    ownerTrustScore: currentUser.trustScore || 80,
    distanceKm: 0.2,
    suitabilityScore: 90,
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
function openCommunityReqModal() {
  document.getElementById("communityReqModal").style.display = "flex";
}
function closeCommunityReqModal() {
  document.getElementById("communityReqModal").style.display = "none";
}

function toggleBarterInput(mode) {
  const feeGroup = document.getElementById("feeInputGroup");
  const barterGroup = document.getElementById("barterInputGroup");
  if (feeGroup && barterGroup) {
    feeGroup.style.display = mode === "rent" ? "block" : "none";
    barterGroup.style.display = mode === "barter" ? "block" : "none";
  }
}

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
  loadSession();
  renderCatalog();
  renderTrackerList();
  renderAdminPanel();
});