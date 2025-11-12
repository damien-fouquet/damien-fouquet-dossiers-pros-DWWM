import axios from "axios"

async function getUser(organismId) {
    try {
        const url = "http://localhost:3000/api/users/get-data/" + organismId;
        const response = await axios.get(url)
        localStorage.setItem("firstname", response.data.data.firstname)
        localStorage.setItem("lastname", response.data.data.lastname)
        localStorage.setItem("address", response.data.data.address)
        localStorage.setItem("email", response.data.data.email)
        return response.data.data
    } catch (error) {
        return error
    }
}

export { getUser }