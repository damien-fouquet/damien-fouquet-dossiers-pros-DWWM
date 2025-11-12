import instance from "./config";

export async function signIn(data) {
    console.log("data : ", data)
    return await instance.post("/users/login", data.data)
}