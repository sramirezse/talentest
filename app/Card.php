<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $table = 'cards';
    protected $fillable = ['title', 'content'];

    public function step()
    {
        return $this->belongsTo(Step::class);
    }
}
