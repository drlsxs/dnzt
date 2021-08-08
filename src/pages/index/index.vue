<template>
	<view>
    <view class="home-tab">
      <view class="home-tab__title">
        <view class="title__inner">
          <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#3D8CF1"></uni-segmented-control>
        </view>
        <view class="iconfont icon-search"></view>
      </view>
      <view class="home-tab__content">
        <view v-if="current === 0">
          <index-recommend></index-recommend>
        </view>
        <view v-if="current === 1">
          <index-album></index-album>

        </view>
        <view v-if="current === 2">
          <index-category></index-category>

        </view>
        <view v-if="current === 3">
          <index-news></index-news>

        </view>
      </view>
    </view>
	</view>
</template>

<script>
import indexAlbum from "./index-album";
import indexCategory from "./index-category";
import indexNews from "./index-news";
import indexRecommend from "./index-recommend";
import  { uniSegmentedControl }  from  '@dcloudio/uni-ui'
import request from "../../utils/request";
export default {
    components: {
      indexAlbum,
      indexCategory,
      indexNews,
      indexRecommend,
      uniSegmentedControl
    },
		data() {
			return {
        items: ["推荐", "专辑", "分类", "最新"],
        current: 0,

			}
		},
		onLoad() {

		},
		methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex;
        }
      },
		}
	}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.home-tab {
  .home-tab__title {
    position: relative;
    .title__inner {
      width: 60%;
      margin: 0 auto;
    }
    .icon-search {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
}
</style>
