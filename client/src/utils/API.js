import axios from "axios";

export default {
    saveArticle: (articleData) => axios.post("/api/articles", articleData)
};
