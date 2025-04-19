const logo = "https://iili.io/31PFGCx.png";

const verificationEmail = (url, user) => {
  return `<div style="min-height: 100vh; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; padding: 1rem;">
  <div style="max-width: 600px; width: 100%; background-color: #000; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);">
    <table cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000; font-family: Arial, sans-serif;">
      <tr>
        <td style="padding: 20px;">
          <!-- Logo and Venue -->
          <table cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="text-align: center; padding-bottom: 20px;">
                <img 
                  src=${logo}
                  alt="Venue Logo" 
                  style="max-width:300px; height: auto; margin-bottom: 0px; pointer-events: none;" 
                />
                <h3 style="color: white; font-size: 27px; margin:0px font-weight: bold;">
                 Verify Your Email
                </h3>
              </td>
              
            </tr>
          </table>
            
          <!-- Confirmation Message -->
          <table cellpadding="0" cellspacing="0" style="width: 100%;background-color: #FF8C09; border-radius: 8px;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h3 style="color: #ffff; font-size: 22px; margin: 0 0 15px 0; font-weight: bold;">
                  Your Account Has Been Created
                </h3>
                <p style="color: #333333; font-size: 20px; line-height: 1.5; margin: 0;">
                 Welcome to BookMeUp ${user}
                </p>
                <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                 Please verify your email address to complete your registration.
                </p>
              </td>
            </tr>
          </table>

          <button style="background-color: #FF8C09; color: white; padding: 20px 45px; border: none; border-radius: 10px; cursor: pointer;display: block; margin: 20px auto;font-size: 25px; font-weight: bold;">
 <a href=${url} style="text-decoration: none; color: white; cursor: pointer;"> Verify Email</a>
</button>

          
    
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</div>`;
};

const confirmationEmail = ({ booking_id, booking_date, venue, image }) => {
  const date = new Date(booking_date);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long", // Full day name
    month: "long", // Full month name
    day: "numeric", // Day of the month
    year: "numeric", // Full year
  });

  return `<div style="min-height: 100vh; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; padding: 1rem;">
  <div style="max-width: 600px; width: 100%; background-color: #000; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);">
    <table cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000; font-family: Arial, sans-serif;">
      <tr>
        <td style="padding: 20px;">
          <!-- Logo and Venue -->
          <table cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="text-align: center; padding-bottom: 20px;">
                <img 
                  src=${logo}
                  alt="Venue Logo" 
                  style="max-width:300px; height: auto; margin-bottom: 15px; pointer-events: none;" 
                />
                <h2 style="color: #fff; font-size: 24px; margin: 0;">${venue}</h2>
              </td>
            </tr>
          </table>

          <!-- Venue Image -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="text-align: center;">
                <img 
                  src=${image} 
                  alt="Venue" 
                  style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; pointer-events: none;" 
                />
              </td>
            </tr>
          </table>

          <!-- Confirmation Message -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 20px; background-color: #FF8C09; border-radius: 8px;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h3 style="color: #ffff; font-size: 22px; margin: 0 0 15px 0; font-weight: bold;">
                  Your Booking Has Been Confirmed!
                </h3>
                <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">
                  We're excited to welcome you to ${venue}.
                </p>
              </td>
            </tr>
          </table>

          <!-- Booking Details -->
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 30px; background-color: #f8fafc; border-radius: 8px;">
            <tr>
              <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Booking ID:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${booking_id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666;">Booking Date:</td>
                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${formattedDate}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</div>
`;
};

const verifiedTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page Title</title>
</head>
<body style="background-color: #111">

<div style="min-height: 100vh; background-color: #000; display: flex; align-items: center; justify-content: center; padding: 1rem;">
  <div style="max-width: 600px; width: 100%; background-color: #000; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);">
    <table cellpadding="0" cellspacing="0" style="width: 100%; background-color: #000; font-family: Arial, sans-serif;">
      <tr>
        <td style="padding: 20px;">
          <!-- Logo and Venue -->
          <table cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="text-align: center; padding-bottom: 20px;">
                <img 
                  src=https://iili.io/31PFGCx.png
                  alt="Venue Logo" 
                  style="max-width:300px; height: auto; margin-bottom: 0px; pointer-events: none;" 
                />
               
              </td>
              
            </tr>
          </table>
            
          <!-- Confirmation Message -->
          <table cellpadding="0" cellspacing="0" style="width: 100%;background-color: #FF8C09; border-radius: 8px;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h3 style="color: #ffff; font-size: 22px; margin: 0 0 15px 0; font-weight: bold;">
                  Your Email is Successfully Verified
                </h3>
                <p style="color: #333333; font-size: 20px; line-height: 1.5; margin: 0;">
                 Welcome to BookMeUp
                </p>
              </td>
              
            </tr>
            
            
          </table>
            
             <button style="background-color: #FF8C09; color: white; padding: 20px 45px; border: none; border-radius: 10px; cursor: pointer;display: block; margin: 20px auto;font-size: 25px; font-weight: bold;">
 <a href=${process.env.FRONTEND_URL} style="text-decoration: none; color: white; cursor: pointer;">LOGIN</a>
</button>
          
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</div>
  

</body>
</html>
`;
};

export { verificationEmail, confirmationEmail, verifiedTemplate };
