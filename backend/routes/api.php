<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HospitalController;
use App\Http\Middleware\CheckPermissions;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello From Himanshu Sangwan!']);
});
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('test-permission', [AuthController::class, 'test'])->middleware([CheckPermissions::class . ':test_permission']);
});
//Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

//Hospital
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/hospital/create', [HospitalController::class, 'create_hospital'])->middleware([CheckPermissions::class . ':manage-hospitals']);
    Route::get('/hospital/list', [HospitalController::class, 'get_all_hospitals'])->middleware([CheckPermissions::class . ':manage-hospitals']);
    Route::put('/hospital/update', [HospitalController::class, 'update_hospital'])->middleware([CheckPermissions::class . ':manage-hospitals']);
});
