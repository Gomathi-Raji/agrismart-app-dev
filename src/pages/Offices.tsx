import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building, Phone, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NEARBY_OFFICES = [
  { name: 'AgriSmart Chennai Hub', distance: '1.2 km', type: 'Technology Center', contact: '+91 98765 43210', rating: 4.9 },
  { name: 'Poonamallee Agri Extension', distance: '2.8 km', type: 'Extension Services', contact: '+91 98765 43211', rating: 4.6 },
  { name: 'Guindy Agricultural Research', distance: '3.5 km', type: 'Research Institute', contact: '+91 98765 43212', rating: 4.8 },
  { name: 'Agricultural Extension Office', distance: '4.2 km', type: 'Government Office', contact: '+91 98765 43213', rating: 4.4 },
  { name: 'Kanchipuram Agri Office', distance: '6.1 km', type: 'District Office', contact: '+91 98765 43214', rating: 4.5 },
  { name: 'Sunguvarchatram Cooperative', distance: '7.3 km', type: 'Cooperative Society', contact: '+91 98765 43215', rating: 4.3 },
];

export default function Offices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🏢 Agricultural Offices</h1>
          <p className="text-gray-600">Connect with agricultural support centers and government offices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Offices</p>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                </div>
                <Building className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Within 10km</p>
                  <p className="text-3xl font-bold text-green-600">9</p>
                </div>
                <MapPin className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-yellow-600">4.6</p>
                </div>
                <TrendingUp className="h-12 w-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offices List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEARBY_OFFICES.map((office, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{office.name}</span>
                  <Badge variant="secondary">⭐ {office.rating}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{office.distance} away</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="text-sm">{office.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{office.contact}</span>
                  </div>
                  <div className="pt-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                      Contact Office
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}