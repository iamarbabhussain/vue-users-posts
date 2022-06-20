<template>
    <div class="">
        <h3>Users</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.status }}</td>
                    <td><router-link :to="{ name: 'userposts', params: { userid: user.id } }"> Posts </router-link></td>
                </tr>
            </tbody>
        </table>

        <Pagination @page-changed="fetchUsers" v-if="users.length" />
    </div>
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';

export default {
    name: 'UsersTable',
    components: {
        Pagination,
    },
    data() {
        return {
            users: [],
        };
    },
    methods: {
        fetchUsers(page = 1) {
            axios
                .get('https://gorest.co.in/public/v2/users?page=' + page)
                .then((response) => (this.users = response.data));
        },
    },
    mounted() {
        this.fetchUsers();
    },
};
</script>
