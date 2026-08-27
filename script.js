/* ==========================================================================
   1. ADVANCED MOCK DATA & PERSISTENCE LAYER
   ========================================================================== */
const initialResources = [
    {
        id: 1,
        title: "Sony Alpha A7 III Camera Kit",
        category: "photography",
        mode: "rent", // 'rent', 'barter', or 'donate'
        tags: ["camera", "video", "reel", "event", "tripod", "lighting", "movie"],
        owner: "Sarah M.",
        dept: "Media Dept - Yr 3",
        trustScore: 98,
        distance: "0.2 km (Hostel Block A)",
        borrowFee: 150,
        platformFee: 20,
        securityDeposit: 500,
        conditionBefore: ["No sensor dust", "Lens glass clean", "Minor body scratch"],
        conditionAfter: ["Sensor clean", "Lens glass clean", "Minor body scratch"],
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
        barterPreference: "Looking for 50mm Prime Lens or Drone for 2 days"
    },
    {
        id: 2,
        title: "TI-84 Plus CE Graphic Calculator",
        category: "academics",
        mode: "barter",
        tags: ["calculator", "math", "exam", "engineering", "statistics"],
        owner: "Rohan P.",
        dept: "CS - Yr 2",
        trustScore: 94,
        distance: "0.5 km (Library)",
        borrowFee: 0,
        platformFee: 5,
        securityDeposit: 100,
        conditionBefore: ["Screen scratch-free", "Batteries charged"],
        conditionAfter: [],
        img: "https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&w=400&q=80",
        barterPreference: "Exchange for 3rd Sem Data Structures Textbook"
    },
    {
        id: 3,
        title: "Arduino & Electronics Kit",
        category: "electronics",
        mode: "rent",
        tags: ["lab", "electronics", "arduino", "project", "hardware", "sensors"],
        owner: "Ananya K.",
        dept: "ECE - Yr 4",
        trustScore: 99,
        distance: "0.1 km (Main Lab)",
        borrowFee: 40,
        platformFee: 10,
        securityDeposit: 200,
        conditionBefore: ["All 20 sensors labeled", "UNO Board working"],
        conditionAfter: [],
        img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=400&q=80",
        barterPreference: "N/A"
    },
    {
        id: 4,
        title: "Portable Projector Screen",
        category: "sports",
        mode: "donate",
        tags: ["movie", "event", "presentation", "projector", "club"],
        owner: "Dev R.",
        dept: "Mech - Yr 3",
        trustScore: 91,
        distance: "0.8 km (Hostel Block C)",
        borrowFee: 0,
        platformFee: 0,
        securityDeposit: 0,
        conditionBefore: ["Fully functional canvas"],
        conditionAfter: [],
        img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80",
        barterPreference: "Free Campus Donation"
    }
];

// Initialize Storage
if (!localStorage.getItem('campusResources')) {
    localStorage.setItem('campusResources', JSON.stringify(initialResources));
}
let resourcesData = JSON.parse(localStorage.getItem('campusResources'));

// Full 10-Stage Lifecycle per problem requirements
const lifecycleStages = [
    "Available", "Requested", "Accepted", "Handover", 
    "Borrowed", "Return Due", "Returned", "Inspection", "Settlement", "Rated"
];
let currentLifecycleIndex = 2; // Default starting state: "Accepted"

// Active Transaction State Tracking
let activeTransaction = {
    itemId: 1,
    daysBorrowed: 2,
    overdueDays: 1,
    lateFeePerDay: 50,
    damageReported: false,
    damageDeduction: 0
};

/* ==========================================================================
   2. INITIALIZATION & SKELETON LOADERS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    showLoadingSkeletons();
    setTimeout(() => {
        renderResources(resourcesData);
        updateImpactMetrics();
        updateStepperUI();
        calculateSettlementSummary();
    }, 800);
});

function showLoadingSkeletons() {
    const grid = document.getElementById("resourceGrid");
    grid.innerHTML = Array(4).fill(`
        <div class="skeleton-card card">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton skeleton-text-lg"></div>
            <div class="skeleton skeleton-text-sm"></div>
            <div class="skeleton skeleton-btn"></div>
        </div>
    `).join('');
}

/* ==========================================================================
   3. CATALOG RENDERER WITH JUGAAD-STYLE MODES
   ========================================================================== */
