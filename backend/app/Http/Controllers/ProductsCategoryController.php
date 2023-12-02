<?php

namespace App\Http\Controllers;

use App\Models\ProductsCategory;
use Illuminate\Http\Request;

class ProductsCategoryController extends Controller
{

    public function index(Request $request)
    {
        return ProductsCategory::all();
    }

    public function store(Request $request)
    {
        return ProductsCategory::create($request->all());
    }

    public function show(int $id)
    {
        return ProductsCategory::findOrFail($id);
    }

    public function update(Request $request, int $id)
    {
        return ProductsCategory::findOrFail($id)->update($request->all());
    }

    public function destroy(int $id)
    {
        return ProductsCategory::destroy($id);
    }

}
