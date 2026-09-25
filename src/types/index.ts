export type ThemeColor = 'violet' | 'emerald' | 'sapphire' | 'amber' | 'slate';
export type Language = 'fr' | 'en';

export interface TargetProfile {
  username: string;
  fullName: string;
  avatarUrl: string;
  isPrivate: boolean;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  bio: string;
  lastActive: string;
  riskScore: number;
  genderBreakdown: {
    girlsCount: number;
    guysCount: number;
    otherCount: number;
  };
  recentFollows: FollowEvent[];
  unfollows: UnfollowEvent[];
  secretAdmirers: SecretAdmirer[];
  peakHours: {
    hour: string;
    activityLevel: 'low' | 'medium' | 'high' | 'very_high';
    percentage: number;
  }[];
}

export interface FollowEvent {
  id: string;
  targetUsername: string;
  targetFullName: string;
  avatarUrl: string;
  gender: 'girl' | 'guy' | 'brand';
  timestamp: string;
  mutualsCount: number;
  isMutualFollow: boolean;
  blurAvatar?: boolean;
}

export interface UnfollowEvent {
  id: string;
  targetUsername: string;
  targetFullName: string;
  avatarUrl: string;
  timestamp: string;
}

export interface SecretAdmirer {
  id: string;
  username: string;
  avatarUrl: string;
  storyViewsCount: number;
  interactionType: string;
}

export interface ScanStep {
  id: number;
  labelFr: string;
  labelEn: string;
  status: 'pending' | 'active' | 'completed';
}
