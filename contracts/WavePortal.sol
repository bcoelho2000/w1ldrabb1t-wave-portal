// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal
{
    // This variable is special because it’s called a “state variable” and 
    //   it’s cool because it's stored permanently in contract storage.
    uint totalWaves;

    mapping(address => uint) points;
    mapping(address => uint) waves;

    constructor()
    {
        console.log("Welcome to the w1ldrabb1t Wave Portal!");
    }

    function wave() public 
    {
        totalWaves += 1;
        console.log("%s just waved with %d total waves.", msg.sender, totalWaves, block.timestamp);

        waves[msg.sender]+=1;

        if((block.timestamp - waves[msg.sender] - totalWaves) % 10 == 0)
        {
            points[msg.sender]+=1;
            console.log("Congrats!!! Now you have %d points and you waved %d times!", points[msg.sender], waves[msg.sender]);
        }
        else
        {
            console.log("You waved %d times!", waves[msg.sender]);
        }
    }

    function getWavesForAddress(address addr) view public returns (uint)
    {
        console.log("Address %s waved %d times!", addr, waves[addr]);
        return waves[addr];
    }

    function getPointsForAddress(address addr) view public returns (uint)
    {
        console.log("Address %s has %d points!", addr, points[addr]);
        return points[addr];
    }

    function getTotalWaves() view public returns (uint)
    {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }
}