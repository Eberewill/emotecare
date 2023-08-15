import HTTPService from "./HTTPService";

export async function post<T = any, D = any>(url: string, data: D): Promise<T> {
  return await new HTTPService().instance.post<T>(url, data);
}

export async function get<T = any>(url: string): Promise<T> {
  return await new HTTPService().instance.get<T>(url);
}

export async function deleteRequest<T = any>(url: string): Promise<T> {
  return await new HTTPService().instance.delete<T>(url);
}

export async function put<T = any, D = any>(url: string, data: D): Promise<T> {
  return await new HTTPService().instance.put<T>(url, data);
}

export default { get, post, delete: deleteRequest, put: put };
