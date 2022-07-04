const checkAPIKey = async () => {
    let apikeyResponse = await fetch("../apikey.json").then(response => response.json());
    return apikeyResponse;
}

const getAPIKey = async(manipulate) => {
    let data = await checkAPIKey();
    return data;
}

let checkSearch = async(query,callback) => {
    // Fetch the API key
    let _apikey = await getAPIKey();
    _apikey = _apikey["api-key"];
    if(query == "RECENT_MOVIES"){
        let moviedb_recent_response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${_apikey}`).then(response => response.json());
        return moviedb_recent_response;
    } else if(query == "RANDOM_MOVIE"){
        let moviedb_recent_response = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${_apikey}`).then(response => response.json());
        return moviedb_recent_response;
    } else if(query == "UPCOMING_MOVIES"){
        let moviedb_recent_response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${_apikey}`).then(response => response.json());
        return moviedb_recent_response;
    }
}

let checkCategory = async(query, callback) => {
    
}

let getRecentMovies = async() => {
    let data = await checkSearch("RECENT_MOVIES"); 
    return data;    
}

let getCategory = async () => {
    


}

let getRandomMovie = async() => {
    let data = await checkSearch("RANDOM_MOVIE")
        .then(response => {return response});
    return data;
}

let manipulatePosters = async () => {
    let data = await getRecentMovies(); // Return a promise. Because we attached await, will attach value.
    let pos1 = document.getElementById("pos1");
    console.log(data);
    let imageData = data.results[0].poster_path;
    let posterPath = `https://image.tmdb.org/t/p/w185${imageData}`;
    pos1.src = posterPath;

}

manipulatePosters();