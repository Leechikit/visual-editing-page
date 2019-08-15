import {UnitType,NodeType} from '../views/form/config/const';
export default {
    addSelect(state,node){
        let exists=false;
        if(node.NodeType===NodeType.Unit){
            for(let u of state.SelectedParticipants){
                if(u.NodeType===node.NodeType && u.ObjectId===node.ObjectId){
                    exists=true;
                    break;
                }
            }
            if(!exists){
                state.SelectedParticipants.push(node);
            }
        }else if(node.NodeType===NodeType.Variables){
            for(let u of state.SelectedParticipants){
                if(u.NodeType===node.NodeType && u.Name===node.Name){
                    exists=true;
                    break;
                }
            }
            if(!exists){
                state.SelectedParticipants.push(node);
            }
        }else if(node.NodeType===NodeType.Feild){
            for(let u of state.SelectedParticipants){
                if(u.NodeType===node.NodeType && u.id===node.id){
                    exists=true;
                    break;
                }
            }
            if(!exists){
                state.SelectedParticipants.push(node);
            }
        }
        else if(node.NodeType===NodeType.Function){
            for(let u of state.SelectedParticipants){
                if(u.NodeType===node.NodeType && u.Formula===node.Formula){
                    exists=true;
                    break;
                }
            }
            if(!exists){
                state.SelectedParticipants.push(node);
            }
        }
        
    },
    //非结果集中移除选中
    removeSelect(state,node){
        let index=-1;
        for(let i=state.SelectedParticipants.length-1;i>=0;i--){
            let participant=state.SelectedParticipants[i];
            if(participant.NodeType===node.NodeType){
                if(node.NodeType===NodeType.Unit){
                    if(node.ObjectId===participant.ObjectId){
                        state.SelectedParticipants.splice(i,1);
                        return;
                    }
                }else if(node.NodeType===NodeType.Variables){
                    if(node.Name===participant.Name){
                        state.SelectedParticipants.splice(i,1);
                        return;
                    }
                }else {
                    if(node.Formula===participant.Formula){
                        state.SelectedParticipants.splice(i,1);
                        return;
                    }
                }
            }
        }
        
    },
    //从结果集中移除选中（除去掉结果集中的选中，还要去除非结果集中的选中）
    removeSelectFromResultSet(state,node){
        //先删除结果集中的数据
        // let index=state.SelectedParticipants.findIndex(x=>{
        //     return x.NodeType===node.NodeType && (x.ObjectId===node.ObjectId || x.Name===node.Name || x.Formula===node.Formula);
        // });
        // if(index>-1){
        //     state.SelectedParticipants.splice(index,1);
        // }     
        for(let i=state.SelectedParticipants.length-1;i>=0;i--){
            let tmp=state.SelectedParticipants[i];
            if(tmp.NodeType===node.NodeType){
                if(node.NodeType===NodeType.Unit){
                    if(tmp.ObjectId===node.ObjectId){
                        state.SelectedParticipants.splice(i,1);
                        return;
                    }
                }else if(node.NodeType===NodeType.Variables){
                    if(tmp.Name===node.Name){
                        state.SelectedParticipants.splice(i,1);
                        return;
                    }
                }else if(node.NodeType===NodeType.Function){
                    if(tmp.Formula===node.Formula){
                        state.SelectedParticipants.splice(i,1);
                        return;
                    }
                }
            }
        }
    },
    addSubInstanceDataItems(state,keyValues){
        state.SubInstanceDataItems[keyValues.key]=keyValues.value;
    }
}


// WEBPACK FOOTER //
// ./src/store/mutations.js