<template>
    <div class="productlist">
        <p>TEST: {{ JSON.stringify(products)}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ProductPreview",
    props: {
        product: {
            type: Object,
            required: true
        }
    }
});
</script>


<style>

</style>