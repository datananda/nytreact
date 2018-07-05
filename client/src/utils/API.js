import axios from "axios";

export default {
    saveArticle: (articleData) => axios.post("/api/articles", articleData),
    getArticles: () => axios.get("/api/articles"),
    deleteArticle: (id) => axios.delete(`/api/articles/${id}`)
};
