import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Facebook,
  Search,
  Home,
  Users,
  MessageCircle,
  Bell,
  HelpCircle,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
  user: {
    name: string;
    avatarUrl: string;
    profileUrl?: string;
  };
  activeNav?: 'home' | 'friends' | 'watch' | 'groups' | 'gaming'; 
}

const TopHeader: React.FC<TopHeaderProps> = ({
  className,
  user = { name: 'Olenna Mason', avatarUrl: 'https://via.placeholder.com/40?text=OM', profileUrl: '/profile/olenna' },
  activeNav = 'home',
}) => {
  const navLinks = [
    { id: 'home' as const, label: 'Home', icon: Home, href: '/' },
    { id: 'friends' as const, label: 'Find Friends', icon: Users, href: '/friends' },
    // The image shows only Home and Find Friends prominently in the center top nav.
    // { id: 'watch' as const, label: 'Watch', icon: PlaySquare, href: '/watch' },
    // { id: 'groups' as const, label: 'Groups', icon: Users, href: '/groups' }, 
    // { id: 'gaming' as const, label: 'Gaming', icon: Gamepad2, href: '/gaming' },
  ];

  return (
    <TooltipProvider>
      <header
        className={cn(
          'fixed top-0 left-56 right-72 z-10 h-[60px] bg-card border-b border-border',
          'flex items-center justify-between px-4',
          className
        )}
      >
        {/* Left Section: Logo and Search */}
        <div className="flex items-center space-x-2">
          <a href="/" aria-label="Homepage">
            <Facebook className="h-10 w-10 text-primary" />
          </a>
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Facebook"
              className="pl-9 pr-3 h-9 w-full rounded-full bg-secondary border-transparent focus:bg-card focus:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="flex items-center space-x-1 h-full">
          {navLinks.map((link) => (
            <Tooltip key={link.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'h-full px-6 rounded-none text-sm font-medium flex items-center space-x-2 relative',
                    activeNav === link.id
                      ? 'text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                  asChild
                >
                  <a href={link.href}>
                    <link.icon className={cn('h-6 w-6', activeNav === link.id ? 'text-primary' : 'text-muted-foreground')} />
                    {/* For Facebook's style, icons are typically larger and text is hidden or shown on hover for center nav. For this clone, showing text. */}
                    {/* <span className="hidden md:inline">{link.label}</span> */}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-card text-card-foreground border border-border shadow-lg">
                 <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Right Section: User Actions */}
        <div className="flex items-center space-x-1.5">
          <Button variant="ghost" className="px-3 py-1.5 h-auto rounded-full hover:bg-muted text-sm font-semibold text-card-foreground">
            <Avatar className="h-6 w-6 mr-1.5">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {user.name.split(' ')[0]}
          </Button>

          {[ 
            { label: 'Messenger', icon: MessageCircle, badgeCount: 8, href: '/messages' },
            { label: 'Notifications', icon: Bell, badgeCount: 36, href: '/notifications' },
            { label: 'Help', icon: HelpCircle, href: '/help' },
          ].map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-secondary/50 hover:bg-muted text-card-foreground relative" asChild>
                  <a href={item.href}>
                    <item.icon className="h-5 w-5" />
                    {item.badgeCount && item.badgeCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 min-w-[1rem] p-0.5 text-xs flex items-center justify-center bg-destructive text-destructive-foreground">
                        {item.badgeCount > 99 ? '99+' : item.badgeCount}
                      </Badge>
                    )}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-card text-card-foreground border border-border shadow-lg">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 bg-secondary/50 hover:bg-muted text-card-foreground">
                            <ChevronDown className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent className="bg-card text-card-foreground border border-border shadow-lg">
                    <p>Account</p>
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-72 bg-card text-card-foreground border-border shadow-lg">
              <DropdownMenuLabel className="px-2 py-1.5">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-none text-card-foreground">{user.name}</p>
                        <a href={user.profileUrl} className="text-xs leading-none text-muted-foreground hover:underline">See your profile</a>
                    </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-sm p-2 cursor-pointer hover:bg-muted focus:bg-muted">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings & Privacy</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm p-2 cursor-pointer hover:bg-muted focus:bg-muted">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-sm p-2 cursor-pointer hover:bg-muted focus:bg-muted text-destructive focus:text-destructive focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default TopHeader;
