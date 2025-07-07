<?php

namespace App\Http\Controllers;

use App\Constants\RoleConstants;
use App\Helpers\Form\FormHelper;
use App\Helpers\ResponseHelper;
use Illuminate\Http\JsonResponse;

class FormController extends Controller
{
    public function create(): JsonResponse
    {
        $isInvalidRequest = $this->validateRequest(
            [
                'name' => 'required|unique:forms|min:3',
                'json' => 'required|array',
            ],
        );
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        (new FormHelper)->createNewForm($this->validatedData);

        return ResponseHelper::successResponse(
            ['message' => 'Form created successfully!'],
        );
    }

    public function updateVersion(): JsonResponse
    {
        $isInvalidRequest = $this->validateRequest([
            'id' => 'required|exists:form_versions,id',
            'json' => 'required|array',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $formHelper = new FormHelper;
        $formHelper->updateFormVersion($this->validatedData);
        if ($formHelper->hasErrors()) {
            return ResponseHelper::errorResponse($formHelper->getErrorMessage());
        }

        return ResponseHelper::successResponse([
            'message' => 'Form version updated successfully!'],
        );
    }

    public function delete(): JsonResponse
    {
        $isInvalidRequest = $this->validateRequest(
            ['id' => 'required|exists:forms,id'],
        );
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        (new FormHelper)->deleteForm($this->validatedData['id']);

        return ResponseHelper::successResponse(
            ['message' => 'Form deleted successfully!'],
        );

    }

    public function updateStatus(): JsonResponse
    {
        $isInvalidRequest = $this->validateRequest(
            [
                'form_version_id' => 'required|exists:form_versions,id',
                'status' => 'required|in:active,inactive',
                'hospital_id' => 'required|exists:hospitals,id',
                'visibility' => 'array|in:'.RoleConstants::RECEPTIONIST.','.RoleConstants::DOCTOR.','.RoleConstants::STAFF.','.RoleConstants::LAB_TECHNICIAN.','.RoleConstants::PHARMACIST,
            ],
        );
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        (new FormHelper)->updateFormStatusForHospital($this->validatedData);

        return ResponseHelper::successResponse(
            ['message' => 'Form status updated successfully!'],
        );
    }

    public function createVersion(): JsonResponse
    {
        $isInvalidRequest = $this->validateRequest([
            'form_id' => 'required|exists:forms,id',
            'json' => 'required|array',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $formHelper = new FormHelper;
        $version = $formHelper->createNewVersion($this->validatedData['form_id'], $this->validatedData['json']);

        return ResponseHelper::successResponse([
            'message' => 'Form version created successfully!',
            'version' => $version->version,
        ]);
    }

    public function cloneVersion(): JsonResponse
    {
        $isInvalidRequest = $this->validateRequest([
            'form_version_id' => 'required|exists:form_versions,id',
        ]);
        if ($isInvalidRequest) {
            return $isInvalidRequest;
        }
        $formHelper = new FormHelper;
        $newVersion = $formHelper->cloneVersion($this->validatedData['form_version_id']);
        if (! $newVersion) {
            return ResponseHelper::errorResponse('Form version not found.');
        }

        return ResponseHelper::successResponse([
            'message' => 'Form version cloned successfully!',
            'version' => $newVersion->version,
        ]);
    }
}
