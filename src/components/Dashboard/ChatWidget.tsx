import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { SquarePen, UsersRound, Settings2, Search, MessageSquare } from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const dummyChatUsers: ChatUser[] = [
  { id: 'u1', name: 'Alice Johnson', avatarUrl: 'https://via.placeholder.com/40?text=AJ', isOnline: true, lastMessage: 'Hey, are you free for a call?', lastMessageTime: '10m', unreadCount: 2 },
  { id: 'u2', name: 'Bob Williams', avatarUrl: 'https://via.placeholder.com/40?text=BW', isOnline: false, lastMessage: 'Sounds good!', lastMessageTime: '1h' },
  { id: 'u3', name: 'Charlie Brown', avatarUrl: 'https://via.placeholder.com/40?text=CB', isOnline: true, lastMessage: 'See you then.', lastMessageTime: '3h' },
  { id: 'u4', name: 'Diana Prince', avatarUrl: 'https://via.placeholder.com/40?text=DP', isOnline: true, lastMessage: 'Can you send me the file?', lastMessageTime: 'yesterday' },
  { id: 'u5', name: 'Edward Cullen', avatarUrl: 'https://via.placeholder.com/40?text=EC', isOnline: false, lastMessage: 'Okay, will do.', lastMessageTime: '2d' },
  { id: 'u6', name: 'Fiona Gallagher', avatarUrl: 'https://via.placeholder.com/40?text=FG', isOnline: true, lastMessage: 'Let me check.', lastMessageTime: '2d', unreadCount: 5 },
];

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [users, setUsers] = React.useState<ChatUser[]>(dummyChatUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <Card className={cn('w-full shadow-xl flex flex-col', className)}>
        <CardHeader className="p-3 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold">Chat</CardTitle>
            <div className="flex space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                    <SquarePen className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>New Message</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                    <UsersRound className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Create Group</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Chat Settings</p></TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="mt-2 relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search contacts..."
              className="pl-8 h-8 text-xs rounded-full bg-background focus-visible:ring-offset-0 focus-visible:ring-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <ScrollArea className="h-[calc(100vh_-_250px_-_var(--header-height)_-_var(--right-sidebar-padding)_-_var(--widget-header))]  max-h-[350px]"> {/* Approximate height */}
            <div className="divide-y divide-border">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer">
                  <Avatar className="relative">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{user.name}</p>
                    {user.lastMessage && <p className={cn("text-xs truncate", user.unreadCount ? "text-card-foreground font-semibold" : "text-muted-foreground")}>{user.lastMessage}</p>}
                  </div>
                  <div className="text-right flex flex-col items-end">
                    {user.lastMessageTime && <p className="text-xs text-muted-foreground mb-0.5">{user.lastMessageTime}</p>}
                    {user.unreadCount && user.unreadCount > 0 && 
                        <span className="px-1.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">{user.unreadCount}</span>
                    }
                  </div>
                </div>
              )) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No contacts found.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <Button variant="ghost" className="w-full rounded-t-none border-t text-sm text-primary p-3">
            <MessageSquare className="h-4 w-4 mr-2" /> Open Messenger
        </Button>
      </Card>
    </TooltipProvider>
  );
};

export default ChatWidget;
