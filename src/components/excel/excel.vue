<template>
    <div class="exl-container">
        <table class="exl-table">
            <thead>
                <tr v-if="pattern">
                    <td class="exl-row-pattern"></td>
                    <td
                        class="exl-col-pattern"
                        v-for="(col , index) in columns[0]"
                        :key="index"
                        :colspan="col.colspan === undefined ? '' : col.colspan"
                        :style="{width : col.width === undefined ? '' : col.width + 'px'}"
                    >
                        <span v-html="_exl_init(index)"></span>
                    </td>
                </tr>
                <tr
                    v-for="(columns , index) in columns"
                    :key="index"
                >
                    <td
                        class="exl-row-pattern"
                        v-if="pattern"
                    >
                        {{index + 1}}
                    </td>
                    <td
                        v-for="(col , index) in columns"
                        :key="index"
                        :rowspan="col.rowspan === undefined ? '' : col.rowspan"
                        :colspan="col.colspan === undefined ? '' : col.colspan"
                        class="exl-td"
                        :style="{width : col.width === undefined ? '' : col.width + 'px'}"
                    >
                        <span class="exl-header">{{col.name}}</span>
                    </td>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
export default {
    props : {
        columns : {
            type : Array ,
            required: true
        },
        pattern : {
            type : Boolean ,
            required : true
        }
    },
    data : () => ({
        /* 标准模式开启下：顶部与侧边增加额外的定位栏 */
        en : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    }),
    watch : {
        columns : {
            handler : function(n , o){
                this._exl_init()
            }
        }
    },
    mounted () {
        this._exl_init()
    },
    methods : {
        _exl_init (index) {
            if(this.pattern == true){
                if(index <= 25){
                    return this.en[index]
                }else if(index > 25){
                    let sub = Math.floor(index/26)
                    return this.en[index%26] + sub
                }
            }
        }
    }
}
</script>
<style lang="stylus">
@import './exl.stylus';
</style>
