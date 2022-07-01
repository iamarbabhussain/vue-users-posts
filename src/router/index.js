import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UsersView from '../views/UsersView.vue';
import PostsView from '../views/PostsView.vue';
import LoginView from '../views/LoginView.vue';
import { useAuthUserStore } from '@/store/authUserStore';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { preventAuthUsers: true },
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/users',
        name: 'users',
        component: UsersView,
        meta: { requiresAuth: true },
    },
    {
        path: '/posts',
        name: 'posts',
        component: PostsView,
        meta: { requiresAuth: true },
    },
    {
        path: '/users/:userid/posts',
        name: 'userposts',
        component: PostsView,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    const userAuthStore = useAuthUserStore();

    if (to.meta.requiresAuth && !userAuthStore.isLoggedIn) return { name: 'login' };
    if (to.meta.preventAuthUsers && userAuthStore.isLoggedIn) return { name: 'home' };
});

export default router;
