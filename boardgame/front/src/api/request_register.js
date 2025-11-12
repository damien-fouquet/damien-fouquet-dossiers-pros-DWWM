import instance from "./config";

async function requestRegisterUser(data) {
    return await instance.post("/users/register", data)
}

export { requestRegisterUser}