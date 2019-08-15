<template>
  <div id="appRole" scroll="no">
    <!-- 权限管理内容展示区 -->
    <div class="OrgContainer" :style="'height:'+containerH+'px'">
      <Row :style="'height:'+containerH+'px;z-index:0'" >
        <!-- 左侧角色列表 -->
        <Col span="4" class="Org_Left_Container">
          <!-- 角色树状图 -->
            <div class="role-list-wrap-layout">
              <div class="role-button-container">
                <Button type="primary" size="small" @click.prevent="showCreatRoleMModal">新建角色</Button>
                <Button type="primary" size="small" @click.prevent="showCreatRoleGroupModal">新建角色组</Button>
                <!-- <a class="creat-role role-button" @click.prevent="showCreatRoleMModal">+ 新建角色</a> -->
                <!-- <a class="copy-role role-button" @click.prevent="showCopyRoleModal">复制角色</a> -->
              </div>
              <div class="Org_Search">
                 <input type="text" v-model="searchRoleWord" class="Org_Search_Input" placeholder="搜索角色" @keyup.enter="SearchRoles"/>
                 <button class="Org_Search_Button ivu-icon ivu-icon-search" @click="SearchRoles"></button>
              </div>
              <Spin v-if="isSearchRole" fix></Spin>
              <div class="role-list-wrap" ref="roleListWrap">
                <ul id="myTreeabc" ref="roleList">
                    <li v-if="showRoleData.length==0" class="list-group-item roleli">
                      <span class="rolename">未搜索到相关角色</span>
                    </li>
                    <li
                      v-else
                      v-for="(item, index) in showRoleData"
                      :key="item.id"
                      :objectId="item.id"
                      ref="role"
                      style="padding: 0;"
                      class="list-group-item roleli"
                      :class="{'active_div': clickIndex === index}"
                      @mouseout="hideIcon"
                      draggable="true"
                      :id="item.id"
                      @mouseover="showIcon(index, $event)"
                      @click.stop="item.type === '0' ? handleClickGroup(item) : getAppAndAuthority(item.id, index, item.name, item.roleType)"
                    >
                      <div v-if="item.type === '0'">
                        <div class="role-item-label">
                          <!-- <span :class="{'show':currentIndex === index}" class="icon-drag-role hide unit_edit mymove"></span> -->
                          <Icon v-if="!item.expand" type="arrow-right-b"></Icon>
                          <Icon v-if="item.expand" type="arrow-down-b"></Icon>
                          <span class="rolename" :title="item.name">{{item.name}}</span>
                          <span class="rolename" style="margin-left: 10px" v-if="item.memberCount !== null">
                            {{item.memberCount}}人
                          </span>
                          <Poptip placement="bottom" trigger="hover">
                            <span v-if="item.roleType !== '1' && item.roleType !== '0'" :class="{'show':currentIndex === index}" class="icon-setting-role unit_remove hide"></span>
                            <div slot="content">
                              <p @click.stop.prevent="showRenameModal(item.id, item.name, true)" class="tipsBtn"><a style="color:#495060;">修改</a></p>
                              <p @click.stop.prevent="showDelRole(item.id, item.name, true)" class="tipsBtn"><a style="color:red;">删除</a></p>
                            </div>
                          </Poptip>
                        </div>
                        <ul v-if="item.expand" style="padding-left: 15px;">
                          <li
                            v-if="item.loading"
                            style="padding: 0 0 0 15px;"
                            class="list-group-item roleli"
                          >
                            <Spin></Spin>
                          </li>
                          <li
                            v-if="!item.loading && (!item.children || item.children.length === 0)"
                            style="padding: 0 0 0 15px; color: #aaa;"
                            class="list-group-item roleli"
                          >
                            <span class="rolename">该分组下没有角色</span>
                          </li>
                          <li
                            v-for="(child, cIndex) in item.children || []"
                            :key="child.id"
                            :objectId="child.id"
                            ref="role"
                            style="padding: 0;"
                            class="list-group-item roleli"
                            :class="{'active_div': clickIndex === index + '-' + cIndex}"
                            @mouseout="hideIcon"
                            draggable="true"
                            :id="child.id"
                            @mouseover="showIcon(index + '-' + cIndex, $event)"
                            @click.stop="getAppAndAuthority(child.id, index + '-' + cIndex, child.name, child.roleType)"
                          >
                            <div class="role-item-label">
                              <!-- <span :class="{'show':currentIndex === index}" class="icon-drag-role hide unit_edit mymove"></span> -->
                              <i class="ivu-icon ivu-icon-person"></i>
                              <span class="rolename" :title="child.name">{{child.name}}</span>
                              <span class="rolename" style="margin-left: 10px" v-if="child.memberCount !== null">
                                {{child.memberCount}}人
                              </span>
                              <Poptip placement="bottom" trigger="hover">
                                <span v-if="child.roleType !== '1' && child.roleType !== '0'" class="icon-setting-role unit_remove hide"></span>
                                <div slot="content">
                                  <p @click.stop.prevent="showRenameModal(child.id, child.name, false, item.name)" class="tipsBtn"><a style="color:#495060;">修改</a></p>
                                  <p @click.stop.prevent="showCopyRoleModal(child.id, child.name)" class="tipsBtn"><a style="color:#495060;">复制</a></p>
                                  <p @click.stop.prevent="showDelRole(child.id, child.name)" class="tipsBtn"><a style="color:red;">删除</a></p>
                                </div>
                              </Poptip>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div v-else class="role-item-label">
                        <!-- <span :class="{'show':currentIndex === index}" class="icon-drag-role hide unit_edit mymove"></span> -->
                        <i class="ivu-icon ivu-icon-person"></i>
                        <span class="rolename" :title="item.name">{{item.name}}</span>
                        <span class="rolename" style="margin-left: 10px" v-if="item.memberCount !== null">
                          {{item.memberCount}}人
                        </span>
                        <Poptip placement="bottom" trigger="hover">
                          <span v-if="item.roleType !== '1' && item.roleType !== '0'" class="icon-setting-role unit_remove hide"></span>
                          <div slot="content">
                            <p @click.stop.prevent="showRenameModal(item.id, item.name)" class="tipsBtn"><a style="color:#495060;">修改</a></p>
                            <p @click.stop.prevent="showCopyRoleModal(item.id, item.name)" class="tipsBtn"><a style="color:#495060;">复制</a></p>
                            <p @click.stop.prevent="showDelRole(item.id, item.name)" class="tipsBtn"><a style="color:red;">删除</a></p>
                          </div>
                        </Poptip>
                      </div>
                    </li>
                </ul>
              </div>
            </div>
        </Col>
        <!-- 右侧角色权限设置，成员管理 -->
        <Col span="20" class="Org_Right_Container">
          <Tabs
            v-model="currentTab"
            @on-click="changeTab"
            :animated="false" >
            <TabPane label="角色权限设置" name="roleSetting">
              <!-- 保存权限设置 -->
              <div class="role-save">
                <a class="btn btn-primary  Role_Head_Button" id="Role_SaveRole" data-toggle="dropdown" @click="SaveAllNode()">
                    <span class="operattion">保存</span>
                </a>
              </div>
              <!-- 角色权限设置 -->
              <div class="roleacls" style="overflow: auto;">
                <div class="roleacls-content">
                  <div class="roleacls-header">
                    <div class="roleacls-app">应用权限</div>
                    <div class="roleacls-app"> 应用分组 </div>
                    <ul class="roleacls-category">
                        <li class="checked-all" v-show="!noDataFlag">
                            <input v-if="RoleType === '1'" id="form-checkedall" type="checkbox" :disabled="true" :checked="true"/>
                            <input v-else id="form-checkedall" type="checkbox"
                            :disabled="false" :checked="ifCheckAll" @click="formCheckAll($event)"/>
                            <label for="form-checkedall">全选</label>
                        </li>
                        <!-- <li class="roleacls-form">表单权限</li> -->
                        <li class="roleacls-list">列表权限</li>
                        <li class="roleacls-data">数据权限</li>
                    </ul>
                  </div>
                    <div class="app-content">
                      <!-- 应用列表 -->
                      <ul class="roleacls-acls" :style="'height:'+(containerH - 120)+'px'">
                        <li v-for="(acl, index) in aclsList" :class="{'active_div': appCurrentIndex === index}"
                          @click="getFormListAcls(acl, index)" class="apppackage-node-li roletoggle" :data-code="acl.id"
                          :key="acl.id"
                        >
                          <a class="apppackage-node-a" :data-code="acl.id">
                            <b class="icon-get" v-if="acl.hasAcl"></b>
                            <b class="icon-none" v-if="!acl.hasAcl"></b>
                            <label :title="acl.Name">{{acl.moduleName}}</label>
                          </a>
                        </li>
                      </ul>
                      <ul class="roleacls-acls" :style="'height:'+(containerH - 120)+'px'">
                        <li
                          v-for="(acl, index) in aclsGroups"
                          :class="{'active_div': appGroupsIndex === index}"
                          @click="getGroupsListAcls(index)"
                          class="apppackage-node-li roletoggle"
                          :data-code="acl.id"
                          :key="acl.id"
                        >
                          <a class="apppackage-node-a" :data-code="acl.id">
                            <b class="icon-get" v-if="acl.hasAcl"></b>
                            <b class="icon-none" v-if="!acl.hasAcl"></b>
                            <label :title="acl.Name">{{acl.groupName}}</label>
                          </a>
                        </li>
                      </ul>
                      <!-- 应用表单列表 -->
                      <div class="app-formlist" :style="'height:'+(containerH - 120)+'px'">
                          <div class="not-data" v-show="noDataFlag">
                              <img src="../../images/meiyoushuju.png" width="152" height="180">
                              <p>选择应用 开始配置权限</p>
                          </div>
                          <ul class="formlist" v-show="!noDataFlag">
                            <!-- 需要配置权限的表单、报表 -->
                            <li class='sheet-node-li' v-for="(sheet, index) in formlistData" :key="sheet.id"
                             :data-code="sheet.id" :data-type="sheet.type">
                              <a class='sheet-node-a'>
                                <div class='roletogglesheet'>
                                  <i class='icon-arrow-down-role roletogglesheet hideli' @click="toggleAclDetail(sheet)"></i>
                                  <input v-if="RoleType === '1'" class='roletogglesheet' type='checkbox' data-checkall='checkall'
                                   :disabled="true" :checked="true" :id="sheet.id + '_input'"
                                  />
                                  <input v-else class='roletogglesheet' type="checkbox" data-checkall='checkall' ref="formCheck"
                                   :disabled="false" :checked="sheet.hasAcl" :id="sheet.id + '_input'" @click="activeAclInput(sheet, $event, 'sheet')"
                                  />
                                  <label :for="sheet.id + '_input'" :title="sheet.Name">{{sheet.appName}}</label>
                                </div>
                              </a>
                              <ul class='appcontent-ul' :class="{'disable-all-input':sheet.hasAcl, 'hide': hideFlag}">
                                <!-- 表单权限 -->
                               <!--  <li class='sheet-node-childnode'>
                                  <div class='sheet-acl-action' v-if="sheet.Type != 210">
                                    <div class='sheet-checkall' v-if="sheet.authority.FormActions.length>0">
                                      <input v-if="RoleId===AdminRoleId" :id="sheet.Code + '_sheetcheckall'" type='checkbox' class='checkall' :disabled="true" :checked="true"/>
                                      <input v-else :id="sheet.Code + '_sheetcheckall'" type='checkbox' class='checkall' :checked="sheet.authority.FormActionsAllChecked"
                                      :disabled="sheet.hasAcl ? false : true" @click="checkAllAcl(sheet, 'form', $event)" :ref="sheet.Code + '_all'"/>
                                      <label :for="sheet.Code + '_sheetcheckall'">全选</label>
                                    </div>
                                    <div class="roleactioncontainer" v-if="sheet.authority.FormActions.length>0" v-for="item in sheet.authority.FormActions" :key="item.Code">
                                      <input v-if="RoleId===AdminRoleId" :id="sheet.Code + '_' + item.Code + '_form'" type="checkbox" :data-code="item.Code" :data-name="item.Name" :checked="true" :disabled="true">
                                      <input  v-else :id="sheet.Code + '_' + item.Code + '_form'" type="checkbox" :data-code="item.Code" :data-fixcode="item.Code+form_postfix"
                                       :data-name="item.Name" :checked="item.hasAcl"  @click="activeAclInput(sheet, $event, 'form')" :disabled="sheet.hasAcl ? false : true" :ref="sheet.Code + '_form'">
                                      <label :for="sheet.Code + '_' + item.Code + '_form'">{{item.Name}}</label>
                                    </div>
                                  </div>
                                </li> -->

                                <!-- 列表权限 -->
                                <li class='listview-node-childnode' >
                                  <div class='listview-acl-action'>
                                    <div class='listview-checkall' v-if="sheet.authority.ListViewActions.length>0">
                                      <input v-if="RoleType === '1'" :id="sheet.id + '_listcheckall'" type='checkbox' class='checkall' :disabled="true" :checked="true"/>
                                      <input v-else :id="sheet.id + '_listcheckall'" type='checkbox' class='checkall' :checked="sheet.authority.ListActionsAllChecked"
                                  :disabled="sheet.hasAcl ? false : true" @click="checkAllAcl(sheet, 'list', $event)" :ref="sheet.id + '_all'"/>
                                      <label :for="sheet.id + '_listcheckall'">全选</label>
                                    </div>
                                    <div class="roleactioncontainer" v-for="item in sheet.authority.ListViewActions" :key="item.code">
                                      <input v-if="RoleType === '1'" :id="sheet.id + '_' + item.code + '_list'"  type="checkbox" :data-code="item.code" :data-name="item.name" :checked="true" :disabled="true">
                                      <input v-else :id="sheet.id + '_' + item.code + '_list'" type="checkbox" :data-code="item.code" :data-fixcode="item.code+list_postfix"
                                      :data-name="item.name" :checked="item.hasAcl"  @click="activeAclInput(sheet, $event, 'list')" :disabled="sheet.hasAcl ? false : true" :ref="sheet.id + '_list'">
                                      <label :for="sheet.id + '_' + item.code + '_list'" :title="item.name">{{item.name}}</label>
                                    </div>
                                  </div>
                                </li>
                                <!-- 数据权限 -->
                                <li class='scopetypes-node-childnode'>
                                   <!-- 系统管理员，统一选中全部 -->
                                  <div v-if="RoleType === '1'" class='scopetypes-acl-action'>
                                    <div  class='rdio rdio- primary' v-if = "sheet.type == 'app'">
                                      <input :id="sheet.id + '___owneracl'" type='radio' value='0' :name="sheet.Code + '_scopetypename'" :disabled="true" :checked="false"/>
                                      <label :for="sheet.id + '___owneracl'">本人</label>
                                    </div>
                                    <div v-else >
                                      <label>  </label>
                                    </div>
                                    <div  class='rdio rdio- primary' v-if = "sheet.type == 'app'">
                                      <input :id="sheet.id + '___organizationacl'" type='radio' value='1' :name="sheet.id + '_scopetypename'" :disabled="true" :checked="false" />
                                      <label :for="sheet.id + '___organizationacl'">所属部门</label>
                                    </div>
                                    <div v-else >
                                      <label>  </label>
                                    </div>
                                    <div class='rdio rdio- primary' style="margin-bottom: 5px;" v-if = "sheet.type == 'app'">
                                      <input :id="sheet.id + '___allacl'" type='radio' value='2' :name="sheet.id + '_scopetypename'" :disabled="true" :checked="true"/>
                                      <label :for="sheet.id + '___allacl'">全部</label>
                                    </div>
                                    <div v-else >
                                      <label>  </label>
                                    </div>
                                  </div>
                                    <!-- 非系统管理员，按照返回数据状态进行选中 -->
                                  <div v-else class='scopetypes-acl-action'>
                                    <div class='rdio rdio- primary' v-if = "sheet.type == 'app'">
                                      <input v-if="sheet.hasAcl" :id="sheet.id + '___owneracl'" type='radio' @click="activeAclInput(sheet, $event, 'radio')" :ref="sheet.id + '_radio'"  value='0' :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="true"/>
                                      <input v-else :id="sheet.id + '___owneracl'" type='radio' @click="activeAclInput(sheet, $event, 'radio')" :ref="sheet.id + '_radio'"  value='0' :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="sheet.authority.scopeType==0 ? true : false"/>
                                      <label :for="sheet.id + '___owneracl'">本人</label>
                                    </div>
                                    <div v-else >
                                      <label>  </label>
                                    </div>
                                    <div  class='rdio rdio- primary' v-if = "sheet.type == 'app'">
                                      <input :id="sheet.id + '___organizationacl'" @click="activeAclInput(sheet, $event, 'radio')" type='radio' :ref="sheet.id + '_radio'" value='1' :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="sheet.authority.scopeType==1 ? true : false" />
                                      <label :for="sheet.id + '___organizationacl'">所属部门</label>
                                    </div>
                                    <div v-else >
                                      <label>  </label>
                                    </div>
                                    <div class='rdio rdio- primary' style="margin-bottom: 5px;" v-if = "sheet.type == 'app'">
                                      <input :id="sheet.id + '___allacl'" type='radio' @click="activeAclInput(sheet, $event, 'radio')" value='2' :ref="sheet.id + '_radio'" :name="sheet.id + '_scopetypename'" :disabled="sheet.hasAcl ? false : true" :checked="sheet.authority.scopeType==2 ? true : false"/>
                                      <label :for="sheet.id + '___allacl'">全部</label>
                                    </div>
                                    <div v-else >
                                      <label>  </label>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                      </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane label="角色表单设置" name="roleControlSetting">
              <role-control-manager
                :roleId="RoleId"
                :adminRoleId="AdminRoleId"
                :containerH="containerH"
                :aclsList="aclsList"
              ></role-control-manager>
            </TabPane>
            <TabPane v-if="RoleType !== '0'" label="角色成员设置" name="roleMemberManage">
              <!-- 角色成员管理 -->
              <div class="users-button">
                  <a class="btn Role_Head_Button Role_Add_Users" id="Role_Add_Users" @click="ModeAddRoleUsersShow">
                     <span class="operattion">添加成员</span>
                  </a>
                  <a class="btn Role_Head_Button Role_Remove_Users" id="Role_Remove_Users" @click="RemoveSingleRole('', '批量删除成员')" :disabled="romoveAllFlag">
                      <span class="operattion">批量移除成员</span>
                  </a>
              </div>
              <div class="roleusers" :style="'max-height:'+(containerH - 120)+'px'">
                <Row class="roleuserstitle">
                  <Col span="1">
                    <input class="mycheckboxinput" id="checkAllFalg" type="checkbox" ref="checkAllFalg" @click="CheckAll($event);">
                    <label for="checkAllFalg" class="mycheckboxlabel" style="padding: 0;"></label>
                  </Col>
                  <div v-if="RoleType !== '1'">
                    <Col span="6">成员类型</Col>
                    <Col span="5">
                      成员名称
                      <!-- <p style="padding-left: 68px;float: left;line-height: 28px;">成员名称</p>
                      <div class="searchroleusernew">
                        <i class="icon-search qwertjdsqasdf" @click="showSearchInput = true"></i>
                        <div v-show="showSearchInput">
                          <input type="text" id="mysearchroleuser" class="qwertjdsqasdf" v-model="searchRoleUserWord">
                          <i class="icon-search searchroleuseri" @click="searchRoleUser" ></i>
                        </div>
                      </div> -->
                    </Col>
                    <Col span="6">手机号</Col>
                    <Col span="6">邮箱</Col>
                    <!-- <Col span="7" v-if=" RoleId !== AdminRoleId">操作</Col> -->
                  </div>
                  <div v-else>
                    <Col span="6">成员类型</Col>
                    <Col span="5">
                      成员名称
                      <!-- <p style="padding-left: 68px;float: left;line-height: 28px;">成员名称</p>
                      <div class="searchroleusernew">
                        <i class="icon-search qwertjdsqasdf" @click="showSearchInput = true"></i>
                        <div v-show="showSearchInput">
                          <input type="text" id="mysearchroleuser" class="qwertjdsqasdf" v-model="searchRoleUserWord">
                          <i class="icon-search searchroleuseri" @click="searchRoleUser" ></i>
                        </div>
                      </div> -->
                    </Col>
                    <Col span="6">手机号</Col>
                    <Col span="6">邮箱</Col>
                  </div>
                </Row>
                <div v-if="hasRoleuser">
                  <Row class="roleusersdetail" v-for="roleuser in roleusersList" :key="roleuser.id">
                      <Col span="1">
                        <input class="mycheckboxinput" :id="roleuser.id + '_checkbox'"
                        :objectid="roleuser.id" :isOrgan="roleuser.isOrgan" type="checkbox" :parentid="roleuser.ParentId"
                        @click="checkOn($event);" ref="roleuser">
                        <label :for="roleuser.id +'_checkbox'" class="mycheckboxlabel"></label>
                      </Col>
                      <div v-if="RoleType !== '1'">
                        <Col span="6">{{roleuser.isOrgan ? '部门' : '人员'}}</Col>
                        <Col span="5">{{roleuser.userName | symbol}}</Col>
                        <Col span="6">{{roleuser.phone  | symbol}}</Col>
                        <Col span="6">{{roleuser.email | symbol}}</Col>
                    <!--     <Col span="4" v-if="roleuser.ServiceUnitNames">
                          <span v-for="(departName,index) in roleuser.ServiceUnitNames" :key="index">{{departName}}</span>
                        </Col>
                        <Col span="4" v-if="!roleuser.ServiceUnitNames">所属部门</Col> -->
                       <!--  <Col span="7">
                         <div class="editbutton">
                           <a class="user_bemanager" @click="ShowSetPost(roleuser.ObjectId);">设置服务部门</a>
                           <span @click="RemoveSingleRole(roleuser.ObjectId, '删除用户')" class="icon icon-remove-block" style="color:red; cursor:pointer;"></span>
                         </div>
                       </Col> -->
                      </div>
                      <div v-else>
                        <Col span="6">{{roleuser.isOrgan ? '部门' : '人员'}}</Col>
                        <Col span="5">{{roleuser.userName | symbol}}</Col>
                        <Col span="6">{{roleuser.phone | symbol}}</Col>
                        <Col span="6">{{roleuser.ParentName | symbol}}</Col>
                        <!-- <Col span="6" v-if="roleuser.ServiceUnitNames">
                          <span v-for="(departName,index) in roleuser.ServiceUnitNames" :key="index">{{departName}}</span>
                        </Col>
                        <Col span="6" v-else>所属部门</Col> -->
                      </div>
                  </Row>
                </div>
                <div v-else>
                  <Row class="noroleuser-box">
                    <Col span="24">暂无用户</Col>
                  </Row>
                </div>
              </div>
                 <!-- 分页开始 -->
              <!-- <div class="Page_Turn" v-show="showPagenation || onePageTotal<iTotalDisplayRecords"> -->
              <div class="Page_Turn" v-show="showPagenation">
                    <Page
                    ref="page"
                    class ="pull-right"
                    :total="totalNum"
                    size="small"
                    :current="currentPage"
                    show-elevator
                    show-sizer
                    @on-change="getNewUserDataByPageNum"
                    @on-page-size-change="getNewUserDataByPageSize"
                  ></Page>
                </div>
                <!-- 分页结束 -->
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>

    <!-- 新建角色弹窗 -->
    <creatRole
      :showCreatRoleFlag="showCreatRoleFlag"
      :SortKey.sync="allRoleData.length"
      :RoleGroupList="RoleGroupList"
      @getAllRoles="refreshRoles"
      @creatRoleShowFlag="resetCreatRoleModel">
     </creatRole>
    <creatRoleGroup
      :showCreatRoleGroupFlag="showCreatRoleGroupFlag"
      :SortKey.sync="allRoleData.length"
      :RoleGroupList="RoleGroupList"
      @getAllRoles="refreshRoles"
      @creatRoleShowFlag="resetCreatRoleGroupModel">
    </creatRoleGroup>
     <!-- 复制角色弹窗 -->
    <copyRole
      :showCopyRoleFlag="showCopyRoleFlag"
      :allRoleData="allRoleData"
      :SortKey.sync="allRoleData.length"
      @copyRoleShowFlag="resetCopyRoleModel"
      :RoleId="RoleId"
      :RoleName="RoleName"
      :RoleGroupList="RoleGroupList"
      :selectedRole="selectedRole"
      :AdminRoleId="AdminRoleId"
      @getAllRoles="refreshRoles"
    ></copyRole>
    <!-- 修改角色名称 -->
    <renameRole
      :showRenameRoleFlag="showRenameRoleFlag"
      :RoleId="RoleId"
      :isRoleGroup="isRoleGroup"
      :RoleGroupId="RoleGroupId"
      :RoleName="RoleName"
      :RoleGroupList="RoleGroupList"
      @getAllRoles="refreshRoles"
      @renameRoleShowFlag="resetrenameRoleModel">
    </renameRole>
    <!-- 删除角色 -->
    <delRole
      :showDelRoleFlag="showDelRoleFlag"
      :RoleId="RoleId"
      :isRoleGroup="isRoleGroup"
      :RoleName="RoleName"
      @delRoleShowFlag="resetdelRoleModel"
      @getAllRoles="refreshRoles">
    </delRole>
    <!-- 设置服务部门 -->
