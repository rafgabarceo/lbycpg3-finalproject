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

let getUpcomingMovies = async(query, callback) => {
    let data = await checkSearch("COMING_SOON").then(
        data => {
            for(let i = 0; i < data.results.length; i++){
                if(data.results[i].adult == true){
                    data.results.splice(i, i+1);
                }
            }
            return data;
        }
    );
    return data; 
}

let getRecentMovies = async() => {
    let data = await checkSearch("RECENT_MOVIES"); 
    return data;    
}

let getCategory = async () => {
    
    // Hehe

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
        if(dataContainer[i].adult == true) // No adult films :)
        {
            dataContainer.splice(i, i+1);
            break;
        } else if(dataContainer[i].hasOwnProperty("success") ){
            dataContainer.splice(i, i+1)
        }
    }
    data = dataContainer;
    return data;
}

let manipulateMovieOfTheDay = async(callback) => {
    let movieDataArr = await getRandomMovie();
    let movieData = movieDataArr[0];
    let movieTitle = document.getElementById("pick_day_title");
    let description = document.getElementById("pick_day_desc");
    let poster = document.getElementById("pick_day_poster");
    let redirect = document.getElementById("pick_mdb_red");

    if(movieData.poster_path == null){
        poster.src = "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg";
    } else {
        poster.src = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
    }

    if(movieData.overview.length == 0){
        description.textContent = "There is no description provided.";
    } else {
        description.textContent = movieData.overview;
    }

    movieTitle.textContent = movieData.original_title;
    redirect.href = `https://www.themoviedb.org/movie/${movieData.id}`;
}

let manipulateLatestMovies = async(callback) => {
    let data = await getRecentMovies().then(result => {return result.results}).then(
        data => {
            for(let i = 0; i < 4; i++){
                let title = document.getElementById(`lat_${i}_title`);
                let poster = document.getElementById(`lat_${i}_post`);
                let description = document.getElementById(`lat_${i}_desc`);
                let redirect = document.getElementById(`lat_${i}_red`);
        
                if(data[i].poster_path == null){
                    poster.src = "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg";
                } else {
                    poster.src = `https://image.tmdb.org/t/p/w500/${data[i].poster_path}`;
                }
            
                if(data[i].overview.length == 0){
                    description.textContent = "There is no description provided.";
                } else {
                    description.textContent = data[i].overview;
                }
                redirect.href = `https://www.themoviedb.org/movie/${data[i].id}`;
                title.textContent = data[i].original_title;
            }
        }
    );
}

let manipulateComingSoon = async(callback) => {
    let data = await getUpcomingMovies().then(result => {return result.results});
    console.log(data);
    for(let i = 0; i < 4; i++){
        let title = document.getElementById(`com_${i}_title`);
        let poster = document.getElementById(`com_${i}_post`);
        let description = document.getElementById(`com_${i}_desc`);
        let redirect = document.getElementById(`com_${i}_red`);

        if(data[i].poster_path == null){
            poster.src = "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg";
        } else {
            poster.src = `https://image.tmdb.org/t/p/w500/${data[i].poster_path}`;
        }
    
        if(data[i].overview.length == 0){
            description.textContent = "There is no description provided.";
        } else {
            description.textContent = data[i].overview;
        }

        redirect.href = `https://www.themoviedb.org/movie/${data[i].id}`;
        title.textContent = data[i].original_title;
    }
}

manipulateMovieOfTheDay();
manipulateLatestMovies();
manipulateComingSoon();