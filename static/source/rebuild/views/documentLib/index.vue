<template>
  <div class="docment-manage">
    <Nav opacity="1" display="none"></Nav>
    <div class="g-container-column">
      <div class="g-header u-bd-bottom">
        <PageTitle text="文件库"></PageTitle>
      </div>
      <div class="g-main">
        <div class="g-container">
          <div class="g-aside u-bd-right u-pd-20-30">
            <Tree
              ref="docTree"
              nodeSize="large"
              :nodeClick="selectFileNode"
              expandOnClickNode
              lazy
              :lazyLoad="loadLazyTree"
              :renderContent="fileRenderContent"
              :defaultExpandedKeys="expandKeys"
              class="work-tree"
            ></Tree>
          </div>
          <div class="g-main u-pd-20-20 doc-tbl">
            <div class="doc-tbl-header">
              <div class="button-list">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="在已选定的目录中新建文件夹"
                  placement="bottom"
                >
                  <el-button
                    :disabled="addFolderDisabled"
                    type="primary"
                    size="small"
                    @click="openAddFolder()"
                    :loading="showAddFolderLoading"
                  >
                    <i class="iconfont iconzengjia el-icon--left"></i
                    >新建文件夹</el-button
                  >
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="在已选定的目录中上传文件"
                  placement="bottom"
                  :disabled="upLoadDisabled"
                >
                  <el-upload
                    class="upload-btn"
                    multiple
                    :with-credentials="true"
                    :disabled="upLoadDisabled"
                    :data="upLoadFileRequest"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleUploadSuccess"
                    :on-error="handleUploadError"
                  >
                    <el-button
                      type="primary"
                      size="small"
                      :disabled="upLoadDisabled"
                    >
                      <i class="iconfont iconshangchuan el-icon--left"></i
                      >上传</el-button
                    >
                  </el-upload>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="重命名选定的文件或文件夹"
                  placement="bottom"
                >
                  <el-button
                    :disabled="reNameDisabled"
                    type="primary"
                    size="small"
                    @click="openRenameFolder()"
                  >
                    <i class="iconfont iconLbianji el-icon--left"></i
                    >重命名</el-button
                  >
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="批量下载文件"
                  placement="bottom"
                >
                  <el-button
                    :disabled="downLoadDisabled"
                    type="primary"
                    size="small"
                    @click="downLoadBatchFiles()"
                  >
                    <i class="iconfont iconfujian el-icon--left"></i
                    >下载</el-button
                  >
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="批量删除文件"
                  placement="bottom"
                >
                  <el-button
                    :disabled="deleteDisabled"
                    type="danger"
                    size="small"
                    @click="confirmDelFile()"
                  >
                    <i class="iconfont iconguanbi el-icon--left"></i
                    >删除</el-button
                  >
                </el-tooltip>
              </div>
              <div>
                <el-input
                  placeholder="搜索您的文件"
                  v-model="inputDocumentName"
                  size="small"
                  clearable
                  style="width: 200px;"
                ></el-input>
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-search"
                  class="search-btn"
                  @click="getFuzzyFiles()"
                ></el-button>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="文件夹权限设置"
                  placement="bottom"
                >
                  <el-button
                    :disabled="setPermissionDisabled"
                    type="default"
                    size="small"
                    @click="openSetPermission()"
                    :loading="showSetPermissionLoading"
                  >
                    <i class="iconfont iconLquanxian el-icon--left"></i
                    >权限</el-button
                  >
                </el-tooltip>
              </div>
            </div>
            <div class="doc-tbl-desc">
              <p>
                已选中&nbsp;{{ selectedFileItems.length }}个&nbsp;文件/文件夹
              </p>
              <p>已全部加载，共{{ rightFileTable.length }}个</p>
            </div>
            <div class="doc-tbl-main">
              <el-table
                ref="selection"
                @row-dblclick="documentRowdbClick"
                @select-all="selectTableAll"
                @selection-change="changeTableChose"
                @select="getTableChosedValue"
                :data="rightFileTable"
                v-loading="tableLoading"
                style="width: 100%;border-left: 1px solid #ebeef5;border-right: 1px solid #ebeef5;"
                :stripe="false"
                border
              >
                <el-table-column
                  type="selection"
                  min-width="55"
                  align="center"
                ></el-table-column>
                <el-table-column label="文件名" min-width="250">
                  <template slot-scope="scope">
                    <i
                      :class="[
                        scope.row.type === '1'
                          ? 'el-icon-folder'
                          : 'el-icon-document'
                      ]"
                    ></i>
                    <span style="margin-left: 5px; font-weight: bold">{{
                      scope.row.fileName
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="大小"
                  width="100"
                  prop="fileSize"
                ></el-table-column>
                <el-table-column
                  label="上传日期"
                  width="160"
                  sortable
                  prop="createdTime"
                  :formatter="formatDateTime"
                >
                </el-table-column>
                <el-table-column
                  label="上传人"
                  width="100"
                  prop="userName"
                ></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.type === '0'"
                      type="text"
                      size="mini"
                      style="color: #327dff"
                      @click.stop="previewFile(scope.row)"
                    >
                      预览
                    </el-button>
                    <el-button
                      v-if="scope.row.type === '0'"
                      type="text"
                      size="mini"
                      style="color: #327dff"
                      @click.stop="downLoadSingleFile(scope.row)"
                    >
                      下载
                    </el-button>
                    <el-button
                      v-if="scope.row.type === '0'"
                      type="text"
                      size="mini"
                      style="color: #fa6400"
                      @click.stop="confirmDelFile(scope.row)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="showAddFolder"
      :modal-append-to-body="false"
      width="600px"
      title="新建文件夹"
    >
      <div class="doc-dialog-title">
        <el-input
          placeholder="请输入文件夹名"
          v-model="newFolderName"
          size="small"
          clearable
        ></el-input>
      </div>
      <el-form label-width="150px" label-position="left">
        <el-form-item label="全选" class="doc-dialog-chks">
          <el-checkbox
            :disabled="qryCheckIsAllDisabled"
            v-model="seeCheckAll"
            @change="handleSeeCheckAll"
            >查看</el-checkbox
          >
          <el-checkbox
            :disabled="updCheckIsAllDisabled"
            v-model="uploadCheckAll"
            @change="handleUploadCheckAll"
            >上传</el-checkbox
          >
          <el-checkbox
            :disabled="downCheckIsAllDisabled"
            v-model="downCheckAll"
            @change="handleDownCheckAll"
            >下载</el-checkbox
          >
          <el-checkbox
            :disabled="perCheckIsAllDisabled"
            v-model="perCheckAll"
            @change="handlePerCheckAll"
            >权限</el-checkbox
          >
          <el-checkbox
            :disabled="modCheckIsAllDisabled"
            v-model="editCheckAll"
            @change="handleEditCheckAll"
            >编辑</el-checkbox
          >
          <el-checkbox
            :disabled="delCheckIsAllDisabled"
            v-model="deleteCheckAll"
            @change="handledeleteCheckAll"
            >删除</el-checkbox
          >
          <el-checkbox
            :disabled="previewCheckIsAllDisabled"
            v-model="previewCheckAll"
            @change="handlePreviewCheckAll"
            >预览</el-checkbox
          >
        </el-form-item>
        <div class="folder-modal">
          <el-form-item
            class="doc-dialog-chk"
            v-for="(item, index) in addOrSetFolderForm.items"
            :key="index"
            :label="item.roleName"
            :prop="'items.' + index + '.filePermission'"
          >
            <el-checkbox
              :disabled="item.filePermission.qryDisabled"
              v-model="item.filePermission.qry"
              @change="seeCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.updDisabled"
              v-model="item.filePermission.upd"
              @change="updCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.downDisabled"
              v-model="item.filePermission.down"
              @change="downCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.permDisabled"
              v-model="item.filePermission.permission"
              @change="perCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.modDisabled"
              v-model="item.filePermission.mod"
              @change="modCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.delDisabled"
              v-model="item.filePermission.del"
              @change="delCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.previewDisabled"
              v-model="item.filePermission.preview"
              @change="previewCheckIsAll"
            ></el-checkbox>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="addFolder">
          确定
        </el-button>
        <el-button size="small" @click="showAddFolder = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showSetPermission"
      :modal-append-to-body="false"
      width="600px"
      title="权限设置"
    >
      <div class="doc-dialog-title">
        <i class="el-icon-folder"></i>
        <span>{{ currentFolder.fileName }}</span>
      </div>
      <el-form label-width="150px" label-position="left">
        <el-form-item label="全选" class="doc-dialog-chks">
          <el-checkbox
            :disabled="qryCheckIsAllDisabled"
            v-model="seeCheckAll"
            @change="handleSeeCheckAll"
            >查看</el-checkbox
          >
          <el-checkbox
            :disabled="updCheckIsAllDisabled"
            v-model="uploadCheckAll"
            @change="handleUploadCheckAll"
            >上传</el-checkbox
          >
          <el-checkbox
            :disabled="downCheckIsAllDisabled"
            v-model="downCheckAll"
            @change="handleDownCheckAll"
            >下载</el-checkbox
          >
          <el-checkbox
            :disabled="perCheckIsAllDisabled"
            v-model="perCheckAll"
            @change="handlePerCheckAll"
            >权限</el-checkbox
          >
          <el-checkbox
            :disabled="modCheckIsAllDisabled"
            v-model="editCheckAll"
            @change="handleEditCheckAll"
            >编辑</el-checkbox
          >
          <el-checkbox
            :disabled="delCheckIsAllDisabled"
            v-model="deleteCheckAll"
            @change="handledeleteCheckAll"
            >删除</el-checkbox
          >
          <el-checkbox
            :disabled="previewCheckIsAllDisabled"
            v-model="previewCheckAll"
            @change="handlePreviewCheckAll"
            >预览</el-checkbox
          >
        </el-form-item>
        <div class="folder-modal">
          <el-form-item
            class="doc-dialog-chk"
            v-for="(item, index) in addOrSetFolderForm.items"
            :key="index"
            :label="item.roleName"
            :prop="'items.' + index + '.filePermission'"
          >
            <el-checkbox
              :disabled="item.filePermission.qryDisabled"
              v-model="item.filePermission.qry"
              @change="seeCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.updDisabled"
              v-model="item.filePermission.upd"
              @change="updCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.downDisabled"
              v-model="item.filePermission.down"
              @change="downCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.permDisabled"
              v-model="item.filePermission.permission"
              @change="perCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.modDisabled"
              v-model="item.filePermission.mod"
              @change="modCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.delDisabled"
              v-model="item.filePermission.del"
              @change="delCheckIsAll"
            ></el-checkbox>
            <el-checkbox
              :disabled="item.filePermission.previewDisabled"
              v-model="item.filePermission.preview"
              @on-change="previewCheckIsAll"
            ></el-checkbox>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="setFolderPermission()">
          确定
        </el-button>
        <el-button size="small" @click="showSetPermission = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showRenameFolder"
      :modal-append-to-body="false"
      width="500px"
      title="重命名"
    >
      <el-form
        label-width="80px"
        label-position="left"
        style="padding-top: 20px"
      >
        <el-form-item label="名称">
          <el-input
            placeholder="请输入重命名称"
            v-model="reNameFileNameInput"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="reNameFileOrFolder()">
          确定
        </el-button>
        <el-button size="small" @click="showRenameFolder = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
    <preview ref="preview"></preview>
  </div>
</template>
<script>
import PageTitle from '@/rebuild/components/pageTitle'
import Nav from '@/rebuild/components/nav'
import Tree from '@/rebuild/components/tree'
import { getUserRoleAndPermission } from '@/api/role.js'
import documentReq from '@/api/document.js'
import Cookies from 'js-cookie'
import axios from 'axios'
import preview from './components/preview.vue'
export default {
  name: 'document',
  components: {
    Nav,
    PageTitle,
    Tree,
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
      reNameFileNameInput: null,
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
      showAddFolderLoading: false,
      showSetPermission: false,
      showSetPermissionLoading: false,
      showDeleteFolder: false,
      showRenameFolder: false,
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
      documentColumns: [],
      rightFileTable: [],
      selectFileAll: false,
      selectedFileItems: [],
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
          id: '-1',
          label: '全部文件',
          expand: true,
          fileId: -1,
          fileType: '1',
          _children: []
        }
      ],
      expandKeys: [],
      leaf: [],
      tableLoading: false
    }
  },
  methods: {
    // 预览文件
    previewFile(row) {
      const previewUrl = `${location.origin}/ctg-workflow/fileManage/preview?fileId=${row.fileId}`
      const previewExt = this.getExt(row.fileName)
      if (this.validateFile(previewExt)) {
        this.$refs.preview.show({
          url: previewUrl,
          ext: previewExt
        })
      } else {
        this.$message.warning('不支持预览此文件类型')
      }
    },
    // 获取url后缀
    getExt(url) {
      if (this.ext) return this.ext

      const lastIndex = url.lastIndexOf('.')
      return url.substr(lastIndex + 1)
    },
    // 验证文件类型
    validateFile(ext) {
      return (
        [
          'doc',
          'docx',
          'xls',
          'xlsx',
          'ppt',
          'pptx',
          'pdf',
          'txt',
          'gif',
          'jpg',
          'jpeg',
          'png',
          'bmp'
        ].indexOf(ext.toLowerCase()) !== -1
      )
    },
    getFuzzyFiles() {
      let params = {}
      this.loadNodeData({ fileId: -1 }, result => {
        this.fileTreeData[0]._children = result
      })
      this.breadcrumbs = []
      params.needUser = this.currentUserId
      params.fileName = this.inputDocumentName
      this.getLoading = true
      this.tableLoading = true
      documentReq
        .getFuzzyFileTrees(params)
        .then(res => {
          if (res.code === '0') {
            this.rightFileTable = res.info
          }
        })
        .catch(err => {
          console.error(err)
          this.$message.error('This is an error:' + err)
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
        this.$message.success(file.name + ':上传成功！')
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
        this.$message.error(file.name + ':上传失败：' + res.msg)
      }
    },
    /**
     *   上传前确定上传地址
     */
    handleBeforeUpload(file) {
      //上传文件具有当前树形选中的文件夹的角色及其权限
      if (this.currentFolder.type === '0') {
        this.$message.warning(
          '提示：请选择左侧合适的文件夹，当前选中的为文件！'
        )
        return
      }
      if (this.selectFileTreeNode.data.id === '-1') {
        this.$message.warning(
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
    handleUploadError(error) {
      this.$message.info('上传出错：' + error)
    },
    openRenameFolder() {
      if (
        this.selectFileTreeNode.data.id === '-1' &&
        !this.selectedFileItems.length
      ) {
        this.$message.warning(
          '提示：请选择左侧合适的文件夹,当前选中为根节点或在右侧列表中选择项！'
        )
        return
      }
      this.reNameFileNameInput = this.reNameFileOrFolderForm.fileName
      this.showRenameFolder = true
    },
    openDeleteFolder() {
      if (!this.selectedFileItems.length) {
        this.$message.warning('提示：请在右侧选择文件列表项！')
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
        this.$message.success(this.selectTableItem.fileName + ':已删除！')
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
        this.$message.error(res.msg)
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
        this.$message.success('选择的文件已删除成功！')
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
        this.$message.error(res.msg)
      }
    },
    reNameFileOrFolder() {
      var params = {}
      this.reNameFileOrFolderForm.fileName = this.reNameFileNameInput
      params.fileId = this.reNameFileOrFolderForm.fileId
      params.fileName = this.reNameFileOrFolderForm.fileName
      documentReq
        .reNameFileOrFolder(params)
        .then(res => {
          if (res.code === '0') {
            this.$message.success(params.fileName + '   :重命名成功！')
            this.showRenameFolder = false
            //更新右侧列表,更新当前节点，更新子节点
            this.updateNodeAndRightTable(
              this.reNameFileOrFolderForm.fileId,
              this.reNameFileOrFolderForm.fileName
            )
          } else {
            // 获取数据失败
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
          this.$message.error('res.msg')
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
        this.$message.warning('提示：请在右侧选择文件列表项！')
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
        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('qry') !== -1) {
            this.othersQryCheckDisabled = false
            break
          }
        }
        //规则：只要具有当前文件夹的角色任一个不具有'qry'权限，'qry'全选选择框置为不可选
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('qry') ===
            -1
          ) {
            this.qryCheckIsAllDisabled = true
            break
          }
        }

        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('upd') !== -1) {
            this.othersUpdCheckDisabled = false
            break
          }
        }
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('upd') ===
            -1
          ) {
            this.updCheckIsAllDisabled = true
            break
          }
        }

        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('down') !== -1) {
            this.othersDownCheckDisabled = false
            break
          }
        }
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
              'down'
            ) === -1
          ) {
            this.downCheckIsAllDisabled = true
            break
          }
        }
        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (
            this.currentFolder.roleCodes[i].roles.indexOf('permission') !== -1
          ) {
            this.othersPerCheckDisabled = false
            break
          }
        }
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
              'permission'
            ) === -1
          ) {
            this.perCheckIsAllDisabled = true
            break
          }
        }
        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('mod') !== -1) {
            this.othersModCheckDisabled = false
            break
          }
        }
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('mod') ===
            -1
          ) {
            this.modCheckIsAllDisabled = true
            break
          }
        }
        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('del') !== -1) {
            this.othersDelCheckDisabled = false
            break
          }
        }
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf('del') ===
            -1
          ) {
            this.delCheckIsAllDisabled = true
            break
          }
        }
        for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('preview') !== -1) {
            this.othersPreviewCheckDisabled = false
            break
          }
        }
        for (
          let i = 0;
          i < this.currentFolderAllRoleCodes.roleCodes.length;
          i++
        ) {
          if (
            this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
              'preview'
            ) === -1
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
        this.$message.warning(
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
            for (let i = 0; i < this.currentFolder.roleCodes.length; i++) {
              currentFolderRoleIds.push(this.currentFolder.roleCodes[i].roleId)
            }

            for (
              let i = 0;
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
                if (i !== -1) {
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('qry') !== -1
                  ) {
                    item.filePermission.qry = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('upd') !== -1
                  ) {
                    item.filePermission.upd = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('down') !== -1
                  ) {
                    item.filePermission.down = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf(
                      'permission'
                    ) !== -1
                  ) {
                    item.filePermission.permission = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('mod') !== -1
                  ) {
                    item.filePermission.mod = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('del') !== -1
                  ) {
                    item.filePermission.del = true
                  }
                  if (
                    this.currentFolder.roleCodes[i].roles.indexOf('preview') !==
                    -1
                  ) {
                    item.filePermission.preview = true
                  }
                }
              } else {
                //普通用户，调getAllRolesFolderPerm接口，获取包括当前用户所属角色在内的角色对当前文件夹的权限
                let i = currentFolderAllRoleIds.indexOf(
                  this.allUserRoles[j].roleId
                )
                if (i !== -1) {
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'qry'
                    ) !== -1
                  ) {
                    item.filePermission.qry = true
                  } else {
                    item.filePermission.qryDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'upd'
                    ) !== -1
                  ) {
                    item.filePermission.upd = true
                  } else {
                    item.filePermission.updDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'down'
                    ) !== -1
                  ) {
                    item.filePermission.down = true
                  } else {
                    item.filePermission.downDisabled = true
                  }

                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'permission'
                    ) !== -1
                  ) {
                    item.filePermission.permission = true
                  } else {
                    item.filePermission.permDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'mod'
                    ) !== -1
                  ) {
                    item.filePermission.mod = true
                  } else {
                    item.filePermission.modDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'del'
                    ) !== -1
                  ) {
                    item.filePermission.del = true
                  } else {
                    item.filePermission.delDisabled = true
                  }
                  if (
                    this.currentFolderAllRoleCodes.roleCodes[i].roles.indexOf(
                      'preview'
                    ) !== -1
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
            this.$message.error(res.msg)
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
      this.showAddFolderLoading = true
      var t
      clearTimeout(t)
      var tempThis = this
      t = setTimeout(function() {
        tempThis.showAddFolder = true
        tempThis.$nextTick(() => {
          tempThis.showAddFolderLoading = false
        })
      }, 10)
    },
    //addOrSetFolderForm显示会由上次的变为当前的，存在突变，这里延迟显示addOrSetFolderForm
    openSetPermission() {
      if (this.selectFileTreeNode.data.id === '-1') {
        this.$message.warning(
          '提示：请选择左侧合适的文件夹，当前选中为根节点！'
        )
        return
      }
      this.showSetPermissionLoading = true
      var t
      clearTimeout(t)
      var tempThis = this
      t = setTimeout(function() {
        tempThis.showSetPermission = true
        tempThis.$nextTick(() => {
          tempThis.showSetPermissionLoading = false
        })
      }, 10)
    },

    /**
     * 新增文件夹
     */
    async addFolder() {
      if (this.newFolderName === null || this.newFolderName === '') {
        this.$message.error('请输入新建文件夹的名称！')
        return
      }
      var params = {}
      params.roleCodes = []
      params.fileName = this.newFolderName
      //创建第一级目录
      if (this.selectFileTreeNode.data.id === '-1') {
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
            key !== 'qryDisabled' &&
            key !== 'updDisabled' &&
            key !== 'downDisabled' &&
            key !== 'permDisabled' &&
            key !== 'modDisabled' &&
            key !== 'delDisabled' &&
            key !== 'previewDisabled'
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
        this.$message.success(params.fileName + ':文件夹新建成功！')
        this.showAddFolder = false
        //3.更新右侧列表
        //4.更新左侧文件树
        if (this.selectFileTreeNode.data.id === '-1') {
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
        this.$message.error(res.msg)
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
            key !== 'qryDisabled' &&
            key !== 'updDisabled' &&
            key !== 'downDisabled' &&
            key !== 'permDisabled' &&
            key !== 'modDisabled' &&
            key !== 'delDisabled' &&
            key !== 'previewDisabled'
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
        this.$message.success(
          this.currentFolder.fileName + ':文件夹权限设置成功！'
        )
        this.showSetPermission = false
        //更新右侧列表
        this.getSubFiles(this.currentUserId, this.currentFolder.fileId)
        //更新当前选中节点（即当前文件夹的权限信息）
        let params = {}
        params.needUser = this.currentUserId
        params.fileId = this.selectFileTreeNode.data.fileId
        documentReq
          .getFolderPerm(params)
          .then(res => {
            if (res.code === '0') {
              if (
                res.info.reWfFileManages !== null &&
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
                  let rodeCode = {}
                  rodeCode.roleId = key
                  rodeCode.roles = res.info.roleId2role[key]
                  this.currentFolder.roleCodes.push(rodeCode)
                }
              }
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {})
      } else {
        this.$message.error(res.msg)
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
            const children = data._children || []
            children.push({
              id: fileId,
              label: newFileOrFolderName,
              fileId: fileId,
              fileType: fileType,
              leaf: true
            })
            this.refreshSelectedNode(children)
            this.$set(data, '_children', children)
          } else {
            this.$message.error(res.msg)
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
          if (res.info.length === 0) delete item._children
          let childList = []
          subFileNodes.forEach(function(item) {
            let child = {
              id: item.fileId,
              label: item.fileName,
              fileId: item.fileId,
              fileType: item.type,
              leaf: true
            }
            if (item.parent === true) {
              child.leaf = false
              child._children = []
            }
            childList.push(child)
          })
          this.refreshSelectedNode(childList)
          this.$set(item, '_children', childList)
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
        this.$set(this.selectFileTreeNode.data, 'label', fileName)
      } else {
        //如果是当前节点的子节点
        let childList = []
        for (var i = 0; i < this.rightFileTable.length; i++) {
          let child = {
            id: this.rightFileTable[i].fileId,
            label: this.rightFileTable[i].fileName,
            fileId: this.rightFileTable[i].fileId,
            fileType: this.rightFileTable[i].type,
            leaf: true
          }
          //如果右侧选中的是子节点是文件夹
          if (this.rightFileTable[i].type === '1') {
            child.leaf = false
            child._children = []
          }
          //更新左侧树子节点名称，更新右侧列表
          if (this.rightFileTable[i].fileId === fileId) {
            child.label = fileName
            this.rightFileTable[i].fileName = fileName
          }
          childList.push(child)
        }
        this.refreshSelectedNode(childList)
        this.$set(this.selectFileTreeNode.data, '_children', childList)
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
        this.addOrSetFolderForm.items[
          i
        ].filePermission.preview = this.previewCheckAll
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
    downLoad() {
      documentReq
        .download({
          fileId: '',
          fileName: '',
          path: ''
        })
        .then(() => {})
        .catch(err => {
          $.IShowError(err)
        })
        .finally(() => {})
    },
    /**currentUserId后台会从session中获取，这个参数暂时保留,随便塞个值
     */
    getCurrentUserId() {
      var loginName = Cookies.get('user')
      if (loginName) this.currentUserId = loginName
      else this.currentUserId = 'loginName'
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
        this.$message.error(res.msg)
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
            this.$message.error(res.msg)
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
              this.fileTreeData[0]._children.push(child)
            }
          } else {
            this.$message.error(res.msg)
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
            this.$message.error(res.msg)
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
    getTableChosedValue(selection) {
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
    documentRowdbClick(data) {
      if (data.type === '1') {
        var folderNode = {
          node: {
            id: data.fileId,
            label: data.fileName,
            fileId: data.fileId,
            fileType: '1',
            _children: data._children,
            nodeKey: ''
          },
          parent: this.selectFileTreeNode.data.id,
          nodeKey: '',
          _children: []
        }
        for (
          var i = 0;
          i < this.selectFileTreeNode.data._children.length;
          i++
        ) {
          if (
            this.selectFileTreeNode.data._children[i].fileId === data.fileId
          ) {
            // 1.用于获得在左边树中的真正选中节点;2.展开树中选中节点
            this.selectFileTreeNode.data = this.selectFileTreeNode.data._children[
              i
            ]
            this.$refs.docTree.selectNode(this.selectFileTreeNode.data.id)
            this.selectFileTreeNode.node = this.$refs.docTree.getNode(
              this.selectFileTreeNode.data.id
            )
            this.expandKeys = [this.selectFileTreeNode.data.id]
            break
          }
        }

        this.selectFileNodeBydbClick(this.selectFileTreeNode.data, folderNode)
      }
    },
    /**
     * 自定义文件树节点显示
     */
    // eslint-disable-next-line
    fileRenderContent(h, { node, data, store }) {
      // 设置树节点选中的样式
      let fontColor = ''
      if (
        data.hasOwnProperty('fileId') &&
        this.selectFileTreeNode !== null &&
        this.selectFileTreeNode.data !== null &&
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
              h('I', {
                class: {
                  'el-icon-folder': true
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
                  }
                },
                data.label
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
                  }
                },
                data.label
              )
            ])
          ]
        )
      }
    },
    /**点击节点左侧展开时，展开节点
     */
    loadNodeData(item, callback) {
      let param = { needUser: this.currentUserId, parFileId: item.fileId }
      documentReq
        .getSubFiles(param)
        .then(res => {
          let subFileNodes = res.info
          if (res.info.length === 0) delete item._children
          let childList = []
          subFileNodes.forEach(function(item) {
            let child = {
              id: item.fileId,
              label: item.fileName,
              // title: item.fileName,
              fileId: item.fileId,
              fileType: item.type,
              leaf: true
            }
            if (item.parent === true) {
              child.leaf = false
              child._children = []
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
            if (res.info.length === 0) delete item._children
            let childList = []
            this.rightFileTable.forEach(function(item) {
              let child = {
                id: item.fileId,
                label: item.fileName,
                fileId: item.fileId,
                fileType: item.type,
                leaf: true
              }
              if (item.parent === true) {
                child.leaf = false
                child._children = []
              }
              childList.push(child)
            })
            this.$set(item, '_children', childList)

            // this.selectFileTreeNode.data = item
          } else {
            this.$message.error(res.msg)
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
    selectFileNodeBydbClick(data) {
      this.currentFolder = {
        roleCodes: [],
        rootUSer: this.currentFolder.rootUSer
      }
      //更新节点及右侧列表
      this.updateNodesAndTable(data, this.currentUserId, data.fileId)
      //更新当前文件夹
      var params = {}
      params.needUser = this.currentUserId
      params.fileId = data.fileId

      documentReq
        .getFolderPerm(params)
        .then(res => {
          if (res.code === '0') {
            if (
              res.info.reWfFileManages !== null &&
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
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {})
    },
    //点击左侧树节点
    selectFileNode(data, node) {
      if (data.fileType === '0') {
        this.$message.info('请选择左侧目录中的文件夹进行操作！')
        this.$refs.docTree.selectNode(this.selectFileTreeNode.data.id)
        return
      }
      this.currentFolder = {
        roleCodes: [],
        rootUSer: this.currentFolder.rootUSer
      }
      //更新选中的节点
      // this.selectFileTreeNode.root = root
      this.selectFileTreeNode.node = node
      this.selectFileTreeNode.data = data
      //如果是根目录，创建第一级文件夹的情况，需要特殊处理
      if (this.selectFileTreeNode.data.id === '-1') {
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
        // this.breadcrumbs = this.getParentNodes(root, node)
        //初始化新建文件夹的权限选择情况
        this.changeAddOrSetFolderFormWhenFirstNode()
      } else {
        //更新节点及右侧列表
        this.updateNodesAndTable(data, this.currentUserId, data.fileId)
        // 计算面包屑数据
        // this.breadcrumbs = this.getParentNodes(root, node)

        //更新当前文件夹
        var params = {}
        params.needUser = this.currentUserId
        params.fileId = data.fileId

        documentReq
          .getFolderPerm(params)
          .then(res => {
            if (res.code === '0') {
              if (
                res.info.reWfFileManages !== null &&
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
              this.$message.error(res.msg)
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
        node =>
          node.node.nodeKey === node.nodeKey &&
          node.nodeKey === targetNode.nodeKey
      )
      index > -1 &&
        rst.unshift({
          root,
          node: targetNode,
          data: targetNode.node
        })
      while (index > -1) {
        if (
          root[index].nodeKey === targetNode.parent &&
          root[index].node.nodeKey === root[index].nodeKey
        ) {
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
              RegExp.$1.length === 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
        return fmt
      }
    },
    // 懒加载树节点数据调用方法
    loadLazyTree(node, resolve) {
      if (node.level === 0) {
        return resolve(this.fileTreeData)
      } else {
        this.loadNodeData(node.data, result => {
          resolve(result)
        })
      }
    },
    // 刷新左侧树已选中树节点的数据方法 - 源码调用非开放方法
    refreshSelectedNode(newChildren) {
      let node = this.selectFileTreeNode.node
      let nodeChildren = node.childNodes
      nodeChildren.splice(0, nodeChildren.length)
      node.doCreateChildren(newChildren)
    },
    // 确认删除单个或批量文件/文件夹方法
    confirmDelFile(row) {
      if (!this.selectedFileItems.length && !row) {
        this.$message.warning('提示：请在右侧列表勾选要删除的文件！')
        return
      }
      if (row) {
        this.selectTableItem = row
        this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFile()
        })
      } else {
        this.$confirm('此操作将永久删除所选文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteFolder()
        })
      }
    },
    formatDateTime(row, column) {
      return new Date(row[column.property]).Format('yyyy-MM-dd hh:mm:ss')
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
      this.expandKeys = [-1]
      this.$refs.docTree.selectNode(-1)
      this.selectFileNode(this.fileTreeData[0], this.$refs.docTree.getNode(-1))

      //初始化右侧文件夹列表，-1默认的是文件服务器根目录
      this.getSubFiles(this.currentUserId, -1)
      //初始化当前文件夹,显示当前用户的左侧文件夹树及其文件夹权限
      this.initCurrentFolder()
      //根节点时，初始化数据及操作按钮初始都可操作
      if (this.selectFileTreeNode.data.id === '-1') {
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
        // this.breadcrumbs = this.getParentNodes(
        //   this.selectFileTreeNode.root,
        //   this.selectFileTreeNode.node
        // )
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
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('upd') !== -1) {
            return false
          }
        }
        return true
      },
      set() {}
    },
    addFolderDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('upd') !== -1) {
            return false
          }
        }
        return true
      },
      set() {}
    },
    deleteDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('del') !== -1) {
            return false
          }
        }
        return true
      },
      set() {}
    },
    reNameDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('mod') !== -1) {
            return false
          }
        }
        return true
      },
      set() {}
    },
    setPermissionDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (
            this.currentFolder.roleCodes[i].roles.indexOf('permission') !== -1
          ) {
            return false
          }
        }
        return true
      },
      set() {}
    },
    downLoadDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('down') !== -1) {
            return false
          }
        }
        return true
      },
      set() {}
    },
    previewDisabled: {
      get() {
        if (
          this.selectFileTreeNode.data.id === '-1' ||
          this.currentFolder.rootUSer
        ) {
          return false
        }
        for (var i = 0; i < this.currentFolder.roleCodes.length; i++) {
          if (this.currentFolder.roleCodes[i].roles.indexOf('preview') !== -1) {
            return false
          }
        }
        return true
      },
      set() {}
    }
  }
}
</script>
<style lang="scss">
@import '~@/rebuild/assets/style/element';
.doc-tbl {
  @include element;
  &-header {
    margin-bottom: 24px;
  }
  &-desc {
    display: flex;
    margin-bottom: 10px;
    p:first-child {
      flex-grow: 1;
    }
  }
  /deep/ .el-table {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }
}
</style>
<style lang="scss" scoped>
@import '~@/rebuild/assets/style/base.scss';
@import '~@/rebuild/assets/style/layout.scss';
.docment-manage {
  height: 100%;
  padding-top: 50px;
  background-color: #fff;
  .g-aside {
    overflow: scroll;
  }
  .u-bd-bottom {
    border-bottom: 1px solid $color-layout-border;
  }
  .u-bd-right {
    border-right: 1px solid $color-layout-border;
  }
  .u-pd-20-20 {
    padding: 20px 20px;
  }
  .u-pd-20-30 {
    padding: 20px 30px;
  }
  .upload-btn {
    display: inline;
    padding: 0 5px;
    /deep/ .el-upload__input {
      display: none;
    }
  }
  .doc-tbl-header {
    display: flex;
    .button-list {
      flex-grow: 1;
    }
  }
  .doc-dialog-title {
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
    i {
      font-size: 16px;
      padding: 5px 15px;
      color: $color-main;
    }
    span {
      font-size: 14px;
    }
  }
  .folder-modal {
    overflow: scroll;
    height: 300px;
  }
  .doc-dialog-chks {
    background: #f5f5f5;
    // padding: 10px 0;
  }
  /deep/ .el-dialog__body {
    padding-top: 0;
    .el-form-item__label {
      font-weight: normal;
      padding-left: 10px;
    }
    .el-checkbox {
      margin-right: 10px;
      .el-checkbox__label {
        padding-left: 6px;
        font-size: 12px;
      }
    }
  }
  .doc-dialog-chk {
    margin-bottom: 10px;
    /deep/ .el-checkbox {
      margin-right: 40px;
    }
    /deep/ .el-checkbox:last-child {
      margin-right: 0;
    }
  }
}
</style>
