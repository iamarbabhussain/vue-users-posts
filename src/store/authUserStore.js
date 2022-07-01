import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('authenticatedUser', {
    state: () => {
        return {
            isLoggedIn: false,
            name: '',
            email: '',
        };
    },
    actions: {
        set(isLoggedIn, name, email) {
            this.isLoggedIn = isLoggedIn;
            this.name = name;
            this.email = email;
        },
        destroy() {
            this.isLoggedIn = false;
            this.name = '';
            this.email = '';
        },
    },
});
