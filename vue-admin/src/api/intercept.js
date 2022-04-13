import axios from "axios";
//let hostname= `http://${window.location.hostname}:3000/` //本地
let hostname='https://a.zanzcc.com:3001/' //服务器
let url = hostname;
axios.defaults.baseURL = url //mongodb默认地址
//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//设置超时
axios.defaults.timeout = 10000;




export {
    url,
    axios
  }