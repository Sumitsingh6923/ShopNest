import api from "../api/axiosConfig";

const API_URL = "/api/products";
const PUBLIC_PRODUCT_FETCH_SIZE = 200;

const mapApiError = (error, fallbackMessage) => {
  if (error.code === "ERR_NETWORK") {
    throw new Error(
      "Cannot connect to the backend at http://localhost:8080. Start the backend server and try again.",
    );
  }

  throw new Error(error.response?.data?.message || fallbackMessage);
};


// GET ALL PRODUCTS

export const getProducts = async (search = "", page = 0) => {
  try {
    if (search) {
      const response = await api.get(`${API_URL}/search?keyword=${search}`);
      return {
        products: response.data,
        isLastPage: true,
      };
    }

    const response = await api.get(`${API_URL}?page=${page}&size=8`);
    return {
      products: response.data.content,
      isLastPage: response.data.last,
    };
  } catch (error) {
    mapApiError(error, "Failed to load products.");
  }
};


// GET PRODUCT BY ID

export const getProductById = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    mapApiError(error, "Failed to load product details.");
  }
};




// CREATE PRODUCT (ADMIN)

export const createProduct = async (product) => {
  const response = await api.post("/admin/product", product);

  return response.data;
};



// UPDATE PRODUCT

export const updateProduct = async (id, product) => {
  const response = await api.put(`/admin/product/${id}`, product);

  return response.data;
};



// DELETE PRODUCT

export const deleteProduct = async (id) => {
  const response = await api.delete(`/admin/product/${id}`);

  return response.data;
};



// SEARCH PRODUCTS

export const searchProducts = async (keyword) => {
  const response = await api.get(`${API_URL}/search?keyword=${keyword}`);

  return response.data;
};

export const getProductsByCategory = async (category) => {
  const categoryMap = {
    men: ["men", "man", "mens"],
    women: ["women", "woman", "womens", "ladies"],
    electronics: ["electronics", "electronic"],
    shoes: ["shoes", "shoe", "footwear"],
    accessories: ["accessories", "accessory"],
  };

  const normalizedCategory = category?.toLowerCase() || "";
  const allowedValues = categoryMap[normalizedCategory] || [normalizedCategory];
  const response = await api.get(
    `${API_URL}?page=0&size=${PUBLIC_PRODUCT_FETCH_SIZE}`,
  );

  return response.data.content.filter((product) =>
    allowedValues.includes(product.category?.toLowerCase()),
  );
};



// FILTER PRODUCTS

export const filterProducts = async (category, minPrice, maxPrice) => {
  const response = await api.get(
    `${API_URL}?page=0&size=${PUBLIC_PRODUCT_FETCH_SIZE}`,
  );

  return response.data.content.filter((product) => {
    const matchesCategory = category
      ? product.category?.toLowerCase() === category.toLowerCase()
      : true;
    const matchesMinPrice =
      minPrice !== undefined && minPrice !== null && minPrice !== ""
        ? product.price >= Number(minPrice)
        : true;
    const matchesMaxPrice =
      maxPrice !== undefined && maxPrice !== null && maxPrice !== ""
        ? product.price <= Number(maxPrice)
        : true;

    return matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
};
