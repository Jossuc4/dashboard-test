import axios from "axios";

const API_URL = "https://www.association-fanambina.site/api/login";

export const loginUser = async (user, pwd) => {
  try {
    const response = await axios.post(API_URL, { user, pwd });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erreur de connexion";
  }
};