<!--     <setServiceDepartment :showServiceRoleFlag="showServiceRoleFlag" :UserId="UserId" :RoleId="RoleId"
    @serviceRoleShowFlag="resetserviceModel" @updateServiceDepart="resertServiceDepart"
    :UnitTypeOrganizationUnit="UnitTypeOrganizationUnit"></setServiceDepartment> -->
    <!-- 删除角色成员/批量移除角色成员 -->
    <delUserRole
      :showDelUserRoleFlag="showDelUserRoleFlag"
      :RoleId="RoleId"
      :UserId="UserId"
      :delTitle="delTitle"
      @delUserRoleShowFlag="resetdelRoleUserModel"
      @getUserRoles="resertServiceDepart"
      :removeAllUserIds="removeAllUserIds"
      :removeAllOrgans="removeAllOrgans">
    </delUserRole>
    <!-- 添加角色成员 -->
    <addRoleUser
      ref="addRoleUser"
      :showAddUserRoleFlag="showAddUserRoleFlag"
      :RoleId="RoleId"
      :selectedRole="selectedRole"
      @addRoleUserShowFlag="resetaddRoleUserModel"
      @getUserRoles="resertServiceDepart"
      :UnitTypeUser="UnitTypeUser"
      :roleusersList="roleusersList">
     </addRoleUser>
    <!-- 加载中gif图 -->
    <div
      v-show="showLoading"
      class="loading-container">
      <loading></loading>
    </div>
    <!-- 是否保存 -->
    <saveAcl
      :showSaveAclFlag="showSaveAclFlag"
      @closeSaveAclModal="showSaveAclFlag=false;"
      @confirmSaveAcl="ifSaveAcl"
    >
    </saveAcl>
  </div>
