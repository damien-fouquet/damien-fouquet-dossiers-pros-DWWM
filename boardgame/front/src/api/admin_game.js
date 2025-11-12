import instance from "./config";
import axios from "axios"

async function registerGames(data) {
    return await instance.post("/games/register", data)
}

async function updateGames(data) {
    return await instance.put("/games/update", data)
}

async function getGames(gameId) {
    try {
        const url = "http://localhost:3000/api/games/get-data/" + gameId;
        console.log(url)
        const response = await axios.get(url)
        console.log("response", response.data.data)
        localStorage.setItem("name", response.data.data.name)
        localStorage.setItem("editor", response.data.data.editor)
        localStorage.setItem("description", response.data.data.description)
        localStorage.setItem("technical_sheet", response.data.data.technical_sheet)
        localStorage.setItem("rules_video_link", response.data.data.rules_video_link)
        localStorage.setItem("rules_description", response.data.data.rules_description)
        return response.data.data
    } catch (error) {
        return error
    }
}

export { registerGames, updateGames, getGames }