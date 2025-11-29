Page({
  data: {
    // 国家数据（按设计文档格式）
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
        position: { x: 48, y: 20 },
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
      },
      {
        id: 'russia',
        name: '俄罗斯',
        flag: '🇷🇺',
        position: { x: 65, y: 20 },
        unreadCount: 9
      },
      {
        id: 'india',
        name: '印度',
        flag: '🇮🇳',
        position: { x: 70, y: 55 },
        unreadCount: 11
      },
      {
        id: 'brazil',
        name: '巴西',
        flag: '🇧🇷',
        position: { x: 30, y: 65 },
        unreadCount: 4
      },
      {
        id: 'canada',
        name: '加拿大',
        flag: '🇨🇦',
        position: { x: 18, y: 20 },
        unreadCount: 6
      }
    ],
    
    // 新闻数据（模拟）
    newsData: {
      china: [
        {
          id: 1,
          title: '中国经济数据显示强劲增长势头，GDP增速超预期',
          source: '新华社',
          sourceLogo: '📰',
          time: '2小时前',
          category: '经济',
          views: 15234,
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop'
        },
        {
          id: 2,
          title: '科技创新助力中国制造业转型升级',
          source: '人民日报',
          sourceLogo: '📄',
          time: '4小时前',
          category: '科技',
          views: 8921,
          saved: true
        },
        {
          id: 3,
          title: '外交部发言人就国际热点问题答记者问',
          source: '央视新闻',
          sourceLogo: '📺',
          time: '6小时前',
          category: '政治',
          views: 23567
        }
      ],
      usa: [
        {
          id: 4,
          title: '美联储暗示维持当前利率政策不变',
          source: '华尔街日报',
          sourceLogo: '📈',
          time: '1小时前',
          category: '经济',
          views: 18234,
          image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop'
        },
        {
          id: 5,
          title: '科技巨头发布最新财报，业绩超预期',
          source: '路透社',
          sourceLogo: '🌍',
          time: '3小时前',
          category: '科技',
          views: 12456
        }
      ],
      uk: [
        {
          id: 6,
          title: '英国议会就脱欧后续协议展开激烈辩论',
          source: 'BBC',
          sourceLogo: '🇬🇧',
          time: '5小时前',
          category: '政治',
          views: 9876
        }
      ]
    },
    
    // 新闻分类
    categories: ['全部', '经济', '科技', '政治', '社会', '文化'],
    selectedCategory: '全部',
    
    // 弹窗状态
    showNewsModal: false,
    selectedCountry: null,
    filteredNews: [],
    
    // 统计数据
    todayUnreadCount: 0,
    countryCount: 0,
    sortedCountries: []
  },

  onLoad() {
    this.initializeData();
  },

  onShow() {
    this.refreshUnreadCounts();
  },

  // 初始化数据
  initializeData() {
    const countries = this.calculateUnreadCounts(this.data.countries);
    const sortedCountries = this.sortCountriesByUnread(countries);
    const todayUnreadCount = this.calculateTotalUnread(countries);
    
    this.setData({
      countries,
      sortedCountries,
      todayUnreadCount,
      countryCount: countries.length
    });
  },

  // 计算未读数量
  calculateUnreadCounts(countries) {
    return countries.map(country => ({
      ...country,
      unreadCount: Math.max(0, Math.floor(Math.random() * 20))
    }));
  },

  // 按未读数量排序
  sortCountriesByUnread(countries) {
    return [...countries].sort((a, b) => b.unreadCount - a.unreadCount);
  },

  // 计算总未读数
  calculateTotalUnread(countries) {
    return countries.reduce((sum, country) => sum + country.unreadCount, 0);
  },

  // 刷新未读数量
  refreshUnreadCounts() {
    const countries = this.calculateUnreadCounts(this.data.countries);
    const sortedCountries = this.sortCountriesByUnread(countries);
    const todayUnreadCount = this.calculateTotalUnread(countries);
    
    this.setData({
      countries,
      sortedCountries,
      todayUnreadCount
    });
  },

  // 点击国家
  onCountryTap(e) {
    const country = e.currentTarget.dataset.country;
    this.openNewsModal(country);
  },

  // 打开新闻弹窗
  openNewsModal(country) {
    const countryNews = this.data.newsData[country.id] || [];
    const filteredNews = this.filterNewsByCategory(countryNews, this.data.selectedCategory);
    
    this.setData({
      showNewsModal: true,
      selectedCountry: country,
      filteredNews
    });
  },

  // 关闭新闻弹窗
  closeNewsModal() {
    this.setData({
      showNewsModal: false,
      selectedCountry: null,
      filteredNews: [],
      selectedCategory: '全部'
    });
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止点击事件冒泡到遮罩层
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    const countryNews = this.data.newsData[this.data.selectedCountry?.id] || [];
    const filteredNews = this.filterNewsByCategory(countryNews, category);
    
    this.setData({
      selectedCategory: category,
      filteredNews
    });
  },

  // 按分类筛选新闻
  filterNewsByCategory(news, category) {
    if (category === '全部') {
      return news;
    }
    return news.filter(item => item.category === category);
  },

  // 打开新闻详情
  openNewsDetail(e) {
    const news = e.currentTarget.dataset.news;
    wx.showToast({
      title: `打开新闻: ${news.title.substring(0, 10)}...`,
      icon: 'none',
      duration: 2000
    });
    
    // 这里可以跳转到新闻详情页
    // wx.navigateTo({
    //   url: `/pages/news/detail?id=${news.id}`
    // });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshUnreadCounts();
    wx.stopPullDownRefresh();
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '世界参考消息 - 全球消息追踪',
      path: '/pages/map/map',
      imageUrl: '' // 可以设置分享图片
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '世界参考消息 - 全球消息追踪',
      imageUrl: '' // 可以设置分享图片
    };
  }
});