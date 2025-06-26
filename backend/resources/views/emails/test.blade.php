<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Email</title>
    <style>
        body {
            background: #f4f6fb;
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(90deg, #4f8cff 0%, #3358e6 100%);
            color: #fff;
            padding: 32px 24px 24px 24px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.2em;
            letter-spacing: 1px;
        }
        .content {
            padding: 32px 24px;
        }
        .content h2 {
            color: #3358e6;
            margin-top: 0;
        }
        .content p {
            font-size: 1.1em;
            color: #333;
            line-height: 1.6;
        }
        .footer {
            background: #f4f6fb;
            color: #888;
            text-align: center;
            padding: 18px 24px;
            font-size: 0.95em;
        }
        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #e3e9f7;
            display: inline-block;
            margin-bottom: 16px;
            line-height: 80px;
            font-size: 2.5em;
            color: #4f8cff;
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <div class="avatar">{{ strtoupper(substr($name, 0, 1)) }}</div>
        <h1>Hello, {{ $name }}!</h1>
    </div>
    <div class="content">
        <h2>You've got a new message</h2>
        <p>{{ $message }}</p>
        <hr style="margin:32px 0; border:0; border-top:1px solid #e3e9f7;">
        <p style="font-size:0.98em; color:#666;">This is a sample email template for demonstration purposes. You can customize this template as needed for your application.</p>
    </div>
    <div class="footer">
        &copy; {{ date('Y') }} Your Company Name. All rights reserved.
    </div>
</div>
</body>
</html>

