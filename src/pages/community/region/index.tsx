import { useParams } from "react-router-dom";

const RegionalFeed = () => {
  const { regionSlug } = useParams();
  return <div>RegionalFeed: {regionSlug}</div>;
};

export default RegionalFeed;
