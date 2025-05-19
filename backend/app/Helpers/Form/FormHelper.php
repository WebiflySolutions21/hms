<?php

namespace App\Helpers\Form;

use App\Helpers\BaseHelper;
use App\Models\Form;
use App\Models\HospitalFormDetail;

class FormHelper extends BaseHelper
{
    public function createNewForm(array $data): void
    {
        Form::create([
            'name' => $data['name'],
            'json' => $data['json'],
        ]);
    }

    public function updateForm(array $data): void
    {
        try {
            $form = Form::find($data['id']);
            $form->update($data);
            $form->save();
        } catch (\Exception $e) {
            $this->addError('Form Name already exists.');
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
        HospitalFormDetail::updateOrCreate(
            [
                'hospital_id' => $data['hospital_id'],
                'form_id' => $data['form_id'],
            ],
            [
                'status' => $data['status'],
                'visibility' => $data['visibility'] ?? null,
            ]
        );
    }

}

