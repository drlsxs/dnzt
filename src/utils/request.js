//es6

export default (params) => {
  uni.showToast({
    title: "加载中...",
    icon: "loading"
  });

  return new Promise((resolve, reject) => {
    uni.request({
      ...params,

      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      }
    });

  });
};
