export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Route to API booking
    if (url.pathname === "/api/booking" && request.method === "POST") {
      return await handleBooking(request, env);
    }

    // Fallback: serve static assets directly
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};

async function handleBooking(request, env) {
  // 1. Ensure content type is JSON
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response(
      JSON.stringify({ success: false, error: "Content-Type must be application/json" }),
      {
        status: 400,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" 
        }
      }
    );
  }

  try {
    const data = await request.json();
    const { fname, email, phone, pdate, guests, pickup, destinations, notes } = data;

    // 2. Validate required fields
    if (!fname || !fname.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: "Full Name is required" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid email address" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // 3. Ensure D1 Database binding exists
    if (!env.DB) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Database binding 'DB' not found. Please bind your D1 database to the Worker."
        }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // 4. Clean and parse variables
    const cleanPhone = phone ? phone.trim() : null;
    const cleanPdate = pdate ? pdate.trim() : null;
    const numGuests = parseInt(guests, 10) || 3;
    const cleanPickup = pickup ? pickup.trim() : null;
    const destJson = Array.isArray(destinations) ? JSON.stringify(destinations) : "[]";
    const cleanNotes = notes ? notes.trim() : null;

    // 5. Insert into Cloudflare D1
    const { success } = await env.DB.prepare(
      `INSERT INTO bookings (fname, email, phone, pdate, guests, pickup, destinations, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(fname.trim(), email.trim(), cleanPhone, cleanPdate, numGuests, cleanPickup, destJson, cleanNotes)
    .run();

    if (!success) {
      throw new Error("D1 failed to insert record.");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Booking request saved successfully!" }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "An internal error occurred" }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}
