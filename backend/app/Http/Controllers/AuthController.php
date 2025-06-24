<?php

namespace App\Http\Controllers;

use App\Helpers\Auth\AuthHelper;
use App\Helpers\ResponseHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(): JsonResponse
    {
        $IsInvalidRequest = $this->validateRequest([
            'username' => 'required',
            'password' => 'required',
        ]);
        if ($IsInvalidRequest) {
            return $IsInvalidRequest;
        }
        $authHelper = new AuthHelper();
        $token = $authHelper->handleLoginRequest($this->validatedData);
        if ($authHelper->hasErrors()) {
            return ResponseHelper::errorResponse($authHelper->getErrorMessage());
        }

        return ResponseHelper::successResponse(['token' => $token]);

    }

    public function signup(): JsonResponse
    {
        $IsInvalidRequest = $this->validateRequest([
            'name' => 'required',
            'username' => 'required|unique:users|min:3|max:20|regex:/^[a-zA-Z0-9_]+$/',
            'password' => 'required|min:6',
        ]);
        if ($IsInvalidRequest) {
            return $IsInvalidRequest;
        }
        $authHelper = new AuthHelper;
        $token = $authHelper->handleSignupRequest($this->validatedData);

        return ResponseHelper::successResponse(['token' => $token]);
    }

    public function test(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Test done!']);
    }
}
