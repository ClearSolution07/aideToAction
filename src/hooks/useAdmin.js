import { useState } from "react";
import { saveMember, savePsychologist, saveAnnouncement, getUnverifiedUsers, verifyUser, deleteUser } from "../api/admin";

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
            throw err;
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
            throw err;
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
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPendingUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUnverifiedUsers();
            if (!response || !response.data || !response.data.users) {
                throw new Error('Invalid response format from server');
            }
            return response.data.users;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const approveUser = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await verifyUser(userId);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const rejectUser = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await deleteUser(userId);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
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
        getPendingUsers,
        approveUser,
        rejectUser,
    };
};

export default useAdmin;
