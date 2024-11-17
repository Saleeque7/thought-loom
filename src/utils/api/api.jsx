import { config } from "../../config/config";

const baseUrl = config.VITE_AXIOS_API
const userUrl = `${config.VITE_AXIOS_API}/thoughtloom`

export const refreshApi = `${baseUrl}/refresh`
export const registerApi = `${baseUrl}/register`
export const loginApi = `${baseUrl}/login`


export const preferenceapi = `${userUrl}/article/preference`
export const createArticleApi = `${userUrl}/article`
export const getArticlesApi = `${userUrl}/article`
export const exploreApi = `${userUrl}/article/explore`
export const articleByIdApi = `${userUrl}/article`
export const editarticleByIdApi = `${userUrl}/article/edit`
export const deleteArticleApi = `${userUrl}/article/delete`