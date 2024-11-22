import { UserLogin } from "../interfaces/UserLogin";

// Function to send a POST request to the '/auth/login' endpoint with user login information
const login = async (userInfo: UserLogin) => {
  try {
    // Send a POST request to '/auth/login' with user login information in JSON format
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // Throw error if response status is not OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }
    
    // Parse the response body as JSON
    const data = await response.json();

    // Return the data received from the server
    return data;
  } catch (err) {
    // Log any errors that occur during fetch
    console.log('Error from user login:', err);

    // Return a rejected promise with an error message
    return Promise.reject('Could not fetch user info');
  }
}

export { login };
