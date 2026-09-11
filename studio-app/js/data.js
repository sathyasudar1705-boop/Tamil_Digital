// js/data.js
// Default Mock Data for Studio Management & Booking Web Application

const INITIAL_SERVICES = [
  {
    id: "srv-portrait",
    name: "Portrait Photography",
    description: "Professional headshots, modeling portfolios, and personal portrait sessions with specialized studio lighting.",
    price: 1500,
    duration: "1 Hour",
    icon: "camera",
    image: "../assets/portrait.jpg",
    status: "active"
  },
  {
    id: "srv-wedding",
    name: "Wedding Photography",
    description: "Complete wedding coverage capturing your special moments from pre-ceremony prep to reception celebration.",
    price: 25000,
    duration: "8 Hours",
    icon: "heart",
    image: "../assets/wedding.jpg",
    status: "active"
  },
  {
    id: "srv-product",
    name: "Product Photography",
    description: "High-quality, clean, commercial product images optimized for e-commerce, websites, and advertising.",
    price: 3000,
    duration: "2 Hours",
    icon: "package",
    image: "../assets/product.jpg",
    status: "active"
  },
  {
    id: "srv-prewedding",
    name: "Pre-Wedding Shoot",
    description: "Romantic, cinematic pre-wedding photography at stunning outdoor locations with custom styling support.",
    price: 12000,
    duration: "4 Hours",
    icon: "images",
    image: "../assets/prewedding.jpg",
    status: "active"
  },
  {
    id: "srv-baby",
    name: "Baby Photography",
    description: "Adorable newborn and toddler shoots with creative, safe props in a temperature-controlled studio environment.",
    price: 5000,
    duration: "1.5 Hours",
    icon: "smile",
    image: "../assets/baby.jpg",
    status: "active"
  },
  {
    id: "srv-event",
    name: "Event Photography",
    description: "Professional coverage of birthday parties, corporate seminars, anniversaries, and live stage events.",
    price: 8000,
    duration: "3 Hours",
    icon: "calendar",
    image: "../assets/event.jpg",
    status: "active"
  },
  {
    id: "srv-video",
    name: "Video Shooting",
    description: "High-definition videography, cinematic reels, promotional videos, and full-length event recording.",
    price: 15000,
    duration: "4 Hours",
    icon: "video",
    image: "../assets/video.jpg",
    status: "active"
  },
  {
    id: "srv-editing",
    name: "Photo Editing",
    description: "Premium retouching, color correction, skin smoothing, background removal, and digital enhancements.",
    price: 500,
    duration: "Per Photo",
    icon: "sliders",
    image: "../assets/editing.jpg",
    status: "active"
  }
];

