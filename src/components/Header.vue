<template>
    <div class="my-3">
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>

            <li class="nav-item">
                <router-link to="/users" class="nav-link">Users</router-link>
            </li>

            <li class="nav-item">
                <router-link to="/posts" class="nav-link">Posts</router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.nav-item .nav-link,
.nav-item .nav-link:focus {
    color: black;
}

.router-link-active {
    font-weight: bold;
}
</style>
