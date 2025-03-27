// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Utility Functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function getProductsPerPage() {
        return window.innerWidth >= 1200
            ? 4
            : window.innerWidth >= 992
                ? 3
                : window.innerWidth >= 768
                    ? 2
                    : 1;
    }

    // Initialize Common UI Elements
    function initializeCommonUI() {
  // Language selector dropdowns
  const languageSelectors = document.querySelectorAll(
    ".language-selector, .nav-language-selector"
  );
  languageSelectors.forEach((selector) => {
            selector.addEventListener("click", () =>
                console.log("Language selector clicked")
            );
  });

  // Category dropdown in search bar
  const categoryDropdown = document.querySelector(".category-dropdown");
  if (categoryDropdown) {
            categoryDropdown.addEventListener("click", () =>
                console.log("Category dropdown clicked")
            );
        }

        // Account dropdown
  const accountDropdown = document.querySelector(".account-dropdown");
  if (accountDropdown) {
            accountDropdown.addEventListener("click", () =>
                console.log("Account dropdown clicked")
            );
  }

  // Search functionality
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  if (searchButton && searchInput) {
            const handleSearch = () => {
      const searchTerm = searchInput.value.trim();
                if (searchTerm) console.log("Search term:", searchTerm);
            };

            searchButton.addEventListener("click", handleSearch);
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleSearch();
            });
        }

        // Shop Now and Cart interactions
  const shopNowLink = document.querySelector(".shop-now");
  if (shopNowLink) {
            shopNowLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Shop Now clicked");
    });
  }

  const cartSection = document.querySelector(".cart-section");
  if (cartSection) {
            cartSection.addEventListener("click", () => console.log("Cart clicked"));
        }
    }

    // Initialize Tooltips
  function initializeTooltips(container) {
    const tooltipTriggerList = container.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
      const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: "hover",
        delay: { hide: 2000 },
      });

      tooltipTriggerEl.addEventListener("mouseenter", () => {
        tooltipList.forEach((t) => {
                    if (t._element !== tooltipTriggerEl) t.hide();
        });
      });

      return tooltip;
    });
    return tooltipList;
  }

    // Initialize Category Cards
    function initializeCategoryCards() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                categoryCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                this.classList.add('active');
            });
        });
    }

    // Initialize Product Interactions
    function initializeProductInteractions(container) {
        // Wishlist functionality
    const wishlistButtons = container.querySelectorAll(".wishlist-btn");
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const icon = this.querySelector("i");
        const tooltip = bootstrap.Tooltip.getInstance(this);
        const productName =
          this.closest(".product-card").querySelector(
            ".product-name"
          ).textContent;
                const isAdding = icon.classList.contains("far");

                icon.classList.toggle("far", !isAdding);
                icon.classList.toggle("fas", isAdding);
                this.setAttribute(
                    "data-bs-title",
                    isAdding ? "Added to Wishlist" : "Add to Wishlist"
                );
                tooltip.setContent({
                    ".tooltip-inner": isAdding
                        ? "Added to Wishlist"
                        : "Removed from Wishlist",
                });
                this.classList.toggle("added", isAdding);

                console.log(
                    `${isAdding ? "Added" : "Removed"} ${productName} ${isAdding ? "to" : "from"
                    } wishlist`
                );

                // Animation
        icon.classList.add("animate__animated", "animate__bounceIn");
        icon.addEventListener(
          "animationend",
          () => {
            icon.classList.remove("animate__animated", "animate__bounceIn");
          },
          { once: true }
        );

                setTimeout(() => tooltip.hide(), 2000);
      });
    });

        // Quick view functionality
    const quickViewButtons = container.querySelectorAll(".quick-view");
    quickViewButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation();
        const productName =
                    this.closest(".product-card").querySelector(
                        ".product-name"
                    ).textContent;
        const tooltip = bootstrap.Tooltip.getInstance(this);

        tooltip.show();
        console.log(`Quick view for ${productName}`);
                setTimeout(() => tooltip.hide(), 2000);
      });
    });

        // Add to cart functionality
    const addToCartButtons = container.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const tooltip = bootstrap.Tooltip.getInstance(this);
        const productName = this.closest(".product-card").querySelector(".product-name").textContent;
        const isAdding = !this.classList.contains("added");

        this.classList.toggle("added", isAdding);
        this.textContent = isAdding ? "Remove from Cart" : "Add To Cart";
        this.setAttribute("data-bs-title", isAdding ? "Added to Cart" : "Add to Cart");
        tooltip.setContent({
          ".tooltip-inner": isAdding ? "Added to Cart" : "Removed from Cart",
        });

        this.classList.add("animate__animated", "animate__pulse");
        this.addEventListener("animationend", () => {
          this.classList.remove("animate__animated", "animate__pulse");
        }, { once: true });

        console.log(`${isAdding ? "Added" : "Removed"} ${productName} ${isAdding ? "to" : "from"} cart`);
        setTimeout(() => tooltip.hide(), 2000);
      });
    });
  }

    // Initialize Product Navigation
    function initializeProductNavigation(container, options = {}) {
        const prevBtn = container.querySelector(".nav-arrow.prev");
        const nextBtn = container.querySelector(".nav-arrow.next");
        const productGrid = container.querySelector(".product-grid");
        const productCards = container.querySelectorAll(".product-card");

        if (!prevBtn || !nextBtn || !productGrid || !productCards.length) return;

      let currentPage = 0;
        const productsPerPage = getProductsPerPage();
      const totalPages = Math.ceil(productCards.length / productsPerPage);

        function updateNavigation() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= totalPages - 1;
            productGrid.style.transform = `translateX(-${currentPage * (100 / productsPerPage)
        }%)`;
        productGrid.style.transition = "transform 0.3s ease";
      }

      prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
                updateNavigation();
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
          currentPage++;
                updateNavigation();
        }
      });

        updateNavigation();

      // Update on window resize
      window.addEventListener("resize", () => {
            const newProductsPerPage = getProductsPerPage();
        if (productsPerPage !== newProductsPerPage) {
          currentPage = 0;
                updateNavigation();
            }
        });

        // Add hover effects if enabled
        if (options.enableHoverEffects) {
    productCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.transition = "transform 0.3s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });
        }
    }

    // Initialize Countdown Timer
    function initializeCountdownTimer(endDate) {
        const elements = {
            days: document.querySelector("[data-days]"),
            hours: document.querySelector("[data-hours]"),
            minutes: document.querySelector("[data-minutes]"),
            seconds: document.querySelector("[data-seconds]"),
        };

        function updateCountdown() {
            const now = new Date();
            const diff = endDate - now;

            if (diff < 0) {
                clearInterval(timerInterval);
                Object.values(elements).forEach((el) => {
                    if (el) el.textContent = "00";
                });
                return;
            }

            const times = {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            };

            Object.entries(times).forEach(([key, value]) => {
                if (elements[key]) {
                    elements[key].textContent = String(value).padStart(2, "0");
        }
      });
    }

        updateCountdown();
        const timerInterval = setInterval(updateCountdown, 1000);
    }

    // Initialize Star Rating
    function initializeStarRating() {
  const starContainers = document.querySelectorAll(".stars");
  starContainers.forEach((container) => {
    const stars = container.querySelectorAll("i");
    let currentRating = parseInt(container.dataset.rating) || 5;
            const reviewCount =
                container.parentElement.querySelector(".review-count");
    const originalReviewText = reviewCount.textContent;

    function updateStars(rating, isHover = false) {
      stars.forEach((star, index) => {
                    star.classList.toggle("fas", index < rating);
                    star.classList.toggle("far", index >= rating);
        star.classList.toggle("hovered", isHover && index <= rating);
      });

      if (!isHover) {
        reviewCount.textContent = `${rating} out of 5 stars ${originalReviewText}`;
      }
    }

    stars.forEach((star, index) => {
                star.addEventListener("mouseenter", () => updateStars(index + 1, true));
                star.addEventListener("mouseleave", () => updateStars(currentRating));
      star.addEventListener("click", () => {
        currentRating = index + 1;
        container.dataset.rating = currentRating;
        updateStars(currentRating);

        star.classList.add("animate__animated", "animate__bounceIn");
        star.addEventListener(
          "animationend",
          () => {
            star.classList.remove("animate__animated", "animate__bounceIn");
          },
          { once: true }
        );
      });
    });

    updateStars(currentRating);
            container.addEventListener("mouseleave", () =>
                updateStars(currentRating)
            );
        });
    }

    // Initialize Footer
    function initializeFooter() {
  const mainFooter = document.querySelector(".main-footer");
        if (!mainFooter) return;

        // Email Subscription
    const subscribeForm = mainFooter.querySelector(".subscribe-form");
    if (subscribeForm) {
      subscribeForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
          console.log("Subscribing email:", email);
          emailInput.value = "";

          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-2";
          successMessage.textContent = "Thank you for subscribing!";
          this.appendChild(successMessage);

                    setTimeout(() => successMessage.remove(), 3000);
        }
      });
    }

    // Social Media Links
        mainFooter.querySelectorAll(".social-links a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
                console.log(
                    `Opening ${this.getAttribute("href").replace("#", "")} profile`
                );
      });
    });

    // App Store Buttons
        mainFooter.querySelectorAll(".app-btn").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
                console.log(
                    `Opening ${this.getAttribute("href").replace("#", "")} download page`
                );
      });
    });

    // Footer Links Hover Effect
        mainFooter.querySelectorAll(".footer-links a").forEach((link) => {
            link.addEventListener(
                "mouseenter",
                () => (link.style.paddingLeft = "5px")
            );
            link.addEventListener("mouseleave", () => (link.style.paddingLeft = "0"));
        });

        // Smooth Scroll
    mainFooter.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
                const targetElement = document.getElementById(
                    this.getAttribute("href").slice(1)
                );
        if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

    // Initialize all sections
    function initializeAllSections() {
        // Initialize common UI elements
        initializeCommonUI();

        // Initialize Category Cards
        initializeCategoryCards();

        // Initialize Filter Section
        initializeFilterSection();

        // Initialize Flash Sales Section
        const flashSalesSection = document.querySelector(".flash-sales");
        if (flashSalesSection) {
            initializeTooltips(flashSalesSection);
            initializeProductInteractions(flashSalesSection);
            initializeProductNavigation(flashSalesSection, {
                enableHoverEffects: true,
            });

            // Set countdown end date to 5 days from now
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 5);
            initializeCountdownTimer(endDate);
        }

        // Initialize Best Selling Section
        const bestSellingSection = document.querySelector(".best-selling");
        if (bestSellingSection) {
            initializeTooltips(bestSellingSection);
            initializeProductInteractions(bestSellingSection);
        }

        // Initialize Product Display Section
        const productDisplaySection = document.querySelector(".product-display");
        if (productDisplaySection) {
            initializeTooltips(productDisplaySection);
            initializeProductInteractions(productDisplaySection);
            initializeProductNavigation(productDisplaySection);
        }

        // Initialize Star Rating
        initializeStarRating();

        // Initialize Footer
        initializeFooter();
    }

    // Add mobile menu handling
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            const navContent = document.querySelector('.nav-content');
            navContent.classList.toggle('show-mobile-menu');
        });
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            const navContent = document.querySelector('.nav-content');
            navContent.classList.remove('show-mobile-menu');
        }
    });

    // Start initialization
    initializeAllSections();
});


