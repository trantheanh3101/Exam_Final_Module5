import axios from 'axios';

const API_URL = "http://localhost:3001";

export const getProducts = async (searchName = '', selectedGenre = '') => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            params: {
                name_like: searchName,
                categoryId: selectedGenre,
                _sort: "name",
                _order: 'asc'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await axios.get(`${API_URL}/genres`);
        return response.data;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products`, product);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};
