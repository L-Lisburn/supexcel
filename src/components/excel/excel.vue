<template>
    <div class="exl-container">
        <div class="exl-tool-bar">
            <div class="exl-tool-font">
                <!-- 字体 -->
                <div class="exl-tool-fx">
                    <button>
                        <i class="icon excel-icons">&#xe646;</i>
                        
                    </button>
                    <input type="text" placeholder="函数">
                </div>
                <br/>
                <button>
                    <i class="icon excel-icons">&#xe617;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe693;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe6fa;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe6fb;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe682;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe67a;</i>
                </button>
            </div>
            <div class="exl-tool-format">
                <!-- 排版 -->
                <button>
                    <i class="icon excel-icons">&#xe6f1;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe6ad;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe70d;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe607;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe605;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe604;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe650;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe61a;</i>
                </button>
                <button>
                    <i class="icon excel-icons">&#xe6a0;</i>
                </button>
            </div>
            <div class="exl-tool-views">
                <button @click="_exl_exchange">
                    <i class="icon excel-icons">&#xe6f8;</i>
                </button>
                <input type="text" v-model="exchange" placeholder="交换列或者行请以英文逗号隔开，交换多组请以分号隔开，例：a1,a3;1,3">
            </div>
        </div>
        <div class="exl-content">
            <table class="exl-table">
                <thead v-if="columns !== undefined" class="exl-thead">
                    <tr v-if="pattern">
                        <td class="exl-row-pattern">
                            <div class="exl-select-all" @click="_exl_select_all">
                                <span></span>
                            </div>
                        </td>
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
                            <span class="exl-col-name">{{col.value}}</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item , index) in data"
                        :key="index"
                    >
                        <td
                            class="exl-row-pattern"
                            v-if="pattern"
                        >
                            {{columns.length + index + 1}}
                        </td>
                        <td
                            v-for="(item , index) in data[index]"
                            :key="index"
                            class="exl-td"
                            :style="{width : item.width === undefined ? '' : item.width + 'px'}"
                        >
                            <span class="exl-col-name">{{item.value}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        columns : {
            type : Array ,
            required: true
        },
        data : {
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
        en : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] ,
        /* 行列交换 */
        exchange : '' ,
        /* 选择状态 */
        scn : '' ,
        /* 字体状态 */
        font : ['bold' , 'italic'] ,
    }),
    watch : {
        columns : {
            handler : function(n , o){
                this._exl_init()
            }
        },
    },
    mounted () {
        this._exl_init()
    },
    methods : {
        /* 初始化 */
        _exl_init (index) {
            if(this.pattern == true){
                if(index <= 25){
                    /* 头部A-Z编号 */
                    return this.en[index]
                }else if(index > 25){
                    /* 头部An-Zn编号 */
                    let sub = Math.floor(index/26)
                    return this.en[index%26] + sub
                }
            }
        },
        /* 行列交换 */
        _exl_exchange () {
            /* 切割分号 */
            let exchange = this.exchange.split(";")
            for(var i in exchange){
                /* 切割逗号 */
                let excow = exchange[i].split(",")
                /* 重新赋值 */
                exchange[i] = [excow]
            }
            for(var i in exchange){
                if(exchange[i] == ''){
                    exchange.splice(i , 1)
                }else{
                    
                }
            }

        },
        /* 选择 */
        _exl_select(state){
            switch(state){
                /* 全选 */
                case 'all' : 
                    this.scn = state
                break;
                /* 列选中 */
                case 'col' :
                    this.scn = state
                break;
                /* 行选中 */
                case 'row' :
                    this.scn = state
                break;
                /* 单个选中 */
                case 'one' :
                    this.scn = state
                break;
                /* 多个选中 */
                case 'scn' :
                    this.scn = state
                break;
                default :
                    this.scn = ''
                    console.log('请传入正确的状态值')
            }
        },
        /* 双击进入修改模式 */
        _exl_double_edit () {

        },
        /* 文本操作 */
        _exl_font (state) {
            let data = this.font
            for(var i in data){
                if(data[i] == state){
                    data.splice(i , 1)
                }else{
                    switch(state){
                        /* 粗体 */
                        case 'bold' : 
                        
                        this.font.push(state)
                        break;
                        /* 斜体 */
                        case 'italic' :
                        
                        this.font.push(state)
                        break;
                        /* 下划线 */
                        case 'underline' :
                        
                        this.font.push(state)
                        break;
                        /* 删除线 */
                        case 'strikethrough' :
                        
                        this.font.push(state)
                        break;
                        default :
                            console.log('请传入正确的状态值')
                    }
                }
            }
        },
    }
}
</script>
<style lang="stylus">
@import './exl.stylus';
</style>
