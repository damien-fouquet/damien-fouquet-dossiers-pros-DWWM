import axios from "axios"

async function getUser(userId) {
    try {
        const url = "http://localhost:3000/api/users/get-data/" + userId;
        console.log(url)
        const response = await axios.get(url)
        console.log("response", response.data.data)
        localStorage.setItem("user_firstname", response.data.data.firstname)
        localStorage.setItem("user_lastname", response.data.data.lastname)
        localStorage.setItem("user_address", response.data.data.address)
        localStorage.setItem("user_postcode", response.data.data.postcode)
        localStorage.setItem("user_town", response.data.data.town)
        localStorage.setItem("user_phone", response.data.data.phone)
        localStorage.setItem("user_email", response.data.data.email)
        localStorage.setItem("user_password", response.data.data.password)
        return response.data.data
    } catch (error) {
        return error
    }
}

async function getOrganisms(organismId) {
    try {
        const url = "http://localhost:3000/api/organisms/get-data/" + organismId;
        console.log(url)
        const response = await axios.get(url)
        console.log("response", response.data.data)
        localStorage.setItem("name", response.data.data.name)
        localStorage.setItem("address", response.data.data.address)
        localStorage.setItem("postcode", response.data.data.postcode)
        localStorage.setItem("town", response.data.data.town)
        localStorage.setItem("phone", response.data.data.phone)
        localStorage.setItem("email", response.data.data.email)
        localStorage.setItem("siret", response.data.data.siret)
        localStorage.setItem("description", response.data.data.description)
        localStorage.setItem("website", response.data.data.website)
        localStorage.setItem("maxMeal", response.data.data.max_meal)
        return response.data.data
    } catch (error) {
        return error
    }
}

export { getUser, getOrganisms }