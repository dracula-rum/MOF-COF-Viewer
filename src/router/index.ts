import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            name: "", 
            path: "/showone/:name", 
            props: route => ({ name: route.query.name }),
            component: ( ()=> import("../views/showone.vue"))
        },
        {
            name: "", 
            path: "/showall",  
            component: ( ()=> import("../views/showall.vue"))
        },
        {
            name: "", 
            path: "/",  
            component: ( ()=> import("../views/home.vue"))
        },
    ]
})
export default router





    

