const requestURL = "http://smktesting.herokuapp.com";

export const registerUser = async bodyData => {
  try {
    let response = await fetch(requestURL + "/api/register/", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка", error);
  }
};

export const loginUser = async bodyData => {
  try {
    let response = await fetch(requestURL + "/api/login/", {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка", error);
  }
};

export const postReview = async (bodyData, id, token) => {
  try {
    let response = await fetch(requestURL + `/api/reviews/${id}`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка", error);
  }
};

export const getProducts = async () => {
  try {
    let response = await fetch(requestURL + `/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.error("Ошибка", error);
  }
};

export const getReviews = async (id, token) => {
  try {
    let response = await fetch(requestURL + `/api/reviews/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
    let result = await response.json();
    console.log("getReviews result", result);
    return result;
  } catch (error) {
    console.error("Ошибка", error);
  }
};
