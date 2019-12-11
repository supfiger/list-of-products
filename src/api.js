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

export const postReview = async (bodyData, field) => {
  try {
    let response = await fetch(requestURL + `/api/reviews/${field}`, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let result = await response.json();
    console.log("postReview", result);
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

export const getReviews = async field => {
  try {
    let response = await fetch(requestURL + `/api/reviews/${field}`, {
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
