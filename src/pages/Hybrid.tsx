import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Leaf, Upload, Sparkles } from 'lucide-react';
import plumcotImage from '@/assets/plumcot.png';

export default function Hybrid() {
  const [plantA, setPlantA] = useState<File | null>(null);
  const [plantB, setPlantB] = useState<File | null>(null);
  const [previewA, setPreviewA] = useState<string>('');
  const [previewB, setPreviewB] = useState<string>('');
  const [method, setMethod] = useState<string>('cross');
  const [showResult, setShowResult] = useState(false);
  const [hybridImage, setHybridImage] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'A' | 'B') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'A') {
          setPlantA(file);
          setPreviewA(result);
        } else {
          setPlantB(file);
          setPreviewB(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHybrid = () => {
    if (!plantA || !plantB) {
      alert('Please upload both plant images first!');
      return;
    }

    // Simulate hybrid generation - for demo purposes, always show plumcot
    // In a real implementation, this would analyze the uploaded images 
    // and generate actual hybrids using AI
    setTimeout(() => {
      setHybridImage(plumcotImage);
      setShowResult(true);
    }, 1500); // Add delay to simulate processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Hybrid Plant Breeding</h1>
          </div>
          <p className="text-emerald-100 text-lg">Upload two plants and create a new hybrid variety!</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Your Plant Hybrid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Upload Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Plant A Upload */}
              <div className="space-y-4">
                <Label htmlFor="plantA" className="text-lg font-semibold">Plant A</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Input
                    id="plantA"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'A')}
                    className="hidden"
                  />
                  <Label htmlFor="plantA" className="cursor-pointer">
                    {previewA ? (
                      <img
                        src={previewA}
                        alt="Plant A Preview"
                        className="max-h-40 mx-auto rounded-lg object-contain"
                      />
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-primary font-medium">Upload Plant A Image</p>
                        <p className="text-sm text-muted-foreground">Click to browse files</p>
                      </div>
                    )}
                  </Label>
                </div>
              </div>

              {/* Plant B Upload */}
              <div className="space-y-4">
                <Label htmlFor="plantB" className="text-lg font-semibold">Plant B</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Input
                    id="plantB"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'B')}
                    className="hidden"
                  />
                  <Label htmlFor="plantB" className="cursor-pointer">
                    {previewB ? (
                      <img
                        src={previewB}
                        alt="Plant B Preview"
                        className="max-h-40 mx-auto rounded-lg object-contain"
                      />
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="text-primary font-medium">Upload Plant B Image</p>
                        <p className="text-sm text-muted-foreground">Click to browse files</p>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </div>

            {/* Hybridization Method */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Select Hybridization Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="max-w-sm mx-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cross">Cross-Breed</SelectItem>
                  <SelectItem value="morph">Morphological Mix</SelectItem>
                  <SelectItem value="fusion">Genetic Fusion (AI Simulated)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <Button 
                onClick={generateHybrid}
                size="lg"
                className="px-8 py-3 text-lg"
                disabled={!plantA || !plantB}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Hybrid Plant
              </Button>
              {!plantA || !plantB && (
                <p className="text-sm text-muted-foreground mt-2">
                  Upload both plant images to generate hybrid
                </p>
              )}
            </div>

            {/* Result Section */}
            {showResult && (
              <div className="space-y-6 text-center border-t pt-8">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">Hybrid Result</h3>
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                
                <div className="max-w-md mx-auto">
                  <img
                    src={hybridImage}
                    alt="Generated Plumcot - Hybrid of Plum and Apricot"
                    className="w-full rounded-lg shadow-lg border-2 border-primary/20"
                  />
                </div>
                
                <div className="space-y-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-primary">Plumcot Created!</h4>
                  <p className="text-lg font-semibold">🍑 Plum + 🍑 Apricot = 🍃 Plumcot</p>
                  <p className="text-muted-foreground">
                    Method: {method === 'cross' ? 'Cross-Breeding' : method === 'morph' ? 'Morphological Mix' : 'Genetic Fusion (AI Simulated)'}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    This hybrid combines the sweetness of apricots with the rich flavor and texture of plums, 
                    creating a unique fruit with the best characteristics of both parent plants.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}