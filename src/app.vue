<template>
    <div class="app"> <h1>luckfine</h1> 
    <demo></demo></div>
</template>
<script>
import Demo from './components/demo/demo'
export default {
    data () {
        //text: 'luckfine'
    },
    components: [Demo]
}
</script>
<style lang="stylus" scoped>
.app {
    color : red;
    transform : translate(100px);
}
</style>