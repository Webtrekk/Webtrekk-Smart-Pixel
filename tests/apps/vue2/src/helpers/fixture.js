export const getFixtureData = async (url = "") => {
    return fetch(`http://phoenix:4000/api/fixture/${url}`).then(r => {
        return r.json();
    });
};
