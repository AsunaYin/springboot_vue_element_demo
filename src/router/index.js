import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "../App";
import Index from "../views/Index";
import BookList from "../views/BookList";
import AddBook from "../views/AddBook";
import Page3 from "../views/Page3";
import Page4 from "../views/Page4";

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: '图书管理',
        component: Index,
        redirect: '/booklist',
        children: [
            {
                path: '/booklist',
                name: '查询图书',
                component: BookList
            }, {
                path: '/addbook',
                name: '添加图书',
                component: AddBook
            }
        ]
    },
    {
        path: '/',
        name: '选项2',
        component: Index,
        children: [
            {
                path: '/page3',
                name: '页面3',
                component: Page3
            },
            {
                path: '/page4',
                name: '页面4',
                component: Page4
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
