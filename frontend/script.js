console.log("this is from backend")

let backendData = fetch("http://localhost:3000/todos/")

backendData.then((response) => {
    return response.json()
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
}).finally(() => {
    console.log("This is finally block")
});