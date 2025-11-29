Page({
  data: {
    // 热门话题
    trendingTopics: [
      '全球疫情', '科技创新', '经济复苏', 
      '气候变化', '国际关系', '体育赛事',
      '文化艺术', '教育改革', '健康生活'
    ],
    selectedTopic: null,
    
    // 新闻列表
    newsList: [
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
        comments: 234,
        saved: false,
        trending: true
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
        comments: 567,
        saved: true,
        trending: true
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
        comments: 123,
        saved: false,
        trending: false
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
        comments: 890,
        saved: true,
        trending: true
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
        comments: 234,
        saved: false,
        trending: false
      }
    ],
    
    hasMore: true,
    isLoading: false,
    page: 1
  },

  onLoad() {
    this.loadNewsData();
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshNewsList();
  },

  // 选择话题
  selectTopic(e) {
    const topic = e.currentTarget.dataset.topic;
    this.setData({
      selectedTopic: this.data.selectedTopic === topic ? null : topic
    });
    
    // 重新筛选新闻
    this.filterNewsByTopic();
  },

  // 按话题筛选新闻
  filterNewsByTopic() {
    if (!this.data.selectedTopic) {
      this.loadNewsData();
      return;
    }
    
    // 这里应该调用API根据话题筛选新闻
    // 暂时使用模拟数据
    wx.showLoading({
      title: '加载中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: `已筛选话题: ${this.data.selectedTopic}`,
        icon: 'none',
        duration: 1500
      });
    }, 1000);
  },

  // 加载新闻数据
  loadNewsData() {
    if (this.data.isLoading) return;
    
    this.setData({ isLoading: true });
    
    // 模拟网络请求
    setTimeout(() => {
      const newNews = this.generateMockNews(this.data.page);
      const newsList = this.data.page === 1 
        ? newNews 
        : [...this.data.newsList, ...newNews];
      
      this.setData({
        newsList,
        isLoading: false,
        page: this.data.page + 1,
        hasMore: newNews.length >= 5
      });
    }, 1000);
  },

  // 生成模拟新闻数据
  generateMockNews(page) {
    if (page > 3) return []; // 模拟没有更多数据
    
    const mockNews = [
      {
        id: Date.now() + Math.random(),
        title: '全球供应链重构加速，各国加强本土制造业投资',
        source: '财经时报',
        sourceLogo: '💼',
        time: `${page}小时前`,
        category: '经济',
        country: '美国',
        countryFlag: '🇺🇸',
        image: `https://images.unsplash.com/photo-${Date.now()}?w=400&h=200&fit=crop`,
        views: Math.floor(Math.random() * 50000),
        comments: Math.floor(Math.random() * 1000),
        saved: Math.random() > 0.5,
        trending: Math.random() > 0.7
      }
    ];
    
    return mockNews;
  },

  // 刷新新闻列表
  refreshNewsList() {
    this.setData({
      page: 1,
      hasMore: true
    });
    this.loadNewsData();
  },

  // 加载更多新闻
  loadMoreNews() {
    if (!this.data.hasMore || this.data.isLoading) return;
    
    this.loadNewsData();
  },

  // 打开新闻详情
  openNewsDetail(e) {
    const news = e.currentTarget.dataset.news;
    
    wx.showModal({
      title: news.title.substring(0, 15) + '...',
      content: `来源: ${news.source}\n时间: ${news.time}\n阅读: ${news.views}`,
      confirmText: '查看详情',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 跳转到新闻详情页
          wx.navigateTo({
            url: `/pages/detail/detail?id=${news.id}`
          });
        }
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshNewsList();
    
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
    const { selectedTopic } = this.data;
    const shareData = {
      title: selectedTopic 
        ? `全球动态 - #${selectedTopic} 话题精选`
        : '全球动态 - 实时新闻资讯',
      path: '/pages/index/index?tab=feed'
    };
    
    if (selectedTopic) {
      shareData.path += `&topic=${encodeURIComponent(selectedTopic)}`;
    }
    
    return shareData;
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '全球动态 - 实时新闻资讯'
    };
  },

  // 页面滚动
  onPageScroll(e) {
    // 可以在这里添加滚动相关的逻辑
    // 比如显示/隐藏回到顶部按钮
  },

  // 到达页面底部
  onReachBottom() {
    this.loadMoreNews();
  }
});