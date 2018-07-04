import axios from "axios";

const BASEURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.REACT_APP_NYT_API_KEY}&q=`;

export default {
    search: (query) => axios.get(BASEURL + query)
};
