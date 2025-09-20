import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Target } from "lucide-react";
import { mockData } from "@/data/mockData";

export function EngagementSection() {
  const { leaderboard, achievements, progress } = mockData;

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Leaderboard */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Farmers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.slice(0, 3).map((farmer) => (
            <div key={farmer.rank} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-bold">
                {farmer.rank === 1 ? '🥇' : farmer.rank === 2 ? '🥈' : '🥉'}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {farmer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{farmer.name}</p>
                <p className="text-xs text-muted-foreground">{farmer.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{farmer.points}</p>
                <div className="flex gap-1">
                  {farmer.badges.slice(0, 3).map((badge, i) => (
                    <span key={i} className="text-xs">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-muted/50 border-border' 
                    : 'bg-muted/20 border-dashed border-muted-foreground/30'
                }`}
              >
                <div className="text-center">
                  <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </span>
                  <h4 className={`text-sm font-medium mt-1 ${
                    achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Snapshot */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.cropsMonitored}</p>
              <p className="text-xs text-muted-foreground">Crops Monitored</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.diagnosesCompleted}</p>
              <p className="text-xs text-muted-foreground">Diagnoses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.dealsCompleted}</p>
              <p className="text-xs text-muted-foreground">Deals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{progress.communityPosts}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Level Progress</span>
              <span className="font-medium">{progress.totalPoints}/3000</span>
            </div>
            <Progress value={(progress.totalPoints / 3000) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}