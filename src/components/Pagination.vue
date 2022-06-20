<template>
    <nav>
        <ul class="pagination justify-content-end">
            <li class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="currentPage > 1 && currentPage--">Previous</a>
            </li>

            <li class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="currentPage++">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Pagination',
    data() {
        return {
            currentPage: 1,
        };
    },
    watch: {
        currentPage() {
            if (this.currentPage === 0) return;

            this.$emit('pageChanged', this.currentPage);
        },
    },
};
</script>
