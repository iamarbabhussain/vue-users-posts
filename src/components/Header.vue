<template>
    <div class="container">
        <header
            class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        >
            <router-link to="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                Vue Users / Posts
            </router-link>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><router-link to="/" class="nav-link px-2 link-secondary">Home</router-link></li>

                <li><router-link to="/users" class="nav-link px-2 link-dark">Users</router-link></li>

                <li><router-link to="/posts" class="nav-link px-2 link-dark">Posts</router-link></li>
            </ul>

            <div class="col-md-3 text-end">
                <router-link to="/login" class="btn btn-outline-dark me-2" v-if="!this.isLoggedIn">Login</router-link>
                <a href="javascript:oid(0)" @click="logout" class="btn btn-outline-dark me-2" v-else>Logout</a>
            </div>
        </header>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthUserStore } from '@/store/authUserStore';
import { mapActions } from 'pinia';
import { mapState } from 'pinia';

export default {
    name: 'Header',
    computed: {
        ...mapState(useAuthUserStore, ['isLoggedIn']),
    },
    methods: {
        ...mapActions(useAuthUserStore, { removeStoreUser: 'destroy' }),
        logout() {
            const authData = JSON.parse(localStorage.getItem('authData'));

            axios
                .post(
                    'https://api.m3o.com/v1/user/Logout',
                    { sessionId: authData.sessionId },
                    {
                        headers: {
                            Authorization: 'Bearer OTRkODkzMjAtYWRmMi00MmQ0LTgzNzItNjM3YmMwZWJiY2Zh',
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then(() => {
                    this.removeStoreUser();
                    localStorage.removeItem('authData');
                });
        },
    },
};
</script>

<style scoped>
.nav-item .nav-link,
.nav-item .nav-link:focus {
    color: black;
}

.router-link-active {
    font-weight: bold;
}
</style>
