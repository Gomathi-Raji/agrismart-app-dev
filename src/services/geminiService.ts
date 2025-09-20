const GEMINI_API_KEY = 'AIzaSyAKnSZsP9UMvH1LpJfWRy7MaO9kBeWZ1Ws';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface GeminiSuggestion {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  category: 'weather' | 'pest' | 'market' | 'irrigation' | 'fertilizer' | 'general';
}

export const generateAISuggestions = async (
  farmerProfile: {
    name: string;
    crops: string[];
    location: string;
    farmSize: string;
  },
  currentWeather: any,
  cropHealth: any[],
  marketPrices: any[]
): Promise<GeminiSuggestion[]> => {
  try {
    const prompt = `
You are an AI agricultural advisor for Smart Agriculture Platform. Generate 3-4 personalized farming suggestions for:

Farmer: ${farmerProfile.name}
Location: ${farmerProfile.location}
Crops: ${farmerProfile.crops.join(', ')}
Farm Size: ${farmerProfile.farmSize}

Current Context:
- Weather: ${currentWeather?.temperature}°C, ${currentWeather?.condition}
- Crop Health: ${cropHealth.map(c => `${c.crop}: ${c.health}% (${c.status})`).join(', ')}
- Market Prices: ${marketPrices.map(p => `${p.crop}: ₹${p.currentPrice} (${p.change > 0 ? '+' : ''}${p.change}%)`).join(', ')}

Provide practical, actionable suggestions in JSON format:
[
  {
    "title": "Brief suggestion title",
    "description": "Detailed explanation with specific actions",
    "priority": "high|medium|low",
    "actionable": true|false,
    "category": "weather|pest|market|irrigation|fertilizer|general"
  }
]

Focus on immediate actions the farmer can take today or this week. Be specific about quantities, timing, and methods when possible.
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const suggestions = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!suggestions) {
      throw new Error('No suggestions received from Gemini API');
    }

    // Parse JSON response
    const cleanJson = suggestions.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    
    // Fallback suggestions
    return [
      {
        title: "Monitor crop health",
        description: "Check your crops daily for any signs of pest or disease, especially during humid weather.",
        priority: "medium" as const,
        actionable: true,
        category: "general" as const
      },
      {
        title: "Optimize irrigation",
        description: "Adjust watering schedule based on current weather conditions to prevent over or under-watering.",
        priority: "high" as const,
        actionable: true,
        category: "irrigation" as const
      }
    ];
  }
};

export const generateSmartReminders = async (tasks: any[], weather: any, crops: string[]) => {
  try {
    const prompt = `
Generate 2-3 smart farming reminders based on:
Tasks: ${tasks.map(t => `${t.title} at ${t.time}`).join(', ')}
Weather: ${weather?.temperature}°C, ${weather?.condition}
Crops: ${crops.join(', ')}

Return JSON array of reminders:
[
  {
    "title": "Reminder title",
    "message": "Detailed message with timing",
    "priority": "high|medium|low",
    "time": "suggested time"
  }
]
`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 512,
        }
      })
    });

    const data = await response.json();
    const reminders = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleanJson = reminders?.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanJson || '[]');
  } catch (error) {
    console.error('Error generating smart reminders:', error);
    return [
      {
        title: "Morning Tasks",
        message: "Don't forget to complete your scheduled farming tasks",
        priority: "medium",
        time: "8:00 AM"
      }
    ];
  }
};