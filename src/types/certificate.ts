export default interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  verificationCode: string; // for QR
  pdfUrl: string;
}
