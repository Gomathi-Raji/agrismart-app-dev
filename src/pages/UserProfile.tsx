import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { SettingsModal } from "@/components/SettingsModal";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  TrendingUp,
  Camera,
  ShoppingCart,
  Bell,
  Settings,
  Leaf,
  Star,
  Edit,
  Trash2
} from "lucide-react";

export default function UserProfile() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const [farmerData, setFarmerData] = useState({
    name: "Rajesh Kumar",
    location: "Village Rampur, Punjab",
    phone: "+91 98765 43210",
    email: "rajesh.farmer@gmail.com",
    joinDate: "March 2023",
    farmSize: "15 acres",
    crops: ["Wheat", "Rice", "Sugarcane"],
    experience: "12 years",
  });

  // CRUD for crops
  const [newCrop, setNewCrop] = useState("");
  const [editCropIdx, setEditCropIdx] = useState<number|null>(null);
  const [editCropName, setEditCropName] = useState("");

  const handleAddCrop = () => {
    if (newCrop.trim()) {
      setFarmerData({ ...farmerData, crops: [...farmerData.crops, newCrop.trim()] });
      setNewCrop("");
    }
  };
  const handleEditCrop = (idx: number) => {
    setEditCropIdx(idx);
    setEditCropName(farmerData.crops[idx]);
  };
  const handleUpdateCrop = () => {
    if (editCropIdx !== null && editCropName.trim()) {
      const updatedCrops = [...farmerData.crops];
      updatedCrops[editCropIdx] = editCropName.trim();
      setFarmerData({ ...farmerData, crops: updatedCrops });
      setEditCropIdx(null);
      setEditCropName("");
    }
  };
  const handleDeleteCrop = (idx: number) => {
    setFarmerData({ ...farmerData, crops: farmerData.crops.filter((_, i) => i !== idx) });
  };

  // CRUD for activities
  const [activities, setActivities] = useState([
    {
      type: "diagnosis",
      title: "Wheat Disease Detected",
      description: "Leaf rust identified - Treatment applied",
      date: "2 days ago",
      status: "resolved",
    },
    {
      type: "market",
      title: "Sold Rice Crop",
      description: "5 quintal sold at ₹3,200/quintal",
      date: "1 week ago",
      status: "completed",
    },
    {
      type: "purchase",
      title: "Fertilizer Purchase",
      description: "NPK 50kg bag ordered",
      date: "2 weeks ago",
      status: "delivered",
    },
  ]);
  const [activityForm, setActivityForm] = useState({
    type: "diagnosis",
    title: "",
    description: "",
    date: "",
    status: "pending"
  });
  const [editActivityIdx, setEditActivityIdx] = useState<number|null>(null);

  const handleAddActivity = () => {
    if (activityForm.title && activityForm.description) {
      setActivities([...activities, { ...activityForm }]);
      setActivityForm({ type: "diagnosis", title: "", description: "", date: "", status: "pending" });
    }
  };
  const handleEditActivity = (idx: number) => {
    setEditActivityIdx(idx);
    setActivityForm({ ...activities[idx] });
  };
  const handleUpdateActivity = () => {
    if (editActivityIdx !== null) {
      const updated = [...activities];
      updated[editActivityIdx] = { ...activityForm };
      setActivities(updated);
      setEditActivityIdx(null);
      setActivityForm({ type: "diagnosis", title: "", description: "", date: "", status: "pending" });
    }
  };
  const handleDeleteActivity = (idx: number) => {
    setActivities(activities.filter((_, i) => i !== idx));
  };

  // ...existing code...

  const stats = [
    { label: "Diagnoses", value: "23", icon: Camera },
    { label: "Trades", value: "8", icon: ShoppingCart },
    { label: "Savings", value: "₹45K", icon: TrendingUp },
    { label: "Rating", value: "4.8", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-primary-foreground/90">Your farming journey and achievements</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Profile Header Card */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {farmerData.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{farmerData.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{farmerData.location}</span>
                  </div>
                  <Badge className="mt-2 bg-success text-success-foreground">
                    Verified Farmer
                  </Badge>
            Trash2
                </div>
              </div>

              {/* Quick Profile Actions */}
              <div className="flex-1 md:text-right space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full md:w-auto"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <div className="flex md:justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{farmerData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{farmerData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Member since {farmerData.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" />
                <span>{farmerData.farmSize} farm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Metrics */}
        <DashboardMetrics userType="farmer" />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Data */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart */}
            <RevenueChart userType="farmer" />

            {/* Farm Details Card */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Farm Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Farm Size</h4>
                    <p className="text-2xl font-bold text-primary">{farmerData.farmSize}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <p className="text-2xl font-bold text-primary">{farmerData.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Main Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {farmerData.crops.map((crop, idx) => (
                        <span key={crop} className="flex items-center gap-1">
                          {editCropIdx === idx ? (
                            <>
                              <input value={editCropName} onChange={e => setEditCropName(e.target.value)} className="border rounded px-2 py-1 text-sm" />
                              <Button size="sm" variant="outline" onClick={handleUpdateCrop}>Save</Button>
                              <Button size="sm" variant="ghost" onClick={() => { setEditCropIdx(null); setEditCropName(""); }}>Cancel</Button>
                            </>
                          ) : (
                            <>
                              <Badge variant="secondary">{crop}</Badge>
                              <Button size="sm" variant="ghost" onClick={() => handleEditCrop(idx)}><Edit className="h-3 w-3" /></Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDeleteCrop(idx)}><Trash2 className="h-3 w-3" /></Button>
                            </>
                          )}
                        </span>
                      ))}
                      <input value={newCrop} onChange={e => setNewCrop(e.target.value)} placeholder="Add crop" className="border rounded px-2 py-1 text-sm" />
                      <Button size="sm" variant="hero" onClick={handleAddCrop}>Add</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <QuickActions userType="farmer" />

            {/* Activities CRUD */}
            <Card className="shadow-elegant mt-8">
              <CardHeader>
                <CardTitle>Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="border rounded p-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditActivity(idx)}><Edit className="h-3 w-3" />Edit</Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteActivity(idx)}><Trash2 className="h-3 w-3" />Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <h4 className="font-semibold">{editActivityIdx !== null ? "Edit Activity" : "Add Activity"}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="title" value={activityForm.title} onChange={e => setActivityForm({ ...activityForm, title: e.target.value })} placeholder="Title" className="border rounded px-2 py-1" />
                    <input name="description" value={activityForm.description} onChange={e => setActivityForm({ ...activityForm, description: e.target.value })} placeholder="Description" className="border rounded px-2 py-1" />
                    <input name="date" value={activityForm.date} onChange={e => setActivityForm({ ...activityForm, date: e.target.value })} placeholder="Date" className="border rounded px-2 py-1" />
                    <select name="type" value={activityForm.type} onChange={e => setActivityForm({ ...activityForm, type: e.target.value })} className="border rounded px-2 py-1">
                      <option value="diagnosis">Diagnosis</option>
                      <option value="market">Market</option>
                      <option value="purchase">Purchase</option>
                    </select>
                    <select name="status" value={activityForm.status} onChange={e => setActivityForm({ ...activityForm, status: e.target.value })} className="border rounded px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="resolved">Resolved</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {editActivityIdx !== null ? (
                      <Button size="sm" variant="hero" onClick={handleUpdateActivity}>Update</Button>
                    ) : (
                      <Button size="sm" variant="hero" onClick={handleAddActivity}>Add</Button>
                    )}
                    {editActivityIdx !== null && (
                      <Button size="sm" variant="ghost" onClick={() => { setEditActivityIdx(null); setActivityForm({ type: "diagnosis", title: "", description: "", date: "", status: "pending" }); }}>Cancel</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Activity Feed */}
            <ActivityFeed userType="farmer" limit={6} />

            {/* Notification Center */}
            <NotificationCenter userType="farmer" />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}