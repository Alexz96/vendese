<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function index()
    {
        return Orders::all();
    }

    public function store(Request $request)
    {
        return Orders::create($request->all());
    }

    public function show(int $id)
    {
        return Orders::findOrFail($id);
    }

    public function update(Request $request, int $id)
    {
        return Orders::findOrFail($id)->update($request->all());
    }

    public function destroy(int $id)
    {
        return Orders::destroy($id);
    }

}
