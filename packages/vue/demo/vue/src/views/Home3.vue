<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png"/>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';
    import {onMounted} from 'vue';
    import WebtrekkSmartpixelVue from '../../../../../vue/src/lib/WebtrekkSmartPixelVue';

    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        setup(props) {
            onMounted(() => {
                WebtrekkSmartpixelVue.page('Homepage')
            })
        },
    };
</script>
