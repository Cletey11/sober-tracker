import { db } from "./_db.mjs";

export default async event => {
  if (event.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  let body;

  try {
    body = await event.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const id = Number(body.id);
  const amount = Number(body.amount);

  if (
    !Number.isInteger(id) ||
    !Number.isInteger(amount) ||
    amount < 1 ||
    amount > 3650
  ) {
    return new Response(
      JSON.stringify({
        error: "Enter a whole number from 1 to 3650."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const rows = await db.sql`
    UPDATE members
    SET sober_days = sober_days + ${amount},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, name, sober_days, updated_at
  `;

  if (!rows.length) {
    return new Response(
      JSON.stringify({ error: "Member not found" }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  return new Response(
    JSON.stringify({
      member: rows[0]
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
  path: "/api/update"
};
