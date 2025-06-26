<?php

use App\Helpers\ResponseHelper;
use Illuminate\Support\Facades\Route;

<<<<<<< email-service
Route::get('/', function () {
    (new \App\Services\EmailService)->addTo('test')->addBcc('tesadfasdoif')->setSubject('Hello This is refactored Email Service')->sendEmailWithTemplate(
        'test',
        [
            'name' => 'Himanshu Sangwan',
            'message' => 'This is a test email from EmailService.'
        ]
    );
});
=======
Route::get(
    '/',
    function () {
        return ResponseHelper::successResponse(
            ['message' => 'Welcome to the Hospital Management System API'],
        );
    },
);
>>>>>>> master
