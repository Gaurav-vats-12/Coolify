<?php

namespace App\Console\Commands;

use App\Models\Server;
use App\Services\Docker\DockerHelper;
use Illuminate\Console\Command;

class TesterCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tester';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $server = Server::find(0);
        $network = 'coolify';
        $result = DockerHelper::getContainersInNetwork($server, $network);

        dd($result);
    }
}
