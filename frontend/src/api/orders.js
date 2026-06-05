import API from './axios';

export const getOrders = () => API.get('/orders');
export const createOrder = (data) => API.post('/orders', data);
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
