export const basicRoutes: Array<any> = [
    {
        path: "/",
        name: "Root",
        meta: {
            title: "首页",
            keepAlive: true,
            isLogin: false
        },
        component: () => import("@/views/home/index.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
        },
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/caselist",
        name: "CaseList",
        meta: {
            title: "案例列表页",
        },
        component: () => import("@/views/caseList/index.vue"),
    },
    {
        path: "/casedetail",
        name: "CaseDetail",
        meta: {
            title: "案例详情页",
            keepAlive: true,
            isLogin: true //详情页只允许在登录情况下进入，否则邀请登录。
        },
        component: () => import("@/views/caseDetail/index.vue"),
    },
    {
        path: "/wordlist",
        name: "WordList",
        meta: {
            title: "文案列表页",
        },
        component: () => import("@/views/wordList/index.vue"),
    },
    {
        path: "/mediaList",
        name: "MediaList",
        meta: {
            title: "媒体列表页",
        },
        component: () => import("@/views/mediaList/index.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
        },
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/demo",
        name: "demo",
        meta: {
            title: "模板",
            keepAlive: true,
        },
        component: () => import("@/views/demo/index.vue"),
    },
];