function renderResources(items) {
    const grid = document.getElementById("resourceGrid");
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No matching campus items or requests found.</p>`;
        return;
    }

    items.forEach(item => {
        // Tag rendering based on exchange mode
        let modeBadge = `<span class="badge" style="background:#4f46e5;"><i class="fas fa-tag"></i> Rent</span>`;
        if (item.mode === 'barter') {
            modeBadge = `<span class="badge" style="background:#10b981;"><i class="fas fa-sync-alt"></i> Direct Barter</span>`;
        } else if (item.mode === 'donate') {
            modeBadge = `<span class="badge" style="background:#f59e0b;"><i class="fas fa-heart"></i> Free Share</span>`;
        }

        const cardHtml = `
            <div class="card">
                <div class="card-img-wrapper">
                    <img src="${item.img}" alt="${item.title}">
                    ${modeBadge}
                </div>
                <div class="card-body">
                    <div class="card-title">${item.title}</div>
                    <div class="card-meta">Owner: <strong>${item.owner}</strong> (${item.dept})</div>
                    <div class="card-meta"><i class="fas fa-shield-alt" style="color:#10b981"></i> Trust Score: <strong>${item.trustScore}/100</strong></div>
                    <div class="card-meta"><i class="fas fa-map-marker-alt"></i> ${item.distance}</div>
                    
                    ${item.mode === 'barter' ? `<p style="font-size:0.75rem; color:#059669; background:#ecfdf5; padding:4px 8px; border-radius:4px; margin: 6px 0;"><strong>Wants:</strong> ${item.barterPreference}</p>` : ''}

                    <div class="card-pricing">
                        <div>
                            <span class="price">${item.borrowFee > 0 ? '₹' + item.borrowFee + '<small>/day</small>' : 'Free / Barter'}</span>
                        </div>
                        <button class="btn-primary" onclick="openBorrowModal(${item.id})">Initiate Deal</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

/* ==========================================================================
   4. AI BUNDLE & SEARCH ENGINE
   ========================================================================== */
function handleAISearch() {
    const query = document.getElementById("aiInput").value.toLowerCase().trim();
    if (!query) {
        renderResources(resourcesData);
        return;
    }

    showLoadingSkeletons();

    setTimeout(() => {
        const filtered = resourcesData.filter(item => {
            return item.tags.some(tag => query.includes(tag)) ||
                   item.title.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query) ||
                   query.includes(item.category);
        });

        renderResources(filtered);
    }, 500);
}

function filterItems() {
    const keyword = document.getElementById("keywordSearch").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const sortBy = document.getElementById("sortBy").value;

    let result = resourcesData.filter(item => {
        const matchesKeyword = item.title.toLowerCase().includes(keyword) || item.owner.toLowerCase().includes(keyword);
        const matchesCategory = category === "all" || item.category === category;
        return matchesKeyword && matchesCategory;
    });

    if (sortBy === "trust") {
        result.sort((a, b) => b.trustScore - a.trustScore);
    } else if (sortBy === "price") {
        result.sort((a, b) => a.borrowFee - b.borrowFee);
    }

    renderResources(result);
}

/* ==========================================================================
   5. TRANSACTION MODAL & BARTER/FINANCIAL SWITCHER
   ========================================================================== */
