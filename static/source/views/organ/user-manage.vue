<template>
    <div class="user-manage">
        <Row :gutter="10" style="height: 100%">
            <Col span="4" class="user-manage__tree-container" justify="center">
                <Tree 
                    :data="organ"
                    :load-data="loadData"
                    :render="renderContent"
                    class="user-manage__tree-container--tree">
                </Tree>
            </Col>
            <Col 
                span="20" 
                class="user-manage__content" 
                justify="center">
                <div class="user-manage__content-head">
                    <Breadcrumb class="user-manage__content-head--breadcrumb">
                        <BreadcrumbItem
                            v-for="(breadcrumbItem, index) of breadcrumbs"
                            :key="breadcrumbItem.data.id"
                            :class="{'breadcrumb--is-current': index < breadcrumbs.length-1}"
                            @click.native.stop="selectBreadcrumb(breadcrumbItem, index)">
                           {{ breadcrumbItem.data.title }}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Button
                        v-show="isExpAccount"
                        size="small"
                        class="user-manage__content-head--edit-btn"
                        @click="openEidtOrganForm()">
                        编辑
                    </Button>
                    <!-- <Button
                      size="small"
                      icon="android-settings"
                      style="float: right; margin-left: 10px;"
                      @click="openSyncConfigModal"
                    ></Button> -->
                    <Button
                        :loading="syncLoading"
                        size="small"
                        class="user-manage__content-head--handle-sync-btn"
                        @click="syncOrgan()"
                    >同步组织机构</Button>
                </div>
                <div>
                <i-table 
                    :loading="getOrganLoading"
                    :columns="childOrgansColumns" 
                    :data="childOrgans"
                    :show-header="false"
                    @on-row-click="selectSubOrganRow"
                    class="user-manage__content--table"
                    height="200"
                    size="small">
                    <div 
                        class="user-manage__content--table-head"
                        slot="header">
                        <span>下级部门</span>
                        <span>
                            <Button
                                v-show="isExpAccount"
                                size="small"
                                @click="openAddOrganForm()">
                               添加部门
                            </Button>
                            <Button
                                size="small"
                                @click="openAdministration()">
                                分管人员
                            </Button>
                        </span>
                    </div>
                </i-table>
                </div>
                <i-table 
                    :loading="getLoading"  
                    :content="self"
                    :columns="columnsCsv" 
                    :data="csvData"
                    :show-header="false"
                    @on-row-click="selectRow"
                    class="user-manage__content--table"
                    size="small" 
                    ref="tableCsv">
                    <div 
                        class="user-manage__content--table-head"
                        slot="header">
                        <span>部门成员</span>
                        <span>
                            <Button
                                v-show="isExpAccount"
                                size="small"
                                type="primary" 
                                @click="addUserModal()">
                                新增用户
                            </Button>
                        </span>
                    </div>
                </i-table>
                <div class="user-manage__content--table-control">
                  <Page
                    ref="page"
                    class ="pull-right"
                    :total="total"
                    size="small"
                    show-elevator
                    show-sizer
                    @on-change="getUserList()"
                    @on-page-size-change="getUserList()"
                  ></Page>
                </div>
            </Col>
        </Row>
        <Modal 
            v-model="showOrganForm"
            :closable="false"
            width="500" 
            :styles="{top: '100px'}">
            <div slot="header">
                <span>{{ showOrganFormType === 1 ? '新增部门' : '编辑部门'}}</span>
                <span v-show="isExpAccount" @click="deleteOrg()" v-if="showOrganFormType !== 1" class="user-manage--delete-organ">
                    <Icon type="ios-trash-outline" />
                    <span>删除</span>
                </span>
            </div>
            <div class="user-manage--show-organ-form">
                <span @click="">部门名称</span>
                <div>
                    <Input v-model="editOrganName"></Input>
                </div>
            </div>
            <div slot="footer">
                <Button
                    v-if="showOrganFormType !== 1"
                    type="primary" 
                    @click="updateOrg()">
                    修改
                </Button>
                <Button
                    v-else
                    type="primary" 
                    @click="addOrg()">
                    确定
                </Button>
                <Button @click="showOrganForm=false">
                    取消
                </Button>
            </div>
        </Modal>
        <Modal v-model="modal2" width="1000" :styles="{top: '20px'}">
            <div slot="header" style="color:#f60; text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{ modal2Type === 1 ? '新增用户' : '修改用户'}}</span>
            </div>
            <Form  :label-width="80" >
                <Row>
                    <FormItem label="姓名" >
                        <Input 
                            v-model="userApproval.userName" 
                            style="margin-right:50px" 
                            @on-change="valueChange">   
                        </Input>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="登录名" >
                        <Input 
                            v-model="userApproval.loginName" 
                            style="margin-right:50px" 
                            @on-change="valueChange">
                        </Input>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="密码" >
                        <Input 
                            v-model="userApproval.passWord" 
                            style="margin-right:50px" 
                            @on-change="valueChange"
			    type="password">
                        </Input>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="手机" >
                        <Input 
                            v-model="userApproval.phone" 
                            style="margin-right:50px" 
                            @on-change="valueChange">
                        </Input>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="邮箱" >
                        <Input 
                            v-model="userApproval.email" 
                            style="margin-right:50px" 
                            @on-change="valueChange">
                        </Input>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="所属部门" >
                        <select-organ
                            v-if="modal2" 
                            v-model="userApproval.organId"
                            @on-change="valueChange"
                            :organName="currentSelectNode.data.title"
                        ></select-organ>
                    </FormItem>
                </Row>
                <Row>
                    <Button type="primary" style="margin-left: 80px" @click="personalFilesShow(true)">个人档案</Button>
                    <Button type="primary" @click="showSelectionDepartment()"> 设置分管部门 </Button>
                    <Button type="primary" :loading="unlockLoading" @click="unlock"> 解锁 </Button>
                </Row>
            </Form>
            <div slot="footer">
                <Button 
                    v-if="modal2Type == 1" 
                    type="primary" 
                    @click="handleSubmit(userApproval)">
                    新增
                </Button>
                <Button 
                    v-show="isExpAccount"
                    v-if="modal2Type === 2" 
                    type="primary" 
                    @click="updateUser(userApproval)">
                    修改
                </Button>
                <Button
                    v-show="isExpAccount"
                    v-if="modal2Type === 2" 
                    type="error"
                    ghost
                    style="margin-left: 8px" 
                    @click="deleteUser(userApproval)">
                    删除
                </Button>
                <Button 
                    type="ghost" 
                    style="margin-left: 8px" 
                    @click="close()">
                    取消
                </Button>
            </div>
        </Modal>
        <!-- <personalFiles :show="filesShow" @personalFilesShow="personalFilesShow" :information="personalFilesData" :spinShow="spinShow"/> -->
        <newPersonalFiles :show="filesShow" @personalFilesShow="personalFilesShow" :information="personalFilesData" :spinShow="spinShow" :id="userApproval.id"/>
        <Modal
            v-model="exhaust"
            title="组织机构表格">
            <Upload
                :action="updateLoadeUrl"
                :before-upload="handleUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :with-credentials="true"
                :show-upload-list="false"
                name="fileToUpload"
                style="display:inline-block">
                <Button v-if="!uploadLoading" style="margin-right:20px"> 点击上传组织机构文件（.xlsx .xls） </Button>
                <Button type="primary" loading v-if="uploadLoading"> 正在导入。。。 </Button>
            </Upload>
            <Button type="info" v-if="!uploadLoading">
                <a :href="formTemplate" style="color:#fff"> 点击下载 </a>
            </Button>
            <div slot="footer">
            </div>
        </Modal>
        <Modal
            v-model="selectionDepartment"
            title="分管部门"
            :mask-closable="false"
            @on-visible-change="changeSelectionDepartment"
            class-name="selection-department"
            width="500px">
            <div class="user">
                <span> 成员 </span>
                <span> {{ userApproval.userName }} </span>
            </div>
            <div class="checked" @click.stop="goSelect">
                <div class="department-title"> 分管部门 </div>
                <div class="department-show">
                    <span
                        v-for="(item, index) in masterOrganList"
                        :key="index"
                        @click.stop="removeDepartment(item.id)">
                        {{ item.name }}
                    </span>
                    <div
                        v-if="!masterOrganList.length"
                        style="text-align:center;color:#aaa;width:100%;padding-bottom:10px;">
                        点击添加部门
                    </div>
                </div>
                <div class="department-add" v-if="departmentListShow">
                    <Tree
                        :data="selectionOrgan"
                        :render="renderOrgan"
                        :load-data="loadData"></Tree>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="updateOrganMaster(userApproval)" :loading="organLoading">
                    保存
                </Button>
                <Button @click="closeSelectionDepartment">
                    取消
                </Button>
            </div>
        </Modal>
        <OrganSyncConfig ref="organSyncConfig"></OrganSyncConfig>
        <Administration :show="administrationShow" :close="closeAdministration" :organId="selectTreeNode.data.id" v-if="administrationShow"/>
    </div>
