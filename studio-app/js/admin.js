// js/admin.js
// Admin Portal Controller & Common UI Binder

document.addEventListener("DOMContentLoaded", () => {
  // 1. Guard route: requires admin credentials
  if (window.requireAdminAuth) {
    window.requireAdminAuth();
  }

  // 2. Render common UI parts (Sidebar + Header)
  renderAdminSidebar();
  renderAdminHeader();

  // 3. Setup mobile menu bindings
  initAdminMenuToggles();
});

// Render Admin Left Sidebar
function renderAdminSidebar() {
  const container = document.getElementById("admin-sidebar-placeholder");
  if (!container) return;

  const currentPath = window.location.pathname;
  
  const menuItems = [
    { name: "Dashboard", icon: "layout-dashboard", path: "index.html" },
    { name: "Bookings", icon: "calendar", path: "bookings.html" },
    { name: "Customers", icon: "users", path: "customers.html" },
    { name: "Services", icon: "camera", path: "services.html" },
    { name: "Packages", icon: "package", path: "packages.html" },
    { name: "Gallery Portfolio", icon: "images", path: "gallery.html" },
    { name: "Payments Ledger", icon: "credit-card", path: "payments.html" },
    { name: "Reports & Stats", icon: "bar-chart-2", path: "reports.html" },
    { name: "Settings Preferences", icon: "settings", path: "settings.html" }
  ];

  const renderedLinks = menuItems.map(item => {
    // Check if the current page ends with the item path
    const isActive = currentPath.endsWith(item.path) || (item.path === 'index.html' && currentPath.endsWith('/admin/'));
    return `
      <a href="${item.path}" class="admin-nav-item ${isActive ? 'active' : ''}">
        <div class="admin-nav-link-content">
          <i data-lucide="${item.icon}"></i>
          <span>${item.name.split(' ')[0]}</span>
        </div>
      </a>
    `;
  }).join("");

  container.innerHTML = `
    <aside class="admin-sidebar" id="admin-sidebar-panel">
      <div class="admin-sidebar-header">
        <a href="../user/index.html" style="text-decoration: none; display: flex; align-items: center; gap: 8px;">
          <img src="../assets/logo.png" alt="Tamil Digital Logo" style="height: 38px; object-fit: contain;">
          <span style="font-size: 10px; background-color: var(--light-blue); color: var(--primary-blue); padding: 2px 6px; border-radius: 99px; font-weight: 600;">Admin</span>
        </a>
        <button id="admin-sidebar-close" class="mobile-only" style="display: none; background: none; border: none; font-size: 20px; color: var(--text-secondary); cursor: pointer;">
          <i data-lucide="x"></i>
        </button>
      </div>

      <nav class="admin-sidebar-nav">
        ${renderedLinks}
      </nav>

      <div class="admin-sidebar-footer">
        <a href="#" id="admin-logout-btn" class="admin-nav-item" style="color: var(--danger);">
          <div class="admin-nav-link-content">
            <i data-lucide="log-out"></i>
            <span>Sign Out</span>
          </div>
        </a>
      </div>
    </aside>
  `;

  // Attach sign out trigger
  const logoutBtn = container.querySelector("#admin-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.logoutUser();
      window.showToast("Logged out from Admin");
      setTimeout(() => {
        window.location.href = "../user/index.html";
      }, 1000);
    });
  }
}

