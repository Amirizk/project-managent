<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id('id');
            $table->string('name');
            $table->boolean('isDone');
            $table->date('end_date')->nullable();
            //$table->foreignId('member_id');
            $table->foreignId('project_id');
            $table->timestamps();

            // $table->foreign('member_id')
            //     ->references('id')
            //     ->on('users')
            //     ->onUpdate('cascade')
            //     ->onDelete('cascade');

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::create('tasks_users', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('member_id');
            $table->foreignId('task_id');
            $table->timestamps();

            $table->foreign('member_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('task_id')
                ->references('id')
                ->on('tasks')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });




    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('tasks_users');
    }
}
