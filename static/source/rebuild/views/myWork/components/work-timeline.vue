<template>
  <div class="timeline">
    <div v-for="(item, index) in data" :key="index" class="timeline-block">
      <div class="timeline-header">
        <div class="header-box">
          <span class="header-month">{{ item.month }}/{{ item.date }}</span>
          <span class="header-year">
            {{ item.year }}年 星期{{ week[+item.dayOfWeek] }}
          </span>
          <span v-if="howManyTodos(item.list)" class="header-todos">
            {{ howManyTodos(item.list) }}条待办事项
          </span>
        </div>
      </div>
      <div v-for="(card, ind) in item.list" :key="ind" class="timeline-item">
        <div class="item-time">
          <div class="item-time__text">
            <span>{{ card.createTime | formateTime }}</span>
          </div>
          <div v-if="isTodo(card.taskType)" class="item-time__todo">
            待办
          </div>
        </div>
        <div class="item-card" @click="$emit('view', card)">
          <div class="card-detail">
            <div class="card-title">
              <div class="title-avatar">
                {{ card.startUserName && card.startUserName[0] }}
              </div>
              <div class="title-text">
                {{ card.appRunName }} ({{ card.nameSchema }})
              </div>
            </div>
            <div v-if="type === 'unfinish'" class="card-message">
              <span class="card-message__item">
                <i class="iconfont iconFgerenyonghu"></i>
                <span>{{ card.dealName }}</span>
              </span>
              <span class="card-message__item">
                <i class="iconfont iconFtongyishenpi"></i>
                <span>{{ card.taskName }}</span>
              </span>
              <span class="card-message__item">
                <i class="iconfont iconFbiaojixiangqing"></i>
                <span>
                  {{ taskAction[card.taskAction] }}
                </span>
              </span>
            </div>
            <div v-if="type === 'finish'" class="card-message">
              <span class="card-message__item">
                <i class="iconfont iconFtongyishenpi"></i>
                <span>{{ card.taskName }}</span>
              </span>
              <span class="card-message__item">
                <i class="iconfont iconFbiaojixiangqing"></i>
                <span>
                  {{
                    card.taskType === '4' ? '已阅' : taskAction[card.taskAction]
                  }}
                </span>
              </span>
            </div>
            <div v-if="type === 'submit'" class="card-message">
              <span class="card-message__item">
                <i class="iconfont iconFbiaojixiangqing"></i>
                <span>{{ appRunStatus[card.appRunStatus] }}</span>
                <span v-if="actResult[card.actResult]">
                  ({{ actResult[card.actResult] }})
                </span>
              </span>
            </div>
          </div>
          <div v-if="type === 'unfinish'" class="card-opera">
            <el-button
              v-if="isTodo(card.taskType)"
              type="primary"
              size="small"
              @click.stop.prevent="$emit('agree', card)"
            >
              同意
            </el-button>
            <el-button
              v-if="isTodo(card.taskType)"
              plain
              size="small"
              @click.stop.prevent="$emit('disagree', card)"
            >
              拒绝
            </el-button>
            <span v-if="+card.taskType === 3" class="card-opera__error">
              被驳回需重新提交
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button v-if="!noMore" round size="small" @click="$emit('load')">
        加载更多
      </el-button>
      <el-button v-if="noMore" round size="small" disabled>
        暂无更多数据
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkTimeline',
  props: {
    type: String,
    data: Array,
    noMore: Boolean
  },
  data() {
    return {
      week: ['', '日', '一', '二', '三', '四', '五', '六'],
      taskAction: {
        0: '待处理',
        1: '同意',
        2: '不同意',
        3: '撤回',
        4: '驳回',
        5: '转办',
        6: '未阅',
        7: '跳转',
        12: '已加派'
      },
      appRunStatus: {
        0: '子流程开启待提交',
        1: '草稿',
        2: '进行中',
        3: '结束',
        4: '驳回到发起人'
      },
      actResult: { 1: '同意', 2: '不同意', 4: '撤回' }
    }
  },
  methods: {
    isTodo(type) {
      return ['1', '2', '8'].includes(type)
    },
    howManyTodos(list = []) {
      return list.filter(item => this.isTodo(item.taskType)).length
    }
  },
  filters: {
    formateTime(timestamp) {
      const date = new Date(timestamp)
      const hour = `0${date.getHours()}`.slice(-2)
      const min = `0${date.getMinutes()}`.slice(-2)
      return `${hour}:${min}`
    }
  }
}
</script>

<style lang="scss" scoped>
$timeline-padding: 30px;
$timeline-dot-size: 15px;
$timeline-dot-left: -($timeline-padding + ($timeline-dot-size - 1) / 2);

.timeline {
  max-width: 1000px;
  position: relative;
  padding-left: $timeline-padding;
  margin-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: $color-layout-border;
}

.timeline-block {
  padding-bottom: 20px;
}

.timeline-header {
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    width: $timeline-dot-size;
    height: $timeline-dot-size;
    border: 3px solid $color-main;
    border-radius: 50%;
    position: absolute;
    left: $timeline-dot-left;
    background-color: #fff;
  }

  & .header-box {
    width: 100%;
  }

  & .header-month {
    font-size: 26px;
    margin-right: 5px;
  }

  & .header-year {
    font-size: $font-size-main;
  }

  & .header-todos {
    color: $color-warn;
    font-size: $font-size-main;
    float: right;
    margin-top: 13px;
  }
}

.timeline-item {
  display: flex;
  margin: 20px 0;

  & .item-time {
    margin-top: 15px;
    margin-right: 20px;

    &__text {
      display: flex;
      align-items: center;
      position: relative;

      &::before {
        content: '';
        width: $timeline-dot-size;
        height: $timeline-dot-size;
        border: 3px solid #fff;
        border-radius: 50%;
        position: absolute;
        left: $timeline-dot-left;
        background-color: $color-main;
      }

      & span {
        font-size: 20px;
        color: $color-main;
      }
    }

    &__todo {
      display: inline-block;
      padding: 2px 12px;
      background-color: $color-warn;
      color: #fff;
      border-radius: 15px;
      margin-top: 5px;
      font-size: 12px;
    }
  }

  & .item-card {
    flex: 1;
    display: flex;
    padding: 15px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
    }

    & .card-detail {
      flex: 1;

      & .card-title {
        display: flex;
        align-items: center;

        & .title-avatar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background-color: $color-main;
          color: #fff;
          font-size: 16px;
          margin-right: 10px;
        }

        & .title-text {
          flex: 1;
          font-size: $font-size-main;
        }
      }

      & .card-message {
        color: $color-remind;
        margin-left: 42px;

        &__item {
          margin-right: 40px;

          & .iconfont {
            font-size: 14px;
          }

          & span {
            margin-left: 5px;
            font-size: 12px;
          }
        }
      }
    }

    & .card-opera {
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;

      &__error {
        color: $color-error;
        font-size: 12px;
      }
    }
  }
}
</style>
