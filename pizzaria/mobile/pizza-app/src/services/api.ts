import axios from "axios";

//o react-navite exige que usemos https qunado se trata de localhost
//pode usar o IP para nao dar bug
const api = axios.create({
    // baseURL: 'http://localhost:8080'
    baseURL: 'http://172.30.240.1:8080'
});

export {api};