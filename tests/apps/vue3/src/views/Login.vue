<template>
    <div class="login-wrapper">
        <div>
            <h2>Register</h2>
            <p>Register if you are a new user.</p>
            <form id="register">
                <p>
                    First name:
                    <input
                        name="firstName"
                        v-model="regFirstName"
                        type="text"
                    />
                </p>
                <p>
                    Last name:
                    <input name="lastName" v-model="regLastname" type="text" />
                </p>
                <p>
                    Username:
                    <input name="name" v-model="regName" type="text" />
                </p>
                <p>
                    Password:
                    <input
                        name="password"
                        v-model="regPassword"
                        type="password"
                    />
                </p>
                <p>
                    <button
                        v-on:click.prevent="
                            () => {
                                this.register({
                                    name: this.regName,
                                    password: this.regPassword,
                                    firstName: this.regFirstName,
                                    lastName: this.regLastname
                                });
                            }
                        "
                        type="submit"
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
        <div>
            <h2>Login</h2>
            <p>Login with your existing credentials.</p>
            <form id="login">
                <p>
                    Name:
                    <input name="name" v-model="loginName" type="text" />
                    Password:
                    <input
                        name="password"
                        v-model="loginPassword"
                        type="password"
                    />
                </p>
                <p>
                    <button
                        type="submit"
                        v-on:click.prevent="
                            () => {
                                this.login({
                                    name: this.loginName,
                                    password: this.loginPassword
                                });
                            }
                        "
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
    name: "Login",
    data() {
        return {
            loginName: "",
            loginPassword: "",
            regName: "",
            regFirstName: "",
            regLastname: "",
            regPassword: "",
            content: {},
            webtrekk: {
                page: {
                    parameter: {
                        1: "Login"
                    }
                }
            }
        };
    },
    computed: {
        ...mapGetters(["isLoggedOut"])
    },
    methods: {
        ...mapActions(["login", "register"])
    }
});
</script>
