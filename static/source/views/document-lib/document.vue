<template>
    <div class="user-manage">
        <div class="user-manage-content">
          <Row :gutter="10" style="height: 100%">
            <Col span="4" class="user-manage__tree-container" justify="center">
            <Tree :data="fileTreeData" :load-data="loadNodeData" :render="fileRenderContent" class="user-manage__tree-container--tree">
            </Tree>
            </Col>
            <Col span="20" class="user-manage__content" justify="center">
              <div>
                  <Row :gutter="96" type="flex" justify="space-between" class="code-row-bg">
                      <Col span="2">
                      <Tooltip content="提示：先点击选择左侧文件夹" placement="bottom-start">
                          <Upload multiple ref="upload" :data="upLoadFileRequest" :action="uploadUrl" :show-upload-list="false" :before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" :on-error="handleUploadError" class="document-operate">
                              <Button :disabled="upLoadDisabled" type="primary" icon="ios-cloud-upload-outline">
                                  上传
                              </Button>
                          </Upload>
                      </Tooltip>
                      </Col>
                      <Col span="2">
                      <Tooltip content="新建文件夹" placement="bottom-start">
                          <Button :disabled="addFolderDisabled" size="small" type="primary" icon="ios-folder-outline" @click="openAddFolder()" class="document-operate">
                              新建文件夹
                          </Button>
                      </Tooltip>
                      </Col>
                      <Col span="2">
                      <Tooltip content="批量删除文件" placement="bottom-start">
                          <Button :disabled="deleteDisabled" size="small" type="error" icon="trash-a" @click="openDeleteFolder()" class="document-operate">
                              删 除
                          </Button>
                      </Tooltip>
                      </Col>
                      <Col span="2">
                      <Tooltip content="文件或文件夹重命名" placement="bottom-start">
                          <Button :disabled="reNameDisabled" size="small" type="primary" icon="edit" @click="openRenameFolder()" class="document-operate">
                              重命名
                          </Button>
                      </Tooltip>
                      </Col>
                      <Col span="2">
                      <Tooltip content="文件夹权限设置" placement="bottom-start">
                          <Button :disabled="setPermissionDisabled" size="small" type="primary" icon="ios-gear-outline" @click="openSetPermission()" class="document-operate">
                              权限设置
                          </Button>
                      </Tooltip>
                      </Col>
                      <Col span="2">
                      <Tooltip content="批量下载文件" placement="bottom-start">
                          <Button :disabled="downLoadDisabled" size="small" type="primary" icon="ios-cloud-download-outline" @click="downLoadBatchFiles()" class="document-operate">
                              下载
                          </Button>
                      </Tooltip>
                      </Col>
                      <Col span="6" offset=5>
                      <Input v-model="inputDocumentName" type="text" placeholder="搜索您的文件" @on-enter="getFuzzyFiles()" style="z-index:1!important">
                      <Button type="primary" slot="append" icon="ios-search" @click="getFuzzyFiles()"></Button>
                      </Input>
                      </Col>
                  </Row>
              </div>
              <div class="user-manage__content-head">
                  <Row>
                      <Col span="18"> 
                  <Breadcrumb class="breadcrumb--is-current">
                      <Button size="small" type="text" class="breadcrumb--is-current" @click="goToUpperLevel()">
                      返回上一级|
                      </Button>
                      <BreadcrumbItem v-for="breadcrumbItem of breadcrumbs" :key="breadcrumbItem.data.fileId" :class="{'breadcrumb--is-current': index < breadcrumbs.length-1}" @click.native.stop="selectBreadcrumb(breadcrumbItem)">
                          {{breadcrumbItem.data.title}}
                      </BreadcrumbItem>   
                  </Breadcrumb>
                  </Col >
                  <Col span="4" offset=2><span>已全部加载,共{{rightFileTable.length}}个</span> </Col>
                  </Row>
                  <Row>已选中{{selectedFileItems.length}}个文件/文件夹</Row>
              </div>
              <div >
                  <Table
                    height="500"
                    ref="selection"
                    :columns="documentColumns"
                    :data="rightFileTable"
                    :loading="tableLoading"
                    @on-row-dblclick='documentRowdbClick'
                    @on-select-all='selectTableAll'
                    @on-selection-change='changeTableChose'
                    @on-select="getTableChosedValue"
                  ></Table>
              </div>
            </Col>
          </Row>
        </div>
        <Modal v-model="showAddFolder" width="620" :closable="false">
            <div slot="header">
                <span>新建文件夹</span>
            </div>
            <Input v-model="newFolderName" placeholder="请输入文件夹名" />
            <Form ref="addOrSetFolderForm" :model="addOrSetFolderForm" label-position="left" :label-width="150">
                <FormItem label="全选" style="border-bottom: 1px solid #EDEDED;padding-bottom:6px;margin-bottom:6px;overflow: hidden">
                    <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
                        <Col span="3">
                        <Checkbox :disabled="qryCheckIsAllDisabled" v-model="seeCheckAll" @on-change="handleSeeCheckAll">查看</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="updCheckIsAllDisabled" v-model="uploadCheckAll" @on-change="handleUploadCheckAll">上传</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="downCheckIsAllDisabled" v-model="downCheckAll" @on-change="handleDownCheckAll">下载</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="perCheckIsAllDisabled" v-model="perCheckAll" @on-change="handlePerCheckAll">权限</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="modCheckIsAllDisabled" v-model="editCheckAll" @on-change="handleEditCheckAll">编辑</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="delCheckIsAllDisabled" v-model="deleteCheckAll" @on-change="handledeleteCheckAll">删除</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="previewCheckIsAllDisabled" v-model="previewCheckAll" @on-change="handlePreviewCheckAll">预览</Checkbox>
                        </Col>
                    </Row>
                </FormItem>
                <div class="folder-modal">
                    <FormItem v-for="(item, index) in addOrSetFolderForm.items" :key="index" :label="item.roleName" :prop="'items.' + index + '.filePermission'" style="border-bottom: 1px solid #EDEDED;padding-bottom:6px;margin-bottom:6px;">
                        <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.qryDisabled" v-model="item.filePermission.qry" @on-change="seeCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.updDisabled" v-model="item.filePermission.upd" @on-change="updCheckIsAll">

                            </Checkbox>

                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.downDisabled" v-model="item.filePermission.down" @on-change="downCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.permDisabled" v-model="item.filePermission.permission" @on-change="perCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.modDisabled" v-model="item.filePermission.mod" @on-change="modCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.delDisabled" v-model="item.filePermission.del" @on-change="delCheckIsAll">
                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.previewDisabled" v-model="item.filePermission.preview" @on-change="previewCheckIsAll">
                            </Checkbox>
                            </Col>
                        </Row>
                    </FormItem>
                </div>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="addFolder">
                    确定
                </Button>
                <Button @click="showAddFolder=false">
                    取消
                </Button>
            </div>
        </Modal>
        <Modal v-model="showSetPermission" width="620" :closable="false" :mask-closable="false" class-name="folder-modal">
            <div slot="header">
                <span>权限设置</span>
            </div>
            <Icon type="ios-folder-outline" :size="30"></Icon>
            <span class="custom-title">{{currentFolder.fileName}}</span>
            <Form ref="addOrSetFolderForm" :model="addOrSetFolderForm" label-position="left" :label-width="150">
                <FormItem label="全选" style="border-bottom: 1px solid #EDEDED;padding-bottom:6px;margin-bottom:6px;">
                    <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
                        <Col span="3">
                        <Checkbox :disabled="qryCheckIsAllDisabled" v-model="seeCheckAll" @on-change="handleSeeCheckAll">查看&nbsp;&nbsp;</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="updCheckIsAllDisabled" v-model="uploadCheckAll" @on-change="handleUploadCheckAll">上传&nbsp;&nbsp;</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="downCheckIsAllDisabled" v-model="downCheckAll" @on-change="handleDownCheckAll">下载&nbsp;&nbsp;</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="perCheckIsAllDisabled" v-model="perCheckAll" @on-change="handlePerCheckAll">权限&nbsp;&nbsp;</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="modCheckIsAllDisabled" v-model="editCheckAll" @on-change="handleEditCheckAll">编辑&nbsp;&nbsp;</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="delCheckIsAllDisabled" v-model="deleteCheckAll" @on-change="handledeleteCheckAll">删除&nbsp;&nbsp;</Checkbox>
                        </Col>
                        <Col span="3">
                        <Checkbox :disabled="previewCheckIsAllDisabled" v-model="previewCheckAll" @on-change="handlePreviewCheckAll">预览&nbsp;&nbsp;</Checkbox>
                        </Col>
                    </Row>
                </FormItem>
                <div class="folder-modal">
                    <FormItem v-for="(item, index) in addOrSetFolderForm.items" :key="index" :label="item.roleName" :prop="'items.' + index + '.filePermission'" style="border-bottom: 1px solid #EDEDED;padding-bottom:6px;margin-bottom:6px;">
                        <Row type="flex" justify="space-between" align="middle" class="code-row-bg">
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.qryDisabled" v-model="item.filePermission.qry" @on-change="seeCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.updDisabled" v-model="item.filePermission.upd" @on-change="updCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.downDisabled" v-model="item.filePermission.down" @on-change="downCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.permDisabled" v-model="item.filePermission.permission" @on-change="perCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.modDisabled" v-model="item.filePermission.mod" @on-change="modCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.delDisabled" v-model="item.filePermission.del" @on-change="delCheckIsAll">

                            </Checkbox>
                            </Col>
                            <Col span="3">
                            <Checkbox :disabled="item.filePermission.previewDisabled" v-model="item.filePermission.preview" @on-change="previewCheckIsAll">

                            </Checkbox>
                            </Col>
                        </Row>
                    </FormItem>
                </div>
            </Form>

            <div slot="footer">
                <Button type="primary" @click="setFolderPermission()">
                    确定
                </Button>
                <Button @click="showSetPermission=false">
                    取消
                </Button>
            </div>
        </Modal>
        <Modal v-model="showDeleteFolder" :closable="false" width="500" :styles="{top: '100px'}">
            <div slot="header">
                <span>确定批量删除?</span>
            </div>
            <div slot="footer">
                <Button type="primary" @click="deleteFolder()">
                    确定
                </Button>
                <Button @click="showDeleteFolder=false">
                    取消
                </Button>
            </div>
        </Modal>

        <Modal v-model="showRenameFolder" :closable="false" width="500" :styles="{top: '100px'}">
            <div slot="header">
                <span>重命名</span>
            </div>
            <div class="user-manage--downLoad-organ-form">
                <div>
                    <Input v-model="reNameFileOrFolderForm.fileName" />
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="reNameFileOrFolder()">
                    确定
                </Button>
                <Button @click="showRenameFolder=false">
                    取消
                </Button>
            </div>
        </Modal>
        <Modal v-model="showDeleteFile" :closable="false" width="500" :styles="{top: '100px'}">
            <div slot="header">
                <span>确定删除文件?</span>
            </div>
            <div slot="footer">
                <Button type="primary" @click="deleteFile()">
                    确定
                </Button>
                <Button @click="showDeleteFile=false">
                    取消
                </Button>
            </div>
        </Modal>
        <preview ref="preview"></preview>
    </div>
