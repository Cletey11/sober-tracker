import { db } from "./_db.mjs";
export default async event => {
 if(event.httpMethod!=="POST") return out(405,{error:"Method not allowed"});
 let body; try{body=JSON.parse(event.body||"{}")}catch{return out(400,{error:"Invalid request"})}
 const id=Number(body.id), amount=Number(body.amount);
 if(!Number.isInteger(id)||!Number.isInteger(amount)||amount<1||amount>3650)return out(400,{error:"Enter a whole number from 1 to 3650."});
 const r=await db.sql`UPDATE members SET sober_days=sober_days+${amount},updated_at=NOW() WHERE id=${id} RETURNING id,name,sober_days,updated_at`;
 if(!r.rows.length)return out(404,{error:"Member not found"});
 return out(200,{member:r.rows[0]});
};
function out(status,body){return {statusCode:status,headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}}
export const config={path:"/api/update"};