function openBorrowModal(id) {
    const item = resourcesData.find(r => r.id === id);
    if (!item) return;

    const modalDetails = document.getElementById("modalDetails");
    
    let feeBreakdownHtml = "";
    if (item.mode === 'rent') {
        const total = item.borrowFee + item.platformFee + item.securityDeposit;
        feeBreakdownHtml = `
            <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin: 1rem 0; font-size:0.9rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Daily Borrow Fee:</span> <strong>₹${item.borrowFee}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Platform Maintenance Fee:</span> <strong>₹${item.platformFee}</strong></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Refundable Deposit:</span> <strong>₹${item.securityDeposit}</strong></div>
                <hr style="margin:8px 0; border:none; border-top:1px dashed #cbd5e1;">
                <div style="display:flex; justify-content:space-between; font-size:1.1rem; color:var(--primary-color);"><span>Upfront Payable:</span> <strong>₹${total}</strong></div>
            </div>
        `;
    } else if (item.mode === 'barter') {
        feeBreakdownHtml = `
            <div style="background: #ecfdf5; padding: 1rem; border-radius: 8px; margin: 1rem 0; font-size:0.9rem; border: 1px solid #a7f3d0;">
                <p style="color:#065f46; font-weight:600;"><i class="fas fa-sync-alt"></i> Barter Proposal Required</p>
                <p style="margin-top:4px;">Owner's Request: <em>"${item.barterPreference}"</em></p>
                <input type="text" id="barterOfferInput" placeholder="Enter item/skill you offer in exchange..." style="width:100%; padding:8px; margin-top:8px; border:1px solid #cbd5e1; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; margin-top:8px;"><span>Platform Match Fee:</span> <strong>₹${item.platformFee}</strong></div>
            </div>
        `;
    } else {
        feeBreakdownHtml = `
            <div style="background: #fffbeb; padding: 1rem; border-radius: 8px; margin: 1rem 0; font-size:0.9rem; border: 1px solid #fde68a;">
                <p style="color:#92400e; font-weight:600;"><i class="fas fa-heart"></i> Campus Community Gift</p>
                <p>This item is listed for free sharing. Only standard platform verification applies.</p>
            </div>
        `;
    }

    // Condition Checklist Rendering
    const checklist = item.conditionBefore.map(c => `<li><i class="fas fa-check-circle" style="color:#10b981;"></i> ${c}</li>`).join('');

    modalDetails.innerHTML = `
        <h2>Request: ${item.title}</h2>
        <p style="color: var(--text-muted);">Owner: ${item.owner} | Location: ${item.distance}</p>
        
        ${feeBreakdownHtml}

        <div style="margin-bottom: 1rem;">
            <h4>Pre-Borrow Checklist & Verified Condition</h4>
            <ul style="list-style:none; padding-left:0; font-size:0.85rem; margin-top:0.5rem; display:grid; gap:4px;">
                ${checklist}
            </ul>
        </div>

        <button class="btn-primary" style="width: 100%; padding: 0.8rem;" onclick="confirmRequest('${item.title}')">Submit Exchange Agreement</button>
    `;

    document.getElementById("itemModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("itemModal").style.display = "none";
}

function confirmRequest(title) {
    alert(`Success! Borrow request for "${title}" sent to owner. Track status on active lifecycle panel.`);
    closeModal();
}

/* ==========================================================================
   6. VISUAL LIFECYCLE TRACKER & AUTOMATED LATE FEE CALCULATOR
   ========================================================================== */
function updateStepperUI() {
    const stepperWrapper = document.querySelector(".stepper-wrapper");
    if (!stepperWrapper) return;
    
    stepperWrapper.innerHTML = "";

    lifecycleStages.forEach((stage, index) => {
        let statusClass = "";
        if (index < currentLifecycleIndex) statusClass = "completed";
        if (index === currentLifecycleIndex) statusClass = "active";

        stepperWrapper.innerHTML += `
            <div class="stepper-item ${statusClass}">
                <div class="step-counter">${index + 1}</div>
                <div class="step-name">${stage}</div>
            </div>
        `;
    });
}

function advanceLifecycle() {
    if (currentLifecycleIndex < lifecycleStages.length - 1) {
        currentLifecycleIndex++;
        updateStepperUI();
        calculateSettlementSummary();
    } else {
        alert("Transaction complete! Ratings logged to trust score.");
    }
}

function resetLifecycle() {
    currentLifecycleIndex = 0;
    updateStepperUI();
    calculateSettlementSummary();
}

// Financial Settlement Calculator (Handles Late Return & Damages)
function calculateSettlementSummary() {
    const item = resourcesData.find(r => r.id === activeTransaction.itemId);
    if (!item) return;

    const totalBorrowingCharge = item.borrowFee * activeTransaction.daysBorrowed;
    const totalLateFees = activeTransaction.overdueDays * activeTransaction.lateFeePerDay;
    const finalDepositRefund = Math.max(0, item.securityDeposit - totalLateFees - activeTransaction.damageDeduction);
    const finalSettlementPaid = totalBorrowingCharge + item.platformFee + (item.securityDeposit - finalDepositRefund);

    const header = document.getElementById("trackedItemHeader");
    if (header) {
        header.innerHTML = `
            <h3>Current Deal: ${item.title}</h3>
            <p>Owner: <strong>${item.owner}</strong> | Status: <span style="color:var(--primary-color); font-weight:700;">${lifecycleStages[currentLifecycleIndex]}</span></p>
            <div style="margin-top:0.5rem; font-size:0.85rem; background:#f1f5f9; padding:8px; border-radius:6px; display:flex; gap:12px; flex-wrap:wrap;">
                <span>Late Fee Accrued: <strong style="color:var(--accent-danger);">₹${totalLateFees} (${activeTransaction.overdueDays} Day Overdue)</strong></span>
                <span>Deposit Refundable: <strong style="color:var(--secondary-color);">₹${finalDepositRefund}</strong></span>
                <span>Net Transaction Settled: <strong>₹${finalSettlementPaid}</strong></span>
            </div>
        `;
    }
}

/* ==========================================================================
   7. COMMUNITY IMPACT METRICS & ADMIN DASHBOARD
   ========================================================================== */
function updateImpactMetrics() {
    const totalExchanges = 482 + resourcesData.length;
    const totalSaved = 185000 + (resourcesData.length * 450);

    const elemExchanges = document.getElementById("metricExchanges");
    const elemSaved = document.getElementById("metricSaved");

    if (elemExchanges) elemExchanges.textContent = totalExchanges;
    if (elemSaved) elemSaved.textContent = `₹${totalSaved.toLocaleString('en-IN')}`;
}

function approveItem(buttonElement) {
    const listItem = buttonElement.parentElement;
    listItem.style.opacity = "0.5";
    buttonElement.textContent = "Approved ✓";
    buttonElement.disabled = true;
    buttonElement.style.background = "#10b981";
    buttonElement.style.color = "white";
}

function flagUser() {
    alert("User flagged. Overdue notices sent and 5 points deducted from campus trust score.");
}
/* ==========================================================================
   INTERACTIVE ASCII MOUSE-TRAIL ANIMATION ENGINE
   ========================================================================== */
(function initASCIITrail() {
    const canvas = document.getElementById('asciiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Resize Canvas dynamically to match browser window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // ASCII Character Palette & Active Particles Queue
    const asciiChars = ["C", "A", "M", "P", "U", "S", "0", "1", "<", ">", "{", "}", "#", "/", "*", "X", "+"];
    const particles = [];

    // Track Mouse Coordinates
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        // Spawn 2-3 ASCII characters per mouse movement
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: mouse.x + (Math.random() * 30 - 15),
                y: mouse.y + (Math.random() * 30 - 15),
                char: asciiChars[Math.floor(Math.random() * asciiChars.length)],
                size: Math.floor(Math.random() * 10) + 12, // Character font size
                alpha: 1.0, // Initial opacity
                speedY: (Math.random() - 0.5) * 1.5,
                color: i % 2 === 0 ? '#818cf8' : '#10b981' // Alternates primary & secondary accents
            });
        }
    });

    // Render & Animate Loop
    function animateASCII() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.font = `700 ${p.size}px monospace`;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            
            // Add subtle glow effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            
            ctx.fillText(p.char, p.x, p.y);

            // Update particle properties for smooth fade-out
            p.y += p.speedY;
            p.alpha -= 0.025; // Speed of fading

            // Remove faded particles
            if (p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(animateASCII);
    }

    animateASCII();
})();