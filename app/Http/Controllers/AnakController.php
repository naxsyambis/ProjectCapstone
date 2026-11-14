<?php

namespace App\Http\Controllers;

use App\Models\Anak;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnakController extends Controller
{
    /** Daftar anak milik user yang login. */
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()->anak()->orderBy('nama')->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nama'          => ['required', 'string', 'max:100'],
            'tanggal_lahir' => ['required', 'date', 'before_or_equal:today'],
            'jenis_kelamin' => ['required', 'in:L,P'],
            'catatan'       => ['nullable', 'string'],
        ]);

        // id_user terisi otomatis lewat relasi, tidak dari input
        $anak = $request->user()->anak()->create($data);

        return response()->json($anak->fresh(), 201);
    }

    public function show(Request $request, int $id): JsonResponse
    {
        return response()->json($this->findOwned($request, $id));
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $anak = $this->findOwned($request, $id);

        $data = $request->validate([
            'nama'          => ['sometimes', 'required', 'string', 'max:100'],
            'tanggal_lahir' => ['sometimes', 'required', 'date', 'before_or_equal:today'],
            'jenis_kelamin' => ['sometimes', 'required', 'in:L,P'],
            'catatan'       => ['nullable', 'string'],
        ]);

        $anak->update($data);

        return response()->json($anak->fresh());
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        // screening & progress misi anak ini ikut terhapus (ON DELETE CASCADE)
        $this->findOwned($request, $id)->delete();

        return response()->json(['message' => 'Data anak dihapus.']);
    }

    /** Anak hanya bisa diakses pemiliknya; selain itu 404. */
    private function findOwned(Request $request, int $id): Anak
    {
        return $request->user()->anak()->findOrFail($id);
    }
}
