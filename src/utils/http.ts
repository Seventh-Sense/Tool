/**
 * 公共基础接口封装
 */
import request from '@/utils/request'

enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete'
}

export const get = (url: string, params?: object) => {
  return request({
    url: url,
    method: RequestHttpEnum.GET,
    params: params
  })
}

export const post = (url: string, data?: object | string, headersType?: string) => {
  return request({
    url: url,
    method: RequestHttpEnum.POST,
    data: data,
    headers: {
      'Content-Type': headersType || 'application/json;charset=UTF-8'
    }
  })
}

export const del = (url: string, params?: object) => {
  return request({
    url: url,
    method: RequestHttpEnum.DELETE,
    params
  })
}

export const getLoginInfo = () => {
  return request({
    method: 'GET',
    url: '/login/info'
  })
}

export const readAllJobs = async () => {
  try {
    const response = await get(`/sched/job`)

    return response
  } catch (error) {
    throw error
  }
}

export const addJob = async (data: any) => {
  try {
    const response = await post(`/sched/job`, data)

    return response
  } catch (error) {
    throw error
  }
}

export const deleteJob = async (id: any) => {
  try {
    const response = await del(`/sched/` + id)

    return response
  } catch (error) {
    throw error
  }
}

export const getMqtt = async () => {
  try {
    const response = await get(`/mqtt/config`)

    return response
  } catch (error) {
    throw error
  }
}

export const updateMqtt = async (data: any) => {
  try {
    const response = await post(`/mqtt/config`, data)

    return response
  } catch (error) {
    throw error
  }
}

export const getVersion = async () => {
  try {
    const response = await get(`/version`)

    return response
  } catch (error) {
    throw error
  }
}