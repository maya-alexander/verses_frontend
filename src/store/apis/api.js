import axios from "axios";

const token = localStorage.getItem("token")

export default axios.create({
  baseURL: `https://verses-backend.herokuapp.com/api/v1`,
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Access-Control-Allow-Origin': 'https://verses.neflify.app'
  }
});
  
