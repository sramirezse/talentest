<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('steps')->insert(
           [ [
                'name' => 'buffer',
            ],
            [
                'name' => 'working',
            ],
            [
                'name' => 'done',
            ],]
        );
    }
}