const INITIAL_PACKAGES = [
  {
    id: "pkg-basic",
    name: "Basic",
    price: 999,
    duration: "45 Minutes Session",
    inclusions: [
      "1 Professional Photographer",
      "5 Retouched Soft Copies",
      "Standard Backdrop Setup",
      "Online Gallery Delivery"
    ],
    isPopular: false,
    status: "active"
  },
  {
    id: "pkg-premium",
    name: "Premium",
    price: 2499,
    duration: "2 Hours Session",
    inclusions: [
      "1 Professional Photographer",
      "15 Retouched Soft Copies",
      "All Raw Images Delivered",
      "Multiple Backdrop Changes",
      "Online Gallery Delivery"
    ],
    isPopular: true,
    status: "active"
  },
  {
    id: "pkg-professional",
    name: "Professional",
    price: 4999,
    duration: "4 Hours Session",
    inclusions: [
      "2 Professional Photographers",
      "35 Retouched Soft Copies",
      "All Raw Images Delivered",
      "Outdoor & Indoor Setups",
      "A4 Size Photo Print Album",
      "Online Gallery Delivery"
    ],
    isPopular: false,
    status: "active"
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "9876543210",
    address: "123 Anna Salai, Chennai, TN",
    dob: "1994-05-15",
    totalBookings: 3,
    totalSpent: 8500,
    lastBooking: "2026-08-10",
    status: "active"
  },
  {
    id: "cust-2",
    name: "Priya Sundar",
    email: "priya.sundar@example.com",
    phone: "9876543211",
    address: "456 Indiranagar, Bangalore, KA",
    dob: "1997-09-22",
    totalBookings: 2,
    totalSpent: 27500,
    lastBooking: "2026-08-15",
    status: "active"
  },
  {
    id: "cust-3",
    name: "Karthik Rajan",
    email: "karthik.rajan@example.com",
    phone: "9876543212",
    address: "789 T-Nagar, Chennai, TN",
    dob: "1991-12-05",
    totalBookings: 1,
    totalSpent: 4999,
    lastBooking: "2026-08-25",
    status: "active"
  },
  {
    id: "cust-4",
    name: "Divya Sharma",
    email: "divya.sharma@example.com",
    phone: "9876543213",
    address: "101 Jubilee Hills, Hyderabad, TS",
    dob: "1995-03-30",
    totalBookings: 4,
    totalSpent: 18500,
    lastBooking: "2026-08-20",
    status: "active"
  },
  {
    id: "cust-5",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "9876543214",
    address: "202 MG Road, Pune, MH",
    dob: "1989-07-18",
    totalBookings: 2,
    totalSpent: 15999,
    lastBooking: "2026-08-26",
    status: "active"
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "bk-1001",
    customerId: "cust-1",
    customerName: "Arun Kumar",
    customerEmail: "arun.kumar@example.com",
    customerPhone: "9876543210",
    serviceId: "srv-portrait",
    serviceName: "Portrait Photography",
    packageId: "pkg-basic",
    packageName: "Basic",
    date: "2026-09-02",
    time: "10:00",
    peopleCount: 1,
    requirements: "Need custom light setup. Prefer white background headshot.",
    amount: 1500 + 999,
    status: "Confirmed", // Confirmed, Pending, Completed, Cancelled
    createdAt: "2026-08-20"
  },
  {
    id: "bk-1002",
    customerId: "cust-2",
    customerName: "Priya Sundar",
    customerEmail: "priya.sundar@example.com",
    customerPhone: "9876543211",
    serviceId: "srv-wedding",
    serviceName: "Wedding Photography",
    packageId: "pkg-professional",
    packageName: "Professional",
    date: "2026-10-15",
    time: "07:00",
    peopleCount: 150,
    requirements: "Require both indoor photography and drone video coverage.",
    amount: 25000 + 4999,
    status: "Pending",
    createdAt: "2026-08-22"
  },
  {
    id: "bk-1003",
    customerId: "cust-3",
    customerName: "Karthik Rajan",
    customerEmail: "karthik.rajan@example.com",
    customerPhone: "9876543212",
    serviceId: "srv-product",
    serviceName: "Product Photography",
    packageId: "pkg-premium",
    packageName: "Premium",
    date: "2026-08-30",
    time: "14:00",
    peopleCount: 1,
    requirements: "Shoot 10 beauty products on reflection glass.",
    amount: 3000 + 2499,
    status: "Confirmed",
    createdAt: "2026-08-25"
  },
  {
    id: "bk-1004",
    customerId: "cust-4",
    customerName: "Divya Sharma",
    customerEmail: "divya.sharma@example.com",
    customerPhone: "9876543213",
    serviceId: "srv-baby",
    serviceName: "Baby Photography",
    packageId: "pkg-premium",
    packageName: "Premium",
    date: "2026-08-12",
    time: "11:00",
    peopleCount: 3,
    requirements: "Props like basket, wings, and tiny bed are required.",
    amount: 5000 + 2499,
    status: "Completed",
    createdAt: "2026-08-01"
  },
  {
    id: "bk-1005",
    customerId: "cust-5",
    customerName: "Rahul Verma",
    customerEmail: "rahul.verma@example.com",
    customerPhone: "9876543214",
    serviceId: "srv-prewedding",
    serviceName: "Pre-Wedding Shoot",
    packageId: "pkg-premium",
    packageName: "Premium",
    date: "2026-07-20",
    time: "06:00",
    peopleCount: 2,
    requirements: "Sunrise location shoot at Beach Side.",
    amount: 12000 + 2499,
    status: "Completed",
    createdAt: "2026-07-10"
  },
  {
    id: "bk-1006",
    customerId: "cust-1",
    customerName: "Arun Kumar",
    customerEmail: "arun.kumar@example.com",
    customerPhone: "9876543210",
    serviceId: "srv-editing",
    serviceName: "Photo Editing",
    packageId: "pkg-basic",
    packageName: "Basic",
    date: "2026-08-05",
    time: "16:00",
    peopleCount: 1,
    requirements: "Retouch 5 family portrait images.",
    amount: 500 + 999,
    status: "Completed",
    createdAt: "2026-08-01"
  },
  {
    id: "bk-1007",
    customerId: "cust-1",
    customerName: "Arun Kumar",
    customerEmail: "arun.kumar@example.com",
    customerPhone: "9876543210",
    serviceId: "srv-event",
    serviceName: "Event Photography",
    packageId: "pkg-premium",
    packageName: "Premium",
    date: "2026-08-28",
    time: "18:00",
    peopleCount: 50,
    requirements: "Corporate office party coverage.",
    amount: 8000 + 2499,
    status: "Cancelled",
    createdAt: "2026-08-24"
  }
];

