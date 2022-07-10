<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Step extends Model
{
    protected $table = 'steps';


    public function cards()
    {
        return $this->hasMany(Card::class);
    }

}
