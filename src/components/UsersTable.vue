<template>
    <div class="">
        <h3>Users</h3>

        <b v-if="isLoading">Loading...</b>

        <b v-else-if="!users.length">No data found!</b>

        <table class="table table-striped table-hover" v-else>
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
                    <td>
                        <router-link :to="{ name: 'userposts', params: { userid: user.id } }">View Posts</router-link>
                        |
                        <a @click="showModal(user.id)" href="javascript:void(0)">Edit</a> |
                        <a @click="deleteUser(user.id)" href="javascript:void(0)">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <EditUserModal @user-updated="updateUserInList" ref="bootstrapModal" />

        <Pagination @page-changed="fetchUsers" v-if="users.length" />
    </div>
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';
import EditUserModal from '@/components/EditUserModal.vue';

export default {
    name: 'UsersTable',
    components: {
        Pagination,
        EditUserModal,
    },
    data() {
        return {
            isLoading: true,
            users: [],
        };
    },
    methods: {
        fetchUsers(page = 1) {
            axios
                .get('https://gorest.co.in/public/v2/users?page=' + page)
                .then((response) => (this.users = response.data))
                .then(() => (this.isLoading = false));
        },
        showModal(userid) {
            this.$refs.bootstrapModal.show(userid);
        },
        updateUserInList(updatedUser) {
            this.users = this.users.map((user) => (user.id === updatedUser.id ? (user = updatedUser) : user));
        },
        deleteUser(userid) {
            if (!confirm('Are you sure you want to delete this record?')) {
                return;
            }

            const headers = {
                Authorization: 'Bearer cec1b22b46679bc70b2bb3d75b73ed6a58f6fbd7f92a7973f4b71eb9e24b124d',
            };

            axios.delete('https://gorest.co.in/public/v2/users/' + userid, { headers }).then((response) => {
                this.users = this.users.filter((user) => user.id !== userid);
            });
        },
    },
    mounted() {
        this.fetchUsers();
    },
};
</script>
