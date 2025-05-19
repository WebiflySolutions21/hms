<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Middleware\CheckPermissions;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello From Himanshu Sangwan!']);
});
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('test-permission', [AuthController::class, 'test'])->middleware([CheckPermissions::class . ':test_permission']);
});

//Upload File
Route::get('upload/get_token', [FileUploadController::class, 'get_token'])->middleware([JwtMiddleware::class]);

//Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

//Super Admin

//Hospital
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/hospital/create', [HospitalController::class, 'create_hospital'])->middleware([CheckPermissions::class . ':manage-hospitals']);
    Route::get('/hospital/list', [HospitalController::class, 'get_all_hospitals'])->middleware([CheckPermissions::class . ':manage-hospitals']);
    Route::put('/hospital/update', [HospitalController::class, 'update_hospital'])->middleware([CheckPermissions::class . ':manage-hospitals']);
});

//Forms
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/form/create', [FormController::class, 'create'])->middleware([CheckPermissions::class . ':manage-forms']);
    Route::put('/form/update', [FormController::class, 'update'])->middleware([CheckPermissions::class . ':manage-forms']);
    Route::delete('/form/delete', [FormController::class, 'delete'])->middleware([CheckPermissions::class . ':manage-forms']);
    Route::put('form/update/status', [FormController::class, 'update_status'])->middleware([CheckPermissions::class . ':manage-forms']);
    Route::get('/form/list', [SuperAdminController::class, 'get_form_list_for_hospital'])->middleware([CheckPermissions::class . ':manage-forms']);
});

