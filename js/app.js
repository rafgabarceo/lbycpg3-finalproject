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
    } else if(query == "COMING_SOON"){
        let moviedb_recent_response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${_apikey}&language=en-US&page=1`).then(response => response.json());
        return moviedb_recent_response; 
    }
}

let searchMovie = async(id, callback) => {
    let _apikey = await getAPIKey();
    _apikey =  _apikey["api-key"];
    let moviedb_find_response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${_apikey}`).then(response => response.json());
    return moviedb_find_response;
}

let checkCategory = async(query, callback) => {
    
}

let getUpcomingMovies = async(query, callback) => {
    let data = await checkSearch("COMING_SOON").then(
        data => {
            for(let i = 0; i < data.results.length; i++){
                if(data.results[i].adult == true){
                    data.results.splice(i, i+1);
                }
            }
        }
    );
    return data; 
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
    let latestId = data.id;
    let randomIDarr = [];
    for(let i = 0; i < 20; i++){
        randomIDarr[i] = Math.floor(Math.random() * latestId);
    }

    let dataContainer = [];
    for(let i = 0; i < 20; i++){
        dataContainer[i] = await searchMovie(randomIDarr[i]);
        if(dataContainer[i].adult == false)
        {
            break;
        }
    }
    return data;
}

let manipulateMovieOfTheDay = async(query, callback) => {

}

let manipulateLatestMovies = async(query, callback) => {

}

let manipulateComingSoon = async(query, callback) => {

}
