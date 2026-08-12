import { Lock } from "lucide-react";

import LegalLayout from "../legal/LegalLayout";
import {
  Callout,
  List,
  Paragraph,
  Section,
  SubHeading,
} from "../legal/LegalSection";

const Privacy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="This policy explains what information the TES Knowledge Hub collects, how we use it, and the choices you have over your data."
      lastUpdated="October 24, 2024"
      next={{ label: "Terms of Service", to: "/terms-of-service" }}
    >
      <Section index={1} title="Information We Collect">
        <Paragraph>
          We collect information that you provide directly to us, as well as
          data generated automatically as you use the TES Knowledge Hub (the
          "Service"). This includes:
        </Paragraph>
        <List
          items={[
            "Account details such as your name, email address, region, and farming interests.",
            "Verification materials you submit when applying for a Verified Farmer or expert badge.",
            "Content you publish, including articles, stories, questions, answers, and photos.",
            "Learning activity such as course enrollments, module completion, and quiz results.",
            "Technical data such as device type, browser, and approximate location derived from your IP address.",
          ]}
        />
      </Section>

      <Section index={2} title="How We Use Your Information">
        <Paragraph>
          We use the information we collect to operate and improve the Service.
          Specifically, we use it to:
        </Paragraph>
        <List
          items={[
            "Create and secure your account and authenticate your sessions.",
            "Deliver educational content and recommend materials relevant to your region and crops.",
            "Connect you with certified agricultural experts and community members.",
            "Track your educational progress and issue certificates upon completion.",
            "Send service announcements, session reminders, and — where you have opted in — newsletters.",
            "Detect, investigate, and prevent fraudulent or abusive activity.",
          ]}
        />
      </Section>

      <Section index={3} title="Data Sharing & Disclosure">
        <Callout icon={Lock} title="We Never Sell Your Data">
          The TES Knowledge Hub does not sell, rent, or trade your personal
          information to advertisers or data brokers. We share data only with
          service providers who process it on our behalf, with experts you
          explicitly choose to consult, or where disclosure is required by
          applicable law.
        </Callout>
        <Paragraph>
          Content you post publicly — including community stories, questions,
          answers, and profile badges — is visible to other users and may appear
          in search engines. Please consider carefully what you share in public
          areas of the Service.
        </Paragraph>
      </Section>

      <Section index={4} title="Cookies & Tracking">
        <Paragraph>
          We use cookies and similar technologies to keep you signed in,
          remember your preferences, and understand how the Service is used.
          Essential cookies are required for the platform to function; analytics
          cookies are optional and can be disabled through your browser
          settings. Disabling essential cookies may prevent parts of the Service
          from working correctly.
        </Paragraph>
      </Section>

      <Section index={5} title="Data Security & Retention">
        <Paragraph>
          We apply technical and organisational safeguards — including encrypted
          transport, hashed passwords, and restricted internal access — to
          protect your information. No method of transmission or storage is
          completely secure, so we cannot guarantee absolute security.
        </Paragraph>
        <Paragraph>
          We retain your personal information for as long as your account is
          active, and afterwards only as long as needed to meet legal,
          accounting, or reporting obligations. Published community content may
          remain visible in anonymised form after account deletion.
        </Paragraph>
      </Section>

      <Section index={6} title="Your Rights & Choices">
        <Paragraph>
          Depending on your jurisdiction, you may have the right to access,
          correct, export, or delete the personal information we hold about you,
          and to object to or restrict certain processing.
        </Paragraph>
        <SubHeading>Exercising your rights</SubHeading>
        <Paragraph>
          You can update most details directly from your account settings. For
          any request we cannot fulfil in the app — such as a full data export
          or account deletion — contact our support team and we will respond
          within 30 days.
        </Paragraph>
      </Section>

      <Section index={7} title="Children's Privacy">
        <Paragraph>
          The Service is not directed to individuals under the age of 16. We do
          not knowingly collect personal information from children. If you
          believe a child has provided us with personal information, please
          contact us and we will delete it promptly.
        </Paragraph>
      </Section>

      <Section index={8} title="Changes to This Policy">
        <Paragraph>
          We may update this Privacy Policy from time to time. When we make
          material changes, we will revise the "Last Updated" date above and,
          where appropriate, notify you through the Service or by email.
          Continued use of the Service after an update constitutes acceptance of
          the revised policy.
        </Paragraph>
      </Section>
    </LegalLayout>
  );
};

export default Privacy;
