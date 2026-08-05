function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateOtpHtml(otp){
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
        }
        .email-body {
            padding: 40px 20px;
            text-align: center;
        }
        .otp-box {
            background-color: #f9f9f9;
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
        }
        .email-footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
            border-top: 1px solid #ddd;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Verify Your Email</h1>
        </div>
        <div class="email-body">
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 14px; color: #555;">Use the following OTP code to verify your email address:</p>
            <div class="otp-box">
                <div class="otp-code">${otp}</div>
            </div>
            <p style="font-size: 14px; color: #888;">This OTP is valid for 10 minutes.</p>
            <p style="font-size: 12px; color: #999;">If you did not request this code, please ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>© 2024 Your Company. All rights reserved.</p>
            <p>Please do not share this OTP with anyone.</p>
        </div>
    </div>
</body>

</html>`}

module.exports = { generateOtp, generateOtpHtml }