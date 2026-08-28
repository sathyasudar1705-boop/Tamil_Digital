// js/storage.js
// LocalStorage Manager for Studio Management & Booking Web Application

const STORAGE_KEYS = {
  SERVICES: "studio_services",
  PACKAGES: "studio_packages",
  CUSTOMERS: "studio_customers",
  BOOKINGS: "studio_bookings",
  PAYMENTS: "studio_payments",
  GALLERY: "studio_gallery",
  USERS: "studio_users",
  LOGGED_USER: "studio_logged_in_user",
  SETTINGS: "studio_settings"
};

const DEFAULT_SETTINGS = {
  studioName: "Aura Studio",
  headline: "Capture Your Moments. Create Your Memories",
  email: "contact@aurastudio.com",
  phone: "9876543210",
  address: "123 Anna Salai, Chennai, TN",
  operatingHours: "09:00 AM - 08:00 PM",
  currency: "₹"
};

// Initialize DB if not present
function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(window.INITIAL_SERVICES || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(window.INITIAL_PACKAGES || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(window.INITIAL_CUSTOMERS || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(window.INITIAL_BOOKINGS || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(window.INITIAL_PAYMENTS || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(window.INITIAL_GALLERY || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(window.INITIAL_USERS || []));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
}

// Global invocation on load
initDatabase();

// --- SERVICES ---
function getServices() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)) || [];
}
function saveServices(services) {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
}
function addService(service) {
  const services = getServices();
  service.id = "srv-" + Date.now();
  services.push(service);
  saveServices(services);
  return service;
}
function updateService(id, updatedData) {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updatedData };
    saveServices(services);
    return services[index];
  }
  return null;
}
function deleteService(id) {
  let services = getServices();
  services = services.filter(s => s.id !== id);
  saveServices(services);
}

// --- PACKAGES ---
function getPackages() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PACKAGES)) || [];
}
function savePackages(packages) {
  localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
}
function addPackage(pkg) {
  const packages = getPackages();
  pkg.id = "pkg-" + Date.now();
  packages.push(pkg);
  savePackages(packages);
  return pkg;
}
function updatePackage(id, updatedData) {
  const packages = getPackages();
  const index = packages.findIndex(p => p.id === id);
  if (index !== -1) {
    packages[index] = { ...packages[index], ...updatedData };
    savePackages(packages);
    return packages[index];
  }
  return null;
}
function deletePackage(id) {
  let packages = getPackages();
  packages = packages.filter(p => p.id !== id);
  savePackages(packages);
}

// --- CUSTOMERS ---
function getCustomers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) || [];
}
function saveCustomers(customers) {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
}
function addCustomer(customer) {
  const customers = getCustomers();
  customer.id = "cust-" + Date.now();
  customer.totalBookings = 0;
  customer.totalSpent = 0;
  customer.lastBooking = "Never";
  customer.status = customer.status || "active";
  customers.push(customer);
  saveCustomers(customers);
  return customer;
}
function updateCustomer(id, updatedData) {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updatedData };
    saveCustomers(customers);
    return customers[index];
  }
  return null;
}
function deleteCustomer(id) {
  let customers = getCustomers();
  customers = customers.filter(c => c.id !== id);
  saveCustomers(customers);
}

// --- BOOKINGS ---
function getBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
}
function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}
function addBooking(booking) {
  const bookings = getBookings();
  booking.id = "bk-" + Math.floor(1000 + Math.random() * 9000);
  booking.status = booking.status || "Pending";
  booking.createdAt = new Date().toISOString().split('T')[0];
  bookings.push(booking);
  saveBookings(bookings);

  // Sync with customer record
  updateCustomerBookingStats(booking.customerEmail, booking.amount, booking.date);

  // Sync with payments record
  addPayment({
    id: "pay-" + Math.floor(100 + Math.random() * 900),
    bookingId: booking.id,
    customerName: booking.customerName,
    amount: booking.amount,
    date: booking.createdAt,
    method: "UPI",
    status: booking.status === "Confirmed" ? "Paid" : "Pending"
  });

  return booking;
}

function updateCustomerBookingStats(email, amount, date) {
  const customers = getCustomers();
  const customer = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
  if (customer) {
    customer.totalBookings += 1;
    customer.totalSpent += amount;
    customer.lastBooking = date;
    saveCustomers(customers);
  }
}

