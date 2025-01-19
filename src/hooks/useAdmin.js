import { useState } from "react";
import { saveMember, savePsychologist, saveAnnouncement } from "../api";

const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addMember = async (memberData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await saveMember(memberData);
            return response;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addPsychologist = async (psychologistData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await savePsychologist(psychologistData);
            return response;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addAnnouncement = async (announcementData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await saveAnnouncement(announcementData);
            return response;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        addMember,
        addPsychologist,
        addAnnouncement,
    };
};

export default useAdmin;
