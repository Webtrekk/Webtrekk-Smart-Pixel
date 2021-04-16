<template>
    <header>
        <nav>
            <ul>
                <li><a href="./">Home</a></li>
                <li><a href="./shop">Shop</a></li>
                <li><a href="./contact">Contact</a></li>
                <li style="float:right"><a class="active" href="./about">About</a></li>
            </ul>
        </nav>
    </header>
</template>

<style>
nav a.router-link-exact-active {
    color: #42b983;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Header"
});
</script>
