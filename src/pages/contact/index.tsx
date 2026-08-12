import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

import Button from "../../components/ui/button";
import axiosInstance from "../../lib/api/apiClient";

const SUBJECTS = [
  "General question",
  "Account & access",
  "Farmer verification",
  "Content or course feedback",
  "Report a problem",
  "Partnership enquiry",
] as const;

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.email("Invalid email format."),
  subject: z.enum(SUBJECTS, "Please choose a subject."),
  message: z
    .string()
    .min(20, "Please give us at least 20 characters so we can help.")
    .max(2000, "Please keep your message under 2000 characters."),
});

type SchemaProps = z.infer<typeof ContactSchema>;

const DETAILS = [
  {
    icon: Mail,
    title: "Email us",
    lines: ["support@tesknowledgehub.org"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["+996 (312) 00-00-00"],
  },
  {
    icon: MapPin,
    title: "Visit us",
    lines: ["TES Knowledge Hub", "Bishkek, Kyrgyz Republic"],
  },
  {
    icon: Clock,
    title: "Support hours",
    lines: ["Mon–Fri, 9am–5pm (KGT)", "We reply within 2 business days."],
  },
];

const Contact = () => {
  const [serverError, setServerError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit: SubmitHandler<SchemaProps> = async (data) => {
    setServerError("");
    try {
      await axiosInstance.post("/contact", data);
      reset();
      setIsSent(true);
    } catch (err: any) {
      setServerError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const fieldStyles = (hasError: boolean) =>
    `placeholder:text-[#6B7280] p-3 py-2 outline-none border mt-1 bg-white rounded-sm ${
      hasError ? "border-red-500" : "border-[#6B7280]"
    }`;

  return (
    <div className="container mx-auto py-5 px-6 md:px-10">
      <header>
        <h1 className="text-[#012D1D] font-bold text-4xl md:text-5xl">
          Contact Us
        </h1>
        <p className="text-[#414844] text-lg mt-4 max-w-2xl">
          Questions about your account, a course, or farmer verification? Send
          us a message and our support team will get back to you.
        </p>
        <div className="h-px w-full bg-[#C1C8C2] mt-8"></div>
      </header>

      <div className="flex flex-col lg:flex-row mt-12 lg:mt-16 gap-6 items-start">
        <section className="w-full lg:w-[65%] p-6 md:p-10 border-2 border-[#C1C8C2] rounded-lg bg-white">
          {isSent ? (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={40} className="text-[#1B4332]" />
              <h2 className="text-[#012D1D] font-bold text-2xl mt-4">
                Message sent
              </h2>
              <p className="text-[#414844] text-sm leading-6 mt-3 max-w-md">
                Thank you for reaching out. A confirmation has been sent to your
                email address, and our team will reply within 2 business days.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => setIsSent(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-[#012D1D] font-bold text-2xl">
                Send us a message
              </h2>
              <p className="text-[#414844] text-sm leading-6 mt-2">
                All fields are required.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-5"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="name" className="text-[#414844]">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Aidai Karimova"
                      {...register("name")}
                      className={fieldStyles(!!errors.name)}
                    />
                    {errors.name && (
                      <span className="mt-2 text-red-500 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1">
                    <label htmlFor="email" className="text-[#414844]">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="farmer@example.com"
                      {...register("email")}
                      className={fieldStyles(!!errors.email)}
                    />
                    {errors.email && (
                      <span className="mt-2 text-red-500 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="subject" className="text-[#414844]">
                    Subject
                  </label>
                  <select
                    id="subject"
                    defaultValue=""
                    {...register("subject")}
                    className={fieldStyles(!!errors.subject)}
                  >
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <span className="mt-2 text-red-500 text-sm">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="text-[#414844]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={7}
                    placeholder="Tell us what you need help with…"
                    {...register("message")}
                    className={`${fieldStyles(!!errors.message)} resize-y`}
                  />
                  {errors.message && (
                    <span className="mt-2 text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {serverError && (
                  <p className="text-red-500 text-sm">{serverError}</p>
                )}

                <Button
                  type="submit"
                  variant="filled"
                  className="w-full md:w-auto md:self-start"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-[#414844] text-sm leading-6">
                  By sending this message you agree to our{" "}
                  <Link
                    to="/terms-of-service"
                    className="text-[#1F6D1A] font-semibold"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-[#1F6D1A] font-semibold"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </>
          )}
        </section>

        <aside className="w-full lg:w-[35%] flex flex-col gap-6">
          <div className="p-6 border-2 border-[#C1C8C2] rounded-lg bg-white">
            <h2 className="text-[#191C1B] text-sm font-semibold tracking-wide">
              CONTACT DETAILS
            </h2>

            <div className="flex flex-col gap-5 mt-5">
              {DETAILS.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-3">
                  <Icon size={20} className="text-[#1B4332] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[#012D1D] text-sm font-semibold">
                      {title}
                    </h3>
                    {lines.map((line) => (
                      <p key={line} className="text-[#414844] text-sm mt-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-2 border-[#C1C8C2] rounded-lg bg-white">
            <h2 className="text-[#191C1B] text-sm font-semibold tracking-wide">
              BEFORE YOU WRITE
            </h2>
            <p className="text-[#414844] text-sm leading-6 mt-3">
              Many questions are already answered in our learning materials and
              community forum — you may find a reply faster there.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <Link
                to="/community/questions"
                className="text-[#414844] text-sm py-2 px-3 rounded-sm font-semibold hover:bg-[#f8faf8] transition-colors"
              >
                Browse community questions
              </Link>
              <Link
                to="/academy"
                className="text-[#414844] text-sm py-2 px-3 rounded-sm font-semibold hover:bg-[#f8faf8] transition-colors"
              >
                Visit the Academy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-[#414844] text-sm py-2 px-3 rounded-sm font-semibold hover:bg-[#f8faf8] transition-colors"
              >
                Read the Terms of Service
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
