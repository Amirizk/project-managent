<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Validator;
class TaskController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($project_id)
    {
        $tasks=Task::where('project_id',$project_id)->get();
        if(is_null($tasks)){
            return $this->sendError("Couldn't find tasks",['error' => 'No tasks found']);
        }
        return $this->sendResponse($tasks, 'Tasks retrieved successfully.');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'end_date' => 'required',
            'project_id' => 'required',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $createTask = [ 'name' =>$input['name'],
            'isDone' => false,
            'end_date' => $input['end_date'],
            'project_id' => $input['project_id']
        ];
        $task= new Task($createTask);
        $task->save();

        return $this->sendResponse($task, 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($task_id)
    {
        $task= Task::find($task_id);
        $task->delete();
        return $this->sendResponse($task, 'Task deleted successfully.');
    }


    public function setDone(Request $request , $id){


    }
}

