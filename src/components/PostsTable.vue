<template>
    <div class="">
        <h3>{{ !this.userid ? 'All Posts' : 'Posts' }}</h3>

        <b v-if="isLoading">Loading...</b>

        <b v-else-if="!posts.length">No data found!</b>

        <table class="table table-striped table-hover" v-else>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(post, index) in posts" :key="index">
                    <td>{{ post.id }}</td>
                    <td>{{ post.title }}</td>
                    <td>{{ post.body }}</td>
                </tr>
            </tbody>
        </table>

        <Pagination @page-changed="fetchAllPosts" v-if="posts.length && !this.userid" />
    </div>
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';

export default {
    name: 'PostsTable',
    components: {
        Pagination,
    },
    data() {
        return {
            isLoading: true,
            posts: [],
            userid: this.$route.params.userid,
        };
    },
    methods: {
        fetchAllPosts(page = 1) {
            axios
                .get('https://gorest.co.in/public/v2/posts?page=' + page)
                .then((response) => (this.posts = response.data))
                .then(() => (this.isLoading = false));
        },
        fetchUserPosts(userid, page = 1) {
            axios
                .get('https://gorest.co.in/public/v2/users/' + userid + '/posts?page=' + page)
                .then((response) => (this.posts = response.data))
                .then(() => (this.isLoading = false));
        },
    },
    mounted() {
        if (this.userid) {
            this.fetchUserPosts(this.$route.params.userid);
            return;
        }

        this.fetchAllPosts();
    },
};
</script>
