<template>
    <div style="padding: 10px;">
        <!-- <p style="width:160px;margin:0 auto;font-size:18px!important">{{data.text}}</p> -->
        <Table :columns="header" :data="tableBody" border height="280"></Table>
     </div>
</template>

<script>
export default {
    name: 'serviceRequests',
    props: {
        data: {
            type: Object,
            default: {},

        }
    },
    data () {
        return {
            header:[],            
            tableBody:[], 
            }
    },
    mounted () {
        this.changeTableData()

    },
    watch: {
        data () {
            this.changeTableData();
        }
    },
    methods: {
       
        changeTableData(){
            // debugger
            var temp = this.data
            var thead = temp.thead;
            var tbody = temp.tbody;

            this.header = [];
            this.tableBody = [];

            for(var index =0;index< thead[0].tr.length;index++){
                var cam = {};
                cam.title = thead[0].tr[index].text;
                cam.key = thead[0].tr[index].text;

                this.header.push(cam);
            }

            for(var x =0 ;x<tbody.length;x++ ){
                var num = tbody[x].tr;
                var op = {};
                for(var i=0;i<num.length;i++){               
                    op[this.header[i].key]=num[i].text
                }
                this.tableBody.push(op);
            }

            // 明细表根据内容自适应表格宽度
            try {
                this.header.forEach(item => {
                    let maxLen = item.title.length
                    this.tableBody.forEach(cur => {
                        const len = cur[item.key].length
                        if (len > maxLen) maxLen = len
                    })
                    let width = 70 + maxLen * 5
                    if (width > 300) width = 300
                    item.minWidth = width
                })
            } catch (error) {
                //
            }

        }

    }
};
</script>