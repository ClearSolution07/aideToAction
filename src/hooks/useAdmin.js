import { useState } from "react";
import { saveMember, savePsychologist, saveAnnouncement } from "../api";

const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add a new member
  const addMember = async (memberData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await saveMember(memberData);
      return response; // Return the successful response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new psychologist
  const addPsychologist = async (psychologistData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await savePsychologist(psychologistData);
      return response; // Return the successful response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new announcement
  const addAnnouncement = async (announcementData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await saveAnnouncement(announcementData);
      return response; // Return the successful response
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
