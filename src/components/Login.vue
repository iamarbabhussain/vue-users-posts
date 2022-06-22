<template>
    <main class="form-signin">
        <form @submit.prevent="login">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    v-model="user.email"
                    required
                />
                <label for="floatingInput">Email address</label>
            </div>

            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    v-model="user.password"
                    required
                />
                <label for="floatingPassword">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-outline-dark" type="submit">Sign in</button>
        </form>
    </main>
</template>

<script>
import axios from 'axios';
import { useAuthUserStore } from '@/store/authUserStore.js';
import { mapActions } from 'pinia';

export default {
    name: 'Login',
    data() {
        return {
            user: { email: '', password: '' },
        };
    },
    methods: {
        ...mapActions(useAuthUserStore, {
            setStoreUser: 'set',
        }),
        login() {
            axios
                .post('https://api.m3o.com/v1/user/Login', this.user, {
                    headers: {
                        Authorization: 'Bearer OTRkODkzMjAtYWRmMi00MmQ0LTgzNzItNjM3YmMwZWJiY2Zh',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log(response.data.session);

                    localStorage.setItem(
                        'authData',
                        JSON.stringify({
                            userId: response.data.session.userId,
                            sessionId: response.data.session.id,
                        })
                    );

                    axios
                        .post(
                            'https://api.m3o.com/v1/user/Read',
                            { id: response.data.session.userId },
                            {
                                headers: {
                                    Authorization: 'Bearer OTRkODkzMjAtYWRmMi00MmQ0LTgzNzItNjM3YmMwZWJiY2Zh',
                                    'Content-Type': 'application/json',
                                },
                            }
                        )
                        .then((response) => {
                            this.setStoreUser(true, response.data.account.username, response.data.account.email);

                            this.$router.push('/');
                        });
                });
        },
    },
};
</script>

<style scoped>
html,
body {
    height: 100%;
}

body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type='email'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
