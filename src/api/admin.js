import apiClient from "./apiClient";

export const saveMember = async (data) => {
    try {
        const response = await apiClient.post("/admin/add_member", {
            full_name: data.full_name,
            age: data.age,
            gender: data.gender,
            phone_number: data.phone_number,
            email_address: data.email_address,
            password: data.password,
            is_admin: data.is_admin,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const savePsychologist = async (data) => {
    try {
        const response = await apiClient.post("/admin/add_psychologist", {
            full_name: data.full_name,
            phone_number: data.phone_number,
            email_address: data.email_address,
            password: data.password,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const saveAnnouncement = async (data) => {
    try {
        const response = await apiClient.post("/admin/add_announcement", {
            header: data.header,
            content: data.content,
            date: data.date,
            file: data.file,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};
