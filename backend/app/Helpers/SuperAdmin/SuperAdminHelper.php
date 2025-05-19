<?php

namespace App\Helpers\SuperAdmin;

use App\Helpers\BaseHelper;
use App\Models\Form;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class SuperAdminHelper extends BaseHelper
{

    public function getFormListByHospitalId($hospital_id): Collection
    {
        return Form::query()
            ->select(
                'forms.id',
                'forms.name',
                'forms.json',
                'hospital_form_details.visibility',
                DB::raw('COALESCE(hospital_form_details.status, "inactive") as status')
            )
            ->leftJoin('hospitals_forms_details as hospital_form_details', function ($join) use ($hospital_id) {
                $join->on('forms.id', '=', 'hospital_form_details.form_id')
                    ->where('hospital_form_details.hospital_id', $hospital_id);
            })
            ->where('forms.is_deleted', 0)
            ->get()
            ->map(function ($record) {
                $record->visibility = json_decode($record->visibility, true);
                return $record;
            });
    }
}
