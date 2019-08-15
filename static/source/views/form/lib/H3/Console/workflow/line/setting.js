//线条设置
export const LineSettings = {
    // Id 属性名称
    PropertyNameOfID: "line_id",

    //最小线段长
    MinSegementLength: 20,

    //自由画线时停靠到起点的距离
    DockDistanceToStartPoint: 10,
    //接近时停靠到活动的距离
    DockDistanceToEdge: 20,
    //接近活动边的中点时自动停靠的距离
    DockDisntaceToEdgeCenter: 10,
    //线条圆角半径
    CornerRadius: 3,
    //交点半径
    CrossRadius: 5,
    //线条颜色
    LineColor: "rgb(75, 155, 237)",
    //线条宽度
    LineWidth: 1,

    //线条聚焦颜色
    LineFocusColor: "rgb(237, 125, 49)",
    //线条聚焦宽度
    LineFocusWidth: 2,
    //箭头聚焦颜色
    ArrowFocusColor: "rgb(237, 125, 49)",

    //线条选中颜色
    LineSelectedColor: "rgb(237, 125, 49)",
    //箭头选中颜色
    ArrowSelectedColor: "rgb(237, 125, 49)",

    //箭头长
    ArrowLength: 8,
    //箭头宽
    ArrowWidth: 4,
    //箭头填充色
    ArrowFillColor: "rgb(75, 155, 237)",

    //.线条调整事件的命名空间
    LineHandleEventNamespace: ".linehandle",
    //.线条文字移动事件的命名空间
    LineLabelEventNamespace: ".line_label",
    //线条Id属性名称
    Label_LineIDPropertyName: "Line-Id",

    //寻找最近活动时，垂直距离的权重加成
    VerticalPerceage: 1.1,

    //默认文字颜色
    DefaultFontColor: "rgb(75, 155, 237)",
    //默认文字大小
    DefaultFontSize: 11,

    //重计算箭尾点
    GetArrowTailPoint: function (_EndPoint, _EndDirection) {
        var _ArrowTailPoint = {
            x: _EndPoint.x,
            y: _EndPoint.y
        };
        //折线的终点(箭尾中点)
        switch (_EndDirection) {
            case LineArrowDirection.Up:
                _ArrowTailPoint.y -= LineSettings.ArrowLength;
                break;
            case LineArrowDirection.Down:
                _ArrowTailPoint.y += LineSettings.ArrowLength;
                break;
            case LineArrowDirection.Left:
                _ArrowTailPoint.x -= LineSettings.ArrowLength;
                break;
            case LineArrowDirection.Right:
                _ArrowTailPoint.x += LineSettings.ArrowLength;
                break;
        }
        return _ArrowTailPoint;
    },

    //根据起始点,计算所有点
    //Return:点集合
    RecalculatePoints: function (_StartDirection, _EndDirection, _StartPoint, _EndPoint) {
        var origin_x = _StartPoint.x;
        var origin_y = _StartPoint.y;
        var target_x = _EndPoint.x;
        var target_y = _EndPoint.y;

        var _Points = [{
            x: _StartPoint.x,
            y: _StartPoint.y
        }];
        if (origin_x == target_x && origin_y == target_y && _StartDirection == _EndDirection) {
            switch (_StartDirection) {
                case LineArrowDirection.Left:
                    _Points.push({
                        x: _StartPoint.x - 20,
                        y: _StartPoint.y
                    });
                    break;
                case LineArrowDirection.Right:
                    _Points.push({
                        x: _StartPoint.x + 20,
                        y: _StartPoint.y
                    });
                    break;
                case LineArrowDirection.Up:
                    _Points.push({
                        x: _StartPoint.x,
                        y: _StartPoint.y - 20
                    });
                    break;
                case LineArrowDirection.Down:
                    _Points.push({
                        x: _StartPoint.x,
                        y: _StartPoint.y + 20
                    });
                    break;
            }
            _Points.push({
                x: _EndPoint.x,
                y: _EndPoint.y
            });
            return _Points;
        }

        switch (_StartDirection) {
            case LineArrowDirection.Up:
                {
                    switch (_EndDirection) {
                        case LineArrowDirection.Left:
                            {
                                //第一象限
                                if (target_y < origin_y && target_x > origin_x)
                                    _Points.push({ x: origin_x, y: target_y });
                                    //第二象限
                                else if (target_y < origin_y && target_x <= origin_x) {
                                    _Points.push({ x: origin_x, y: origin_y / 2 + target_y / 2 });
                                    _Points.push({ x: target_x - LineSettings.MinSegementLength, y: origin_y / 2 + target_y / 2 });
                                    _Points.push({ x: target_x - LineSettings.MinSegementLength, y: target_y });
                                }
                                    //第三象限
                                else if (target_y >= origin_y && target_x <= origin_x) {
                                    _Points.push({ x: origin_x, y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: target_y });
                                }
                                    //第四象限
                                else {
                                    _Points.push({ x: origin_x, y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (origin_x / 2 + target_x / 2), y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (origin_x / 2 + target_x / 2), y: target_y });
                                }
                            }
                            break;
                        case LineArrowDirection.Down:
                            //第一二象限
                            if (target_y < origin_y - LineSettings.MinSegementLength) {
                                _Points.push({ x: origin_x, y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: target_x, y: (origin_y / 2 + target_y / 2) });
                            }
                                //直线
                            else if (target_x == origin_x && target_y < origin_y) {
                            }
                                //第三四象限
                            else {
                                _Points.push({ x: origin_x, y: (origin_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (origin_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (target_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y + LineSettings.MinSegementLength) });
                            }
                            break;
                        case LineArrowDirection.Right:
                            {
                                //第一象限
                                if (target_y < origin_y && target_x > origin_x) {
                                    _Points.push({ x: origin_x, y: (origin_y / 2 + target_y / 2) });
                                    _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                    _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: target_y });
                                }
                                    //第二象限
                                else if (target_y < origin_y && target_x <= origin_x) {
                                    _Points.push({ x: origin_x, y: target_y });
                                }
                                    //第三象限
                                else if (target_y >= origin_y && target_x <= origin_x) {
                                    _Points.push({ x: origin_x, y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (origin_x / 2 + target_x / 2), y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (origin_x / 2 + target_x / 2), y: target_y });
                                }
                                    //第四象限
                                else {
                                    _Points.push({ x: origin_x, y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: target_y });
                                    _Points.push({ x: (target_x + LineSettings.ArrowLength), y: target_y });
                                }
                            }
                            break;
                        case LineArrowDirection.Up:
                            {
                                //第一二象限
                                if (target_y < origin_y) {
                                    _Points.push({ x: origin_x, y: (target_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: (target_x), y: (target_y - LineSettings.MinSegementLength) });
                                }
                                    //第三/四象限
                                else {
                                    _Points.push({ x: origin_x, y: (origin_y - LineSettings.MinSegementLength) });
                                    _Points.push({ x: target_x, y: (origin_y - LineSettings.MinSegementLength) });
                                }
                            }
                            break;
                    }
                    break;
                }
            case LineArrowDirection.Down:
                {
                    switch (_EndDirection) {
                        case LineArrowDirection.Left:
                            //第二象限
                            if (target_x < origin_x && target_y < origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: target_y });
                            }
                                //第三象限
                            else if (target_x < origin_x && target_y > origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: target_y });
                            }
                                //第一象限
                            else if (target_x >= origin_x && target_y <= origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: target_y });
                            }
                                //第四象限
                            else {
                                _Points.push({ x: origin_x, y: target_y });
                            }
                            break;
                        case LineArrowDirection.Down:
                            //第一二象限
                            if (target_y < origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (origin_y + LineSettings.MinSegementLength) });
                            }
                                //第三四象限
                            else {
                                _Points.push({ x: origin_x, y: (target_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y + LineSettings.MinSegementLength) });
                            }
                            break;
                        case LineArrowDirection.Right:
                            //第二象限
                            if (target_x < origin_x && target_y < origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: target_y });
                            }
                                //第三象限
                            else if (target_x < origin_x && target_y > origin_y) {
                                _Points.push({ x: origin_x, y: target_y });
                            }
                                //第一象限
                            else if (target_x >= origin_x && target_y <= origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: target_y });
                            }
                                //第四象限
                            else {
                                _Points.push({ x: origin_x, y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: target_y });
                            }
                            break;
                        case LineArrowDirection.Up:
                            //第一二象限
                            if (target_y - LineSettings.MinSegementLength < origin_y) {
                                _Points.push({ x: origin_x, y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (origin_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (target_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y - LineSettings.MinSegementLength) });
                            }
                                //直线
                            else if (target_x == origin_x && target_y > origin_y) {
                            }
                                //第三四象限
                            else {
                                _Points.push({ x: origin_x, y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: target_x, y: (origin_y / 2 + target_y / 2) });
                            }
                            break;
                    }
                }
                break;
            case LineArrowDirection.Left:
                {
                    switch (_EndDirection) {
                        case LineArrowDirection.Left:
                            //第二三象限
                            if (target_x < origin_x) {
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: target_y });
                            }
                                //第一四象限
                            else {
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: target_y });
                            }
                            break;
                        case LineArrowDirection.Down:
                            //第二象限
                            if (target_x < origin_x && target_y < origin_y) {
                                _Points.push({ x: target_x, y: origin_y });
                            }
                                //第三象限
                            else if (target_x < origin_x && target_y >= origin_y) {
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: origin_y });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (target_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y + LineSettings.MinSegementLength) });
                            }
                                //第一象限
                            else if (target_x >= origin_x && target_y <= origin_y) {
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: target_x, y: (origin_y / 2 + target_y / 2) });
                            }
                                //第四象限
                            else {
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: (target_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y + LineSettings.MinSegementLength) });
                            }
                            break;
                        case LineArrowDirection.Right:
                            //第二三象限
                            if (target_x < origin_x - LineSettings.MinSegementLength) {
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: origin_y });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: target_y });
                            }
                                //直线
                            else if (target_x < origin_x && target_y == origin_y) {
                            }
                                //第一四象限
                            else {
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: target_y });
                            }
                            break;
                        case LineArrowDirection.Up:
                            //第一象限
                            if (target_x > origin_x && target_y < origin_y) {
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: (target_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y - LineSettings.MinSegementLength) });
                            }
                                //第二象限
                            else if (target_x <= origin_x && target_y <= origin_y) {
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: origin_y });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (target_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y - LineSettings.MinSegementLength) });
                            }
                                //第三象限
                            else if (target_x < origin_x && target_y > origin_y) {
                                _Points.push({ x: target_x, y: origin_y });
                            }
                                //第四象限
                            else {
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x - LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: target_x, y: (origin_y / 2 + target_y / 2) });
                            }
                            break;
                    }
                }
                break;
            case LineArrowDirection.Right:
                {
                    switch (_EndDirection) {
                        case LineArrowDirection.Left:
                            //第二三象限
                            if (target_x - LineSettings.MinSegementLength < origin_x) {
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: (target_x - LineSettings.MinSegementLength), y: target_y });
                            }
                                //直线
                            else if (target_x > origin_x && target_y == origin_y) {
                            }
                                //第一四象限
                            else {
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: origin_y });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: target_y });
                            }
                            break;
                        case LineArrowDirection.Down:
                            //第二象限
                            if (target_x < origin_x && target_y < origin_y) {
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: target_x, y: (origin_y / 2 + target_y / 2) });
                            }
                                //第三象限
                            else if (target_x < origin_x && target_y >= origin_y) {
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: (target_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y + LineSettings.MinSegementLength) });
                            }
                                //第一象限
                            else if (target_x >= origin_x && target_y <= origin_y) {
                                _Points.push({ x: target_x, y: origin_y });
                            }
                                //第四象限
                            else {
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: origin_y });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (target_y + LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y + LineSettings.MinSegementLength) });
                            }
                            break;
                        case LineArrowDirection.Right:
                            //第二三象限
                            if (target_x < origin_x) {
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: target_y });
                            }
                                //第一四象限
                            else {
                                _Points.push({ x: (target_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: ((target_x + LineSettings.MinSegementLength)), y: target_y });
                            }
                            break;
                        case LineArrowDirection.Up:
                            //第一象限
                            if (target_x > origin_x && target_y < origin_y) {
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: origin_y });
                                _Points.push({ x: (origin_x / 2 + target_x / 2), y: (target_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y - LineSettings.MinSegementLength) });;
                            }
                                //第二象限
                            else if (target_x <= origin_x && target_y <= origin_y) {
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: (target_y - LineSettings.MinSegementLength) });
                                _Points.push({ x: target_x, y: (target_y - LineSettings.MinSegementLength) });
                            }
                                //第三象限
                            else if (target_x < origin_x && target_y > origin_y) {
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: origin_y });
                                _Points.push({ x: (origin_x + LineSettings.MinSegementLength), y: (origin_y / 2 + target_y / 2) });
                                _Points.push({ x: target_x, y: (origin_y / 2 + target_y / 2) });
                            }
                                //第四象限
                            else {
                                _Points.push({ x: target_x, y: origin_y });
                            }
                            break;
                    }
                }
                break;
        }
        _Points.push({
            x: target_x,
            y: target_y
        });

        //合并在一条直线上的线段
        for (var i = _Points.length - 1; i >= 2; i--) {
            if ((_Points[i].x == _Points[i - 1].x && _Points[i - 1].x == _Points[i - 2].x)
                || (_Points[i].y == _Points[i - 1].y && _Points[i - 1].y == _Points[i - 2].y)) {
                _Points.splice(i - 1, 1);
            }
        }
        return _Points;
    }
}