// Render Admin Top Header
function renderAdminHeader() {
  const container = document.getElementById("admin-header-placeholder");
  if (!container) return;

  const user = window.getLoggedInUser ? window.getLoggedInUser() : null;

  container.innerHTML = `
    <header class="admin-header">
      <div class="admin-header-left">
        <!-- Sidebar hamburger on mobile -->
        <button id="admin-sidebar-toggle" class="btn btn-outline mobile-only" style="display: none; padding: 8px 12px;">
          <i data-lucide="menu"></i>
        </button>
        <div class="admin-search-wrapper">
          <i data-lucide="search"></i>
          <input type="text" id="global-admin-search" class="admin-search-input" placeholder="Search booking ID, customer...">
        </div>
      </div>

      <div class="admin-header-right">
        <!-- Notification Panel -->
        <div class="notification-wrapper" style="position: relative;">
          <button class="admin-notification-trigger" id="admin-bell">
            <i data-lucide="bell"></i>
            <span class="admin-notification-badge"></span>
          </button>
          <div class="dropdown-menu" id="admin-bell-dropdown" style="display: none; position: absolute; right: 0; top: 110%; background: white; border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); width: 280px; z-index: 100; padding: 8px 0;">
            <div style="padding: 12px 16px; font-weight: 700; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-primary); display: flex; justify-content: space-between; align-items: center;">
              <span>Notifications</span>
              <span class="badge badge-success" style="font-size: 10px;">2 New</span>
            </div>
            <div style="max-height: 200px; overflow-y: auto;">
              <a href="bookings.html" style="display: flex; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--border); font-size: 12px; transition: background 0.2s;">
                <div style="background-color: var(--soft-blue); color: var(--primary-blue); padding: 8px; border-radius: 50%; height: fit-content;"><i data-lucide="calendar" style="width: 14px; height: 14px;"></i></div>
                <div>
                  <p style="font-weight: 600; margin: 0;">New Booking #1002</p>
                  <p style="color: var(--text-secondary); margin: 2px 0 0 0;">Priya Sundar scheduled a session.</p>
                </div>
              </a>
              <a href="bookings.html" style="display: flex; gap: 8px; padding: 12px 16px; color: var(--text-primary); text-decoration: none; font-size: 12px; transition: background 0.2s;">
                <div style="background-color: var(--soft-green); color: var(--primary-green); padding: 8px; border-radius: 50%; height: fit-content;"><i data-lucide="dollar-sign" style="width: 14px; height: 14px;"></i></div>
                <div>
                  <p style="font-weight: 600; margin: 0;">Payment Received</p>
                  <p style="color: var(--text-secondary); margin: 2px 0 0 0;">Karthik Rajan paid ₹5,499.</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Admin Profile -->
        <div class="admin-profile-menu user-menu-dropdown" style="position: relative;">
          <div class="admin-profile-menu-trigger" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <img src="${user ? user.avatar : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'}" alt="Admin Avatar" class="admin-profile-avatar">
            <span style="font-weight: 600; font-size: 14px;" class="desktop-only">${user ? user.name.split(' ')[0] : 'Admin'}</span>
            <i data-lucide="chevron-down" style="width: 14px; height: 14px;" class="desktop-only"></i>
          </div>
          
          <div class="dropdown-menu" id="admin-profile-dropdown" style="display: none; position: absolute; right: 0; top: 110%; background: white; border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); min-width: 160px; z-index: 100; padding: 6px 0;">
            <a href="settings.html" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; color: var(--text-primary); text-decoration: none; font-size: 13px; transition: background 0.2s;"><i data-lucide="settings" style="width: 15px; height: 15px;"></i> Studio Settings</a>
            <a href="../user/index.html" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; color: var(--text-primary); text-decoration: none; font-size: 13px; border-bottom: 1px solid var(--border); transition: background 0.2s;"><i data-lucide="home" style="width: 15px; height: 15px;"></i> Go to User Site</a>
            <a href="#" id="header-admin-logout" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; color: var(--danger); text-decoration: none; font-size: 13px; transition: background 0.2s;"><i data-lucide="log-out" style="width: 15px; height: 15px;"></i> Log Out</a>
          </div>
        </div>
      </div>
    </header>
  `;

  // Attach notifications dropdown
  const bellBtn = container.querySelector("#admin-bell");
  const bellDropdown = container.querySelector("#admin-bell-dropdown");
  if (bellBtn && bellDropdown) {
    bellBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      bellDropdown.style.display = bellDropdown.style.display === "none" ? "block" : "none";
      profileDropdown.style.display = "none";
    });
  }

  // Attach profile dropdown
  const profileTrigger = container.querySelector(".admin-profile-menu-trigger");
  const profileDropdown = container.querySelector("#admin-profile-dropdown");
  if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.style.display = profileDropdown.style.display === "none" ? "block" : "none";
      bellDropdown.style.display = "none";
    });
  }

  // Global click closes dropdowns
  document.addEventListener("click", () => {
    if (bellDropdown) bellDropdown.style.display = "none";
    if (profileDropdown) profileDropdown.style.display = "none";
  });

  // Logout binder
  const headerLogout = container.querySelector("#header-admin-logout");
  if (headerLogout) {
    headerLogout.addEventListener("click", (e) => {
      e.preventDefault();
      window.logoutUser();
      window.showToast("Logged out from Admin");
      setTimeout(() => {
        window.location.href = "../user/index.html";
      }, 1000);
    });
  }
}

// Side drawer toggles for responsive design
function initAdminMenuToggles() {
  const toggleBtn = document.getElementById("admin-sidebar-toggle");
  const closeBtn = document.getElementById("admin-sidebar-close");
  const sidebar = document.getElementById("admin-sidebar-panel");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.add("open");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // Clicking outside side drawer closes it
  document.addEventListener("click", (e) => {
    if (sidebar && sidebar.classList.contains("open")) {
      if (!sidebar.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove("open");
      }
    }
  });
}