function updateBooking(id, updatedData) {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    const oldBooking = bookings[index];
    bookings[index] = { ...oldBooking, ...updatedData };
    saveBookings(bookings);

    // If status changed to Completed/Cancelled, sync payments or user records
    if (updatedData.status && updatedData.status !== oldBooking.status) {
      const payments = getPayments();
      const payment = payments.find(p => p.bookingId === id);
      if (payment) {
        if (updatedData.status === "Completed") {
          payment.status = "Paid";
        } else if (updatedData.status === "Cancelled") {
          payment.status = "Refunded";
        } else if (updatedData.status === "Confirmed") {
          payment.status = "Paid";
        }
        savePayments(payments);
      }
    }
    return bookings[index];
  }
  return null;
}
function cancelBooking(id) {
  return updateBooking(id, { status: "Cancelled" });
}

// --- PAYMENTS ---
function getPayments() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS)) || [];
}
function savePayments(payments) {
  localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
}
function addPayment(payment) {
  const payments = getPayments();
  payments.push(payment);
  savePayments(payments);
  return payment;
}

// --- GALLERY ---
function getGallery() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY)) || [];
}
function saveGallery(gallery) {
  localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
}
function addGalleryItem(item) {
  const gallery = getGallery();
  item.id = "gal-" + Date.now();
  gallery.push(item);
  saveGallery(gallery);
  return item;
}
function deleteGalleryItem(id) {
  let gallery = getGallery();
  gallery = gallery.filter(item => item.id !== id);
  saveGallery(gallery);
}

// --- SETTINGS ---
function getSettings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || DEFAULT_SETTINGS;
}
function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// --- USERS & AUTH ---
function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
}
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}
function registerUser(user) {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) {
    return { success: false, message: "Email is already registered!" };
  }

  // Pre-fill profile fields if empty
  user.role = user.role || "customer";
  user.dob = user.dob || "";
  user.address = user.address || "";
  user.avatar = user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
  
  users.push(user);
  saveUsers(users);

  // Add to Customers table as well
  addCustomer({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    dob: user.dob,
    status: "active"
  });

  return { success: true, user };
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.LOGGED_USER, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Invalid email or password." };
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGGED_USER)) || null;
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.LOGGED_USER);
}

function updateUserProfile(email, updatedData) {
  const users = getUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    saveUsers(users);

    // Sync logged-in session if it's the current user
    const current = getLoggedInUser();
    if (current && current.email.toLowerCase() === email.toLowerCase()) {
      localStorage.setItem(STORAGE_KEYS.LOGGED_USER, JSON.stringify(users[index]));
    }

    // Sync in customers list as well
    const customers = getCustomers();
    const custIdx = customers.findIndex(c => c.email.toLowerCase() === email.toLowerCase());
    if (custIdx !== -1) {
      customers[custIdx] = { ...customers[custIdx], name: users[index].name, phone: users[index].phone, address: users[index].address, dob: users[index].dob };
      saveCustomers(customers);
    }
    return users[index];
  }
  return null;
}

// Bind to window if browser
if (typeof window !== 'undefined') {
  window.getServices = getServices;
  window.addService = addService;
  window.updateService = updateService;
  window.deleteService = deleteService;
  window.getPackages = getPackages;
  window.addPackage = addPackage;
  window.updatePackage = updatePackage;
  window.deletePackage = deletePackage;
  window.getCustomers = getCustomers;
  window.addCustomer = addCustomer;
  window.updateCustomer = updateCustomer;
  window.deleteCustomer = deleteCustomer;
  window.getBookings = getBookings;
  window.addBooking = addBooking;
  window.updateBooking = updateBooking;
  window.cancelBooking = cancelBooking;
  window.getPayments = getPayments;
  window.addPayment = addPayment;
  window.getGallery = getGallery;
  window.addGalleryItem = addGalleryItem;
  window.deleteGalleryItem = deleteGalleryItem;
  window.getSettings = getSettings;
  window.saveSettings = saveSettings;
  window.registerUser = registerUser;
  window.loginUser = loginUser;
  window.getLoggedInUser = getLoggedInUser;
  window.logoutUser = logoutUser;
  window.updateUserProfile = updateUserProfile;
}
