<template>
    <div class="modal" tabindex="-1" ref="bootstrapModal">
        <div class="modal-dialog">
            <form @submit.prevent="updateUser">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ user.name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" v-model="user.name" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" v-model="user.email" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Gender</label>
                            <div class="ms-2 form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="maleRadio"
                                    value="male"
                                    v-model="user.gender"
                                />
                                <label class="form-check-label" for="maleRadio">Male</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="femaleRadio"
                                    value="female"
                                    v-model="user.gender"
                                />
                                <label class="form-check-label" for="femaleRadio">Female</label>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
    name: 'EditUserModal',
    expose: ['show'],
    data() {
        return {
            bootstrapModalObj: {},
            user: {},
        };
    },
    methods: {
        show(userid) {
            this.bootstrapModalObj.show();

            axios.get('https://gorest.co.in/public/v2/users/' + userid).then((response) => (this.user = response.data));
        },
        updateUser() {
            const headers = {
                Authorization: 'Bearer cec1b22b46679bc70b2bb3d75b73ed6a58f6fbd7f92a7973f4b71eb9e24b124d',
            };

            axios
                .put('https://gorest.co.in/public/v2/users/' + this.user.id, this.user, { headers })
                .then((response) => {
                    this.$emit('userUpdated', response.data);

                    this.bootstrapModalObj.hide();
                });
        },
    },
    mounted() {
        this.bootstrapModalObj = new Modal(this.$refs.bootstrapModal);
    },
};
</script>
