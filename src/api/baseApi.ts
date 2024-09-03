import axiosInstance from './axiosInstance';

async function get<TResponseData>(url: string): Promise<TResponseData> {
  const response = await axiosInstance.get<TResponseData>(url);
  return response.data;
}

async function put<TResponseData, TRequestData>(
  url: string,
  data: TRequestData
): Promise<TResponseData> {
  const response = await axiosInstance.put<TResponseData>(url, data);
  return response.data;
}

async function post<TResponseData, TRequestData>(
  url: string,
  data: TRequestData
): Promise<TResponseData> {
  const response = await axiosInstance.post<TResponseData>(url, data);
  return response.data;
}

async function del<TResponseData>(url: string): Promise<TResponseData> {
  const response = await axiosInstance.delete<TResponseData>(url);
  return response.data;
}

export { get, put, post, del };
