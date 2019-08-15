<template>
    <Breadcrumb>
        <BreadcrumbItem style="color:#fff;" 
            v-for="item in titleList" 
            :href="item.path" 
            :key="item.name"
        >{{ itemTitle(item) }}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    data () {
        return {
          titleList: [],
        };
    },
    mounted() {
        this.currentPath.forEach((data)=>{
            if(data.title&&data.title!=''){
               this.titleList.push(data);
            }
        })
    },
    methods: {
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    watch:{
        currentPath:function (val,oldVal) {
            this.titleList=[]
             val.forEach((data,index)=>{

                if(data.title&&data.title!=''){
                     if (index==val.length-1) {
                        delete data.path;
                        this.titleList.push(data);
                    }
                    else{
                        this.titleList.push(data);
                    }
                   
                }
            })
        },
    }
};
</script>

