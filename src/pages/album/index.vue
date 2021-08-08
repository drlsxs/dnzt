<template>
  <view>
    <!--专辑背景开始-->
    <view class="album-cover">
      <view class="album-image">
        <image :src="album.cover" mode="aspectFill"></image>
      </view>
      <view class="album-info">
        <view class="album-title">{{album.name}}</view>
        <view class="album-btn">关注专辑</view>
      </view>
    </view>
    <!--专辑作者开始-->
    <view class="album-author" v-if="Object.keys(album).length>0">
      <view class="author-info">
        <view class="author__avatar">
          <image :src="album.user.avatar"></image>
        </view>
        <text class="author__name">
          {{album.user.name}}
        </text>
      </view>
      <text class="author__desc">
        {{album.desc}}
      </text>
    </view>
    <!--专辑图片列表开始-->
    <view class="album-list">
      <view class="album-item"
        v-for="item in wallpaper"
        :key="item.id"
      >
        <view class="album__img">
          <image :src="item.thumb + item.rule.replace(`$<Height>`,360)">
          </image>
        </view>

      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      id: -1,
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1
      },
      album: {},
      wallpaper: []
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  created() {
  },
  methods: {
    getList() {
      this.request({
        url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params
      })
        .then(res => {
          console.log(res, 333);
          this.album = res.res.album;
          JSON.stringify(res.res.album.desc); // 转换为JSON字符串，用换行符，让文字换行
          this.wallpaper = res.res.wallpaper;
        });
    }
  }
}
</script>

<style scoped lang="scss">
.album-cover {
  position: relative;
  .album-info {
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx 20rpx 40rpx;
    .album-title {
      font-size: 50rpx;
    }
    .album-btn {
      background-color: $color;
      display: inline-block;
      padding: 15rpx;
      border-radius: 10rpx;
    }
  }

}
.album-author {
  padding: 20rpx 20rpx 0;
  .author-info {
    margin-bottom: 20rpx;
    position: relative;
    .author__avatar {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      margin-right:40rpx;
      overflow: hidden;
      display: inline-block;

      image {
        height: 100%;
      }

    }
    .author__name {
      font-size: 36rpx;
      font-weight: bold;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

  }
  .author__desc {


  }

}
.album-list {
  display: flex;
  flex-wrap: wrap;
  .album-item {
    width: 33.3%;
    border: 3rpx solid #fff;
    .album__img {
    }

  }
}


</style>