const INITIAL_PAYMENTS = [
  {
    id: "pay-101",
    bookingId: "bk-1001",
    customerName: "Arun Kumar",
    amount: 2499,
    date: "2026-08-20",
    method: "Credit Card",
    status: "Paid"
  },
  {
    id: "pay-102",
    bookingId: "bk-1002",
    customerName: "Priya Sundar",
    amount: 29999,
    date: "2026-08-22",
    method: "Net Banking",
    status: "Pending"
  },
  {
    id: "pay-103",
    bookingId: "bk-1003",
    customerName: "Karthik Rajan",
    amount: 5499,
    date: "2026-08-25",
    method: "UPI",
    status: "Paid"
  },
  {
    id: "pay-104",
    bookingId: "bk-1004",
    customerName: "Divya Sharma",
    amount: 7499,
    date: "2026-08-01",
    method: "Debit Card",
    status: "Paid"
  },
  {
    id: "pay-105",
    bookingId: "bk-1005",
    customerName: "Rahul Verma",
    amount: 14499,
    date: "2026-07-10",
    method: "UPI",
    status: "Paid"
  },
  {
    id: "pay-106",
    bookingId: "bk-1006",
    customerName: "Arun Kumar",
    amount: 1499,
    date: "2026-08-01",
    method: "UPI",
    status: "Paid"
  },
  {
    id: "pay-107",
    bookingId: "bk-1007",
    customerName: "Arun Kumar",
    amount: 10499,
    date: "2026-08-24",
    method: "Credit Card",
    status: "Refunded"
  }
];

const INITIAL_GALLERY = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    title: "Classic Studio Portrait",
    category: "portrait"
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    title: "Professional Corporate Headshot",
    category: "portrait"
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    title: "Summer Outdoor Wedding",
    category: "wedding"
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    title: "Bridesmaids Pre-Ceremony",
    category: "wedding"
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    title: "Lakeside Couple Shoot",
    category: "pre-wedding"
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    title: "Forest Pre-Wedding Walks",
    category: "pre-wedding"
  },
  {
    id: "gal-7",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    title: "E-Commerce Luxury Watch",
    category: "product"
  },
  {
    id: "gal-8",
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    title: "Product Advertising Design",
    category: "product"
  },
  {
    id: "gal-9",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "SaaS Launch Conference Event",
    category: "events"
  },
  {
    id: "gal-10",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    title: "Annual Dinner Celebration Gala",
    category: "events"
  }
];

const INITIAL_USERS = [
  {
    name: "Arun Kumar",
    email: "customer@gmail.com",
    phone: "9876543210",
    password: "customer123",
    role: "customer",
    address: "123 Anna Salai, Chennai, TN",
    dob: "1994-05-15",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Admin Moderator",
    email: "admin@studio.com",
    phone: "9999999999",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

// Exports if loading as module, else set globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    INITIAL_SERVICES,
    INITIAL_PACKAGES,
    INITIAL_CUSTOMERS,
    INITIAL_BOOKINGS,
    INITIAL_PAYMENTS,
    INITIAL_GALLERY,
    INITIAL_USERS
  };
} else {
  window.INITIAL_SERVICES = INITIAL_SERVICES;
  window.INITIAL_PACKAGES = INITIAL_PACKAGES;
  window.INITIAL_CUSTOMERS = INITIAL_CUSTOMERS;
  window.INITIAL_BOOKINGS = INITIAL_BOOKINGS;
  window.INITIAL_PAYMENTS = INITIAL_PAYMENTS;
  window.INITIAL_GALLERY = INITIAL_GALLERY;
  window.INITIAL_USERS = INITIAL_USERS;
}
