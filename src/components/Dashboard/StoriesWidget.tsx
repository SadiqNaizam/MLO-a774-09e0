import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PlusCircle, Archive, Settings, BookOpen } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  avatarUrl: string;
  storyImageUrl: string;
  isViewed?: boolean;
}

const dummyStories: Story[] = [
  { id: 's1', userName: 'Laura Croft', avatarUrl: 'https://via.placeholder.com/50?text=LC', storyImageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?Text=Story1', isViewed: false },
  { id: 's2', userName: 'James Bond', avatarUrl: 'https://via.placeholder.com/50?text=JB', storyImageUrl: 'https://via.placeholder.com/150/4682B4/FFFFFF?Text=Story2', isViewed: true },
  { id: 's3', userName: 'Alice Wonderland', avatarUrl: 'https://via.placeholder.com/50?text=AW', storyImageUrl: 'https://via.placeholder.com/150/32CD32/FFFFFF?Text=Story3', isViewed: false },
  { id: 's4', userName: 'Peter Pan', avatarUrl: 'https://via.placeholder.com/50?text=PP', storyImageUrl: 'https://via.placeholder.com/150/FFD700/000000?Text=Story4', isViewed: false },
  { id: 's5', userName: 'Clark Kent', avatarUrl: 'https://via.placeholder.com/50?text=CK', storyImageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?Text=Story5', isViewed: true },
];

interface StoriesWidgetProps {
  className?: string;
}

const StoriesWidget: React.FC<StoriesWidgetProps> = ({ className }) => {
  const [stories, setStories] = React.useState<Story[]>(dummyStories);

  const handleViewStory = (storyId: string) => {
    setStories(stories.map(s => s.id === storyId ? { ...s, isViewed: true } : s));
    console.log('Viewing story:', storyId);
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Stories</CardTitle>
          <div className="space-x-1">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary px-1">
              <Archive className="h-3.5 w-3.5 mr-1" /> Archive
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary px-1">
              <Settings className="h-3.5 w-3.5 mr-1" /> Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 p-3 mb-3 rounded-lg hover:bg-muted cursor-pointer">
          <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
            <PlusCircle className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm text-card-foreground">Add to Your Story</p>
            <p className="text-xs text-muted-foreground">Share a photo, video or write something</p>
          </div>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 pb-3">
            {stories.map((story) => (
              <div 
                key={story.id} 
                onClick={() => handleViewStory(story.id)}
                className="cursor-pointer group relative w-28 h-40 rounded-lg overflow-hidden shadow-sm flex-shrink-0"
              >
                <img src={story.storyImageUrl} alt={`${story.userName}'s story`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <Avatar className={`absolute top-2 left-2 border-2 ${story.isViewed ? 'border-muted-foreground/50' : 'border-primary'}`}>
                  <AvatarImage src={story.avatarUrl} alt={story.userName} />
                  <AvatarFallback>{story.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white truncate">
                  {story.userName}
                </p>
              </div>
            ))}
            <div className="flex-shrink-0 w-28 h-40 rounded-lg border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                <BookOpen className="h-8 w-8 mb-2"/>
                <p className="text-xs text-center">View All Stories</p>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
