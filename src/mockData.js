// Mock data for testing analytics
export const mockCreators = [
  {
    id: 1,
    name: "TechExplorer",
    url: "https://youtube.com/@techexplorer",
    description: "Educational technology reviews and tutorials covering latest gadgets, programming, AI, and software development tips for developers and tech enthusiasts.",
    imageURL: "https://picsum.photos/300/300?random=1",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "GameMaster Pro",
    url: "https://twitch.tv/gamemasterpro",
    description: "Professional gaming streams featuring competitive gameplay, strategy guides, and community events in popular games.",
    imageURL: "https://picsum.photos/300/300?random=2",
    created_at: "2024-01-20T14:30:00Z"
  },
  {
    id: 3,
    name: "CreativeStudio",
    url: "https://instagram.com/creativestudio",
    description: "Art and design inspiration, tutorials, and behind-the-scenes content showcasing digital art creation processes.",
    imageURL: "https://picsum.photos/300/300?random=3",
    created_at: "2024-02-01T09:15:00Z"
  },
  {
    id: 4,
    name: "FitnessGuru",
    url: "https://youtube.com/@fitnessguru",
    description: "Comprehensive fitness programs, nutrition advice, workout routines for all levels, and healthy lifestyle tips.",
    imageURL: "https://picsum.photos/300/300?random=4",
    created_at: "2024-02-10T16:45:00Z"
  },
  {
    id: 5,
    name: "CodeWizard",
    url: "https://github.com/codewizard",
    description: "Open source projects, coding tutorials, and software engineering best practices for modern development.",
    imageURL: "",
    created_at: "2024-02-15T11:20:00Z"
  },
  {
    id: 6,
    name: "MusicMaven",
    url: "https://spotify.com/artist/musicmaven",
    description: "Original music composition and production, covering various genres from electronic to acoustic performances.",
    imageURL: "https://picsum.photos/300/300?random=6",
    created_at: "2024-02-20T13:10:00Z"
  },
  {
    id: 7,
    name: "CookingChef",
    url: "https://tiktok.com/@cookingchef",
    description: "Quick cooking recipes, kitchen tips, and food presentation ideas for busy home cooks and food enthusiasts.",
    imageURL: "https://picsum.photos/300/300?random=7",
    created_at: "2024-02-25T08:30:00Z"
  },
  {
    id: 8,
    name: "TravelVlogger",
    url: "https://youtube.com/@travelvlogger",
    description: "Travel adventures, cultural experiences, destination guides, and photography tips from around the world.",
    imageURL: "https://picsum.photos/300/300?random=8",
    created_at: "2024-03-01T12:00:00Z"
  },
  {
    id: 9,
    name: "BusinessMentor",
    url: "https://linkedin.com/in/businessmentor",
    description: "Entrepreneurship advice, business strategy insights, and professional development content for aspiring business owners.",
    imageURL: "https://picsum.photos/300/300?random=9",
    created_at: "2024-03-05T15:45:00Z"
  },
  {
    id: 10,
    name: "PodcastHost",
    url: "https://soundcloud.com/podcasthost",
    description: "Weekly podcast covering current events, interviews with industry experts, and discussions on trending topics in technology and society.",
    imageURL: "",
    created_at: "2024-03-10T10:30:00Z"
  }
]

// Mock supabase client for testing
export const mockSupabase = {
  from: (table) => ({
    select: (fields = '*') => ({
      order: (field, options) => ({
        then: (callback) => callback({ data: mockCreators, error: null })
      }),
      eq: (field, value) => ({
        single: () => ({
          then: (callback) => {
            const creator = mockCreators.find(c => c[field] == value)
            callback({ data: creator, error: creator ? null : { message: 'Creator not found' } })
          }
        })
      })
    }),
    insert: (data) => ({
      select: () => ({
        then: (callback) => {
          const newCreator = { ...data[0], id: Date.now(), created_at: new Date().toISOString() }
          mockCreators.push(newCreator)
          callback({ data: [newCreator], error: null })
        }
      })
    }),
    update: (data) => ({
      eq: (field, value) => ({
        then: (callback) => {
          const index = mockCreators.findIndex(c => c[field] == value)
          if (index >= 0) {
            mockCreators[index] = { ...mockCreators[index], ...data }
            callback({ data: [mockCreators[index]], error: null })
          } else {
            callback({ data: null, error: { message: 'Creator not found' } })
          }
        }
      })
    }),
    delete: () => ({
      eq: (field, value) => ({
        then: (callback) => {
          const index = mockCreators.findIndex(c => c[field] == value)
          if (index >= 0) {
            mockCreators.splice(index, 1)
            callback({ data: null, error: null })
          } else {
            callback({ data: null, error: { message: 'Creator not found' } })
          }
        }
      })
    })
  })
}