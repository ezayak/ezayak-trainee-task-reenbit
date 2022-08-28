const getJoke = () => fetch('https://api.chucknorris.io/jokes/random', {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
        return data;
    });

export {getJoke};