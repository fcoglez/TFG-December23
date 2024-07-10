<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Exercise;
use App\Models\User;

class FileController extends Controller {

    public function uploadFile(Request $request, $type, $id) {
        $validType = ['exercises', 'user'];

        if (!in_array($type, $validType)) {
            return response()->json(['message' => 'Type not supported'], 400);
        }

        Storage::files('upload');

        if ($request->hasFile('file')) {
            $file = $request->file('file');

            $file_name = $file->getClientOriginalName();

            $file_split = explode('.', $file_name);
            $extension = $file_split[count($file_split) - 1];
            $validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

            if (!in_array($extension, $validExtensions)) {
                return response()->json(['message' => 'Extension not supported'], 400);
            }

            $nameFile = $file_split[0]."_".$id.".".$extension;

            if ($type == "exercises") {
                try {
                    $exercise = Exercise::findOrFail($id);

                    if ($exercise->image) {
                        $oldPath = '../storage/app/upload/'.$type."/".$exercise->image;
                        @unlink($oldPath);
                    }
                    $exercise->image = $nameFile;
                    $exercise->save();
                } catch (ModelNotFoundException $e) {
                    return response()->json(['message' => 'Error al actualizar el Ejercicio: ' . $e->getMessage()], 500);
                }
            } else {
                try {
                    $user = User::findOrFail($id);
                    if ($user->image) {
                        $oldPath = '../storage/app/upload/'.$type."/".$user->image;
                        @unlink($oldPath);
                    }
                    $user->image = $nameFile;
                    $user->save();
                } catch (ModelNotFoundException $e) {
                    return response()->json(['message' => 'Error al actualizar el Ejercicio: ' . $e->getMessage()], 500);
                }
            }

            $file->storeAs('upload/'.$type, $nameFile);
            return response()->json(['message' => 'El fichero subido correctamente'], 200);
        } else {
            return response()->json(['message' => 'Fichero not available'], 400);
        }
    }

    public function downloadFile($type, $file) {
        Storage::files('upload');
        $validType = ['exercises', 'user'];

        if (!in_array($type, $validType)) {
            return response()->json(['message' => 'Type not supported'], 400);
        }

        $path = '../storage/app/upload/'.$type.'/'.$file;

        if (realpath($path)) {
            return response()->download($path, $file);
        } else {
            $path_not_found = '../storage/app/upload/no-img.jpg';
            return response()->download($path_not_found, 'no-img.jpg');
        }
    }

    public function deleteFile($type, $file) {
        $validType = ['exercises', 'user'];
        if (!in_array($type, $validType)) {
            return response()->json(['message' => 'Type not supported'], 400);
        }
        $path = '../storage/app/upload/'.$type."/".$file;
        if (realpath($path)) {
            @unlink($path);
        } else {
            return response()->json(['message' => 'Fichero no encontrado en nuestro sistema'], 404);
        }
        return response()->json(['message' => 'El fichero borrado correctamente'], 200);
    }

}
