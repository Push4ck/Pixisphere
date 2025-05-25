const API_BASE_URL = "http://localhost:3001";

export const fetchAllPhotographers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/photographers`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all photographers:", error);
    return [];
  }
};

export const fetchPhotographerById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/photographers/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching photographer with ID ${id}:`, error);
    return null;
  }
};
