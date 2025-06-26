<?php

use App\Constants\PermissionConstants;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\HospitalConfigController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Middleware\CheckPermissions;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([JwtMiddleware::class])->group(function () {
    // Upload File
    Route::get('upload/get_token', [FileUploadController::class, 'get_token']);
    // get user details
    Route::get('/user/details', [RoleController::class, 'getUserDetails']);
});

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// Super Admin

// Hospital
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/hospital/create', [HospitalController::class, 'createHospital'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_HOSPITALS]);
    Route::get('/hospital/list', [HospitalController::class, 'getAllHospitals'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_HOSPITALS]);
    Route::put('/hospital/update', [HospitalController::class, 'updateHospital'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_HOSPITALS]);
});

// Forms
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/form/create', [FormController::class, 'create'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_FORMS]);
    Route::put('/form/update', [FormController::class, 'update'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_FORMS]);
    Route::delete('/form/delete', [FormController::class, 'delete'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_FORMS]);
    Route::put('form/update/status', [FormController::class, 'updateStatus'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_FORMS]);
    Route::get('/form/list', [SuperAdminController::class, 'getFormListForHospital'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_FORMS]);
});

// Create Admin
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/admin/create', [SuperAdminController::class, 'createAdmin'])->middleware([CheckPermissions::class.':'.PermissionConstants::MANAGE_ADMINS]);
});
// Get Username List
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('/get-username-list', [SuperAdminController::class, 'getUsernameList'])->middleware([CheckPermissions::class.':'.PermissionConstants::GET_USERNAME_LIST]);
});

// Admin
Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/admin/assign/role', [RoleController::class, 'assignRoleToUser'])->middleware([CheckPermissions::class.':'.PermissionConstants::ASSIGN_ROLE_TO_USER]);
    Route::post('config/set', [HospitalConfigController::class, 'set'])->middleware([CheckPermissions::class.':'.PermissionConstants::SET_HOSPITAL_CONFIG]);
    Route::get('config/get', [HospitalConfigController::class, 'get']);
});
