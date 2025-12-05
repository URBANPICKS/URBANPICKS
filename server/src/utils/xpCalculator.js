// server/src/utils/xpCalculator.js

// Decide tier based on total XP
export function getTierFromXP(totalXP) {
  if (totalXP >= 1500) return "Gold";
  if (totalXP >= 500) return "Silver";
  return "Bronze";
}

// Given a user, add XP and update tier
export function applyXPToUser(user, deltaXP) {
  if (!user) return user;

  const currentXP = user.xp || 0;
  const nextXP = currentXP + (deltaXP || 0);

  user.xp = nextXP;
  user.tier = getTierFromXP(nextXP);

  return user;
}