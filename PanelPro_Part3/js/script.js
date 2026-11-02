/* PanelPro Auto Spares - Part 3 JavaScript enhancements */
document.addEventListener("DOMContentLoaded", () => {
  // Accordion interaction
  document.querySelectorAll(".accordion-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const opening = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(opening));
      if (panel) panel.hidden = !opening;
    });
  });

  // Dynamically create service highlight cards from a JavaScript data list.
  const dynamicServices = document.getElementById("dynamicServices");
  if (dynamicServices) {
    const serviceData = [
      { title: "Body Panels", detail: "Replacement bumpers, doors, fenders and bonnets for repair work." },
      { title: "Trim & Accessories", detail: "Interior and exterior finishing parts for different vehicles." },
      { title: "Workshop Support", detail: "Parts supply support for panel beaters, garages and repair specialists." },
      { title: "Bulk Orders", detail: "Parts support for resellers, fleets and trade buyers." },
      { title: "Parts Advice", detail: "Guidance to help customers choose parts for fitment, quality and budget." }
    ];
    serviceData.forEach(service => {
      const card = document.createElement("article");
      card.className = "card";
      const heading = document.createElement("h3");
      heading.textContent = service.title;
      const paragraph = document.createElement("p");
      paragraph.textContent = service.detail;
      card.append(heading, paragraph);
      dynamicServices.appendChild(card);
    });
  }

  // Services search and sorting (DOM manipulation)
  const list = document.querySelector(".service-list");
  const search = document.getElementById("serviceSearch");
  const sort = document.getElementById("serviceSort");
  const count = document.getElementById("serviceCount");
  if (list && search && sort) {
    const original = Array.from(list.children);
    const updateServices = () => {
      const term = search.value.trim().toLowerCase();
      const order = [...original];
      if (sort.value === "az") order.sort((a,b) => a.textContent.localeCompare(b.textContent));
      if (sort.value === "za") order.sort((a,b) => b.textContent.localeCompare(a.textContent));
      list.replaceChildren();
      let shown = 0;
      order.forEach(item => {
        const match = item.textContent.toLowerCase().includes(term);
        if (match) { list.appendChild(item); shown++; }
      });
      if (count) count.textContent = `Showing ${shown} of ${original.length} services.`;
    };
    search.addEventListener("input", updateServices);
    sort.addEventListener("change", updateServices);
  }

  // Image gallery lightbox
  document.querySelectorAll(".card img").forEach(img => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `View larger image: ${img.alt}`);
    const open = () => {
      const overlay = document.createElement("div");
      overlay.className = "lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "Enlarged image");
      const large = document.createElement("img");
      large.src = img.src; large.alt = img.alt;
      const close = document.createElement("button");
      close.type = "button"; close.textContent = "Close image";
      close.addEventListener("click", () => overlay.remove());
      overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
      overlay.append(large, close); document.body.appendChild(overlay); close.focus();
      document.addEventListener("keydown", function esc(e) {
        if (e.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", esc); }
      });
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });

  // Form validation helpers
  const valid = form => {
    if (!form.checkValidity()) { form.reportValidity(); return false; }
    return true;
  };
  const showError = (id, message) => { const el = document.getElementById(id); if (el) el.textContent = message; };
  const encode = value => encodeURIComponent(value);

  // Enquiry: show a useful summary and prepare an email. No stock or prices are fabricated.
  const enquiry = document.getElementById("enquiryForm");
  if (enquiry) enquiry.addEventListener("submit", e => {
    e.preventDefault(); showError("enquiryError", "");
    if (!valid(enquiry)) { showError("enquiryError", "Please complete all required fields using the correct format."); return; }
    const data = new FormData(enquiry);
    const subject = `PanelPro enquiry: ${data.get("type")}`;
    const body = [
      `Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone")}`,
      `Enquiry type: ${data.get("type")}`, `Vehicle: ${data.get("vehicle") || "Not provided"}`,
      `Part/service: ${data.get("part")}`, `Quantity: ${data.get("quantity")}`,
      `Additional details: ${data.get("message") || "None"}`
    ].join("\\n");
    const result = document.getElementById("enquiryResult");
    result.hidden = false;
    result.textContent = "Your details are ready. We cannot confirm live stock or prices on this website; please send the prepared email so the team can confirm availability and provide a quote.";
    window.location.href = `mailto:sales@panelpro.co.za?subject=${encode(subject)}&body=${encode(body)}`;
  });

  // Contact: validate and compile a general message into an email.
  const contact = document.getElementById("contactForm");
  if (contact) contact.addEventListener("submit", e => {
    e.preventDefault(); showError("contactError", "");
    if (!valid(contact)) { showError("contactError", "Please check your name, email, phone number and message."); return; }
    const data = new FormData(contact);
    const subject = `PanelPro contact: ${data.get("messageType")}`;
    const body = [`Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone")}`, `Message type: ${data.get("messageType")}`, "", data.get("message")].join("\\n");
    const result = document.getElementById("contactSuccess");
    result.hidden = false;
    result.textContent = "Your message has been checked and added to a new email. Please press Send in your email application to deliver it to PanelPro Auto Spares.";
    window.location.href = `mailto:sales@panelpro.co.za?subject=${encode(subject)}&body=${encode(body)}`;
  });

  // Leaflet map (loaded only on contact page); marker is city-level, not a verified street pin.
  const mapElement = document.getElementById("businessMap");
  if (mapElement) {
    const loadMap = () => {
      if (!window.L) return;
      const map = L.map(mapElement).setView([-26.2041, 28.0473], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([-26.2041, 28.0473]).addTo(map).bindPopup("Johannesburg city centre — confirm the exact PanelPro address before travelling.");
    };
    const css = document.createElement("link"); css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(css);
    const script = document.createElement("script"); script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = loadMap; document.body.appendChild(script);
  }

  // Stock and pricing section - sample data and structure
  const stockPricing = document.getElementById("stockPricingGrid");
  const stockSearch = document.getElementById("stockSearch");
  const stockSort = document.getElementById("stockSort");
  const stockCategory = document.getElementById("stockCategory");
  const stockCount = document.getElementById("stockCount");

  if (stockPricing) {
    const stockData = [
      {
        title: "Engine Short Block",
        price: 6500,
        label: "R6,500",
        status: "In stock",
        type: "premium",
        image: "_images/parts-3.jpg",
        note: "Reliable engine core for everyday drivers and workshops",
        items: ["2.0L petrol", "Workshop tested", "Warrantied fitment", "Suitable for many models"]
      },
      {
        title: "Front Bumper",
        price: 2900,
        label: "R2,900",
        status: "In stock",
        type: "budget",
        image: "_images/bumper.jpg",
        note: "Front body panel for repairs and smoothing upgrades",
        items: ["OEM-style fit", "Paint-ready", "Impact ready", "Daily driving use"]
      },
      {
        title: "Alloy Rim",
        price: 1950,
        label: "R1,950",
        status: "Popular",
        type: "budget",
        image: "_images/parts-2.jpg",
        note: "Stylish wheel upgrade for cars, bakkies and SUVs",
        items: ["16 inch", "Alloy finish", "Road-ready", "Budget-friendly"]
      },
      {
        title: "ESC Module",
        price: 3200,
        label: "R3,200",
        status: "Limited stock",
        type: "premium",
        image: "_images/esc.jpg",
        note: "Electronic stability control unit for safety systems",
        items: ["Diagnostics friendly", "Vehicle safety part", "Workshop tested", "Fits many models"]
      },
      {
        title: "Headlamp Assembly",
        price: 1200,
        label: "R1,200",
        status: "In stock",
        type: "budget",
        image: "_images/parts-3.jpg",
        note: "Budget-friendly lighting solution for everyday use",
        items: ["Clear lens", "Road legal", "Easy fitment", "Starter option"]
      },
      {
        title: "Side Door",
        price: 2400,
        label: "R2,400",
        status: "In stock",
        type: "budget",
        image: "_images/parts-1.jpg",
        note: "Replacement door for repair and panel work",
        items: ["Panel repair ready", "Driver side", "Ready to paint", "Workshop fit"]
      },
      {
        title: "Side Mirror",
        price: 950,
        label: "R950",
        status: "Popular",
        type: "budget",
        image: "_images/parts-2.jpg",
        note: "Roadside mirror replacement for daily use",
        items: ["Easy install", "Road legal", "Compact", "Affordable"]
      },
      {
        title: "Suspension Kit",
        price: 4200,
        label: "R4,200",
        status: "Premium",
        type: "premium",
        image: "_images/parts-3.jpg",
        note: "Steering and suspension upgrade for smoother driving",
        items: ["Front set", "Improved comfort", "Heavy-duty", "Workshop fit"]
      },
      {
        title: "Car Battery",
        price: 1800,
        label: "R1,800",
        status: "In stock",
        type: "budget",
        image: "_images/parts-1.jpg",
        note: "Reliable starting power for daily drivers",
        items: ["12V", "Long life", "Starter battery", "Fits many vehicles"]
      }
    ];

    let cart = [];
    const cartBadge = document.querySelector(".cart-badge");
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");

    const formatMoney = value => `R${Number(value).toLocaleString("en-ZA")}`;

    const updateCartUI = () => {
      if (cartBadge) cartBadge.textContent = String(cart.length);

      if (cartList) {
        cartList.innerHTML = "";
        if (cart.length === 0) {
          const empty = document.createElement("li");
          empty.textContent = "Your cart is empty.";
          cartList.appendChild(empty);
        } else {
          cart.forEach(item => {
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `
              <div class="cart-item-info">
                ${item.image ? `<img src="${item.image}" alt="${item.title} image" class="cart-item-image">` : ""}
                <span class="item-name">${item.title}</span>
              </div>
              <span class="item-total">${formatMoney(item.price)}</span>
            `;
            cartList.appendChild(li);
          });
        }
      }

      const total = cart.reduce((sum, item) => sum + item.price, 0);
      if (cartTotal) cartTotal.textContent = formatMoney(total);

      const summary = document.getElementById("stockCartSummary");
      if (summary) {
        summary.innerHTML = `
          <span>Cart: ${cart.length} item${cart.length === 1 ? "" : "s"}</span>
          <button class="checkout-btn" type="button">Checkout</button>
        `;
        const checkoutBtn = summary.querySelector(".checkout-btn");
        if (checkoutBtn) {
          checkoutBtn.addEventListener("click", () => {
            window.location.href = "enquiry.html";
          });
        }
      }
    };

    const renderStock = () => {
      const term = (stockSearch ? stockSearch.value : "").trim().toLowerCase();
      const currentCategory = stockCategory ? stockCategory.value : "all";
      let filtered = [...stockData];

      if (currentCategory !== "all") {
        filtered = filtered.filter(item => item.type === currentCategory);
      }

      if (term) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(term) ||
          item.note.toLowerCase().includes(term) ||
          item.items.some(entry => entry.toLowerCase().includes(term))
        );
      }

      if (stockSort && stockSort.value === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (stockSort && stockSort.value === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (stockSort && stockSort.value === "az") {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      }

      stockPricing.innerHTML = "";

      filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = `stock-card ${item.type}`;
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title} stock image" class="stock-card-image">
          <div class="stock-card-body">
            <h3>${item.title}</h3>
            <p class="stock-note">${item.note}</p>
            <div class="stock-row">
              <span class="price">${item.label}</span>
              <span class="status">${item.status}</span>
            </div>
            <ul>
              ${item.items.map(i => `<li>${i}</li>`).join("")}
            </ul>
            <button class="add-cart-btn" type="button" data-title="${item.title}" data-price="${item.price}">Add to cart</button>
            <button class="remove-cart-btn" type="button" data-title="${item.title}">Remove from cart</button>
          </div>
        `;
        stockPricing.appendChild(card);
      });

      if (stockCount) {
        stockCount.textContent = `Showing ${filtered.length} of ${stockData.length} stock items.`;
      }

      document.querySelectorAll(".add-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
          const title = button.dataset.title;
          const price = Number(button.dataset.price);
          const item = stockData.find(entry => entry.title === title);
          if (item) {
            cart.push({ title: item.title, price: item.price, image: item.image });
            updateCartUI();
            button.textContent = "Added";
            button.disabled = true;
            setTimeout(() => {
              button.textContent = "Add to cart";
              button.disabled = false;
            }, 700);
          }
        });
      });

      document.querySelectorAll(".remove-cart-btn").forEach(button => {
        button.addEventListener("click", () => {
          const title = button.dataset.title;
          const index = cart.findIndex(item => item.title === title);
          if (index >= 0) {
            cart.splice(index, 1);
            updateCartUI();
          }
        });
      });
    };

    if (stockSearch) stockSearch.addEventListener("input", renderStock);
    if (stockSort) stockSort.addEventListener("change", renderStock);
    if (stockCategory) stockCategory.addEventListener("change", renderStock);

    const summary = document.createElement("div");
    summary.id = "stockCartSummary";
    summary.className = "cart-summary";
    summary.textContent = "Cart: 0 items";
    stockPricing.parentElement.appendChild(summary);

    updateCartUI();
    renderStock();
  }
});
