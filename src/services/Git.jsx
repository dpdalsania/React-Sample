const API_URL = "https://api.github.com";

export const fetchUserRepo = async (userName) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "appplication/json",
    },
  };
  const response = await fetch(`${API_URL}/users/${userName}/repos`, options);
  return response.json();
};

