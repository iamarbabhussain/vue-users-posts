import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthUserStore } from '@/store/authUserStore';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');

const authUserStore = useAuthUserStore();

async function getInitialPiniaState() {
    if (!localStorage.getItem('authData')) {
        return;
    }

    authUserStore.$patch({
        isLoggedIn: true,
    });

    const authData = JSON.parse(localStorage.getItem('authData'));

    const response = await axios.post(
        'https://api.m3o.com/v1/user/Read',
        { id: authData.userId },
        {
            headers: {
                Authorization: 'Bearer OTRkODkzMjAtYWRmMi00MmQ0LTgzNzItNjM3YmMwZWJiY2Zh',
                'Content-Type': 'application/json',
            },
        }
    );

    authUserStore.$state = {
        isLoggedIn: true,
        name: response.data.account.username,
        email: response.data.account.email,
    };
}

getInitialPiniaState();

authUserStore.$subscribe((mutation, state) => console.log(state));
