import defHttp from '@/http/axios'

//统一定义名称
enum Api {
    INFO_TXT = '/sentences',
    USER_IMAGES = '/getImages',
    MAIN_MSG = "/getHaoKanVideo",
    SEND_CODE = '/sendVerificationCode'
}

export const infoTxt = (data?: any) => defHttp.get(Api.INFO_TXT, { params: (data) });

export const getImages = (data?: any) => defHttp.get(Api.USER_IMAGES, { params: (data) });

export const getMainMsg = (data?: any) => defHttp.get(Api.MAIN_MSG, { params: (data) });

export const sendCode  = (mail?: any) => defHttp.post(Api.SEND_CODE, { mail });``