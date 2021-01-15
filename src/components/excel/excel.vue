-+++++++++++++++++++++++++++++<template>
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
                <button @click="_exl_font('bold')">
                    <i class="icon excel-icons">&#xe617;</i>
                </button>
                <button @click="_exl_font('italic' )">
                    <i class="icon excel-icons">&#xe693;</i>
                </button>
                <button @click="_exl_font('underline')">
                    <i class="icon excel-icons">&#xe6fa;</i>
                </button>
                <button @click="_exl_font('strikethrough')">
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
            <table class="exl-table" id="tableWidth">
                <thead v-if="columns !== undefined" class="exl-thead">
                    <tr v-if="pattern">
                        <td class="exl-row-pattern">
                            <div class="exl-select-all" @click="_exl_select('all')">
                                <span></span>
                            </div>
                        </td>
                        <td
                            class="exl-col-pattern"
                            v-for="(col , index) in columns[0]"
                            :key="index"
                            :colspan="col.colspan === undefined ? '' : col.colspan"
                            :style="{width : col.width === undefined ? '' : col.width + 'px'}"
                            @click="_exl_select('col' , $event)"
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
                            @click="_exl_select('row' , $event)"
                        >
                            {{columns.length + index + 1}}
                        </td>
                        <td
                            v-for="(item , idx) in data[index]"
                            :key="idx"
                            class="exl-td  text"
                            @click="_exl_select('one' , $event)"
                            :style="{
                                width : item.width === undefined ? '' : item.width + 'px' ,
                            }"
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
        activeIndex: -1 ,
        /* 字体状态 */
        font : [] ,

        fontstyle:""
    }),
    watch : {
        columns : {
            handler : function(n , o){
                this._exl_init()
            }
        },
    },
    mounted () {
        this._exl_init();

        this.controlWidth()
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
        _exl_select(state , env){
            // console.log(env.currentTarget.getElementTagName('exl_active'))
            switch(state){
                /* 全选 */
                case 'all' :
                    this.scn = state
                break;
                /* 列选中 */
                case 'col' :
                    console.log(env)
                break;
                /* 行选中 */
                case 'row' :
                    env.currentTarget.parentElement.className = 'exl_active'
                break;
                /* 单个选中 */
                case 'one' :
                    // console.log(env.currentTarget.parentElement)
                    env.target.parentElement.className = 'exl-td exl_active'
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
        _exl_font (state,env) {

               



           this.$nextTick(()=>{


            

                if(this.font.length==0){
                this.font.push('111')
                
            }

            //获取整个文本
            var text=document.getElementsByClassName('text');
            console.log(text);

          for(var i in this.font){
                // console.log(i);
                if(this.font[i] == state){
                    this.font.splice(i , 1)
                    
                }
                
                    console.log(this.font)

               

          }
            switch(state){
                        /* 粗体 */
                        case 'bold' : 
                        
                        this.font.push(state);
                        
                        // for(var i in text){

                        //         console.log(text[i].getAttribute('class'));

                        //     if(text[i].getAttribute('class')=="exl_active"){

                        //     }
                        // }
                        

                        break;
                        /* 斜体 */
                        case 'italic' :

                        this.font.push(state)
                        // console.log(env.currentTarget.getElementsByClassName('exl-col-name'));
                        //  env.currentTarget.getElementsByClassName('exl-col-name').calssList.add('italic')
                        break;
                        /* 下划线 */
                        case 'underline' :
                        
                        this.font.push(state)
                        //  env.currentTarget.getElementsByClassName('exl-col-name').calssList.add('underline')
                        break;
                        /* 删除线 */
                        case 'strikethrough' :
                        
                        this.font.push(state)

                        //  env.currentTarget.getElementsByClassName('exl-col-name').calssList.add('strikethrough')
                        break;
                        default :
                            console.log('请传入正确的状态值')
                    }

                    // console.log(this.font);
           })
                   
                
            
            
        },
        controlWidth(){
            var tTD;
            var table = document.getElementById('tableWidth');
            console.log(table);
            console.log(table.rows[0].cells)
            for (let j = 0; j < table.rows[0].cells.length; j++) {

                table.rows[0].cells[j].onmousedown = function () {
                console.log(table.rows[0].cells[j].width)

                    //记录单元格
                    tTD = this;
                    if (event.offsetX > tTD.offsetWidth - 10) {
                        tTD.mouseDown = true;
                        tTD.oldX = event.x;
                        tTD.oldWidth = tTD.offsetWidth;
                    }
                    //记录Table宽度
                    //table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;
                    //tTD.tableWidth = table.offsetWidth;
                };
                table.rows[0].cells[j].onmouseup = function () {
                    //结束宽度调整
                    if (tTD === undefined) tTD = this;
                    tTD.mouseDown = false;
                    tTD.style.cursor = 'default';
                };
                table.rows[0].cells[j].onmousemove = function () {
                    //更改鼠标样式
                    if (event.offsetX > this.offsetWidth - 10)
                        this.style.cursor = 'col-resize';
                    else
                        this.style.cursor = 'default';
                    //取出暂存的Table Cell
                    if (tTD === undefined) tTD = this;
                    //调整宽度
                    if (tTD.mouseDown != null && tTD.mouseDown ===true) {
                        tTD.style.cursor = 'default';
                        if (tTD.oldWidth + (event.x - tTD.oldX) > 0)
                            tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
                        //调整列宽
                        tTD.style.width = tTD.width;
                        tTD.style.cursor = 'col-resize';
                        //调整该列中的每个Cell
                        table = tTD;
                        //  console.log(tTD.width)
                        while (table.tagName !== 'TABLE') table = table.parentElement;
                                //  console.log()
                            table.rows[0].cells[j].style.width = tTD.width + "px"
                        
                        //调整整个表
                        //table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
                        //table.style.width = table.width;
                    }
                };
            }
        }
    },
    beforeUpdate(){  
    },
    updated(){
        this.controlWidth()
    },
}
</script>
<style lang="stylus">
@import './exl.stylus';
</style>
