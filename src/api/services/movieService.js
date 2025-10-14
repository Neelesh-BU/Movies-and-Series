import api from "../index";
import { ENDPOINTS } from "../endpoints";
import { handleApiError } from "../handleError";

/**
 * Fetch movies with optional pagination
 * @param {number} page - page number (default 1)
 * @param {number} limit - number of items per page (default 20)
 */
export const getMovies = async (page = 1, limit = 20) => {
  try {
    const response = await api.get(ENDPOINTS.MOVIES.LIST, {
      params: { page, limit }, // send pagination params
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await api.get(ENDPOINTS.MOVIES.DETAILS(id));
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
