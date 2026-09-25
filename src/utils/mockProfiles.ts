import { TargetProfile, FollowEvent } from '../types';

// Curated high quality avatars for realistic mock profiles
const femaleAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=160&q=80'
];

const maleAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80'
];

const girlNames = [
  { user: 'lea_bess', name: 'Léa Besson' },
  { user: 'clara.mrtn', name: 'Clara Martin' },
  { user: 'chloe_v', name: 'Chloé Valette' },
  { user: 'camille.d', name: 'Camille Dubois' },
  { user: 'sarah.k', name: 'Sarah Klein' },
  { user: 'manon_g', name: 'Manon Garnier' },
  { user: 'emma_fitness', name: 'Emma Laurent' },
  { user: 'ines_officiel', name: 'Inès Benali' },
  { user: 'julie_paris', name: 'Julie Renard' },
];

const guyNames = [
  { user: 'maxime_d', name: 'Maxime Durand' },
  { user: 'alexandre_p', name: 'Alexandre Petit' },
  { user: 'thomas_b', name: 'Thomas Bernard' },
  { user: 'lucas_m', name: 'Lucas Moreau' },
  { user: 'antoine.l', name: 'Antoine Leroy' },
  { user: 'nicolas_r', name: 'Nicolas Roux' },
  { user: 'kevin_fit', name: 'Kevin Simon' },
  { user: 'hugo_dzn', name: 'Hugo Michel' },
  { user: 'adrien_bl', name: 'Adrien Blanc' },
  { user: 'julien_k', name: 'Julien Lambert' },
  { user: 'romain_art', name: 'Romain Faure' },
  { user: 'florian_92', name: 'Florian Girard' },
  { user: 'clement_tr', name: 'Clément Dupuis' },
  { user: 'baptiste.v', name: 'Baptiste Roy' },
  { user: 'enzo_m', name: 'Enzo Guerin' },
  { user: 'mathieu_c', name: 'Mathieu Chen' },
  { user: 'quentin_b', name: 'Quentin Boyer' },
];

