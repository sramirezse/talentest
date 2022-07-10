<?php

namespace App\Repositories;

use App\Card;
use App\Step;
use Illuminate\Support\Facades\Auth;

class CardRepository
{
    public function getStep($type, $param)
    {
        return Step::where($type, $param)->first();
    }
    public function assertResponse($card)
    {
        $card = [
            'id' => $card->id,
            'title' => $card->title,
            'content' => $card->content,
            'status' => $this->getStep('id', $card->step_id)->name,

        ];
        return $card;
    }

    public function getCards($user,$step_id = null)
    {
        $steps = Step::all();
        $default = [
            [
                'id' => 1,
                'title' => 'Agregar subtareas al kanban',
                'content' => '',
                'status' => 'buffer'
            ],
            [
                'id' => 2,
                'title' => 'Testing Kanban',
                'content' => '',
                'status' => 'working'
            ],
        ];
        if ($step_id) {
            $cards = Card::where('user_id', $user->id)->where('step_id', $step_id)->orderBy('id', 'DESC')->get();
        } else {
            $cards = Card::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        }
        if (count($cards) > 0) {

            $cards = $cards->map(function ($card) {

                return $this->assertResponse($card);
            });
        } else {
            $cards = $default;
        }
        $newSteps = $steps->map(function ($step) {
            return $step->name;
        });
        return [
            'stages' => $newSteps,
            'cards' => $cards
        ];
    }

    public function save($data)
    {
        $card = $data['id'] != 0 ? Card::find($data['id']) : new Card();
        $card->title = $data['title'];
        $card->content = $data['content'];
        $card->step_id = $this->getStep('name', $data['step_id'])->id;
        $card->user_id = Auth::user()->id;
        $card->save();
        $card = $this->assertResponse($card);
        return $card;
    }
}
