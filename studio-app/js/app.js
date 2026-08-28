// js/app.js
// Common UI & Authentication Controllers

document.addEventListener("DOMContentLoaded", () => {
  // Initialize dynamic components
  initCommonUI();
});

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

// Common UI initialization
function initCommonUI() {
  const isUserPage = window.location.pathname.includes("/user/");
  const isAdminPage = window.location.pathname.includes("/admin/");

  if (isUserPage) {
    renderUserNavbar();
    renderUserFooter();
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// User Dynamic Navbar (BridgeAI / Floating Capsule Redesign)
function renderUserNavbar() {
  const container = document.getElementById("navbar-placeholder");
  if (!container) return;

  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;
  
  // Detect if current page is the landing page (index.html)
  const isLandingPage = window.location.pathname.endsWith('index.html') || 
                         window.location.pathname.endsWith('/user/') || 
                         window.location.pathname.endsWith('/user');

  const outerTextColor = isLandingPage ? '#FFFFFF' : 'var(--text-primary)';
  const outerSecColor = isLandingPage ? 'rgba(255, 255, 255, 0.75)' : 'var(--text-secondary)';
  const outerBorderColor = isLandingPage ? 'rgba(255, 255, 255, 0.25)' : 'var(--border)';
  const navBackground = isLandingPage ? 'transparent' : '#FFFFFF';
  const navPosition = isLandingPage ? 'absolute' : 'sticky';
  const navBorder = isLandingPage ? 'none' : '1px solid var(--border)';
  const navShadow = isLandingPage ? 'none' : 'var(--shadow-sm)';

  let userNavAction = `
    <a href="register.html" class="nav-link" style="color: ${outerSecColor}; text-decoration: none; font-weight: 500; font-size: 14px; transition: var(--transition);">New Account</a>
    <a href="login.html" class="nav-link" style="color: ${outerTextColor}; text-decoration: none; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: var(--transition);"><i data-lucide="log-in" style="width: 16px; height: 16px;"></i> Login</a>
  `;

  if (user) {
    userNavAction = `
      <div class="user-menu-dropdown" style="position: relative; display: inline-block;">
        <button class="btn btn-outline user-menu-trigger" style="display: flex; align-items: center; gap: 8px; border-color: ${outerBorderColor}; color: ${outerTextColor}; background: transparent; padding: 6px 12px; border-radius: 99px;">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="Avatar" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover;">
          <span style="font-size: 13px; font-weight: 600;">${user.name.split(' ')[0]}</span>
          <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
        </button>
        <div class="dropdown-menu" style="display: none; position: absolute; right: 0; top: 115%; background: white; border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); min-width: 180px; z-index: 1000;">
          <a href="dashboard.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s;"><i data-lucide="layout-dashboard" style="width: 16px; height: 16px;"></i> My Dashboard</a>
          <a href="profile.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s;"><i data-lucide="user" style="width: 16px; height: 16px;"></i> Profile</a>
          ${user.role === 'admin' ? `<a href="../admin/index.html" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--primary-blue); text-decoration: none; border-bottom: 1px solid var(--border); transition: background 0.2s;"><i data-lucide="shield" style="width: 16px; height: 16px;"></i> Admin Area</a>` : ''}
          <a href="#" id="nav-logout-btn" style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; color: var(--danger); text-decoration: none; transition: background 0.2s;"><i data-lucide="log-out" style="width: 16px; height: 16px;"></i> Logout</a>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <nav class="navbar" style="background: ${navBackground}; border-bottom: ${navBorder}; padding: 20px 24px; position: ${navPosition}; top: 0; left: 0; right: 0; z-index: 999; box-shadow: ${navShadow}; transition: var(--transition);">
      <div class="nav-container" style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; width: 100%;">
        
        <!-- Logo -->
        <a href="index.html" class="nav-logo" style="text-decoration: none; display: flex; align-items: center; transition: var(--transition);">
          <img src="../assets/logo.png" alt="Tamil Digital Logo" style="height: 42px; object-fit: contain;">
        </a>

        <!-- Center floating Capsule navigation (BridgeAI style) -->
        <div class="desktop-only" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid var(--border); border-radius: 99px; padding: 5px 5px 5px 24px; display: inline-flex; align-items: center; gap: 28px; box-shadow: var(--shadow-sm); z-index: 10;">
          <a href="index.html" style="color: var(--text-primary); text-decoration: none; font-weight: ${window.location.pathname.endsWith('index.html') ? '700' : '500'}; font-size: 13.5px;">Home</a>
          <a href="services.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${window.location.pathname.endsWith('services.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition);">Services</a>
          <a href="packages.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${window.location.pathname.endsWith('packages.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition);">Pricing</a>
          <a href="gallery.html" style="color: var(--text-secondary); text-decoration: none; font-weight: ${window.location.pathname.endsWith('gallery.html') ? '700' : '500'}; font-size: 13.5px; transition: var(--transition); margin-right: 4px;">Gallery</a>
          <a href="booking.html" class="btn" style="background: #0F172A; color: white; border-radius: 99px; padding: 8px 18px; font-weight: 600; font-size: 13px; border: none; transition: var(--transition);">Book Session</a>
        </div>

        <!-- Right Login / Register Actions -->
        <div class="nav-actions desktop-only" style="display: flex; align-items: center; gap: 24px;">
          ${userNavAction}
        </div>

        <!-- Mobile Menu Hamburger -->
        <button id="mobile-menu-toggle" class="mobile-only" style="background: none; border: none; font-size: 24px; color: ${outerTextColor}; cursor: pointer; display: none;">
          <i data-lucide="menu"></i>
        </button>
      </div>

      <!-- Mobile Dropdown Panel -->
      <div id="mobile-menu-panel" style="display: none; background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border); box-shadow: var(--shadow-lg); padding: 16px 24px; flex-direction: column; gap: 16px; margin-top: 16px; position: absolute; left: 24px; right: 24px; z-index: 1000;">
        <a href="index.html" class="nav-link" style="color: var(--text-primary);">Home</a>
        <a href="services.html" class="nav-link" style="color: var(--text-primary);">Services</a>
        <a href="packages.html" class="nav-link" style="color: var(--text-primary);">Pricing</a>
        <a href="gallery.html" class="nav-link" style="color: var(--text-primary);">Gallery</a>
        <a href="index.html#about" class="nav-link" style="color: var(--text-primary);">About</a>
        <a href="index.html#contact" class="nav-link" style="color: var(--text-primary);">Contact</a>
        <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${user ? `
            <a href="dashboard.html" class="btn btn-outline" style="text-align: center;">My Dashboard</a>
            <a href="profile.html" class="btn btn-outline" style="text-align: center;">Profile</a>
            ${user.role === 'admin' ? '<a href="../admin/index.html" class="btn btn-outline" style="text-align: center; color: var(--primary-blue); border-color: var(--primary-blue);">Admin Area</a>' : ''}
            <button id="mobile-logout-btn" class="btn btn-outline" style="color: var(--danger); border-color: var(--danger); width: 100%;">Logout</button>
          ` : `
            <a href="register.html" class="btn btn-outline" style="text-align: center;">Register</a>
            <a href="login.html" class="btn btn-outline" style="text-align: center;">Login</a>
          `}
          <a href="booking.html" class="btn btn-primary" style="text-align: center; background-color: #0F172A; border-color: #0F172A;">Book Now</a>
        </div>
      </div>
    </nav>
  `;

  // Attach menu toggles
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
      }, 1000);
    });
  }

  const mobLogoutBtn = container.querySelector("#mobile-logout-btn");
  if (mobLogoutBtn) {
    mobLogoutBtn.addEventListener("click", () => {
      window.logoutUser();
      showToast("Logged out successfully");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }

  // Mobile menu display toggling
  const menuToggle = container.querySelector("#mobile-menu-toggle");
  const menuPanel = container.querySelector("#mobile-menu-panel");
  if (menuToggle && menuPanel) {
    menuToggle.addEventListener("click", () => {
      const isVisible = menuPanel.style.display === "flex";
      menuPanel.style.display = isVisible ? "none" : "flex";
      menuToggle.innerHTML = isVisible ? '<i data-lucide="menu"></i>' : '<i data-lucide="x"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  }
}

// User Footer
function renderUserFooter() {
  const container = document.getElementById("footer-placeholder");
  if (!container) return;

  const settings = window.getSettings ? window.getSettings() : DEFAULT_SETTINGS;

  container.innerHTML = `
    <footer style="background: #FFFFFF; border-top: 1px solid var(--border); padding: 64px 24px 24px 24px;">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 48px; margin-bottom: 48px;">
        <!-- Brand Info -->
        <div>
          <a href="index.html" style="text-decoration: none; display: flex; align-items: center; margin-bottom: 16px;">
            <img src="../assets/logo.png" alt="Tamil Digital Logo" style="height: 48px; object-fit: contain;">
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
            <li><a href="index.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Home</a></li>
            <li><a href="services.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Services</a></li>
            <li><a href="packages.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Packages</a></li>
            <li><a href="gallery.html" style="color: var(--text-secondary); text-decoration: none; transition: color 0.2s;">Gallery</a></li>
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

// Setup simple guard for customer pages requiring auth
function requireCustomerAuth() {
  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;
  if (!user) {
    window.location.href = "login.html";
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
  window.requireCustomerAuth = requireCustomerAuth;
  window.requireAdminAuth = requireAdminAuth;
}
