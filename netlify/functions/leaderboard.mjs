import { db } from "./_db.mjs";
export default async () => {
 const result=await db.sql`SELECT id,name,sober_days,updated_at FROM members ORDER BY sober_days DESC,name ASC`;
 const total=result.rows.reduce((s,m)=>s+Number(m.sober_days),0);
 const average=result.rows.length?Math.round(total/result.rows.length):0;
 return {statusCode:200,headers:{"Content-Type":"application/json"},body:JSON.stringify({members:result.rows,total,average})};
};
export const config={path:"/api/leaderboard"};
