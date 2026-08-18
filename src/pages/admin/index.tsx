import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  return <div>{t("admin.title")}</div>;
};

export default Admin;
