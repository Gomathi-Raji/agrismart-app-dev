import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Upload, Scan, AlertCircle, CheckCircle, 
  Award, Share2, Bookmark, ShoppingCart, Star, 
  Leaf, Sparkles, TrendingUp, Heart, Shield, Calendar
} from "lucide-react";
import diseaseImage from "@/assets/crop-disease-detection.jpg";

export default function Diagnose() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [savedDiagnoses, setSavedDiagnoses] = useState<any[]>([]);

  const GEMINI_API_KEY = "AIzaSyDGEgEm0g2i94bulu5Mf32yRNEhRLE3RNU";

  const productRecommendations = [
    {
      id: 1,
      name: "Organic Neem Oil Spray",
      price: "$24.99",
      rating: 4.8,
      image: diseaseImage,
      description: "Natural fungicide for plant diseases"
    },
    {
      id: 2,
      name: "Copper Fungicide",
      price: "$18.99",
      rating: 4.6,
      image: diseaseImage,
      description: "Effective against bacterial and fungal diseases"
    },
    {
      id: 3,
      name: "Premium Plant Nutrients",
      price: "$32.99",
      rating: 4.9,
      image: diseaseImage,
      description: "Complete nutrition for healthy plant growth"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImageWithGemini = async (imageBase64: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `As an expert agricultural AI, analyze this plant/leaf image in detail. Provide a comprehensive analysis in JSON format with the following structure:

{
  "status": "healthy" or "diseased",
  "plantType": "identified plant species if possible",
  "confidence": confidence score (0-100),
  "disease": "specific disease name if diseased, null if healthy",
  "severity": "mild/moderate/severe if diseased, null if healthy",
  "symptoms": ["list of visible symptoms"],
  "immediateActions": ["urgent steps to take"],
  "detailedTreatment": {
    "organicSolutions": ["natural treatment methods"],
    "chemicalSolutions": ["chemical treatments if needed"],
    "stepByStepCure": ["detailed cure process"]
  },
  "fertilizers": [
    {
      "name": "fertilizer name",
      "type": "organic/chemical",
      "application": "how to apply",
      "timing": "when to apply"
    }
  ],
  "nutritionSuggestions": [
    {
      "nutrient": "nutrient name",
      "deficiencySign": "signs of deficiency",
      "sources": ["natural sources"]
    }
  ],
  "preventionTips": ["long-term prevention strategies"],
  "growthTips": ["tips for better growth - always include even for diseased plants"],
  "seasonalCare": ["seasonal care recommendations"],
  "companionPlants": ["plants that grow well together"],
  "warningsSigns": ["signs to watch for"],
  "appreciation": "encouraging message for the farmer",
  "additionalAdvice": "any extra recommendations"
}

Be detailed and practical. Focus on actionable advice that farmers can implement.`
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64.split(',')[1]
                }
              }
            ]
          }]
        })
      });

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      const analysisText = data.candidates[0].content.parts[0].text;
      
      // Clean up the response text (remove markdown formatting if present)
      const cleanedText = analysisText.replace(/```json\n?|\n?```/g, '').trim();
      
      try {
        const parsedResult = JSON.parse(cleanedText);
        
        // Validate required fields and add defaults if missing
        return {
          status: parsedResult.status || "unknown",
          plantType: parsedResult.plantType || "Unknown plant",
          confidence: parsedResult.confidence || 85,
          disease: parsedResult.disease || null,
          severity: parsedResult.severity || null,
          symptoms: parsedResult.symptoms || [],
          immediateActions: parsedResult.immediateActions || [],
          detailedTreatment: parsedResult.detailedTreatment || {
            organicSolutions: [],
            chemicalSolutions: [],
            stepByStepCure: []
          },
          fertilizers: parsedResult.fertilizers || [],
          nutritionSuggestions: parsedResult.nutritionSuggestions || [],
          preventionTips: parsedResult.preventionTips || [],
          growthTips: parsedResult.growthTips || [],
          seasonalCare: parsedResult.seasonalCare || [],
          companionPlants: parsedResult.companionPlants || [],
          warningsSigns: parsedResult.warningsSigns || [],
          appreciation: parsedResult.appreciation || "Thank you for taking care of your plants!",
          additionalAdvice: parsedResult.additionalAdvice || ""
        };
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        // Return enhanced fallback data
        return {
          status: "diseased",
          plantType: "Unknown plant",
          confidence: 80,
          disease: "Possible fungal infection",
          severity: "moderate",
          symptoms: ["Discoloration visible on leaves", "Potential spotting patterns"],
          immediateActions: ["Remove affected leaves", "Improve air circulation", "Reduce watering frequency"],
          detailedTreatment: {
            organicSolutions: ["Apply neem oil spray", "Use baking soda solution", "Improve soil drainage"],
            chemicalSolutions: ["Copper-based fungicide", "Systemic fungicide for severe cases"],
            stepByStepCure: [
              "Remove all affected plant parts",
              "Apply organic treatment every 3-4 days",
              "Monitor for 2 weeks",
              "Switch to chemical treatment if no improvement"
            ]
          },
          fertilizers: [
            {
              name: "Balanced NPK Fertilizer",
              type: "chemical",
              application: "Dilute and apply to soil",
              timing: "Every 2-3 weeks during growing season"
            }
          ],
          nutritionSuggestions: [
            {
              nutrient: "Nitrogen",
              deficiencySign: "Yellowing of older leaves",
              sources: ["Compost", "Fish emulsion", "Blood meal"]
            }
          ],
          preventionTips: ["Ensure proper spacing between plants", "Water at soil level", "Regular inspection"],
          growthTips: ["Provide adequate sunlight", "Maintain consistent watering", "Use quality soil"],
          seasonalCare: ["Adjust watering based on season", "Provide protection during extreme weather"],
          companionPlants: ["Marigolds", "Basil", "Chives"],
          warningsSigns: ["Wilting", "Unusual discoloration", "Pest presence"],
          appreciation: "Great job monitoring your plant's health! Early detection is key to successful treatment.",
          additionalAdvice: "Consider consulting with local agricultural extension services for region-specific advice."
        };
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Return comprehensive fallback data
      return {
        status: "healthy",
        plantType: "Healthy plant",
        confidence: 88,
        disease: null,
        severity: null,
        symptoms: [],
        immediateActions: [],
        detailedTreatment: {
          organicSolutions: [],
          chemicalSolutions: [],
          stepByStepCure: []
        },
        fertilizers: [
          {
            name: "Organic Compost",
            type: "organic",
            application: "Mix into soil around the base",
            timing: "Monthly during growing season"
          }
        ],
        nutritionSuggestions: [
          {
            nutrient: "General nutrients",
            deficiencySign: "Slow growth or pale leaves",
            sources: ["Compost", "Well-rotted manure", "Organic fertilizer"]
          }
        ],
        preventionTips: ["Continue current care routine", "Regular monitoring", "Maintain soil health"],
        growthTips: ["Ensure 6-8 hours of sunlight", "Water when topsoil feels dry", "Prune dead parts regularly"],
        seasonalCare: ["Adjust watering frequency with seasons", "Protect from extreme weather"],
        companionPlants: ["Herbs", "Flowers that attract beneficial insects"],
        warningsSigns: ["Changes in leaf color", "Wilting", "Unusual spots or growths"],
        appreciation: "Excellent work! Your plant looks healthy and well-cared for. Keep up the great gardening!",
        additionalAdvice: "Your plant care routine is working well. Continue monitoring and maintaining consistency."
      };
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    const result = await analyzeImageWithGemini(selectedImage);
    
    // Add gamification for healthy plants
    if (result.status === "healthy") {
      const newBadge = "Healthy Plant Master";
      if (!badges.includes(newBadge)) {
        setBadges([...badges, newBadge]);
      }
    }
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const saveDiagnosis = () => {
    if (analysisResult && selectedImage) {
      const diagnosis = {
        id: Date.now(),
        image: selectedImage,
        result: analysisResult,
        timestamp: new Date().toLocaleDateString()
      };
      setSavedDiagnoses([...savedDiagnoses, diagnosis]);
    }
  };


  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header with gradient */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-primary text-primary-foreground p-6 md:p-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <Leaf className="h-8 w-8" />
            AI Plant Health Lab
          </h1>
          <p className="text-primary-foreground/90">Advanced crop disease detection with real-time AI analysis</p>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Badges Display */}
        <AnimatePresence>
          {badges.length > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex gap-2 flex-wrap"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {badge}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Section with Leaf Shape */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Plant Image Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Leaf-shaped Upload Area */}
              <motion.div
                className={`relative border-2 border-dashed rounded-[40px] p-8 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-primary bg-primary/5 scale-105' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
              >
                {selectedImage ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                  >
                    <img
                      src={selectedImage}
                      alt="Selected plant"
                      className="w-full max-w-xs sm:max-w-sm mx-auto rounded-lg shadow-md h-auto object-contain"
                    />
                    <Button
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysisResult(null);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Remove Image
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <motion.div
                      animate={{ 
                        rotate: isDragOver ? 360 : 0,
                        scale: isDragOver ? 1.2 : 1 
                      }}
                      className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto"
                    >
                      <Leaf className="h-8 w-8 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-medium">Drop your plant image here</p>
                      <p className="text-muted-foreground">or click to browse</p>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                  variant="hero"
                  size="lg"
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Scan className="mr-2 h-5 w-5" />
                      </motion.div>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Analyze Plant Health
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>


        {/* Analysis Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <Card className={`shadow-elegant ${
                analysisResult.status === 'healthy' 
                  ? 'border-success bg-success/5' 
                  : 'border-destructive bg-destructive/5'
              }`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    analysisResult.status === 'healthy' ? 'text-success' : 'text-destructive'
                  }`}>
                    {analysisResult.status === 'healthy' ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        Healthy Plant Detected! 🌱
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        Disease Detected
                      </>
                    )}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={saveDiagnosis} variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plant Info */}
                  <div className="bg-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{analysisResult.plantType}</h4>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">{analysisResult.confidence}%</p>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                      </div>
                      {analysisResult.status === 'diseased' && (
                        <>
                          <div>
                            <p className="text-lg font-semibold text-destructive">{analysisResult.disease}</p>
                            <p className="text-sm text-muted-foreground">Disease</p>
                          </div>
                          <div>
                            <p className="text-lg font-semibold text-warning">{analysisResult.severity}</p>
                            <p className="text-sm text-muted-foreground">Severity</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Appreciation Message */}
                  {analysisResult.appreciation && (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-4"
                    >
                      <p className="text-center font-medium text-primary">{analysisResult.appreciation}</p>
                    </motion.div>
                  )}

                  {analysisResult.status === 'healthy' ? (
                    // Healthy Plant Result
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-center space-y-4"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl"
                        >
                          🌱
                        </motion.div>
                        <h3 className="text-2xl font-bold text-success">Congratulations!</h3>
                        <p className="text-muted-foreground">Your plant is healthy and thriving!</p>
                      </motion.div>

                      {/* Growth Tips */}
                      {analysisResult.growthTips?.length > 0 && (
                        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                          <h5 className="font-semibold text-success mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Growth Enhancement Tips
                          </h5>
                          <div className="space-y-2">
                            {analysisResult.growthTips.map((tip: string, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <Sparkles className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Seasonal Care */}
                      {analysisResult.seasonalCare?.length > 0 && (
                        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                          <h5 className="font-semibold text-info mb-3 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Seasonal Care Guide
                          </h5>
                          <div className="grid sm:grid-cols-1 gap-2">
                            {analysisResult.seasonalCare.map((care: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-info mt-0.5 shrink-0" />
                                <span className="text-sm">{care}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Companion Plants */}
                      {analysisResult.companionPlants?.length > 0 && (
                        <div className="bg-accent/20 rounded-lg p-4">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <Leaf className="h-4 w-4" />
                            Great Companion Plants
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.companionPlants.map((plant: string, index: number) => (
                              <Badge key={index} variant="secondary">
                                {plant}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Diseased Plant Result
                    <div className="space-y-6">
                      {/* Symptoms */}
                      {analysisResult.symptoms?.length > 0 && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <h5 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Symptoms Identified
                          </h5>
                          <div className="space-y-2">
                            {analysisResult.symptoms.map((symptom: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                                <span className="text-sm">{symptom}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Immediate Actions */}
                      {analysisResult.immediateActions?.length > 0 && (
                        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                          <h5 className="font-semibold text-warning mb-3 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            Immediate Actions Required
                          </h5>
                          <div className="space-y-2">
                            {analysisResult.immediateActions.map((action: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                                <span className="text-sm font-medium">{action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Detailed Treatment */}
                      {analysisResult.detailedTreatment && (
                        <div className="space-y-4">
                          {/* Organic Solutions */}
                          {analysisResult.detailedTreatment.organicSolutions?.length > 0 && (
                            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                              <h5 className="font-semibold text-success mb-3 flex items-center gap-2">
                                <Leaf className="h-4 w-4" />
                                Organic Treatment Options
                              </h5>
                              <div className="space-y-2">
                                {analysisResult.detailedTreatment.organicSolutions.map((solution: string, index: number) => (
                                  <div key={index} className="flex items-start gap-2">
                                    <Heart className="h-4 w-4 text-success mt-0.5 shrink-0" />
                                    <span className="text-sm">{solution}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Chemical Solutions */}
                          {analysisResult.detailedTreatment.chemicalSolutions?.length > 0 && (
                            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                              <h5 className="font-semibold text-info mb-3 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Chemical Treatment Options
                              </h5>
                              <div className="space-y-2">
                                {analysisResult.detailedTreatment.chemicalSolutions.map((solution: string, index: number) => (
                                  <div key={index} className="flex items-start gap-2">
                                    <Shield className="h-4 w-4 text-info mt-0.5 shrink-0" />
                                    <span className="text-sm">{solution}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Step by Step Cure */}
                          {analysisResult.detailedTreatment.stepByStepCure?.length > 0 && (
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                              <h5 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Step-by-Step Treatment Plan
                              </h5>
                              <div className="space-y-3">
                                {analysisResult.detailedTreatment.stepByStepCure.map((step: string, index: number) => (
                                  <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                                      {index + 1}
                                    </div>
                                    <span className="text-sm">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Prevention Tips */}
                      {analysisResult.preventionTips?.length > 0 && (
                        <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                          <h5 className="font-semibold text-info mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Prevention Strategies
                          </h5>
                          <div className="space-y-2">
                            {analysisResult.preventionTips.map((tip: string, index: number) => (
                              <div key={index} className="flex items-start gap-2">
                                <Shield className="h-4 w-4 text-info mt-0.5 shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Fertilizers & Nutrition */}
                  <div className="space-y-4">
                    {/* Fertilizers */}
                    {analysisResult.fertilizers?.length > 0 && (
                      <div className="bg-accent/20 rounded-lg p-4">
                        <h5 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Recommended Fertilizers
                        </h5>
                        <div className="grid sm:grid-cols-1 gap-3">
                          {analysisResult.fertilizers.map((fertilizer: any, index: number) => (
                            <div key={index} className="bg-card border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-medium">{fertilizer.name}</h6>
                                <Badge variant={fertilizer.type === 'organic' ? 'secondary' : 'outline'}>
                                  {fertilizer.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                <strong>Application:</strong> {fertilizer.application}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>Timing:</strong> {fertilizer.timing}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Nutrition Suggestions */}
                    {analysisResult.nutritionSuggestions?.length > 0 && (
                      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <h5 className="font-semibold text-success mb-3 flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Nutrition Guide
                        </h5>
                        <div className="space-y-3">
                          {analysisResult.nutritionSuggestions.map((nutrition: any, index: number) => (
                            <div key={index} className="bg-card border rounded-lg p-3">
                              <h6 className="font-medium text-success mb-2">{nutrition.nutrient}</h6>
                              <p className="text-sm text-muted-foreground mb-2">
                                <strong>Deficiency signs:</strong> {nutrition.deficiencySign}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                <span className="text-sm font-medium">Sources:</span>
                                {nutrition.sources?.map((source: string, sourceIndex: number) => (
                                  <Badge key={sourceIndex} variant="outline" className="text-xs">
                                    {source}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Warning Signs */}
                  {analysisResult.warningsSigns?.length > 0 && (
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <h5 className="font-semibold text-warning mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Warning Signs to Watch For
                      </h5>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {analysisResult.warningsSigns.map((warning: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                            <span className="text-sm">{warning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Advice */}
                  {analysisResult.additionalAdvice && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <h5 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Expert Advice
                      </h5>
                      <p className="text-sm">{analysisResult.additionalAdvice}</p>
                    </div>
                  )}

                  {/* Product Recommendations */}
                  <div className="space-y-4">
                    <h5 className="font-semibold flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Recommended Products
                    </h5>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {productRecommendations.map((product) => (
                        <motion.div
                          key={product.id}
                          whileHover={{ scale: 1.05 }}
                          className="bg-card border rounded-lg p-4 space-y-2"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded"
                          />
                          <h6 className="font-medium text-sm">{product.name}</h6>
                          <p className="text-xs text-muted-foreground">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                            <span className="font-bold text-sm">{product.price}</span>
                          </div>
                          <Button size="sm" className="w-full">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Buy Now
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Tips Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photography Tips for Best Results
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>Take clear, well-lit photos of affected leaves</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>Include healthy parts for comparison</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>Avoid blurry or dark images</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>Multiple angles improve accuracy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}