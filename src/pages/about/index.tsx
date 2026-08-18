import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return <div>{t("about.title")}</div>;
};

export default About;
