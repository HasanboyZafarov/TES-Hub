import { useParams } from "react-router-dom";

const CourseCertificate = () => {
  const { slug } = useParams();
  return <div>CourseCertificate: {slug}</div>;
};

export default CourseCertificate;
