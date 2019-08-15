<template>
    <div class="full-screen-btn-con">
            <Dropdown>
                <a>
                    <Icon type="cube" :size="23" style="color:black!important"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem><Button type="text" @click="goAppManager()">应用管理</Button></DropdownItem>
                    <DropdownItem><Button type="text" @click="gotoPage('people-manage')">组织机构</Button></DropdownItem>
                    <DropdownItem><Button type="text" @click="gotoPage('roleIndex')">权限管理</Button></DropdownItem>
                </DropdownMenu>
            </Dropdown>
    </div>
</template>

<script>
export default {
    name: 'fullScreen',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        showFullScreenBtn () {
            return window.navigator.userAgent.indexOf('MSIE') < 0;
        }

    },
    methods: {
        goAppManager(){
          this.$router.push({
              name: 'workflow-design'
          });
        },
        gotoPage(value){
              this.$router.push({
                  name: value
              });
        }
      }
};
</script>
