<template>
  <view class="scroll-container">
    <scroll-view @scrolltolower="lower" scroll-y="true" style="height: 1000px" class="recommend-view"  v-if="recommend.length>0">
      <!--推荐开始-->
      <view class="recommend-warp">
        <view class="recommend-item" v-for="item in recommend" :key="item.id">
          <image :src="item.thumb" mode="widthFix"></image>
        </view>
      </view>
      <!--推荐结束-->
      <!--月份开始-->
      <view class="month-warp">
        <view class="month__title">
          <view class="title-info">
            <view class="month-info">
              <text> {{monthes.DD}} </text>
              / {{monthes.MM}} 月
            </view>
            <view class="title-text">
              {{monthes.title}}
            </view>
          </view>
          <view class="title-more">
            <text>更多 > </text>
          </view>
        </view>
        <view class="month__content">
          <view class="content-item" v-for="item in monthes.items" :key="item.id">
            <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>',360)"></image>
          </view>

        </view>

      </view>
      <!--月份结束-->
      <!--热门开始-->
      <view class="hot-warp">
        <view class="hot__title">
          <text>热门</text>
        </view>
        <view class="hot__content">
          <view class="hot-item"
                v-for="item in hots"
                :key="item.id"
          >
            <image
              mode="aspectFill"
              :src="item.thumb"
            ></image>
          </view>
        </view>
      </view>
      <!--热门结束-->
    </scroll-view>
  </view>
</template>

<script>
import moment from "moment";
export default {
  name: "index",
  data() {
    return {
      //推荐列表
      recommend: [],
      //月份模块
      monthes: {},
      hots: [],
      params: {
        limit: 30,
        order: "hot",
        skip: 0
      },
      hasMore: true
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //滚动条触底条件
    lower() {
      //根据状态判断是否继续发送请求
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有更多图片了",
          icon: "none"
        });
      }

    },

    getList() {
      this.request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params
      })
        .then(res => {
          //优化判断是否还有数据，没有数据就改变状态
          if (res.res.vertical.length === 0) {
            this.hasMore = false;
            return; //返回不再继续执行
          }
          if (this.recommend.length === 0) {
            //推荐数据
            this.recommend = res.res.homepage[1].items;
            //月份数据
            this.monthes = res.res.homepage[2];
            this.monthes.MM = moment(this.monthes.stime).format("MM");
            this.monthes.DD = moment(this.monthes.stime).format("DD");
          }
          //热门数据，加上继续请求得到的res.res.vertical，并展开合并为全部数据
          this.hots = [...this.hots, ...res.res.vertical];
        });
    }


  }
}
</script>

<style scoped lang="scss">
.scroll-container {
  height: 100%;
}


.recommend-warp {
  display: flex;
  flex-wrap: wrap;
  .recommend-item {
    width: 50%;
    border: 4rpx solid #fff;
  }

}
.month-warp {
  .month__title {
    color: $color;
    padding: 20rpx;
    line-height: 32rpx;
    display: flex;
    justify-content: space-between;
    .title-info {
      display: flex;
      .month-info {
        margin-right: 18rpx;
        text {
          font-size: 32rpx;
          font-weight: bold;
        }
      }
      .title-text {
        color: #000;
        font-weight: bold;
        opacity: 0.8;
      }
    }
    .title-more {
    }
  }
  .month__content {
    display: flex;
    flex-wrap: wrap;
    .content-item {
      width: 33.3%;
      border: 4rpx solid #fff;
    }
  }


}
.hot-warp {
  .hot__title {
    padding: 20rpx;
    text {
      color: #333333;
      font-size: 32rpx;
      font-weight: bold;
      padding-left: 20rpx;
      border-left: 5rpx solid $color;
    }

  }
  .hot__content {
    display: flex;
    flex-wrap: wrap;
    .hot-item {
      width: 33.3%;
      border: 4rpx solid #fff;
    }
  }
}



</style>
