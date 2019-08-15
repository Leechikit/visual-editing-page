<template>
 	<div v-if="!controls.isHidden"> 
		<Row>
			<Col style="border-bottom:1px solid #eee;height: 36px" span="23">
				<div class="left count">
					<span>家庭成员信息</span>
					<Icon type="ios-medical" size="12px" color="red"/>
				</div>
				<div class="right">
					<Icon type="plus-round" style="font-size:20px;margin:0 20px; line-height:32px" color="#6fd5f7" @click="addfamilyMember"></Icon>
					<Icon type="ios-trash-outline" size="20" color="#6fd5f7" style="line-height:32px" @click="removefamilyMember"/>
				</div>
			</Col>
		</Row>
		<Row style="margin-bottom:5px;">
			<Table border :columns="familyMember" :data="familyData"></Table>
		</Row>
 </div>
</template>

<script>
export default {
	props: ['controls', 'model', 'index', 'editControls', 'isEdit'],
  data () {
    return {
			familyMember: [
        {
          key: 'number',
          width: 70,
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '序列')
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.checkbox
                },
                on: {
                  'on-change':(e)=> {
                    this.familyData[params.row.number - 1].checkbox = e
                  }
                }
              }),
              h('span', {
                props: {
                  value: params.row.number
                },
                style: {
                  margin: '0 0 0 5px'
                },
              }, params.row.number),
            ]);
          }
        },
        {
          key: 'relationship',
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '关系'),
              h('Icon', {
                props: {
                  type: 'ios-medical'
                },
                style: {
                  color: 'red'
                }
              }),
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.relationship
                },
                on: {
                  'on-blur':(e)=> {
                    this.controls.value[params.row.number - 1].relationship = e.target.value
                  }
                }
              })
            ]);
          }
        },
        {
          key: 'name',
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '姓名'),
              h('Icon', {
                props: {
                  type: 'ios-medical'
                },
                style: {
                  color: 'red'
                },
              }),
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.name
                },
                on: {
                  'on-blur':(e)=> {
                    this.controls.value[params.row.number - 1].name = e.target.value
                  }
                }
              })
            ]);
          }
        },
        {
          key: 'job',
          renderHeader: (h, params) => {
            return h('div'), [
              h('span', '职务'),
              h('Icon', {
                props: {
                  type: 'ios-medical'
                },
                style: {
                  color: 'red'
                }
              }),
            ]
          },
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  value: params.row.job
                },
                on: {
                  'on-blur':(e)=> {
                    this.controls.value[params.row.number - 1].job = e.target.value
                  }
                }
              })
            ]);
          }
        }
      ],
			familyData: []
    }
  },
  watch: {
    controls() {
      if (!Array.isArray(this.controls.value)) {
        this.familyData = []
      } else {
        this.familyData = this.controls.value
      }
    }
  },
  methods: {
    addfamilyMember () {
      this.familyData.push({
        number: this.familyData.length + 1,
        relationship: '',
        name: '',
        job: ''
      })
      this.controls.value = this.familyData
    },
    removefamilyMember () {
      this.familyData = this.familyData.filter(item => !item.checkbox)
      this.controls.value = this.familyData
    }
  },
  created() {
    if (!Array.isArray(this.controls.value)) {
      this.familyData = []
    } else {
      this.familyData = this.controls.value
    }
  }
}
</script>
<style lang='less' scoped>
	.left{
		float:left;
	}
	.right{
		float:right
	}
</style>
