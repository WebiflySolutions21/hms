<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Helpers\SuperAdmin\SuperAdminHelper;
use Illuminate\Support\Facades\DB;

class SuperAdminController extends Controller
{
    public function getFormListForHospital()
    {
        $isInvalidRequest = $this->validateRequest(
            ['id' => 'required|exists:hospitals,id'],
        );
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        try {
            $formList = (new SuperAdminHelper)->getFormListByHospitalId($this->validatedData['id']);
        } catch (\Throwable $e) {
            return ResponseHelper::errorResponse($e->getMessage());
        }

        return ResponseHelper::successResponse(
            ['forms' => $formList],
        );

    }

    public function createAdmin()
    {
        $isInvalidRequest = $this->validateRequest(
            [
                'username' => 'required|exists:users,username',
                'hospital_id' => 'required|exists:hospitals,id',
                'details' => 'array',
            ],
        );
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        try {
            DB::beginTransaction();
            (new SuperAdminHelper)->createAdmin($this->validatedData);
        } catch (\Throwable $e) {
            DB::rollBack();

            return ResponseHelper::errorResponse('Something went wrong! Please try again later.');
        }
        DB::commit();

        return ResponseHelper::successResponse(
            [
                'message' => 'Admin created successfully!',
            ],
        );
    }

    public function getUsernameList()
    {
        $isInvalidRequest = $this->validateRequest(
            ['username' => 'required|min:1'],
        );
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $usernames = (new SuperAdminHelper)->getUsernameList($this->validatedData['username']);

        return ResponseHelper::successResponse(
            ['usernames' => $usernames],
        );

    }
}
