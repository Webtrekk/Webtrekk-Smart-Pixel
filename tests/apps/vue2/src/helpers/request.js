export const post = (path, data) => {
    return fetch("https://" + location.hostname + ":4001/" + path, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(r => r.json());
};

export const get = path => {
    return fetch("https://" + location.hostname + ":4001/" + path, {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => {
        return r.json();
    });
};
