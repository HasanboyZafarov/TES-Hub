import { useParams } from "react-router-dom";

const ArticlesCRUD = () => {
  const { slug } = useParams();
  return (
    <div>
      {slug === "new" ? (
        <div>Adding new article</div>
      ) : (
        <div>Editing article</div>
      )}
    </div>
  );
};

export default ArticlesCRUD;
