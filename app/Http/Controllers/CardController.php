<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CardRequest;
use App\Repositories\CardRepository;
use App\Card;
use Illuminate\Support\Facades\Auth;


class CardController extends Controller
{
    public function get(CardRepository $cardRepository)
    {
        $user = Auth::user();
        return $cardRepository->getCards($user);
    }
    public function store(CardRepository $cardRepository, CardRequest $request)
    {
        $card = $cardRepository->save($request->all());
        return response()->json(['card'  => $card], 201);
    }
}
