// PHONE CONFIG
const phoneNumber = "1234567890";
const countryCode = "+91";

// SAFE CHECK DATA
if (typeof servicesData === "undefined") {
  console.error("servicesData is not defined!");
}

// RENDER FUNCTION
function renderServices(filter = "all") {
  const container = document.getElementById("servicesContainer");

  if (!container) {
    console.error("servicesContainer not found!");
    return;
  }

  // FILTER DATA
  const filtered = (filter === "all")
    ? servicesData
    : servicesData.filter(item => item.category === filter);

  // BUILD HTML (FAST)
  let html = "";

  filtered.forEach(service => {
    html += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
        <div class="service-card">

          <img src="${service.image}" 
               style="max-width: 100%; height: auto; border-radius:15px 15px 0 0;" 
               loading="lazy"
               alt="${service.title}">

          <h5>${service.title}</h5>

          <ul>
            ${service.points.map(p => `<li>✔ ${p}</li>`).join("")}
          </ul>

          <div class="btn-box">
            <a href="tel:${countryCode}${phoneNumber}" 
               class="btn btn-danger"
               aria-label="Call ${service.title}">
               Call
            </a>

            <a href="https://wa.me/${countryCode.replace("+","")}${phoneNumber}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="btn btn-success"
               aria-label="WhatsApp ${service.title}">
               WhatsApp
            </a>
          </div>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// FILTER
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");


  buttons.forEach(btn => {
    btn.addEventListener("click", function () {

      // remove active
      buttons.forEach(b => b.classList.remove("active"));

      // add active
      this.classList.add("active");

      const filter = this.dataset.filter;
      renderServices(filter);
    });
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderServices("all");
  setupFilters();
});