</template>

<script>
import creatRole from './creatRole'; //引入新建角色弹窗
import creatRoleGroup from './createRoleGroup'; //引入新建角色组弹窗
import copyRole from './copyRole'; //引入复制角色弹窗
import renameRole from './renameRole'; //引入修改角色弹窗
import delRole from './delRole'; //引入删除角色弹窗
import delUserRole from './delUserRole'; //引入删除角色成员弹窗
import addRoleUser from './addRoleUser'; //引入添加角色成员弹窗
import loading from './loading'; //引入加载中蒙层
import saveAcl from './saveAcl'; //引入权限未保存，是否保存弹窗
import RoleControlManager from './roleControlManager.vue';
import { debounce } from '@/util/utils.js';
import {
  GetInitData,
  SearchRolesApi,
  GetAllRoles,
  GetAppPagesAndAcl,
  GetRoleUsers,
  GetAppPackageChildrenAcl,
  GetNodeSheetAndListViewActions,
  SaveAclNode,
  SearchRoleUsers,
  UpdateSortRoles,
  getUserRoleAndPermission,
  GetAllRolesOfGroup,
  getRoleGroupAppList
} from '@/api/role.js'; // 引入数据拉取接口
import AppReq from '@/api/app-apply.js';
import 'iview/dist/styles/iview.css'; // 引入iview样式表
// import './FormUser.js';
// import './FormMultiUser.js';
import BScroll from 'better-scroll';
export default {
  name: 'role-manage',
  components: {
    creatRole,
    creatRoleGroup,
    copyRole,
    renameRole,
    delRole,
    delUserRole,
    addRoleUser,
    loading,
    saveAcl,
    RoleControlManager
  },
  data() {
    return {
      moduleName: 'authorization',
      startPos: 15,
      containerH: 0,
      showCreatRoleFlag: false, // 控制新建角色显示/隐藏标识符
      showCreatRoleGroupFlag: false, // 控制新建角色显示/隐藏标识符
      showCopyRoleFlag: false, // 控制复制角色显示/隐藏标识符
      showRenameRoleFlag: false, // 控制修改角色显示/隐藏标识符
      showDelRoleFlag: false, // 控制删除角色显示/隐藏标识符
      showServiceRoleFlag: false, // 控制设置角色部门显示/隐藏标识符
      showDelUserRoleFlag: false, // 控制删除角色成员显示/隐藏标识符
      showAddUserRoleFlag: false, // 控制添加角色成员显示/隐藏标识符
      showSaveAclFlag: false,
      showLoading: false,
      isSearchRole: false,
      delTitle: '', // 删除角色用户、批量移除
      allRoleData: [],
      showRoleData: [],// 所有角色数据
      currentIndex: -1, // hover 角色的索引
      clickIndex: 0, //点击角色的索引
      selectedRole: '', // 角色树上选中的角色
      AdminRoleId: '', // 权限管理员角色ID
      UserRoleId: '', // 用户角色ID
      RoleType: '',
      RoleId: '', //角色ID
      isRoleGroup: false, // 是否角色组
      RoleGroupId: '',
      RoleName: '',
      RoleGroupList: [],
      AppCode: '', // 应用AppCode
      searchRoleWord: '', // 搜索角色关键字
      roleusersList: [], // 用户角色数据
      hasRoleuser: false,
      UserId: '', //角色用户ID值
      UnitTypeOrganizationUnit: '',
      UnitTypeUser: '',
      romoveAllFlag: true, // 批量移出按钮状态
      SelecteddragNumber: 0, // 选中角色用户的条数
      // 分页
      showUserInfo: true,
      totalNum: 0, // 数据总信息数
      currentPage: 1, //当前是第几页
      pageSize: 10, // 每页多少条数
      showPagenation: true, // 分页是否显示的标识
      aclsList: [], // app应用数据
      aclsGroups: [], // 应用分组
      noDataFlag: true,
      noAclDataFlag: true,
      formlistData: [], // 表单权限数据
      appCurrentIndex: 1, // 当前选中的app索引
      appGroupsIndex: 1,
      removeAllUserIds: '', // 批量移除角色成员时
      removeAllOrgans: [], // 批量移除部门
      currentTab: 'roleSetting', // 当前选中的tab面板
      saveLiCode: [], // 保存勾选的角色权限
      temporarySaveSheetAcl: [], // 暂存激活的表单，列表input框
      changAcl: false,
      groupboo: false,
      groupindex: 0,
      saveInputNodes: {},
      DataAclScopeType: {
        None: -1,
        Own: 0,
        OwnDept: 1,
        All: 2
      },
      RoleAclNode: function (config) {
          this.ListViewActions = config.ListViewActions == void 0 ? null : config.ListViewActions;
          this.FormActions = config.FormActions == void 0 ? null : config.FormActions;
          this.FormActionsAllChecked = config.FormActionsAllChecked == void 0 ? false : config.FormActionsAllChecked;
          this.ListActionsAllChecked = config.ListActionsAllChecked == void 0 ? false : config.ListActionsAllChecked;
          this.scopeType = -1
          if (!(config.scopeType == void 0)) {
            this.scopeType = config.scopeType;
          }
      },
      RoleChildNode: function (config) {
          this.Code = config.Code == void 0 ? '' : config.Code;
          this.Name = config.Name == void 0 ? '' : config.Name;
          this.hasAcl = config.hasAcl == void 0 ? false : config.hasAcl;
      },
      OwnerAclName: '__owneracl',
      OrgAclName: '__organizationacl',
      AllAclName: '__allacl',
      ScopeTypeName: 'scopetypename',
      showSearchInput: false,
      searchRoleUserWord: '',
      RoleSheetli: {}, // 表单缓存（第二层）
      RoleActionsAndScopType: {}, //表单、列表权限缓存（第3层）
      list_postfix: 'List',
      form_postfix: 'Form',
      ifCheckAll: false,
      hideAclDetailFlag: false,
      currentSheetCode: -1,
      nextAppCode: '',
      hideFlag: false
    };
  },
  methods: {
    //初次渲染页面时，获取文档可视区域高度
    _setInfoContainerH() {
      let docmentH =
        document.documentElement.clientHeight || document.body.clientHeight;
      let OrgInfoH = docmentH - 70;
      this.containerH = OrgInfoH;
    },
    // 权限管理初始化数据
    _GetInitData() {
      // let res = await GetInitData();
      // if (res.Successful) {
      //   //获取数据成功
      //   this.AdminRoleId = res.ReturnData.AdminRoleId;
      //   this.UserRoleId = res.ReturnData.UserRoleId;
      //   this.UnitTypeOrganizationUnit = res.ReturnData.AdminRoleId;
      //   this.UnitTypeUser = res.ReturnData.UnitTypeUser;
      // } else {
      //   // 获取数据失败
      // }
      this.AdminRoleId = this.$store.state.user.companyId;
      this.UserRoleId = '8ec646d8cb104d879bd2e94514553426';
    },
    // 拖拽角色用户排序
    async _UpdateSortRoles(SortRoles) {
      let res = await UpdateSortRoles('UpdateSortRoles', SortRoles);
    },
    // 获取所有角色
    async _GetAllRoles(KeyWord, loadingFlag) {
      try {
        this.isSearchRole = true;
        let res = await GetAllRoles();
        if (res.code === '0') {
          // 获取数据成功
          if (res.data.length !== 0) {
            this.allRoleData = res.data;
          } else {
            this.allRoleData = [];
          };
          // 添加十个数据
          this.RoleGroupList = this.allRoleData.filter(item => item.type === '0')
            .map(item => ({ value: item.name, label: item.name }));
          this.showRoleData = this.allRoleData.slice(0, this.startPos);

          // if (!this.RoleId) { this.RoleId = this.allRoleData[0].id; }
          this.RoleId = '';
          this.clickIndex = -1;
          if (this.allRoleData.length) {
            for (let i = 0; i < this.allRoleData.length; i++) {
              if (this.allRoleData[i].type !== '0') {
                this.RoleId = this.allRoleData[i].id;
                this.clickIndex = i;
                break;
              }
            }
            if (!this.RoleType) { this.RoleType = this.allRoleData[0].roleType; }
            if (!this.selectedRole) { this.selectedRole = this.allRoleData[0].name; }
            if (this.RoleId != this.AdminRoleId && !this.isSearchRole && !loadingFlag && this.RoleId != this.UserRoleId) {
              //this.showLoading = true;
            }
          }
          // 默认展示第一个角色的数据
          // this.clickIndex = 0
          this.getAppAndAuthority(this.RoleId, this.clickIndex, this.selectedRole, this.RoleType);
          this._GetAppPagesAndAcl(this.RoleId);
          // let _self=this;
          // new Sortable($('#myTreeabc')[0], {
          //     group: 'myTreeabc',
          //     onUpdate: function (evt) {
          //         //排序
          //         var json = {}
          //         var rolesLi = $('#myTreeabc').find('.roleli');
          //         for (var r = 0; r < rolesLi.length; r++) {
          //             json[rolesLi[r].id] = r + 1;
          //         }
          //         _self._UpdateSortRoles(json);
          //     }
          // })
        } else {
          throw new Error(res.msg);
        }
      } catch (error) {
        this.$Message.error(error.message);
      } finally {
        this.isSearchRole = false;
      }
    },
    async _SearchRoles(KeyWord, loadingFlag) {
      if (!KeyWord) {
        this._GetAllRoles();
        return;
      }
      let res = await SearchRolesApi(KeyWord, true);
      if (res.code === '0') {
        //获取数据成功
        if (res.page.result.length !== 0){
          this.allRoleData = res.page.result;
        } else {
          this.allRoleData = [];
        };
        // 添加十个数据
        // this.RoleGroupList = this.allRoleData.filter(item => item.type === '0')
        //   .map(item => ({ value: item.name, label: item.name }));
        this.showRoleData = this.allRoleData.slice(0, this.startPos);

        // if (!this.RoleId) { this.RoleId = this.allRoleData[0].id; }
        // this.RoleId = '';
        // this.clickIndex = -1;
        // if (this.allRoleData.length) {
        //   for (let i = 0; i < this.allRoleData.length; i++) {
        //     if (this.allRoleData[i].type !== '0') {
        //       this.RoleId = this.allRoleData[i].id;
        //       this.clickIndex = i;
        //       break;
        //     }
        //   }
        //   if (!this.RoleType) { this.RoleType = this.allRoleData[0].roleType; }
        //   if (!this.selectedRole) { this.selectedRole = this.allRoleData[0].name; }
        //   if (this.RoleId != this.AdminRoleId && !this.isSearchRole && !loadingFlag && this.RoleId != this.UserRoleId) {
        //     //this.showLoading = true;
        //   }
        // }
        // 默认展示第一个角色的数据
        // this.clickIndex = 0
        // this.getAppAndAuthority(this.RoleId, this.clickIndex, this.selectedRole, this.RoleType);
        // this._GetAppPagesAndAcl(this.RoleId);
        // let _self=this;
        // new Sortable($('#myTreeabc')[0], {
        //     group: 'myTreeabc',
        //     onUpdate: function (evt) {
        //         //排序
        //         var json = {}
        //         var rolesLi = $('#myTreeabc').find('.roleli');
        //         for (var r = 0; r < rolesLi.length; r++) {
        //             json[rolesLi[r].id] = r + 1;
        //         }
        //         _self._UpdateSortRoles(json);
        //     }
        // })
        this.isSearchRole = false;
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    // 获取角色下应用数据
    async _GetAppPagesAndAcl(RoleId) {
      let res = await AppReq.getAllModule();
      if (res.code === '0') {
        //获取数据成功
        this.aclsList = res.page.result;
        let count = 0;
        //如果有操作过的权限，展开自动选中第一个被操作过的应用
        for (var i = 0; i < this.aclsList.length; i++) {
            if (this.aclsList[i].hasAcl == true) {
                count++;
                this.appCurrentIndex = i;
                this.AppCode = this.aclsList[i].id;
                this._GetAppPackageChildrenAcl(this.aclsList[i].id);
                break;
            }
        }
        this.noDataFlag = false;
        if (count>0) {
        } else {
          this.appCurrentIndex = 0;
          this._GetAppPackageChildrenAcl(this.aclsList[0].id);
          this.AppCode = this.aclsList[0].id;
        }

        let countApp = 0;
        this.aclsList.forEach((sheet) => {
          if (sheet.hasAcl) {
            countApp++;
          }
        });
        if (countApp == this.aclsList.length) {
          this.ifCheckAll = true;
        }
      } else {
        // 获取数据失败
        // this.$Message.error(res.ErrorMessage);
      }
    },
    getGroupsListAcls (index) {
      this.groupboo = true
      if (!this.saveLiCode.length == 0 && this.changAcl) {
        this.groupindex = index
        this.showSaveAclFlag = true;
      } else {
        this.formlistData = this.aclsGroups[index].appList;
        let formListLenght = this.formlistData.length;
        if (formListLenght) {
          this.noDataFlag = false;
        } else {
          this.noDataFlag = true;
        }
        let count = 0;
        this.formlistData.forEach((sheet) => {
          if (sheet.hasAcl) {
            count++;
          }
        });
        if (count == this.formlistData.length) {
          this.ifCheckAll = true;
        } else {
          this.ifCheckAll = false;
        }
        // 获取表单列表的权限数据
        let _self = this;
        _self.saveLiCode = [];
        this.formlistData.some(function(sheet) {
          sheet.authority={ FormActions: [], ListViewActions: [], scopeType: -1, FormActionsAllChecked: false, ListActionsAllChecked: false };
          _self.$set(sheet, sheet.authority, sheet.authority);
          _self._GetNodeSheetAndListViewActions(sheet.id, sheet.actionList, sheet.scopeType);
          //saveLiCode 中不存在this的data-code属性才添加
          if (sheet.hasAcl){
            if (_self.saveLiCode.indexOf(sheet.id) == -1) {
              _self.saveLiCode.push(sheet.id);
            }
          }
          return null;
        });
        this.appGroupsIndex = index
        this.groupboo = false
      }
    },
    // 获取应用app下需要设置权限的表单/列表
    async _GetAppPackageChildrenAcl(AppId, index = 0) {
      if (this.RoleSheetli[this.RoleId] && this.RoleSheetli[this.RoleId][AppId]) {
        this.aclsGroups = this.RoleSheetli[this.RoleId][AppId]
        this.formlistData = this.RoleSheetli[this.RoleId][AppId][index].appList
        this.appGroupsIndex = index
      } else {
        // this.showLoading = true;
        // let res = await GetAppPackageChildrenAcl(this.RoleId, AppId);
        let res = await getRoleGroupAppList(this.RoleId, AppId);
        if (res.code === '0') {
          res.result = res.result.map(item => {
            if (item.groupName) {
              return item
            } else {
              item.groupName = '无分组'
              return item
            }
          })
          this.aclsGroups = res.result
          this.formlistData = res.result[index].appList;
          this.appGroupsIndex = 0
          if (!this.RoleSheetli[this.RoleId]) {
            this.RoleSheetli[this.RoleId] = {};
          }
          this.RoleSheetli[this.RoleId][AppId] = res.result;
        }
        // if (res.code === '0') {
        //   //获取数据成功
        //   this.formlistData = res.result;
        //   if (!this.RoleSheetli[this.RoleId]) {
        //       this.RoleSheetli[this.RoleId] = {};
        //   }
        //   this.RoleSheetli[this.RoleId][AppId] = res.result;
        // } else {
        //    // 获取数据失败
        //   $.IShowError(res.ErrorMessage);
        // }

        let count = 0;
        this.formlistData.forEach((sheet) => {
          if (sheet.hasAcl) {
            count++;
          }
        });
        if (count == this.formlistData.length) {
          this.ifCheckAll = true;
        } else {
          this.ifCheckAll = false;
        }
      }
        //获取数据成功
        // this.formlistData = res.ReturnData.ChildrenAcl
        let formListLenght = this.formlistData.length;
        if (formListLenght) {
          this.noDataFlag = false;
        } else {
          this.noDataFlag = true;
        }
        // 获取表单列表的权限数据
        let _self = this;
        _self.saveLiCode = [];
        this.formlistData.some(function(sheet) {
          sheet.authority={ FormActions: [], ListViewActions: [], scopeType: -1, FormActionsAllChecked: false, ListActionsAllChecked: false };
          _self.$set(sheet, sheet.authority, sheet.authority); 
           _self._GetNodeSheetAndListViewActions(sheet.id, sheet.actionList, sheet.scopeType);
           //saveLiCode 中不存在this的data-code属性才添加
           if (sheet.hasAcl){
             if (_self.saveLiCode.indexOf(sheet.id) == -1) {
                _self.saveLiCode.push(sheet.id);
              }
           }
          return null;
        });
        this.showLoading = false;
    },
    // 获取表单列表的权限数据
    async _GetNodeSheetAndListViewActions(Code, actionList, scopeType) {
      if (!actionList.length) {
        actionList = [{code: "Start", name: "新增", hasAcl: false},{code: "Remove", name: "删除", hasAcl: false}]
      }
      // 如果之前有缓存过数据，不发请求
      if (this.RoleActionsAndScopType[this.RoleId] && this.RoleActionsAndScopType[this.RoleId][Code]) {
        let _self = this;
        this.formlistData.some(function(sheet) {
          if (sheet.id == Code) {
            let RoleActionsAndScopType = _self.RoleActionsAndScopType[_self.RoleId][sheet.Code];
            // sheet.authority.FormActions = RoleActionsAndScopType.FormActions;
            sheet.authority.ListViewActions = actionList;
            sheet.authority.scopeType = scopeType;
            // sheet.authority.FormActionsAllChecked = RoleActionsAndScopType.FormActionsAllChecked;
            // sheet.authority.ListActionsAllChecked = this.ifActionCheckAll(actionList);
            // _self.$set(sheet.authority, 'sheet.authority.FormActions', sheet.authority.FormActions);
            // _self.$set(sheet.authority, 'sheet.authority.ListViewActions', sheet.authority.ListViewActions);
            // _self.$set(sheet.authority, 'sheet.authority.scopeType', sheet.authority.scopeType);
            // _self.$set(sheet.authority, 'sheet.authority.FormActionsAllChecked', sheet.authority.FormActionsAllChecked);
            // _self.$set(sheet.authority, 'sheet.authority.ListActionsAllChecked', sheet.authority.ListActionsAllChecked);
            return false;
          }
        });
      } else {
          let _self = this;
          this.formlistData.some(function(sheet) {
            if (sheet.id == Code) {
              // sheet.authority.FormActions = RoleActionsAndScopType.FormActions;
              sheet.authority.ListViewActions = actionList;
              sheet.authority.scopeType = scopeType;
              // sheet.authority.FormActionsAllChecked = RoleActionsAndScopType.FormActionsAllChecked;
              // sheet.authority.ListActionsAllChecked = this.ifActionCheckAll(actionList);
              // _self.$set(sheet.authority, 'sheet.authority.FormActions', sheet.authority.FormActions);
              // _self.$set(sheet.authority, 'sheet.authority.ListViewActions', sheet.authority.ListViewActions);
              // _self.$set(sheet.authority, 'sheet.authority.scopeType', sheet.authority.scopeType);
              // _self.$set(sheet.authority, 'sheet.authority.FormActionsAllChecked', sheet.authority.FormActionsAllChecked);
              // _self.$set(sheet.authority, 'sheet.authority.ListActionsAllChecked', sheet.authority.ListActionsAllChecked);

              // 权限缓存设置
              if (!_self.RoleActionsAndScopType[_self.RoleId]) {
                  _self.RoleActionsAndScopType[_self.RoleId] = {};
              }
              _self.RoleActionsAndScopType[_self.RoleId][sheet.Code] = actionList;
              return false;
            }
          });
      }
    },
    // 保存角色权限设置
    async _SaveAclNode(actionList, scopeType, appId, type) {
      console.log(actionList);
      let actionCodeList = actionList.filter(item => {
        return item.hasAcl;
      })
      .map(item => {
        return `${item.Code.toUpperCase()}`;
      })
      // let actionStr = actionCodeList.join(',');
      let res = await SaveAclNode(this.RoleId, actionCodeList, scopeType, appId, type);
      if (res.code === '0') {
        // 保存成功，更新缓存
        //第二层，表单缓存
        // if (this.RoleSheetli[this.RoleId] && this.RoleSheetli[this.RoleId][this.AppCode]) {
        //   for (var i = 0; i < this.RoleSheetli[this.RoleId][this.AppCode].length; i++) {
        //     var tempItem = this.RoleSheetli[this.RoleId][this.AppCode][i];
        //     if (tempItem.Code == code) {
        //       tempItem.hasAcl = AclNode.scopeType != this.DataAclScopeType.None;
        //       break;
        //     }
        //   }
        // }

        // // 第3层，表单，列表具体权限缓存
        // if (this.RoleActionsAndScopType[this.RoleId] && this.RoleActionsAndScopType[this.RoleId][code]) {
        //   this.RoleActionsAndScopType[this.RoleId][code] = AclNode;
        // }
        $.IShowSuccess('提示:保存成功');
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    // 获取用户角色数据
    async _GetRoleUsers(RoleId, pageNum, pageSize, keyword) {
      let res = await GetRoleUsers(RoleId, pageNum, pageSize, keyword);
      this.currentPage = pageNum;
      if (res.code === '0') {
        //获取数据成功
        this.roleusersList = res.page.result;
        this.totalNum = res.page.total;
        if (this.roleusersList.length) {
          this.hasRoleuser = true;
        } else {
          this.hasRoleuser = false;
        }
        // this.BeginNum = res.ReturnData.BeginNum;
        // this.iTotalDisplayRecords = res.ReturnData.iTotalDisplayRecords;
        // this.totalPage = Math.ceil(
        //   this.iTotalDisplayRecords / this.onePageTotal
        // ); //计算出总页数
        // if (this.iTotalDisplayRecords > 8) {
        //   this.showPagenation = true;
        // } else {
        //   this.showPagenation = false;
        // }
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    // 搜索角色用户
    async _SearchRoleUsers(keyword) {
      let res = await SearchRoleUsers('SearchRoleUsers', this.RoleId, 0, this.onePageTotal, keyword);
      if (res.Successful) {
        //获取数据成功
        this.roleusersList = res.ReturnData.aaData;
        this.totalNum = (res.ReturnData.iTotalDisplayRecords && res.ReturnData.iTotalDisplayRecords.length) || 0;//计算出总页数
      } else {
        // 获取数据失败
        $.IShowError(res.ErrorMessage);
      }
    },
    GetRoleAclNode($dom) {
        if ($dom.length == 0) { return null; }
        var config = {};
        var code = $dom.attr('data-code');
        var type = $dom.attr('data-type');
        var appCode = this.AppCode;
        config['ListViewActions'] = this.GetActions($dom, 'list');
        config['FormActions'] = this.GetActions($dom, 'sheet');
        //若该表单被选中，调用获取数据权限的方法，否则数据权限值为-1
        config['scopeType'] = $dom.find('input.roletogglesheet')[0].checked ? this.GetScopeType(code) : this.DataAclScopeType.None;
        if(type == 'report') config['scopeType'] = $dom.find('input.roletogglesheet')[0].checked ? 0 : this.DataAclScopeType.None;
        // 判断表单，列表全选按钮是否选中
        config['FormActionsAllChecked'] = ($dom.find('.sheet-checkall').find('input.checkall')[0] && $dom.find('.sheet-checkall').find('input.checkall')[0].checked) ? true : false;
        config['ListActionsAllChecked'] = ($dom.find('.listview-checkall').find('input.checkall')[0] && $dom.find('.listview-checkall').find("input.checkall")[0].checked) ? true : false;
        return {
          'code': code,
          'node': new this.RoleAclNode(config),
          'appCode': appCode,
          'type': type
        };
    },
    GetActions($e, type) {
        var result = [];
        var $Inputs = null;
        var lis;
        switch (type) {
            case 'sheet':
                var code = $e.data('code');
                lis = $e.find('>ul>li.sheet-node-childnode');
                $Inputs = lis.find('input:not(.checkall)');
                break;
            case 'list':
                var code = $e.data('code');
                lis = $e.find('>ul>li.listview-node-childnode');
                $Inputs = lis.find('input:not(.checkall)');
                break;
            default: return;
        }

        for (var i = 0; i < $Inputs.length; i++) {
            var tempItem = $Inputs[i];
            var config = {};
            config['Code'] = tempItem.getAttribute('data-code');
            config['Name'] = tempItem.getAttribute('data-name');
            config['hasAcl'] = tempItem.checked;
            var tempResult = new this.RoleChildNode(config);
            result.push(tempResult);
        }
        return result;
    },
    GetScopeType(code) {
        var itemInputs = $("[name='" + code + '_' + this.ScopeTypeName + "']");
        for (var i = 0; i < itemInputs.length; i++) {
            var item = itemInputs[i];
            if (item.checked) { return i; };
        }
    },
    // 点击新建角色，创建新的角色
    showCreatRoleMModal: function() {
      this.showCreatRoleFlag = true;
    },
    showCreatRoleGroupModal () {
      this.showCreatRoleGroupFlag = true;
    },
    // 关闭新建角色弹窗后，重置弹窗显示/隐藏标识符
    resetCreatRoleModel: function() {
      this.showCreatRoleFlag = false;
    },
    resetCreatRoleGroupModel () {
      this.showCreatRoleGroupFlag = false;
    },
    // 点击复制角色按钮，复制角色
    showCopyRoleModal: function(roleId, name) {
      this.RoleId = roleId;
      this.RoleName = name;
      this.showCopyRoleFlag = true;
    },
    // 关闭复制角色弹窗后，重置弹窗显示/隐藏标识符
    resetCopyRoleModel: function() {
      this.showCopyRoleFlag = false;
    },
    // 新建/复制角色成功之后刷新角色数据
    refreshRoles: function(flag) {
      if (flag) {
        this._GetAllRoles('', true);
      }
    },
    // 鼠标滑过角色时，出现左右两侧icon
    showIcon: function(index, e) {
      e.stopPropagation();
      this.currentIndex = index;
    },
    hideIcon: function(e) {
      e.stopPropagation();
      this.currentIndex = -1;
    },
    // 点击修改角色名称按钮，弹出修改名称弹窗
    showRenameModal: function(roleId, name, isRoleGroup = false, RoleGroupId = '') {
      this.RoleId = roleId;
      this.RoleGroupId = RoleGroupId;
      this.isRoleGroup = isRoleGroup;
      this.RoleName = name;
      this.showRenameRoleFlag = true;
    },
    // 关闭修改角色弹窗后，重置弹窗显示/隐藏标识符
    resetrenameRoleModel: function() {
      this.showRenameRoleFlag = false;
    },
    // 点击删除角色名称按钮，弹出删除弹窗
    showDelRole: function(roleId, name, isRoleGroup = false) {
      this.RoleId = roleId;
      this.isRoleGroup = isRoleGroup;
      this.RoleName = name;
      this.showDelRoleFlag = true;
    },
    // 关闭删除角色弹窗后，重置弹窗显示/隐藏标识符
    resetdelRoleModel: function() {
      this.showDelRoleFlag = false;
    },
    // 搜索角色
    SearchRoles: function() {
      this.isSearchRole = true;
      this._SearchRoles(this.searchRoleWord);
    },
    // 搜索角色用户
    searchRoleUser: function() {
      if (this.searchRoleUserWord != '') {
        this._SearchRoleUsers(this.searchRoleUserWord);
      } else {
        this._GetRoleUsers(this.RoleId, 1, this.pageSize, '')
      }
      this.showSearchInput = false;
      this.searchRoleUserWord = '';
    },
    //  切换tab页时，刷新数据
    changeTab: function() {
      if (this.currentTab === 'roleMemberManage') {
        this._GetRoleUsers(this.RoleId, 1, this.pageSize, ''); // 渲染用户角色管理
      } else if (this.currentTab === 'roleSetting') {
        this._GetAppPagesAndAcl(this.RoleId); // 渲染权限设置
      }
    },
    // 点击不同角色时，右侧渲染不同的权限/角色用户数据
    getAppAndAuthority: function(RoleId, index, name, roleType, boo) {
      if (boo) {
        GetAllRoles(name, true).then(res => {
          if (index.toString().includes('-')) {
            const [, index2, index3] = index.toString().match(/(\d+)-(\d+)/);
            this.showRoleData[index2].children[index3] = res.page.result[0];
          } else {
            this.showRoleData[index] = res.page.result[0];
          }
        });
      }
      this.ifCheckAll = false;
      this.clickIndex = index;
      this.RoleId = RoleId;
      this.selectedRole = name;
      this.RoleType = roleType;
      if (RoleId == this.UserRoleId) {
        this._GetAppPagesAndAcl(this.RoleId); // 渲染权限设置
      } else {
        if (this.currentTab === 'roleMemberManage') {
          this._GetRoleUsers(this.RoleId, 1, this.pageSize, ''); // 渲染用户角色管理
        } else if (this.currentTab === 'roleSetting') {
          this._GetAppPagesAndAcl(this.RoleId); // 渲染权限设置
        }
      }
    },
    // 点击不同应用app时，右侧刷出不同表单权限
    getFormListAcls: function(app, index) {
      this.ifCheckAll = false;
      this.appCurrentIndex = index;
      let appcode = app.id;
      let hasAcl = app.hasAcl;
      this.nextAppCode = app.id;
      if (!this.saveLiCode.length == 0 && this.changAcl) {
        this.showSaveAclFlag = true;
      } else {
        this.AppCode = appcode;
        this._GetAppPackageChildrenAcl(this.AppCode);
      }
    },
    ifSaveAcl: async function(flag) {
      // 确认保存设置的上一个app权限
      if (flag) {
        this.$Spin.show();
        await this.SaveAllNode();
        this.$Spin.hide();
        this.nextAppCode = this.nextAppCode ? this.nextAppCode : this.AppCode
        this._GetAppPackageChildrenAcl(this.nextAppCode);
        this.AppCode = this.nextAppCode;
        this.changAcl = false;
        this.temporarySaveSheetAcl = [];
      } else {
        console.log(this.temporarySaveSheetAcl)
        this.changAcl = false;
        this.saveLiCode = [];
        let that = this;
        // 去掉未保存的input操作状态
        for (let i=0; i<this.temporarySaveSheetAcl.length; i++) {
          let currentSheet = JSON.parse(this.temporarySaveSheetAcl[i]);
          for (let j=0; j<that.formlistData.length; j++) {
            let sheet = that.formlistData[j];
            if (currentSheet.id == sheet.id) {
              sheet.hasAcl = currentSheet.hasAcl;
              for (let k=0; k<currentSheet.authority.ListViewActions.length; k++) {
                sheet.authority.ListViewActions[k].hasAcl = currentSheet.authority.ListViewActions[k].hasAcl;
              }
              for (let k=0; k<currentSheet.authority.FormActions.length; k++) {
                sheet.authority.FormActions[k].hasAcl = currentSheet.authority.FormActions[k].hasAcl;
              }
              sheet.authority.scopeType = currentSheet.authority.scopeType;
              sheet.scopeType = currentSheet.scopeType;
              this.$set(sheet, sheet.hasAcl, currentSheet.hasAcl);
              this.$set(sheet.authority, sheet.authority.ListViewActions, currentSheet.authority.ListViewActions);
              this.$set(sheet.authority, sheet.authority.FormActions, currentSheet.authority.FormActions);
              this.$set(sheet.authority, sheet.authority.scopeType, currentSheet.authority.scopeType);
            }
          };
        }
        this.nextAppCode = this.nextAppCode ? this.nextAppCode : this.AppCode
        this._GetAppPackageChildrenAcl(this.nextAppCode);
        this.AppCode = this.nextAppCode;
        this.temporarySaveSheetAcl = [];
      }
      if (this.groupboo) {
        this.getGroupsListAcls(this.groupindex)
      }
    },
    // 点击权限设置列表全选，对应ul下checkbox全部被选中
    checkAllAcl: function(sheet, name, e) {
      const beforeChangeSheet = JSON.stringify(sheet);
      let exsitSheetFlag = false;
      for (let i=0; i<this.temporarySaveSheetAcl.length; i++) {
        let currentSheet = JSON.parse(this.temporarySaveSheetAcl[i]);
        if (currentSheet.Code === sheet.Code) {
          exsitSheetFlag = true;
        }
      }
      if (this.temporarySaveSheetAcl.length === 0 || !exsitSheetFlag) {
        this.temporarySaveSheetAcl.push(beforeChangeSheet);
      }
      let sheetCode = sheet.Code;
      let checkAllStatus = e.target.checked;
      this.changAcl = true;
      if (name == 'list'){
        sheet.authority.ListActionsAllChecked = checkAllStatus;
        this.$set(sheet.authority, 'sheet.authority.ListActionsAllChecked', checkAllStatus);
         sheet.authority.ListViewActions.forEach((obj) => {
            obj.hasAcl = checkAllStatus;
        });
        this.$set(sheet.authority, sheet.authority.ListViewActions, sheet.authority.ListViewActions);
      }
      if (name == 'form') {
        sheet.authority.FormActionsAllChecked = checkAllStatus;
        this.$set(sheet.authority, 'sheet.authority.FormActionsAllChecked', checkAllStatus);
        sheet.authority.FormActions.forEach((obj) => {
            obj.hasAcl = checkAllStatus;
        });
        this.$set(sheet.authority, sheet.authority.FormActions, sheet.authority.FormActions);
      }
    },
    activeAclInput: function(sheet, e, type) {
      const beforeChangeSheet = JSON.stringify(sheet);
      let exsitSheetFlag = false;
      for (let i=0; i<this.temporarySaveSheetAcl.length; i++) {
        let currentSheet = JSON.parse(this.temporarySaveSheetAcl[i]);
        if (currentSheet.id === sheet.id) {
          exsitSheetFlag = true;
        }
      }
      if (this.temporarySaveSheetAcl.length === 0 || !exsitSheetFlag) {
        this.temporarySaveSheetAcl.push(beforeChangeSheet);
      }
      this.changAcl = true;
      let sheetCode = sheet.id;
      let checkAllStatus = e.target.checked;
      if (type == 'sheet') {
        sheet.hasAcl = checkAllStatus;
        this.$set(sheet, sheet.hasAcl, sheet.hasAcl);
        this.changAcl = true;
      } else {
        let currentCode = e.target.dataset.fixcode;
        sheet.authority.ListViewActions.forEach((obj) => {
          if (obj.code+this.list_postfix == currentCode) {
            obj.hasAcl = checkAllStatus;
            this.changAcl = true;
          }
        });
        this.$set(sheet.authority, sheet.authority.ListViewActions, sheet.authority.ListViewActions);
        console.log(sheet);
        sheet.authority.FormActions.forEach((obj) => {
          if (obj.Code+this.form_postfix == currentCode) {
            obj.hasAcl = checkAllStatus;
            this.changAcl = true;
          }
        });
        this.$set(sheet.authority, sheet.authority.FormActions, sheet.authority.FormActions);
        if (type == 'radio') {
          sheet.authority.scopeType = e.target.value;
          sheet.scopeType = e.target.value;
          this.$set(sheet.authority, sheet.authority.scopeType, sheet.authority.scopeType);
        };
      };
      //saveLiCode 中不存在this的data-code属性才添加
      if (this.saveLiCode.indexOf(sheetCode) == -1) {
        this.saveLiCode.push(sheetCode);
        this.changAcl = true;
      }
      console.log(sheet)
      // 应用下有一个表单被勾选，就给该应用添加标识
      let count = 0;
      this.formlistData.some(function(sheet){
        if (sheet.hasAcl) {
          count++;
          return false;
        }
      });
      if (count) {
        this.setIconBeforeApp(true);
      } else {
        this.setIconBeforeApp(false);
        this.ifCheckAll = false;
      }
      console.log(sheet.hasAcl)
    },
    formCheckAll: function(e) {
      let _self = this;
      this.changAcl = true;
      let checkAllStatus = e.target.checked;
      this.ifCheckAll = checkAllStatus;
      // 变更数据的方式，改变sheet.hasAcl属性
      this.formlistData.some(function(sheet){
        if (sheet.hasAcl !== checkAllStatus) {
          var dom = document.getElementById(sheet.id + '_input')
          dom.click()
        }
        // sheet.hasAcl = checkAllStatus;
        // _self.$set(sheet, 'hasAcl', sheet.hasAcl);
        // //saveLiCode 中不存在this的data-code属性才添加
        // if (_self.saveLiCode.indexOf(sheet.id) == -1) {
        //     _self.saveLiCode.push(sheet.id);
        // }
      });
      // 若取消全选，则去掉app前面的√； 反之，加√
      // this.setIconBeforeApp(checkAllStatus);
    },
    setIconBeforeApp: function(flag) {
      let _self = this;
      this.aclsList.some(function(app){
        if (app.Code == _self.AppCode) {
          if (!flag) {
              _self.$set(app, 'hasAcl', false);
            return false;
          } else {
            _self.$set(app, 'hasAcl', true);
            return false;
          }
        }
      });
    },
    // 保存权限设置
    // SaveAllNode: function() {
    //   var notAllNone = false;
    //   if (this.saveLiCode.length == 0) {
    //       // this.$Message.info('提示:保存成功')
    //   } else {
    //     for (var i = 0; i < this.saveLiCode.length; i++) {
    //       var saveLi = $('.formlist').find('>li[data-code=' + this.saveLiCode[i] + ']');
    //       this.saveInputNodes[this.saveLiCode[i]] = this.GetRoleAclNode(saveLi);
    //       var key = this.saveLiCode[i];
    //       this._SaveAclNode(this.saveInputNodes[key].node, this.saveInputNodes[key].code );
    //       if (this.saveInputNodes[key].node.scopeType != this.DataAclScopeType.None) {
    //         notAllNone = true;
    //       }
    //     };
    //     this.saveLiCode = [];
    //     var appAclNode = new this.RoleAclNode({ scopeType: notAllNone ? this.DataAclScopeType.Own : this.DataAclScopeType.None });
    //     this._SaveAclNode(appAclNode, this.AppCode);
    //   }
    //   // $.IShowSuccess('提示:保存成功')
    // },
    SaveAllNode: async function() {
      // var notAllNone = false;
      if (this.saveLiCode.length == 0) {
          this.$Message.error('提示: 数据不能为空')
      } else {
        console.log(this.saveLiCode);
        for (var i = 0; i < this.saveLiCode.length; i++) {
          let saveLi = $('.formlist').find('>li[data-code=' + this.saveLiCode[i] + ']');
          this.saveInputNodes[this.saveLiCode[i]] = this.GetRoleAclNode(saveLi);
          let key = this.saveLiCode[i];
          let appId = this.saveInputNodes[key].code;
          let type = this.saveInputNodes[key].type;
          let actionList = this.saveInputNodes[key].node.ListViewActions;
          let scopeType = this.saveInputNodes[key].node.scopeType;
          console.log(this.saveInputNodes[key]);
          await this._SaveAclNode(actionList, scopeType, appId, type);
          // if (this.saveInputNodes[key].node.scopeType != this.DataAclScopeType.None) {
          //   notAllNone = true;
          // }
        };
        this.saveLiCode = [];
        let permissionsRes = await getUserRoleAndPermission();
        this.$store.dispatch('user/setPermissionsObj', permissionsRes.permissions);
        // var appAclNode = new this.RoleAclNode({ scopeType: notAllNone ? this.DataAclScopeType.Own : this.DataAclScopeType.None });
        // this._SaveAclNode(appAclNode, this.AppCode);
        // console.log(this.AppCode);
        this.changAcl = false;
        this.$Message.info('提示: 保存成功')
      }
      // $.IShowSuccess('提示:保存成功')
    },
    // 点击设置服务部门，弹出对应弹窗
    ShowSetPost: function(id) {
      this.showServiceRoleFlag = true;
      this.UserId = id;
    },
    // 重置服务部门弹窗标识
    resetserviceModel: function() {
      this.showServiceRoleFlag = false;
    },
    // 角色用户更新成功之后，更新页面数据
    resertServiceDepart: function(flag) {
      if (flag) {
        this.getAppAndAuthority(this.RoleId, this.clickIndex, this.selectedRole,this.RoleType, true)
        this.SelecteddragNumber = 0
        this.romoveAllFlag = true
        this.$refs.roleuser.forEach((obj) => {
          obj.checked = false;
        });
      }
    },
    // 删除角色用户/部门
    RemoveSingleRole: function(UserId, title) {
      // 批量移除角色用户/部门
      this.removeAllUserIds = '';
      this.removeAllOrgans = [];
      this.$refs.roleuser.forEach((obj) => {
        if (obj.checked) {
          var id = $(obj).attr('ObjectId');
          if ($(obj).attr('isOrgan')) {
            this.removeAllOrgans.push(id)
          } else {
            this.removeAllUserIds += id + ';'
          }
        }
      });
      this.showDelUserRoleFlag = true;
      this.delTitle = title;
    },
    resetdelRoleUserModel: function() {
      if (JSON.stringify(this.$refs.addRoleUser.AddRoleUserControl.Units) !== '{}') {
        var id = this.removeAllUserIds.split(';').filter(item => item)
        this.$refs.addRoleUser.AddRoleUserControl.RemoveChoice(id)
        this.$refs.addRoleUser.AddRoleUserControl.RemoveChoice(this.removeAllOrgans)
      }
      this.$refs.checkAllFalg.checked = false
      this.showDelUserRoleFlag = false;
    },
    // 添加角色成员
    ModeAddRoleUsersShow: function() {
      this.showAddUserRoleFlag = true;
    },
    resetaddRoleUserModel: function() {
      this.showAddUserRoleFlag = false;
    },
    // 勾选角色成员前面复选框
    checkOn: function(e) {
      let checkStatus = e.target.checked;
      if (checkStatus == true) {
          this.SelecteddragNumber = this.SelecteddragNumber + 1;
      } else {
          this.SelecteddragNumber = this.SelecteddragNumber - 1;
      }
      if (this.SelecteddragNumber != 0) {
        this.romoveAllFlag = false;
      } else {
        this.romoveAllFlag = true;
        this.$refs.checkAllFalg.checked = false;
      }
    },
    // 批量移除角色成员时全选
    CheckAll: function(e) {
      let checkAllStatus = e.target.checked;
      this.$refs.roleuser.forEach((obj) => {
        obj.checked = checkAllStatus;
      });

      if (checkAllStatus) {
        this.SelecteddragNumber = this.$refs.roleuser.length;
      } else {
          this.SelecteddragNumber = 0;
      }
      if (this.SelecteddragNumber != 0) {
        this.romoveAllFlag = false;
      } else {
        this.romoveAllFlag = true;
      };
    },
    // 点击当前页数按钮，显示更改页数菜单栏
    setShowMenuFlag: function() {
      this.toggleShowMenu = !this.toggleShowMenu;
    },
    getNewUserDataByPageNum (pageNum) {
        this.currentPage = pageNum;
        this._GetRoleUsers(this.RoleId, pageNum, this.pageSize, '');
    },
    getNewUserDataByPageSize (pageSize) {
        this.currentPage = 1;
        this.pageSize = pageSize;
        this._GetRoleUsers(this.RoleId, 1, pageSize, '');
    },
    toggleAclDetail(sheet){
      // this.currentSheetCode = sheet.Code;
      // this.hideAclDetailFlag = !this.hideAclDetailFlag;
      // if(this.hideAclDetailFlag && this.currentSheetCode) {
      //   this.hideFlag = true
      // }
    },
    handleClickGroup (item) {
      if (!item.expand && !item.children) {
        item.loading = true;
        this.$nextTick(async () => {
          try {
            const res = await GetAllRolesOfGroup(item.name);
            if (+res.code === 0) {
              item.children = res.data.children;
              item.loading = false;
              this.$forceUpdate();
            } else {
              throw new Error(res.msg);
            }
          } catch (error) {
            this.$Message.error(error.message);
          }
        });
      }
      item.expand = !item.expand;
      this.$forceUpdate();
    }
    // getSearchRole() {
    //   this.isSearchRole = true;
    //   this.SearchRoles();
    //   // this.searchRoleUser();
    // }
  },
  mounted: function() {
    //初次渲染页面时，获取文档可视区域高度
    let _self = this;
    this._setInfoContainerH();
    this._GetInitData(); //渲染页面时初始化权限管理数据
    this._GetAllRoles('');
    window.onresize = function temp() {
      _self._setInfoContainerH();
    };

    // 点击空白页时，关闭搜索框
    document.onclick = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e.target.className == 'Org_Right_Container ivu-col ivu-col-span-20' ||
          e.target.className == 'roleusersdetail ivu-row' || e.target.className == 'ivu-tabs'
          || e.target.className == 'ivu-tabs-tabpane' || e.target.className == 'ivu-col ivu-col-span-6' ||
          e.target.className == 'ivu-col ivu-col-span-5' || e.target.className == 'ivu-col ivu-col-span-4' ||
          e.target.className == 'ivu-col ivu-col-span-7' || e.target.className == 'roleusers') {
        _self.showSearchInput = false;
        _self.searchRoleUserWord = '';
      }
    };
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.roleListWrap, {
        scrollbar: {
          fade: false,
          interactive: true
        },
        mouseWheel: true,
        probeType: 1

      })
      this.scroll.on('scroll', () => {
          while(this.startPos < this.allRoleData.length && this.startPos < this.startPos + 10) {
            this.showRoleData.push(this.allRoleData[this.startPos]);
            this.startPos++;
          }
      })
    })
  }
};
</script>
<style scoped>
  @import './role.css';
  .ivu-poptip {
    position:absolute;
    right:48px;
    top:-13px
  }
  .ivu-icon-ios-arrow-down:before {
    margin-right : 0;
  }
  .Page_Turn {
    position: static !important;
    width: 100% !important;
    margin-top: 20px !important;
  }
  .Page_Turn button {
      padding: 3px 10px !important;
  }
  #app {
    margin-left: 0px
  }
  .role-list-wrap-layout {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
  }
  .role-list-wrap {
    flex: 1;
    overflow: hidden;
    width: 100%;
    position: relative;
  }
  .role-button-container {
    padding-left: 10px;
  }
  .role-item-label {
    padding: 10px 0px 10px 15px;
  }
  .role-item-label:hover {
    background-color: #eee;
  }
  .role-item-label:hover .unit_remove {
    display: block !important;
  }
</style>
