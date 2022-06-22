import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

const pinia = createPinia();

if (localStorage.getItem('authData')) {
    const authData = JSON.parse(localStorage.getItem('authData'));

    axios
        .post(
            'https://api.m3o.com/v1/user/Read',
            { id: authData.userId },
            {
                headers: {
                    Authorization: 'Bearer OTRkODkzMjAtYWRmMi00MmQ0LTgzNzItNjM3YmMwZWJiY2Zh',
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            pinia.state.value.authenticatedUser = {
                isLoggedIn: true,
                name: response.data.account.username,
                email: response.data.account.email,
            };

            createApp(App).use(router).use(pinia).mount('#app');
        });
} else {
    createApp(App).use(router).use(pinia).mount('#app');
}
