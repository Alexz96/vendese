<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{

    public function index(Request $request)
    {
        return Products::all();
    }

    public function store(Request $request)
    {
        return Products::create($request->all());
    }

    public function show(int $id)
    {
        $product = Products::with('category')->findOrFail($id);

        return $product;
    }

    public function update(Request $request, int $id)
    {
        return Products::findOrFail($id)->update($request->all());
    }

    public function destroy(int $id)
    {
        return Products::destroy($id);
    }

}
