<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_type')->comment('Stores delivery type such as: normal or express');
            $table->double('delivery_fee', 8, 2);
            $table->double('order_total', 8, 2);
            $table->dateTime('paid_when')->nullable()->comment('Stores when order got paid');
            $table->string('status')->comment('Stores current status of order, options are: started, delivering, finished');
            $table->timestamps();
            $table->softDeletes(); // To prevent total order deletion
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
