import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ImageUp, Tags, ListChecks, MoreHorizontal, Send } from 'lucide-react';

interface PostCreationProps {
  className?: string;
  userName?: string;
  userAvatarUrl?: string;
}

const PostCreation: React.FC<PostCreationProps> = ({
  className,
  userName = 'Olenna Mason',
  userAvatarUrl = 'https://via.placeholder.com/40?text=OM',
}) => {
  const [postText, setPostText] = React.useState<string>('');

  const handlePost = React.useCallback(() => {
    if (postText.trim()) {
      console.log('Posting:', postText);
      setPostText('');
    }
  }, [postText]);

  const actionButtons = [
    { name: 'Photo/Video', icon: ImageUp, color: 'text-green-500' },
    { name: 'Tag Friends', icon: Tags, color: 'text-blue-500' },
    { name: 'List', icon: ListChecks, color: 'text-red-500' },
  ];

  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={userAvatarUrl} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Input
              placeholder={`What's on your mind, ${userName.split(' ')[0]}?`}
              className="flex-1 h-12 rounded-full px-4 bg-gray-100 hover:bg-gray-200 focus:bg-white border-transparent focus:border-primary focus-visible:ring-primary"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePost();
                }
              }}
            />
          </div>
        </CardHeader>
        <Separator />
        <CardFooter className="p-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {actionButtons.map((action) => (
              <Tooltip key={action.name}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className={`hover:bg-gray-100 p-2 ${action.color}`}>
                    <action.icon className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">{action.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="hover:bg-gray-100 p-2 text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More options</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Button onClick={handlePost} disabled={!postText.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Send className="h-4 w-4 mr-2 sm:hidden" />
            <span className="hidden sm:inline">Post</span>
            <span className="sm:hidden">Post</span>
          </Button>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default PostCreation;
