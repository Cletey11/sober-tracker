import { db } from "./_db.mjs";

export default async () => {
  const members = await db.sql`
    SELECT id, name, sober_days, updated_at
    FROM members
    ORDER BY sober_days DESC, name ASC
  `;

  const total = members.reduce(
    (sum, member) => sum + Number(member.sober_days),
    0
  );

  const average = members.length
    ? Math.round(total / members.length)
    : 0;

  return new Response(
    JSON.stringify({
      members,
      total,
      average
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const config = {
  path: "/api/leaderboard"
};
