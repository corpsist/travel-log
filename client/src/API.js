const API_URL = 'http://localhost:1337';


export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}


export async function createLogEntry(entry) {
    const apiKey = entry.apiKey; 
    //then delete the apiKey, so that validation doesn't fail since if its present in the body of the response it will be an extra key
    delete entry.apiKey; // we want the api key only in the header of the request not in the body.
    const response = await fetch(`${API_URL}/api/logs`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            //adding the password/apikey in the headers of the request response
            'X-API-KEY': apiKey
        },
        body: JSON.stringify(entry)
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    }
    const error = new Error(json.message);
    error.response = json
    throw error;
}

