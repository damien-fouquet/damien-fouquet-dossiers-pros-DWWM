import instance from "./config";
import axios from "axios"

async function updateGames(data) {
    return await instance.put("/games/update", data)
}

export { updateGames }