import { axios } from './intercept.js'


//公共接口
export const get = (path, params) => {
  return axios.get(`/${path}`, params).then(res => res.data);
};


// 登录接口
export const login = (params) => {
  return axios.post(`users/login`, params).then(res => res.data);
};

// 查找接口
export const find = (params) => {
  return axios.get(`users/find`, { params }).then(res => res.data);
};

// 删除用户接口
export const remove = (params) => {
  return axios.get(`users/remove`, { params }).then(res => res.data);
};
// 注册接口
export const register = (params) => {
  return axios.post(`users/register`, params).then(res => res.data);
};

// 更新用户资料接口
export const update = (params) => {
  return axios.post(`users/update`, params).then(res => res.data);
};

/** 分类 *///////////////////
// 查询分类
export const Classfind = (params) => {
  return axios.get(`class/find`, {params}).then(res => res.data);
};
// 删除指定分类
export const ClassRemove = (params) => {
  return axios.get(`class/remove`, {params}).then(res => res.data);
};
export const ClassAdd = (params) => {
  return axios.post(`class/insert`, params).then(res => res.data);
};
export const ClassUpdate = (params) => {
  return axios.post(`class/update`, params).then(res => res.data);
};

/**   商品  *///////////////////
export const ShopFind = (params) => {
  return axios.get(`shop/find`, {params}).then(res => res.data);
};
// 删除指定分类
export const ShopRemove = (params) => {
  return axios.get(`shop/remove`, {params}).then(res => res.data);
};
export const ShopInsert = (params) => {
  return axios.post(`shop/insert`, params).then(res => res.data);
};
export const ShopUpdate = (params) => {
  return axios.post(`shop/update`, params).then(res => res.data);
};

//查找订单
export const FindOrder = (params) => {
  return axios.get(`order/find`, { params }).then(res => res.data);
};