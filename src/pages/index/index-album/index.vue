<template>
  <view>
    <scroll-view @scrolltolower="lower" scroll-y="true" style="height: 1000px" class="recommend-view">
    <!--轮播图开始-->
    <view class="album-swiper">
      <!--
        swiper标签
        1 自动轮播 autoplay
        2 指示器 indicator-dots
        3 衔接轮播 circular
        4 swiper默认高度为 150px
        5 image
          默认宽度为320px => 基本样式中 重置了 100%
          默认高度 240px
        6 计算图片的宽度和高度的比列
        7 把图片的比也写到swiper标签样式
      -->
      <swiper autoplay indicator-dots circular>
        <swiper-item
          v-for="item in banner"
          :key="item.id"
        >
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!--轮播图结束-->
    <!--列表开始-->
    <view  class="album-list">
      <navigator
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album-item" >
          <view class="album-image">
            <image mode="aspectFill" :src="item.cover"></image>
          </view>
          <view class="album-info">
            <view class="album-title">{{item.ename ? item.ename : "标题已经走丢了哦..."}}</view>
            <view class="album-desc">{{item.desc}}</view>
            <view class="album-btn">+ 关注</view>
          </view>
        </view>
      </navigator>

    </view>
    <!--列表结束-->
    </scroll-view>
  </view>
</template>

<script>
import moment from "moment";

export default {
  name: "index",
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0
      },
      //轮播图数字
      banner: [],
      //列表数组
      album: [],
      hasMore: true
    };

  },
  created() {
  },
  mounted() {
    this.getList();
    uni.setNavigationBarTitle({title: "专辑"});
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
        url: "http://service.picasso.adesk.com/v1/wallpaper/album",
        data: this.params
      })
        .then(res => {
          if (res.res.album.length === 0) {
            this.hasMore = false;
            return;
          }
          if (this.banner.length === 0) {
            this.banner = res.res.banner;
            this.banner.push(this.banner[0]);
          }
          this.album = [...this.album, ...res.res.album];
        });
    }

  }
}
</script>

<style scoped lang="scss">
.album-swiper {
  swiper {
    height: 326.1rpx;
  }
  image {
    height: 100%;
  }

}
.album-list {
  .album-item {
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 10rpx 8rpx;
    .album-image {
      width: 25%;
      margin-right: 40rpx;
      image {
        width: 92px;
        height: 92px;
      }

    }
    .album-info {
      position: relative;
      flex: 1;
      overflow: hidden;
      .album-title {
        font-size: 32rpx;
        font-weight: 600;
        padding-bottom: 20rpx;
      }
      .album-desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; //多行在这里修改数字即可
        overflow:hidden;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }
      .album-btn {
        position: absolute;
        right: 0;
        display: inline-block;
        margin-top: 20rpx;
        color: $color;
        padding: 10rpx;
        border: 1px solid $color;
        flex-flow: revert;
      }

    }
  }

}

</style>
