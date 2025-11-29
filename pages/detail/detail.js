const util = require('../../utils/util.js')

Page({
  data: {
    articleId: '',
    articleType: '',
    articleData: {},
    loading: true
  },

  onLoad(options) {
    const { id, type } = options
    this.setData({
      articleId: id,
      articleType: type
    })
    
    this.loadArticleDetail(id, type)
  },

  // 加载文章详情
  loadArticleDetail(id, type) {
    // 模拟数据加载
    setTimeout(() => {
      const mockData = {
        id: id,
        type: type,
        title: type === 'news' ? '全球经济形势分析与展望' : '2024年度经济展望专题',
        content: '这里是文章的详细内容。基于当前复杂的国际经济形势，各国政府和企业都在积极调整策略，应对挑战。专家分析认为，虽然面临诸多不确定性，但全球经济仍然保持增长态势...',
        source: '环球时报',
        author: '记者署名',
        publishTime: '2024-01-15 10:30',
        readCount: 15234,
        images: [
          '/images/detail1.jpg',
          '/images/detail2.jpg'
        ]
      }
      
      this.setData({
        articleData: mockData,
        loading: false
      })
      
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: mockData.title.length > 10 ? mockData.title.substring(0, 10) + '...' : mockData.title
      })
    }, 1000)
  },

  // 分享文章
  onShareAppMessage() {
    const { title } = this.data.articleData
    return {
      title: title,
      path: `/pages/detail/detail?id=${this.data.articleId}&type=${this.data.articleType}`
    }
  },

  // 收藏文章
  onCollectTap() {
    wx.showToast({
      title: '收藏功能开发中',
      icon: 'none'
    })
  },

  // 点赞文章
  onLikeTap() {
    wx.showToast({
      title: '点赞功能开发中',
      icon: 'none'
    })
  }
})