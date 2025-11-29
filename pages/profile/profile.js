Page({
  data: {
    // 用户信息
    userInfo: {
      nickname: '用户',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      signature: '探索世界，了解全球资讯'
    },
    
    // 统计数据
    stats: {
      readCount: 1256,
      savedCount: 89,
      followCount: 15
    },
    
    // 关注的国家
    followedCountries: [
      '中国', '美国', '日本', '德国', '英国'
    ],
    
    // 感兴趣的分类
    interestedCategories: [
      '经济', '科技', '政治', '文化'
    ],
    
    // 当前语言
    currentLanguage: '简体中文',
    
    // 设置项
    settings: {
      notification: true,
      darkMode: false
    },
    
    // 应用版本
    appVersion: '1.0.0'
  },

  onLoad() {
    this.loadUserProfile();
  },

  onShow() {
    // 页面显示时刷新用户数据
    this.refreshUserData();
  },

  // 加载用户资料
  loadUserProfile() {
    // 模拟获取用户信息
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.setData({
          'userInfo.nickname': res.userInfo.nickName,
          'userInfo.avatarUrl': res.userInfo.avatarUrl
        });
      },
      fail: () => {
        // 获取用户信息失败，使用默认信息
        console.log('使用默认用户信息');
      }
    });
    
    // 模拟获取统计数据
    this.loadUserStats();
  },

  // 加载用户统计数据
  loadUserStats() {
    // 这里应该调用API获取真实的用户统计
    // 暂时使用模拟数据
    this.setData({
      stats: {
        readCount: Math.floor(Math.random() * 5000) + 1000,
        savedCount: Math.floor(Math.random() * 200) + 50,
        followCount: Math.floor(Math.random() * 50) + 10
      }
    });
  },

  // 刷新用户数据
  refreshUserData() {
    this.loadUserStats();
  },

  // 打开国家设置
  openCountriesSettings() {
    wx.showActionSheet({
      itemList: [
        '管理关注国家',
        '添加新国家',
        '移除关注',
        '查看推荐'
      ],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.manageCountries();
            break;
          case 1:
            this.addCountry();
            break;
          case 2:
            this.removeCountry();
            break;
          case 3:
            this.showCountryRecommendations();
            break;
        }
      }
    });
  },

  // 管理关注国家
  manageCountries() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 添加国家
  addCountry() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 移除国家
  removeCountry() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 显示国家推荐
  showCountryRecommendations() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 打开分类设置
  openCategoriesSettings() {
    wx.showActionSheet({
      itemList: [
        '管理兴趣分类',
        '添加新分类',
        '移除分类',
        '推荐分类'
      ],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.manageCategories();
            break;
          case 1:
            this.addCategory();
            break;
          case 2:
            this.removeCategory();
            break;
          case 3:
            this.showCategoryRecommendations();
            break;
        }
      }
    });
  },

  // 管理分类
  manageCategories() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 添加分类
  addCategory() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 移除分类
  removeCategory() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 显示分类推荐
  showCategoryRecommendations() {
    wx.showToast({
      title: '开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 打开语言设置
  openLanguageSettings() {
    wx.showActionSheet({
      itemList: [
        '简体中文',
        '繁體中文',
        'English',
        '日本語',
        '한국어'
      ],
      success: (res) => {
        const languages = ['简体中文', '繁體中文', 'English', '日本語', '한국어'];
        this.setData({
          currentLanguage: languages[res.tapIndex]
        });
        
        wx.showToast({
          title: `已切换到${languages[res.tapIndex]}`,
          icon: 'success',
          duration: 1500
        });
      }
    });
  },

  // 切换通知设置
  toggleNotification() {
    const newStatus = !this.data.settings.notification;
    this.setData({
      'settings.notification': newStatus
    });
    
    wx.showToast({
      title: newStatus ? '已开启推送通知' : '已关闭推送通知',
      icon: 'success',
      duration: 1500
    });
  },

  // 切换深色模式
  toggleDarkMode() {
    const newStatus = !this.data.settings.darkMode;
    this.setData({
      'settings.darkMode': newStatus
    });
    
    // 这里可以实现深色模式的切换逻辑
    wx.showToast({
      title: newStatus ? '已开启深色模式' : '已关闭深色模式',
      icon: 'success',
      duration: 1500
    });
  },

  // 打开隐私政策
  openPrivacyPolicy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们非常重视您的隐私保护，详细内容请查看完整隐私政策文档。',
      confirmText: '查看完整政策',
      cancelText: '我知道了',
      success: (res) => {
        if (res.confirm) {
          // 跳转到隐私政策页面
          wx.navigateTo({
            url: '/pages/privacy/privacy'
          });
        }
      }
    });
  },

  // 打开帮助
  openHelp() {
    wx.showActionSheet({
      itemList: [
        '使用指南',
        '常见问题',
        '意见反馈',
        '联系客服'
      ],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.openUserGuide();
            break;
          case 1:
            this.openFAQ();
            break;
          case 2:
            this.openFeedback();
            break;
          case 3:
            this.contactSupport();
            break;
        }
      }
    });
  },

  // 用户指南
  openUserGuide() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 常见问题
  openFAQ() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 意见反馈
  openFeedback() {
    wx.showModal({
      title: '意见反馈',
      content: '请描述您遇到的问题或建议',
      editable: true,
      placeholderText: '请输入您的反馈...',
      success: (res) => {
        if (res.confirm && res.content) {
          wx.showToast({
            title: '感谢您的反馈',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  },

  // 联系客服
  contactSupport() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 打开更多设置
  openMoreSettings() {
    wx.showActionSheet({
      itemList: [
        '清除缓存',
        '数据同步',
        '账号安全',
        '关于应用',
        '退出登录'
      ],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.clearCache();
            break;
          case 1:
            this.syncData();
            break;
          case 2:
            this.accountSecurity();
            break;
          case 3:
            this.aboutApp();
            break;
          case 4:
            this.logout();
            break;
        }
      }
    });
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除缓存的逻辑
          wx.showToast({
            title: '缓存已清除',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  },

  // 数据同步
  syncData() {
    wx.showLoading({
      title: '同步中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '同步完成',
        icon: 'success',
        duration: 1500
      });
    }, 2000);
  },

  // 账号安全
  accountSecurity() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 关于应用
  aboutApp() {
    wx.showModal({
      title: '关于世界参考消息',
      content: `版本：${this.data.appVersion}\n开发团队：WorldReference Team\n© 2024 版权所有`,
      showCancel: false
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出当前账号吗？',
      success: (res) => {
        if (res.confirm) {
          // 退出登录的逻辑
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '个人中心 - 世界参考消息',
      path: '/pages/index/index?tab=profile'
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '个人中心 - 世界参考消息'
    };
  }
});