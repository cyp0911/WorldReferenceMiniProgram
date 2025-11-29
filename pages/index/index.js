Page({
  data: {
    activeTab: 'map',
    pageTitle: '世界参考消息',
    pageSubtitle: '全球实时消息追踪',
    mapScale: 1,
    mapTranslateX: 0,
    mapTranslateY: 0,
    isPinching: false,
    isDragging: false,
    initialDistance: 0,
    dragStartX: 0,
    dragStartY: 0,
    dragStartTime: 0,
    
    // 地图页面数据
    countries: [
      {
        id: 'china',
        name: '中国',
        flag: '🇨🇳',
        position: { x: 75, y: 45 },
        unreadCount: 12
      },
      {
        id: 'usa',
        name: '美国',
        flag: '🇺🇸',
        position: { x: 20, y: 35 },
        unreadCount: 8
      },
      {
        id: 'uk',
        name: '英国',
        flag: '🇬🇧',
        position: { x: 42, y: 18 },
        unreadCount: 5
      },
      {
        id: 'japan',
        name: '日本',
        flag: '🇯🇵',
        position: { x: 82, y: 38 },
        unreadCount: 15
      },
      {
        id: 'germany',
        name: '德国',
        flag: '🇩🇪',
        position: { x: 52, y: 25 },
        unreadCount: 3
      },
      {
        id: 'france',
        name: '法国',
        flag: '🇫🇷',
        position: { x: 47, y: 32 },
        unreadCount: 7
      }
    ],
    
    todayUnreadCount: 0,
    countryCount: 0,
    sortedCountries: [],
    
    // 动态页面数据
    trendingTopics: [
      '全球疫情', '科技创新', '经济复苏', 
      '气候变化', '国际关系', '体育赛事'
    ],
    selectedTopic: null
  },

  onLoad() {
    this.initializeData();
  },

  // 初始化数据
  initializeData() {
    const countries = this.data.countries;
    const sortedCountries = [...countries].sort((a, b) => b.unreadCount - a.unreadCount);
    const todayUnreadCount = countries.reduce((sum, country) => sum + country.unreadCount, 0);
    
    this.setData({
      sortedCountries,
      todayUnreadCount,
      countryCount: countries.length
    });
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    
    if (tab === this.data.activeTab) {
      return;
    }

    const titles = {
      map: { title: '世界参考消息', subtitle: '全球实时消息追踪' },
      feed: { title: '全球动态', subtitle: '实时新闻资讯' },
      bookmark: { title: '我的收藏', subtitle: '精选内容推荐' },
      profile: { title: '个人中心', subtitle: '个性化设置' }
    };

    this.setData({
      activeTab: tab,
      pageTitle: titles[tab].title,
      pageSubtitle: titles[tab].subtitle
    });

    // 更新页面标题
    wx.setNavigationBarTitle({
      title: titles[tab].title
    });
  },

  // 选择话题
  selectTopic(e) {
    const topic = e.currentTarget.dataset.topic;
    this.setData({
      selectedTopic: this.data.selectedTopic === topic ? null : topic
    });
  },

  // 标记触摸开始
  onMarkerTouchStart(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`countries[${index}].tapped`]: true
    });
  },

  // 标记触摸结束
  onMarkerTouchEnd(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`countries[${index}].tapped`]: false
    });
  },

  // Tab触摸开始
  onTabTouchStart(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`tabs[${index}].tapped`]: true
    });
  },

  // Tab触摸结束
  onTabTouchEnd(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`tabs[${index}].tapped`]: false
    });
  },

  // 放大地图
  zoomIn() {
    const newScale = Math.min(this.data.mapScale + 0.2, 3);
    this.setData({
      mapScale: newScale
    });
  },

  // 缩小地图
  zoomOut() {
    const newScale = Math.max(this.data.mapScale - 0.2, 0.5);
    this.setData({
      mapScale: newScale
    });
  },

  // 重置缩放
  zoomReset() {
    this.setData({
      mapScale: 1,
      mapTranslateX: 0,
      mapTranslateY: 0
    });
  },

  // 地图触摸开始
  onMapTouchStart(e) {
    if (e.touches.length === 2) {
      // 双指缩放
      this.setData({
        isPinching: true,
        isDragging: false,
        initialDistance: this.getTouchDistance(e.touches)
      });
    } else if (e.touches.length === 1 && this.data.mapScale > 1) {
      // 单指拖动（仅在放大时启用）
      this.setData({
        isDragging: true,
        isPinching: false,
        dragStartX: e.touches[0].clientX - this.data.mapTranslateX,
        dragStartY: e.touches[0].clientY - this.data.mapTranslateY,
        dragStartTime: Date.now()
      });
    }
  },

  // 地图触摸移动
  onMapTouchMove(e) {
    if (this.data.isPinching && e.touches.length === 2) {
      // 处理双指缩放
      const currentDistance = this.getTouchDistance(e.touches);
      const scale = currentDistance / this.data.initialDistance;
      const newScale = Math.max(0.5, Math.min(3, this.data.mapScale * scale));
      
      this.setData({
        mapScale: newScale
      });
    } else if (this.data.isDragging && e.touches.length === 1) {
      // 处理单指拖动
      const deltaX = e.touches[0].clientX - this.data.dragStartX;
      const deltaY = e.touches[0].clientY - this.data.dragStartY;
      
      // 限制拖动范围
      const maxTranslate = 200 * (this.data.mapScale - 1);
      const boundedX = Math.max(-maxTranslate, Math.min(maxTranslate, deltaX));
      const boundedY = Math.max(-maxTranslate, Math.min(maxTranslate, deltaY));
      
      this.setData({
        mapTranslateX: boundedX,
        mapTranslateY: boundedY
      });
    }
  },

  // 地图触摸结束
  onMapTouchEnd(e) {
    const dragDuration = Date.now() - this.data.dragStartTime;
    
    // 短暂触摸重置拖动状态，避免误触
    if (dragDuration > 100) {
      this.setData({
        isDragging: false
      });
    } else {
      setTimeout(() => {
        this.setData({
          isDragging: false
        });
      }, 100);
    }
    
    this.setData({
      isPinching: false
    });
  },

  // 计算两点距离
  getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  },

  // 点击国家
  onCountryTap(e) {
    const country = e.currentTarget.dataset.country;
    
    wx.showModal({
      title: country.name,
      content: `${country.flag} ${country.name}\n未读消息: ${country.unreadCount} 条`,
      confirmText: '查看详情',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: `打开 ${country.name} 新闻列表`,
            icon: 'none',
            duration: 2000
          });
        }
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.initializeData();
    
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
    const { activeTab } = this.data;
    const shareData = {
      map: {
        title: '世界参考消息 - 全球消息追踪',
        path: '/pages/index/index?tab=map'
      },
      feed: {
        title: '全球动态 - 实时新闻资讯',
        path: '/pages/index/index?tab=feed'
      },
      bookmark: {
        title: '我的收藏 - 精选内容推荐',
        path: '/pages/index/index?tab=bookmark'
      },
      profile: {
        title: '个人中心 - 个性化设置',
        path: '/pages/index/index?tab=profile'
      }
    };
    
    return shareData[activeTab] || shareData.map;
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { activeTab } = this.data;
    const titles = {
      map: '世界参考消息 - 全球消息追踪',
      feed: '全球动态 - 实时新闻资讯',
      bookmark: '我的收藏 - 精选内容推荐',
      profile: '个人中心 - 个性化设置'
    };
    
    return {
      title: titles[activeTab] || '世界参考消息'
    };
  }
});