function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateMockProfile(rawUsername: string, language: 'en' | 'fr' = 'en'): TargetProfile {
  const cleanUsername = rawUsername.trim().replace(/^@/, '') || (language === 'en' ? 'target_user' : 'ton_mec');
  const hash = stringHash(cleanUsername);

  // Dynamic counts influenced by hash
  const girlsCount = 3 + (hash % 6);
  const guysCount = 14 + (hash % 12);
  const followers = 450 + (hash % 3800);
  const following = 280 + (hash % 450);
  const posts = 12 + (hash % 85);
  const isPrivate = hash % 3 === 0;
  const isVerified = cleanUsername.toLowerCase().includes('officiel') || cleanUsername.toLowerCase().includes('official') || hash % 7 === 0;

  // Selected avatar for target
  const targetAvatar = (hash % 2 === 0 ? maleAvatars : femaleAvatars)[hash % 6];

  // Follow events
  const recentFollows: FollowEvent[] = [];

  // Add girls
  for (let i = 0; i < girlsCount; i++) {
    const item = girlNames[i % girlNames.length];
    const avatar = femaleAvatars[i % femaleAvatars.length];
    const hoursAgo = (i + 1) * 3 + (hash % 5);
    const minuteStr = String(14 + (i * 9) % 45).padStart(2, '0');
    
    let timeStr = '';
    if (language === 'en') {
      const hour = Math.max(1, (23 - hoursAgo) % 12 || 12);
      const ampm = (23 - hoursAgo) >= 12 ? 'PM' : 'AM';
      timeStr = hoursAgo < 24 
        ? `Today at ${hour}:${minuteStr} ${ampm}`
        : `Yesterday at 06:45 PM`;
    } else {
      timeStr = hoursAgo < 24 
        ? `Aujourd'hui à ${String(Math.max(1, 23 - hoursAgo)).padStart(2, '0')}:${minuteStr}`
        : `Hier à ${String(18 - (i * 2)).padStart(2, '0')}:45`;
    }

    recentFollows.push({
      id: `f-g-${i}`,
      targetUsername: `${item.user}_${i > 2 ? i : ''}`,
      targetFullName: item.name,
      avatarUrl: avatar,
      gender: 'girl',
      timestamp: timeStr,
      mutualsCount: 2 + (i * 3) % 9,
      isMutualFollow: i % 2 === 0,
    });
  }

  // Add guys
  for (let i = 0; i < guysCount; i++) {
    const item = guyNames[i % guyNames.length];
    const avatar = maleAvatars[i % maleAvatars.length];
    const hoursAgo = (i + 2) * 2 + (hash % 4);
    const minuteStr = String(10 + (i * 4) % 49).padStart(2, '0');

    let timeStr = '';
    if (language === 'en') {
      const hourVal = Math.max(0, 22 - (i % 12));
      const hour = (hourVal % 12) || 12;
      const ampm = hourVal >= 12 ? 'PM' : 'AM';
      timeStr = hoursAgo < 24 
        ? `Today at ${hour}:${minuteStr} ${ampm}`
        : `${(i % 3) + 2} days ago at 02:30 PM`;
    } else {
      timeStr = hoursAgo < 24 
        ? `Aujourd'hui à ${String(Math.max(0, 22 - (i % 12))).padStart(2, '0')}:${minuteStr}`
        : `Il y a ${(i % 3) + 2} jours à ${String(14 + (i % 6)).padStart(2, '0')}:30`;
    }

    recentFollows.push({
      id: `f-m-${i}`,
      targetUsername: `${item.user}`,
      targetFullName: item.name,
      avatarUrl: avatar,
      gender: 'guy',
      timestamp: timeStr,
      mutualsCount: 4 + (i * 2) % 15,
      isMutualFollow: true,
    });
  }

  return {
    username: cleanUsername,
    fullName: cleanUsername
      .split(/[._]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || (language === 'en' ? 'Target Profile' : 'Profil Cible'),
    avatarUrl: targetAvatar,
    isPrivate,
    isVerified,
    followersCount: followers,
    followingCount: following,
    postsCount: posts,
    bio: 'Living in the moment ✨ | Creator 📍 | DM for collabs 📩',
    lastActive: language === 'en' ? 'Active 14 minutes ago' : 'Il y a 14 minutes',
    riskScore: 78 + (hash % 19),
    genderBreakdown: {
      girlsCount,
      guysCount,
      otherCount: 2 + (hash % 3),
    },
    recentFollows,
    unfollows: [
      {
        id: 'u-1',
        targetUsername: 'marie_fitness.fr',
        targetFullName: 'Marie Laurent',
        avatarUrl: femaleAvatars[1],
        timestamp: language === 'en' ? 'Yesterday at 10:15 PM' : 'Hier à 22:15',
      },
      {
        id: 'u-2',
        targetUsername: 'kevin.prod',
        targetFullName: 'Kevin Producer',
        avatarUrl: maleAvatars[3],
        timestamp: language === 'en' ? '3 days ago at 11:08 AM' : 'Il y a 3 jours à 11:08',
      },
    ],
    secretAdmirers: [
      {
        id: 's-1',
        username: 'chloe.secret',
        avatarUrl: femaleAvatars[2],
        storyViewsCount: 48,
        interactionType: language === 'en' ? 'Watched all stories in < 3 mins' : 'Vu toutes les stories en < 3 min',
      },
      {
        id: 's-2',
        username: 'm_lucas94',
        avatarUrl: maleAvatars[2],
        storyViewsCount: 31,
        interactionType: language === 'en' ? 'Watches stories without following' : 'Regarde les stories sans follow',
      },
      {
        id: 's-3',
        username: 'sarah_off9',
        avatarUrl: femaleAvatars[4],
        storyViewsCount: 22,
        interactionType: language === 'en' ? 'Frequent daily profile views (3x/day)' : 'Visite récurrente du profil (3x/jour)',
      },
    ],
    peakHours: [
      { hour: language === 'en' ? '12 AM - 4 AM' : '00h - 04h', activityLevel: 'very_high', percentage: 46 },
      { hour: language === 'en' ? '4 AM - 8 AM' : '04h - 08h', activityLevel: 'low', percentage: 8 },
      { hour: language === 'en' ? '8 AM - 12 PM' : '08h - 12h', activityLevel: 'medium', percentage: 14 },
      { hour: language === 'en' ? '12 PM - 6 PM' : '12h - 18h', activityLevel: 'medium', percentage: 12 },
      { hour: language === 'en' ? '6 PM - 12 AM' : '18h - 00h', activityLevel: 'high', percentage: 20 },
    ],
  };
}
