function ArticleCard({ article }) {
  return (
    <div className="article-card">

      <div className="article-category">
        {article.category}
      </div>

      <h3>{article.title}</h3>

      <p>{article.description}</p>

      <div className="article-footer">
        <span>Read Article</span>
        <span className="arrow">→</span>
      </div>

    </div>
  );
}

export default ArticleCard;