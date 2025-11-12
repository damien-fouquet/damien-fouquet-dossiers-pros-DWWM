import instance from "./config";

async function getAllUsers(data) {
    return await instance.get("/users", data)
}

export { getAllUsers };