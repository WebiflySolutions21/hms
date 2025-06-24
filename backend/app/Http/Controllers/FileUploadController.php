<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Firebase\JWT\JWT;

class FileUploadController extends Controller
{
    public function get_token()
    {
        $payload = [
            'app' => 'new_hms',
            'exp' => time() + env('UPLOAD_SERVICE_JWT_EXPIRATION_TIME', 120),
        ];

        $token = JWT::encode($payload, env('UPLOAD_SERVICE_JWT_SECRET'), 'HS256');

        return ResponseHelper::successResponse(['token' => $token]);
    }
}
