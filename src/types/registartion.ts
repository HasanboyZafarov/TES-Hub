export default interface Registration {
  id: string;
  userId: string;
  sessionId: string;
  registeredAt: string;
  paymentStatus: "free" | "paid" | "pending" | "refunded";
  paymentId?: string;
  checkInStatus: "not_checked_in" | "checked_in" | "no_show";
  checkInAt?: string;
}
