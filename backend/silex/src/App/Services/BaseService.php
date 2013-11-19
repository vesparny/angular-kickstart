<?php

namespace App\Services;

class BaseService
{
    protected $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

}