//线条的样式名称
export const LineStyleClassName = {
    //控制点样式
    LineHandler: "line_handler",
    //起点控制样式
    StartPointHandler: "line_handler_start_point",
    //终点控制样式
    EndPointHandler: "line_handler_end_point",
    //水平线段控制样式
    HorizontalSegementHandler: "line_handler_line_horizontal",
    //竖直线段控制样式
    VerticalSegementHandler: "line_handler_line_vertical",

    //标题
    Label: "line_label_div",
    //标题移动样式
    LabelMoving: "line-label-moving"
}

//线条绘制栈
export const LineDrawStack = {
    //当前调整的线条
    CurrentLine: undefined,
    //当前控制点
    CurrentHandler: undefined,
    //正在绘制
    IsDrawing: false,
    //线条的画布原点
    OriginOffset: {
        x: 0,
        y: 0
    }
}

//线条调整栈
export const LineResizeStack = {
    //当前调整的线条
    CurrentLine: undefined,
    //当前控制点
    CurrentHandler: undefined,
    //正在绘制
    IsDrawing: false,
    //线条的画布原点
    OriginOffset: {
        x: 0,
        y: 0
    },
    //调整前的状态
    SourceState: undefined
}

//箭头的方向
export const LineArrowDirection = {
    //未指定
    Unspecified: undefined,
    //下
    Down: 1,
    //上
    Up: -1,
    //左
    Left: 2,
    //右
    Right: -2,

    Opposite: function (_direction) {
        switch (_direction) {
            case LineArrowDirection.Up:
                return LineArrowDirection.Down;
            case LineArrowDirection.Down:
                return LineArrowDirection.Up;
            case LineArrowDirection.Left:
                return LineArrowDirection.Right;
            case LineArrowDirection.Right:
                return LineArrowDirection.Left;
        }
    }
}


// WEBPACK FOOTER //
// ./src/lib/H3/Console/workflow/line/setting.js