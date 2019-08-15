<template>
    <div v-if="startProcess" class="panel-body" id="workflow-view">
        <i class=" inline bannerTitle" id="lblWorkflowTitle"><label>流程状态</label></i>
        <div class="content" style="display:block">
            <div>
                <!--table border="0" width="100%" class="flow_info_title">
                    <tr>
                        <td style="text-align:right;">
                            <ul class="ulColor">
                                <li style="">
                                    <div style="display:inline-block;border-radius:3px; background-color: #E2E7EA;border: 0;height:14px;width:14px;"></div> <span>处理过的环节</span>
                                </li>
                                <li style="">
                                    <div style="display:inline-block;border-radius:3px;background-color: #37ABFD;height:14px;width:14px;"></div> <span>进行中的环节</span>
                                </li>
                                <li style="">
                                    <div style="display:inline-block;border-radius:3px;background-color: #FABB0C;height:14px;width:14px;"></div> <span>存在异常的环节</span>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table-->
                <div class="workspace"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import loadState from '../libs/loadState'

    export default {
        props: ['value'],
        data() {
            return {
                startProcess: false
            }
        },
        mounted () {
            loadState(this.value.id, startProcess => {
                this.startProcess = startProcess
            })
        }
    }
</script>
