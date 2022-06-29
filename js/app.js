// Routine to get the API key. This is found on the root directory in apikey.json. Contact admin for dev key.
const checkAPIKey = async () => {
    let apikeyResponse = await fetch("../apikey.json").then(response => {return response.json()});
    return apikeyResponse;
}

const getAPIKey = async() => {
    let data = await checkAPIKey();
    console.log(data);
}

/*

    QUERY will include the following:
    RECENT_MOVIES,
    MOVIES_CATEGORY,
    RANDOM_MOVIE


*/
let checkSearch = async(query,callback) => {
    if(query == "RECENT_MOVIES") {
        let dataResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b79cdfddd3330372199952736e8d2641&sort_by=popularity.desc`)
            .then(response => response.json())
            .then(data => {return data});
        return dataResponse;
    } else if(query == "RANDOM_MOVIE"){
        let dataResponse = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=b79cdfddd3330372199952736e8d2641`)
            .then(response => response.json())
            .then(data => {return data});
        return dataResponse;
    }
}

/**
 * 
 * @returns Promise
 * Because it is a promise, simply chain to get the data.
 * 
 */
let getRecentMovies = async () => {
    let data = await checkSearch("RECENT_MOVIES")
        .then(response => console.log(response.results));
    return data;
}

// TODO: get movies from category

/**
 * 
 * @returns Promise
 * Because it is a promise, simply chain to get the data.
 * 
 */
let getRandomMovie = async() => {
    let data = await checkSearch("RANDOM_MOVIE")
        .then(response => {return response});
    return data;
}