// Initialize Filter Section
function initializeFilterSection() {
    const sortDropdown = document.querySelector('.filter-section button[title="Sort Products"]');
    const priceRangeDropdown = document.querySelector('.filter-section button[title="Filter by Price"]');
    const productsGrid = document.querySelector('.products-grid');

    if (sortDropdown && productsGrid) {
        const sortMenu = new bootstrap.Dropdown(sortDropdown);
        const sortOptions = [
            { text: 'Price: Low to High', value: 'price-asc' },
            { text: 'Price: High to Low', value: 'price-desc' },
            { text: 'Rating: High to Low', value: 'rating-desc' },
            { text: 'Most Reviewed', value: 'reviews-desc' }
        ];

        // Create dropdown menu
        const dropdownMenu = document.createElement('ul');
        dropdownMenu.className = 'dropdown-menu';
        sortOptions.forEach(option => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = option.text;
            a.dataset.value = option.value;
            li.appendChild(a);
            dropdownMenu.appendChild(li);
        });
        sortDropdown.after(dropdownMenu);

        // Handle sort selection
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                e.preventDefault();
                const value = e.target.dataset.value;
                const products = Array.from(productsGrid.children);

                products.sort((a, b) => {
                    const getPrice = el => parseFloat(el.querySelector('.current-price').textContent.replace('$', ''));
                    const getRating = el => parseInt(el.querySelector('.stars').dataset.rating);
                    const getReviews = el => parseInt(el.querySelector('.review-count').textContent.match(/\d+/)[0]);

                    switch (value) {
                        case 'price-asc':
                            return getPrice(a) - getPrice(b);
                        case 'price-desc':
                            return getPrice(b) - getPrice(a);
                        case 'rating-desc':
                            return getRating(b) - getRating(a);
                        case 'reviews-desc':
                            return getReviews(b) - getReviews(a);
                        default:
                            return 0;
                    }
                });

                // Reorder products in the grid
                products.forEach(product => productsGrid.appendChild(product));
                sortDropdown.textContent = e.target.textContent;
            }
        });
    }

    if (priceRangeDropdown && productsGrid) {
        const priceMenu = new bootstrap.Dropdown(priceRangeDropdown);
        const ranges = [
            { text: 'Under $100', min: 0, max: 100 },
            { text: '$100 - $500', min: 100, max: 500 },
            { text: '$500 - $1000', min: 500, max: 1000 },
            { text: 'Over $1000', min: 1000, max: Infinity }
        ];

        // Create price range menu
        const rangeMenu = document.createElement('ul');
        rangeMenu.className = 'dropdown-menu';
        ranges.forEach(range => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = range.text;
            a.dataset.min = range.min;
            a.dataset.max = range.max;
            li.appendChild(a);
            rangeMenu.appendChild(li);
        });
        priceRangeDropdown.after(rangeMenu);

        // Handle price range selection
        rangeMenu.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                e.preventDefault();
                const min = parseFloat(e.target.dataset.min);
                const max = parseFloat(e.target.dataset.max);

                Array.from(productsGrid.children).forEach(product => {
                    const price = parseFloat(product.querySelector('.current-price').textContent.replace('$', ''));
                    product.style.display = (price >= min && price <= max) ? '' : 'none';
                });

                priceRangeDropdown.textContent = e.target.textContent;
            }
        });
    }
}

