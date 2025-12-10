
export const PAYMENT_PACKAGES = {
  p1: { title: "Daily 2GB", duration: "1 day", price: 50, quota: "Data-Based" },
  p2: {
    title: "Hourly 200MB",
    duration: "1 hour",
    price: 10,
    quota: "Data-Based",
  },
  p3: {
    title: "Weekly 10GB",
    duration: "7 days",
    price: 400,
    quota: "Data-Based",
  },
  p4: {
    title: "Monthly 20GB",
    duration: "30 days",
    price: 800,
    quota: "Data-Based",
  },
};

export const PAYMENT_OPTIONS = [
  { id: "mpesa", label: "M-Pesa", icon: "/icons/mpesa.png" },
  { id: "visa", label: "VISA", icon: "/icons/visa.png" },
  { id: "voucher", label: "Voucher", icon: "/icons/voucher.png" },
];
