import instance from "./config";

async function registerBeneficiary(data) {
    return await instance.post("/beneficiaries/register", data)
}

export { registerBeneficiary}