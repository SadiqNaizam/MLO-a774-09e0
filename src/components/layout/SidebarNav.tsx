import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Newspaper,
  MessageCircle,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  List,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  BookMarked,
  Bookmark,
  CloudSun,
  Presentation,
  Droplets,
  Settings,
  Megaphone,
  FileText,
  CalendarPlus,
  Heart,
  UserPlus // For Create Group
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
  isExternal?: boolean;
}

interface SidebarNavProps {
  className?: string;
  user: {
    name: string;
    avatarUrl: string;
    profileUrl?: string;
  };
  activePath?: string;
}

const mainNavItems: NavItem[] = [
  { label: 'News Feed', icon: Newspaper, href: '/news-feed' },
  { label: 'Messenger', icon: MessageCircle, href: '/messenger' },
  { label: 'Watch', icon: PlaySquare, href: '/watch' },
  { label: 'Marketplace', icon: Store, href: '/marketplace' },
];

const shortcutsItems: NavItem[] = [
  { label: 'FarmVille 2', icon: Gamepad2, href: '/games/farmville2' },
  // Add more shortcuts here
];

const exploreItemsBase: NavItem[] = [
  { label: 'Events', icon: CalendarDays, href: '/events' },
  { label: 'Pages', icon: Flag, href: '/pages' },
  { label: 'Groups', icon: Users, href: '/groups' },
  { label: 'Friend Lists', icon: List, href: '/friends/lists' },
  { label: 'Fundraisers', icon: HeartHandshake, href: '/fundraisers' },
];

const exploreItemsExtra: NavItem[] = [
  { label: 'Memories', icon: BookMarked, href: '/memories' },
  { label: 'Saved', icon: Bookmark, href: '/saved' },
  { label: 'Weather', icon: CloudSun, href: '/weather' },
  { label: 'Ads Manager', icon: Presentation, href: '/ads/manager' },
  { label: 'Blood Donations', icon: Droplets, href: '/blood-donations' },
];

const createItems: NavItem[] = [
  { label: 'Ad', icon: Megaphone, href: '/create/ad' },
  { label: 'Page', icon: FileText, href: '/create/page' },
  { label: 'Group', icon: UserPlus, href: '/create/group' },
  { label: 'Event', icon: CalendarPlus, href: '/create/event' },
  { label: 'Fundraiser', icon: Heart, href: '/create/fundraiser' },
];

const SidebarNav: React.FC<SidebarNavProps> = ({
  className,
  user = { name: 'Olenna Mason', avatarUrl: 'https://via.placeholder.com/40?text=OM', profileUrl: '/profile/olenna' },
  activePath = '/news-feed',
}) => {
  const [isExploreExpanded, setIsExploreExpanded] = React.useState(false);

  const renderNavItem = (item: NavItem, key: string) => {
    const isActive = activePath === item.href;
    return (
      <li key={key}>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start h-9 px-3 text-sm font-medium rounded-md',
            isActive
              ? 'bg-sidebar-accent text-sidebar-primary'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary'
          )}
          asChild
        >
          <a href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noopener noreferrer' : undefined}>
            <item.icon className={cn('h-4 w-4 mr-3', isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/80')} />
            {item.label}
          </a>
        </Button>
      </li>
    );
  };

  return (
    <nav className={cn('w-56 bg-sidebar flex flex-col h-screen fixed top-0 left-0', className)}>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {/* User Profile */}
          <Button
            variant="ghost"
            className="w-full justify-start h-auto px-3 py-2 text-sm font-semibold rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
            asChild
          >
            <a href={user.profileUrl}>
              <Avatar className="h-7 w-7 mr-3">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {user.name}
            </a>
          </Button>

          {/* Main Navigation */}
          <ul className="space-y-1">
            {mainNavItems.map((item) => renderNavItem(item, item.label))}
          </ul>

          <Separator className="bg-sidebar-border my-3" />

          {/* Shortcuts */}
          <div>
            <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Shortcuts</h3>
            <ul className="space-y-1">
              {shortcutsItems.map((item) => renderNavItem(item, item.label))}
            </ul>
          </div>

          <Separator className="bg-sidebar-border my-3" />

          {/* Explore */}
          <Collapsible open={isExploreExpanded} onOpenChange={setIsExploreExpanded}>
            <div>
              <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Explore</h3>
              <ul className="space-y-1">
                {exploreItemsBase.map((item) => renderNavItem(item, item.label))}
              </ul>
              <CollapsibleContent asChild>
                <ul className="space-y-1 mt-1">
                  {exploreItemsExtra.map((item) => renderNavItem(item, item.label))}
                </ul>
              </CollapsibleContent>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-9 px-3 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary mt-1"
                >
                  {isExploreExpanded ? <ChevronUp className="h-4 w-4 mr-3" /> : <ChevronDown className="h-4 w-4 mr-3" />}
                  {isExploreExpanded ? 'See Less' : 'See More...'}
                </Button>
              </CollapsibleTrigger>
            </div>
          </Collapsible>

          <Separator className="bg-sidebar-border my-3" />

          {/* Create */}
          <div>
            <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">Create</h3>
            <ul className="space-y-1">
              {createItems.map((item) => renderNavItem(item, item.label))}
            </ul>
          </div>
          
          {/* Footer/Settings (Optional) */}
          <div className="pt-4 mt-auto">
             <Separator className="bg-sidebar-border mb-3" />
             <Button variant="ghost" className="w-full justify-start h-9 px-3 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary">
                <Settings className="h-4 w-4 mr-3 text-sidebar-foreground/80" />
                Settings
             </Button>
          </div>

        </div>
      </ScrollArea>
    </nav>
  );
};

export default SidebarNav;
