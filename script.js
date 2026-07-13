const phoneNumber = "919999999999";

const loader = document.getElementById("loader");
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 650);
});

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  siteHeader.classList.toggle("menu-open", navLinks.classList.contains("open"));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    siteHeader.classList.remove("menu-open");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const serviceSearch = document.getElementById("serviceSearch");
const serviceCards = [...document.querySelectorAll(".service-card")];

serviceSearch.addEventListener("input", () => {
  const query = serviceSearch.value.trim().toLowerCase();
  serviceCards.forEach((card) => {
    card.style.display = card.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
});

const galleryFilters = document.getElementById("galleryFilters");
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

galleryFilters.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  galleryFilters.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");

  const filter = event.target.dataset.filter;
  galleryItems.forEach((item) => {
    const show = filter === "all" || item.dataset.category === filter;
    item.style.display = show ? "block" : "none";
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightbox.classList.add("open");
  });
});

closeLightbox.addEventListener("click", () => lightbox.classList.remove("open"));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.classList.remove("open");
});

const reviews = [
  {
    text: "Pooja bahut shanti aur sahi vidhi se sampann hui. Panditji ne har step ka arth bhi samjhaya.",
    name: "Amit Kumar",
    city: "Delhi • Griha Pravesh"
  },
  {
    text: "Kundali aur muhurat ki guidance clear thi. Samagri list milne se taiyari bahut aasaan ho gayi.",
    name: "Priya Sharma",
    city: "Jaipur • Kundali Milan"
  },
  {
    text: "Rudrabhishek ke dauran poora mahaul pavitra laga. Time par aaye aur pooja vidhi bahut sundar rahi.",
    name: "Rahul Joshi",
    city: "Haridwar • Rudrabhishek"
  }
];

let reviewIndex = 0;
const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const reviewCity = document.getElementById("reviewCity");

function showReview(index) {
  const review = reviews[index];
  reviewText.textContent = review.text;
  reviewName.textContent = review.name;
  reviewCity.textContent = review.city;
}

document.getElementById("prevReview").addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  showReview(reviewIndex);
});

document.getElementById("nextReview").addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview(reviewIndex);
});

setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview(reviewIndex);
}, 5200);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("open");
  });
});

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const details = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    city: document.getElementById("city").value,
    pooja: document.getElementById("pooja").value,
    date: document.getElementById("date").value,
    message: document.getElementById("message").value
  };

  const text = `Namaste Panditji,%0A%0AMujhe pooja booking ke liye jankari chahiye.%0AName: ${details.name}%0AMobile: ${details.phone}%0ACity: ${details.city}%0AService: ${details.pooja}%0ADate: ${details.date}%0AMessage: ${details.message}`;
  window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
});

const countdown = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 8, 22, 0, 0, 0);
  if (target < now) target = new Date(now.getFullYear() + 1, 8, 22, 0, 0, 0);

  const distance = target - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  countdown.textContent = `${days} din ${hours} ghante ${minutes} minute baaki`;
}

updateCountdown();
setInterval(updateCountdown, 60000);
