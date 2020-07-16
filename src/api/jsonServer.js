import axios from 'axios';

export default axios.create({
    // Needs to be changed with new URL every time ngrok is run
    baseURL: 'http://29d75347e188.ngrok.io'
});