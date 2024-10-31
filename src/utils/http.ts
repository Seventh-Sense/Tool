/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
 
export const post = (
  url: string,
  data?: object | string,
  headersType?: string
) => {
  return request({
    url: url,
    method: "post",
    data: data,
    headers: {
      "Content-Type": headersType || "application/json;charset=UTF-8",
    },
  });
};

export const generateLicense = async (data: any) => {
  try {
    const response = await post(`/license`, data);

    return response;
  } catch (error) {
    throw error;
  }
};