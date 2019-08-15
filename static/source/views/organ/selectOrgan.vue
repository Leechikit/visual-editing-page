<template>
	<div class="select-organ">
        <div @click="showOrganList()">
    		<div class="organ">
                <span>{{ model }}</span>
            </div>
        </div>
		<div 
            ref="tree"
            v-show="showOrgans" 
            class="select-organ__tree">
			<Tree
                :data="data" 
                :load-data="loadData" 
                @on-select-change="selectNode">
            </Tree>
		</div>
	</div>
</template>

<script>
import organReq from '../../api/organ.js';
import { _ }  from '@/util/utils.js';
export default {
    name: 'selectOrgan',
    props: {
        value: {},
        data: {
            type: Array,
            default: function () {
                return [
                    {
                        title: '总部门',
                        loading: false,
                        id: this.$store.state.user.companyId,
                        children: []
                    }
                ];
            }
        },
        onChange: Function,
        disabled: Boolean,
        organName: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            model: this.organName,
            showOrgans: false
        };
    },
    methods: {
        async loadData (item, callback) {
            let param = {
            	pid: item.id
            };
            try {
            	let res = await organReq.getChildList(param);
            	let organList = res.page.result;
            	if (res.page.total === '0') delete(item.children);
            	let childList = [];
            	organList.forEach(function (item) {
                    let child = {
                        title: item.name,
                        id: item.id
                    }
                    if(item.HasChild === true){
                        child.loading= false;
                        child.children = [];
                    }
                    childList.push(child);
                });
                callback(childList);
            } catch (e) {
            	console.log(err);
            }
        },
        selectNode (data) {
            if (data.length === 0) {
                return
            }
        	this.model = data[0].title
            this.showOrgans = false;
        	this.$emit('input', data[0].id)
            this.$emit('on-change', data[0].id)
        },
        showOrganList () {
            if (this.disabled) {
                return
            }
            this.showOrgans = true;
        },
        handler (event) {
            let treeEle = this.$el
            if (treeEle.contains(event.target) || treeEle === event.target) {
                return
            }
            this.showOrgans = false
        }
    },
    created () {
        this.handler = this.handler.bind(this)
    },
    mounted () {
        _.on(document, 'mouseup', this.handler)
    },
    destroyed () {
        _.off(document, 'mouseup', this.handler)
    }
};
</script>

<style scoped lang="less">
.select-organ__tree {
    width: 100%;
	max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    z-index: 200;
}
.ivu-input {
    color: #ddd !important;
}
.organ{
    width: 100%;
    height: 30px;
    line-height:30px;
    border: 1px solid #dddee1;
    border-radius:4px;
    text-indent: 5px;
    cursor: pointer;
}
</style>