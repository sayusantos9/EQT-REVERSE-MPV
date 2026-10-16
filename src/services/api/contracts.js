// Funções planejadas; elas só funcionarão após implantação segura do backend.
import {apiRequest} from './client';
export const authApi={login:values=>apiRequest('/auth/login',{method:'POST',body:values}),register:values=>apiRequest('/auth/register',{method:'POST',body:values})};
export const learningApi={categories:token=>apiRequest('/categories',{token}),progress:token=>apiRequest('/me/progress',{token}),recordAttempt:(id,answers,token)=>apiRequest(`/lessons/${encodeURIComponent(id)}/attempts`,{method:'POST',body:{answers},token})};
export const adminApi={categories:(category,token)=>apiRequest('/admin/categories',{method:'POST',body:category,token}),users:token=>apiRequest('/admin/users',{token}),qrLabel:(values,token)=>apiRequest('/admin/qr-labels',{method:'POST',body:values,token})};
