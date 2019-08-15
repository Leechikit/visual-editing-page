<style lang="less" scoped>
    @import './styles/infor-card.less';
    .infor-intro-text{
        margin-bottom: 5px;
        color:rgb(72,92,131);
        text-align:center;
    }
    .infor-intro-mainIcon{
        font-size: 30px;
        vertical-align: middle;
    }
    .infor-intro-mainText{
        font-size: 23px;
    }
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con">
            <Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'rgb(72,92,131)'}" span="5">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Col span="5">
                        <Icon :type="iconType" class="infor-intro-mainIcon"></Icon>
                    </Col>
                     <Col span="18">
                        <span class="infor-intro-mainText">{{data.text}}</span>
                    </Col>
                </Row>
            </Col>
            <Col span="19" class="height-100">
                <Row type="flex" align="middle"  class="height-100">
                    <Col :span='(parseInt(24/checkValue.length))'  v-for="(item,index) in checkValue" :key="index">
                            <count-up style="margin-left:7%"
                                class="infor-card-count user-created-count" 
                                :id-name="item.header+data.text" 
                                :end-val="item.body" 
                                :color="'rgb(72,92,131)'"
                                :countSize="countSize"
                                :countWeight="countWeight"
                            >
                                <p class="infor-intro-text" slot="intro">{{item.header}}</p>
                            </count-up>
                    </col>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    data () {
        return {
             checkValue:[]
        };
    },
    components: {
        countUp
    },
    props: {
        idName: String,
        endVal: Number,
        color: String,
        iconType: String,
        introText: String,
        data:Object,
        countSize: {
            type: String,
            default: '16px'
        },
        countWeight: {
            type: Number,
            default: 700
        }
    },
    mounted(){
        for(var i=0;i<this.data.thead[0].tr.length;i++){
            this.checkValue.push({
                header:this.data.thead[0].tr[i].text,
                body:parseInt(this.data.tbody[0].tr[i].text)
            })
        }
        console.log("((((((((((((((((((")
        console.log(this.checkValue)
        console.log("))))))))))))))))))")
    },
};
</script>

