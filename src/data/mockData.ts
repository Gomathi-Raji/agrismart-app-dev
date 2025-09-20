export const mockData = {
  farmer: {
    name: "Rajesh Kumar",
    location: "Punjab, India",
    coordinates: [30.7333, 76.7794],
    crops: ["rice", "tomato", "wheat"],
    farmSize: "2.5 acres",
    experience: "8 years"
  },

  tasks: [
    {
      id: 1,
      title: "Water rice fields",
      time: "8:00 AM",
      priority: "high",
      type: "irrigation",
      crop: "rice"
    },
    {
      id: 2,
      title: "Check tomato plants for pests",
      time: "10:30 AM",
      priority: "medium",
      type: "monitoring",
      crop: "tomato"
    },
    {
      id: 3,
      title: "Apply fertilizer to wheat",
      time: "4:00 PM",
      priority: "low",
      type: "fertilizing",
      crop: "wheat"
    }
  ],

  cropHealth: [
    {
      crop: "rice",
      health: 85,
      status: "Good",
      lastCheck: "2 hours ago",
      issues: []
    },
    {
      crop: "tomato",
      health: 72,
      status: "Fair",
      lastCheck: "1 day ago",
      issues: ["Leaf curl detected"]
    },
    {
      crop: "wheat",
      health: 90,
      status: "Excellent",
      lastCheck: "3 hours ago",
      issues: []
    }
  ],

  marketPrices: [
    {
      crop: "rice",
      currentPrice: 2100,
      previousPrice: 2050,
      change: 2.4,
      unit: "per quintal",
      market: "Ludhiana Mandi"
    },
    {
      crop: "tomato",
      currentPrice: 45,
      previousPrice: 52,
      change: -13.5,
      unit: "per kg",
      market: "Chandigarh Market"
    },
    {
      crop: "wheat",
      currentPrice: 2250,
      previousPrice: 2200,
      change: 2.3,
      unit: "per quintal",
      market: "Amritsar Mandi"
    }
  ],

  alerts: [
    {
      id: 1,
      type: "pest",
      severity: "high",
      title: "Brown Plant Hopper outbreak",
      description: "Detected in nearby rice fields. Take preventive measures.",
      location: "5km radius",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "weather",
      severity: "medium",
      title: "Heavy rainfall expected",
      description: "Rainfall of 50-70mm expected in next 24 hours.",
      location: "Your area",
      timestamp: "6 hours ago"
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Tomato prices falling",
      description: "Prices dropped by 15% in local market. Consider holding stock.",
      location: "Chandigarh Market",
      timestamp: "1 day ago"
    }
  ],

  leaderboard: [
    {
      rank: 1,
      name: "Priya Sharma",
      points: 2850,
      badges: ["🏆", "🌱", "💡"],
      location: "Haryana"
    },
    {
      rank: 2,
      name: "Rajesh Kumar",
      points: 2650,
      badges: ["🥈", "🌾", "📚"],
      location: "Punjab"
    },
    {
      rank: 3,
      name: "Amit Singh",
      points: 2400,
      badges: ["🥉", "🌿", "🤝"],
      location: "UP"
    }
  ],

  achievements: [
    { name: "Green Thumb", icon: "🌱", description: "Successfully grew 5 crops", unlocked: true },
    { name: "Community Star", icon: "⭐", description: "Helped 50+ farmers", unlocked: true },
    { name: "Tech Savvy", icon: "💡", description: "Used AI diagnosis 100 times", unlocked: false },
    { name: "Market Expert", icon: "📈", description: "Made 20 profitable trades", unlocked: true }
  ],

  progress: {
    cropsMonitored: 12,
    diagnosesCompleted: 87,
    dealsCompleted: 23,
    communityPosts: 45,
    totalPoints: 2650
  },

  knowledge: [
    {
      type: "video",
      title: "Organic Pest Control for Tomatoes",
      duration: "5:30",
      thumbnail: "/assets/organic-farming-article.jpg",
      url: "#"
    },
    {
      type: "article",
      title: "Smart Irrigation Techniques",
      readTime: "3 min",
      thumbnail: "/assets/smart-irrigation-article.jpg",
      url: "#"
    },
    {
      type: "scheme",
      title: "PM-KISAN Subsidy Update",
      amount: "₹6,000",
      deadline: "Dec 31, 2024"
    }
  ],

  farmPlots: [
    {
      id: 1,
      name: "North Field",
      crop: "rice",
      coordinates: [30.7340, 76.7800],
      area: "1.2 acres",
      health: 85,
      lastDiagnosis: "2 days ago",
      issues: []
    },
    {
      id: 2,
      name: "South Field",
      crop: "tomato",
      coordinates: [30.7320, 76.7785],
      area: "0.8 acres",
      health: 72,
      lastDiagnosis: "1 day ago",
      issues: ["Leaf curl detected"]
    },
    {
      id: 3,
      name: "West Field",
      crop: "wheat",
      coordinates: [30.7350, 76.7790],
      area: "0.5 acres",
      health: 90,
      lastDiagnosis: "3 hours ago",
      issues: []
    }
  ],

  nearbyMarkets: [
    {
      id: 1,
      name: "Ludhiana Mandi",
      coordinates: [30.9010, 75.8573],
      distance: "25 km",
      prices: {
        rice: 2100,
        wheat: 2250,
        tomato: 45
      }
    },
    {
      id: 2,
      name: "Chandigarh Market",
      coordinates: [30.7333, 76.7794],
      distance: "15 km",
      prices: {
        rice: 2080,
        wheat: 2200,
        tomato: 42
      }
    }
  ],

  diseaseOutbreaks: [
    {
      id: 1,
      name: "Brown Plant Hopper",
      crop: "rice",
      coordinates: [30.7400, 76.7850],
      radius: 5,
      severity: "high",
      affectedFarms: 12
    },
    {
      id: 2,
      name: "Leaf Curl Virus",
      crop: "tomato",
      coordinates: [30.7280, 76.7750],
      radius: 3,
      severity: "medium",
      affectedFarms: 7
    }
  ]
};