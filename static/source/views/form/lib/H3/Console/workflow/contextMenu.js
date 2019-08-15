import {WorkflowElementType} from './setting';
import {TraceManager} from './workflowTrace';

//右侧菜单设置
export const ContextMenuSettings = {
    //菜单事件命名空间
    EventNameSpace: '.ContextMenu'
};

//右侧菜单堆栈
export const ContextMenuStack = {
    Target: void 0,
    TargetType: WorkflowElementType.Unspecified,
    ContenxtMenu: void 0,
    ContenxtMenuItem_Edit: void 0,
    ContenxtMenuItem_Delete: void 0
};

//显示右侧菜单
/*
        e   : 事件
    _Target : 目标
*/
export const ShowContextMenu = function (e, _Target, workflow) {
    //上下文菜单对应的目标
    ContextMenuStack.Target = _Target;

    switch (_Target.WorkflowElementType) {
        case WorkflowElementType.Activity:
            break;
        case WorkflowElementType.Line:
            break;
        case WorkflowElementType.Workflow:
            break;
        default:
            return;
    }

    //菜单
    if (!ContextMenuStack.ContenxtMenu) {
        ContextMenuStack.ContenxtMenu = $("<ul class='context-menu-list context-menu-root'></ul>");

        //编辑
        ContextMenuStack.ContenxtMenuItem_Edit = $("<li class='context-menu-item icon-edit-outline'><span>属性</span></li>").appendTo(ContextMenuStack.ContenxtMenu);
        ContextMenuStack.ContenxtMenuItem_Edit.bind('click' + ContextMenuSettings.EventNameSpace, function () {
            workflow.WorkflowObj.wp.DisplayProperties(ContextMenuStack.Target, true);
        });

        //删除
        ContextMenuStack.ContenxtMenuItem_Delete = $("<li class='context-menu-item icon-remove-block'><span>移除</span></li>").appendTo(ContextMenuStack.ContenxtMenu);
        ContextMenuStack.ContenxtMenuItem_Delete.bind('click' + ContextMenuSettings.EventNameSpace, function () {
            if (ContextMenuStack.Target) {
                if (ContextMenuStack.Target.WorkflowElementType === WorkflowElementType.Activity) {
                    workflow.removeActivity(ContextMenuStack.Target.Id);
                } else if (ContextMenuStack.Target.WorkflowElementType === WorkflowElementType.Line) {
                    TraceManager.AddTrace(TraceManager.TraceType.Line.Remove, ContextMenuStack.Target);
                    workflow.removeLine(ContextMenuStack.Target.Id);
                }
            }
        });

        ContextMenuStack.ContenxtMenu.appendTo(workflow.workspace);

        //点击隐藏菜单
        $(document).bind('click' + ContextMenuSettings.EventNameSpace, function () {
            ContextMenuStack.ContenxtMenu.hide();
        });
    }

    //活动、线条显示删除菜单
    if ((_Target.WorkflowElementType === WorkflowElementType.Activity &&
        ContextMenuStack.Target.ToolTipText !== 'Start' &&
        ContextMenuStack.Target.ToolTipText !== 'End') ||
         _Target.WorkflowElementType === WorkflowElementType.Line) {
        ContextMenuStack.ContenxtMenuItem_Delete.show();
    } else {
        ContextMenuStack.ContenxtMenuItem_Delete.hide();
    }

    ContextMenuStack.ContenxtMenu.css('left', e.pageX - $(workflow.WorkflowObj.svg)._offset().left)
        .css('top', e.pageY - $(workflow.WorkflowObj.svg)._offset().top)
        .show();
};



// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/contextMenu.js