</template>
<script>
import userReq from '@/api/user.js'
import { getUserRoleAndPermission } from '@/api/role.js'
import documentReq from '@/api/document.js'
import Cookies from 'js-cookie'
import workflowReq from '@/api/work-flow.js'
import documentFilter from '@/views/document-lib/components/documentFilter.js'
import axios from 'axios'
import preview from '@/views/document-lib/components/preview.vue'
export default {
  name: 'document',
  components: {
    preview
  },
  data() {
    return {
      cnt: 1,
      Cookies: Cookies,
      currentUserId: '',
      currentUserRoles: [],
      allUserRoles: [],
      currentFolder: { roleCodes: [], rootUSer: false },
      seeCheckAll: false,
      uploadCheckAll: false,
      downCheckAll: false,
      perCheckAll: false,
      editCheckAll: false,
      deleteCheckAll: false,
      previewCheckAll: false,
      deleteFileDisabled: false,
      downSingleFileDisabled: false,
      qryCheckIsAllDisabled: false,
      updCheckIsAllDisabled: false,
      downCheckIsAllDisabled: false,
      perCheckIsAllDisabled: false,
      modCheckIsAllDisabled: false,
      delCheckIsAllDisabled: false,
      previewCheckIsAllDisabled: false,

      qryCheckDisabled: false,
      updCheckDisabled: false,
      downCheckDisabled: false,
      perCheckDisabled: false,
      modCheckDisabled: false,
      delCheckDisabled: false,
      previewCheckDisabled: false,
      othersQryCheckDisabled: false,
      othersUpdCheckDisabled: false,
      othersDownCheckDisabled: false,
      othersPerCheckDisabled: false,
      othersModCheckDisabled: false,
      othersDelCheckDisabled: false,
      othersPreviewCheckDisabled: false,
      inputDocumentName: '',
      reNameFileOrFolderForm: {},
      upLoadFileRequest: {},
      newFolderName: '',
      newFolderFileId: '',
      folderName: '',
      uploadData: {},
      uploadUrl: '',
      uploadFiles: [],
      self: this,
      userName: '',
      showPermissiomForm: false,
      showAddFolder: false,
      showSetPermission: false,
      showDeleteFolder: false,
      showRenameFolder: false,
      showDeleteFile: false,
      showDeleteFile: false,
      total: 100,
      index: 1,
      currentFolderAllRoleCodes: { roleCodes: [] },
      addOrSetFolderForm: {
        items: []
      },
      selectTableItem: {},
      //左侧当前选择的节点
      selectFileTreeNode: {
        root: null,
        node: null,
        data: { fileId: '-1' }
      },
      breadcrumbs: [],
      documentColumns: [
        {
          type: 'selection',
          width: 40,
          align: 'space-between'
        },
        {
          title: '文件名',
          key: 'name',
          minWidth: 250,
          render: (h, params) => {
            if (params.row.type === '0') {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-paper-outline'
                  }
                }),
                h('strong', params.row.fileName)
              ])
            } else if (params.row.type === '1') {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  }
                }),
                h('strong', params.row.fileName)
              ])
            }
          }
        },
        {
          title: '大小',
          width: 100,
          key: 'fileSize'
        },
        {
          title: '上传日期',
          key: 'createdTime',
          width: 160,
          render: function(h, params) {
            return h(
              'div',
              new Date(this.row.createdTime).Format('yyyy-MM-dd hh:mm:ss')
            )
          },
          sortable: true
        },
        {
          title: '上传人',
          key: 'userName',
          width: 100
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          align: 'center',
          render: (h, params) => {
            if (params.row.type === '0') {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'trash-a',
                      disabled: this.deleteDisabled
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.showDeleteFile = true
                        this.selectTableItem = params.row
                      }
                    }
                  },
                  '删除'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'ios-cloud-download-outline',
                      disabled: this.downLoadDisabled
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.downLoadSingleFile(params.row)
                      }
                    }
                  },
                  '下载'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'eye',
                      disabled: this.previewDisabled
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.previewFile(params.row)
                      }
                    }
                  },
                  '预览'
                )
              ])
            }
          }
        }
      ],
      rightFileTable: [],
      selectFileAll: false,
      selectedFileItems: [],
      total: 40,
      selectMinRow: 1,
      selectMinCol: 1,
      minRow: 1,
      minCol: 1,
      fontSize: 16,
      getLoading: false,
      syncLoading: false,
      initTreeFlag: false,
      initFileTreeFlag: false,
      fileTreeData: [
        {
          title: '全部文件',
          expand: true,
          render: (h, { root, node, data }) => {
            let fontColor = ''
            if (this.selectFileTreeNode.data.nodeKey === 0) {
              ;(this.selectFileTreeNode.root = root),
                (this.selectFileTreeNode.node = node),
                (this.selectFileTreeNode.data = data)
              fontColor = '#118EE9'
            }
            return h(
              'span',
              {
                style: {
                  display: 'inline-block',
                  width: '80%',
                  color: fontColor
                }
              },
              [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h(
                    'span',
                    {
                      props: {},
                      style: {
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          // 获取选中的树节点相关信息
                          this.selectFileNode(root, node, data)
                        }
                      }
                    },
                    data.title
                  )
                ])
              ]
            )
          },
          loading: false,
          fileId: -1,
          fileType: '1',
          children: []
        }
      ],
      leaf: [],
      tableLoading: false
    }
  },
  methods: {
    // 预览文件
    previewFile(row) {
      const previewUrl = `${location.origin}/ctg-workflow/fileManage/preview?fileId=${row.fileId}`
      const previewExt = this.getExt(row.fileName)
      if(this.validateFile(previewExt)) {
        this.$refs.preview.show({
          url: previewUrl,
          ext: previewExt
        })
      } else {
        this.$Message.warning('不支持预览此文件类型');
      }
    },
    // 获取url后缀
    getExt (url) {
      if(this.ext) return this.ext

      const lastIndex = url.lastIndexOf('.')
      return url.substr(lastIndex + 1)
    },
    // 验证文件类型
    validateFile (ext) {
      return (
        [
          "doc",
          "docx",
          "xls",
          "xlsx",
          "ppt",
          "pptx",
          "pdf",
          "txt",
          "gif",
          "jpg",
          "jpeg",
          "png",
          "bmp"
        ].indexOf(ext.toLowerCase()) !== -1
      );
    },
    getFuzzyFiles() {
      let params = {}
       this.loadNodeData({ fileId: -1 }, result => {
        this.fileTreeData[0].children = result
      })
      this.breadcrumbs=[]
      params.needUser = this.currentUserId
      params.fileName = this.inputDocumentName
      this.getLoading = true
      this.tableLoading = true
      documentReq
        .getFuzzyFileTrees(params)
        .then(res => {
          if (res.code == '0') {
            this.rightFileTable = res.info
          }
        })
        .catch(err => {
          console.error(err)
          this.$Message.error('This is an error:' + err)
        })
        .finally(() => {
          this.getLoading = false
          this.tableLoading = false
        })
    },
    /**
     * 面包屑，返回上一级
     */
    goToUpperLevel() {
      // 计算得到父节点
      this.breadcrumbs = this.getParentNodes(
        this.selectFileTreeNode.root,
        this.selectFileTreeNode.node
      )
      let length = this.breadcrumbs.length - 1
      if (length <= 0) {
        return
      }
      this.selectFileTreeNode.root = this.selectFileTreeNode.root
      this.selectFileTreeNode.node = this.breadcrumbs[length - 1].node
      this.selectFileTreeNode.data = this.breadcrumbs[length - 1].data
      // 更新树节点，右侧列表，当前文件夹
      this.selectFileNode(
        this.selectFileTreeNode.root,
        this.selectFileTreeNode.node,
        this.selectFileTreeNode.data
      )
    },
    handleUploadSuccess(res, file) {
      if (res.code === '0') {
        this.$Message.success(file.name + ':上传成功！')
        //更新右侧列表
        //更新左侧文件树
        this.appendNode(
          this.selectFileTreeNode.data,
          this.currentUserId,
          this.currentFolder.fileId,
          file.name,
          '0'
        )
      } else {
        this.$Message.error(file.name + ':上传失败：' + res.msg)
      }
    },
    /**
     *   上传前确定上传地址
     */
    handleBeforeUpload(file) {
      //上传文件具有当前树形选中的文件夹的角色及其权限
      if (this.currentFolder.type === '0') {
        this.$Message.warning(
          '提示：请选择左侧合适的文件夹，当前选中的为文件！'
        )
        return
      }
      if (this.selectFileTreeNode.data.nodeKey === 0) {
        this.$Message.warning(
          '提示：请选择左侧合适的文件夹，当前选中的为根节点,该目录不能上传！'
        )
        return
      }
      var urlPath = this.currentFolder.urlPath
      var params = {}
      params.parFileId = this.currentFolder.fileId
      params.fileName = file.name
      params.rootFileId = this.currentFolder.rootFileId
      params.path = this.currentFolder.path
      params.urlPath = this.currentFolder.urlPath + '/' + file.name
      params.roleCodes = this.currentFolder.roleCodes
      var rootFileId = this.currentFolder.rootFileId
      var parFileId = this.currentFolder.fileId
      //传额外参数
      this.upLoadFileRequest.fileRequest = JSON.stringify(params)
      this.uploadUrl =
        `${axios.defaults.baseURL}/fileManage/uploadFile?` +
        '&urlPath=' +
        urlPath +
        '&rootFileId=' +
        rootFileId +
        '&parFileId=' +
        parFileId
      let promise = new Promise(resolve => {
        this.$nextTick(function() {
          resolve(true)
        })
      })
      return promise //通过返回一个promis对象解决
    },
    handleUploadError(error, file) {
      this.$Message.info('上传出错：' + error)
    },
    openRenameFolder() {
      if (
        this.selectFileTreeNode.data.nodeKey === 0 &&
        !this.selectedFileItems.length
      ) {
        this.$Message.warning(
          '提示：请选择左侧合适的文件夹,当前选中为根节点或在右侧列表中选择项！'
        )
        return
      }
      this.showRenameFolder = true
    },
    openDeleteFolder() {
      if (!this.selectedFileItems.length) {
        this.$Message.warning('提示：请在右侧选择文件列表项！')
        return
      }
      this.showDeleteFolder = true
    },
    async deleteFile() {
      var params = { fileNames: [], paths: [], fileIds: [] }
      params.fileNames.push(this.selectTableItem.fileName)
      params.paths.push(this.selectTableItem.path)
      params.fileIds.push(this.selectTableItem.fileId)
      let res = await documentReq.deleteFileOrFolder({
        fileRequest: JSON.stringify(params)
      })
      if (res.code === '0') {
        this.$Message.success(this.selectTableItem.fileName + ':已删除！')
        this.showDeleteFile = false
        this.selectTableItem = {}
        this.selectedFileItems = []
        //更新右侧列表
        this.getSubFiles(this.currentUserId, this.currentFolder.fileId)
        //更新左侧文件树
        this.removeNode(this.selectFileTreeNode.data)
        //更新重命名文件或文件夹显示的名字
        this.reNameFileOrFolderForm = this.currentFolder
      } else {
        this.$Message.error(res.msg)
      }
    },
    async deleteFolder() {
      var params = { fileIds: [], fileNames: [], paths: [] }
      for (var i = 0; i < this.selectedFileItems.length; i++) {
        params.fileIds.push(this.selectedFileItems[i].fileId)
        params.fileNames.push(this.selectedFileItems[i].fileName)
        params.paths.push(this.selectedFileItems[i].path)
      }
      let res = await documentReq.deleteFileOrFolder({
        fileRequest: JSON.stringify(params)
      })
      if (res.code === '0') {
        this.$Message.success('批量文件已删除！')
        this.showDeleteFolder = false
        this.selectedFileItems = []
        //更新右侧列表
        this.getSubFiles(this.currentUserId, this.currentFolder.fileId)
        //更新左侧文件树
        this.removeNode(this.selectFileTreeNode.data)
        //更新重命名文件或文件夹显示的名字
        this.reNameFileOrFolderForm = this.currentFolder
      } else {
        // 获取数据失败
        this.$Message.error(res.msg)
      }
    },
    reNameFileOrFolder() {
      var params = {}
      params.fileId = this.reNameFileOrFolderForm.fileId
      params.fileName = this.reNameFileOrFolderForm.fileName
      documentReq
        .reNameFileOrFolder(params)
        .then(res => {
          if (res.code === '0') {
            this.$Message.success(params.fileName + '   :重命名成功！')
            this.showRenameFolder = false
            //更新右侧列表,更新当前节点，更新子节点
            this.updateNodeAndRightTable(
              this.reNameFileOrFolderForm.fileId,
              this.reNameFileOrFolderForm.fileName
            )
          } else {
            // 获取数据失败
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
          this.$Message.error('res.msg')
        })
        .finally(() => {
          this.getLoading = false
        })
    },
    downLoadSingleFile(row) {
      var params = {}
      //   params.fileId ='b7b9302d4edc48b59df5a2b66f7938f1'
      //   params.fileName ='新建文本文档.txt'
      //   params.path ='/ctg-flow/'
      params.fileId = row.fileId
      params.fileName = row.fileName
      params.path = row.path
      documentReq.download(params)
    },
    /**
     * 批量下载文件,下载的所有文件在一个压缩文件夹内
     */
    downLoadBatchFiles() {
      if (!this.selectedFileItems.length) {
        this.$Message.warning('提示：请在右侧选择文件列表项！')
        return
      }
      var params = { fileIds: [] }
      for (var i = 0; i < this.selectedFileItems.length; i++) {
        params.fileIds.push(this.selectedFileItems[i].fileId)
      }
      documentReq.downloadBatch(params)
    },
    /**
     * 判断其他角色对当前文件夹的权限checkBox，是否置为不可选
     * 判断全选按钮是否置为不可选
     * 超级用户具有所有权限
     */
    judgeOtherRoleChecDisabled() {
      this.othersQryCheckDisabled = true
      this.othersUpdCheckDisabled = true
      this.othersDownCheckDisabled = true
      this.othersPerCheckDisabled = true
      this.othersModCheckDisabled = true
      this.othersDelCheckDisabled = true
      this.othersPreviewCheckDisabled = true

      this.qryCheckIsAllDisabled = false
      this.updCheckIsAllDisabled = false
      this.downCheckIsAllDisabled = false
      this.perCheckIsAllDisabled = false
      this.modCheckIsAllDisabled = false
      this.delCheckIsAllDisabled = false
      this.previewCheckIsAllDisabled = false
      if (!this.currentFolder.rootUSer) {
        //规则：只要当前用户所属的角色任一个具有'qry'权限，
        //对于不具有'qry'权限的角色，就认为该用户在新建文件夹或者对文件夹设置权限时，可以对其他角色分配该权限
        //如果其他角色也有'qry'权限，也认为该用户在新建文件夹或者对文件夹设置权限时，可以对其他角色分配该权限
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('qry') != -1) {
            this.othersQryCheckDisabled = false
            break
          }
        }
        //规则：只要具有当前文件夹的角色任一个不具有'qry'权限，'qry'全选选择框置为不可选
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('qry') ==
            -1
          ) {
            this.qryCheckIsAllDisabled = true
            break
          }
        }

        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('upd') != -1) {
            this.othersUpdCheckDisabled = false
            break
          }
        }
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('upd') ==
            -1
          ) {
            this.updCheckIsAllDisabled = true
            break
          }
        }

        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('down') != -1) {
            this.othersDownCheckDisabled = false
            break
          }
        }
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('down') ==
            -1
          ) {
            this.downCheckIsAllDisabled = true
            break
          }
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (
            this.currentFolder.roleCodes[i].roles.indexOf('permission') != -1
          ) {
            this.othersPerCheckDisabled = false
            break
          }
        }
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
              'permission'
            ) == -1
          ) {
            this.perCheckIsAllDisabled = true
            break
          }
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('mod') != -1) {
            this.othersModCheckDisabled = false
            break
          }
        }
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('mod') ==
            -1
          ) {
            this.modCheckIsAllDisabled = true
            break
          }
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('del') != -1) {
            this.othersDelCheckDisabled = false
            break
          }
        }
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('del') ==
            -1
          ) {
            this.delCheckIsAllDisabled = true
            break
          }
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('preview') != -1) {
            this.othersPreviewCheckDisabled = false
            break
          }
        }
        for (
          var i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('preview') ==
            -1
          ) {
            this.previewCheckIsAllDisabled = true
            break
          }
        }
      }
    },
    /**
     * 新建文件夹或者文件夹权限设置时规则:
     * 1)默认具有当前文件夹（即父文件夹的权限）
     * 2)权限分配：超级用户所有角色的权限及全选都可以分配
     * 3)显示：查询超级用户对当前文件夹的权限，结果是什么显示什么
     * 4)权限分配：全选是否可以分配：根据用户所属角色对当前文件夹的权限判断
     * 其他角色是否可以分配：根据用户所属角色对当前文件夹的权限判断；及根据其他角色对当前文件夹的权限判断
     * 5）显示：查询普通用户对当前文件夹的权限，结果是什么显示什么
     */
    changeAddOrSetFolderForm() {
      if (this.currentFolder.type === '0') {
        this.$Message.warning(
          '提示：请选择左侧合适的文件夹，当前选中的为文件！'
        )
        return
      }

      this.addOrSetFolderForm = { items: [] }
      //初始化分配权限全选绑定的默认值
      ;(this.seeCheckAll = false),
        (this.uploadCheckAll = false),
        (this.downCheckAll = false),
        (this.perCheckAll = false),
        (this.editCheckAll = false),
        (this.deleteCheckAll = false),
        (this.previewCheckAll = false)

      //新建文件夹时，组装addOrSetFolderForm
      //新建文件夹时，所有角色，只更新一次角色权限checkBox是否置为不可选
      //遍历所有角色
      //当前文件夹分配的的角色及其权限
      //超级用户，全选及各checkBox都可选择

      //获取所有角色对当前文件夹的权限
      this.currentFolderAllRoleCodes = { roleCodes: [] }
      var currentFolderRoleIds = []
      var currentFolderAllRoleIds = []
      var params = {}
      params.needUser = this.currentUserId
      params.fileId = this.currentFolder.fileId
      //获取所有角色（id）对当前文件夹的权限
      documentReq
        .getAllRolesFolderPerm(params)
        .then(res => {
          if (res.code === '0') {
            for (var key in res.info.roleId2role) {
              var rodeCode = {}
              rodeCode.roleId = key
              rodeCode.roles = res.info.roleId2role[key]
              this.currentFolderAllRoleCodes.roleCodes.push(rodeCode)
            }
            this.judgeOtherRoleChecDisabled()
            for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
              currentFolderRoleIds.push(this.currentFolder.roleCodes[i].roleId)
            }

            for (
              var i = 0;
              i < this.currentFolderAllRoleCodes.roleCodes.length;
              i++
            ) {
              currentFolderAllRoleIds.push(
                this.currentFolderAllRoleCodes.roleCodes[i].roleId
              )
            }
            for (var j = 0; j < this.allUserRoles.length; j++) {
              let item = {
                roleId: this.allUserRoles[j].roleId,
                roleName: this.allUserRoles[j].roleName,
                filePermission: {
                  qry: false,
                  qryDisabled: false,
                  upd: false,
                  updDisabled: false,
                  down: false,
                  downLoadDisabled: false,
                  permission: false,
                  permDisabled: false,
                  mod: false,
                  modDisabled: false,
                  del: false,
                  delDisabled: false,
                  preview: false,
                  previewDisabled: false
                }
              }

              //超级管理员，获取的是所有角色对当前文件夹的权限
              if (this.currentFolder.rootUSer) {
                //当前文件夹已分配的角色
                let i = currentFolderRoleIds.indexOf(
                  this.allUserRoles[j].roleId
                )
                if (i != -1) {
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('qry') != -1
                  ) {
                    item.filePermission.qry = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('upd') != -1
                  ) {
                    item.filePermission.upd = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('down') != -1
                  ) {
                    item.filePermission.down = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf(
                      'permission'
                    ) != -1
                  ) {
                    item.filePermission.permission = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('mod') != -1
                  ) {
                    item.filePermission.mod = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('del') != -1
                  ) {
                    item.filePermission.del = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('preview') != -1
                  ) {
                    item.filePermission.preview = true
                  }
                }
              } else {
                //普通用户，调getAllRolesFolderPerm接口，获取包括当前用户所属角色在内的角色对当前文件夹的权限
                let i = currentFolderAllRoleIds.indexOf(
                  this.allUserRoles[j].roleId
                )
                if (i != -1) {
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'qry'
                    ) != -1
                  ) {
                    item.filePermission.qry = true
                  } else {
                    item.filePermission.qryDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'upd'
                    ) != -1
                  ) {
                    item.filePermission.upd = true
                  } else {
                    item.filePermission.updDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'down'
                    ) != -1
                  ) {
                    item.filePermission.down = true
                  } else {
                    item.filePermission.downDisabled = true
                  }

                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'permission'
                    ) != -1
                  ) {
                    item.filePermission.permission = true
                  } else {
                    item.filePermission.permDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'mod'
                    ) != -1
                  ) {
                    item.filePermission.mod = true
                  } else {
                    item.filePermission.modDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'del'
                    ) != -1
                  ) {
                    item.filePermission.del = true
                  } else {
                    item.filePermission.delDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'preview'
                    ) != -1
                  ) {
                    item.filePermission.preview = true
                  } else {
                    item.filePermission.previewDisabled = true
                  }
                } else {
                  item.filePermission.qryDisabled = this.othersQryCheckDisabled
                  item.filePermission.updDisabled = this.othersUpdCheckDisabled
                  item.filePermission.downDisabled = this.othersDownCheckDisabled
                  item.filePermission.permDisabled = this.othersPerCheckDisabled
                  item.filePermission.modDisabled = this.othersModCheckDisabled
                  item.filePermission.delDisabled = this.othersDelCheckDisabled
                  item.filePermission.previewDisabled = this.othersPreviewCheckDisabled
                }
              }
              this.addOrSetFolderForm.items.push(item)
            }
            this.seeCheckIsAll()
            this.updCheckIsAll()
            this.downCheckIsAll()
            this.perCheckIsAll()
            this.modCheckIsAll()
            this.delCheckIsAll()
            this.previewCheckIsAll()
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {})
    },
    changeAddOrSetFolderFormWhenFirstNode() {
      this.addOrSetFolderForm = { items: [] }
      //初始化分配权限的默认值全选
      ;(this.seeCheckAll = true),
        (this.uploadCheckAll = true),
        (this.downCheckAll = true),
        (this.perCheckAll = true),
        (this.editCheckAll = true),
        (this.deleteCheckAll = true),
        (this.previewCheckAll = true)
      //点击根目录时，不置灰
      this.qryCheckIsAllDisabled = false
      this.updCheckIsAllDisabled = false
      this.downCheckIsAllDisabled = false
      this.perCheckIsAllDisabled = false
      this.modCheckIsAllDisabled = false
      this.delCheckIsAllDisabled = false
      this.previewCheckIsAllDisabled = false
      //根节点时，超级用户，默认选中所有角色对文件夹的权限
      //根节点时，普通用户，默认选中该用户所属角色对文件夹的权限  getUserRoleAndPermission
      for (var j = 0; j < this.allUserRoles.length; j++) {
        let item = {
          roleId: this.allUserRoles[j].roleId,
          roleName: this.allUserRoles[j].roleName,
          filePermission: {
            qry: true,
            qryDisabled: false,
            upd: true,
            updDisabled: false,
            down: true,
            downLoadDisabled: false,
            permission: true,
            permDisabled: false,
            mod: true,
            modDisabled: false,
            del: true,
            delDisabled: false,
            preview: true,
            previewDisabled: false
          }
        }
        this.addOrSetFolderForm.items.push(item)
      }
      this.seeCheckIsAll()
      this.updCheckIsAll()
      this.downCheckIsAll()
      this.perCheckIsAll()
      this.modCheckIsAll()
      this.delCheckIsAll()
      this.previewCheckIsAll()
    },
    //延迟显示addOrSetFolderForm
    openAddFolder() {
      var t
      clearTimeout(t)
      var tempThis = this
      t = setTimeout(function() {
        tempThis.showAddFolder = true
      }, 10)
    },
    //addOrSetFolderForm显示会由上次的变为当前的，存在突变，这里延迟显示addOrSetFolderForm
    openSetPermission() {
      if (this.selectFileTreeNode.data.nodeKey === 0) {
        this.$Message.warning(
          '提示：请选择左侧合适的文件夹，当前选中为根节点！'
        )
        return
      }
      var t
      clearTimeout(t)
      var tempThis = this
      t = setTimeout(function() {
        tempThis.showSetPermission = true
      }, 10)
    },

    /**
     * 新增文件夹
     */
    async addFolder() {
      if (this.newFolderName === null || this.newFolderName === '') {
        this.$Message.error('请输入新建文件夹的名称！')
        return
      }
      var params = {}
      params.roleCodes = []
      params.fileName = this.newFolderName
      //创建第一级目录
      if (this.selectFileTreeNode.data.nodeKey === 0) {
        params.parFileId = -1
        //这里第一级目录的rootFileId唯一，用当前时间戳表示,后台也处理了
        params.rootFileId = new Date().getTime()
        params.path = '/ctg-flow/'
        params.urlPath = '/' + this.newFolderName
      } else {
        params.parFileId = this.currentFolder.fileId
        params.rootFileId = this.currentFolder.rootFileId
        params.path = this.currentFolder.path
        params.urlPath = this.currentFolder.urlPath + '/' + this.newFolderName
      }
      //2.合并选择的角色及其权限
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        var roleCode = { roleId: '', roles: [] }
        roleCode.roleId = this.addOrSetFolderForm.items[i].roleId
        for (var key in this.addOrSetFolderForm.items[i].filePermission) {
          if (
            this.addOrSetFolderForm.items[i].filePermission[key] === true &&
            key != 'qryDisabled' &&
            key != 'updDisabled' &&
            key != 'downDisabled' &&
            key != 'permDisabled' &&
            key != 'modDisabled' &&
            key != 'delDisabled' &&
            key != 'previewDisabled'
          ) {
            roleCode.roles.push(key)
          }
        }
        params.roleCodes.push(roleCode)
      }
      let res = await documentReq.addFolder({
        fileRequest: JSON.stringify(params)
      })
      if (res.code === '0') {
        this.$Message.success(params.fileName + ':文件夹新建成功！')
        this.showAddFolder = false
        //3.更新右侧列表
        //4.更新左侧文件树
        if (this.selectFileTreeNode.data.nodeKey === 0) {
          this.appendNode(
            this.selectFileTreeNode.data,
            this.currentUserId,
            '-1',
            this.newFolderName,
            '1'
          )
        } else {
          this.appendNode(
            this.selectFileTreeNode.data,
            this.currentUserId,
            this.currentFolder.fileId,
            this.newFolderName,
            '1'
          )
        }
      } else {
        this.$Message.error(res.msg)
      }
    },
    /**
     * 文件夹设置权限
     */
    async setFolderPermission() {
      var params = {}
      params.fileId = this.currentFolder.fileId
      params.roleCodes = []
      //params.roleCodes = this.currentFolder.roleCodes
      //2.合并选择的角色及其权限
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        var roleCode = { roleId: '', roles: [] }
        roleCode.roleId = this.addOrSetFolderForm.items[i].roleId
        for (var key in this.addOrSetFolderForm.items[i].filePermission) {
          if (
            this.addOrSetFolderForm.items[i].filePermission[key] === true &&
            key != 'qryDisabled' &&
            key != 'updDisabled' &&
            key != 'downDisabled' &&
            key != 'permDisabled' &&
            key != 'modDisabled' &&
            key != 'delDisabled' &&
            key != 'previewDisabled'
          ) {
            roleCode.roles.push(key)
          }
        }
        params.roleCodes.push(roleCode)
      }
      let res = await documentReq.setFolderPermission({
        fileRequest: JSON.stringify(params)
      })
      if (res.code === '0') {
        this.$Message.success(
          this.currentFolder.fileName + ':文件夹权限设置成功！'
        )
        this.showSetPermission = false
        //更新右侧列表
        this.getSubFiles(this.currentUserId, this.currentFolder.fileId)
        //更新当前选中节点（即当前文件夹的权限信息）
        var params = {}
        params.needUser = this.currentUserId
        params.fileId = this.selectFileTreeNode.data.fileId
        documentReq
          .getFolderPerm(params)
          .then(res => {
            if (res.code === '0') {
              if (
                res.info.reWfFileManages != null &&
                res.info.reWfFileManages.length > 0
              ) {
                this.currentFolder.parFileId =
                  res.info.reWfFileManages[0].parFileId
                this.currentFolder.fileId = res.info.reWfFileManages[0].fileId
                this.currentFolder.rootFileId =
                  res.info.reWfFileManages[0].rootFileId
                this.currentFolder.path = res.info.reWfFileManages[0].path
                this.currentFolder.urlPath = res.info.reWfFileManages[0].urlPath
                this.currentFolder.fileName =
                  res.info.reWfFileManages[0].fileName
                this.currentFolder.type = res.info.reWfFileManages[0].type
              }
              this.currentFolder.roleCodes = []
              if (res.info.rootUSer === true) {
                for (var i = 0; i < this.allUserRoles.length; i++) {
                  var rodeCode = {}
                  rodeCode.roleId = this.allUserRoles[i].roleId
                  rodeCode.roles = [
                    'qry',
                    'upd',
                    'down',
                    'permission',
                    'mod',
                    'del',
                    'preview'
                  ]
                  this.currentFolder.roleCodes.push(rodeCode)
                }
              } else {
                //当前文件的角色及权限
                for (var key in res.info.roleId2role) {
                  var rodeCode = {}
                  rodeCode.roleId = key
                  rodeCode.roles = res.info.roleId2role[key]
                  this.currentFolder.roleCodes.push(rodeCode)
                }
              }
            } else {
              this.$Message.error(res.msg)
            }
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {})
      } else {
        this.$Message.error(res.msg)
      }
    },
    appendNode(data, userId, parFileId, newFileOrFolderName, fileType) {
      var params = {}
      params.needUser = userId
      params.parFileId = parFileId
      // params.roles = ['qry']
      var fileId = ''
      this.tableLoading = true
      documentReq
        .getSubFiles(params)
        .then(res => {
          if (res.code === '0') {
            this.rightFileTable = res.info
            for (var i = 0; i < this.rightFileTable.length; i++) {
              if (this.rightFileTable[i].fileName === newFileOrFolderName) {
                fileId = this.rightFileTable[i].fileId
                break
              }
            }
            const children = data.children || []
            children.push({
              title: newFileOrFolderName,
              expand: true,
              fileId: fileId,
              fileType: fileType
            })
            this.$set(data, 'children', children)
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.getLoading = false
          this.tableLoading = false
        })
    },
    //删除节点，更新左侧当前选中的文件夹下的子节点信息
    removeNode(item) {
      let param = {
        needUser: this.currentUserId,
        parFileId: this.currentFolder.fileId
      }
      documentReq
        .getSubFiles(param)
        .then(res => {
          let subFileNodes = res.info
          if (res.info.length === 0) delete item.children
          let childList = []
          subFileNodes.forEach(function(item) {
            let child = {
              title: item.fileName,
              fileId: item.fileId,
              fileType: item.type
            }
            if (item.parent === true) {
              child.loading = false
              child.children = []
            }
            childList.push(child)
          })
          this.$set(item, 'loading', false)
          this.$set(item, 'expand', true)
          this.$set(item, 'children', childList)
          // callback(childList)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //重命名后，更新节点及右侧列表
    updateNodeAndRightTable(fileId, fileName) {
      //如果是当前节点
      if (this.selectFileTreeNode.data.fileId === fileId) {
        this.$set(this.selectFileTreeNode.data, 'title', fileName)
      } else {
        //如果是当前节点的子节点
        let childList = []
        for (var i = 0; i < this.rightFileTable.length; i++) {
          let child = {
            title: this.rightFileTable[i].fileName,
            fileId: this.rightFileTable[i].fileId,
            fileType: this.rightFileTable[i].type
          }
          //如果右侧选中的是子节点是文件夹
          if (this.rightFileTable[i].type === '1') {
            child.loading = false
            child.children = []
          }
          //更新左侧树子节点名称，更新右侧列表
          if (this.rightFileTable[i].fileId === fileId) {
            child.title = fileName
            this.rightFileTable[i].fileName = fileName
          }
          childList.push(child)
        }
        this.$set(this.selectFileTreeNode.data, 'children', childList)
      }
    },

    /** 判断是否全选
     */
    handleSeeCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[i].filePermission.qry = this.seeCheckAll
      }
    },
    handleUploadCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[
          i
        ].filePermission.upd = this.uploadCheckAll
      }
    },
    handleDownCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[i].filePermission.down = this.downCheckAll
      }
    },
    handlePerCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[
          i
        ].filePermission.permission = this.perCheckAll
      }
    },
    handleEditCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[i].filePermission.mod = this.editCheckAll
      }
    },
    handledeleteCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[
          i
        ].filePermission.del = this.deleteCheckAll
      }
    },
    handlePreviewCheckAll() {
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        this.addOrSetFolderForm.items[i].filePermission.preview = this.previewCheckAll
      }
    },
    /**判断是否全选
     */
    seeCheckIsAll() {
      var seeCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.qry) {
          this.seeCheckAll = false
          break
        }
        seeCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === seeCheckLength) {
        this.seeCheckAll = true
      }
    },
    updCheckIsAll() {
      var updCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.upd) {
          this.uploadCheckAll = false
          break
        }
        updCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === updCheckLength) {
        this.uploadCheckAll = true
      }
    },
    downCheckIsAll() {
      var downCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.down) {
          this.downCheckAll = false
          break
        }
        downCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === downCheckLength) {
        this.downCheckAll = true
      }
    },
    perCheckIsAll() {
      var perCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.permission) {
          this.perCheckAll = false
          break
        }
        perCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === perCheckLength) {
        this.perCheckAll = true
      }
    },
    modCheckIsAll() {
      var modCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.mod) {
          this.editCheckAll = false
          break
        }
        modCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === modCheckLength) {
        this.editCheckAll = true
      }
    },
    delCheckIsAll() {
      var delCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.del) {
          this.deleteCheckAll = false
          break
        }
        delCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === delCheckLength) {
        this.deleteCheckAll = true
      }
    },
    previewCheckIsAll() {
      var previewCheckLength = 0
      for (var i = 0; i < this.addOrSetFolderForm.items.length; i++) {
        if (!this.addOrSetFolderForm.items[i].filePermission.preview) {
          this.previewCheckAll = false
          break
        }
        previewCheckLength++
      }
      if (this.addOrSetFolderForm.items.length === previewCheckLength) {
        this.previewCheckAll = true
      }
    },
    downLoad(index) {
      documentReq
        .download({
          fileId: '',
          fileName: '',
          path: ''
        })
        .then(res => {})
        .catch(err => {
          $.IShowError(err)
        })
        .finally(() => {})
    },
    /**currentUserId后台会从session中获取，这个参数暂时保留,随便塞个值
     */
    getCurrentUserId() {
      var loginName = Cookies.get('user')
      if(loginName)
      this.currentUserId=loginName
      else
       this.currentUserId="loginName"
    //   workflowReq
    //     .getUserList()
    //     .then(res => {
    //       for (var i = 0; i < res.length; i++) {
    //         if (loginName === res[i].loginName) {
    //           this.currentUserId = res[i].id
    //           break
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err)
    //       $.IShowError(err)
    //     })
    //     .finally(() => {
    //       this.getLoading = false
    //     })
    },
    /** 当前用户的roleId,roleName
     */
    async getCurrentUserRoles() {
      this.currentUserRoles = []
      let res = await getUserRoleAndPermission()
      if (res.code === '0') {
        for (var i = 0; i < res.roles.length; i++) {
          var temp = {}
          temp.roleId = res.roles[i].id
          temp.roleName = res.roles[i].name
          this.currentUserRoles.push(temp)
        }
      } else {
        // 获取数据失败
        this.$Message.error(res.msg)
      }
    },

    /** 所有roleId,roleName
     */
    getAllRolesInfo() {
      documentReq
        .getRoleInfo()
        .then(res => {
          this.allUserRoles = []
          if (res.code === '0') {
            for (var i = 0; i < res.info.length; i++) {
              var temp = {}
              temp.roleId = res.info[i].id
              temp.roleName = res.info[i].name
              this.allUserRoles.push(temp)
            }
            //初始化新建文件夹的权限选择情况
            this.changeAddOrSetFolderFormWhenFirstNode()
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.getLoading = false
        })
    },
    getFileTreesByUserId(userId) {
      var params = {}
      params.needUser = userId
      params.roles = ['qry']
      //params.parFileId
      documentReq
        .getFileTrees(params)
        .then(res => {
          if (res.code === '0') {
            for (var i = 0; i < res.info.length; i++) {
              var child = {}
              this.fileTreeData[0].children.push(child)
            }
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
          $.IShowError(err)
        })
        .finally(() => {
          this.getLoading = false
        })
    },

    /**
     * 以当前文件夹的fileId作为parFileId，查询其下的所有文件及文件夹，初始以parFileId=-1开始
     *
     * */
    getSubFiles(userId, parFileId) {
      var params = {}
      params.needUser = userId
      params.parFileId = parFileId
      //params.roles = ['qry']
      this.tableLoading = true
      documentReq
        .getSubFiles(params)
        .then(res => {
          if (res.code === '0') {
            this.rightFileTable = res.info
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.getLoading = false
          this.tableLoading = false
        })
    },

    /**以下3个函数处理右侧列表选中情况
     */
    getTableChosedValue(selection, row) {
      //当多选的时候有变化的时候调用该方法
      this.selectFileAll = false
      this.selectedFileItems = selection
      if (this.selectedFileItems.length >= 1) {
        this.reNameFileOrFolderForm = this.selectedFileItems[0]
      } else {
        this.reNameFileOrFolderForm = this.currentFolder
      }
    },
    selectTableAll(selection) {
      //全选
      this.selectFileAll = true
      this.selectedFileItems = selection
    },
    changeTableChose(data) {
      //选项发生变化的时候使用
      this.selectedFileItems = data
      //更新重命名文件或文件夹显示的名字,重命名当前节点的选中子节点的第一个
      if (this.selectedFileItems.length >= 1) {
        this.reNameFileOrFolderForm = this.selectedFileItems[0]
      } else {
        this.reNameFileOrFolderForm = this.currentFolder
      }
    },
    /**列表项双击,效果和点击左侧节点（文件夹类型）一致
     */
    documentRowdbClick(data, index, event) {
      if (data.type === '1') {
        var folderNode = {
          node: {
            title: data.fileName,
            loading: false,
            fileId: data.fileId,
            fileType: '1',
            children: [],
            nodeKey: ''
          },
          parent: this.selectFileTreeNode.data.nodeKey,
          nodeKey: '',
          children: []
        }
        for (var i = 0; i < this.selectFileTreeNode.data.children.length; i++) {
          if (this.selectFileTreeNode.data.children[i].fileId === data.fileId) {
            // folderNode.node.nodeKey = this.selectFileTreeNode.data.children[
            //   i
            // ].nodeKey
            // folderNode.nodeKey = folderNode.node.nodeKey
            this.selectFileTreeNode.data = this.selectFileTreeNode.data.children[
              i
            ]
            break
          }
        }

        this.selectFileNodeBydbClick(
          this.selectFileTreeNode.root,
          folderNode,
          this.selectFileTreeNode.data
        )
      }
    },
    /**
     * 自定义文件树节点显示
     */
    fileRenderContent(h, { root, node, data }) {
      // 设置树节点选中的样式
      let fontColor = ''
      if (
        data.hasOwnProperty('fileId') &&
        this.selectFileTreeNode != null &&
        this.selectFileTreeNode.data != null &&
        this.selectFileTreeNode.data.hasOwnProperty('fileId') &&
        this.selectFileTreeNode.data.fileId === data.fileId
      ) {
        fontColor = '#118EE9'
      }
      if (data.fileType === '1') {
        return h(
          'span',
          {
            style: {
              display: 'inline-block',
              width: '80%',
              color: fontColor
            }
          },
          [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-folder-outline'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h(
                'span',
                {
                  props: {},
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.selectFileNode(root, node, data)
                    }
                  }
                },
                data.title
              )
            ])
          ]
        )
      } else if (data.fileType === '0') {
        return h(
          'span',
          {
            style: {
              display: 'inline-block',
              width: '80%'
            }
          },
          [
            h('span', [
              h('Icon', {
                props: {
                  type: 'ios-paper-outline'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h(
                'span',
                {
                  props: {},
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.selectFileNode(root, node, data)
                    }
                  }
                },
                data.title
              )
            ])
          ]
        )
      }
    },
    /**点击节点左侧展开时，展开节点,更新右侧列表
     */
    loadNodeData(item, callback) {
      let param = { needUser: this.currentUserId, parFileId: item.fileId }
      documentReq
        .getSubFiles(param)
        .then(res => {
          let subFileNodes = res.info
          if (res.info.length === 0) delete item.children
          let childList = []
          subFileNodes.forEach(function(item) {
            let child = {
              title: item.fileName,
              fileId: item.fileId,
              fileType: item.type
            }
            if (item.parent === true) {
              child.loading = false
              child.children = []
            }
            childList.push(child)
          })
          // this.$set(item, 'loading', false);
          // this.$set(item, 'expand', true);
          // this.$set(item, 'children', childList);
          callback(childList)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /***点击节点名称时，展开节点,更新右侧列表,
     */
    updateNodesAndTable(item, userId, parFileId) {
      var params = {}
      params.needUser = userId
      params.parFileId = parFileId
      this.tableLoading = true
      documentReq
        .getSubFiles(params)
        .then(res => {
          if (res.code === '0') {
            this.rightFileTable = res.info
            if (res.info.length === 0) delete item.children
            let childList = []
            this.rightFileTable.forEach(function(item) {
              let child = {
                title: item.fileName,
                fileId: item.fileId,
                fileType: item.type
              }
              if (item.parent === true) {
                child.loading = false
                child.children = []
              }
              childList.push(child)
            })
            this.$set(item, 'expand', true)
            this.$set(item, 'children', childList)
            
            // this.selectFileTreeNode.data = item
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.getLoading = false
          this.tableLoading = false
        })
    },
    //双击右侧列表文件夹时，展开节点
    selectFileNodeBydbClick(root, node, data) {
   
      this.currentFolder = {
        roleCodes: [],
        rootUSer: this.currentFolder.rootUSer
      }
       let index = root.findIndex(
        item => item.node.nodeKey === node.node.nodeKey
      )
      if (index=== -1) {
        root.push(node)
      }
      //更新节点及右侧列表
      this.updateNodesAndTable(data, this.currentUserId, data.fileId)
      node.nodeKey=data.nodeKey
      node.node.nodeKey=data.nodeKey
      //双击右侧列表的话， 计算面包屑数据，直接在当前文件夹下计算
      this.breadcrumbs = this.getParentNodes(root, node)
      this.selectFileTreeNode.root = root
      this.selectFileTreeNode.node = node
      this.selectFileTreeNode.data = data
      //更新当前文件夹
      var params = {}
      params.needUser = this.currentUserId
      params.fileId = data.fileId

      documentReq
        .getFolderPerm(params)
        .then(res => {
          if (res.code === '0') {
            if (
              res.info.reWfFileManages != null &&
              res.info.reWfFileManages.length > 0
            ) {
              this.currentFolder.parFileId =
                res.info.reWfFileManages[0].parFileId
              this.currentFolder.fileId = res.info.reWfFileManages[0].fileId
              this.currentFolder.rootFileId =
                res.info.reWfFileManages[0].rootFileId
              this.currentFolder.path = res.info.reWfFileManages[0].path
              this.currentFolder.urlPath = res.info.reWfFileManages[0].urlPath
              this.currentFolder.fileName = res.info.reWfFileManages[0].fileName
              this.currentFolder.type = res.info.reWfFileManages[0].type
            }

            this.currentFolder.rootUSer = res.info.rootUSer
            //当前文件的已配置的角色及权限（跟父文件夹一致）
            for (var key in res.info.roleId2role) {
              var rodeCode = {}
              rodeCode.roleId = key
              rodeCode.roles = res.info.roleId2role[key]
              this.currentFolder.roleCodes.push(rodeCode)
            }

            //不是根节点，更新新建文件夹和修改文件夹权限的显示数据;根节点不走这步骤
            this.changeAddOrSetFolderForm()
            //更新重命名文件或文件夹显示的名字
            this.reNameFileOrFolderForm = this.currentFolder
          } else {
            this.$Message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {})
    },
    //点击左侧树节点
    selectFileNode(root, node, data) {
      if (data.fileType === '0') {
        this.$Message.info('请选择左侧文件夹！')
        return
      }
      this.currentFolder = {
        roleCodes: [],
        rootUSer: this.currentFolder.rootUSer
      }
      //更新选中的节点
      this.selectFileTreeNode.root = root
      this.selectFileTreeNode.node = node
      this.selectFileTreeNode.data = data
      //如果是根目录，创建第一级文件夹的情况，需要特殊处理
      if (this.selectFileTreeNode.data.nodeKey === 0) {
        this.currentFolder.fileId = -1
        this.currentFolder.parFileId = -1
        this.currentFolder.rootFileId = ''
        this.currentFolder.path = ''
        this.currentFolder.urlPath = ''
        this.currentFolder.fileName = ''
        this.currentFolder.type = '1'
        this.upLoadDisabled = false
        this.addFolderDisabled = false
        this.deleteDisabled = false
        this.reNameDisabled = false
        this.setPermissionDisabled = false
        this.downLoadDisabled = false
        this.previewDisabled = false
        //更新节点及右侧列表 parFileId = -1表示根目录
        this.updateNodesAndTable(data, this.currentUserId, '-1')
        // 计算面包屑数据
        this.breadcrumbs = this.getParentNodes(root, node)
        //初始化新建文件夹的权限选择情况
        this.changeAddOrSetFolderFormWhenFirstNode()
      } else {
        //更新节点及右侧列表
        this.updateNodesAndTable(data, this.currentUserId, data.fileId)
        // 计算面包屑数据
        this.breadcrumbs = this.getParentNodes(root, node)

        //更新当前文件夹
        var params = {}
        params.needUser = this.currentUserId
        params.fileId = data.fileId

        documentReq
          .getFolderPerm(params)
          .then(res => {
            if (res.code === '0') {
              if (
                res.info.reWfFileManages != null &&
                res.info.reWfFileManages.length > 0
              ) {
                this.currentFolder.parFileId =
                  res.info.reWfFileManages[0].parFileId
                this.currentFolder.fileId = res.info.reWfFileManages[0].fileId
                this.currentFolder.rootFileId =
                  res.info.reWfFileManages[0].rootFileId
                this.currentFolder.path = res.info.reWfFileManages[0].path
                this.currentFolder.urlPath = res.info.reWfFileManages[0].urlPath
                this.currentFolder.fileName =
                  res.info.reWfFileManages[0].fileName
                this.currentFolder.type = res.info.reWfFileManages[0].type
              }

              this.currentFolder.rootUSer = res.info.rootUSer
              //当前文件的已配置的角色及权限（跟父文件夹一致）
              for (var key in res.info.roleId2role) {
                var rodeCode = {}
                rodeCode.roleId = key
                rodeCode.roles = res.info.roleId2role[key]
                this.currentFolder.roleCodes.push(rodeCode)
              }

              //不是根节点，更新新建文件夹和修改文件夹权限的显示数据;根节点不走这步骤
              this.changeAddOrSetFolderForm()
              //更新重命名文件或文件夹显示的名字
              this.reNameFileOrFolderForm = this.currentFolder
            } else {
              this.$Message.error(res.msg)
            }
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {})
      }
    },
    // 得到当前节点父节点数据,更新面包屑
    getParentNodes(root, targetNode) {
       let rst = []
      let index = root.findIndex(
        node => node.node.nodeKey===node.nodeKey&&node.nodeKey === targetNode.nodeKey
      )
      index > -1 &&
        rst.unshift({
          root,
          node: targetNode,
          data: targetNode.node
        })
      while (index > -1) {
        if (root[index].nodeKey === targetNode.parent&&root[index].node.nodeKey===root[index].nodeKey) {
          targetNode = root[index]
          rst.unshift({
            root,
            node: targetNode,
            data: targetNode.node
          })
        }
        index--
      }
      return rst
    },
    selectBreadcrumb(nodeData) {
      this.selectFileNode(nodeData.root, nodeData.node, nodeData.data)
    },
    initCurrentFolder() {
      this.currentFolder.parFileId = '-1'
      this.currentFolder.fileId = '-1'
      this.currentFolder.rootFileId = '1'
      this.currentFolder.path = '/ctg-flow/'
      this.currentFolder.urlPath = ''
      this.currentFolder.fileName = ''
      this.currentFolder.roleCodes = []
      this.currentFolder.type = '1'
      for (var i = 0; i < this.allUserRoles.length; i++) {
        var rodeCode = {}
        rodeCode.roleId = this.allUserRoles[i].roleId
        rodeCode.roles = ['qry', 'upd', 'down', 'permission', 'mod', 'del']
        this.currentFolder.roleCodes.push(rodeCode)
      }
    },
    //格式化日期
    formatDate(timestramp) {
      return new Date(timestramp).Format('yyyy-MM-dd')
    },
    initFormatter() {
      Date.prototype.Format = function(fmt) {
        //
        let o = {
          'M+': this.getMonth() + 1, //月份
          'd+': this.getDate(), //日
          'h+': this.getHours(), //小时
          'm+': this.getMinutes(), //分
          's+': this.getSeconds(), //秒
          'q+': Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        for (var k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
        return fmt
      }
    }
  },
  created() {
    this.initFormatter() // 为Date 对象添加Format方法
  },
  mounted() {
    //初始化获取当前userId
    this.getCurrentUserId()
    //初始化获取所有角色列表
    this.getAllRolesInfo()
    //初始化，默认选中根节点
    this.selectFileTreeNode.data = this.fileTreeData[0]
  },
  watch: {
    currentUserId: function() {
      //初始加载树根节点，默认展开显示第一级目录，默认选中根节点
      this.loadNodeData({ fileId: -1 }, result => {
        this.fileTreeData[0].children = result
      })

      //初始化右侧文件夹列表，-1默认的是文件服务器根目录
      this.getSubFiles(this.currentUserId, -1)
      //初始化当前文件夹,显示当前用户的左侧文件夹树及其文件夹权限
      this.initCurrentFolder()
      //根节点时，初始化数据及操作按钮初始都可操作
      if (this.selectFileTreeNode.data.nodeKey === 0) {
        this.currentFolder.fileId = -1
        this.currentFolder.parFileId = -1
        this.currentFolder.rootFileId = ''
        this.currentFolder.path = ''
        this.currentFolder.urlPath = ''
        this.currentFolder.fileName = ''
        this.currentFolder.type = '1'
        this.upLoadDisabled = false
        this.addFolderDisabled = false
        this.deleteDisabled = false
        this.reNameDisabled = false
        this.setPermissionDisabled = false
        this.downLoadDisabled = false
        this.previewDisabled = false
        // 初始化，计算面包屑数据
        this.breadcrumbs = this.getParentNodes(
          this.selectFileTreeNode.root,
          this.selectFileTreeNode.node
        )
      }
    }
  },
  /**
   * 根据用户对文件夹的角色权限判断操作按钮是否屏蔽，超级用户不屏蔽
   */
  computed: {
    upLoadDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('upd') != -1) {
            return false
          }
        }
        return true
      },
      set(val) {}
    },
    addFolderDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('upd') != -1) {
            return false
          }
        }
        return true
      },
      set(val) {}
    },
    deleteDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('del') != -1) {
            return false
          }
        }
        return true
      },
      set(val) {}
    },
    reNameDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('mod') != -1) {
            return false
          }
        }
        return true
      },
      set(val) {}
    },
    setPermissionDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (
            this.currentFolder.roleCodes[i].roles.indexOf('permission') != -1
          ) {
            return false
          }
        }
        return true
      },
      set(val) {}
    },
    downLoadDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('down') != -1) {
            return false
          }
        }
        return true
      },
      set(val) {}
    },
    previewDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.nodeKey === 0 ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('preview') != -1) {
            return false
          }
        }
        return true
      },
      set(val) {}
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/common.less';
@import 'components/table.less';
.folder-modal {
  top: 20px;
  overflow: auto;
  height: 300px;
  width: 600px;
}

.user-manage {
  height: calc(88vh);
  overflow: hidden;
  &-content {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__tree-container {
    margin-top: 20px;
    padding-left: 20px;
    height: 98%;
    overflow: auto;
    &--tree {
      margin-left: 20px;
    }
  }

  &--delete-organ {
    color: red;
    float: right;
    > span {
      margin-left: 8px;
    }
  }

  &--downLoad-organ-form {
    display: flex;
    align-items: center;
    padding: 15px 0 25px 0;
    > span {
      margin-right: 8px;
    }
    > div {
      position: relative;
      flex-grow: 1;
    }
  }

  &__content {
    min-height: 120%;
    border-left: 1px solid #dddee1;
    padding: 30px 40px 60px 40px !important;
    &--table {
      margin-top: 10px;
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
      > span {
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
.document-operate {
  height: 30px;
  vertical-align: top;
}
.breadcrumb--is-current {
  color: #0066ff;
}
</style>
<style>
.ivu-table-title {
  height: 39px !important;
}
</style>

