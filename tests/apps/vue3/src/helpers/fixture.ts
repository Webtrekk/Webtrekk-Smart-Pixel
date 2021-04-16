export const getFixtureData = async (url = '', callback) => {
    fetch(`http://localhost:4000/api/fixture/${url}`)
        .then( (r) => {
            return r.json();
        })
        .then(data => {callback(data)});
}