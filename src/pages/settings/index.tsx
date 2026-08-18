import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  return <div>{t("settings.title")}</div>;
};

export default Settings;
