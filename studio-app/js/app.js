// Execute UI initialization immediately if DOM is already ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initCommonUI();
  });
} else {
  initCommonUI();
}

// Toast Notifications
function showToast(message, type = "success") {
  // Check if container exists, else create it
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.bottom = "24px";
    container.style.right = "24px";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "12px";
  toast.style.padding = "16px 20px";
  toast.style.backgroundColor = "#FFFFFF";
  toast.style.borderRadius = "12px";
  toast.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)";
  toast.style.borderLeft = `4px solid ${type === "success" ? "#16A34A" : type === "danger" ? "#EF4444" : type === "warning" ? "#F59E0B" : "#3B82F6"}`;
  toast.style.color = "#1E293B";
  toast.style.minWidth = "300px";
  toast.style.animation = "slideIn 0.3s ease forwards";
  toast.style.fontFamily = "system-ui, -apple-system, sans-serif";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "500";

  // Icon mapping
  let iconName = "check-circle";
  if (type === "danger") iconName = "alert-circle";
  if (type === "warning") iconName = "alert-triangle";
  if (type === "info") iconName = "info";

  toast.innerHTML = `
    <i data-lucide="${iconName}" style="color: ${type === "success" ? "#16A34A" : type === "danger" ? "#EF4444" : type === "warning" ? "#F59E0B" : "#3B82F6"}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  // Slide out and remove
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Load dotlottie script dynamically if not already present
if (typeof document !== 'undefined' && !document.getElementById("dotlottie-script")) {
  const s = document.createElement("script");
  s.id = "dotlottie-script";
  s.src = "https://cdn.jsdelivr.net/npm/@dotlottie/player-component@v1.3.0/dist/dotlottie-player.js";
  document.head.appendChild(s);
}

// Global Page Loader with Lottie animation
function initGlobalPageLoader() {
  let loader = document.getElementById("global-page-loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "global-page-loader";
    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100vw";
    loader.style.height = "100vh";
    loader.style.backgroundColor = "#FFFFFF";
    loader.style.zIndex = "999999";
    loader.style.display = "flex";
    loader.style.flexDirection = "column";
    loader.style.alignItems = "center";
    loader.style.justifyContent = "center";
    loader.style.transition = "opacity 0.4s ease, visibility 0.4s ease";
    loader.style.opacity = "1";
    loader.style.visibility = "visible";

    loader.innerHTML = `
      <div style="width: 240px; height: 240px; display: flex; align-items: center; justify-content: center; position: relative;">
        <iframe src="https://lottie.host/embed/1ab75bf0-0468-4d5b-9304-25caf4408257/5rNfkkYcMV.json" style="width: 240px; height: 240px; border: none; background: transparent; position: absolute; top: 0; left: 0; pointer-events: none;" allowfullscreen></iframe>
        <dotlottie-player src="https://lottie.host/1ab75bf0-0468-4d5b-9304-25caf4408257/5rNfkkYcMV.json" background="transparent" speed="1" style="width: 240px; height: 240px;" loop autoplay></dotlottie-player>
      </div>
      <p style="font-family: system-ui, -apple-system, sans-serif; font-size: 13.5px; font-weight: 600; color: #475569; margin-top: 12px; letter-spacing: 0.5px;">Loading Studio...</p>
    `;

    document.body.prepend(loader);
  }

  // Smoothly fade out loader after animation plays visibly (1200ms)
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }
  }, 1200);

  // Re-trigger loader fade-in when clicking internal page links
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.href && !link.target && !link.href.startsWith("#") && !link.href.includes("javascript:")) {
      try {
        const targetUrl = new URL(link.href, window.location.href);
        if (targetUrl.origin === window.location.origin && targetUrl.pathname !== window.location.pathname) {
          if (loader) {
            loader.style.visibility = "visible";
            loader.style.opacity = "1";
          }
        }
      } catch(err) {}
    }
  }, true);
}

// Common UI initialization
function initCommonUI() {
  initGlobalPageLoader();

  if (document.getElementById("navbar-placeholder")) {
    renderUserNavbar();
  }
  if (document.getElementById("footer-placeholder")) {
    renderUserFooter();
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// User Dynamic Navbar
function renderUserNavbar() {
  const container = document.getElementById("navbar-placeholder");
  if (!container) return;

  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;
  const path = window.location.pathname;
  
  // Detect if current page is the landing page (index.html)
  const isLandingPage = path.endsWith('index.html') || 
                         path.endsWith('/user/') || 
                         path.endsWith('/user');

  // If user is logged in and visits landing page, automatically redirect to dashboard.html
  if (user && isLandingPage) {
    window.location.href = "dashboard.html";
    return;
  }

  // When logged in, Logo and Home links point to dashboard.html instead of landing page (index.html)
  const logoHref = user ? 'dashboard.html' : 'index.html';
  const homeHref = user ? 'dashboard.html' : 'index.html';

  const outerTextColor = isLandingPage ? '#FFFFFF' : 'var(--text-primary)';
  const outerSecColor = isLandingPage ? 'rgba(255, 255, 255, 0.75)' : 'var(--text-secondary)';
  const outerBorderColor = isLandingPage ? 'rgba(255, 255, 255, 0.25)' : 'var(--border)';
  const navBackground = isLandingPage ? 'transparent' : '#FFFFFF';
  const navPosition = isLandingPage ? 'absolute' : 'sticky';
  const navBorder = isLandingPage ? 'none' : '1px solid var(--border)';
  const navShadow = isLandingPage ? 'none' : '0 2px 10px rgba(0,0,0,0.04)';

  let userNavAction = `
    <a href="register.html" class="nav-link" style="color: ${outerSecColor}; text-decoration: none; font-weight: 500; font-size: 14px; transition: var(--transition);">New Account</a>
    <a href="login.html" class="nav-link nav-login-trigger" style="color: ${outerTextColor}; text-decoration: none; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: var(--transition);"><i data-lucide="log-in" style="width: 16px; height: 16px;"></i> Login</a>
  `;

  if (user && !isLandingPage) {
    const userName = (user && user.name) ? user.name.split(' ')[0] : 'User';
    userNavAction = `
      <div class="user-menu-dropdown" style="position: relative; display: inline-block;">
        <button class="btn btn-outline user-menu-trigger" style="display: flex; align-items: center; gap: 8px; border-color: ${outerBorderColor}; color: ${outerTextColor}; background: transparent; padding: 6px 14px; border-radius: 99px; cursor: pointer; font-weight: 600;">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="Avatar" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover;">
          <span style="font-size: 13.5px; font-weight: 600;">${userName}</span>
          <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
        </button>
        <div class="dropdown-menu" style="display: none; position: absolute; right: 0; top: 115%; background: white; border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); min-width: 190px; z-index: 1000;">
          <a href="dashboard.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s; font-size: 13.5px;"><i data-lucide="layout-dashboard" style="width: 16px; height: 16px;"></i> My Dashboard</a>
          <a href="bookings.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s; font-size: 13.5px;"><i data-lucide="calendar" style="width: 16px; height: 16px;"></i> My Bookings</a>
          <a href="profile.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s; font-size: 13.5px;"><i data-lucide="user" style="width: 16px; height: 16px;"></i> Profile</a>
          ${user.role === 'admin' ? `<a href="../admin/index.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--primary-blue); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s; font-size: 13.5px;"><i data-lucide="shield" style="width: 16px; height: 16px;"></i> Admin Area</a>` : ''}
          <a href="#" id="nav-logout-btn" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--danger); text-decoration: none; transition: background 0.2s; font-size: 13.5px;"><i data-lucide="log-out" style="width: 16px; height: 16px;"></i> Logout</a>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <nav class="navbar" style="background: ${navBackground}; border-bottom: ${navBorder}; padding: 14px 24px; position: ${navPosition}; top: 0; left: 0; right: 0; z-index: 999; box-shadow: ${navShadow}; transition: var(--transition);">
      <div class="nav-container" style="max-width: 1240px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 12px;">
        
        <!-- Logo -->
        <a href="${logoHref}" class="nav-logo" style="text-decoration: none; display: flex; align-items: center; transition: var(--transition);">
          <img src="../assets/logo.png" alt="Tamil Digital Logo" style="height: 44px; object-fit: contain;">
        </a>

        <!-- Center floating Capsule navigation -->
        <div class="nav-capsule" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid var(--border); border-radius: 99px; padding: 6px 8px 6px 20px; display: flex; align-items: center; gap: 20px; box-shadow: var(--shadow-sm); z-index: 10; flex-wrap: wrap;">
          ${!user ? `<a href="index.html" style="color: var(--text-primary); text-decoration: none; font-weight: ${path.endsWith('index.html') ? '700' : '500'}; font-size: 13.5px; display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="home" style="width: 15px; height: 15px;"></i> Home</a>` : ''}
          ${user ? `<a href="dashboard.html" style="color: var(--text-primary); text-decoration: none; font-weight: ${path.endsWith('dashboard.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition); display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="layout-dashboard" style="width: 15px; height: 15px;"></i> Dashboard</a>` : ''}
          <a href="services.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${path.endsWith('services.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition); display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="camera" style="width: 15px; height: 15px;"></i> Services</a>
          <a href="packages.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${path.endsWith('packages.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition); display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="tag" style="width: 15px; height: 15px;"></i> Pricing</a>
          <a href="gallery.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${path.endsWith('gallery.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition); display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="image" style="width: 15px; height: 15px;"></i> Gallery</a>
          ${user ? `<a href="bookings.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${path.endsWith('bookings.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition); margin-right: 4px; display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="calendar" style="width: 15px; height: 15px;"></i> My Bookings</a>` : ''}
          <a href="booking.html" class="btn" style="background: #0F172A; color: white; border-radius: 99px; padding: 8px 18px; font-weight: 600; font-size: 13px; border: none; transition: var(--transition); display: inline-flex; align-items: center; gap: 6px;"><i data-lucide="calendar-plus" style="width: 15px; height: 15px;"></i> Book Session</a>
        </div>

        <!-- Right Login / Profile Actions -->
        <div class="nav-actions" style="display: flex; align-items: center; gap: 16px;">
          ${userNavAction}
        </div>
      </div>
    </nav>
  `;

  // Attach login modal triggers
  const loginTriggers = container.querySelectorAll(".nav-login-trigger");
  loginTriggers.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openLoginModal();
    });
  });

  // Attach dropdown trigger
  const dropdownTrigger = container.querySelector(".user-menu-trigger");
  const dropdownMenu = container.querySelector(".dropdown-menu");
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
    });
    document.addEventListener("click", () => {
      dropdownMenu.style.display = "none";
    });
  }

  // Logout actions
  const logoutBtn = container.querySelector("#nav-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.logoutUser();
      showToast("Logged out successfully");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

// User Footer
function renderUserFooter() {
  const container = document.getElementById("footer-placeholder");
  if (!container) return;

  const settings = window.getSettings ? window.getSettings() : DEFAULT_SETTINGS;
  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;
  const path = window.location.pathname;

  // Detect landing page
  const isLandingPage = path.endsWith('index.html') || path.endsWith('/user/') || path.endsWith('/user');

  if (isLandingPage) {
    // Full detailed footer for Landing Page
    container.innerHTML = `
      <footer style="background: #FFFFFF; border-top: 1px solid var(--border); padding: 64px 24px 24px 24px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 48px; margin-bottom: 48px;">
          <!-- Brand Info -->
          <div>
            <a href="index.html" style="text-decoration: none; display: flex; align-items: center; margin-bottom: 16px;">
              <img src="../assets/logo.png" alt="${settings.studioName} Logo" style="height: 48px; object-fit: contain;">
            </a>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-size: 14px;">
              Capture your life's beautiful moments with our premium, professional photography and videography studio management services.
            </p>
            <div style="display: flex; gap: 16px; color: var(--text-secondary);">
              <a href="#" style="color: inherit;"><i data-lucide="facebook" style="width: 20px; height: 20px;"></i></a>
              <a href="#" style="color: inherit;"><i data-lucide="instagram" style="width: 20px; height: 20px;"></i></a>
              <a href="#" style="color: inherit;"><i data-lucide="twitter" style="width: 20px; height: 20px;"></i></a>
              <a href="#" style="color: inherit;"><i data-lucide="youtube" style="width: 20px; height: 20px;"></i></a>
            </div>
          </div>

          <!-- Direct Links -->
          <div>
            <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 24px;">Quick Links</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
              <li><a href="index.html" style="color: var(--text-secondary); text-decoration: none;">Home</a></li>
              <li><a href="services.html" style="color: var(--text-secondary); text-decoration: none;">Services</a></li>
              <li><a href="packages.html" style="color: var(--text-secondary); text-decoration: none;">Packages</a></li>
              <li><a href="gallery.html" style="color: var(--text-secondary); text-decoration: none;">Gallery</a></li>
            </ul>
          </div>

          <!-- Services Short-list -->
          <div>
            <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 24px;">Services</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
              <li><a href="services.html" style="color: var(--text-secondary); text-decoration: none;">Portrait Shoots</a></li>
              <li><a href="services.html" style="color: var(--text-secondary); text-decoration: none;">Weddings & Events</a></li>
              <li><a href="services.html" style="color: var(--text-secondary); text-decoration: none;">Product E-commerce</a></li>
              <li><a href="services.html" style="color: var(--text-secondary); text-decoration: none;">Cinematography</a></li>
            </ul>
          </div>

          <!-- Studio Contacts -->
          <div>
            <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 24px;">Contact Us</h4>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; font-size: 14px; color: var(--text-secondary);">
              <li style="display: flex; gap: 8px; align-items: flex-start;">
                <i data-lucide="map-pin" style="color: var(--primary-green); width: 18px; height: 18px; flex-shrink: 0;"></i>
                <span>${settings.address}</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: center;">
                <i data-lucide="phone" style="color: var(--primary-green); width: 18px; height: 18px;"></i>
                <span>+91 ${settings.phone}</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: center;">
                <i data-lucide="mail" style="color: var(--primary-green); width: 18px; height: 18px;"></i>
                <span>${settings.email}</span>
              </li>
              <li style="display: flex; gap: 8px; align-items: center;">
                <i data-lucide="clock" style="color: var(--primary-green); width: 18px; height: 18px;"></i>
                <span>${settings.operatingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin-bottom: 24px;">

        <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; font-size: 13px; color: var(--text-secondary);">
          <p>&copy; 2026 ${settings.studioName}. All rights reserved.</p>
          <div style="display: flex; gap: 24px;">
            <a href="#" style="color: inherit; text-decoration: none;">Privacy Policy</a>
            <a href="#" style="color: inherit; text-decoration: none;">Terms of Service</a>
            <a href="../admin/index.html" style="color: var(--primary-blue); text-decoration: none; font-weight: 600;">Admin Dashboard</a>
          </div>
        </div>
      </footer>
    `;
  } else {
    // Sleek compact footer for User pages (dashboard, services, packages, gallery, bookings, profile, etc.)
    container.innerHTML = `
      <footer style="background: #FFFFFF; border-top: 1px solid var(--border); padding: 18px 24px;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; font-size: 13.5px; color: var(--text-secondary);">
          <!-- Logo & Copyright -->
          <div style="display: flex; align-items: center; gap: 16px;">
            <a href="dashboard.html" style="text-decoration: none; display: flex; align-items: center;">
              <img src="../assets/logo.png" alt="${settings.studioName} Logo" style="height: 34px; object-fit: contain;">
            </a>
            <span style="color: var(--border);">|</span>
            <span>&copy; 2026 ${settings.studioName}. All rights reserved.</span>
          </div>

          <!-- Compact Nav Links -->
          <div style="display: flex; align-items: center; gap: 20px; font-size: 13.5px; font-weight: 500;">
            <a href="dashboard.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Dashboard</a>
            <a href="services.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Services</a>
            <a href="packages.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Packages</a>
            <a href="gallery.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Gallery</a>
            <a href="bookings.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">My Bookings</a>
          </div>
        </div>
      </footer>
    `;
  }
}

// Dynamic Modals Trigger
function createConfirmationModal(title, message, confirmText, cancelText, onConfirm) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(15, 23, 42, 0.4)";
  modal.style.backdropFilter = "blur(4px)";
  modal.style.zIndex = "99999";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";

  modal.innerHTML = `
    <div class="modal-card" style="background: white; border-radius: var(--radius-lg); padding: 32px; max-width: 440px; width: 90%; box-shadow: var(--shadow-lg); animation: scaleUp 0.2s ease forwards;">
      <h3 style="margin-top: 0; font-size: 20px; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 12px;">
        <i data-lucide="help-circle" style="color: var(--warning); width: 24px; height: 24px;"></i>
        <span>${title}</span>
      </h3>
      <p style="color: var(--text-secondary); line-height: 1.6; font-size: 14px; margin: 16px 0 24px 0;">${message}</p>
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn btn-outline modal-cancel" style="border-color: var(--border);">${cancelText}</button>
        <button class="btn btn-primary modal-confirm" style="background-color: var(--danger); border-color: var(--danger);">${confirmText}</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  if (window.lucide) window.lucide.createIcons();

  const cancelBtn = modal.querySelector(".modal-cancel");
  const confirmBtn = modal.querySelector(".modal-confirm");

  cancelBtn.addEventListener("click", () => {
    modal.remove();
  });

  confirmBtn.addEventListener("click", () => {
    onConfirm();
    modal.remove();
  });
}

