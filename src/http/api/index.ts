import defHttp from '@/http/axios'

//统一定义名称
enum Api {
    INFO_TXT = '/sentences',
    USER_IMAGES = '/getImages',
    MAIN_MSG = "/getHaoKanVideo",
}

export const infoTxt = (data?: any) => defHttp.get(Api.INFO_TXT, { params: (data) });

export const getImages = (data?: any) => defHttp.get(Api.USER_IMAGES, { params: (data) });

export const getMainMsg = (data?: any) => defHttp.get(Api.MAIN_MSG, { params: (data) });