import axios from 'axios';

const httpClient = axios.create({
  baseURL:
    'https://raw.githubusercontent.com/younho9/vue-examples/main/examples/build-a-bot/public/assets/',
});

export default httpClient;