// Interactive Role-Based Login Modal (User vs Admin)
function openLoginModal(defaultRole = 'customer') {
  let modal = document.getElementById("auth-login-modal");
  if (modal) {
    modal.remove();
  }

  modal = document.createElement("div");
  modal.id = "auth-login-modal";
  modal.className = "modal-overlay";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
  modal.style.backdropFilter = "blur(6px)";
  modal.style.zIndex = "99999";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.padding = "20px";

  modal.innerHTML = `
    <div class="modal-card" style="background: white; border-radius: 16px; padding: 24px 22px; max-width: 360px; width: 100%; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.25); position: relative; animation: scaleUp 0.2s ease forwards;">
      <button type="button" id="close-login-modal" style="position: absolute; top: 14px; right: 14px; background: none; border: none; font-size: 18px; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; transition: background 0.2s;">
        <i data-lucide="x" style="width: 18px; height: 18px;"></i>
      </button>

      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 16px;">
        <img src="../assets/logo.png" alt="Tamil Digital Logo" style="height: 38px; object-fit: contain; margin-bottom: 4px;">
        <p style="color: var(--text-secondary); font-size: 12px; margin: 0;">Select your portal to continue</p>
      </div>

      <!-- Role Selector Tabs -->
      <div style="margin-bottom: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: var(--background); padding: 4px; border-radius: 99px; border: 1px solid var(--border);">
          <button type="button" id="modal-role-user" style="padding: 7px 10px; border-radius: 99px; border: none; font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; transition: var(--transition); background: var(--primary-green); color: white; box-shadow: var(--shadow-sm);">
            <i data-lucide="user" style="width: 14px; height: 14px;"></i>
            <span>User Portal</span>
          </button>
          <button type="button" id="modal-role-admin" style="padding: 7px 10px; border-radius: 99px; border: none; font-weight: 600; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; transition: var(--transition); background: transparent; color: var(--text-secondary);">
            <i data-lucide="shield" style="width: 14px; height: 14px;"></i>
            <span>Admin Portal</span>
          </button>
        </div>
        <p id="modal-role-hint" style="text-align: center; font-size: 11px; color: var(--text-secondary); margin-top: 6px; margin-bottom: 0;">
          Logging in as <strong style="color: var(--primary-green);">Customer</strong>.
        </p>
      </div>

      <!-- Form -->
      <form id="modal-login-form">
        <div class="form-group" style="margin-bottom: 10px;">
          <label class="form-label" style="font-size: 11.5px; font-weight: 600; margin-bottom: 3px; display: block;">Email Address</label>
          <input type="email" id="modal-email" class="form-input" style="font-size: 13px; padding: 7px 11px;" required value="customer@gmail.com">
        </div>

        <div class="form-group" style="margin-bottom: 14px;">
          <label class="form-label" style="font-size: 11.5px; font-weight: 600; margin-bottom: 3px; display: block;">Password</label>
          <input type="password" id="modal-password" class="form-input" style="font-size: 13px; padding: 7px 11px;" required value="customer123">
        </div>

        <button type="submit" id="modal-submit-btn" class="btn btn-primary" style="width: 100%; padding: 9px; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px; border-radius: 99px; background-color: var(--primary-green); border-color: var(--primary-green);">
          <span>Login to User Dashboard</span>
          <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
        </button>
      </form>

      <!-- Quick credentials toggle pills -->
      <div style="margin-top: 14px; padding: 8px 10px; background: var(--soft-blue); border-radius: var(--radius-sm); border: 1px solid var(--light-blue); font-size: 11px; color: var(--text-primary);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Quick Switch:</span>
          <div style="display: flex; gap: 6px;">
            <span id="pill-fill-user" style="cursor: pointer; color: var(--primary-green); font-weight: 700; background: white; padding: 2px 7px; border-radius: 99px; border: 1px solid var(--border);">👤 User</span>
            <span id="pill-fill-admin" style="cursor: pointer; color: var(--primary-blue); font-weight: 700; background: white; padding: 2px 7px; border-radius: 99px; border: 1px solid var(--border);">🛡️ Admin</span>
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 14px; font-size: 12px; color: var(--text-secondary);">
        <span>Don't have an account? </span>
        <a href="register.html" style="color: var(--primary-green); text-decoration: none; font-weight: 600;">Sign up</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  if (window.lucide) window.lucide.createIcons();

  let activeRole = defaultRole;
  const userBtn = modal.querySelector("#modal-role-user");
  const adminBtn = modal.querySelector("#modal-role-admin");
  const emailInput = modal.querySelector("#modal-email");
  const passInput = modal.querySelector("#modal-password");
  const submitBtn = modal.querySelector("#modal-submit-btn");
  const hintText = modal.querySelector("#modal-role-hint");

  function setModalRole(role) {
    activeRole = role;
    if (role === 'customer') {
      userBtn.style.background = "var(--primary-green)";
      userBtn.style.color = "white";
      userBtn.style.boxShadow = "var(--shadow-sm)";
      adminBtn.style.background = "transparent";
      adminBtn.style.color = "var(--text-secondary)";
      adminBtn.style.boxShadow = "none";

      emailInput.value = "customer@gmail.com";
      passInput.value = "customer123";
      submitBtn.style.backgroundColor = "var(--primary-green)";
      submitBtn.style.borderColor = "var(--primary-green)";
      submitBtn.innerHTML = `<span>Login to User Dashboard</span><i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>`;
      hintText.innerHTML = `Logging in as <strong style="color: var(--primary-green);">Customer</strong>. Navigates to <strong>User Dashboard</strong>.`;
    } else {
      adminBtn.style.background = "var(--primary-blue)";
      adminBtn.style.color = "white";
      adminBtn.style.boxShadow = "var(--shadow-sm)";
      userBtn.style.background = "transparent";
      userBtn.style.color = "var(--text-secondary)";
      userBtn.style.boxShadow = "none";

      emailInput.value = "admin@studio.com";
      passInput.value = "admin123";
      submitBtn.style.backgroundColor = "var(--primary-blue)";
      submitBtn.style.borderColor = "var(--primary-blue)";
      submitBtn.innerHTML = `<span>Login to Admin Dashboard</span><i data-lucide="shield-check" style="width: 16px; height: 16px;"></i>`;
      hintText.innerHTML = `Logging in as <strong style="color: var(--primary-blue);">Administrator</strong>. Navigates to <strong>Admin Dashboard</strong>.`;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  userBtn.addEventListener("click", () => setModalRole('customer'));
  adminBtn.addEventListener("click", () => setModalRole('admin'));
  modal.querySelector("#pill-fill-user").addEventListener("click", () => setModalRole('customer'));
  modal.querySelector("#pill-fill-admin").addEventListener("click", () => setModalRole('admin'));

  if (defaultRole === 'admin') setModalRole('admin');

  // Close logic
  function closeModal() {
    modal.remove();
  }
  modal.querySelector("#close-login-modal").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Submit logic
  const form = modal.querySelector("#modal-login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const pass = passInput.value;

    const result = window.loginUser(email, pass);
    if (result.success) {
      const isAdmin = result.user.role === "admin";
      window.showToast(`Logged in successfully as ${isAdmin ? 'Admin' : result.user.name.split(' ')[0]}!`);
      closeModal();
      setTimeout(() => {
        if (isAdmin) {
          window.location.href = "../admin/index.html";
        } else {
          window.location.href = "dashboard.html";
        }
      }, 700);
    } else {
      window.showToast(result.message, "danger");
    }
  });
}

// Setup simple guard for customer pages requiring auth
function requireCustomerAuth() {
  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;
  if (!user) {
    window.location.href = "index.html";
  }
}

// Setup simple guard for admin pages requiring auth
function requireAdminAuth() {
  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;
  if (!user || user.role !== "admin") {
    window.location.href = "../user/login.html?admin_redirect=1";
  }
}

// Bind to window if browser
if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.createConfirmationModal = createConfirmationModal;
  window.openLoginModal = openLoginModal;
  window.requireCustomerAuth = requireCustomerAuth;
  window.requireAdminAuth = requireAdminAuth;
  window.renderAppRail = renderAppRail;
  window.renderAppTopbar = renderAppTopbar;
}


