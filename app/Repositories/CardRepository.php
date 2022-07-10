<?php

namespace App\Repositories;

use App\Card;
use App\Step;
use Carbon\Carbon;
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
            'limit_date' => $card->limit_date,
            'color' => $card->color

        ];
        return $card;
    }
    public function getDefault()
    {
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
        return $default;
    }
    public function getCards($user, $step_id = null)
    {
        $steps = Step::all();

        if ($step_id) {
            $cards = Card::where('user_id', $user->id)->where('step_id', $step_id)->orderBy('id', 'DESC')->get();
        } else {
            $cards = Card::where('user_id', $user->id)->orderBy('id', 'DESC')->get();
        }
        if (count($cards) > 0) {

            $cards = $cards->map(function ($card) {
                $card = $card;
                $date_step = Carbon::createFromDate($card->limit_date);
                $now = Carbon::now();

                // dd($date_step > $now ? 'true' : 'false');
                // dd(Carbon::now()->format('Y-m-d'),  $card->limit_date );
                $card->color = $now > $date_step ? 'danger' : 'success';
                // dd($card->color);
                return $this->assertResponse($card);
            });
        } else {
            $cards = $this->getDefault();
        }
        $newSteps = $steps->map(function ($step) {
            return $step->name;
        });
        return [
            'stages' => $newSteps,
            'cards' => $cards,
        ];
    }

    public function save($data)
    {
        $card = $data['id'] != 0 ? Card::find($data['id']) : new Card();
        $card->title = $data['title'];
        $card->limit_date = $data['limit_date'];
        $card->content = $data['content'];
        $card->step_id = $this->getStep('name', $data['step_id'])->id;
        $card->user_id = Auth::user()->id;
        $card->save();
        $card = $this->assertResponse($card);
        return $card;
    }
}