// Initialize all sections
function initializeAllSections() {
    // Initialize common UI elements
    initializeCommonUI();

    // Initialize Category Cards
    initializeCategoryCards();

    // Initialize Flash Sales Section
    const flashSalesSection = document.querySelector(".flash-sales");
    if (flashSalesSection) {
        initializeTooltips(flashSalesSection);
        initializeProductInteractions(flashSalesSection);
        initializeProductNavigation(flashSalesSection, {
            enableHoverEffects: true,
        });

        // Set countdown end date to 5 days from now
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        initializeCountdownTimer(endDate);
    }

    // Initialize Best Selling Section
    const bestSellingSection = document.querySelector(".best-selling");
    if (bestSellingSection) {
        initializeTooltips(bestSellingSection);
        initializeProductInteractions(bestSellingSection);
    }

    // Initialize Product Display Section
    const productDisplaySection = document.querySelector(".product-display");
    if (productDisplaySection) {
        initializeTooltips(productDisplaySection);
        initializeProductInteractions(productDisplaySection);
        initializeProductNavigation(productDisplaySection);
    }

    // Initialize Star Rating
    initializeStarRating();

    // Initialize Footer
    initializeFooter();
}

// Add mobile menu handling
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
        const navContent = document.querySelector('.nav-content');
        navContent.classList.toggle('show-mobile-menu');
    });
}

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        const navContent = document.querySelector('.nav-content');
        navContent.classList.remove('show-mobile-menu');
    }
});

// Start initialization
initializeAllSections(); 
// End of DOMContentLoaded event listener
