// b.vue
<style>

</style>
<template>
    <div>
        <h3>b组件</h3>
        <div id="test">{{vueData}}</div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        data () {
            // text: 'demo'
        },
        computed:mapState({
            vueData: state => state.data.dataList
        }),
        mounted () {
            this.$store.dispatch('data/getList')
        }
    }
</script>