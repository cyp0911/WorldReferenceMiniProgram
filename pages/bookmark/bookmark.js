Page({
  data: {
    bookmarks: [
      {
        id: 1,
        title: '中国制造业PMI超预期增长，经济复苏势头强劲',
        source: '新华社',
        sourceLogo: '📰',
        time: '2小时前',
        category: '经济',
        country: '中国',
        countryFlag: '🇨🇳',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop',
        views: 15234,
        savedAt: '2024-01-15'
      },
      {
        id: 2,
        title: '人工智能技术突破：OpenAI发布新一代语言模型',
        source: '科技日报',
        sourceLogo: '💻',
        time: '3小时前',
        category: '科技',
        country: '美国',
        countryFlag: '🇺🇸',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
        views: 28456,
        savedAt: '2024-01-14'
      },
      {
        id: 3,
        title: '欧洲央行宣布维持利率不变，通胀压力仍然存在',
        source: '路透社',
        sourceLogo: '🌍',
        time: '4小时前',
        category: '经济',
        country: '德国',
        countryFlag: '🇩🇪',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
        views: 9876,
        savedAt: '2024-01-13'
      },
      {
        id: 4,
        title: '日本东京奥运会筹备工作全面展开，场馆建设进展顺利',
        source: '共同社',
        sourceLogo: '🇯🇵',
        time: '5小时前',
        category: '体育',
        country: '日本',
        countryFlag: '🇯🇵',
        image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e93a?w=400&h=200&fit=crop',
        views: 18765,
        savedAt: '2024-01-12'
      },
      {
        id: 5,
        title: '英国议会就绿色能源政策展开激烈辩论',
        source: 'BBC',
        sourceLogo: '🇬🇧',
        time: '6小时前',
        category: '政治',
        country: '英国',
        countryFlag: '🇬🇧',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop',
        views: 7654,
        savedAt: '2024-01-11'
      }
    ],
    
    totalBookmarks: 0,
    todayBookmarks: 0,
    weekBookmarks: 0,
    hasMore: false,
    isLoading: false,
    page: 1
  },

  onLoad() {
    this.loadBookmarkData();
  },

  onShow() {
    // 页面显示时刷新收藏数据
    this.refreshBookmarks();
  },

  // 加载收藏数据
  loadBookmarkData() {
    this.setData({
      isLoading: true
    });

    // 模拟网络请求
    setTimeout(() => {
      this.calculateBookmarkStats();
      this.setData({
        isLoading: false
      });
    }, 500);
  },

  // 计算收藏统计
  calculateBookmarkStats() {
    const { bookmarks } = this.data;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // 计算今日新增
    const todayBookmarks = bookmarks.filter(item => item.savedAt === todayStr).length;
    
    // 计算本周新增
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekBookmarks = bookmarks.filter(item => 
      new Date(item.savedAt) >= weekAgo
    ).length;

    this.setData({
      totalBookmarks: bookmarks.length,
      todayBookmarks,
      weekBookmarks
    });
  },

  // 刷新收藏列表
  refreshBookmarks() {
    this.setData({
      page: 1
    });
    this.loadBookmarkData();
  },

  // 加载更多
  loadMore() {
    if (this.data.isLoading || !this.data.hasMore) return;

    this.setData({
      isLoading: true
    });

    // 模拟加载更多数据
    setTimeout(() => {
      const moreBookmarks = this.generateMockBookmarks();
      if (moreBookmarks.length === 0) {
        this.setData({
          hasMore: false,
          isLoading: false
        });
        wx.showToast({
          title: '没有更多内容了',
          icon: 'none',
          duration: 1500
        });
        return;
      }

      this.setData({
        bookmarks: [...this.data.bookmarks, ...moreBookmarks],
        page: this.data.page + 1,
        isLoading: false,
        hasMore: moreBookmarks.length >= 3
      });
      
      this.calculateBookmarkStats();
    }, 1000);
  },

  // 生成模拟收藏数据
  generateMockBookmarks() {
    if (this.data.page > 2) return []; // 模拟没有更多数据

    const mockBookmarks = [
      {
        id: Date.now() + Math.random(),
        title: '全球供应链重构加速，各国加强本土制造业投资',
        source: '财经时报',
        sourceLogo: '💼',
        time: '8小时前',
        category: '经济',
        country: '美国',
        countryFlag: '🇺🇸',
        image: `https://images.unsplash.com/photo-${Date.now()}?w=400&h=200&fit=crop`,
        views: Math.floor(Math.random() * 50000),
        savedAt: new Date().toISOString().split('T')[0]
      }
    ];

    return mockBookmarks;
  },

  // 移除收藏
  removeBookmark(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认移除',
      content: '确定要移除这条收藏吗？',
      confirmText: '移除',
      confirmColor: '#ef4444',
      success: (res) => {
        if (res.confirm) {
          const bookmarks = this.data.bookmarks.filter(item => item.id !== id);
          this.setData({ bookmarks });
          this.calculateBookmarkStats();
          
          wx.showToast({
            title: '已移除收藏',
            icon: 'success',
            duration: 1500
          });
        }
      }
    });
  },

  // 分享收藏
  shareBookmark(e) {
    const bookmark = e.currentTarget.dataset.bookmark;
    
    wx.showActionSheet({
      itemList: ['分享给朋友', '复制链接', '保存图片'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            // 分享给朋友
            wx.showShareMenu({
              withShareTicket: true
            });
            break;
          case 1:
            // 复制链接
            wx.setClipboardData({
              data: bookmark.title,
              success: () => {
                wx.showToast({
                  title: '已复制标题',
                  icon: 'success',
                  duration: 1500
                });
              }
            });
            break;
          case 2:
            // 保存图片
            wx.showToast({
              title: '功能开发中',
              icon: 'none',
              duration: 1500
            });
            break;
        }
      }
    });
  },

  // 跳转到动态页面
  goToFeed() {
    wx.switchTab({
      url: '/pages/index/index'
    }).then(() => {
      // 切换到动态tab
      const eventChannel = this.getOpenerEventChannel();
      if (eventChannel) {
        eventChannel.emit('switchTab', { tab: 'feed' });
      }
    });
  },

  // 打开收藏的新闻详情
  openBookmarkDetail(e) {
    const bookmark = e.currentTarget.dataset.bookmark;
    
    wx.navigateTo({
      url: `/pages/detail/detail?id=${bookmark.id}&from=bookmark`
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshBookmarks();
    
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1500
      });
    }, 1000);
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: `我的收藏 - ${this.data.totalBookmarks} 条精选内容`,
      path: '/pages/index/index?tab=bookmark',
      imageUrl: '' // 可以设置分享图片
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: `我的收藏 - ${this.data.totalBookmarks} 条精选内容`
    };
  },

  // 页面滚动
  onPageScroll(e) {
    // 可以在这里添加滚动相关的逻辑
  }
});