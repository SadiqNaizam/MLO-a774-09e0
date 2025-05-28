import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, MapPin, Users, Edit, Trash2 } from 'lucide-react';

interface PostAuthor {
  name: string;
  avatarUrl: string;
  profileUrl?: string;
}

interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

interface PostData {
  id: string;
  author: PostAuthor;
  timestamp: string;
  content?: string;
  imageUrl?: string;
  mapLocation?: string;
  mapImageUrl?: string;
  stats: PostStats;
  taggedFriends?: PostAuthor[];
}

const dummyPostsData: PostData[] = [
  {
    id: '1',
    author: {
      name: 'Julia Fillory',
      avatarUrl: 'https://via.placeholder.com/40?text=JF',
    },
    timestamp: '2 hrs ago',
    content: 'Checking out some new stores downtown! It was an amazing experience, found some great deals. Highly recommend visiting the new city center mall.',
    mapLocation: 'Raleigh, North Carolina',
    mapImageUrl: 'https://via.placeholder.com/600x300?text=Map+of+Raleigh',
    stats: { likes: 125, comments: 18, shares: 7 },
    taggedFriends: [
      { name: 'Bryan Durand', avatarUrl: 'https://via.placeholder.com/30?text=BD' },
      { name: 'Anna Lee', avatarUrl: 'https://via.placeholder.com/30?text=AL' },
    ],
  },
  {
    id: '2',
    author: {
      name: 'Alex Thompson',
      avatarUrl: 'https://via.placeholder.com/40?text=AT',
    },
    timestamp: '5 hrs ago',
    content: 'Just had a wonderful picnic at Green Valley Park. The weather was perfect! ☀️ #picnic #nature',
    imageUrl: 'https://via.placeholder.com/600x400?text=Picnic+Photo',
    stats: { likes: 230, comments: 45, shares: 12 },
  },
  {
    id: '3',
    author: {
      name: 'Tech Weekly',
      avatarUrl: 'https://via.placeholder.com/40?text=TW',
    },
    timestamp: '1 day ago',
    content: 'Explore the future of AI in our latest article. We dive deep into new models and their potential impact on society. Link in bio! #AI #FutureTech',
    stats: { likes: 88, comments: 12, shares: 20 },
  },
];

interface NewsFeedProps {
  className?: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ className }) => {
  const [posts, setPosts] = React.useState<PostData[]>(dummyPostsData);

  const handleLike = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } } : p));
  };

  return (
    <div className={cn('space-y-6', className)}>
      {posts.map((post) => (
        <Card key={post.id} className="w-full overflow-hidden">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-semibold text-card-foreground">
                    {post.author.name}
                    {post.taggedFriends && post.taggedFriends.length > 0 && (
                        <span className="font-normal text-muted-foreground"> is with {" "}
                            {post.taggedFriends.map((friend, idx) => (
                                <a key={friend.name} href="#" className="font-semibold text-card-foreground hover:underline">
                                    {friend.name}{idx < post.taggedFriends!.length - 1 ? ', ' : ''}
                                </a>
                            ))}
                            {post.taggedFriends.length > 2 && ` and ${post.taggedFriends.length -1} others`}
                        </span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {post.timestamp}
                    {post.mapLocation && <span className='mx-1'>• <MapPin className="inline h-3 w-3 mr-1" />{post.mapLocation}</span>}
                  </CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Users className="mr-2 h-4 w-4" /> View Connections</DropdownMenuItem>
                  <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Post</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete Post</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {post.content && <p className="text-sm text-card-foreground mb-3 whitespace-pre-wrap">{post.content}</p>}
            {post.imageUrl && (
              <div className="aspect-video rounded-md overflow-hidden border bg-muted">
                <img src={post.imageUrl} alt="Post image" className="w-full h-full object-cover" />
              </div>
            )}
            {post.mapImageUrl && (
              <div className="aspect-[16/7] rounded-md overflow-hidden border bg-muted">
                <img src={post.mapImageUrl} alt={`Map of ${post.mapLocation}`} className="w-full h-full object-cover" />
              </div>
            )}
          </CardContent>
          <Separator />
          <CardFooter className="p-2 sm:p-3">
            <div className="flex w-full justify-around">
              <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary" onClick={() => handleLike(post.id)}>
                <ThumbsUp className="h-5 w-5 mr-2" /> {post.stats.likes} Likes
              </Button>
              <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary">
                <MessageCircle className="h-5 w-5 mr-2" /> {post.stats.comments} Comments
              </Button>
              <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary">
                <Share2 className="h-5 w-5 mr-2" /> {post.stats.shares} Shares
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NewsFeed;