</template>
<script>
import { dataFormat } from '@/util/assist.js';
import axios from 'axios'
import Cookies from 'js-cookie';
import userReq from '@/api/user.js';
import organReq from '@/api/organ.js';
import HTTP from '@/api/work-flow.js'
import selectOrgan from '@/views/organ/selectOrgan.vue';
import personalFiles from './user-manage/personalFiles';
import newPersonalFiles from './user-manage/newPersonalFiles';
import Administration from './components/administration';
import OrganSyncConfig from './components/organ-sync-config.vue';
import documentReq from '@/api/document.js'
export default {
    name: 'user-manage',
    components: {
        selectOrgan,
        personalFiles,
        newPersonalFiles,
        OrganSyncConfig,
        Administration
    },
    data () {
        return {
            self: this,
            modal2: false,
            userName: '',
            Cookies: Cookies,
            editOrganName: '总部',
            totalStaffNum: 0,
            oldOrganId: '',
            showOrganForm: false,
            showOrganFormType: 1,
            // 暂时写死
            selectOrg: {
                id: this.$store.state.user.companyId,
                name: '总部'
            },
            childOrgansColumns: [
                {
                    title: '部门',
                    key: 'title'
                },
                {
                    title: '人数',
                    key: 'staffNum',
                    render: (h, params) => {
                        return h('div', [
                            `${params.row.staffNum}人`,
                            h('Icon', {
                                style: {
                                    marginLeft: '5px'
                                },
                                props: {
                                    type: 'person'
                                }
                            }),
                        ]);
                    },
                    className: 'child-organ-column'
                }
            ],
            childOrgans: [],
            selectTreeNode: {
                root: null,
                node: null,
                data: null
            },
            breadcrumbs: [],
            columnsCsv: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    'title': '姓名',
                    'key': 'userName'
                },
                {
                    'title': '手机',
                    'key': 'phone'
                },
                {
                    'title': '邮箱',
                    'key': 'email'
                },
                {
                    'title': '工号',
                    'key': 'jobNumber'
                },
                {
                    'title': '职级',
                    'key': 'isManager',
                    render: (h, params) => {
                        let text = params.row.isManager ? '主管' : ''
                        return text ? h('span', [
                                text
                            ]) : null
                    }
                }
            ],
            selectionDepartment: false,
            departmentListShow: false,
            selectionOrgan: [
                {
                    title: '总部门',
                    expand: false,
                    active: false,
                    loading: false,
                    id: this.$store.state.user.companyId,
                    children: []
                }
            ],
            userApproval: {
                userName: '',
                loginName: '',
                phone: '',
                email: '',
                passWord: '',
                organId: '',
                masterOrganList: [],
                masterOrganIdList: []
            },
            modal2Type: '',
            csvData: [],
            total: 40,
            selectMinRow: 1,
            selectMinCol: 1,
            minRow: 1,
            minCol: 1,
            fontSize: 16,
            getLoading: false,
            unlockLoading: false,
            getOrganLoading: false,
            syncLoading: false,
            initTreeFlag: false,
            filesShow: false,
            spinShow: false,
            personalFilesData: {}, // 个人档案信息
            organ: [
                {
                    title: '总部门',
                    expand: false,
                    render: (h, { root, node, data }) => {
                        if (!this.initTreeFlag) {
                            this.selectOrgCb(root, node, data);
                            this.initTreeFlag = true;
                        }
                        let fontColor = this.currentSelectNode.data.id === data.id ? '#118EE9' : '';
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '80%',
                                color: fontColor
                            }
                        }, [
                            h('span',[
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline'
                                    },
                                    style: {
                                        marginRight: '8px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            // 获取选中的树节点相关信息
                                            this.selectOrgCb(root, node, data);
                                            this.editOrganName = data.title;
                                        }
                                    }
                                }, data.title),
                                h('span', {
                                    style: {
                                        marginLeft: '5px'
                                    }
                                }, `(${this.totalStaffNum}人)`)
                            ])
                        ]);
                    },
                    loading: false,
                    id: this.$store.state.user.companyId,
                    children: []
                }
            ],
            buttonProps: {
                type: 'ghost',
                size: 'small'
            },
            deleteOrgIng: false, // 删除中。。。
            addOrgIng: false, // 添加部门中。。。
            exhaust: false,
            updateLoadeUrl: '',
            uploadLoading: false,
            formTemplate: '',
            masterOrganList: [],
            masterOrganIdList: [],
            organLoading: false,
            administrationShow: false,
            isExpAccount:window.isExpAccount,//是否是体验版
        };
    },
    watch: {
        exhaust() {
            if (!this.exhaust) {
                this.syncLoading = false;
            }
        }
    },
    methods: {
        renderContent (h, { root, node, data }) {
            // 设置选中的样式
            let fontColor = this.currentSelectNode.data.id === data.id ? '#118EE9' : '';
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '80%',
                    color: fontColor
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', {
                        style: {
                            cursor: 'pointer'
                        },
                        on: {
                            click: () => {
                                this.selectOrgCb(root, node, data);
                                this.editOrganName = data.title;
                            }
                        }
                    }, data.title),
                    h('span', {
                        style: {
                            marginLeft: '5px'
                        }
                    }, `(${data.staffNum}人)`)
                ])
            ]);
        },
        renderOrgan (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '80%'
                }
            }, [
                h('span',[
                    h('Checkbox', {
                        props: {
                            size: 'small',
                            value: this.masterOrganList.some(ite => data.id === ite.id)
                        },
                        style: {
                            lineHeight: '20px'
                        },
                        on: {
                            'on-change': () => {
                                if (!this.masterOrganList.some(ite => data.id === ite.id)) {
                                    this.masterOrganList.push({
                                        name: data.title,
                                        id: data.id
                                    })
                                    this.masterOrganIdList.push(data.id)
                                } else {
                                    this.masterOrganList = this.masterOrganList.filter(item => item.id !== data.id)
                                    this.masterOrganIdList = this.masterOrganIdList.filter(item => item !== data.id)
                                }
                            }
                        }
                    }, data.title)
                ])
            ]); 
        },
        remove (root, node, data) {
            console.log(data.id)
            organReq.delete(data.id).then(res => {
                if (res.code === '0') {
                    this.$Message.info('删除部门成功');
                } else {
                    this.$Message.error('删除部门失败');
                }
            }).then(() => {
                let targetNode = root.find(el => el === node);
                if (targetNode) {
                    const parentKey = targetNode.parent;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);
                }
                // 更新面包屑数据
                this.breadcrumbs.pop();
                this.deleteOrgIng = false;
            }).catch((err) => {
                console.error(err);
                this.$Message.error('删除部门失败');
            }).finally(() => {
                this.showOrganForm = false;
            });
        },
        valueChange () {
            var obj = this;
            this.$emit('value', obj.formValidate);
        },
        getAllUserList () {
            this.getUserList({id: this.$store.state.user.companyId});
        },
        getUserList (extPar) {
            this.getLoading = true;
            // 默认为获取根组织下所有的员工
            extPar && (this.selectOrg = extPar);
            let params = {};
            params.organId = this.selectOrg.id;
            params.pageNum = (this.$refs.page && this.$refs.page.currentPage) || 1;
            params.pageSize = (this.$refs.page && this.$refs.page.currentPageSize) || 10;
            userReq.getUserList(params).then(res => {
                this.total = res.page.total;
                this.csvData = res.page.result;
                this.loading = true;
            }).catch(err => {
                console.error(err);
                this.$Message.error('This is an error');
            }).finally(() => {
                this.getLoading = false;
            });
        },
        addUserModal () {
            this.modal2 = true;
            this.masterOrganList = []
            this.masterOrganIdList = []
            this.modal2Type = 1;
            this.userApproval = {
                userName: '',
                loginName: '',
                phone: '',
                email: '',
                passWord: '',
                organId: '',
                masterOrganList: [],
                masterOrganIdList: []
            };
            this.userApproval.organId = this.currentSelectNode.data.id;
        },
        deleteUser (user) {
            userReq.delete({id: user.id}).then(res => {
                if (res.code === '0') {
                    this.$Message.info('删除成功');
                } else {
                    this.$Message.error(res.msg);
                }
            }).catch(err => {
                console.error(err);
                this.$Message.error('This is an error');
            }).finally(() => {
                this.getUserList(this.selectOrg);
                this.close();
            });
        },
        editUser (id) {
            this.modal2 = true;
            this.modal2Type = 2;
            userReq.detail({id: id}).then(res => {
                this.oldOrganId = res.user.organId
                res.user.masterOrganList = res.user.masterOrganList ? res.user.masterOrganList : []
                res.user.masterOrganIdList = res.user.masterOrganIdList ? res.user.masterOrganIdList : []
                this.masterOrganList = [...res.user.masterOrganList]
                this.masterOrganIdList = [...res.user.masterOrganIdList]
                this.userApproval = res.user;
            }).catch(err => {
                console.error(err);
                this.$Message.error('This is an error');
            }).finally(() => {
                this.getUserList(this.selectOrg);
            });
        },
        updateOrganMaster(param) {
            this.organLoading = true
            var data = {...param}
            data.oldOrganId = this.oldOrganId
            data.createTime = undefined;
            data.updateTime = undefined;
            data.masterOrganIdList = [...this.masterOrganIdList]
            data.masterOrganList = []
            userReq.updateOrganMaster(data).then(res => {
                if (res.code === '0') {
                    this.selectionDepartment = false
                    this.userApproval.masterOrganList = [...this.masterOrganList]
                    this.userApproval.masterOrganIdList = [...this.masterOrganIdList]
                    this.$Message.info('保存成功');
                } else {
                    this.$Message.error(res.msg);
                }
            }).catch(err => {
                console.error(err);
                this.$Message.error('This is an error');
            }).finally(() => {
                this.organLoading = false
            });
        },
        updateUser (param) {
            var data = {...param}
            data.oldOrganId = this.oldOrganId
            data.createTime = undefined;
            data.updateTime = undefined;
            data.masterOrganIdList = [...this.masterOrganIdList]
            data.masterOrganList = []
            userReq.update(data).then(res => {
                if (res.code === '0') {
                    // this.$Message.info('修改成功');
                    this.getUserList(this.selectOrg);
                } else {
                    this.$Message.error(res.msg);
                }
            }).catch(err => {
                console.error(err);
                this.$Message.error('This is an error');
            }).finally(() => {
                this.getUserList(this.selectOrg);
                this.close();
            });
        },
        syncOrgan () {
            this.syncLoading = true;
            HTTP.companyDetail({companyId:this.$store.state.user.companyId}).then(res => {
                var data = JSON.parse(res.company.data)
                if (data.type === '2') {
                // if (true) {
                    this.exhaust = true
                } else {
                    organReq.syncOrgan().then(res => {
                        if (res.code === '0') {
                            this.getAllUserList();
                            this.loadData({id: this.$store.state.user.companyId}, (result) => {
                                this.organ[0].children = result;
                            });
                            this.$Message.success(res.msg);
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).catch(err => {
                        console.error(err);
                        this.$Message.error('同步组织数据失败！');
                    }).finally(() => {
                        this.syncLoading = false;
                        this.close();
                    });
                }
            })
        },
        handleUpload(file) {
            this.uploadLoading = true
            var type = file.name.match(/[a-zA-Z]*$/)[0]
            var arr = ['xlsx', 'xls']
            if (arr.indexOf(type) < 0) {
                this.$Message.error('请上传文件类型是.xlsx或者.xls的');
                this.uploadLoading = false
                return false;
            }
        },
        uploadSuccess(res) {
            if (res.code === '0') {
                this.exhaust = false
                this.$Message.success(res.msg);
            } else {
                this.$Message.error(res.msg);
            }
            this.uploadLoading = false
        },
        uploadError(res) {
            this.$Message.error(res.msg);
            this.uploadLoading = false
        },
        handleSubmit (param) {
            userReq.saveUser(param).then(res => {
                if (res.code === '0') {
                    this.$Message.info('新增成功');
                    this.getUserList(this.selectOrg);
                    // this.getAllUserList();
                    this.close();
                } else {
                    this.$Message.error(res.msg);
                }
            }).catch(err => {
                console.log(err);
                this.$Message.error('This is an error');
            }).finally(() => {
            });
        },
        close () {
            this.modal2 = false;
        },
        loadData (item, callback) {
            let param = {
                pid: item.id,
                needNum: 'true'
            };
            organReq.getChildList(param).then(res => {
                let organList = res.page.result;
                if (res.page.total === '0') {
                    delete item.children;
                }
                let childList = [];
                organList.forEach(function (item) {
                    let child = {
                        title: item.name,
                        id: item.id,
                        staffNum: item.staffNum
                    };
                    if (item.HasChild === true) {
                        child.loading = false;
                        child.children = [];
                    }
                    childList.push(child);
                });
                // this.$set(item, 'loading', false);
                // this.$set(item, 'expand', true);
                // this.$set(item, 'children', childList);
                callback(childList);
            }).catch(err => {
                console.log(err);
            });
        },
        openEidtOrganForm () {
            // 设置编辑框为子部门
            this.editOrganName = this.currentSelectNode.data.title;
            this.showOrganForm = true;
            this.showOrganFormType = 0;
        },
        openAddOrganForm () {
            this.editOrganName = '';
            this.showOrganForm = true;
            this.showOrganFormType = 1;
        },
        openAdministration () {
            this.administrationShow = true
        },
        closeAdministration () {
            this.administrationShow = false
        },
        updateOrg () {
            organReq.update({
                id: this.selectOrg.id,
                name: this.editOrganName
            }).then(res => {
                // 更新数据
                if (res.code === '0') {
                    this.selectTreeNode.node.node.title = this.editOrganName;
                    this.selectTreeNode.data.title = this.editOrganName;
                    this.$Message.info('更新组织成功');
                } else {
                    this.$Message.error('更新组织失败');
                }
            }).catch((data) => {
                this.$Message.error('更新组织失败');
            }).finally(() => {
                this.showOrganForm = false;
            });
        },
        deleteOrg () {
            if (!this.deleteOrgIng) {
                this.deleteOrgIng = true
                console.log('执行删除请求')
                this.remove(
                    this.selectTreeNode.root,
                    this.selectTreeNode.node,
                    this.selectTreeNode.data
                );
            }
        },
        addOrg () {
            if (this.addOrgIng) return
            this.addOrgIng = true
            let data = this.selectTreeNode.data;
            var children = data.children;
            organReq.addOrgan({
                name: this.editOrganName,
                parentId: data.id,
                parentName: data.title
            }).then(res => {
                if (res.code === '0') {
                    this.$Message.info('新增组织成功');
                } else {
                    this.$Message.error('新增组织失败');
                }
                return res.id;
            }).then((id) => {
                if (!id) return
                var addChild = {
                    title: this.editOrganName,
                    id: id,
                    expand: true,
                    staffNum: 0,
                    children: [],
                    HasChild: ''
                };
                if (!children || children.length === 0) {
                    this.loadData(data, result => {
                        children = result;
                        this.$set(data, 'children', children);
                        this.$set(data, 'expand', true);
                    });
                } else {
                    children.push(addChild);
                    this.$set(data, 'children', children);
                    this.$set(data, 'expand', true);
                }
                 // 刷新子部门数据
                this.loadData(data, (childOrgans) => {
                    this.childOrgans = childOrgans;
                });
                this.addOrgIng = false
            }).catch(() => {
                this.$Message.error('新增组织失败');
            }).finally(() => {
                this.showOrganForm = false;
            });
        },
        selectBreadcrumb (nodeData, index) {
            if (index === this.breadcrumbs.length - 1) {
                return
            }
            this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
            this.selectOrgCb(nodeData.root, nodeData.node, nodeData.data, true);
        },
        selectOrgCb (root, node, data, flag) {
            this.selectTreeNode.root = root;
            this.selectTreeNode.node = node;
            this.selectTreeNode.data = data;
            // 计算面包屑数据
            if (!flag) {
                this.breadcrumbs = this.getParentNodes(root, node);
            }
            // 得到组织下用户
            this.getUserList(data);
            // 加载子部门数据
            this.getOrganLoading = true;
            this.loadData(data, childOrgans => {
                this.getOrganLoading = false;
                this.childOrgans = childOrgans;
            });
        },
        // 得到当前节点父节点数据
        getParentNodes (root, targetNode) {
            let rst = [];
            let index = root.findIndex(node => node.nodeKey === targetNode.nodeKey);
            index > -1 && (rst.unshift({
                root,
                node: targetNode,
                data: targetNode.node
            }));
            while (index > -1) {
                if (root[index].nodeKey === targetNode.parent) {
                    targetNode = root[index];
                    rst.unshift({
                        root,
                        node: targetNode,
                        data: targetNode.node
                    });
                }
                index--;
            }
            return rst;
        },
        // 选中当前子部门时触发
        selectSubOrganRow (subOrgan, index) {
            // 计算本地key
            subOrgan.nodeKey = this.selectTreeNode.data.nodeKey + index + 1;
            let root = this.selectTreeNode.root;
            let node = {
                        children: [],
                        node: subOrgan
                    };
            let data =  subOrgan;
            this.breadcrumbs.push({
                    root,
                    node,
                    data
                });
            // 触发选择子菜单组件
            this.selectOrgCb(
                root,
                node,
                data,
                true
            );
        },
        selectRow (user, index) {
            this.editUser(user.id);
        },
        async getAllOrganstaffNum () {
            try {
                let res =  await organReq.queryAllOrganStaffNum({
                    organId: this.$store.state.user.companyId
                });
                this.totalStaffNum = res.staffNum;
            } catch (e) {
                console.error(e);
            }
        },
        personalFilesShow (boo) {
            this.filesShow = boo
            this.spinShow = boo
            // if (boo) {
            //     organReq.detail(this.userApproval.id).then(res => {
            //         let sta = res.staffRecord
            //         if (!sta) {
            //             this.personalFilesData = {
            //                 userId: this.userApproval.id,
            //                 userName: this.userApproval.userName,
            //                 organName: this.currentSelectNode.data.title,
            //                 contractFile: [],
            //                 resumeFile: [],
            //                 familyData: []
            //             }
            //         } else {
            //             sta.resumeFile = sta.resumeFile ? JSON.parse(sta.resumeFile) : []
            //             sta.contractFile = sta.contractFile ? JSON.parse(sta.contractFile) : []
            //             sta.familyData = sta.familyData ? JSON.parse(sta.familyData) : []
            //             sta.familyData.forEach((item, index) => {
            //                 item.number = index + 1
            //                 item.checkbox = false
            //             })
            //             sta.ajustTime = sta.ajustTime ? new Date(sta.ajustTime) : ''
            //             sta.birthTime = sta.birthTime ? new Date(sta.birthTime) : ''
            //             sta.contractTime = sta.contractTime ? new Date(res.staffRecord.contractTime) : ''
            //             sta.contractCurrentTime = sta.contractCurrentTime ? new Date(sta.contractCurrentTime) : ''
            //             sta.entryTime = sta.entryTime ? new Date(sta.entryTime) : ''
            //             sta.turnTime = sta.turnTime ? new Date(sta.turnTime) : ''
            //             sta.leaveTime = sta.leaveTime ? new Date(sta.leaveTime) : ''
            //             res.staffRecord.organName = this.currentSelectNode.data.title
            //             this.personalFilesData = res.staffRecord
            //         }
            //     }).catch((data) => {
            //         console.log(data)
            //         this.$Message.error(data);
            //     }).finally(() => {
            //         this.spinShow = false
            //     });
            // }
            if (boo) {
                organReq.dynamicDetail(this.userApproval.id).then(res => {
                    if (!res.data) {
                        organReq.detail(this.userApproval.id).then(detail => {
                            let sta = detail.staffRecord
                            var personalFilesData = {}
                            if (sta) {
                                personalFilesData = sta
                            }
                            var userInfor = {
                                basicInformation: {
                                    title: '基本信息',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsInput', displayName: '员工姓名', style: 'short-input', placeHolder: '', columnName:"user_name", isHidden: false, isRequired: true},
                                        {type: 'controlsInput', displayName: '工号', style: 'short-input', placeHolder: '', columnName:"job_number", isHidden: false},
                                        {type: 'controlsInput', displayName: '所属部门', style: 'short-input', placeHolder: '', isHidden: false, isRequired: true, columnName:"organ_name"},
                                        {type: 'controlsInput', displayName: '岗位', style: 'short-input', placeHolder: '', isHidden: false, isRequired: true, columnName:"job"},
                                        {type: 'controlsDate', displayName: '调整日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false, columnName:"ajust_time"},
                                        {type: 'controlsInput', displayName: '当前月薪', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"month_salary"},
                                        {type: 'controlsSelect', displayName: '在职状态', optionalValue: [{value: '1option', label: '在职'},{value: '2option', label: '离职'}], isRequired: true, isHidden: false, columnName:"status"},
                                    ]
                                },
                                identityInformation: {
                                    title: '身份信息',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsInput', displayName: '身份证号', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"id_card_number"},
                                        {type: 'controlsSelect', displayName: '性别', optionalValue: [{ value: '1option', label: '男' },{ value: '2option', label: '女' },], isRequired: true, isHidden: false, columnName:"gender"},
                                        {type: 'controlsInput', displayName: '籍贯', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"native_place"},
                                        {type: 'controlsInput', displayName: '民族', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"nation"},
                                        {type: 'controlsSelect', displayName: '婚姻', optionalValue: [{ value: '1option', label: '未婚' },{ value: '2option', label: '已婚' }], isRequired: true, isHidden: false, columnName:"marriage_status"},
                                        {type: 'controlsDate', displayName: '出生日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false, columnName:"birth_time"},
                                        {type: 'controlsInput', displayName: '身份证地址', style: 'long-input', placeHolder: '', isHidden: false, columnName:"id_card_address"},
                                        {type: 'controlsInput', displayName: '现地址', style: 'long-input', placeHolder: '', isHidden: false, columnName:"current_address"},
                                    ]
                                },
                                educationalInformation: {
                                    title: '教育信息',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsInput', displayName: '毕业院校', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"academy"},
                                        {type: 'controlsSelect', displayName: '学历', optionalValue: [{ value: '1option', label: '高中' },{ value: '2option', label: '大专' },{ value: '3option', label: '本科' },{ value: '4option', label: '硕士' },{ value: '5option', label: '博士' },], isRequired: true, isHidden: false, columnName:"education"},
                                        {type: 'controlsInput', displayName: '专业', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"major"},
                                        {type: 'controlsSelect', displayName: '学历来源', optionalValue: [{ value: '1option', label: '学信网' }], isHidden: false, columnName:"education_source"},
                                    ]
                                },
                                contaInformation: {
                                    title: '联系信息',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsInput', displayName: '紧急联系人', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"emergency_contact"},
                                        {type: 'controlsInput', displayName: '紧急联系人关系', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"emergency_contact_relation"}
                                    ]
                                },
                                memberFamily: {
                                    title: '家庭成员',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsTable', displayName: '家庭成员信息', style: 'long-input', isRequired: true, isHidden: false, columnName:"family_data"}
                                    ]
                                },
                                contractInformation: {
                                    title: '合同信息',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsRadio', displayName: '合同类型', style: 'long-input', isRequired: true, isHidden: false, columnName:"contract_type"},
                                        {type: 'controlsDate', displayName: '签订日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"contract_time"},
                                        {type: 'controlsInput', displayName: '试用期', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"probation_period"},
                                        {type: 'controlsDate', displayName: '最新签订日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"contract_current_time"},
                                        {type: 'controlsInput', displayName: '试用月薪', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"probation_salary"},
                                        {type: 'controlsInput', displayName: '转正月薪', style: 'short-input', placeHolder: '', isRequired: true, isHidden: false, columnName:"regular_salary"},
                                        {type: 'controlsTextarea', displayName: '当前奖金方案', style: 'long-input', placeHolder: '', isHidden: false, columnName:"bonus_scheme"},
                                        {type: 'controlsFile', displayName: '合同信息', style: 'long-input', placeHolder: '', isHidden: false, columnName:"contract_file"},
                                    ]
                                },
                                entryIntoThePost: {
                                    title: '入职转正',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsDate', displayName: '入职日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"entry_time"},
                                        {type: 'controlsDate', displayName: '转正日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isRequired: true, isHidden: false, columnName:"turn_time"},
                                    ]
                                },
                                leavingInformation: {
                                    title: '离职原因',
                                    isHidden: false,
                                    controls: [
                                        {type: 'controlsDate', displayName: '离职日期', placeHolder: '年-月-日', format: 'yyyy-MM-dd', isHidden: false, columnName:"leave_time"},
                                        {type: 'controlsTextarea', displayName: '离职原因', style: 'long-input', placeHolder: '', isHidden: false, columnName:"leave_reason"},
                                    ]
                                },
                                additionalInformation: {
                                    title: '附加信息',
                                    isHidden: false,
                                    showFile: true,
                                    controls: [
                                        {type: 'controlsFile', displayName: '详细简历附件', style: 'long-input', placeHolder: '', isHidden: false, columnName:"resume_file"},
                                        {type: 'controlsTextarea', displayName: '附加说明', style: 'long-input', placeHolder: '', isHidden: false, columnName:"additional_information"},
                                    ]
                                }
                            }
                            Object.keys(userInfor).forEach(item => {
                                userInfor[item].controls = userInfor[item].controls.filter(ite => {
                                    var name = ite.columnName.replace(/\_(\w)/g, function(all, letter){
                                        return letter.toUpperCase();
                                    });
                                    if (personalFilesData[name]) {
                                        ite.value = personalFilesData[name]
                                        return ite
                                    } else {
                                        return ite
                                    }
                                })
                            })
                            Object.keys(userInfor).forEach(item => {
                                userInfor[item].controls = userInfor[item].controls.map(ite => {
                                    if (ite.type === 'controlsFile' || ite.type === 'controlsTable') {
                                        return {
                                            ...ite,
                                            value: ite.value ? JSON.parse(ite.value) : []
                                        }
                                    }  else if (ite.columnName === 'user_name') {
                                        ite.value = this.userApproval.userName
                                        return ite
                                    } else if (ite.columnName === 'organ_name') {
                                        ite.value = this.currentSelectNode.data.title
                                        return ite
                                    } else {
                                        return ite
                                    }
                                })
                            })
                            this.personalFilesData = userInfor
                        })
                    } else {
                        Object.keys(res.data).forEach(item => {
                            res.data[item].controls = res.data[item].controls.map(ite => {
                                if (ite.type === 'controlsSelect') {
                                    return  {
                                        ...ite,
                                        optionalValue: ite.optionalValue ? JSON.parse(ite.optionalValue) : []
                                    }
                                } else if (ite.type === 'controlsFile' || ite.type === 'controlsTable') {
                                    return {
                                        ...ite,
                                        value: ite.value ? JSON.parse(ite.value) : []
                                    }
                                }  else if (ite.columnName === 'user_name') {
                                    ite.value = this.userApproval.userName
                                    return ite
                                } else if (ite.columnName === 'organ_name') {
                                    ite.value = this.currentSelectNode.data.title
                                    return ite
                                } else {
                                    return ite
                                }
                            })
                        })
                        this.personalFilesData = res.data
                    }
                }).catch((data) => {
                    console.log(data)
                    this.$Message.error(data);
                }).finally(() => {
                    this.spinShow = false
                });
            }
        },
        removeDepartment(id) {
            this.masterOrganList = this.masterOrganList.filter(item => item.id !== id)
            this.masterOrganIdList = this.masterOrganIdList.filter(item => item !== id)
        },
        goSelect() {
            this.departmentListShow = true
        },
        showSelectionDepartment() {
            this.selectionDepartment = true
        },
        closeSelectionDepartment() {
            this.selectionDepartment = false
            this.masterOrganList = [...this.userApproval.masterOrganList]
            this.masterOrganIdList = [...this.userApproval.masterOrganIdList]
        },
        changeSelectionDepartment(boo) {
            if (!boo) {
                this.masterOrganList = [...this.userApproval.masterOrganList]
                this.masterOrganIdList = [...this.userApproval.masterOrganIdList]
            }
        },
        openSyncConfigModal() {
            this.$refs.organSyncConfig.show();
        },
        unlock() {
          this.unlockLoading = true
          var params = {
            loginName: this.userApproval.loginName,
            companyId: this.$store.state.user.companyId
          }
          organReq.unlockLogin(params).then(data => {
            if (data.code === '0') {
              this.$Message.success('解锁成功')
            } else {
              this.$Message.error('解锁失败')
            }
            this.unlockLoading = false
          })
        }
    },
    mounted () {
        this.getAllOrganstaffNum();
        this.getAllUserList();
        this.loadData({id: this.$store.state.user.companyId}, (result) => {
            this.organ[0].children = result;
        });
    },
    created() {
        this.updateLoadeUrl = `${axios.defaults.baseURL}/organ/importOrgan`
        this.formTemplate = `${axios.defaults.baseURL}/organ/formTemplate`
        document.onclick = () => {
            this.departmentListShow = false
        }
    },
    computed: {
        colNum: function () {
            // `this` 指向 vm 实例
            return this.columnsCsv.length;
        },
        rowNum: function () {
            // `this` 指向 vm 实例
            return this.csvData.length;
        },
        selectMaxCol: function () {
            return this.columnsCsv.length;
        },
        selectMaxRow: function () {
            // `this` 指向 vm 实例
            return this.csvData.length;
        },
        maxCol: function () {
            return this.columnsCsv.length;
        },
        maxRow: function () {
            // `this` 指向 vm 实例
            return this.csvData.length;
        },
        currentSelectNode: function () {
            return this.breadcrumbs[this.breadcrumbs.length - 1];
        }
    }
};
</script>

