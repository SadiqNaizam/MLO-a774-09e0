import React from 'react';

// Layout Components
import SidebarNav from '../../components/layout/SidebarNav';
import TopHeader from '../../components/layout/TopHeader';

// Dashboard Organism Components
import PostCreation from '../../components/Dashboard/PostCreation';
import NewsFeed from '../../components/Dashboard/NewsFeed';
import StoriesWidget from '../../components/Dashboard/StoriesWidget';
import SuggestedGroups from '../../components/Dashboard/SuggestedGroups';
import ChatWidget from '../../components/Dashboard/ChatWidget';

// Define UserData interface, as it's used by SidebarNav and TopHeader
interface UserData {
  name: string;
  avatarUrl: string;
  profileUrl?: string;
}

// Dummy user data, to be passed to components that need it
const dummyUser: UserData = {
  name: 'Olenna Mason',
  avatarUrl: 'https://via.placeholder.com/40?text=OM',
  profileUrl: '/profile/olenna', // Example profile URL
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      {/* Corresponds to layoutRequirements.sidebar */}
      {/* SidebarNav's internal cn utility handles its base fixed layout (w-56, fixed, top-0, left-0, h-screen, bg-sidebar). */}
      {/* We pass z-30 for explicit stacking context management. */}
      <SidebarNav 
        user={dummyUser} 
        activePath="/news-feed" // Example active path, typically this would come from a router context
        className="z-30"
      />

      {/* Top Header */}
      {/* Corresponds to layoutRequirements.header */}
      {/* TopHeader component applies its own fixed positioning and styling: */}
      {/* 'fixed top-0 left-56 right-72 z-10 h-[60px] bg-card border-b border-border ...' */}
      <TopHeader 
        user={dummyUser} 
        activeNav="home" // Example active nav item
      />

      {/* Main Content Area */}
      {/* Positioned to the right of SidebarNav (ml-56), left of RightSidebar (mr-72), and below TopHeader (mt-[60px]) */}
      {/* Height is calculated to fill remaining viewport height below the header. Overflow is handled for scrolling. */}
      <main 
        className="ml-56 mr-72 mt-[60px] h-[calc(100vh-60px)] overflow-y-auto"
      >
        {/* Inner container for padding (p-6) and content block layout (flex flex-col gap-6) */}
        {/* Conforms to layoutRequirements.mainContent.layout and layoutRequirements.mainContent.container */}
        <div className="p-6">
          <div className="flex flex-col gap-6">
            <PostCreation userName={dummyUser.name} userAvatarUrl={dummyUser.avatarUrl} />
            <NewsFeed />
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      {/* Corresponds to layoutRequirements.rightSidebar */}
      <aside 
        className="w-72 fixed right-0 top-[60px] h-[calc(100vh-60px)] bg-card border-l border-border z-20"
        // w-72: width of RightSidebar (from layoutRequirements.overall.sizing.rightSidebar)
        // fixed right-0 top-[60px]: position below TopHeader, on the right (from layoutRequirements.rightSidebar.layout)
        // h-[calc(100vh-60px)]: remaining viewport height below header
        // bg-card: background color (maps to PRD 'surface' via tailwind.config.ts)
        // border-l border-border: left border with themed color
        // z-20: stacking context, below SidebarNav (z-30) and potentially above TopHeader if TopHeader had a lower z-index (TopHeader is z-10 internally)
      >
        {/* Inner container for padding (p-4) and scrollable content layout (flex flex-col gap-4) */}
        {/* Conforms to layoutRequirements.rightSidebar.layout */}
        <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto">
          <StoriesWidget />
          <SuggestedGroups />
          {/* ChatWidget pushed to the bottom of this flex container using mt-auto */}
          <div className="mt-auto">
            <ChatWidget />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Index;
