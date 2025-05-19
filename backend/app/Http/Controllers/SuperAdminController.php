<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Helpers\SuperAdmin\SuperAdminHelper;

class SuperAdminController extends Controller
{
    public function getFormListForHospital()
    {

        $isInvalidRequest = $this->validateRequest([
            'id' => 'required|exists:hospitals,id',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        try {
            $formList = new SuperAdminHelper()->getFormListByHospitalId($this->validatedData['id']);
        } catch (\Exception $e) {
            return ResponseHelper::errorResponse($e->getMessage());
        }

        return ResponseHelper::successResponse([
            'forms' => $formList,
        ]);


    }
}
