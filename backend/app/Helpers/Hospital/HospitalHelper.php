<?php

namespace App\Helpers\Hospital;

use App\Helpers\BaseHelper;
use App\Models\Hospital;

class HospitalHelper extends BaseHelper
{

    public function createNewHospital(array $data): void
    {
        Hospital::create([
            'name' => $data['name'],
            'address' => $data['address'],
            'mobile' => $data['mobile'],
            'registration_no' => $data['registration_no'],
            'registration_date' => new \DateTime(),
        ]);
    }

    public function getHospitalList()
    {
        return Hospital::select(['id', 'status', 'registration_no', 'name', 'mobile', 'address', 'registration_date'])->get();
    }

    public function updateHospital(array $data): void
    {
        try {
            $hospital = Hospital::find($data['id']);
            $hospital->update($data);
            $hospital->save();
        } catch (\Exception $e) {
            $this->addError('Hospital Registration No. already exists.');
        }

    }
}
