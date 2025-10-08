import api from "../index";
import { ENDPOINTS } from "../endpoints";
import { handleApiError } from "../handleError";

export const login = async (credentials) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
