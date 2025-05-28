import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Users, ExternalLink } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: number;
  bannerUrl: string;
  avatarUrls: string[];
  category?: string;
}

const dummyGroups: Group[] = [
  {
    id: 'g1',
    name: 'Mad Men (MADdicts)',
    members: 6195,
    bannerUrl: 'https://via.placeholder.com/300x100?text=Mad+Men+Banner',
    avatarUrls: [
      'https://via.placeholder.com/30?text=U1',
      'https://via.placeholder.com/30?text=U2',
      'https://via.placeholder.com/30?text=U3',
      'https://via.placeholder.com/30?text=U4',
    ],
    category: 'TV Shows'
  },
  {
    id: 'g2',
    name: 'Dexter Morgan Fans',
    members: 6984,
    bannerUrl: 'https://via.placeholder.com/300x100?text=Dexter+Banner',
    avatarUrls: [
      'https://via.placeholder.com/30?text=U5',
      'https://via.placeholder.com/30?text=U6',
      'https://via.placeholder.com/30?text=U7',
    ],
    category: 'TV Shows'
  },
  {
    id: 'g3',
    name: 'React Developers Community',
    members: 12050,
    bannerUrl: 'https://via.placeholder.com/300x100/007bff/FFFFFF?Text=React+Devs',
    avatarUrls: [
      'https://via.placeholder.com/30?text=RD1',
      'https://via.placeholder.com/30?text=RD2',
      'https://via.placeholder.com/30?text=RD3',
      'https://via.placeholder.com/30?text=RD4',
      'https://via.placeholder.com/30?text=RD5',
    ],
    category: 'Technology'
  },
  {
    id: 'g4',
    name: 'Travel Enthusiasts Hub',
    members: 22700,
    bannerUrl: 'https://via.placeholder.com/300x100/28a745/FFFFFF?Text=Travel+Hub',
    avatarUrls: [
      'https://via.placeholder.com/30?text=T1',
      'https://via.placeholder.com/30?text=T2',
    ],
    category: 'Travel'
  }
];

interface SuggestedGroupsProps {
  className?: string;
}

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ className }) => {
  const [groups, setGroups] = React.useState<Group[]>(dummyGroups);

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
    // Potentially update UI to show 'Joined' or remove from suggestions
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Suggested Groups</CardTitle>
          <Button variant="link" className="text-sm text-primary p-0 h-auto">
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh_-_200px_-_var(--header-height)_-_var(--right-sidebar-padding)_-_var(--widget-header))] max-h-[400px]"> {/* Approximate height, adjust as needed */}
          <div className="space-y-4">
            {groups.map((group) => (
              <div key={group.id} className="overflow-hidden rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-24 bg-cover bg-center" style={{ backgroundImage: `url(${group.bannerUrl})` }}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-2 left-2 flex -space-x-2">
                    {group.avatarUrls.slice(0, 4).map((url, index) => (
                      <Avatar key={index} className="border-2 border-white h-7 w-7">
                        <AvatarImage src={url} />
                        <AvatarFallback>{group.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.avatarUrls.length > 4 && (
                        <div className="h-7 w-7 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs border-2 border-white">
                           +{group.avatarUrls.length - 4}
                        </div>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-card-foreground truncate group-hover:underline">{group.name}</h4>
                  <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members {group.category && `• ${group.category}`}</p>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" className="flex-1 bg-primary/10 text-primary hover:bg-primary/20" onClick={() => handleJoinGroup(group.id)}>
                      <Plus className="h-4 w-4 mr-1" /> Join
                    </Button>
                     <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-1" /> Visit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;
