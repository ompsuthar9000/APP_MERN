export const getVerificationEmailTemplate = (verificationLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      text-align: center;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      background: #fff;
      margin: 0 auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
    }
    p {
      font-size: 16px;
      color: #555;
    }
    .btn {
      display: inline-block;
      background-color: #007bff;
      color: #fff;
      padding: 12px 20px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 18px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Email Verification</h2>
    <p>Thank you for registering. Please verify your email address by clicking the button below.</p>
    <a href="${verificationLink}" class="btn">Verify Email</a>
    <p>If the button above does not work, copy and paste the following URL into your browser:</p>
    <p>${verificationLink}</p>
    <p class="footer">If you did not request this, please ignore this email.</p>
  </div>
</body>
</html>
`;