<style lang="less" scoped>
    @import '../../styles/common.less';
    @import 'components/table.less';
    .user-manage {
        height: calc(88vh);
        &__tree-container {
           margin-top: 100px;
           padding-left: 20px;
           height: 100%;
           overflow: auto;
           &--tree {
             margin-left: 20px;
           }
        }

        &--delete-organ {
            color: red;
            float: right;
            >span {
                margin-left: 8px;
            }
        }

        &--show-organ-form {
            display: flex;
            align-items: center;
            padding: 15px 0 25px 0;
            >span {
                margin-right: 8px;
            }
             >div {
                position: relative;
                flex-grow: 1;
            }
        }

        &__content {
            min-height: 120%;
            border-left: 1px solid #dddee1;
            padding: 60px 40px 60px 40px !important;
            &--table {
                margin-top: 20px;
            }

            &--table-control {
                margin-top: 20px;
                overflow: hidden;
            }

            &--table-head {
                display: flex;
                align-items: center;
                background-color: rgba(242, 242, 242, 1);
                height: 39px;
                >span {
                    margin-left: 18px;
                }
            }
        }

        &__content-head {
            overflow: hidden;
            &--breadcrumb {
                float: left;
            }
            &--edit-btn {
                margin-left: 20px;
               /deep/ span {
                 font-size: 13px;
               }  
            }
            &--handle-sync-btn {
               /deep/ span {
                 font-size: 13px;
               } 
                float: right;
            }
        }
    }
    .user-manage--delete-organ{
        cursor: pointer;
    }
    .breadcrumb--is-current {
        color: #0066FF;
    }
    .selection-department{
        .user{
            margin-bottom:20px;
            span{
                padding-left: 44px;
            }
        }
        .checked{
            position: relative;
            cursor: pointer;
            &:after{
                display:block;
                clear:both;
                content:"";
                visibility:hidden;
                height:0
            }
            .department-title{
                float: left;
                width:70px;
                text-align: right
            }
            .department-show{
                float: left;
                width: 340px;
                margin-left: 45px;
                margin-bottom: 10px;
                padding: 10px;
                padding-bottom:0;
                border: 1px dashed #ccc;
                display: flex;
                flex-wrap: wrap;
                >span{
                    padding: 5px 10px;
                    padding-right:20px;
                    background: #DEF1FF;
                    border-radius: 5px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    cursor: pointer;
                    &::after{
                        content: 'x'
                    }
                }
            }
            .department-add{
                position: absolute;
                width: 340px;
                max-height: 300px;
                overflow-y: scroll;
                border: 1px solid #ccc;
                cursor: pointer;
                padding: 0 10px;
                background: #fff;
                right: 13px;
                top: calc(~'100% - 10px');
            }
        }
    }
</style>
<style>
    .ivu-table .child-organ-column {
        text-align: right;
    }
    .ivu-table-title {
        height: 39px !important;
    }
</style>
