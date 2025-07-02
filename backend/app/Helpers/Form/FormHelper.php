<?php

namespace App\Helpers\Form;

use App\Helpers\BaseHelper;
use App\Models\Form;
use App\Models\FormVersion;
use App\Models\HospitalFormVersionDetail;

class FormHelper extends BaseHelper
{
    public function createNewForm(array $data): void
    {
        $form = Form::create([
            'name' => $data['name'],
        ]);
        // Create first version
        FormVersion::create([
            'form_id' => $form->id,
            'version' => 1,
            'json' => $data['json'],
        ]);
    }

    public function updateFormVersion(array $data): void
    {
        $version = FormVersion::find($data['id']);
        if ($version) {
            $version->update([
                'json' => $data['json'],
            ]);
        } else {
            $this->addError('Form version not found.');
        }
    }

    public function deleteForm(int $id): void
    {
        $form = Form::find($id);
        $form->is_deleted = true;
        $form->save();
    }

    public function updateFormStatusForHospital(array $data): void
    {
        HospitalFormVersionDetail::updateOrCreate(
            [
                'hospital_id' => $data['hospital_id'],
                'form_version_id' => $data['form_version_id'],
            ],
            [
                'status' => $data['status'],
                'visibility' => $data['visibility'] ?? null,
            ]
        );
    }

    public function createNewVersion(int $formId, array $json): FormVersion
    {
        $latestVersion = FormVersion::where('form_id', $formId)->max('version');
        $newVersion = $latestVersion ? $latestVersion + 1 : 1;

        return FormVersion::create([
            'form_id' => $formId,
            'version' => $newVersion,
            'json' => $json,
        ]);
    }

    public function cloneVersion(int $formVersionId): ?FormVersion
    {
        $version = FormVersion::find($formVersionId);
        if (! $version) {
            return null;
        }

        return $this->createNewVersion($version->form_id, $version->json);
    }
}
