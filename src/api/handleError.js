export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code other than 2xx
    console.error("API Error:", error.response.data);
    return {
      success: false,
      message: error.response.data?.message || "Server Error",
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    console.error("Network Error:", error.message);
    return {
      success: false,
      message: "No response from server. Check your connection.",
    };
  } else {
    // Something happened in setting up the request
    console.error("Error:", error.message);
    return {
      success: false,
      message: "Unexpected error occurred.",
    };
  }
};
