import axios from "axios";
import {  BASE_URL } from "../config";

// Fetch all notifications history
export const getHistory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification history:", error);
    throw error.response?.data || { message: "Error fetching notification history" };
  }
};

// Fetch the total number of notifications
export const getTotalNotifications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/total`);
    return response.data.total;
  } catch (error) {
    console.error("Error fetching total notifications:", error);
    throw error.response?.data || { message: "Error fetching total notifications" };
  }
};
