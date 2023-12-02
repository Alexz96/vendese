<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Orders extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'delivery_type',
        'delivery_fee',
        'order_total',
        'paid_when',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'delivery_fee' => 'decimal:2',
        'order_total' => 'decimal:2',
        'paid_when' => 'datetime:d/m/Y',
        'created_at' => 'datetime:d/m/Y',
        'updated_at' => 'datetime:d/m/Y',
        'deleted_at' => 'datetime:d/m/Y',
    ];

}
