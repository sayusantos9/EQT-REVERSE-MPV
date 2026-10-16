/** Camada de infraestrutura futura. Não ativar sem backend e autenticação reais. */
export const API_ENABLED=false;
export const API_BASE_URL='';
export async function apiRequest(path,{method='GET',token,body}={}){
  if(!API_ENABLED||!API_BASE_URL)throw new Error('Backend ainda não integrado. O MVP usa o repositório local.');
  const response=await fetch(`${API_BASE_URL}/api/v1${path}`,{
    method,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},
    ...(body!==undefined?{body:JSON.stringify(body)}:{})
  });
  const payload=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(payload?.error||'Falha na API');
  return payload?.data;
}
