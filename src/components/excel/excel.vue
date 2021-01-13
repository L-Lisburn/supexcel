<template>
    <div class="exl-container">
        <table class="exl-table">
            <tr class="exl-table-title">
                <td
                    class="exl-td"
                    v-for="(header , index) in head"
                    :key="index"
                    :style="{width : header.width === undefined ? '' : header.width + 'px'}"
                >
                    <span class="exl-header">{{header.name}}</span>
                </td>
            </tr>
            <tr>
            </tr>
            <tr>
                <td
                    class="exl-td"
                    v-for="i in head.length"
                    :key="i"
                >1</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props : [
        'head'
    ],
    data : () => ({

    }),
    mounted () {
        this._exl_init()
    },
    methods : {
        _exl_init () {
            
        }
    }
}
</script>
<style lang="stylus">
@import './exl.stylus';
</style>
