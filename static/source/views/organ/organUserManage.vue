<template>
	<div class="organ-user-manage">
		<div class="organ-user-manage__slider">
			<ul class="organ-user-manage__slider-tabs">
				<li 
					v-for="(tab, index) of tabs"
					:key="tab.text"
					@click="selectTab(index)"
					:class="{'organ-user-manage__slider-tabs--is-selected': selectIndex === index}">
					{{tab.text}}
				</li>
			</ul>
		</div>
		<div class="organ-user-manage__content">
			<component :is="type"></component>
		</div>
	</div>
</template>
<script>
import UserManage from '@/views/organ/user-manage.vue';
import RoleManage from '@/views/role/App.vue';
export default {
    name: 'OrganUserManage',
    components: {
        UserManage,
        RoleManage
    },
    data () {
        return {
            tabs: [
                {
                    text: '组织结构',
                    component: 'user-manage'
                },
                {
                    text: '权限管理',
                    component: 'role-manage'
                }
            ],
            selectIndex: 0,
            type: 'user-manage'
        };
    },
    methods: {
        selectTab (index) {
            this.selectIndex = index;
            this.type = this.tabs[index].component;
        }
    }
};
</script>
<style scoped lang="less">
	/* 整体布局样式 */
	.organ-user-manage {
		width: 100%;
		position: relative;
		&__slider {
			// position: relative;
			// top: 60px;
			width: 16.67%;
			display: flex;
			// justify-content: center;
			z-index: 1;
			position: absolute;
			top: 0;
			left: 0;
			padding: 10px;
		}

		/* tab切换样式 */
		 &__slider-tabs {
			width: 100%;
		 	display: flex;
		 	height: 32px;
		 	color: #999;
		 	font-weight: 200;
		 	background-color: rgba(201, 201, 201, 1);
		 	border-radius: 6px;
		 	cursor: pointer;
		 	>li {
		 		width: 50%;
		 		font-size: 13px;
		 		display: flex;
		 		align-items: center;
		 		justify-content: center;
				&:first-child {
					border-top-left-radius: 6px;
					border-bottom-left-radius: 6px;
				}

				&:last-child {
					border-top-right-radius: 6px;
					border-bottom-right-radius: 6px;
				}
		 	}

		 	&--is-selected {
				background-color: #2d8cf0;
				color: #fff;
		 	}
		 }

	}
</style>
