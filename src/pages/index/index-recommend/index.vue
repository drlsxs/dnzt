<template>
  <view v-if="recommend.length>0">
    <!--推荐开始-->
    <view class="recommend-warp clearfix">
      <view class="recommend-item" v-for="item in recommend" :key="item.id">
        <image :src="item.thumb" mode="widthFix"></image>
      </view>
    </view>
    <!--推荐结束-->
    <!--月份开始-->
    <view class="month-warp">
      <view class="month__title clearfix">
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
      <view class="month__content clearfix">
        <view class="content-item" v-for="item in monthes.items" :key="item.id">
          <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>',360)"></image>
        </view>

      </view>

    </view>
    <!--月份结束-->
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
      monthes: {}
    };
  },
  mounted() {
    this.request({
      url: "http://service.picasso.adesk.com/v3/homepage/vertical",
      data: {
        limit: 30,
        order: "hot",
        skip: 0
      }
    })
      .then(res => {
        console.log(res);
        this.recommend = res.res.homepage[1].items;
        this.monthes = res.res.homepage[2];
        this.monthes.MM = moment(this.monthes.stime).format("MM");
        this.monthes.DD = moment(this.monthes.stime).format("DD");
      });
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

.recommend-warp {
  .recommend-item {
    float: left;
    width: 50%;
    border: 4rpx solid #fff;
  }

}

.month-warp {
  .month__title {
    color: $color;
    padding: 10rpx;
    line-height: 32rpx;
    .title-info {
      float: left;
      text {
        font-size: 32rpx;
        font-weight: bold;
      }
      .month-info {
        float: left;
        margin-right: 18rpx;
      }
      .title-text {
        color: #000;
        float: left;
        font-weight: bold;
        opacity: 0.8;
      }

    }
    .title-more {
      float: right;
    }
  }
  .month__content {
    .content-item {
      float: left;
      width: 33.3%;
      border: 4rpx solid #fff;
    }
  }


}



</style>
