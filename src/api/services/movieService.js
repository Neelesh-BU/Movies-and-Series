import api from "../index";
import { ENDPOINTS } from "../endpoints";
import { handleApiError } from "../handleError";

export const getMovies = async () => {
  try {
    const response = await api.get(ENDPOINTS.MOVIES.LIST);
    return {
      success: true,
      data: response.data,  
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const response = await api.get(ENDPOINTS.MOVIES.TRENDING);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};