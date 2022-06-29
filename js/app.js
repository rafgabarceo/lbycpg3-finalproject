// Routine to get the API key. This is found on the root directory in apikey.json. Contact admin for dev key.
const checkAPIKey = async () => {
    let apikeyResponse = await fetch("../apikey.json").then(response => {return response.json()});
    return apikeyResponse;
}

const getAPIKey = async() => {
    let data = await checkAPIKey();
    console.log(data);
}

