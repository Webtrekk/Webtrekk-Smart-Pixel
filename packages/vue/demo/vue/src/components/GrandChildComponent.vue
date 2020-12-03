<template>
  <div class="grandchild" id="mapp_teaser">
    <h1>GrandChild component</h1>
    <p>This component has webtrekk key in its data.</p>
    <a href="#">The grandchild component is treated as a teaser.</a>

  </div>
</template>
<script>
export default {
  data() {
    return {
      webtrekk: {
        page: {
          parameter: {
            1: 'GrandChild component',
          },
        },
        teaser_tracking: {
          selector: '#mapp_teaser',
          data: {
            name: 'New Women Collection',
            rank: 'Main Page Banner',
            content: 'Women Collection',
            variant: 'campaign'
          },
          conversion: {
             type: 'product',
             goal: 'both',
             value: '11%'
          }
        }
      },
    };
  }
};
</script>
<style>
 .grandchild {
   background-color: cornsilk;
 }
</style>