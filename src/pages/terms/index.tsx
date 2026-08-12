import { ShieldAlert } from "lucide-react";

import ProfileBadge from "@/components/ui/profileBadge";
import LegalLayout from "../legal/LegalLayout";
import {
  Callout,
  List,
  Paragraph,
  Section,
  SubHeading,
} from "../legal/LegalSection";

const Terms = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      description="Please read these terms carefully before using the TES Knowledge Hub. They govern your access and use of our platform and resources."
      lastUpdated="October 24, 2024"
      next={{ label: "Privacy Policy", to: "/privacy-policy" }}
    >
      <Section index={1} title="Acceptance of Terms">
        <Paragraph>
          By accessing and using the TES Knowledge Hub (the "Service"), you
          agree to be bound by these Terms of Service ("Terms"). If you disagree
          with any part of the terms, you may not access the Service. These
          terms apply to all visitors, users, and others who access the Service,
          including verified farmers and agricultural experts.
        </Paragraph>
      </Section>

      <Section index={2} title="Description of Service">
        <Paragraph>
          The TES Knowledge Hub provides an educational platform designed to
          bridge traditional agricultural practices with modern scientific
          methodologies. The Service includes, but is not limited to:
        </Paragraph>
        <List
          items={[
            "Access to agricultural research, articles, and training materials.",
            "Community forums for peer-to-peer knowledge sharing among farmers.",
            "Direct consultation channels with certified agricultural experts.",
            "Tracking tools for educational progress and module completion.",
          ]}
        />
        <Paragraph>
          We reserve the right to modify, suspend, or discontinue any part of
          the Service at any time without prior notice.
        </Paragraph>
      </Section>

      <Section index={3} title="User Accounts & Responsibilities">
        <Callout icon={ShieldAlert} title="Account Security">
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password. You agree not to disclose your password to any third party.
          You must notify us immediately upon becoming aware of any breach of
          security or unauthorized use of your account.
        </Callout>
        <Paragraph>
          When you create an account with us, you must provide information that
          is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our Service.
        </Paragraph>
        <SubHeading>Community Badges</SubHeading>
        <div className="flex flex-wrap items-center gap-2 text-[#414844] text-sm leading-6">
          <span>Roles such as</span>
          <ProfileBadge role="verified_farmer" />
          <span>or</span>
          <ProfileBadge role="tes_author" />
          <span>
            are assigned based on verification processes. Falsifying
            qualifications to obtain these badges is strictly prohibited.
          </span>
        </div>
      </Section>

      <Section index={4} title="Intellectual Property">
        <Paragraph>
          The Service and its original content (excluding Content provided by
          users), features, and functionality are and will remain the exclusive
          property of TES Knowledge Hub and its licensors. The Service is
          protected by copyright, trademark, and other laws of both the Kyrgyz
          Republic and foreign countries. Our trademarks and trade dress may not
          be used in connection with any product or service without the prior
          written consent of TES Knowledge Hub.
        </Paragraph>
      </Section>

      <Section index={5} title="User-Generated Content">
        <Paragraph>
          Our Service allows you to post, link, store, share, and otherwise make
          available certain information, text, graphics, videos, or other
          material ("Content"). You are responsible for the Content that you
          post to the Service, including its legality, reliability, and
          appropriateness.
        </Paragraph>
        <Paragraph>
          By posting Content to the Service, you grant us the right and license
          to use, modify, publicly perform, publicly display, reproduce, and
          distribute such Content on and through the Service. You retain any and
          all of your rights to any Content you submit, post, or display on or
          through the Service.
        </Paragraph>
      </Section>
    </LegalLayout>
  );
};

export default Terms;
