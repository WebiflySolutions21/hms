<?php

use App\Helpers\ResponseHelper;
use Illuminate\Support\Facades\Route;

Route::get(
    '/',
    function () {
        return ResponseHelper::successResponse(
            ['message' => 'Welcome to the Hospital Management System API'],
        );
    },
);
